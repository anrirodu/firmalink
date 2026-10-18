import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';
import {
  Cliente,
  EstadoCliente,
  codigoClienteValido,
  extraerConsecutivoCliente,
  generarCodigoCliente,
  nombreCliente,
  normalizarCliente,
  prepararParaGuardar,
} from './cliente.model';

/** Ya existe otro cliente con el mismo documento de identidad. */
export class ClienteDuplicadoError extends Error {
  constructor(readonly existente: Cliente) {
    super(
      `El documento ${existente.identificacion} ya pertenece al cliente ${existente.codigo} ` +
        `(${nombreCliente(existente)}).`,
    );
    this.name = 'ClienteDuplicadoError';
  }
}

/** Respuesta de `ccoleccion` con upsert (mongo.UpdateResult serializado por Sandra). */
interface ResultadoUpsert {
  MatchedCount?: number;
  ModifiedCount?: number;
  UpsertedCount?: number;
  UpsertedID?: unknown;
}

/** Intentos de alta ante una colisión de código correlativo con otro usuario. */
const INTENTOS_ALTA = 3;

/**
 * ClienteService — persistencia de clientes en `firmalink_clientes`.
 *
 * - Lectura: funciones `apicore` (`_SYS_CFirmaLinkClientes` liviana para el
 *   listado y `_SYS_CFirmaLinkCliente` con el documento completo).
 * - Escritura: `ccoleccion` con `upsert: true` (UpdateOne + $set). Con
 *   `upsert: false` el backend hace un Insert en la BD por defecto, ignorando
 *   el driver, así que nunca se usa.
 * - Sin borrado físico: "Eliminar" es un borrado lógico.
 *
 * A diferencia de los acuerdos, los clientes NO se guardan en
 * localStorage: son datos personales (cédulas, teléfonos, domicilios) y no
 * deben quedar en el navegador más allá de la sesión.
 */
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);

  /**
   * Todos los clientes, incluidos los eliminados: la página los oculta, pero
   * hacen falta para la numeración y para detectar documentos repetidos.
   */
  async listar(): Promise<Cliente[]> {
    const funcion = environment.functions.CONSULTAR_CLIENTES;
    const data = await firstValueFrom(this.api.Ejecutar({ funcion, parametros: '' }));
    return this.interpretarConsulta(data, funcion).map((doc) =>
      normalizarCliente(doc as Partial<Cliente>),
    );
  }

  /** Documento completo de un cliente (el listado trae una proyección liviana). */
  async obtener(codigo: string): Promise<Cliente> {
    this.exigirCodigo(codigo);
    const funcion = environment.functions.CONSULTAR_CLIENTE;
    const data = await firstValueFrom(this.api.Ejecutar({ funcion, parametros: codigo }));
    const [doc] = this.interpretarConsulta(data, funcion);
    if (!doc) {
      throw new Error(`No se encontró el cliente ${codigo} en el servidor.`);
    }
    return normalizarCliente(doc as Partial<Cliente>);
  }

  /**
   * Registra o actualiza un cliente y devuelve el documento persistido.
   *
   * Alta: el código se calcula con el listado fresco del servidor y el upsert
   * filtra por `{codigo, identificacion}`. Si otro usuario tomó ese código
   * para OTRO cliente, el filtro no coincide, el upsert intenta insertar y el
   * índice único de `codigo` lo rechaza (Sandra responde `null`): se reintenta
   * con el siguiente código en lugar de sobrescribir al otro cliente.
   *
   * @throws ClienteDuplicadoError si el documento ya pertenece a otro cliente.
   */
  async guardar(entrada: Cliente, opciones: { nuevo: boolean; restaurar?: boolean }): Promise<Cliente> {
    const ahora = new Date().toISOString();
    const usuario = this.usuarioActual();
    const doc: Cliente = {
      ...prepararParaGuardar(entrada),
      // Guardar siempre deja visible al cliente (también al restaurar uno eliminado)
      eliminado: false,
      actualizadoEn: ahora,
      actualizadoPorCedula: usuario.cedula,
      actualizadoPorNombre: usuario.nombre,
    };
    if (doc.estado === 'eliminado') {
      doc.estado = 'activo';
    }
    if (opciones.restaurar) {
      doc.restauradoEn = ahora;
    }

    if (!opciones.nuevo) {
      this.exigirCodigo(doc.codigo);
      this.exigirUnico(await this.listar(), doc);
      const resultado = await this.upsert({ codigo: doc.codigo }, doc);
      if (!resultado) {
        // El índice único de `identificacion` también responde null
        this.exigirUnico(await this.listar(), doc);
        throw new Error('El servidor no confirmó el guardado del cliente.');
      }
      return doc;
    }

    for (let intento = 1; intento <= INTENTOS_ALTA; intento++) {
      const lista = await this.listar();
      this.exigirUnico(lista, doc);

      const nuevo: Cliente = {
        ...doc,
        codigo: this.siguienteCodigo(lista),
        creadoEn: ahora,
        creadoPorCedula: usuario.cedula,
        creadoPorNombre: usuario.nombre,
      };
      const resultado = await this.upsert(
        { codigo: nuevo.codigo, identificacion: nuevo.identificacion },
        nuevo,
      );
      if (resultado) {
        return nuevo;
      }
    }
    throw new Error('No se pudo asignar un código único al cliente. Intente de nuevo.');
  }

  /** Cambia solo el estado (upsert parcial: el resto del documento no se toca). */
  async cambiarEstado(codigo: string, estado: Exclude<EstadoCliente, 'eliminado'>): Promise<void> {
    this.exigirCodigo(codigo);
    const usuario = this.usuarioActual();
    const resultado = await this.upsert(
      { codigo },
      {
        estado,
        actualizadoEn: new Date().toISOString(),
        actualizadoPorCedula: usuario.cedula,
        actualizadoPorNombre: usuario.nombre,
      },
    );
    if (!resultado) {
      throw new Error('El servidor no confirmó el cambio de estado.');
    }
  }

  /**
   * Borrado lógico: el endpoint `ccoleccion` no admite borrados físicos. El
   * registro se conserva (trazabilidad) y su documento queda reservado: si se
   * vuelve a registrar, el formulario ofrece restaurarlo.
   */
  async eliminar(codigo: string): Promise<void> {
    this.exigirCodigo(codigo);
    const usuario = this.usuarioActual();
    const ahora = new Date().toISOString();
    const resultado = await this.upsert(
      { codigo },
      {
        estado: 'eliminado',
        eliminado: true,
        eliminadoEn: ahora,
        eliminadoPorCedula: usuario.cedula,
        eliminadoPorNombre: usuario.nombre,
        actualizadoEn: ahora,
      },
    );
    if (!resultado) {
      throw new Error('El servidor no confirmó la eliminación.');
    }
  }

  /** Siguiente código: los eliminados también cuentan (un código no se reutiliza). */
  siguienteCodigo(lista: readonly Cliente[]): string {
    const maximo = lista.reduce((max, c) => Math.max(max, extraerConsecutivoCliente(c.codigo)), 0);
    return generarCodigoCliente(maximo + 1);
  }

  // ─────────────────────────── internos ───────────────────────────

  private exigirCodigo(codigo: string): void {
    if (!codigoClienteValido(codigo)) {
      throw new Error(`Código de cliente inválido: "${codigo ?? ''}".`);
    }
  }

  private exigirUnico(lista: readonly Cliente[], doc: Cliente): void {
    const existente = lista.find(
      (c) => c.identificacion === doc.identificacion && c.codigo !== doc.codigo,
    );
    if (existente) {
      throw new ClienteDuplicadoError(existente);
    }
  }

  private async upsert(
    donde: Record<string, string>,
    objeto: Partial<Cliente>,
  ): Promise<ResultadoUpsert | null> {
    const respuesta = await firstValueFrom(
      this.api.ExecColeccion({
        coleccion: environment.colecciones.CLIENTE,
        objeto,
        donde: JSON.stringify(donde),
        driver: environment.driver.PRINCIPAL,
        upsert: true,
      }),
    );
    // Éxito: {MatchedCount, ModifiedCount, UpsertedCount, UpsertedID}.
    // Si Mongo rechaza la operación (p. ej. índice único), Sandra responde null.
    if (!respuesta || typeof respuesta !== 'object' || Array.isArray(respuesta)) {
      return null;
    }
    const resultado = respuesta as ResultadoUpsert;
    return typeof resultado.MatchedCount === 'number' || typeof resultado.UpsertedCount === 'number'
      ? resultado
      : null;
  }

  /**
   * Normaliza la respuesta del motor de funciones. Los errores llegan con
   * HTTP 200 y cuerpo `{ msj, tipo }` (tipo 77 = error o función inexistente).
   */
  private interpretarConsulta(data: unknown, funcion: string): unknown[] {
    let cuerpo: unknown =
      data && typeof data === 'object' && 'Cuerpo' in data ? (data as { Cuerpo: unknown }).Cuerpo : data;

    if (typeof cuerpo === 'string') {
      try {
        cuerpo = JSON.parse(cuerpo);
      } catch {
        throw new Error(`La función ${funcion} devolvió una respuesta ilegible.`);
      }
    }
    if (cuerpo === null || cuerpo === undefined) {
      return [];
    }
    if (Array.isArray(cuerpo)) {
      return cuerpo;
    }
    if (typeof cuerpo === 'object' && 'tipo' in cuerpo) {
      const { msj, tipo } = cuerpo as { msj?: string; tipo?: number };
      const pista = tipo === 77 ? ` Verifique que la función ${funcion} esté registrada en apicore.` : '';
      throw new Error(`El servidor respondió: ${msj ?? 'sin detalle'}.${pista}`);
    }
    if (typeof cuerpo === 'object') {
      return [cuerpo];
    }
    throw new Error(`La función ${funcion} no devolvió una lista.`);
  }

  private usuarioActual(): { cedula: string; nombre: string } {
    const usuario = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '')?.Usuario;
    return { cedula: usuario?.cedula ?? '', nombre: usuario?.nombre ?? '' };
  }
}
