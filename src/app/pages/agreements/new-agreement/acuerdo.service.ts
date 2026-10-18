import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { Sha256Service } from '../../../shared/utils/sha256.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import {
  Acuerdo,
  AcuerdoEstado,
  AcuerdoMargen,
  estaEliminado,
  extraerConsecutivo,
  generarCodigo,
  transicionesPermitidas,
} from './acuerdo.model';

@Injectable({ providedIn: 'root' })
export class AcuerdoService {
  private readonly LIST_KEY = 'firmalink:acuerdos:list';
  private readonly BORRADOR_KEY = 'firmalink:acuerdo:borrador';

  constructor(
    private api: ApiService,
    private sha: Sha256Service,
    private notificar: NotificacionService,
    private auth: AuthService,
  ) {}

  /**
   * Guarda/actualiza un acuerdo vía ccoleccion con upsert por codigo
   */
  guardar(acuerdo: Acuerdo): Observable<Acuerdo> {
    const ahora = new Date().toISOString();
    const payload: Acuerdo = {
      ...acuerdo,
      // Un código puede quedar libre tras un borrado lógico: al reutilizarlo,
      // el upsert $set debe limpiar la bandera para que el acuerdo nuevo sí
      // aparezca en el listado.
      eliminado: false,
      actualizadoEn: ahora,
      creadoEn: acuerdo.creadoEn ?? ahora,
      hashAlgoritmo: 'SHA-256',
    };

    const fnx = {
      coleccion: environment.colecciones.ACUERDO,
      objeto: payload,
      donde: JSON.stringify({ codigo: payload.codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    return this.api.ExecColeccion(fnx).pipe(
      map((res) => payload),
      catchError((err) => {
        console.error('[AcuerdoService] Error guardando:', err);
        throw err;
      }),
    );
  }

  /**
   * Lista acuerdos visibles: excluye los marcados con borrado lógico.
   *
   * La numeración (siguienteCodigo) pide `incluirEliminados = true`: un código
   * que ya se usó no se reutiliza aunque su registro haya sido eliminado.
   */
  async listar(incluirEliminados = false): Promise<Acuerdo[]> {
    const lista = await this.consultarServidor();
    return incluirEliminados ? lista : lista.filter((a) => !estaEliminado(a));
  }

  /**
   * Acuerdos de un cliente.
   *
   * El filtro lo resuelve el servidor (`_SYS_CFirmaLinkAcuerdosCliente` consulta
   * por `cliente.codigo`): al abrir "Ver acuerdos" desde la ficha de un cliente
   * solo viajan sus registros. Si la función no está registrada se cae al
   * listado completo filtrado en el navegador.
   */
  async listarPorCliente(codigo: string, incluirEliminados = false): Promise<Acuerdo[]> {
    if (!codigo) {
      return this.listar(incluirEliminados);
    }

    const fn = (environment as any).functions?.CONSULTAR_ACUERDOS_CLIENTE;
    const delServidor = await this.consultarServidorRemoto(
      fn,
      codigo,
      `los acuerdos de ${codigo}`,
      false,
    );
    const lista = delServidor ?? this.filtrarPorCliente(this.leerCacheLocal(), codigo);
    return incluirEliminados ? lista : lista.filter((a) => !estaEliminado(a));
  }

  /** Respaldo local del vínculo: acuerdos cuya copia apunta a ese cliente. */
  private filtrarPorCliente(lista: Acuerdo[], codigo: string): Acuerdo[] {
    return lista.filter((a) => a.cliente?.codigo === codigo);
  }

  /**
   * Consulta el listado completo del servidor (con los mismos avisos de
   * degradación a cache local).
   */
  private async consultarServidor(): Promise<Acuerdo[]> {
    const lista = await this.consultarServidorRemoto(
      (environment as any).functions?.CONSULTAR_ACUERDOS,
      '',
      'el listado de acuerdos',
      true,
    );
    return lista ?? this.leerCacheLocal();
  }

  /**
   * Ejecuta una función `apicore` de consulta de acuerdos y desempaqueta la
   * respuesta del motor. Devuelve null cuando hubo aviso o error.
   *
   * @param cachear guarda la respuesta como listado local (solo el listado
   *   completo: una consulta por cliente no debe pisar la cache del navegador,
   *   que alimenta la numeración offline).
   */
  private async consultarServidorRemoto(
    fn: string | undefined,
    parametros: string,
    contexto: string,
    cachear: boolean,
  ): Promise<Acuerdo[] | null> {
    if (!fn) {
      return null;
    }

    try {
      const data = await firstValueFrom(this.api.Ejecutar({ funcion: fn, parametros }));
      const cuerpo: any = (data as any)?.Cuerpo !== undefined ? (data as any).Cuerpo : data;
      let valor: any = cuerpo;
      if (typeof valor === 'string') {
        try {
          valor = JSON.parse(valor);
        } catch (e) {
          valor = [];
        }
      }

      // Respuesta del motor cuando la función no está registrada o falló: { msj, tipo }
      // tipo 77 = "Error en la funcion" (incluye "Verifique la funcion no exite")
      if (valor && !Array.isArray(valor) && valor.tipo !== undefined) {
        this.notificar.aviso(
          `No se pudo consultar ${contexto}`,
          `El servidor respondió: ${valor.msj ?? 'sin detalle'}.` +
            (cachear ? ' La numeración se calcula con la lista local de este navegador.' : ''),
        );
        return null;
      }

      if (Array.isArray(valor)) {
        const lista = valor as Acuerdo[];
        if (cachear) {
          this.guardarCacheLocal(lista);
        }
        return lista;
      }

      this.notificar.aviso(
        `Respuesta inesperada al consultar ${contexto}`,
        `La función ${fn} no devolvió una lista.`,
      );
    } catch (e) {
      console.warn(`[AcuerdoService] Falló la consulta de ${contexto}; se usa la copia local.`, e);
      this.notificar.aviso(
        `No se pudo consultar ${contexto}`,
        `Error de comunicación con el servidor (${NotificacionService.detalle(e)}).` +
          (cachear ? ' La numeración se calcula con la lista local de este navegador.' : ''),
      );
    }
    return null;
  }

  /**
   * Obtiene un acuerdo COMPLETO por su código (incluye documentoHtml y campos).
   * El listado usa una proyección liviana, por eso al continuar una edición se
   * relee el documento con esta función.
   */
  async obtener(codigo: string): Promise<Acuerdo | null> {
    if (!codigo) return null;
    const fn = (environment as any).functions?.CONSULTAR_ACUERDO;
    if (fn) {
      try {
        const data = await firstValueFrom(
          this.api.Ejecutar({ funcion: fn, parametros: codigo }),
        );
        let cuerpo = (data as any)?.Cuerpo !== undefined ? (data as any).Cuerpo : data;
        if (typeof cuerpo === 'string') {
          try {
            cuerpo = JSON.parse(cuerpo);
          } catch (e) {
            cuerpo = null;
          }
        }

        if (cuerpo && !Array.isArray(cuerpo) && (cuerpo as any).tipo !== undefined) {
          this.notificar.aviso(
            'No se pudo leer el acuerdo',
            `El servidor respondió: ${(cuerpo as any).msj ?? 'sin detalle'}. ` +
              'Se intentará con la copia local del listado.',
          );
        } else if (Array.isArray(cuerpo)) {
          const doc = (cuerpo[0] as Acuerdo) ?? null;
          if (doc) return doc;
        } else if (cuerpo && typeof cuerpo === 'object') {
          return cuerpo as Acuerdo;
        }
      } catch (e) {
        console.warn('[AcuerdoService] Falló lectura del acuerdo por función.', e);
        this.notificar.aviso(
          'No se pudo leer el acuerdo desde el servidor',
          `Error de comunicación (${NotificacionService.detalle(e)}). ` +
            'Se intentará con la copia local.',
        );
      }
    }

    // Respaldo: listado local o borrador (sin documentoHtml si la proyección es liviana)
    const local = this.leerCacheLocal().find((a) => a.codigo === codigo);
    if (local) return local;
    const borrador = this.leerBorradorLocal();
    return borrador && borrador.codigo === codigo ? borrador : null;
  }

  // --- Acuerdo elegido para editar (traspaso listado → editor) ---
  private readonly EDITAR_KEY = 'firmalink:acuerdo:editar';

  /** Documento completo ya leído en el listado (evita una segunda consulta). */
  private acuerdoParaEditar: Acuerdo | null = null;

  setAcuerdoParaEditar(acuerdo: Acuerdo | null): void {
    this.acuerdoParaEditar = acuerdo;
  }

  /** Devuelve el documento pre-cargado y lo consume (una sola vez). */
  tomarAcuerdoParaEditar(): Acuerdo | null {
    const doc = this.acuerdoParaEditar;
    this.acuerdoParaEditar = null;
    return doc;
  }

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

  /**
   * Cambia solo el estado de un acuerdo.
   *
   * Se usa `upsert: true` a propósito: el backend resuelve `upsert:true` con
   * `UpdateOne($set)` sobre el filtro { codigo }, mientras que `upsert:false`
   * hace un `Insert` (crearía un documento parcial como fila nueva —
   * ver core/api/panel.go, CrearColeccion). El $set es parcial, así que ni el
   * documento ni la huella se tocan; y como la huella SHA-256 no incluye el
   * estado, sigue siendo válida.
   *
   * Si se recibe el estado actual se validan las transiciones: un acuerdo
   * firmado solo puede anularse (nunca volver a un estado editable).
   */
  async cambiarEstado(
    codigo: string,
    estado: Acuerdo['estado'],
    estadoActual?: Acuerdo['estado'],
  ): Promise<boolean> {
    if (!codigo) return false;

    if (estadoActual && !transicionesPermitidas(estadoActual).includes(estado)) {
      this.notificar.error(
        'Cambio de estado no permitido',
        estadoActual === 'firmado'
          ? `El acuerdo ${codigo} está firmado y solo puede anularse.`
          : `El acuerdo ${codigo} está anulado y no admite más cambios de estado.`,
      );
      return false;
    }

    const fnx = {
      coleccion: environment.colecciones.ACUERDO,
      objeto: { estado, actualizadoEn: new Date().toISOString() },
      donde: JSON.stringify({ codigo }),
      driver: environment.driver.PRINCIPAL,
      upsert: true,
    };

    try {
      await firstValueFrom(this.api.ExecColeccion(fnx));
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo cambiar el estado',
        `El acuerdo ${codigo} conserva su estado anterior (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  /**
   * Elimina un acuerdo del listado (borrado lógico).
   *
   * El endpoint `ccoleccion` solo admite Insert/Upsert —no borrados físicos—,
   * así que el registro se actualiza con el estado `eliminado` y deja de
   * aparecer en el listado, conservándose en la base de datos para la
   * trazabilidad. Un acuerdo FIRMADO no se elimina nunca: su contenido y su
   * huella son un documento cerrado (en su lugar puede anularse).
   *
   * @param estadoActual estado del acuerdo en la lista, para la validación.
   * @returns true si el acuerdo quedó marcado como eliminado.
   */
  async eliminar(codigo: string, estadoActual?: Acuerdo['estado']): Promise<boolean> {
    if (!codigo) return false;

    if (estadoActual === 'firmado') {
      this.notificar.error(
        'Acuerdo firmado: no se puede eliminar',
        `El acuerdo ${codigo} está firmado: su contenido y su huella son definitivos. ` +
          'Si ya no lo necesita, márquelo como Anulado.',
      );
      return false;
    }

    const ahora = new Date().toISOString();
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;

    const fnx = {
      coleccion: environment.colecciones.ACUERDO,
      objeto: {
        estado: 'eliminado' as AcuerdoEstado,
        // Señal redundante para los registros borrados por versiones previas
        eliminado: true,
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
      // La cache local del navegador también pierde el registro: así la vista
      // offline y la numeración quedan coherentes con el servidor.
      this.guardarCacheLocal(this.leerCacheLocal().filter((a) => a.codigo !== codigo));
      return true;
    } catch (e) {
      this.notificar.error(
        'No se pudo eliminar el acuerdo',
        `El acuerdo ${codigo} sigue en el listado (${NotificacionService.detalle(e)}).`,
      );
      return false;
    }
  }

  /**
   * Siguiente código: busca consecutivo máximo (local + borrador)
   */
  async siguienteCodigo(prefijo: string, anio?: number): Promise<string> {
    const year = anio ?? new Date().getFullYear();
    // Los acuerdos eliminados siguen contando: su código no se reutiliza.
    const lista = await this.listar(true);
    const borrador = this.leerBorradorLocal();
    let max = 0;

    for (const a of lista) {
      if (a.prefijo === prefijo && a.anio === year) {
        const n = extraerConsecutivo(a.codigo);
        if (n > max) max = n;
      }
    }
    if (borrador && borrador.prefijo === prefijo && borrador.anio === year) {
      const n = extraerConsecutivo(borrador.codigo);
      if (n > max) max = n;
    }

    const sig = max + 1;
    return generarCodigo(prefijo, sig, year);
  }

  /**
   * Huella canónica del acuerdo (sin pie de impresión)
   */
  async huella(acuerdo: Partial<Acuerdo>): Promise<string> {
    const campos = acuerdo.campos ?? {};
    const html = acuerdo.documentoHtml ?? '';
    const margen: AcuerdoMargen = acuerdo.margen ?? { sup: 2.5, inf: 2.5, izq: 3, der: 2.5 };
    const codigo = acuerdo.codigo ?? '';
    const prefijo = acuerdo.prefijo ?? 'CJS';
    const anio = acuerdo.anio ?? new Date().getFullYear();
    const canon = JSON.stringify(campos) + '|' + html + '|' + JSON.stringify(margen) + '|' + codigo + '|' + prefijo + '|' + anio;
    return this.sha.hash(canon);
  }

  // --- Cache local de listados ---
  private guardarCacheLocal(lista: Acuerdo[]): void {
    try {
      localStorage.setItem(this.LIST_KEY, JSON.stringify(lista));
    } catch (e) {
      // ignore
    }
  }

  private leerCacheLocal(): Acuerdo[] {
    try {
      const s = localStorage.getItem(this.LIST_KEY);
      if (!s) return [];
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  // --- Borrador local ---
  guardarBorradorLocal(acuerdo: Acuerdo): void {
    try {
      localStorage.setItem(this.BORRADOR_KEY, JSON.stringify(acuerdo));
    } catch (e) {
      // ignore
    }
  }

  leerBorradorLocal(): Acuerdo | null {
    try {
      const s = localStorage.getItem(this.BORRADOR_KEY);
      if (!s) return null;
      const obj = JSON.parse(s);
      return obj as Acuerdo;
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
