import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { decidirAcceso } from '../../shared/utils/menu-crypt';

/**
 * AuthGuardGuard — control de acceso de la sesión (misma lógica que consola)
 *
 * 1. Verificar que exista token en sessionStorage
 * 2. Decodificar JWT y validar estructura
 * 3. Verificar que la aplicación del token coincida con environment.ID
 * 4. Delegar en `decidirAcceso` (shared/utils/menu-crypt): la ruta tiene que
 *    estar declarada en el menú del usuario y el menú tiene que coincidir con
 *    su huella `crypt`
 * 5. Redirige a /login, /error o /not-authorized según el caso
 *
 * La política vive en `menu-crypt.ts`, no aquí: el guard solo traduce la
 * decisión en navegación y en mensajes.
 *
 * IMPORTANTE: este guard se registra como `canActivate` **y** `canActivateChild`
 * en la ruta del layout (ver app.routes.ts). `canActivate` solo corre cuando la
 * ruta del layout se activa (entrada o recarga); las pantallas son hijas y el
 * sidebar navega con `router.navigate`, así que sin `canActivateChild` una
 * navegación entre pantallas no pasaría por aquí y se podría abrir una ruta
 * que no está en el menú.
 */
export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');

  // 1. Sin token → /login
  if (!token) {
    cerrarSesion(router);
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
    cerrarSesion(router);
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

  // 3-4. Integridad del menú y autorización de la ruta
  const decision = decidirAcceso(
    state.url,
    sessionStorage.getItem('menu'),
    sessionStorage.getItem('crypt'),
  );

  switch (decision) {
    case 'libre':
    case 'autorizado':
      return true;

    case 'alterado':
      sesionAlterada(router);
      return false;

    default:
      // 'restringido': el menú es válido pero esa pantalla no es del usuario.
      // Se devuelve un UrlTree (no `navigate` + `false`) para que la redirección
      // sea parte del mismo resultado de navegación y no compita con la que está
      // en curso —el guard corre en cada hijo (canActivateChild)—.
      msj();
      return router.createUrlTree(['/not-authorized']);
  }
};

/**
 * Cierre normal: sin token o con un token que no se puede leer. No lleva aviso
 * porque es el camino esperado de una sesión que expiró.
 */
function cerrarSesion(router: Router): void {
  sessionStorage.clear();
  router.navigate(['/login']).then(() => window.location.reload());
}

/**
 * El menú no está firmado o no coincide con su huella: la sesión se cierra y se
 * avisa. El aviso se muestra antes de recargar, porque la recarga se lleva por
 * delante cualquier mensaje que esté en pantalla.
 */
function sesionAlterada(router: Router): void {
  console.error('AuthGuard: El menú de la sesión no coincide con su huella');
  sessionStorage.clear();
  Swal.fire({
    title: 'Sesión cerrada',
    text: 'El menú de su sesión fue modificado. Por seguridad, inicie sesión de nuevo.',
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Entendido',
    allowEscapeKey: false,
  }).then(() => {
    router.navigate(['/login']).then(() => window.location.reload());
  });
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
