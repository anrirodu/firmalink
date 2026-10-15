import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

/**
 * NotificacionService — mensajes de la aplicación con SweetAlert2.
 *
 * Regla del proyecto: ningún mensaje dirigido al usuario se emite por
 * `console` ni con diálogos nativos (`alert`, `confirm`). Las incidencias
 * usan toasts (no bloqueantes) y los errores que requieren atención usan
 * modales.
 */
@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private readonly toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  /** Advertencia no bloqueante (degradación, dato faltante, respaldo local) */
  aviso(titulo: string, texto?: string): void {
    void this.toast.fire({ icon: 'warning', title: titulo, text: texto });
  }

  /** Nota informativa no bloqueante */
  info(titulo: string, texto?: string): void {
    void this.toast.fire({ icon: 'info', title: titulo, text: texto });
  }

  /** Confirmación no bloqueante */
  exito(titulo: string, texto?: string): void {
    void this.toast.fire({ icon: 'success', title: titulo, text: texto });
  }

  /** Error no bloqueante (fallos recuperables que el usuario debe conocer) */
  error(titulo: string, texto?: string): void {
    void this.toast.fire({ icon: 'error', title: titulo, text: texto });
  }

  /** Error bloqueante: el usuario debe leerlo antes de continuar */
  errorModal(titulo: string, html?: string): Promise<unknown> {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      html,
      confirmButtonColor: '#0c2d48',
    });
  }

  /**
   * Normaliza un error HTTP/red a un texto corto y legible.
   * Se usa en los mensajes de alerta para no exponer objetos crudos.
   */
  static detalle(e: unknown): string {
    if (e === null || e === undefined) {
      return 'Sin detalle';
    }
    if (typeof e === 'string') {
      return e;
    }
    const err = e as { status?: number; message?: string; error?: { msj?: string } };
    if (err.error?.msj) {
      return err.error.msj;
    }
    if (err.status) {
      return `HTTP ${err.status}${err.message ? ' — ' + err.message : ''}`;
    }
    return err.message ?? 'Sin detalle';
  }
}
