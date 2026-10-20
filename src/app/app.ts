import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { LoadingScreenService } from './shared/services/loading-screen.service';
import { VersionService } from './shared/services/version.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [`:host { display: block; height: 100vh; }`],
})
export class App {
  // Inyectar para que se active y quite el loading screen
  private loadingScreen = inject(LoadingScreenService);
  private versionService = inject(VersionService);

  /** Evita que la alerta se muestre de forma simultánea (una a la vez). */
  private alertaEnCurso = false;

  constructor() {
    // Comprobar si hay una nueva versión desplegada.
    this.versionService.iniciar();

    // Reaccionar cuando el servicio detecte una versión distinta.
    effect(() => {
      if (this.versionService.versionDisponible() && !this.alertaEnCurso) {
        void this.mostrarAlertaActualizacion();
      }
    });
  }

  private async mostrarAlertaActualizacion(): Promise<void> {
    this.alertaEnCurso = true;

    const resultado = await Swal.fire({
      icon: 'info',
      title: 'Actualización disponible',
      html: `
        <p>Se ha publicado una nueva versión del sistema.</p>
        <p style="font-size:12px;color:#757575;margin-top:8px">
          Actual: ${this.versionService.versionActual || '—'}<br>
          Nueva: ${this.versionService.versionPublicada() || '—'}
        </p>
        <p style="font-size:13px;margin-top:12px">
          Al actualizar se limpiará la caché y el historial local, y la página
          se recargará.
        </p>
      `,
      confirmButtonText: 'Actualizar ahora',
      confirmButtonColor: '#0c2d48',
      showCancelButton: true,
      cancelButtonText: 'Más tarde',
      cancelButtonColor: '#757575',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (resultado.isConfirmed) {
      // Mostrar el modal de progreso SIN await: el modal no tiene botón de
      // cierre, así que su promesa nunca resolvería y bloquearía la limpieza.
      void Swal.fire({
        title: 'Actualizando…',
        html: 'Limpiando caché y recargando la aplicación.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await this.versionService.aplicarActualizacion();
      return;
    }

    // El usuario pospuso: silenciar temporalmente (30 min) solo esta versión.
    // Si aparece una versión más nueva, volverá a avisar de inmediato.
    this.versionService.posponer();
    this.alertaEnCurso = false;
  }
}
