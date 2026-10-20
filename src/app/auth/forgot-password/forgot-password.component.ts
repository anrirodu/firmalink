import { Component, signal, inject } from '@angular/core';
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
import { PasswordResetService, VIGENCIA_MINUTOS } from '../services/password-reset.service';

/**
 * ForgotPasswordComponent — pantalla pre-autenticación "¿Olvidó su contraseña?".
 *
 * Valida el correo contra la colección `usuario` (campo `correo`) ANTES de
 * enviar el enlace; si está registrado, genera el token de 15 minutos y
 * despacha el correo (ver PasswordResetService). Mantiene el split layout del
 * login para que la transición visual sea continua.
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
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private readonly reset = inject(PasswordResetService);
  private readonly router = inject(Router);

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

  solicitar(): void {
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

    this.reset.solicitar(correo).subscribe({
      next: () => {
        this.enviando.set(false);
        this.enviado.set(true);
        this.alertaEnvio(correo);
      },
      error: (err: Error) => {
        this.enviando.set(false);
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
