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
import { AccesoBienvenidaComponent } from '../../shared/components/acceso-bienvenida/acceso-bienvenida.component';
import { environment } from '../../../environments/environment';

/**
 * Duración mínima de la bienvenida animada antes de entrar al panel.
 * Debe coincidir con la animación de la barra de progreso del SCSS
 * (`.acceso-barra span`), para que el avance y la salida vayan sincronizados.
 */
const DURACION_BIENVENIDA = 1800;

/** Desvanecido del panel que sale antes de montar el siguiente. */
const DURACION_SALIDA = 220;
/** Ajuste animado del alto de la tarjeta al cambiar de panel. */
const DURACION_ALTO = 320;

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
    AccesoBienvenidaComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('otp0') otp0Ref!: ElementRef<HTMLInputElement>;
  @ViewChild('tarjeta') tarjetaRef!: ElementRef<HTMLElement>;

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
  // Panel en salida: desvanece el contenido actual antes de mostrar el otro
  transicionando = signal(false);

  // Bienvenida a pantalla completa. Se reserva al acceso directo (usuario sin
  // TOTP): con TOTP el efecto de verificación ya cumple esa función y encadenar
  // las dos animaciones retrasaría el ingreso sin aportar nada.
  accesoDirecto = signal(false);
  nombreBienvenida = signal('');

  private navegando = false;

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
          this.cambiarPanel(
            () => this.showTotp.set(true),
            () => this.otp0Ref?.nativeElement?.focus(),
          );
        } else {
          // Sin TOTP → verificar multi-sesión antes de iniciar sesión
          this.authService.verificarSesion(itk.token).subscribe({
            next: (xdata) => {
              if (xdata.msj === 'Ok') {
                // Sin sesión activa previa → iniciar sesión
                this.authService.iniciarSesion(itk.token).then(() => {
                  this.ingresarConBienvenida(itk.token);
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
                this.ingresarConBienvenida(itk.token);
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
    // Limpiar inputs del DOM antes del cambio de panel
    const inputs = document.querySelectorAll('.otp-box');
    inputs.forEach((i) => ((i as HTMLInputElement).value = ''));

    this.success.set(false);
    this.tempAuthToken.set('');
    this.isOtpInvalid.set(false);
    this.otp.set(['', '', '', '', '', '']);

    this.cambiarPanel(() => this.showTotp.set(false));
  }

  /**
   * Cambia el panel visible (formulario ⇄ verificación en dos pasos) con una
   * transición: el panel actual se desvanece, la tarjeta ajusta su alto y el
   * nuevo panel entra deslizándose. Con "reducir movimiento" el cambio es
   * instantáneo.
   */
  private cambiarPanel(aplicar: () => void, alEntrar?: () => void): void {
    if (this.prefiereMenosMovimiento()) {
      aplicar();
      alEntrar?.();
      return;
    }

    this.transicionando.set(true);

    setTimeout(() => {
      this.ajustarAlto(() => {
        aplicar();
        this.transicionando.set(false);
      });
      if (alEntrar) setTimeout(alEntrar, 120);
    }, DURACION_SALIDA);
  }

  /**
   * Anima el alto de la tarjeta entre el panel que sale y el que entra para
   * que el cambio no dé un salto brusco.
   *
   * Congela el alto actual, deja que Angular monte el panel nuevo, mide su alto
   * natural y transiciona entre ambos; al terminar libera los estilos en línea.
   */
  private ajustarAlto(aplicar: () => void): void {
    const tarjeta = this.tarjetaRef?.nativeElement;
    if (!tarjeta) {
      aplicar();
      return;
    }

    const altoAntes = tarjeta.offsetHeight;
    tarjeta.style.transition = 'none';
    tarjeta.style.height = `${altoAntes}px`;
    // Evita que el panel nuevo se derrame mientras el alto todavía no creció.
    tarjeta.style.overflow = 'hidden';

    aplicar();

    // Siguiente frame: el panel nuevo ya está renderizado.
    requestAnimationFrame(() => {
      tarjeta.style.height = '';
      const altoDespues = tarjeta.offsetHeight;

      if (altoAntes === altoDespues) {
        tarjeta.style.transition = '';
        tarjeta.style.overflow = '';
        return;
      }

      // Vuelve al alto anterior sin pintar nada y transiciona al nuevo.
      tarjeta.style.height = `${altoAntes}px`;
      void tarjeta.offsetHeight;
      tarjeta.style.transition = `height ${DURACION_ALTO}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      requestAnimationFrame(() => {
        tarjeta.style.height = `${altoDespues}px`;
      });

      const liberar = () => {
        tarjeta.style.height = '';
        tarjeta.style.transition = '';
        tarjeta.style.overflow = '';
        tarjeta.removeEventListener('transitionend', liberar);
      };
      tarjeta.addEventListener('transitionend', liberar);
      setTimeout(liberar, DURACION_ALTO + 150);
    });
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
   * Acceso directo (usuario sin TOTP): muestra la bienvenida animada a pantalla
   * completa y, al terminar, entra al panel.
   *
   * La sesión ya quedó establecida cuando se llama, así que la animación nunca
   * anuncia un éxito que pueda revertirse.
   */
  private ingresarConBienvenida(token: string): void {
    this.nombreBienvenida.set(
      this.authService.getUserDecrypt(token)?.Usuario?.nombre || '',
    );
    this.accesoDirecto.set(true);

    // Con "reducir movimiento" el overlay no aporta valor: se entra de una vez.
    if (this.prefiereMenosMovimiento()) {
      this.irAlPanel();
      return;
    }

    setTimeout(() => this.irAlPanel(), DURACION_BIENVENIDA);
  }

  /**
   * Entra al panel. Es idempotente y público porque la bienvenida también se
   * puede saltar con un clic, sin esperar a que termine la animación.
   */
  irAlPanel(): void {
    if (this.navegando) return;
    this.navegando = true;
    this.router.navigate(['/dashboard']);
  }

  private prefiereMenosMovimiento(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
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
