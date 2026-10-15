import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { Sha256Service } from '../../shared/utils/sha256.service';
import { environment } from '../../../environments/environment';

/**
 * AuthGuardGuard — Misma lógica que consola
 *
 * 1. Verificar que exista token en sessionStorage
 * 2. Decodificar JWT y validar estructura
 * 3. Verificar que la aplicación del token coincida con environment.ID
 * 4. Verificar integridad del menú (crypt === MD5(menu))
 * 5. Verificar que la URL solicitada esté en el menú del usuario
 * 6. URLs whitelisted siempre permitidas
 * 7. Redirige a /error, /not-authorized y /login según el caso
 */
export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const sha256 = inject(Sha256Service);

  const token = sessionStorage.getItem('token');

  // 1. Sin token → /login
  if (!token) {
    sessionError(router);
    return false;
  }

  // 2. Decodificar JWT
  let payload: any;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token inválido');
    payload = JSON.parse(atob(parts[1]));
  } catch (error) {
    console.error('AuthGuard: Token inválido', error);
    sessionError(router);
    return false;
  }

  // 2b. Verificar que el usuario tenga esta aplicación y que su ID coincida con environment.ID
  //     Se recorre todo el arreglo Aplicacion[] (un usuario puede tener varias apps) y la
  //     comparación es case-insensitive para tolerar diferencias de mayúsculas en el backend.
  const aplicaciones: any[] = payload?.Usuario?.Aplicacion ?? [];
  const idSistema = String(environment.ID).toLowerCase();
  const tieneAcceso = aplicaciones.some(
    (a: any) => String(a?.id ?? '').toLowerCase() === idSistema,
  );

  if (!tieneAcceso) {
    // La aplicación del token no coincide con este sistema → /error (como consola)
    sessionStorage.clear();
    router.navigate(['/error']).then(() => window.location.reload());
    return false;
  }

  // 3. Verificar integridad del menú
  const menuStr = sessionStorage.getItem('menu');
  const cryptStored = sessionStorage.getItem('crypt');

  if (menuStr && cryptStored) {
    // Usar hash simple (mismo que md5Hash en auth.service)
    let hash = 0;
    for (let i = 0; i < menuStr.length; i++) {
      const char = menuStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const cryptActual = Math.abs(hash).toString(16).padStart(8, '0');

    if (cryptActual !== cryptStored) {
      console.error('AuthGuard: Menú corrupto');
      sessionStorage.clear();
      router.navigate(['/login']).then(() => window.location.reload());
      return false;
    }
  }

  // 4. URLs siempre permitidas
  const whitelistedUrls = ['/login', '/dashboard', '/change-password'];
  if (whitelistedUrls.includes(state.url)) {
    return true;
  }

  // 5. Verificar que la URL esté en el menú del usuario
  if (menuStr) {
    try {
      const menu = JSON.parse(menuStr);
      let autorizado = false;

      for (const item of menu) {
        // Verificar URL principal
        if (item.url && state.url.indexOf(item.url) === 1) {
          autorizado = true;
          break;
        }
        // Verificar submenús
        if (item.SubMenu) {
          for (const sub of item.SubMenu) {
            if (sub.url && state.url.indexOf(sub.url) === 1) {
              autorizado = true;
              break;
            }
          }
        }
        if (autorizado) break;
      }

      if (!autorizado) {
        // No autorizado → redirige a /not-authorized (como consola)
        msj();
        router.navigate(['/not-authorized']);
        return false;
      }

      return true;
    } catch (e) {
      console.error('AuthGuard: Error parseando menú', e);
      sessionStorage.clear();
      router.navigate(['/login']).then(() => window.location.reload());
      return false;
    }
  }

  return true;
};

function sessionError(router: Router): void {
  sessionStorage.clear();
  router.navigate(['/login']).then(() => window.location.reload());
}

function msj(): void {
  Swal.fire({
    title: 'Área restringida',
    text: 'No poseé autorización',
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok',
    allowEscapeKey: true,
  });
}
