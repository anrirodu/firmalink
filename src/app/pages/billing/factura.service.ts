import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';
import { NotificacionService } from '../../shared/services/notificacion.service';
import { Sha256Service } from '../../shared/utils/sha256.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import {
  calcularTotales,
  esEditable,
  estaEliminada,
  Factura,
  FacturaEstado,
  formatearCodigoFactura,
  formatearNumeroFactura,
  normalizarFactura,
  siguienteNumero,
  transicionesPermitidas,
} from './factura.model';

/**
 * Acceso a datos de las facturas.
 *
 * Se calca el esquema de `AcuerdoService`: el listado viaja con una proyección
 * liviana desde una función `apicore` y queda en cache local del navegador,
 * porque de esa cache sale la numeración correlativa cuando el servidor no
 * responde (la factura se prepara igual y se guarda después).
 */
@Injectable({ providedIn: 'root' })
export class FacturaService {
  private readonly LIST_KEY = 'firmalink:facturas:list';
  private readonly BORRADOR_KEY = 'firmalink:factura:borrador';

  constructor(
    private api: ApiService,
    private sha: Sha256Service,
    private notificar: NotificacionService,
    private auth: AuthService,
  ) {}

  // ═══════════════════════════════════════════
  // Guardado
  // ═══════════════════════════════════════════

  /**
   * Guarda la factura con upsert por `codigo`.
   *
   * El código interno se asigna la primera vez (FAC-000001) y ya no cambia:
   * es el vínculo estable del documento. Al emitir se congelan los totales y
   * la huella del contenido impreso.
   */
  async guardar(factura: Factura): Promise<Factura | null> {
    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const doc: Factura = {
      ...factura,
      codigo: factura.codigo || (await this.siguienteCodigo()),
      numero: formatearNumeroFactura(factura.numero),
      numeroControl: formatearNumeroFactura(factura.numeroControl),
      creadoEn: factura.creadoEn ?? ahora,
      actualizadoEn: ahora,
      usuario: factura.usuario || usuario?.cedula || '',
    };

    doc.totales = calcularTotales(doc);
    if (doc.estado === 'emitida' || !doc.huella) {
      doc.huella = await this.huella(doc);
    }

    // El `_id` de Mongo no viaja: `$set` sobre un documento existente no puede
    // reescribir la clave, y el filtro del upsert ya es `codigo`.
    const { _id, ...objeto } = doc;

    const fnx = {
      coleccion: environment.colecciones.FACTURA,
      objeto,
      donde: JSON.stringify({ codigo: doc.codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    try {
      await firstValueFrom(this.api.ExecColeccion(fnx));
      this.fusionarEnCache(doc);
      return doc;
    } catch (e) {
      this.notificar.error(
        'No se pudo guardar la factura',
        `La factura ${doc.numero} quedó solo en este navegador (${NotificacionService.detalle(e)}).`,
      );
      return null;
    }
  }

  /** Hash SHA-256 de lo que se imprime: numero, cliente, renglones y totales. */
  async huella(f: Factura): Promise<string> {
    const canon = JSON.stringify({
      numero: f.numero,
      control: f.controlPrefijo + f.numeroControl,
      fecha: f.fechaEmision,
      mes: f.mes,
      cliente: f.cliente?.codigo ?? '',
      rif: f.cliente?.rif ?? '',
      items: f.items,
      alicuotas: [f.alicuotaIva, f.aplicaIgtf ? f.alicuotaIgtf : 0, f.alicuotaIslr],
    });
    return this.sha.hash(canon);
  }

  // ═══════════════════════════════════════════
  // Consultas
  // ═══════════════════════════════════════════

  /** Facturas visibles (sin las de borrado lógico). */
  async listar(incluirEliminadas = false): Promise<Factura[]> {
    const lista = await this.consultarServidor();
    return incluirEliminadas ? lista : lista.filter((f) => !estaEliminada(f.estado));
  }

  /**
   * Facturas de un cliente.
   *
   * El filtro lo resuelve el servidor (`_SYS_CFirmaLinkFacturasCliente` consulta
   * por `cliente.codigo`). Si la función no está registrada se cae al listado
   * completo filtrado en el navegador.
   */
  async listarPorCliente(codigo: string, incluirEliminadas = false): Promise<Factura[]> {
    if (!codigo) {
      return this.listar(incluirEliminadas);
    }

    const fn = (environment as any).functions?.CONSULTAR_FACTURAS_CLIENTE;
    const delServidor = await this.consultarServidorRemoto(
      fn,
      codigo,
      `las facturas de ${codigo}`,
      false,
    );
    const lista = delServidor ?? this.leerCacheLocal().filter((f) => f.cliente?.codigo === codigo);
    return incluirEliminadas ? lista : lista.filter((f) => !estaEliminada(f.estado));
  }

  /** Factura completa por su código (el listado trae una proyección liviana). */
  async obtener(codigo: string): Promise<Factura | null> {
    if (!codigo) return null;
    const fn = (environment as any).functions?.CONSULTAR_FACTURA;
    if (fn) {
      try {
        const data = await firstValueFrom(this.api.Ejecutar({ funcion: fn, parametros: codigo }));
        let cuerpo = this.desempaquetar(data);
        if (cuerpo && !Array.isArray(cuerpo) && (cuerpo as any).tipo !== undefined) {
          this.notificar.aviso(
            'No se pudo leer la factura',
            `El servidor respondió: ${(cuerpo as any).msj ?? 'sin detalle'}. ` +
              'Se intentará con la copia local del listado.',
          );
        } else if (Array.isArray(cuerpo)) {
          const doc = (cuerpo[0] as Factura) ?? null;
          if (doc) return normalizarFactura(doc);
        } else if (cuerpo && typeof cuerpo === 'object') {
          return normalizarFactura(cuerpo as Factura);
        }
      } catch (e) {
        this.notificar.aviso(
          'No se pudo leer la factura desde el servidor',
          `Error de comunicación (${NotificacionService.detalle(e)}). ` +
            'Se intentará con la copia local.',
        );
      }
    }

    const local = this.leerCacheLocal().find((f) => f.codigo === codigo);
    if (local) return normalizarFactura(local);
    const borrador = this.leerBorradorLocal();
    return borrador && borrador.codigo === codigo ? borrador : null;
  }

  /**
   * Siguiente número de factura: el mayor de la serie + 1.
   *
   * Los números de las eliminadas siguen contando: la numeración de una
   * factura es correlativa y no se reutiliza.
   */
  async siguienteNumero(): Promise<string> {
    const lista = await this.listar(true);
    const borrador = this.leerBorradorLocal();
    let max = 0;
    for (const f of lista) {
      const n = parseInt(String(f.numero).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    if (borrador) {
      const n = parseInt(String(borrador.numero).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    return siguienteNumero(max);
  }

  /** Siguiente código interno de la serie FAC-000001. */
  async siguienteCodigo(): Promise<string> {
    const lista = await this.listar(true);
    let max = 0;
    for (const f of lista) {
      const n = parseInt(String(f.codigo).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    return formatearCodigoFactura(max + 1);
  }

  // ═══════════════════════════════════════════
  // Estado
  // ═══════════════════════════════════════════

  /** Cambia solo el estado (el resto del documento no se toca). */
  async cambiarEstado(
    codigo: string,
    estado: FacturaEstado,
    estadoActual?: FacturaEstado,
  ): Promise<boolean> {
    if (!codigo) return false;

    if (estadoActual && !transicionesPermitidas(estadoActual).includes(estado)) {
      this.notificar.error(
        'Cambio de estado no permitido',
        estadoActual === 'emitida'
          ? `La factura ${codigo} está emitida y solo puede anularse.`
          : `La factura ${codigo} está anulada y no admite más cambios de estado.`,
      );
      return false;
    }

    const actualizadoEn = new Date().toISOString();
    const fnx = {
      coleccion: environment.colecciones.FACTURA,
      objeto: { estado, actualizadoEn },
      donde: JSON.stringify({ codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    try {
      await firstValueFrom(this.api.ExecColeccion(fnx));
      const enCache = this.leerCacheLocal().map((f) =>
        f.codigo === codigo ? { ...f, estado, actualizadoEn } : f,
      );
      this.guardarCacheLocal(enCache);
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo cambiar el estado',
        `La factura ${codigo} conserva su estado anterior (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  /**
   * Borrado lógico: el endpoint `ccoleccion` no borra, así que la factura se
   * marca como eliminada y desaparece del listado conservándose en la base.
   * Una factura EMITIDA no se elimina nunca: en su lugar se anula (su
   * numeración ya salió de la serie y quedó declarada).
   */
  async eliminar(codigo: string, estadoActual?: FacturaEstado): Promise<boolean> {
    if (!codigo) return false;

    if (estadoActual === 'emitida') {
      this.notificar.error(
        'Factura emitida: no se puede eliminar',
        `La factura ${codigo} ya fue emitida y su numeración está declarada. ` +
          'Si ya no tiene efecto, anúlela.',
      );
      return false;
    }

    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const fnx = {
      coleccion: environment.colecciones.FACTURA,
      objeto: {
        estado: 'eliminado' as FacturaEstado,
        eliminadoEn: ahora,
        eliminadoPorCedula: usuario?.cedula ?? '',
        eliminadoPorNombre: usuario?.nombre ?? '',
        actualizadoEn: ahora,
      },
      donde: JSON.stringify({ codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    try {
      await firstValueFrom(this.api.ExecColeccion(fnx));
      this.guardarCacheLocal(this.leerCacheLocal().filter((f) => f.codigo !== codigo));
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo eliminar la factura',
        `La factura ${codigo} sigue en el listado (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  // ═══════════════════════════════════════════
  // Frescura de la copia del cliente
  // ═══════════════════════════════════════════

  /** ¿La copia del cliente quedó vieja respecto a su ficha? */
  copiaDesactualizada(f: Factura): boolean {
    return !!f.cliente && !esEditable(f.estado) && !!f.cliente.copiadoEn;
  }

  // --- Factura elegida para editar (traspaso listado → editor) ---
  private readonly EDITAR_KEY = 'firmalink:factura:editar';

  marcarParaEditar(codigo: string): void {
    try {
      if (codigo) {
        sessionStorage.setItem(this.EDITAR_KEY, codigo);
      } else {
        sessionStorage.removeItem(this.EDITAR_KEY);
      }
    } catch (e) {
      // ignore
    }
  }

  /** Devuelve el código pendiente de editar y lo consume (una sola vez). */
  tomarPendienteEdicion(): string | null {
    try {
      const codigo = sessionStorage.getItem(this.EDITAR_KEY);
      if (codigo) sessionStorage.removeItem(this.EDITAR_KEY);
      return codigo;
    } catch (e) {
      return null;
    }
  }

  // ═══════════════════════════════════════════
  // Internos
  // ═══════════════════════════════════════════

  private async consultarServidor(): Promise<Factura[]> {
    const lista = await this.consultarServidorRemoto(
      (environment as any).functions?.CONSULTAR_FACTURAS,
      '',
      'el listado de facturas',
      true,
    );
    return lista ?? this.leerCacheLocal();
  }

  /**
   * Ejecuta una función `apicore` de consulta y normaliza la respuesta.
   *
   * @param cachear guarda la respuesta como listado local: solo el listado
   *   completo, que es el que alimenta la numeración offline.
   */
  private async consultarServidorRemoto(
    fn: string | undefined,
    parametros: string,
    contexto: string,
    cachear: boolean,
  ): Promise<Factura[] | null> {
    if (!fn) return null;

    try {
      const data = await firstValueFrom(this.api.Ejecutar({ funcion: fn, parametros }));
      const valor = this.desempaquetar(data);

      if (valor && !Array.isArray(valor) && (valor as any).tipo !== undefined) {
        this.notificar.aviso(
          `No se pudo consultar ${contexto}`,
          `El servidor respondió: ${(valor as any).msj ?? 'sin detalle'}.` +
            (cachear ? ' La numeración se calcula con la lista local de este navegador.' : ''),
        );
        return null;
      }

      if (Array.isArray(valor)) {
        const lista = (valor as any[]).map((f) => normalizarFactura(f));
        if (cachear) this.guardarCacheLocal(lista);
        return lista;
      }

      this.notificar.aviso(
        `Respuesta inesperada al consultar ${contexto}`,
        `La función ${fn} no devolvió una lista.`,
      );
    } catch (e) {
      console.warn(`[FacturaService] Falló la consulta de ${contexto}; se usa la copia local.`, e);
      this.notificar.aviso(
        `No se pudo consultar ${contexto}`,
        `Error de comunicación con el servidor (${NotificacionService.detalle(e)}).` +
          (cachear ? ' La numeración se calcula con la lista local de este navegador.' : ''),
      );
    }
    return null;
  }

  /** La respuesta del motor viaja en `Cuerpo`, a veces como cadena JSON. */
  private desempaquetar(data: any): any {
    let valor: any = data?.Cuerpo !== undefined ? data.Cuerpo : data;
    if (typeof valor === 'string') {
      try {
        valor = JSON.parse(valor);
      } catch (e) {
        valor = [];
      }
    }
    return valor;
  }

  // --- Cache local del listado ---
  private guardarCacheLocal(lista: Factura[]): void {
    try {
      localStorage.setItem(this.LIST_KEY, JSON.stringify(lista));
    } catch (e) {
      // ignore
    }
  }

  private leerCacheLocal(): Factura[] {
    try {
      const s = localStorage.getItem(this.LIST_KEY);
      if (!s) return [];
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr.map((f) => normalizarFactura(f)) : [];
    } catch (e) {
      return [];
    }
  }

  /** Refresca la fila de la cache local sin volver a pedir el listado. */
  private fusionarEnCache(doc: Factura): void {
    const lista = this.leerCacheLocal();
    const i = lista.findIndex((f) => f.codigo === doc.codigo);
    if (i >= 0) {
      lista[i] = doc;
    } else {
      lista.push(doc);
    }
    this.guardarCacheLocal(lista);
  }

  // --- Borrador local ---
  guardarBorradorLocal(factura: Factura): void {
    try {
      localStorage.setItem(this.BORRADOR_KEY, JSON.stringify(factura));
    } catch (e) {
      // ignore
    }
  }

  leerBorradorLocal(): Factura | null {
    try {
      const s = localStorage.getItem(this.BORRADOR_KEY);
      if (!s) return null;
      return normalizarFactura(JSON.parse(s));
    } catch (e) {
      return null;
    }
  }

  descartarBorradorLocal(): void {
    try {
      localStorage.removeItem(this.BORRADOR_KEY);
    } catch (e) {
      // ignore
    }
  }
}
