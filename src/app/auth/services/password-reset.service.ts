import { Injectable, inject } from '@angular/core';
import { Observable, catchError, firstValueFrom, from, map, of, switchMap, throwError } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { Sha256Service } from '../../shared/utils/sha256.service';
import {
  VIGENCIA_MINUTOS,
  htmlRecuperacion,
  textoRecuperacion,
} from '../correo/recuperacion-correo';
import { environment } from '../../../environments/environment';
import { CONFIG } from '../../config';

export { VIGENCIA_MINUTOS };

/** Respuesta envuelta de `utils.Mensajes` del servidor. */
interface MensajesBackend {
  tipo?: number;
  msj?: string;
  contenido?: any;
}

/** `UpdateResult` de Mongo devuelto por `xapi/ccoleccion` (ambas grafías). */
interface ResultadoUpsert {
  matchedCount?: number;
  MatchedCount?: number;
  modifiedCount?: number;
  upsertedCount?: number;
  upsertedID?: unknown;
}

/** Usuario resuelto a partir del correo ingresado. */
export interface UsuarioRecuperacion {
  login: string;
  correo: string;
}

/** Formato mínimo de un correo: algo@dominio.tld, sin espacios. */
const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

/** Estado del token de la URL al abrir `recover-password/:token`. */
export interface EstadoToken {
  valido: boolean;
  login: string;
}

/**
 * PasswordResetService — flujo "¿Olvidó su contraseña?" de FirmaLink.
 *
 * Todo ocurre pre-autenticación sobre la superficie anónima de Sandra:
 *
 *  1. Validar el correo contra la colección `usuario` (campo `correo`) con
 *     `_SYS_CFirmaLinkUsuarioPorCorreo` vía `xapi/crud` — ANTES de enviar nada.
 *  2. Generar un token de 192 bits, persistirlo en `firmalink_password_resets`
 *     (upsert por `login`: un enlace nuevo invalida al anterior) y enviar el
 *     correo con el enlace a `recover-password/<token>` vía la función nativa
 *     `email.enviar` (`/devel/api/fnx`).
 *  3. Validar el token de la URL (no usado y dentro de los 15 minutos) y, al
 *     confirmar la clave nueva, consumirlo de forma atómica (matchedCount) y
 *     actualizar `usuario.clave` con el hash SHA-256 — el mismo formato que usa
 *     el cambio de contraseña autenticado (`_SYS_UUserPanel`).
 *
 * Formato del token: `<b64url(login)>.<hex(24 bytes aleatorios)>`. El prefijo
 * transporta el `login` para que la página de restablecimiento sepa a quién
 * pertenece (el correo se resuelve una sola vez, en la solicitud); la parte
 * aleatoria (192 bits) no admite adivinanza y su valor exacto vive solo en el
 * documento del servidor, de modo que alterar el prefijo invalida el enlace.
 */
@Injectable({ providedIn: 'root' })
export class PasswordResetService {
  private readonly api = inject(ApiService);
  private readonly sha256 = inject(Sha256Service);

  private get coleccionResets(): string {
    return environment.colecciones.PASSWORD_RESET;
  }

  // ─────────────────────── 1. Solicitar el enlace ───────────────────────

  /**
   * Valida que el correo pertenezca a un usuario registrado (`usuario.correo`)
   * y, si lo es, persiste el token y envía el correo de recuperación.
   * Lanza Error con el mensaje apto para el usuario en caso contrario.
   */
  solicitar(correo: string): Observable<void> {
    return this.validarCorreoRegistrado(correo).pipe(
      switchMap((usuario) => from(this.emitirEnlace(usuario))),
    );
  }

  /**
   * Consulta `_SYS_CFirmaLinkUsuarioPorCorreo` (apicore: FIND anónimo sobre
   * `usuario` filtrando por `correo`, proyección `login`+`correo`) y exige que
   * la fila devuelta traiga el `correo` ingresado (case-insensitive).
   *
   * Los usuarios del sistema no usan su correo como `login`
   * (p. ej. `elpoloxdriguez@gmail.com` → `login: elpoloxrodriguez`), por eso la
   * búsqueda debe hacerse por `correo` y no con `_SYS_CUserPanelLogin`.
   */
  validarCorreoRegistrado(correo: string): Observable<UsuarioRecuperacion> {
    const limpio = correo.trim().toLowerCase();
    if (!limpio) {
      return throwError(() => new Error('Ingrese un correo electrónico válido.'));
    }
    // Sin esta comprobación un valor vacío llegaría al servidor y el filtro
    // `{"correo":""}` devolvería las cuentas sin correo registrado.
    if (!CORREO_VALIDO.test(limpio)) {
      return throwError(() => new Error('Ingrese un correo electrónico válido.'));
    }

    return this.api
      .EjecutarAnonimo({
        funcion: environment.functions.CONSULTAR_USUARIO_POR_CORREO,
        parametros: limpio,
      })
      .pipe(
        catchError((err) => {
          console.error('[PasswordReset] Fallo al consultar el usuario:', err);
          return throwError(() => new Error(this.msjHttp(err)));
        }),
        map((data) => {
          const filas = this.extraerFilas(data);
          const normalizado = (v: unknown) => String(v ?? '').trim().toLowerCase();

          const fila = filas.find((f) => normalizado(f['correo']) === limpio);
          const login = String(fila?.['login'] ?? fila?.['Login'] ?? '').trim();
          if (!fila || !login) {
            throw new Error('El correo no está registrado en el sistema.');
          }

          return { login, correo: limpio };
        }),
      );
  }

  // ──────────────────── 2. Validar token de la URL ────────────────────

  /**
   * Sonda el token de la URL contra `firmalink_password_resets`: tiene que
   * existir, no estar usado y estar dentro de su vigencia. El `matchedCount`
   * del upsert es el oráculo de existencia (la superficie anónima no expone
   * FIND); el filtro usa `$ne`/`$gt`, que `json.Unmarshal` de `Upsert`
   * convierte en operadores Mongo válidos.
   */
  validarToken(token: string): Observable<EstadoToken> {
    const login = this.loginDelToken(token);
    if (!login || !token.includes('.')) {
      return of({ valido: false, login: '' });
    }

    return this.api
      .ColeccionAnonima({
        coleccion: this.coleccionResets,
        donde: JSON.stringify({
          token,
          usado: { $ne: true },
          expiracion: { $gt: new Date().toISOString() },
        }),
        objeto: { ultimo_visto: new Date().toISOString() },
        upsert: true,
        driver: '',
      })
      .pipe(
        catchError((err) => {
          console.error('[PasswordReset] Fallo al validar el token:', err);
          return throwError(() => new Error(this.msjHttp(err)));
        }),
        map((rs) => ({ valido: this.matched(rs) > 0, login })),
      );
  }

  // ──────────────────── 3. Restablecer la clave ────────────────────

  /**
   * Restablece la contraseña del usuario dueño del token:
   *  a) consume el token de forma atómica (matchedCount debe ser 1);
   *  b) actualiza `usuario.clave` con el hash SHA-256 de la clave nueva.
   */
  restablecer(token: string, claveNueva: string): Observable<void> {
    const login = this.loginDelToken(token);
    if (!login) {
      return throwError(() => new Error('El enlace de recuperación es inválido.'));
    }

    return from(this.sha256.hash(claveNueva)).pipe(
      switchMap((hash) =>
        this.api.ColeccionAnonima({
          coleccion: this.coleccionResets,
          donde: JSON.stringify({
            token,
            usado: { $ne: true },
            expiracion: { $gt: new Date().toISOString() },
          }),
          objeto: { usado: true, usado_en: new Date().toISOString() },
          upsert: true,
          driver: '',
        }).pipe(
          catchError((err) => {
            console.error('[PasswordReset] Fallo al consumir el token:', err);
            return throwError(() => new Error(this.msjHttp(err)));
          }),
          map((rs) => {
            if (this.matched(rs) < 1) {
              throw new Error('El enlace de recuperación es inválido o ha expirado.');
            }
            return hash;
          }),
        ),
      ),
      switchMap((hash) =>
        this.api.ColeccionAnonima({
          coleccion: environment.colecciones.USUARIO,
          donde: JSON.stringify({ login }),
          objeto: { clave: hash },
          upsert: true,
          driver: '',
        }).pipe(
          catchError((err) => {
            console.error('[PasswordReset] Fallo al actualizar la clave:', err);
            return throwError(() => new Error(this.msjHttp(err)));
          }),
          map((rs) => {
            if (this.matched(rs) < 1) {
              throw new Error('No se pudo actualizar la contraseña: el usuario ya no existe.');
            }
          }),
        ),
      ),
    );
  }

  // ─────────────────────────── Internos ───────────────────────────

  /**
   * Persiste el token (upsert por login: pisa el enlace anterior) y envía el
   * correo con el enlace. El origen sale de `document.baseURI` para respetar el
   * base-href del build y la ruta lleva `#` porque la app usa hash routing
   * (`withHashLocation`): sin él el servidor devuelve el index y, al ser el
   * base-href relativo, los bundles resuelven contra la ruta profunda (404).
   */
  private async emitirEnlace(usuario: UsuarioRecuperacion): Promise<void> {
    const ahora = new Date();
    const expiracion = new Date(ahora.getTime() + VIGENCIA_MINUTOS * 60_000);
    const token = this.generarToken(usuario.login);

    let rs: ResultadoUpsert;
    try {
      rs = await firstValueFrom(
        this.api.ColeccionAnonima({
          coleccion: this.coleccionResets,
          donde: JSON.stringify({ login: usuario.login }),
          objeto: {
            token,
            login: usuario.login,
            correo: usuario.correo,
            expiracion: expiracion.toISOString(),
            usado: false,
            creado_en: ahora.toISOString(),
            tipo: 'password_reset',
          },
          upsert: true,
          driver: '',
        }),
      );
    } catch (err) {
      console.error('[PasswordReset] Fallo al registrar el token:', err);
      throw new Error(this.msjHttp(err));
    }
    if (this.matched(rs) < 1 && !rs?.upsertedCount) {
      throw new Error('No se pudo registrar el enlace de recuperación.');
    }

    const enlace = `${document.baseURI}#/recover-password/${token}`;
    await this.enviarCorreoRecuperacion(usuario.correo, usuario.login, enlace);
  }

  /**
   * Despacha el correo por la función nativa `email.enviar` (`/devel/api/fnx`).
   * El motor responde `{ tipo: 1, contenido: { salidas } }`; cuando la función
   * nativa falla, `salidas` trae el texto del error — se detecta por patrón.
   */
  private async enviarCorreoRecuperacion(
    correo: string,
    login: string,
    enlace: string,
  ): Promise<void> {
    let rs: MensajesBackend;
    try {
      rs = await firstValueFrom(
        this.api.FnxAnonima({
          funcion: environment.functions.ENVIAR_CORREO_FNX,
          para: correo,
          asunto: `Recuperación de contraseña — ${CONFIG.identidad.nombre}`,
          html: htmlRecuperacion(login, enlace),
          texto: textoRecuperacion(login, enlace),
          idempotencia: `reset-${login}-${Date.now()}`,
        }),
      );
    } catch {
      throw new Error('No se pudo enviar el correo de recuperación. Intente de nuevo.');
    }

    const salidas = String((rs?.contenido as any)?.salidas ?? '');
    const fallo = /fallo|error|invalid|denied|not enabled|fail|unauthorized|forbidden|disabled/i.test(
      salidas,
    );
    if (rs?.tipo !== 1 || fallo) {
      throw new Error(
        salidas || 'No se pudo enviar el correo de recuperación. Intente de nuevo.',
      );
    }
  }

  /** 32 bytes aleatorios del Web Crypto: 192 bits de entropía en hex. */
  private generarToken(login: string): string {
    const aleatorio = crypto.getRandomValues(new Uint8Array(24));
    const hex = Array.from(aleatorio)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return `${this.b64urlEncode(login)}.${hex}`;
  }

  /** Extrae el `login` transportado en el prefijo del token. */
  private loginDelToken(token: string): string {
    const prefijo = String(token ?? '').split('.')[0];
    if (!prefijo) {
      return '';
    }
    try {
      return this.b64urlDecode(prefijo);
    } catch {
      return '';
    }
  }

  private b64urlEncode(texto: string): string {
    const bytes = new TextEncoder().encode(texto);
    let bin = '';
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private b64urlDecode(texto: string): string {
    const normalizado = texto.replace(/-/g, '+').replace(/_/g, '/');
    const relleno = '='.repeat((4 - (normalizado.length % 4)) % 4);
    const bin = atob(normalizado + relleno);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  /** Normaliza el `UpdateResult` (acepta ambas grafías de Mongo). */
  private matched(rs: ResultadoUpsert | null | undefined): number {
    return Number(rs?.matchedCount ?? rs?.MatchedCount ?? 0) || 0;
  }

  /** Traduce el fallo HTTP a un mensaje accionable para el usuario. */
  private msjHttp(err: any): string {
    const status = err?.status;
    const msjBackend = err?.error?.msj || err?.error?.msg || err?.error?.mensaje;
    if (msjBackend) {
      return String(msjBackend);
    }
    if (status === 0) {
      return 'No hay conexión con el servidor. Verifique que Sandra esté en línea.';
    }
    if (status === 404) {
      return 'Ruta de API no encontrada (404). Verifique el proxy de desarrollo.';
    }
    if (status === 403) {
      return 'Acceso denegado (403) en la superficie anónima.';
    }
    return `Error del servidor (${status ?? 'sin respuesta'}).`;
  }

  /** Aplana las formas de respuesta del motor de funciones a un arreglo de filas. */
  private extraerFilas(data: unknown): Record<string, any>[] {
    if (Array.isArray(data)) {
      return data as Record<string, any>[];
    }
    const envoltura = data as MensajesBackend | undefined;
    const contenido = envoltura?.contenido;
    if (Array.isArray(contenido)) {
      return contenido as Record<string, any>[];
    }
    if (contenido && typeof contenido === 'object') {
      return [contenido as Record<string, any>];
    }
    return [];
  }
}
