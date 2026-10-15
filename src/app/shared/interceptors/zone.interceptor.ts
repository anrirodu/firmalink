import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * ZoneInterceptor
 *
 * Garantiza que todas las respuestas HTTP se ejecuten dentro de la zona de Angular.
 * Solución al problema de change detection en Angular 22 con FetchBackend.
 */
export const zoneInterceptor: HttpInterceptorFn = (req, next) => {
  const ngZone = inject(NgZone);

  return new Observable(subscriber => {
    const sub = next(req).subscribe({
      next(value: any) {
        ngZone.run(() => subscriber.next(value));
      },
      error(err: any) {
        ngZone.run(() => subscriber.error(err));
      },
      complete() {
        ngZone.run(() => subscriber.complete());
      }
    });
    return () => sub.unsubscribe();
  });
};
