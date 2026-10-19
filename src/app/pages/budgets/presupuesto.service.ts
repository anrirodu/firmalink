import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { NotificacionService } from '../../shared/services/notificacion.service';
import { Sha256Service } from '../../shared/utils/sha256.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import {
  Presupuesto,
  PresupuestoEstado,
  calcularTotalesPresupuesto,
  esEditable,
  estaEliminado,
  formatearCodigoPresupuesto,
  formatearNumeroPresupuesto,
  normalizarPresupuesto,
  siguienteNumeroPresupuesto,
  transicionesPermitidas,
} from './presupuesto.model';

/** Datos con los que el cliente responde al presupuesto. */
export interface RespuestaCliente {
  /** Quién aprobó o rechazó del lado del cliente */
  aprobadoPor?: string;
  /** Motivo del rechazo, cuando no acepta la oferta */
  motivoRechazo?: string;
}

/**
 * Acceso a datos de los presupuestos.
 *
 * Se calca el esquema de `FacturaService`: el listado viaja con una proyección
 * liviana desde una función `apicore` y queda en cache local del navegador,
 * porque de esa cache sale la numeración correlativa cuando el servidor no
 * responde (el presupuesto se prepara igual y se guarda después).
 */
@Injectable({ providedIn: 'root' })
export class PresupuestoService {
  private readonly LIST_KEY = 'firmalink:presupuestos:list';
  private readonly BORRADOR_KEY = 'firmalink:presupuesto:borrador';
  private readonly EDITAR_KEY = 'firmalink:presupuesto:editar';

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
   * Guarda el presupuesto con upsert por `codigo`.
   *
   * El código interno se asigna la primera vez (PRE-000001) y ya no cambia: es
   * el vínculo estable del documento. Al enviarlo al cliente se congelan los
   * totales y la huella del contenido, que es lo que el cliente recibió.
   */
  async guardar(presupuesto: Presupuesto): Promise<Presupuesto | null> {
    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const doc: Presupuesto = {
      ...presupuesto,
      codigo: presupuesto.codigo || (await this.siguienteCodigo()),
      numero: formatearNumeroPresupuesto(presupuesto.numero),
      creadoEn: presupuesto.creadoEn ?? ahora,
      actualizadoEn: ahora,
      usuario: presupuesto.usuario || usuario?.cedula || '',
    };

    doc.totales = calcularTotalesPresupuesto(doc);
    if (doc.estado === 'enviado' || !doc.huella) {
      doc.huella = await this.huella(doc);
    }

    // El `_id` de Mongo no viaja: `$set` sobre un documento existente no puede
    // reescribir la clave, y el filtro del upsert ya es `codigo`.
    const { _id, ...objeto } = doc;

    const fnx = {
      coleccion: environment.colecciones.PRESUPUESTO,
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
        'No se pudo guardar el presupuesto',
        `El presupuesto ${doc.numero} quedó solo en este navegador (${NotificacionService.detalle(e)}).`,
      );
      return null;
    }
  }

  /**
   * Hash SHA-256 de lo que se imprime: número, cliente, renglones, descuento y
   * validez. Es la firma del contenido que viaja al cliente.
   */
  async huella(p: Presupuesto): Promise<string> {
    const canon = JSON.stringify({
      numero: p.numero,
      fecha: p.fechaEmision,
      validez: p.fechaValidez,
      cliente: p.cliente?.codigo ?? '',
      rif: p.cliente?.rif ?? '',
      items: p.items,
      alicuotaIva: p.alicuotaIva,
      descuento: p.descuentoPorcentaje,
    });
    return this.sha.hash(canon);
  }

  // ═══════════════════════════════════════════
  // Consultas
  // ═══════════════════════════════════════════

  /** Presupuestos visibles (sin los de borrado lógico). */
  async listar(incluirEliminados = false): Promise<Presupuesto[]> {
    const lista = await this.consultarServidor();
    return incluirEliminados ? lista : lista.filter((p) => !estaEliminado(p.estado));
  }

  /**
   * Presupuestos de un cliente.
   *
   * El filtro lo resuelve el servidor (`_SYS_CFirmaLinkPresupuestosCliente`
   * consulta por `cliente.codigo`). Si la función no está registrada se cae al
   * listado completo filtrado en el navegador.
   */
  async listarPorCliente(codigo: string, incluirEliminados = false): Promise<Presupuesto[]> {
    if (!codigo) {
      return this.listar(incluirEliminados);
    }

    const fn = (environment as any).functions?.CONSULTAR_PRESUPUESTOS_CLIENTE;
    const delServidor = await this.consultarServidorRemoto(
      fn,
      codigo,
      `los presupuestos de ${codigo}`,
      false,
    );
    const lista = delServidor ?? this.leerCacheLocal().filter((p) => p.cliente?.codigo === codigo);
    return incluirEliminados ? lista : lista.filter((p) => !estaEliminado(p.estado));
  }

  /** Presupuesto completo por su código (el listado trae una proyección liviana). */
  async obtener(codigo: string): Promise<Presupuesto | null> {
    if (!codigo) return null;
    const fn = (environment as any).functions?.CONSULTAR_PRESUPUESTO;
    if (fn) {
      try {
        const data = await firstValueFrom(this.api.Ejecutar({ funcion: fn, parametros: codigo }));
        let cuerpo = this.desempaquetar(data);
        if (cuerpo && !Array.isArray(cuerpo) && (cuerpo as any).tipo !== undefined) {
          this.notificar.aviso(
            'No se pudo leer el presupuesto',
            `El servidor respondió: ${(cuerpo as any).msj ?? 'sin detalle'}. ` +
              'Se intentará con la copia local del listado.',
          );
        } else if (Array.isArray(cuerpo)) {
          const doc = (cuerpo[0] as Presupuesto) ?? null;
          if (doc) return normalizarPresupuesto(doc);
        } else if (cuerpo && typeof cuerpo === 'object') {
          return normalizarPresupuesto(cuerpo as Presupuesto);
        }
      } catch (e) {
        this.notificar.aviso(
          'No se pudo leer el presupuesto desde el servidor',
          `Error de comunicación (${NotificacionService.detalle(e)}). ` +
            'Se intentará con la copia local.',
        );
      }
    }

    const local = this.leerCacheLocal().find((p) => p.codigo === codigo);
    if (local) return normalizarPresupuesto(local);
    const borrador = this.leerBorradorLocal();
    return borrador && borrador.codigo === codigo ? borrador : null;
  }

  /**
   * Siguiente número de presupuesto: el mayor de la serie + 1.
   *
   * Los números de los eliminados siguen contando: la numeración de un
   * presupuesto también es correlativa y no se reutiliza.
   */
  async siguienteNumero(): Promise<string> {
    const lista = await this.listar(true);
    const borrador = this.leerBorradorLocal();
    let max = 0;
    for (const p of lista) {
      const n = parseInt(String(p.numero).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    if (borrador) {
      const n = parseInt(String(borrador.numero).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    return siguienteNumeroPresupuesto(max);
  }

  /** Siguiente código interno de la serie PRE-000001. */
  async siguienteCodigo(): Promise<string> {
    const lista = await this.listar(true);
    let max = 0;
    for (const p of lista) {
      const n = parseInt(String(p.codigo).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    return formatearCodigoPresupuesto(max + 1);
  }

  // ═══════════════════════════════════════════
  // Estado
  // ═══════════════════════════════════════════

  /** Cambia solo el estado (el resto del documento no se toca). */
  async cambiarEstado(
    codigo: string,
    estado: PresupuestoEstado,
    estadoActual?: PresupuestoEstado,
  ): Promise<boolean> {
    if (!codigo) return false;

    if (estadoActual && !transicionesPermitidas(estadoActual).includes(estado)) {
      this.notificar.error(
        'Cambio de estado no permitido',
        `El presupuesto ${codigo} está en "${estadoActual}" y desde ahí no puede pasar a "${estado}".`,
      );
      return false;
    }

    return this.escribirEstado(codigo, { estado });
  }

  /**
   * Registra la respuesta del cliente sobre un presupuesto enviado.
   *
   * Aprobar o rechazar no es un simple cambio de estado: deja constancia de
   * quién respondió, cuándo y por qué (en el rechazo). Esa constancia es lo que
   * después permite defender el precio cotizado.
   */
  async responder(
    codigo: string,
    estado: Extract<PresupuestoEstado, 'aprobado' | 'rechazado'>,
    datos: RespuestaCliente = {},
  ): Promise<boolean> {
    if (!codigo) return false;

    return this.escribirEstado(codigo, {
      estado,
      aprobadoPor: datos.aprobadoPor ?? '',
      motivoRechazo: estado === 'rechazado' ? (datos.motivoRechazo ?? '') : '',
      fechaRespuesta: new Date().toISOString(),
    });
  }

  /** Escritura del estado y sus campos acompañantes, con cache al día. */
  private async escribirEstado(
    codigo: string,
    campos: Partial<Presupuesto> & { estado: PresupuestoEstado },
  ): Promise<boolean> {
    const actualizadoEn = new Date().toISOString();
    const fnx = {
      coleccion: environment.colecciones.PRESUPUESTO,
      objeto: { ...campos, actualizadoEn },
      donde: JSON.stringify({ codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    try {
      await firstValueFrom(this.api.ExecColeccion(fnx));
      const enCache = this.leerCacheLocal().map((p) =>
        p.codigo === codigo ? { ...p, ...campos, actualizadoEn } : p,
      );
      this.guardarCacheLocal(enCache);
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo cambiar el estado',
        `El presupuesto ${codigo} conserva su estado anterior (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  /**
   * Borrado lógico: el endpoint `ccoleccion` no borra, así que el presupuesto se
   * marca como eliminado y desaparece del listado conservándose en la base.
   *
   * Solo se elimina un borrador. Un presupuesto que ya salió al cliente se
   * **anula**: pudo haber quedado en manos de terceros y su rastro debe
   * conservarse.
   */
  async eliminar(codigo: string, estadoActual?: PresupuestoEstado): Promise<boolean> {
    if (!codigo) return false;

    if (!esEditable(estadoActual)) {
      this.notificar.error(
        'Presupuesto ya emitido: no se puede eliminar',
        `El presupuesto ${codigo} ya salió al cliente (${estadoActual}). Si ya no tiene efecto, anúlelo.`,
      );
      return false;
    }

    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const fnx = {
      coleccion: environment.colecciones.PRESUPUESTO,
      objeto: {
        estado: 'eliminado' as PresupuestoEstado,
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
      this.guardarCacheLocal(this.leerCacheLocal().filter((p) => p.codigo !== codigo));
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo eliminar el presupuesto',
        `El presupuesto ${codigo} sigue en el listado (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  // ═══════════════════════════════════════════
  // Frescura de la copia del cliente
  // ═══════════════════════════════════════════

  /** ¿La copia del cliente quedó vieja respecto a su ficha? */
  copiaDesactualizada(p: Presupuesto): boolean {
    return !!p.cliente && !esEditable(p.estado) && !!p.cliente.copiadoEn;
  }

  // --- Presupuesto elegido para editar (traspaso listado → editor) ---
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

  private async consultarServidor(): Promise<Presupuesto[]> {
    const lista = await this.consultarServidorRemoto(
      (environment as any).functions?.CONSULTAR_PRESUPUESTOS,
      '',
      'el listado de presupuestos',
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
  ): Promise<Presupuesto[] | null> {
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
        const lista = (valor as any[]).map((p) => normalizarPresupuesto(p));
        if (cachear) this.guardarCacheLocal(lista);
        return lista;
      }

      this.notificar.aviso(
        `Respuesta inesperada al consultar ${contexto}`,
        `La función ${fn} no devolvió una lista.`,
      );
    } catch (e) {
      console.warn(`[PresupuestoService] Falló la consulta de ${contexto}; se usa la copia local.`, e);
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
  private guardarCacheLocal(lista: Presupuesto[]): void {
    try {
      localStorage.setItem(this.LIST_KEY, JSON.stringify(lista));
    } catch (e) {
      // ignore
    }
  }

  private leerCacheLocal(): Presupuesto[] {
    try {
      const s = localStorage.getItem(this.LIST_KEY);
      if (!s) return [];
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr.map((p) => normalizarPresupuesto(p)) : [];
    } catch (e) {
      return [];
    }
  }

  /** Refresca la fila de la cache local sin volver a pedir el listado. */
  private fusionarEnCache(doc: Presupuesto): void {
    const lista = this.leerCacheLocal();
    const i = lista.findIndex((p) => p.codigo === doc.codigo);
    if (i >= 0) {
      lista[i] = doc;
    } else {
      lista.push(doc);
    }
    this.guardarCacheLocal(lista);
  }

  // --- Borrador local ---
  guardarBorradorLocal(presupuesto: Presupuesto): void {
    try {
      localStorage.setItem(this.BORRADOR_KEY, JSON.stringify(presupuesto));
    } catch (e) {
      // ignore
    }
  }

  leerBorradorLocal(): Presupuesto | null {
    try {
      const s = localStorage.getItem(this.BORRADOR_KEY);
      if (!s) return null;
      return normalizarPresupuesto(JSON.parse(s));
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
