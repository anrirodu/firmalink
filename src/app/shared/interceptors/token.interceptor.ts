import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor funcional que inyecta el token JWT en las peticiones HTTP.
 * Se salta las peticiones que tengan el header 'X-Skip-Interceptor'.
 */
export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {

  // Si la petición pide saltarse el interceptor (señal X-Skip-Interceptor),
  // la dejamos pasar SIN modificar. El authInterceptor se encarga de
  // eliminar la señal y aplicar la lógica de salto.
  if (req.headers.has('X-Skip-Interceptor')) {
    return next(req);
  }

  const token = sessionStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
