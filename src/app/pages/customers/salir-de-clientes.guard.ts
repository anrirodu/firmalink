import { CanDeactivateFn } from '@angular/router';

/**
 * Contrato de la pantalla de clientes para abandonarla con seguridad.
 * Se declara aquí (y no se importa el componente) para que la ruta siga
 * cargándose de forma diferida.
 */
export interface PantallaConFormulario {
  /** true si no hay ficha abierta con cambios, o el usuario acepta descartarlos */
  puedeAbandonar(): boolean | Promise<boolean>;
}

/**
 * salirDeClientesGuard — si la ficha de un cliente tiene cambios sin
 * guardar, pide confirmación (SweetAlert) antes de navegar a otra pantalla.
 *
 * No interviene en las salidas forzadas (cierre de sesión, token expirado o
 * llegada al login), igual que `cambiosSinGuardarGuard`. A diferencia de ese
 * guard, aquí no se respalda un borrador local: la ficha contiene datos
 * personales y no se persiste en el navegador.
 */
export const salirDeClientesGuard: CanDeactivateFn<PantallaConFormulario> = (
  componente,
  _rutaActual,
  _estadoActual,
  estadoDestino,
) => {
  const destino = estadoDestino?.url ?? '';
  const salidaForzada =
    !sessionStorage.getItem('token') || destino.includes('login') || destino.includes('logout');
  return salidaForzada || componente.puedeAbandonar();
};
