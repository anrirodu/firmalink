import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Sha256Service } from '../utils/sha256.service';

/**
 * AuthInterceptor — Firma HMAC + JWT + manejo de errores HTTP
 *
 * Misma lógica que auth-interceptor.service.ts de consola:
 * - POST/PUT/DELETE con body: firma HMAC (Web-API-key, X-Signature, X-Timestamp)
 * - GET y sin body: solo Authorization
 * - X-Skip-Interceptor: se salta
 * - Errores 401/403/504: redirige a logout
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const sha256 = inject(Sha256Service);
  const SECRET_KEY = environment.Hash;

  // Si pide saltarse el interceptor
  if (req.headers.has('X-Skip-Interceptor')) {
    const cleanReq = req.clone({
      headers: req.headers.delete('X-Skip-Interceptor'),
    });
    return next(cleanReq);
  }

  const token = sessionStorage.getItem('token');

  // Si no hay body o es GET, solo agregar Authorization
  if (!req.body || req.method === 'GET') {
    const headers: any = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const simpleReq = req.clone({ setHeaders: headers });
    return procesarPeticion(simpleReq, next, router);
  }

  // Para POST/PUT/DELETE con body: firmar HMAC
  const timestamp = new Date().getTime().toString();
  const payload = JSON.stringify(req.body) + timestamp;

  return from(sha256.hmac(payload, SECRET_KEY)).pipe(
    switchMap(signature => {
      const secureReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Web-API-key': SECRET_KEY,
          'X-Signature': signature,
          'X-Timestamp': timestamp,
        },
      });
      return procesarPeticion(secureReq, next, router);
    }),
  );
};

function procesarPeticion(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  router: Router,
): Observable<HttpEvent<unknown>> {
  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      const msj = err.error?.msj || err.error?.msg || err.error?.mensaje;

      switch (err.status) {
        case 401:
          cerrar(msj || 'Sesión expirada', router);
          break;
        case 403:
          // El backend responde 403 CON mensaje cuando el token fue
          // manipulado/firmado incorrectamente (p.ej. "La firma del token
          // no coincide", "El token no es valido") o vino de una URL
          // restringida. En esos casos también se cierra la sesión.
          // Si es bloqueo de cuenta (mensaje no relacionado con token),
          // mostrar modal de alerta.
          if (esErrorDeToken(msj) || !msj) {
            cerrar(msj || 'Acceso denegado', router);
          } else {
            mostrarAlertaBloqueo(msj, router);
          }
          break;
        case 504:
          cerrar('Error de conexión con el servidor', router);
          break;
      }
      return throwError(() => err);
    }),
  );
}

/**
 * Detecta los mensajes que el backend (ValidarToken) devuelve cuando el
 * token JWT es inválido, expiró o su firma no coincide → forzar logout.
 */
function esErrorDeToken(msj: string | undefined | null): boolean {
  if (!msj) return false;
  const m = String(msj).toLowerCase();
  return (
    m.includes('firma del token') ||
    m.includes('token no es valido') ||
    m.includes('token ha expirado') ||
    m.includes('token no valido') ||
    m.includes('sesión ha sido iniciada en otro') ||
    m.includes('sesion ha sido iniciada en otro')
  );
}

/**
 * Muestra un modal de alerta para bloqueos de cuenta (403 con mensaje
 * que no corresponde a error de token, p.ej. "Cuenta temporalmente
 * bloqueada por seguridad"). Al confirmar limpia la sesión y redirige
 * al login.
 */
function mostrarAlertaBloqueo(msj: string, router: Router): void {
  import('sweetalert2').then(({ default: Swal }) => {
    Swal.fire({
      title: 'Cuenta Bloqueada',
      text: msj,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        router.navigate(['/login']).then(() => window.location.reload());
      }
    });
  });
}

function cerrar(msj: string, router: Router): void {
  import('sweetalert2').then(({ default: Swal }) => {
    Swal.fire({
      title: 'Alerta',
      text: msj,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Gracias por su tiempo!',
    }).then(result => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        router.navigate(['/login']).then(() => window.location.reload());
      }
    });
  });
}
