import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TotpService } from './totp.service';
import {
  codigoTotpValido,
  formatearSecreto,
  normalizarSecreto,
  segundosRestantes,
} from './totp.util';

export type TotpDialogModo = 'activar' | 'desactivar';

export interface TotpDialogData {
  modo: TotpDialogModo;
  /** Secreto vigente del usuario. Sólo se usa al desactivar. */
  secreto?: string;
}

export interface TotpDialogResult {
  /** Secreto resultante: el nuevo al activar, cadena vacía al desactivar. */
  secreto: string;
}

type Paso = 'intro' | 'configurar' | 'verificar' | 'desactivar' | 'listo';

/**
 * Diálogo de verificación en dos pasos (TOTP).
 *
 * Activación, en tres pasos:
 *   1. Confirmación + instrucciones + enlaces a las tiendas de aplicaciones.
 *   2. Código QR del secreto nuevo y la clave para copiar/pegar a mano.
 *   3. Código de 6 dígitos para comprobar que la aplicación quedó configurada.
 *      Sólo entonces se persiste el secreto (`_SYS_UUserTOTP`).
 *
 * Desactivación: exige el código TOTP vigente antes de limpiar el secreto.
 *
 * Nada se guarda hasta que el usuario supera la verificación: cerrar el
 * diálogo antes de ese punto deja la cuenta exactamente como estaba.
 */
@Component({
  selector: 'app-totp-dos-factores-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './totp-dos-factores.dialog.html',
  styleUrls: ['./totp-dos-factores.dialog.scss'],
})
export class TotpDosFactoresDialog implements OnInit, OnDestroy {
  private readonly ref = inject(MatDialogRef<TotpDosFactoresDialog, TotpDialogResult>);
  private readonly totp = inject(TotpService);
  readonly data: TotpDialogData = inject(MAT_DIALOG_DATA, { optional: true }) ?? {
    modo: 'activar',
  };

  /** Paso visible del diálogo. */
  readonly paso = signal<Paso>('intro');

  /** Secreto TOTP: el nuevo durante la activación, el vigente al desactivar. */
  readonly secreto = signal('');

  /** Imagen del QR en base64 (data URI). */
  readonly qrUrl = signal('');
  readonly cargandoQr = signal(false);

  /** Código de 6 dígitos escrito por el usuario. */
  readonly codigo = signal('');

  readonly verificando = signal(false);
  readonly copiado = signal(false);
  readonly error = signal('');
  /** El secreto vigente no se pudo recuperar: no hay contra qué validar. */
  readonly sinSecreto = signal(false);

  /** Segundos de validez del código actual (cuenta regresiva informativa). */
  readonly segundos = signal(segundosRestantes());

  readonly esDesactivar = computed(() => this.data.modo === 'desactivar');
  readonly secretoFormateado = computed(() => formatearSecreto(this.secreto()));
  readonly codigoCompleto = computed(() => this.codigo().length === 6);

  /** Índice del paso para el indicador de progreso (0..2). */
  readonly indicePaso = computed(() => {
    switch (this.paso()) {
      case 'intro':
        return 0;
      case 'configurar':
        return 1;
      case 'verificar':
        return 2;
      default:
        return 3;
    }
  });

  readonly titulo = computed(() => {
    if (this.paso() === 'listo') {
      return this.esDesactivar() ? 'Verificación desactivada' : 'Verificación activada';
    }
    return this.esDesactivar()
      ? 'Desactivar verificación en dos pasos'
      : 'Activar verificación en dos pasos';
  });

  readonly subtitulo = computed(() => {
    switch (this.paso()) {
      case 'intro':
        return 'Añada un código temporal a su inicio de sesión.';
      case 'configurar':
        return 'Vincule su aplicación de autenticación.';
      case 'verificar':
        return 'Confirme el código que muestra su teléfono.';
      case 'desactivar':
        return 'Confirme su identidad con el código actual.';
      default:
        return '';
    }
  });

  readonly iconoCabecera = computed(() => {
    if (this.paso() === 'listo') {
      return this.esDesactivar() ? 'gpp_bad' : 'verified_user';
    }
    if (this.esDesactivar()) {
      return 'lock_open';
    }
    switch (this.paso()) {
      case 'configurar':
        return 'qr_code_2';
      case 'verificar':
        return 'pin';
      default:
        return 'shield';
    }
  });

  /** Cuenta regresiva del código TOTP (sólo informativa). */
  private reloj?: ReturnType<typeof setInterval>;
  /** Cierre automático tras el éxito. */
  private cierreAutomatico?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (this.esDesactivar()) {
      this.paso.set('desactivar');
      this.prepararDesactivacion();
    }

    this.reloj = setInterval(() => this.segundos.set(segundosRestantes()), 1000);
  }

  ngOnDestroy(): void {
    if (this.reloj) {
      clearInterval(this.reloj);
    }
    if (this.cierreAutomatico) {
      clearTimeout(this.cierreAutomatico);
    }
  }

  // ───────────────────────── Activación ─────────────────────────

  /** Pasa al paso del QR y pide un secreto nuevo al servidor. */
  comenzarConfiguracion(): void {
    this.paso.set('configurar');
    this.error.set('');
    this.generarQr();
  }

  /**
   * Solicita un secreto nuevo (`wusuario/gtotp`). El backend NO lo persiste:
   * sólo se guardará cuando el usuario verifique el código en el paso final.
   */
  generarQr(): void {
    this.cargandoQr.set(true);
    this.error.set('');
    this.qrUrl.set('');
    this.secreto.set('');

    this.totp.generarQr().subscribe({
      next: (data) => {
        const qr = data?.contenido || '';
        const secreto = data?.msj || '';

        this.cargandoQr.set(false);

        if (!qr || !secreto) {
          this.error.set('No se pudo generar el código QR. Intente de nuevo.');
          return;
        }

        this.qrUrl.set(qr);
        this.secreto.set(normalizarSecreto(secreto));
      },
      error: () => {
        this.cargandoQr.set(false);
        this.error.set('No se pudo generar el código QR. Intente de nuevo.');
      },
    });
  }

  /** Avanza del QR a la captura del código. */
  irAVerificar(): void {
    if (!this.secreto()) {
      this.error.set('Genere el código QR antes de continuar.');
      return;
    }
    this.error.set('');
    this.codigo.set('');
    this.paso.set('verificar');
  }

  /** Verifica el código y, si es correcto, persiste el secreto. */
  async verificarYActivar(): Promise<void> {
    if (!this.secreto()) {
      this.error.set('No hay una clave que verificar. Vuelva al paso anterior.');
      return;
    }
    if (!this.codigoCompleto()) {
      this.error.set('Escriba los 6 dígitos que muestra su aplicación.');
      return;
    }

    this.verificando.set(true);
    this.error.set('');

    const valido = await this.codigoLocalValido();

    if (!valido) {
      this.verificando.set(false);
      if (!this.error()) {
        this.error.set(
          'El código no es válido o ya expiró. Verifique que la hora de su teléfono esté sincronizada e intente con el código actual.',
        );
      }
      return;
    }

    try {
      await this.totp.activar(this.secreto());
    } catch (err) {
      this.verificando.set(false);
      this.error.set(this.mensaje(err) || 'No se pudo guardar la configuración. Intente de nuevo.');
      return;
    }

    this.verificando.set(false);
    this.mostrarExito({ secreto: this.secreto() });
  }

  // ───────────────────────── Desactivación ─────────────────────────

  /** Recupera el secreto vigente para poder validar el código. */
  private prepararDesactivacion(): void {
    const conocido = normalizarSecreto(this.data.secreto || '');
    if (conocido) {
      this.secreto.set(conocido);
      return;
    }

    this.totp.consultarSecreto().subscribe((enBd) => {
      const secreto = normalizarSecreto(enBd || '');
      if (secreto) {
        this.secreto.set(secreto);
        return;
      }
      this.sinSecreto.set(true);
      this.error.set(
        'No se pudo recuperar la clave configurada para validar el código. Cierre sesión, vuelva a entrar y reintente la desactivación.',
      );
    });
  }

  /** Exige el código vigente y, si coincide, limpia el secreto. */
  async verificarYDesactivar(): Promise<void> {
    if (this.sinSecreto()) {
      return;
    }
    if (!this.codigoCompleto()) {
      this.error.set('Escriba los 6 dígitos que muestra su aplicación.');
      return;
    }

    this.verificando.set(true);
    this.error.set('');

    const valido = await this.codigoLocalValido();

    if (!valido) {
      this.verificando.set(false);
      if (!this.error()) {
        this.error.set('El código no es válido o ya expiró. Intente con el código actual.');
      }
      return;
    }

    let desactivado: boolean;

    try {
      desactivado = await this.totp.desactivar(this.secreto());
    } catch (err) {
      this.verificando.set(false);
      this.error.set(
        this.mensaje(err) || 'No se pudo desactivar la verificación. Intente de nuevo.',
      );
      return;
    }

    this.verificando.set(false);

    if (!desactivado) {
      this.error.set(
        'El servidor no confirmó el borrado de la clave. Cierre sesión, vuelva a entrar y reintente.',
      );
      return;
    }

    this.mostrarExito({ secreto: '' });
  }

  // ───────────────────────── Comunes ─────────────────────────

  /**
   * Comprueba el código escrito contra el secreto. Si el navegador no ofrece
   * WebCrypto (contexto no seguro) deja el motivo en `error` y devuelve false.
   */
  private async codigoLocalValido(): Promise<boolean> {
    try {
      return await codigoTotpValido(this.secreto(), this.codigo());
    } catch {
      this.error.set(
        'No se pudo comprobar el código en este navegador. Asegúrese de estar en una conexión segura (HTTPS) y vuelva a intentarlo.',
      );
      return false;
    }
  }

  /** Filtra la entrada a dígitos y limpia el error anterior. */
  onCodigo(event: Event): void {
    const entrada = event.target as HTMLInputElement;
    const limpio = (entrada.value || '').replace(/\D/g, '').slice(0, 6);
    entrada.value = limpio;
    this.codigo.set(limpio);
    if (this.error()) {
      this.error.set('');
    }
  }

  /** Copia la clave sin espacios (formato que aceptan las aplicaciones). */
  copiarSecreto(): void {
    const clave = this.secreto();
    if (!clave) {
      return;
    }

    navigator.clipboard
      .writeText(clave)
      .then(() => {
        this.copiado.set(true);
        setTimeout(() => this.copiado.set(false), 2500);
      })
      .catch(() => this.error.set('No se pudo copiar la clave. Cópiela manualmente.'));
  }

  /** Vuelve al paso anterior (sólo dentro de la activación). */
  atras(): void {
    this.error.set('');
    if (this.paso() === 'verificar') {
      this.codigo.set('');
      this.paso.set('configurar');
      return;
    }
    this.paso.set('intro');
  }

  /** Muestra el paso de éxito y cierra solo al cabo de un momento. */
  private mostrarExito(resultado: TotpDialogResult): void {
    this.paso.set('listo');
    this.codigo.set('');
    this.cierreAutomatico = setTimeout(() => this.ref.close(resultado), 2400);
  }

  /** Cierra el diálogo devolviendo el resultado (botón «Entendido»). */
  finalizar(): void {
    if (this.cierreAutomatico) {
      clearTimeout(this.cierreAutomatico);
    }
    this.ref.close({ secreto: this.esDesactivar() ? '' : this.secreto() });
  }

  /** Cierra sin cambios. */
  cerrar(): void {
    this.ref.close();
  }

  private mensaje(err: unknown): string {
    const texto =
      (err as any)?.error?.msj ||
      (err as any)?.error?.msg ||
      (err as any)?.error?.mensaje ||
      (err as any)?.message ||
      '';
    return typeof texto === 'string' ? texto.trim() : '';
  }
}
