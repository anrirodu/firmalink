import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { timeout, catchError, map } from 'rxjs/operators';

export interface IChallengeResponse {
  algorithm: string;
  challenge: string;
  salt: string;
  signature: string;
  maxnumber: number;
}

export interface ICaptchaSolution {
  sol: number;
  sig: string;
  salt: string;
  challenge: string;
  /** Tiempo que tomó la resolución del reto (diagnóstico). */
  ms: number;
}

/**
 * Iteraciones entre las que el bucle de PoW cede el control al navegador.
 * Sin esto el hilo principal queda ocupado y la interfaz se congela.
 */
const CEDE_CADA_ITERACIONES = 250;

/**
 * Cede el control al hilo principal para que el navegador pueda pintar.
 */
function cederAlNavegador(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private http = inject(HttpClient);
  private endpoint = '/v1/api/captcha/challenge';
  private endpointVerify = '/v1/api/captcha/verify';

  /**
   * Obtiene el reto criptográfico desde Sandra Server con timeout seguro.
   *
   * El endpoint es público (pre-autenticación), por eso se salta el
   * interceptor: no debe viajar un JWT de una sesión anterior ni la firma
   * HMAC de las peticiones con cuerpo.
   */
  obtenerChallenge(): Observable<IChallengeResponse | null> {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });

    return this.http.get<IChallengeResponse>(this.endpoint, { headers }).pipe(
      timeout(2500),
      catchError((err) => {
        console.warn(
          '[CaptchaService] Sandra Server endpoint no respondió o timeout:',
          err?.message || err,
        );
        return of(null);
      }),
    );
  }

  /**
   * Resuelve el Proof-of-Work (SHA-256) en el cliente.
   * Busca i en [0..maxNumber] tal que SHA256(salt + i) === challenge.
   */
  async resolverPoW(
    salt: string,
    challenge: string,
    maxNumber: number,
  ): Promise<number> {
    const encoder = new TextEncoder();

    for (let i = 0; i <= maxNumber; i++) {
      if (i > 0 && i % CEDE_CADA_ITERACIONES === 0) {
        await cederAlNavegador();
      }

      const data = encoder.encode(`${salt}${i}`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === challenge) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Valida la solución del reto en el servidor (`POST /v1/api/captcha/verify`).
   *
   * El endpoint hace la comprobación criptográfica y **consume** la solución
   * (anti-replay): un mismo reto no vale dos veces, así que tras validar hay
   * que resolver uno nuevo.
   *
   * Devuelve `true` sólo cuando el servidor acepta la solución.
   */
  verificar(solucion: ICaptchaSolution): Observable<boolean> {
    const headers = new HttpHeaders({
      'X-Skip-Interceptor': 'true',
      'Content-Type': 'application/json',
    });

    const cuerpo = {
      salt: solucion.salt,
      signature: solucion.sig,
      sig: solucion.sig,
      challenge: solucion.challenge,
      sol: solucion.sol,
    };

    return this.http
      .post<{ success: boolean; message: string }>(this.endpointVerify, cuerpo, { headers })
      .pipe(
        timeout(5000),
        map((rs) => rs?.success === true),
        catchError((err) => {
          console.warn('[CaptchaService] La solución PoW fue rechazada:', err?.message || err);
          return of(false);
        }),
      );
  }

  /**
   * Orquesta la obtención del reto y la resolución del PoW.
   *
   * Devuelve `null` si el servidor no entregó el reto o si no se encontró
   * solución: el servidor valida (y consume, por anti-replay) la solución,
   * así que cada intento de acceso necesita un reto nuevo.
   */
  async obtenerYResolver(): Promise<ICaptchaSolution | null> {
    const inicio = Date.now();

    try {
      const ch = await firstValueFrom(this.obtenerChallenge());
      if (!ch || !ch.challenge || !ch.salt) {
        return null;
      }

      const sol = await this.resolverPoW(ch.salt, ch.challenge, ch.maxnumber || 50000);
      if (sol === -1) {
        console.warn('[CaptchaService] No se encontró solución para el challenge PoW');
        return null;
      }

      return {
        sol,
        sig: ch.signature,
        salt: ch.salt,
        challenge: ch.challenge,
        ms: Date.now() - inicio,
      };
    } catch (error) {
      console.error('[CaptchaService] Error al obtener o resolver el challenge:', error);
      return null;
    }
  }
}
