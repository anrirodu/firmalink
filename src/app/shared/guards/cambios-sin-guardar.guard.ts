import Swal from 'sweetalert2';
import { CanDeactivateFn } from '@angular/router';

/**
 * Contrato que expone el componente para poder abandonarse con seguridad.
 * Lo implementa `NewAgreementComponent`.
 */
export interface PuedeSalir {
  /** ¿Hay cambios sin guardar? */
  hayCambiosSinGuardar(): boolean;
  /** Intenta guardar en el servidor antes de salir */
  guardarAntesDeSalir(): Promise<boolean>;
  /** Respalda el trabajo como borrador local (última red de seguridad) */
  respaldarAlSalir(): void;
}

/**
 * cambiosSinGuardarGuard — confirma la salida de una pantalla con cambios
 * pendientes usando SweetAlert (nunca el diálogo nativo del navegador).
 *
 * Opciones:
 *  - Guardar y salir    → intenta guardar; si falla, respalda el borrador y sale
 *  - Salir sin guardar  → respalda el borrador local y sale
 *  - Cancelar           → permanece en la pantalla
 *
 * No interviene en las salidas forzadas (cierre de sesión, token expirado,
 * llegada al login): ahí solo respalda el borrador y deja continuar, para no
 * pelear con el cierre de sesión que ya mostró su propio aviso.
 */
export const cambiosSinGuardarGuard: CanDeactivateFn<PuedeSalir> = async (
  component,
  _rutaActual,
  _estadoActual,
  estadoDestino,
) => {
  const destino = estadoDestino?.url ?? '';
  const salidaForzada =
    !sessionStorage.getItem('token') ||
    destino.includes('login') ||
    destino.includes('logout');

  if (salidaForzada) {
    component.respaldarAlSalir();
    return true;
  }

  return confirmarSalida(component);
};

/**
 * Confirmación de salida compartida.
 *
 * La usan tanto el guard de ruta como los listados que montan el editor como
 * **modal** (presupuesto, factura, acuerdo): al cerrar el modal se llama a esta
 * función con el componente del editor y devuelve `true` si se puede cerrar
 * (y ya respaldó el borrador local) o `false` si el usuario canceló.
 */
export async function confirmarSalida(component: PuedeSalir): Promise<boolean> {
  if (!component.hayCambiosSinGuardar()) {
    return true;
  }

  const respuesta = await Swal.fire({
    icon: 'question',
    title: 'Tienes cambios sin guardar',
    html:
      'Si sales ahora, estos cambios quedarán solo como borrador en este navegador.<br>' +
      '<small>Guarda para dejarlos registrados en el servidor.</small>',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Guardar y salir',
    denyButtonText: 'Salir sin guardar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0c2d48',
    denyButtonColor: '#a12c2c',
    cancelButtonColor: '#6c757d',
    reverseButtons: true,
  });

  if (respuesta.isConfirmed) {
    const guardado = await component.guardarAntesDeSalir();
    if (!guardado) {
      // No se pudo registrar en el servidor: sale igual, pero con respaldo local
      component.respaldarAlSalir();
    }
    return true;
  }

  if (respuesta.isDenied) {
    component.respaldarAlSalir();
    return true;
  }

  return false;
}
