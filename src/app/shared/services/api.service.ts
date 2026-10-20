import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IAPICore {
  funcion?: string;
  parametros?: string;
  valores?: any;
  coleccion?: string;
  driver?: string;
  donde?: string;
  upsert?: boolean;
  alias?: string;
}

/**
 * Petición del servicio de correo saliente (`POST /v1/api/email/enviar`).
 * Corresponde a `service.peticionEmail` del servidor.
 */
export interface IPeticionCorreo {
  para: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  asunto: string;
  html?: string;
  texto?: string;
  responder_a?: string;
  remitente?: string;
  /** Rutas de archivos ya almacenados en Sandra (modo JSON) */
  archivos?: string[];
  /**
   * Adjunto generado en el cliente (p. ej. el PDF del acuerdo). Su presencia
   * cambia la codificación de la petición a `multipart/form-data`, que es lo
   * que el servidor espera para subir archivos en el campo `archivos`.
   */
  adjunto?: AdjuntoCorreo;
  /**
   * Imágenes que se incrustan en el cuerpo del HTML. Cada una viaja con su
   * nombre como Content-ID, de modo que el cuerpo las referencia con
   * `cid:<nombre>`. Gmail y Outlook descartan los data: URI, así que esta es
   * la única forma de que el documento se vea dentro del mensaje.
   */
  adjuntosInline?: AdjuntoCorreo[];
  /** Clave de idempotencia para evitar envíos duplicados en reintentos */
  idempotencia?: string;
}

/** Archivo que se envía junto al correo, generado en el navegador */
export interface AdjuntoCorreo {
  nombre: string;
  contenido: Blob;
  contentType?: string;
}

/** Operador de la divisa cuya tasa se consulta. */
export type MonedaDivisa = 'dolar' | 'euro';

/** Cuerpo de datos de `POST /v1/api/divisa`. */
export interface DatosDivisa {
  moneda: string;
  simbolo: string;
  /** Valor en bolívares, en formato venezolano: "881,06640000" */
  valor: string;
  /** Fecha publicada: "Lunes, 19 Octubre 2026" */
  fecha: string;
  /** Página oficial de la que proviene el valor */
  url: string;
  es_historico?: boolean;
  timestamp?: string;
}

/** Respuesta de `POST /v1/api/divisa`. */
export interface RespuestaDivisa {
  success?: boolean;
  data: DatosDivisa;
  mensaje?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly URL = environment.API;
  private readonly hash = environment.Hash;

  constructor(private http: HttpClient) {}

  /**
   * Headers con JWT token
   */
  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };
  }

  /**
   * Login: POST a wusuario/loginV2
   */
  login(usuario: string, clave: string, deviceContext?: string): Observable<any> {
    const timestamp = new Date().getTime().toString();
    const body = { nombre: usuario, clave };

    const headers: any = {
      'X-Skip-Interceptor': 'true',
      'Content-Type': 'application/json',
      'X-Timestamp': timestamp,
      'Web-API-key': environment.Hash,
    };

    if (deviceContext) {
      headers['X-Device-Context'] = deviceContext;
    }

    const url = this.URL + 'wusuario/loginV2';
    return this.http.post(url, body, {
      headers: new HttpHeaders(headers),
    });
  }

  /**
   * Ejecutar API genérica (CRUD)
   */
  Ejecutar(xAPI: IAPICore): Observable<any> {
    const url = this.URL + 'crud:' + this.hash;
    return this.http.post<any>(url, xAPI, this.httpOptions);
  }

  /**
   * Validar código TOTP
   */
  Validar_TOTP(codigo: string, tempAuthToken: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + tempAuthToken,
        'X-Skip-Interceptor': 'true',
      }),
    };

    const url = this.URL + 'wusuario/vtotp';
    return this.http.post<any>(url, { codigo }, options);
  }

  /**
   * Verificar múltiples sesiones
   */
  MultipleSesion(tempAuthToken: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + tempAuthToken,
        'X-Skip-Interceptor': 'true',
      }),
    };

    const url = this.URL + 'wusuario/multiplesesion';
    return this.http.post<any>(url, {}, options);
  }

  /**
   * Generar código QR TOTP
   */
  GenerarQR_TOTP(tipo: string): Observable<any> {
    const url = this.URL + 'wusuario/gtotp/' + tipo;
    return this.http.post<any>(url, {}, this.httpOptions);
  }

  /**
   * Obtener imagen QR como base64
   */
  GetImageQR(id: string): Observable<any> {
    const url = this.URL + 'imgslocalbase64/' + id;
    return this.http.get(url, this.httpOptions);
  }

  /**
   * Ejecutar coleccion
   */
  ExecColeccion(xObjeto: any): Observable<any> {
    const url = this.URL + 'ccoleccion';
    return this.http.post<any>(url, xObjeto, this.httpOptions);
  }

  // ─────────────────────────── Superficie anónima ───────────────────────────
  // Las rutas siguientes NO requieren JWT. Se usan en el flujo de recuperación
  // de contraseña, que ocurre ANTES de autenticarse. El interceptor añade igual
  // la firma HMAC (Web-API-key / X-Signature / X-Timestamp) por uniformidad.

  /**
   * CRUD anónimo: `POST /devel/api/crud:{funcion}` — ejecuta funciones apicore
   * (`_SYS_*`) sin sesión. Cuerpo: `{ funcion, parametros }`. Devuelve
   * directamente las filas del driver (`[{...}]`).
   */
  EjecutarAnonimo(xAPI: IAPICore): Observable<any> {
    const url = environment.DEVEL + 'crud:' + xAPI.funcion;
    return this.http.post<any>(url, xAPI, this.httpOptions);
  }

  /**
   * Colección anónima: `POST /v1/xapi/ccoleccion` — upsert / insert sobre
   * cualquier colección sin sesión. Cuerpo: `{ coleccion, donde, objeto,
   * upsert, driver }` (`donde` es un string con el filtro en JSON). Devuelve
   * el `UpdateResult` de Mongo: `{ matchedCount, modifiedCount, upsertedCount,
   * upsertedID }`.
   */
  ColeccionAnonima(xObjeto: any): Observable<any> {
    const url = environment.XAPI + 'ccoleccion';
    return this.http.post<any>(url, xObjeto, this.httpOptions);
  }

  /**
   * Funciones nativas anónimas: `POST /devel/api/fnx` — invoca una función
   * registrada (p.ej. `email.enviar`) con pares clave/valor como argumentos.
   * Requiere el documento correspondiente en la colección Mongo `funciones`
   * (`{ nombre, lenguaje: 'NATIVA', codigo: '<nombre-registrada>' }`).
   */
  FnxAnonima(peticion: Record<string, any>): Observable<any> {
    const url = environment.DEVEL + 'fnx';
    return this.http.post<any>(url, peticion, this.httpOptions);
  }

  /**
   * Tasa oficial de una divisa (BCV).
   *
   * El valor llega en formato venezolano ("881,06640000"): hay que pasarlo por
   * `parsearNumero` antes de usarlo en cuentas.
   */
  Divisa(moneda: MonedaDivisa): Observable<RespuestaDivisa> {
    const url = this.URL + 'divisa';
    return this.http.post<RespuestaDivisa>(url, { moneda }, this.httpOptions);
  }

  /**
   * Enviar correo saliente (proveedor Resend a través de Sandra Server).
   * Devuelve { tipo, msj, contenido: { id, para, adjuntos, enviado_en } }.
   *
   * Sin adjunto la petición va en JSON; con adjunto cambia a
   * multipart/form-data, que es la única codificación con la que el servidor
   * acepta subir archivos (campo `archivos`). Las listas (`para`, `cc`,
   * `bcc`) viajan en un solo campo separadas por comas, igual que las
   * interpreta `service.ExpandirLista`.
   */
  EnviarCorreo(peticion: IPeticionCorreo): Observable<any> {
    const url = this.URL + 'email/enviar';
    const { adjunto, adjuntosInline, ...campos } = peticion;
    const inline = adjuntosInline ?? [];

    if (!adjunto && inline.length === 0) {
      return this.http.post<any>(url, campos, this.httpOptions);
    }

    const datos = new FormData();
    for (const [clave, valor] of Object.entries(campos)) {
      if (valor === undefined || valor === null) {
        continue;
      }
      datos.append(clave, Array.isArray(valor) ? valor.join(', ') : String(valor));
    }
    if (adjunto) {
      datos.append('archivos', conTipoDeclarado(adjunto), adjunto.nombre);
    }
    // El nombre del archivo es el Content-ID con el que el HTML lo referencia.
    // El tipo declarado tiene que viajar en la pieza: sin un image/* explícito
    // el cliente de correo trata la imagen como documento y no la pinta.
    for (const imagen of inline) {
      datos.append('archivos_inline', conTipoDeclarado(imagen), imagen.nombre);
    }

    // Sin Content-Type: el navegador agrega el boundary del multipart
    const opciones = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };

    return this.http.post<any>(url, datos, opciones);
  }
}

/**
 * Devuelve el contenido del adjunto con el tipo que declara el modelo.
 *
 * `FormData.append` toma el Content-Type de la pieza del propio Blob, así que
 * un Blob sin tipo viaja como application/octet-stream por mucho que el modelo
 * diga otra cosa. Cuando los dos no coinciden se envuelve el Blob para que el
 * tipo declarado sea el que de verdad viaja.
 */
function conTipoDeclarado(adjunto: AdjuntoCorreo): Blob {
  const tipo = adjunto.contentType?.trim();
  if (!tipo || adjunto.contenido.type === tipo) {
    return adjunto.contenido;
  }
  return new Blob([adjunto.contenido], { type: tipo });
}
