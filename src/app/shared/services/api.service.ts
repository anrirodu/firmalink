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
  /** Clave de idempotencia para evitar envíos duplicados en reintentos */
  idempotencia?: string;
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

  /**
   * Enviar correo saliente (proveedor Resend a través de Sandra Server).
   * Devuelve { tipo, msj, contenido: { id, para, adjuntos, enviado_en } }.
   */
  EnviarCorreo(peticion: IPeticionCorreo): Observable<any> {
    const url = this.URL + 'email/enviar';
    return this.http.post<any>(url, peticion, this.httpOptions);
  }
}
