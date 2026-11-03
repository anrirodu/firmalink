import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioToken } from '../../auth/interfaces/auth.interfaces';
import {
  TotpDialogData,
  TotpDialogResult,
  TotpDosFactoresDialog,
} from './totp-dos-factores.dialog';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
})
export class CambiarContrasenaComponent implements OnInit, OnDestroy {
  // Mostrar / ocultar contraseñas
  showClave = signal(false);
  showNueva = signal(false);
  showRepite = signal(false);
  saving = signal(false);

  // Form controls (misma lógica que consola)
  changeClaveCtrl = new FormControl('');
  changeNuevaCtrl = new FormControl('');
  changeRepiteCtrl = new FormControl('');

  get changeNuevaLength(): number {
    return (this.changeNuevaCtrl.value as string)?.length || 0;
  }
  get changeRepiteLength(): number {
    return (this.changeRepiteCtrl.value as string)?.length || 0;
  }
  get passwordsMatch(): boolean {
    return this.changeNuevaCtrl.value !== this.changeRepiteCtrl.value && this.changeRepiteLength > 0;
  }

  /** Botón deshabilitado igual que consola: fuerza < 80 o contraseñas distintas */
  get canSave(): boolean {
    return this.isFuerte() && this.changeNuevaCtrl.value === this.changeRepiteCtrl.value;
  }

  // Fuerza de contraseña
  passwordStrengthWidth = signal(0);
  passwordStrengthLabel = signal('Sin seguridad');
  passwordStrengthColor = signal('');
  isFuerte = signal(false);

  // ── TOTP — el flujo completo vive en `TotpDosFactoresDialog` ──
  /** Secreto vigente del usuario (vacío si no tiene 2FA). Nunca se persiste. */
  totpSecret = signal('');
  isTotpActive = signal(false);

  private _unsubscribeAll = new Subject<void>();
  private usuario = '';
  private tokenData: UsuarioToken | null = null;

  public authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    // Obtener el usuario y datos TOTP desde el token (igual que consola accionesGenerales)
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = this.authService.getUserDecrypt(token);
      this.tokenData = payload?.Usuario || null;
      // Usar el 'usuario' (username), con fallback a cédula si viene vacío
      this.usuario = this.tokenData?.usuario || this.tokenData?.cedula || '';

      // Estado TOTP (igual que consola: el secreto vive SOLO en el JWT y en
      // memoria del componente; jamás en sessionStorage). El flag 'totp' es un
      // simple marcador de sesión, no sensible, para distinguir un cambio hecho
      // en ESTA pestaña de lo que el JWT (emitido al login) todavía refleja.
      const flag = sessionStorage.getItem('totp');
      const secretoJwt = this.tokenData?.token || '';

      const activo =
        flag !== null
          ? flag === '1'
          : !!(this.tokenData?.token && this.tokenData.token !== '');

      if (activo) {
        this.isTotpActive.set(true);

        if (secretoJwt) {
          // El secreto vive sólo en el JWT y en memoria: se usa para validar
          // el código cuando el usuario decida desactivar la verificación.
          this.totpSecret.set(secretoJwt);
        } else {
          // Se activó en esta pestaña y el JWT no se re-emitió: se recupera
          // el secreto desde el backend sin exponerlo en sessionStorage.
          this.authService.consultarSecretoTotp().subscribe((enBd) => {
            if (enBd) {
              this.totpSecret.set(enBd);
            }
          });
        }
      }
    }

    // Observar cambios en la nueva contraseña para calcular la fuerza
    this.changeNuevaCtrl.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(val => this.checkPasswordStrength((val as string) || ''));
  }

  /**
   * Calcula la fuerza de la contraseña (misma lógica que consola)
   */
  checkPasswordStrength(password: string): void {
    let result = 0;
    if (password.length >= 8) result += 20;
    if (password.match(/[A-Z]/)) result += 20;
    if (password.match(/[a-z]/)) result += 20;
    if (password.match(/[0-9]/)) result += 20;
    if (password.match(/[@$!%*?&]/)) result += 20;

    this.passwordStrengthWidth.set(result);
    this.isFuerte.set(result >= 80);

    if (result < 40) {
      this.passwordStrengthLabel.set('Débil');
      this.passwordStrengthColor.set('danger');
    } else if (result < 60) {
      this.passwordStrengthLabel.set('Media');
      this.passwordStrengthColor.set('warning');
    } else if (result === 100) {
      this.passwordStrengthLabel.set('Fuerte');
      this.passwordStrengthColor.set('success');
    } else {
      this.passwordStrengthLabel.set('Buena');
      this.passwordStrengthColor.set('info');
    }
  }

  /**
   * Ejecuta el cambio de contraseña (misma lógica que consola)
   */
  async save(): Promise<void> {
    if (!this.usuario) {
      this.alertMini('error', 'No existe un usuario');
      return;
    }

    if (this.passwordsMatch) {
      this.alertMini('error', 'La nueva contraseña y su repetición no coinciden.');
      return;
    }

    const password = this.changeNuevaCtrl.value as string;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!passwordRegex.test(password)) {
      this.alertMini('error', 'La clave no cumple con los requisitos de complejidad.');
      return;
    }

    this.saving.set(true);

    const claveActual = this.changeClaveCtrl.value as string;
    const nuevaClave = this.changeNuevaCtrl.value as string;

    console.log('[CambiarContrasena] Enviando cambio para usuario:', this.usuario);

    const ok = await this.authService.cambiarContrasena(this.usuario, claveActual, nuevaClave);

    this.saving.set(false);
    if (ok) {
      this.router.navigate(['/login']);
    }
  }

  // ───────────────────────── TOTP ─────────────────────────
  /**
   * Abre el diálogo de verificación en dos pasos.
   *
   * - Activar: confirmación + instrucciones + QR + comprobación del código.
   *   El secreto sólo se guarda en `usuario.token` (`ccoleccion`) cuando el
   *   usuario supera la verificación; cancelar antes deja la cuenta tal como
   *   estaba.
   * - Desactivar: exige el código TOTP vigente antes de limpiar el secreto
   *   (`_SYS_UUserTOTP`).
   */
  toggleTotp(event: MatSlideToggleChange): void {
    const deseaActivar = event.checked;
    if (deseaActivar === this.isTotpActive()) {
      return;
    }

    const data: TotpDialogData = {
      modo: deseaActivar ? 'activar' : 'desactivar',
      secreto: deseaActivar ? '' : this.totpSecret(),
    };

    const ref = this.dialog.open<TotpDosFactoresDialog, TotpDialogData, TotpDialogResult>(
      TotpDosFactoresDialog,
      {
        width: 'min(96vw, 720px)',
        maxWidth: '96vw',
        maxHeight: '92vh',
        autoFocus: false,
        disableClose: true,
        panelClass: 'totp-dialog-panel',
        data,
      },
    );

    ref
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resultado) => {
        if (!resultado) {
          // Cancelado: el interruptor vuelve a reflejar el estado real. El
          // binding [checked] no se re-aplica porque el valor no cambió.
          event.source.checked = this.isTotpActive();
          return;
        }

        if (resultado.secreto) {
          this.totpSecret.set(resultado.secreto);
          this.isTotpActive.set(true);
          this.guardarEstadoTotp('1');
          this.alertMini('success', 'Verificación en dos pasos activada.');
          return;
        }

        this.totpSecret.set('');
        this.isTotpActive.set(false);
        this.guardarEstadoTotp('0');
        this.alertMini('success', 'Verificación en dos pasos desactivada.');
      });
  }

  /**
   * Marcador de sesión (NO sensible): '1' si el usuario conmutó el 2FA en esta
   * pestaña, '0' si lo desactivó. El JWT no se re-emite al conmutar, así que sin
   * este flag la recarga volvería al estado viejo del token. El secreto NUNCA
   * se persiste en el navegador (solo vive en el JWT y en memoria).
   */
  private guardarEstadoTotp(activo: '0' | '1'): void {
    sessionStorage.setItem('totp', activo);
  }

  /**
   * Alerta estilo consola (toast top-end)
   */
  private alertMini(icon: 'success' | 'error' | 'info' | 'warning', title: string): void {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(undefined);
    this._unsubscribeAll.complete();
  }
}
