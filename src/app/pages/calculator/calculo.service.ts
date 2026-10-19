import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { NotificacionService } from '../../shared/services/notificacion.service';
import { Sha256Service } from '../../shared/utils/sha256.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import {
  Calculo,
  CalculoEstado,
  fechaTextoEmision,
  formatearCodigoCalculo,
  infoEstadoCalculo,
  nombreDeduccion,
  normalizarCalculo,
  transicionesCalculo,
} from './calculo.model';

/**
 * Acceso a datos de la calculadora.
 *
 * Sigue el mismo esquema que `PresupuestoService`: el listado viaja desde una
 * función `apicore` y queda en la cache del navegador, de la que sale la
 * numeración correlativa cuando el servidor no responde. El guardado usa
 * `ccoleccion` con upsert por `codigo`.
 */
@Injectable({ providedIn: 'root' })
export class CalculoService {
  private readonly LIST_KEY = 'firmalink:calculos:list';
  private readonly BORRADOR_KEY = 'firmalink:calculo:borrador';
  private readonly EDITAR_KEY = 'firmalink:calculo:editar';

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
   * Guarda el cálculo con upsert por `codigo`.
   *
   * El código interno se asigna la primera vez (CALC-000001) y ya no cambia: es
   * el vínculo estable del registro. La huella SHA-256 se recalcula en cada
   * guardado para que corresponda a las cifras que quedaron almacenadas.
   */
  async guardar(calculo: Calculo): Promise<Calculo | null> {
    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const doc: Calculo = {
      ...calculo,
      codigo: calculo.codigo || (await this.siguienteCodigo()),
      creadoEn: calculo.creadoEn ?? ahora,
      actualizadoEn: ahora,
      fechaTexto: calculo.fechaTexto || fechaTextoEmision(new Date(calculo.fechaEmision)),
      usuario: calculo.usuario || usuario?.cedula || '',
    };
    doc.huella = await this.huella(doc);

    // El `_id` de Mongo no viaja: `$set` sobre un documento existente no puede
    // reescribir la clave, y el filtro del upsert ya es `codigo`.
    const { _id, ...objeto } = doc;

    const fnx = {
      coleccion: environment.colecciones.CALCULO,
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
        'No se pudo guardar el cálculo',
        `El cálculo ${doc.codigo} quedó solo en este navegador (${NotificacionService.detalle(e)}).`,
      );
      return null;
    }
  }

  /**
   * Hash SHA-256 de lo que se ve: nombre, cifras fuente, deducciones y
   * resultados. Es la firma que permite detectar si un cálculo guardado fue
   * alterado a mano. El `id` de cada deducción queda fuera: es un identificador
   * de la fila mientras se edita, no parte del contenido.
   */
  async huella(c: Calculo): Promise<string> {
    const canon = JSON.stringify({
      nombre: c.nombre,
      fecha: c.fechaEmision,
      montoSubtotal: c.montoSubtotal,
      ivaPorcentaje: c.ivaPorcentaje,
      montoIva: c.montoIva,
      montoTotal: c.montoTotal,
      montoDepositado: c.montoDepositado,
      deducciones: (c.deducciones ?? []).map(
        (d) => `${nombreDeduccion(d)}|${d.tipo}|${d.valor}|${d.base}|${d.monto}`,
      ),
      gananciaPorcentaje: c.gananciaPorcentaje,
      ganancia: c.ganancia,
      saldoLibre: c.saldoLibre,
      tasa: c.tasa?.valor ?? 0,
    });
    return this.sha.hash(canon);
  }

  // ═══════════════════════════════════════════
  // Consultas
  // ═══════════════════════════════════════════

  /** Cálculos visibles (sin los de borrado lógico). */
  async listar(incluirEliminados = false): Promise<Calculo[]> {
    const lista = await this.consultarServidor();
    return incluirEliminados ? lista : lista.filter((c) => !estaEliminado(c));
  }

  /** Cálculo completo por su código (el listado trae lo guardado en cache). */
  async obtener(codigo: string): Promise<Calculo | null> {
    if (!codigo) return null;

    const fn = (environment as any).functions?.CONSULTAR_CALCULO;
    if (fn) {
      try {
        const data = await firstValueFrom(this.api.Ejecutar({ funcion: fn, parametros: codigo }));
        const cuerpo = this.desempaquetar(data);
        if (Array.isArray(cuerpo)) {
          const doc = (cuerpo[0] as Calculo) ?? null;
          if (doc) return normalizarCalculo(doc);
        } else if (cuerpo && typeof cuerpo === 'object' && (cuerpo as any).codigo) {
          return normalizarCalculo(cuerpo as Calculo);
        }
      } catch (e) {
        console.warn('[CalculoService] Falló la lectura del cálculo; se usa la copia local.', e);
      }
    }

    const local = this.leerCacheLocal().find((c) => c.codigo === codigo);
    if (local) return normalizarCalculo(local);
    const borrador = this.leerBorradorLocal();
    return borrador && borrador.codigo === codigo ? borrador : null;
  }

  /** Siguiente código interno de la serie CALC-000001. */
  async siguienteCodigo(): Promise<string> {
    const lista = await this.listar(true);
    const borrador = this.leerBorradorLocal();
    let max = 0;
    for (const c of lista) {
      const n = parseInt(String(c.codigo).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    if (borrador) {
      const n = parseInt(String(borrador.codigo).replace(/\D/g, '') || '0', 10);
      if (n > max) max = n;
    }
    return formatearCodigoCalculo(max + 1);
  }

  // ═══════════════════════════════════════════
  // Estatus
  // ═══════════════════════════════════════════

  /**
   * Cambia el estatus del cálculo sin tocar sus cifras.
   *
   * Es el mismo mecanismo que usa `PresupuestoService.cambiarEstado`: `$set`
   * sobre el documento que coincide con `codigo`, validando antes que la
   * transición esté permitida (un cálculo borrado ya no se mueve).
   */
  async fijarEstado(codigo: string, estado: CalculoEstado, estadoActual?: CalculoEstado): Promise<boolean> {
    if (!codigo) return false;
    if (estadoActual && !transicionesCalculo(estadoActual).includes(estado)) {
      this.notificar.error(
        'Cambio de estatus no permitido',
        estadoActual === 'eliminado'
          ? `El cálculo ${codigo} está borrado y no admite más cambios.`
          : `El cálculo ${codigo} no puede pasar de «${infoEstadoCalculo(estadoActual).etiqueta}» a «${infoEstadoCalculo(estado).etiqueta}».`,
      );
      return false;
    }

    const ahora = new Date().toISOString();
    const fnx = {
      coleccion: environment.colecciones.CALCULO,
      objeto: { estado, actualizadoEn: ahora },
      donde: JSON.stringify({ codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    try {
      await firstValueFrom(this.api.ExecColeccion(fnx));
      const lista = this.leerCacheLocal().map((c) =>
        c.codigo === codigo ? { ...c, estado, actualizadoEn: ahora } : c,
      );
      this.guardarCacheLocal(lista);
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo cambiar el estatus',
        `El cálculo ${codigo} conserva su estatus anterior (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  // ═══════════════════════════════════════════
  // Baja
  // ═══════════════════════════════════════════

  /**
   * Borrado lógico: el cálculo se marca como eliminado y sale del listado,
   * conservándose en la base para la traza.
   */
  async eliminar(codigo: string): Promise<boolean> {
    if (!codigo) return false;

    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const fnx = {
      coleccion: environment.colecciones.CALCULO,
      objeto: {
        estado: 'eliminado',
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
      this.guardarCacheLocal(this.leerCacheLocal().filter((c) => c.codigo !== codigo));
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo eliminar el cálculo',
        `El cálculo ${codigo} sigue en el listado (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  // --- Cálculo elegido para editar (traspaso listado → editor) ---
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

  private async consultarServidor(): Promise<Calculo[]> {
    const fn = (environment as any).functions?.CONSULTAR_CALCULOS;
    if (!fn) return this.leerCacheLocal();

    try {
      const data = await firstValueFrom(this.api.Ejecutar({ funcion: fn, parametros: '' }));
      const valor = this.desempaquetar(data);

      if (valor && !Array.isArray(valor) && (valor as any).tipo !== undefined) {
        this.notificar.aviso(
          'No se pudo consultar el listado de cálculos',
          `El servidor respondió: ${(valor as any).msj ?? 'sin detalle'}. Se usa la lista local.`,
        );
        return this.leerCacheLocal();
      }

      if (Array.isArray(valor)) {
        const lista = (valor as any[]).map((c) => normalizarCalculo(c));
        this.guardarCacheLocal(lista);
        return lista;
      }
    } catch (e) {
      console.warn('[CalculoService] Falló la consulta del listado; se usa la copia local.', e);
    }
    return this.leerCacheLocal();
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
  private guardarCacheLocal(lista: Calculo[]): void {
    try {
      localStorage.setItem(this.LIST_KEY, JSON.stringify(lista));
    } catch (e) {
      // ignore
    }
  }

  private leerCacheLocal(): Calculo[] {
    try {
      const s = localStorage.getItem(this.LIST_KEY);
      if (!s) return [];
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr.map((c) => normalizarCalculo(c)) : [];
    } catch (e) {
      return [];
    }
  }

  /** Refresca la fila de la cache local sin volver a pedir el listado. */
  private fusionarEnCache(doc: Calculo): void {
    const lista = this.leerCacheLocal();
    const i = lista.findIndex((c) => c.codigo === doc.codigo);
    if (i >= 0) {
      lista[i] = doc;
    } else {
      lista.push(doc);
    }
    this.guardarCacheLocal(lista);
  }

  // --- Borrador local ---
  guardarBorradorLocal(calculo: Calculo): void {
    try {
      localStorage.setItem(this.BORRADOR_KEY, JSON.stringify(calculo));
    } catch (e) {
      // ignore
    }
  }

  leerBorradorLocal(): Calculo | null {
    try {
      const s = localStorage.getItem(this.BORRADOR_KEY);
      if (!s) return null;
      return normalizarCalculo(JSON.parse(s));
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

/** ¿El cálculo fue descartado? (copia local para no importar el modelo aquí). */
function estaEliminado(c: Pick<Calculo, 'estado'> | undefined): boolean {
  return c?.estado === 'eliminado';
}
