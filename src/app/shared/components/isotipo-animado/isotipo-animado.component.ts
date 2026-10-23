import { Component, ElementRef, computed, input } from '@angular/core';
import { CONFIG } from '../../../config';

/**
 * Isotipo animado de FirmaLink — dos eslabones entrelazados + check trazado.
 *
 * Los "cortes limpios" de las intersecciones se resuelven con una máscara SVG
 * (transparencia real), por lo que el isotipo se ve correcto tanto sobre fondos
 * claros (overlay de carga) como sobre el degradado azul marino del login.
 */
@Component({
  selector: 'app-isotipo-animado',
  standalone: true,
  template: `
    <svg
      [attr.width]="ancho()"
      [attr.height]="alto()"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      [attr.aria-label]="etiqueta()"
    >
      <defs>
        <mask
          [attr.id]="maskId"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="400"
          height="260"
        >
          <rect x="0" y="0" width="400" height="260" fill="#fff" />

          <!-- Corte 1 — espacio del óvalo frontal sobre el trasero -->
          <path
            d="M 160 130 A 45 45 0 0 0 205 175"
            stroke="#000"
            stroke-width="38"
            fill="none"
          />

          <!-- Corte 2 — halo del tramo trasero que pasa por delante -->
          <path
            d="M 160 130 A 45 45 0 0 0 205 175"
            stroke="#000"
            stroke-width="38"
            stroke-linecap="round"
            fill="none"
          />

          <!-- Corte 3 — halo del check (animado en sincronía con el trazo) -->
          <path
            class="anim-check"
            d="M 205 130 L 235 160 L 315 65"
            stroke="#000"
            stroke-width="38"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <path
            class="anim-check"
            d="M 205 130 L 235 160 L 315 65"
            stroke="#fff"
            stroke-width="22"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </mask>
      </defs>

      <g class="anim-links">
        <g [attr.mask]="'url(#' + maskId + ')'">
          <!-- 1. Óvalo trasero -->
          <rect
            x="50"
            y="85"
            width="150"
            height="90"
            rx="45"
            [attr.stroke]="colorEslabonA()"
            stroke-width="26"
            fill="none"
          />

          <!-- 2. Óvalo frontal -->
          <rect
            x="160"
            y="85"
            width="150"
            height="90"
            rx="45"
            [attr.stroke]="colorEslabonB()"
            stroke-width="26"
            fill="none"
          />
        </g>

        <!-- 3. Tramo del óvalo trasero que pasa por delante -->
        <path
          d="M 160 130 A 45 45 0 0 0 205 175"
          [attr.stroke]="colorEslabonA()"
          stroke-width="26"
          fill="none"
        />
      </g>

      <!-- 4. Check -->
      <g class="anim-check">
        <path
          d="M 205 130 L 235 160 L 315 65"
          [attr.stroke]="colorEslabonB()"
          stroke-width="22"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
      </g>
    </svg>
  `,
  styleUrls: ['./isotipo-animado.component.scss'],
  host: {
    '[class.loop]': 'loop()',
    '[class.replayable]': 'replayOnClick()',
    '(click)': 'onClick()',
  },
})
export class IsotipoAnimadoComponent {
  private static secuencia = 0;

  /**
   * Colores por defecto para fondos claros, tomados de la paleta de
   * `config.ts` (las pantallas sobre fondo oscuro los sobrescriben).
   */
  readonly colorEslabonA = input<string>(CONFIG.marca.colores.primario);
  readonly colorEslabonB = input<string>(CONFIG.marca.colores.acento);

  readonly ancho = input<number>(400);
  readonly etiqueta = input<string>(CONFIG.identidad.nombre);

  /** Animación en bucle infinito (indicador de carga). */
  readonly loop = input<boolean>(false);

  /** Permite repetir la animación con un clic. */
  readonly replayOnClick = input<boolean>(false);

  readonly alto = computed(() => Math.round((this.ancho() * 260) / 400));

  readonly maskId = `iso-cut-mask-${IsotipoAnimadoComponent.secuencia++}`;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  onClick(): void {
    if (!this.replayOnClick()) return;
    this.reiniciar();
  }

  /** Reinicia las animaciones CSS de entrada y trazado del check. */
  reiniciar(): void {
    const host = this.el.nativeElement;
    const grupos = host.querySelectorAll<SVGElement>('.anim-links, .anim-check');

    grupos.forEach(g => {
      g.style.animation = 'none';
    });

    void host.offsetWidth; // forzar reflow

    grupos.forEach(g => {
      g.style.animation = '';
    });
  }
}
