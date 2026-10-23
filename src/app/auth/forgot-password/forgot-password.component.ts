import { Component, signal, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { IsotipoAnimadoComponent } from '../../shared/components/isotipo-animado/isotipo-animado.component';
import {
  EstadoValidador,
  ValidadorSeguridadComponent,
} from '../../shared/components/validador-seguridad/validador-seguridad.component';
import { PasswordResetService, VIGENCIA_MINUTOS } from '../services/password-reset.service';
import { CONFIG } from '../../config';

/**
 * ForgotPasswordComponent — pantalla pre-autenticación "¿Olvidó su contraseña?".
 *
 * Valida el correo contra la colección `usuario` (campo `correo`) ANTES de
 * enviar el enlace; si está registrado, genera el token de 15 minutos y
 * despacha el correo (ver PasswordResetService). Mantiene el split layout del
 * login para que la transición visual sea continua.
 *
 * Antes de procesar la solicitud exige la verificación de seguridad (captcha
 * PoW de Sandra Server Core): el servidor valida la solución del reto, que se
 * consume, así que cada intento necesita un reto nuevo.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    IsotipoAnimadoComponent,
    ValidadorSeguridadComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private readonly reset = inject(PasswordResetService);
  private readonly router = inject(Router);

  /** Verificador de seguridad (captcha PoW) de la pantalla. */
  @ViewChild(ValidadorSeguridadComponent) validador!: ValidadorSeguridadComponent;

  // El formulario es un FormGroup (no un FormControl suelto): sin él,
  // `ngSubmit` no se enlaza y el navegador hace el submit nativo, recargando
  // la página con un GET y perdiendo la petición.
  form = new FormGroup({
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  get correoCtrl(): FormControl<string> {
    return this.form.controls.correo;
  }

  readonly anio = new Date().getFullYear();

  /** Configuración del producto (marca y textos). */
  protected readonly cfg = CONFIG;

  enviando = signal(false);
  enviado = signal(false);
  errorMensaje = signal('');

  /** El botón solo se habilita con un correo con formato válido y no vacío. */
  get correoValido(): boolean {
    return this.correoCtrl.valid && this.correoCtrl.value.trim().length > 0;
  }

  get correoInvalido(): boolean {
    const ctrl = this.correoCtrl;
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  /** Estado del verificador de seguridad (captcha PoW). */
  get validadorEstado(): EstadoValidador {
    return this.validador?.estado() ?? 'idle';
  }

  /** `true` mientras el reto se resuelve (o se valida en el servidor). */
  get validadorResolviendo(): boolean {
    return this.validadorEstado === 'cargando';
  }

  async solicitar(): Promise<void> {
    const correo = this.correoCtrl.value.trim();

    // El botón ya está deshabilitado sin un correo válido, pero el formulario
    // también se envía con Enter: aquí se corta el envío en blanco o con un
    // formato incorrecto antes de tocar la red.
    if (!this.correoValido) {
      this.correoCtrl.markAsTouched();
      this.alerta('warning', 'Ingrese un correo electrónico válido.');
      return;
    }

    this.enviando.set(true);
    this.errorMensaje.set('');

    // Verificación de seguridad: el servidor valida la solución del reto PoW
    // (y la consume). Sin ella no se procesa la solicitud.
    const verificado = await this.validador?.asegurar();

    if (!verificado) {
      this.enviando.set(false);
      const mensaje =
        'No se pudo completar la verificación de seguridad. Revise su conexión e intente nuevamente.';
      this.errorMensaje.set(mensaje);
      this.alerta('error', mensaje);
      return;
    }

    this.reset.solicitar(correo).subscribe({
      next: () => {
        this.enviando.set(false);
        this.enviado.set(true);
        // El servidor consumió la solución del reto: se prepara uno nuevo
        // por si el usuario repite la solicitud.
        this.validador?.invalidar();
        this.alertaEnvio(correo);
      },
      error: (err: Error) => {
        this.enviando.set(false);
        // Reto nuevo para el siguiente intento (la solución anterior ya se
        // consumió al validarla en el servidor).
        this.validador?.invalidar();
        const mensaje =
          err?.message || 'No se pudo procesar la solicitud. Intente de nuevo.';
        this.errorMensaje.set(mensaje);
        console.error('[ForgotPassword] Error al solicitar el enlace:', err);
        this.alerta('error', mensaje);
      },
    });
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }

  /** Confirmación visible del envío (modal, no toast: es el fin del flujo). */
  private alertaEnvio(correo: string): void {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        html:
          `Enviamos el enlace de recuperación a <strong>${this.escapar(correo)}</strong>.<br>` +
          'Revise su bandeja de entrada y, si no lo encuentra, la carpeta de spam.<br>' +
          `El enlace vence en <strong>${VIGENCIA_MINUTOS} minutos</strong> y solo puede usarse una vez.`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0c2d48',
      });
    });
  }

  /** Escapa el correo antes de interpolarlo en el HTML del modal. */
  private escapar(texto: string): string {
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private alerta(icon: 'success' | 'error' | 'info' | 'warning', titulo: string): void {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title: titulo,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    });
  }
}
