import { Component, OnInit, signal, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { timeout } from 'rxjs';
import { IsotipoAnimadoComponent } from '../../shared/components/isotipo-animado/isotipo-animado.component';
import {
  EstadoValidador,
  ValidadorSeguridadComponent,
} from '../../shared/components/validador-seguridad/validador-seguridad.component';
import { PasswordResetService, EstadoToken } from '../services/password-reset.service';

/** Misma expresión de complejidad que el cambio de contraseña autenticado. */
const CLAVE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

/**
 * RecoverPasswordComponent — pantalla pre-autenticación `recover-password/:token`.
 *
 * Al abrir, valida el token contra `firmalink_password_resets` (no usado y
 * dentro de los 15 minutos) antes de mostrar el formulario. La clave nueva se
 * somete a las MISMAS reglas del cambio de contraseña autenticado
 * (8-16, mayúscula, minúscula, número, especial @$!%*?&) con el mismo medidor
 * de fuerza; al confirmar, el token se consume de forma atómica y se actualiza
 * `usuario.clave` (SHA-256) desde PasswordResetService.
 *
 * Antes de guardar la clave nueva exige la verificación de seguridad (captcha
 * PoW de Sandra Server Core): el servidor valida la solución del reto, que se
 * consume, así que cada intento necesita un reto nuevo.
 */
@Component({
  selector: 'app-recover-password',
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
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  private readonly reset = inject(PasswordResetService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Verificador de seguridad (captcha PoW) de la pantalla. */
  @ViewChild(ValidadorSeguridadComponent) validador!: ValidadorSeguridadComponent;

  readonly anio = new Date().getFullYear();

  token = '';

  // Estado del enlace
  verificando = signal(true);
  tokenValido = signal(false);

  // Formulario
  // FormGroup para que `ngSubmit` intercepte el envío nativo del navegador
  // (con FormControls sueltos el submit recargaba la página).
  form = new FormGroup({
    nueva: new FormControl('', { nonNullable: true }),
    repite: new FormControl('', { nonNullable: true }),
  });

  get nuevaCtrl(): FormControl<string> {
    return this.form.controls.nueva;
  }

  get repiteCtrl(): FormControl<string> {
    return this.form.controls.repite;
  }
  showNueva = signal(false);
  showRepite = signal(false);
  enviando = signal(false);
  errorMensaje = signal('');

  // Medidor de fuerza (misma lógica que cambiar-contrasena)
  fuerzaWidth = signal(0);
  fuerzaLabel = signal('Sin seguridad');
  fuerzaColor = signal('');
  claveFuerte = signal(false);

  get longitudNueva(): number {
    return (this.nuevaCtrl.value as string)?.length || 0;
  }

  get noCoinciden(): boolean {
    return this.nuevaCtrl.value !== this.repiteCtrl.value && this.repiteCtrl.value.length > 0;
  }

  /** Botón habilitado solo con fuerza >= 80 y claves iguales (igual que consola). */
  get puedeConfirmar(): boolean {
    return (
      this.claveFuerte() &&
      this.nuevaCtrl.value === this.repiteCtrl.value &&
      !this.enviando()
    );
  }

  get claveInvalida(): boolean {
    return this.longitudNueva > 0 && !CLAVE_REGEX.test(this.nuevaCtrl.value as string);
  }

  /** Estado del verificador de seguridad (captcha PoW). */
  get validadorEstado(): EstadoValidador {
    return this.validador?.estado() ?? 'idle';
  }

  /** `true` mientras el reto se resuelve (o se valida en el servidor). */
  get validadorResolviendo(): boolean {
    return this.validadorEstado === 'cargando';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';

    this.nuevaCtrl.valueChanges.subscribe((v) => this.calcularFuerza((v as string) || ''));

    if (!this.token || !this.token.includes('.')) {
      this.verificando.set(false);
      this.tokenValido.set(false);
      return;
    }

    // El `timeout` evita que la pantalla se quede en "Verificando enlace...":
    // sin él, una petición que no responde deja el spinner para siempre.
    this.reset
      .validarToken(this.token)
      .pipe(timeout(12_000))
      .subscribe({
        next: (estado: EstadoToken) => {
          this.verificando.set(false);
          this.tokenValido.set(estado.valido);
          if (!estado.valido) {
            this.alerta('warning', 'El enlace de recuperación venció o ya fue usado.');
          }
        },
        error: (err) => {
          console.error('[RecoverPassword] Fallo al validar el enlace:', err);
          this.verificando.set(false);
          this.tokenValido.set(false);
          this.alerta('error', 'No se pudo validar el enlace. Intente de nuevo.');
        },
      });
  }

  /**
   * Calcula la fuerza de la contraseña (misma escala 0-100 que cambiar-contrasena).
   */
  calcularFuerza(clave: string): void {
    let result = 0;
    if (clave.length >= 8) result += 20;
    if (clave.match(/[A-Z]/)) result += 20;
    if (clave.match(/[a-z]/)) result += 20;
    if (clave.match(/[0-9]/)) result += 20;
    if (clave.match(/[@$!%*?&]/)) result += 20;

    this.fuerzaWidth.set(result);
    this.claveFuerte.set(result >= 80);

    if (result < 40) {
      this.fuerzaLabel.set('Débil');
      this.fuerzaColor.set('danger');
    } else if (result < 60) {
      this.fuerzaLabel.set('Media');
      this.fuerzaColor.set('warning');
    } else if (result === 100) {
      this.fuerzaLabel.set('Fuerte');
      this.fuerzaColor.set('success');
    } else {
      this.fuerzaLabel.set('Buena');
      this.fuerzaColor.set('info');
    }
  }

  async confirmar(): Promise<void> {
    const clave = this.nuevaCtrl.value as string;

    if (!CLAVE_REGEX.test(clave)) {
      this.alerta('error', 'La clave no cumple con los requisitos de complejidad.');
      return;
    }
    if (clave !== this.repiteCtrl.value) {
      this.alerta('error', 'La nueva contraseña y su repetición no coinciden.');
      return;
    }

    this.enviando.set(true);
    this.errorMensaje.set('');

    // Verificación de seguridad: el servidor valida la solución del reto PoW
    // (y la consume). Sin ella no se guarda la clave nueva.
    const verificado = await this.validador?.asegurar();

    if (!verificado) {
      this.enviando.set(false);
      const mensaje =
        'No se pudo completar la verificación de seguridad. Revise su conexión e intente nuevamente.';
      this.errorMensaje.set(mensaje);
      this.alerta('error', mensaje);
      return;
    }

    this.reset.restablecer(this.token, clave).subscribe({
      next: () => {
        this.enviando.set(false);
        this.validador?.invalidar();
        this.alerta('success', 'Contraseña restablecida. Inicie sesión con su clave nueva.');
        this.router.navigate(['/login']);
      },
      error: (err: Error) => {
        this.enviando.set(false);
        // Reto nuevo para el siguiente intento (la solución anterior ya se
        // consumió al validarla en el servidor).
        this.validador?.invalidar();
        const mensaje =
          err?.message || 'No se pudo restablecer la contraseña. Intente de nuevo.';
        this.errorMensaje.set(mensaje);
        console.error('[RecoverPassword] Error al restablecer:', err);
        // Solo se invalida el enlace cuando el error es del token; un fallo de
        // red o del servidor deja el formulario disponible para reintentar.
        if (/enlace|expirado|inválido|invalido/i.test(mensaje)) {
          this.tokenValido.set(false);
        }
        this.alerta('error', mensaje);
      },
    });
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
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
