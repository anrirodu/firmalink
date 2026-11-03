import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject } from '@angular/core';
import { CaptchaService } from '../../services/captcha.service';

/**
 * Estado de la licencia mostrada por el sello flotante.
 *
 * Se deriva del estado del captcha compartido por la aplicación: si el reto
 * PoW quedó resuelto, el sello muestra la instalación como vigente.
 */
export type EstadoLicencia = 'consultando' | 'vigente' | 'sin-licencia';

/**
 * Sello flotante "Protegido por BUNKER".
 *
 * Sólo se muestra en escritorio y tablet (`min-width: 768px`). No hace
 * peticiones propias: lee el estado del captcha compartido, de modo que en
 * una pantalla con validador de seguridad (el login) **no** se genera un
 * segundo reto. Si la pantalla no tiene captcha, consulta uno al montarse.
 * Al pulsar sobre BUNKER se vuelve a consultar. No enlaza a sitios externos.
 */
@Component({
  selector: 'app-license-bunker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './license-bunker.component.html',
  styleUrls: ['./license-bunker.component.scss'],
})
export class LicenseBunkerComponent implements OnDestroy {
  private readonly captcha = inject(CaptchaService);

  /** Estado del captcha compartido → estado del sello. */
  public readonly estado = computed<EstadoLicencia>(() => {
    switch (this.captcha.estado()) {
      case 'resuelto':
        return 'vigente';
      case 'error':
        return 'sin-licencia';
      default:
        return 'consultando';
    }
  });

  /** Evita consultas concurrentes. */
  private solicitando = false;

  /**
   * Si tras montar la pantalla nadie pidió un reto (no hay validador de
   * seguridad), el sello resuelve uno propio. En el login el validador ya
   * está trabajando, así que este temporizador no dispara nada.
   */
  private readonly revision = setTimeout(() => {
    if (this.captcha.estado() === 'inactivo') {
      void this.consultar();
    }
  }, 1200);

  ngOnDestroy(): void {
    clearTimeout(this.revision);
  }

  /** Consulta el captcha compartido (o resuelve uno nuevo si hace falta). */
  public async consultar(): Promise<void> {
    if (this.solicitando) {
      return;
    }

    this.solicitando = true;
    try {
      await this.captcha.obtenerYResolver();
    } finally {
      this.solicitando = false;
    }
  }

  /** Texto accesible del sello según el estado. */
  public get descripcion(): string {
    switch (this.estado()) {
      case 'vigente':
        return 'Protegido por BUNKER · licencia vigente (captcha operativo)';
      case 'sin-licencia':
        return 'Protegido por BUNKER · licencia sin verificar (captcha no disponible)';
      default:
        return 'Protegido por BUNKER · consultando captcha';
    }
  }

  /** Color del aro: verde vigente, ámbar consultando, rojo sin licencia. */
  public get colorAro(): string {
    switch (this.estado()) {
      case 'vigente':
        return '#41a83f';
      case 'sin-licencia':
        return '#e53935';
      default:
        return '#f9a825';
    }
  }

  /** Símbolo y color del badge de estado. */
  public get badge(): { simbolo: string; color: string } {
    switch (this.estado()) {
      case 'vigente':
        return { simbolo: '✓', color: '#4CAF50' };
      case 'sin-licencia':
        return { simbolo: '✗', color: '#e53935' };
      default:
        return { simbolo: '…', color: '#f9a825' };
    }
  }
}
