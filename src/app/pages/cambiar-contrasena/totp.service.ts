import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { normalizarSecreto } from './totp.util';

/** `UpdateResult` de Mongo devuelto por `ccoleccion` (ambas grafías). */
interface ResultadoUpsert {
  MatchedCount?: number;
  ModifiedCount?: number;
  UpsertedCount?: number;
  UpsertedID?: unknown;
  matchedCount?: number;
  modifiedCount?: number;
  upsertedCount?: number;
  upsertedID?: unknown;
}

/**
 * Persistencia del secreto TOTP.
 *
 * El backend no ofrece una función para **guardar** un secreto nuevo: la
 * función `_SYS_UUserTOTP` sólo lo borra (su consulta filtra por
 * `token = $0` y deja `token` vacío, ver colección `apicore`). Por eso:
 *
 * - **Activar**: se actualiza `usuario.token` con `ccoleccion` + `upsert`
 *   filtrado por `login`, el mismo mecanismo que usa la recuperación de
 *   contraseña para escribir `usuario.clave`.
 * - **Desactivar**: se usa `_SYS_UUserTOTP` con el secreto vigente y se
 *   confirma en base de datos que `token` quedó vacío.
 *
 * El motor de funciones responde HTTP 200 incluso cuando falla
 * (`{ msj, tipo: 77 }`), así que cada operación se valida contra la respuesta
 * y, cuando es posible, contra la base de datos.
 */
@Injectable({ providedIn: 'root' })
export class TotpService {
  private readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);

  /** Genera un secreto nuevo + imagen QR (no lo persiste). */
  generarQr() {
    return this.auth.generarTotpQr();
  }

  /** Secreto realmente guardado en BD (`''` si no hay, `null` si no se puede leer). */
  consultarSecreto() {
    return this.auth.consultarSecretoTotp();
  }

  /**
   * Guarda el secreto que el usuario acaba de verificar en su aplicación,
   * actualizando `usuario.token` del usuario en sesión.
   */
  async activar(secreto: string): Promise<void> {
    const login = this.loginActual();
    if (!login) {
      throw new Error('No se pudo identificar al usuario de la sesión. Vuelva a iniciar sesión.');
    }

    const clave = normalizarSecreto(secreto);
    if (!clave) {
      throw new Error('La clave generada no es válida.');
    }

    const resultado = await firstValueFrom(
      this.api.ExecColeccion({
        coleccion: environment.colecciones.USUARIO,
        donde: JSON.stringify({ login }),
        objeto: { token: clave },
        upsert: true,
        // `usuario` vive en la base del sistema: driver vacío = conexión por
        // defecto (`system.MongoDB`), igual que usa la recuperación de clave.
        driver: '',
      }),
    );

    const coincidencias = this.numero(resultado?.MatchedCount ?? resultado?.matchedCount);
    const insertados = this.numero(resultado?.UpsertedCount ?? resultado?.upsertedCount);

    // Con upsert, un filtro sin coincidencias crearía un documento nuevo: eso
    // significaría que el login de la sesión no apunta a ningún usuario real.
    if (coincidencias < 1) {
      throw new Error(
        insertados > 0
          ? 'El servidor no encontró su registro de usuario y la clave no se guardó.'
          : 'El servidor no encontró su registro de usuario. No se guardó la clave.',
      );
    }

    // Confirmación contra la base de datos (si la consulta expone el campo).
    const enBd = await this.leerSecretoEnBd();
    if (enBd !== null && normalizarSecreto(enBd) !== clave) {
      throw new Error('El servidor no confirmó el guardado de la clave. Intente de nuevo.');
    }
  }

  /**
   * Borra el secreto TOTP. `_SYS_UUserTOTP` localiza al usuario por el propio
   * secreto (`token = $0`) y lo deja vacío; se prueban el secreto de la sesión
   * y, si no coincide, el que haya en base de datos. Devuelve `true` sólo si el
   * borrado es verificable.
   */
  async desactivar(secretoActual: string): Promise<boolean> {
    const candidatos = new Set<string>();

    const deSesion = normalizarSecreto(secretoActual);
    if (deSesion) {
      candidatos.add(deSesion);
    }

    const enBd = await this.leerSecretoEnBd();
    const guardado = normalizarSecreto(enBd || '');
    if (guardado) {
      candidatos.add(guardado);
    }

    for (const secreto of candidatos) {
      let coincidencias: number | null = null;

      try {
        const data = await firstValueFrom(this.auth.actualizarTotp(secreto));
        coincidencias = data && typeof data.MatchedCount === 'number' ? data.MatchedCount : null;
      } catch {
        // Fallo del intento: se prueba el siguiente candidato.
        continue;
      }

      // El servidor no localizó al usuario con ese secreto.
      if (coincidencias === 0) {
        continue;
      }

      const despues = await this.leerSecretoEnBd();

      // Borrado confirmado en base de datos.
      if (despues === '') {
        return true;
      }

      // La consulta no expone `token`: se acepta la respuesta del servidor.
      if (despues === null) {
        return true;
      }

      // El secreto sigue guardado → siguiente candidato.
    }

    return false;
  }

  // ─────────────────────────── Internos ───────────────────────────

  /**
   * Secreto guardado en BD, tolerando fallos de la consulta:
   * `''` si no hay, `null` si no se puede leer o `token` no está expuesto.
   */
  private async leerSecretoEnBd(): Promise<string | null> {
    try {
      const valor = await firstValueFrom(this.consultarSecreto());
      return valor === null || valor === undefined ? null : valor;
    } catch {
      return null;
    }
  }

  /** Login del usuario autenticado, tomado del JWT de la sesión. */
  private loginActual(): string {
    const token = sessionStorage.getItem('token') || '';
    if (!token) {
      return '';
    }

    const usuario = this.auth.getUserDecrypt(token)?.Usuario as
      { usuario?: string; login?: string } | undefined;

    return (usuario?.login || usuario?.usuario || '').trim();
  }

  private numero(valor: unknown): number {
    return typeof valor === 'number' && Number.isFinite(valor) ? valor : 0;
  }
}
