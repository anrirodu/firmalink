import { Component, input, output } from '@angular/core';
import { IsotipoAnimadoComponent } from '../isotipo-animado/isotipo-animado.component';
import { CONFIG } from '../../../config';

/**
 * Overlay de bienvenida a pantalla completa tras un acceso directo.
 *
 * Es puramente presentacional: el anfitrión decide cuándo mostrarlo y cuándo
 * entrar al panel. Se usa en el login para los usuarios SIN TOTP; con TOTP el
 * efecto de verificación ya cumple esa función.
 *
 * La duración de la barra de progreso (SCSS) debe ir en sintonía con la espera
 * del anfitrión antes de navegar.
 */
@Component({
  selector: 'app-acceso-bienvenida',
  standalone: true,
  imports: [IsotipoAnimadoComponent],
  templateUrl: './acceso-bienvenida.component.html',
  styleUrl: './acceso-bienvenida.component.scss',
})
export class AccesoBienvenidaComponent {
  /** Configuración del producto (marca y textos). */
  protected readonly cfg = CONFIG;

  /** Nombre a mostrar bajo el título; si viene vacío no se pinta. */
  readonly nombre = input<string>('');

  /** Emitido al hacer clic: permite saltar la animación e entrar ya. */
  readonly saltar = output<void>();
}
