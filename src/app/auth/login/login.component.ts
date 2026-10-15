import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { TokenPayload } from '../interfaces/auth.interfaces';
import { IsotipoAnimadoComponent } from '../../shared/components/isotipo-animado/isotipo-animado.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    IsotipoAnimadoComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('otp0') otp0Ref!: ElementRef<HTMLInputElement>;

  email = signal('');
  password = signal('');
  hidePassword = signal(true);
  isLoading = signal(false);

  // Reloj en tiempo real para el footer
  currentTime = signal<Date>(new Date());
  private intervalId: any;

  // TOTP state
  showTotp = signal(false);
  tempAuthToken = signal('');
  otp = signal<string[]>(['', '', '', '', '', '']);
  isOtpInvalid = signal(false);
  loading = signal(false);
  // Efecto de verificación exitosa (mostrado antes de ingresar)
  success = signal(false);

  currentYear = new Date().getFullYear();
  version = '1.0.0';
  buildDate = environment.buildDate || environment.version || '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    // Si ya está autenticado, redirigir
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    // Reloj en tiempo real
    this.intervalId = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngAfterViewInit(): void {
    // Focus al primer input de OTP cuando se muestra
    if (this.showTotp()) {
      this.otp0Ref?.nativeElement?.focus();
    }
  }

  onLogin(): void {
    if (!this.email() || !this.password()) return;

    this.isLoading.set(true);

    this.authService.getLogin(this.email(), this.password()).subscribe({
      next: (itk) => {
        this.isLoading.set(false);

        // Verificar si tiene TOTP activo
        const payload = this.authService.getUserDecrypt(itk.token);
        if (payload?.Usuario?.token !== undefined && payload?.Usuario?.token !== null) {
          // Tiene TOTP → mostrar paso 2
          this.tempAuthToken.set(itk.token);
          this.authService.setTempAuthToken(itk.token); // Guardar en el servicio para validarTotp
          this.success.set(false);
          this.showTotp.set(true);
          setTimeout(() => {
            this.otp0Ref?.nativeElement?.focus();
          }, 100);
        } else {
          // Sin TOTP → verificar multi-sesión antes de iniciar sesión
          this.authService.verificarSesion(itk.token).subscribe({
            next: (xdata) => {
              if (xdata.msj === 'Ok') {
                // Sin sesión activa previa → iniciar sesión
                this.authService.iniciarSesion(itk.token).then(() => {
                  this.router.navigate(['/dashboard']);
                }).catch((e) => {
                  this.manejarErrorAcceso(e);
                });
              } else if (xdata.tipo === 99) {
                // Ya hay una sesión activa y multi-sesión no permitida
                this.mostrarError(xdata.msj);
                this.limpiarCampos();
              } else {
                this.mostrarError('Error al validar la sesión');
              }
            },
            error: () => {
              // Si falla el chequeo, no bloquear el login (best effort)
              this.authService.iniciarSesion(itk.token).then(() => {
                this.router.navigate(['/dashboard']);
              }).catch((e) => {
                this.manejarErrorAcceso(e);
              });
            },
          });
        }
      },
      error: (er) => {
        this.isLoading.set(false);
        const msg = er.error?.msj || 'Error al acceder al sistema';
        this.mostrarError(msg);
      },
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.showTotp()) {
      this.onLogin();
    }
  }

  // ========== TOTP Methods ==========

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Solo aceptar números
    if (!/^[0-9]$/.test(value)) {
      input.value = '';
      return;
    }

    const newOtp = [...this.otp()];
    newOtp[index] = value;
    this.otp.set(newOtp);

    // Mover al siguiente input
    if (value && index < 5) {
      const nextInput = document.querySelectorAll('.otp-box')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }

    // Si se completaron los 6 dígitos
    if (index === 5 && value) {
      this.verificarTotp();
    }
  }

  onKeydownOtp(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (!input.value && index > 0) {
        const prevInput = document.querySelectorAll('.otp-box')[index - 1] as HTMLInputElement;
        prevInput?.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text').trim();

    if (pastedData && /^[0-9]{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newOtp = [...this.otp()];

      digits.forEach((digit, i) => {
        newOtp[i] = digit;
        const input = document.querySelectorAll('.otp-box')[i] as HTMLInputElement;
        if (input) input.value = digit;
      });

      this.otp.set(newOtp);

      // Focus al último y verificar
      const lastInput = document.querySelectorAll('.otp-box')[5] as HTMLInputElement;
      lastInput?.focus();
      this.verificarTotp();
    }
  }

  verificarTotp(): void {
    const otpCode = this.otp().join('');
    if (otpCode.length !== 6 || this.loading()) return;

    this.loading.set(true);

    // Paso 1: Validar TOTP
    this.authService.validarTotp(otpCode).subscribe({
      next: (data) => {
        if (data.msj === 'Ok') {
          // Código válido → mostrar el efecto de verificación antes de ingresar
          this.success.set(true);

          // Paso 2: Verificar múltiples sesiones
          this.authService.verificarSesion().subscribe({
            next: (xdata) => {
              this.loading.set(false);
              if (xdata.msj === 'Ok') {
                // Paso 3: Iniciar sesión (con el efecto de éxito antes de entrar)
                this.finalizarConEfecto(this.authService.iniciarSesion(this.tempAuthToken()));
              } else if (xdata.tipo === 99) {
                this.handleOtpError(xdata.msj);
                this.goBackToLogin();
              } else {
                this.handleOtpError('Error al validar el código');
              }
            },
            error: () => {
              this.loading.set(false);
              this.handleOtpError('Error de conexión');
            },
          });
        } else {
          this.loading.set(false);
          this.handleOtpError('Código incorrecto');
        }
      },
      error: (e) => {
        this.loading.set(false);
        const xdata = e.error;
        if (xdata?.tipo === 99) {
          this.handleOtpError(xdata.msj);
          this.goBackToLogin();
        } else {
          this.handleOtpError('Error al validar el código');
        }
      },
    });
  }

  handleOtpError(message: string): void {
    this.success.set(false);
    this.isOtpInvalid.set(true);
    this.otp.set(['', '', '', '', '', '']);

    // Limpiar inputs del DOM
    const inputs = document.querySelectorAll('.otp-box');
    inputs.forEach((i) => ((i as HTMLInputElement).value = ''));

    setTimeout(() => {
      (inputs[0] as HTMLInputElement)?.focus();
    }, 0);

    setTimeout(() => this.isOtpInvalid.set(false), 500);

    this.mostrarError(message);
  }

  goBackToLogin(): void {
    this.showTotp.set(false);
    this.success.set(false);
    this.tempAuthToken.set('');
    this.isOtpInvalid.set(false);
    this.otp.set(['', '', '', '', '', '']);

    // Limpiar inputs del DOM
    const inputs = document.querySelectorAll('.otp-box');
    inputs.forEach((i) => ((i as HTMLInputElement).value = ''));
  }

  /**
   * Limpia los campos tras un error de multi-sesión.
   */
  limpiarCampos(): void {
    this.password.set('');
    this.tempAuthToken.set('');
  }

  /**
   * Mantiene el efecto de verificación exitosa un tiempo mínimo y, cuando la
   * sesión ya quedó establecida, navega al dashboard. Si algo falla, se
   * revierte el efecto y se muestra el mensaje en el login.
   */
  private finalizarConEfecto(task: Promise<void>): void {
    this.success.set(true);

    // Mínimo visible de la animación (~1.6 s)
    const efecto = new Promise<void>((resolve) => setTimeout(resolve, 1600));

    Promise.all([task, efecto])
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => {
        this.success.set(false);
        this.manejarErrorAcceso(e);
      });
  }

  /**
   * Maneja el rechazo de acceso al iniciar sesión (p. ej. el usuario no tiene
   * la aplicación FirmaLink) mostrando el mensaje en el propio login.
   */
  manejarErrorAcceso(error: any): void {
    this.isLoading.set(false);
    this.loading.set(false);

    const sinAcceso = error?.message === 'SIN_ACCESO_APP';
    this.mostrarError(
      sinAcceso ? 'No tiene acceso a FirmaLink' : 'Error al iniciar sesión',
    );
    this.limpiarCampos();
  }

  mostrarError(msg: string): void {
    // SweetAlert2 toast
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    });
  }
}
