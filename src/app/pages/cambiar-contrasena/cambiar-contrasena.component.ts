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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioToken } from '../../auth/interfaces/auth.interfaces';

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
    MatDividerModule,
    MatTooltipModule,
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

  // ── TOTP (misma lógica que consola navbar.component) ──
  showTotpSection = signal(false);
  totpQrCodeUrl = signal('');
  totpSecret = signal('');
  isTotpSecretCopied = signal(false);
  isTotpActive = signal(false);
  generatingQr = signal(false);

  private _unsubscribeAll = new Subject<void>();
  private usuario = '';
  private tokenData: UsuarioToken | null = null;

  public authService = inject(AuthService);
  private router = inject(Router);

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
        this.showTotpSection.set(true);
        this.isTotpActive.set(true);

        if (secretoJwt) {
          this.totpSecret.set(secretoJwt);
          // Mostrar siempre el QR correspondiente al secreto ya configurado,
          // SIN regenerarlo (regenerar rotaría la clave y rompería la app de
          // autenticación del usuario).
          this.cargarQrExistente(secretoJwt);
        } else {
          // Se activó en esta pestaña y el JWT no se re-emitió: se recupera
          // el secreto desde el backend sin exponerlo en sessionStorage.
          this.authService.consultarSecretoTotp().subscribe((enBd) => {
            if (enBd) {
              this.totpSecret.set(enBd);
              this.cargarQrExistente(enBd);
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
   * Activa / desactiva el TOTP enviando la petición `_SYS_UUserTOTP`:
   *  - AL ACTIVAR  → se envía el VALOR (secreto) y siempre se muestra el QR.
   *  - AL DESACTIVAR → se envía cadena VACÍA.
   */
  toggleTotp(event: any): void {
    const isChecked = !!event?.checked;

    if (isChecked) {
      this.activarTotp();
    } else {
      this.desactivarTotp();
    }
  }

  /**
   * Activa el TOTP: genera un secreto nuevo + imagen QR, la muestra siempre
   * y persiste el valor en backend vía `_SYS_UUserTOTP`.
   *
   * MISMO COMPORTAMIENTO QUE v2consola (navbar): al generar se pinta el QR y
   * se guarda el secreto en memoria; NO se llama a `_SYS_UUserTOTP` al activar
   * (solo `/wusuario/gtotp` ya lo persiste). La llamada a `_SYS_UUserTOTP`
   * ocurre ÚNICAMENTE al desactivar (limpiarTotp).
   */
  activarTotp(): void {
    this.showTotpSection.set(true);
    this.isTotpActive.set(true);
    this.generatingQr.set(true);
    this.totpQrCodeUrl.set('');
    this.totpSecret.set('');

    this.authService.generarTotpQr().subscribe({
      next: (data) => {
        if (!this.isTotpActive()) {
          this.generatingQr.set(false);
          return;
        }

        const qr = data?.contenido || '';
        const secreto = data?.msj || '';

        if (!qr || !secreto) {
          this.activacionFallida('No se pudo generar el código QR.');
          return;
        }

        this.totpQrCodeUrl.set(qr);
        this.totpSecret.set(secreto);
        this.generatingQr.set(false);

        this.guardarEstadoTotp('1');
        this.alertMini('success', 'Autenticación de dos factores activada.');
      },
      error: () => this.activacionFallida('No se pudo generar el código QR.'),
    });
  }

  /**
   * Desactiva el TOTP vía `_SYS_UUserTOTP`.
   *
   * Intentos de parámetro (como la consola `navbar.component.ts:700`, gdoc y
   * sssifanb envían el secreto actual):
   *   1º el secreto actual  →  2º cadena vacía.
   * Un intento se descarta cuando responde `MatchedCount: 0` (la función no
   * localizó el registro con ese parámetro); eso no lanza error porque el
   * motor de funciones responde HTTP 200, por eso se inspecciona la respuesta.
   * Al final se contrasta contra BD con `_SYS_CUserPanelLogin`.
   */
  desactivarTotp(): void {
    this.showTotpSection.set(false);
    this.isTotpActive.set(false);

    const secreto = this.totpSecret();
    const intentos = secreto ? [secreto, ''] : [''];

    this.probarDesactivacion(intentos, 0, undefined);
  }

  /**
   * Envía los intentos en orden; cada uno se contrasta con BD antes de pasar
   * al siguiente.
   */
  private probarDesactivacion(intentos: string[], i: number, ultimoError?: string): void {
    if (i >= intentos.length) {
      this.desactivacionFallida(ultimoError);
      return;
    }

    this.authService.actualizarTotp(intentos[i]).subscribe({
      next: (data) => {
        const matched =
          data && typeof data.MatchedCount === 'number' ? data.MatchedCount : null;

        // MatchedCount 0 → probado y no matcheó: intento siguiente.
        if (matched === 0 && i + 1 < intentos.length) {
          this.probarDesactivacion(intentos, i + 1);
          return;
        }

        this.verificarDesactivacion(intentos, i, matched);
      },
      error: (err) => {
        if (i + 1 < intentos.length) {
          this.probarDesactivacion(intentos, i + 1, err?.message);
          return;
        }
        this.desactivacionFallida(err?.message || ultimoError);
      },
    });
  }

  /**
   * Contraste final con BD (`_SYS_CUserPanelLogin` → campo `token`):
   *  - `''`  → borrado confirmado.
   *  - cadena→ sigue ahí → siguiente intento o fallo.
   *  - null  → la función no expone `token` → se decide con `MatchedCount`.
   */
  private verificarDesactivacion(intentos: string[], i: number, matched: number | null): void {
    this.authService.consultarSecretoTotp().subscribe((enBd) => {
      if (enBd === '') {
        this.limpiarTotpLocal();
        this.alertMini('success', 'Autenticación de dos factores desactivada.');
        return;
      }

      if (enBd === null) {
        if (matched === 0) {
          // Nada fue modificado: se conserva el estado real (encendido).
          this.restaurarTotpActivo();
          this.alertMini(
            'error',
            'La función no encontró su registro (MatchedCount 0): el secreto NO se borró.',
          );
          return;
        }
        this.limpiarTotpLocal();
        this.alertMini(
          'warning',
          'Desactivación enviada, pero el servidor no confirmó que el secreto quedó borrado.',
        );
        return;
      }

      // El secreto sigue en BD → probar con el siguiente parámetro.
      if (i + 1 < intentos.length) {
        this.probarDesactivacion(intentos, i + 1);
        return;
      }

      this.restaurarTotpActivo();
      this.alertMini(
        'error',
        matched === 0
          ? 'La función no encontró su registro (MatchedCount 0): el secreto sigue en la base de datos.'
          : 'El servidor no borró el secreto TOTP. Verifique la función _SYS_UUserTOTP.',
      );
    });
  }

  /**
   * Fallo de la llamada: se restaura el interruptor y se avisa.
   */
  private desactivacionFallida(msg?: string): void {
    this.restaurarTotpActivo();
    this.alertMini(
      'error',
      this.msjCorto(msg) || 'No se pudo desactivar la verificación en dos factores.',
    );
  }

  /**
   * Restaura el interruptor en ON (el backend no aceptó el cambio).
   */
  private restaurarTotpActivo(): void {
    this.showTotpSection.set(true);
    this.isTotpActive.set(true);
  }

  /**
   * Limpia el QR/ secreto y deja marcada la sesión como "TOTP desactivado".
   */
  private limpiarTotpLocal(): void {
    this.totpQrCodeUrl.set('');
    this.totpSecret.set('');
    this.generatingQr.set(false);
    this.guardarEstadoTotp('0');
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
   * Acorta el mensaje del servidor para el toast.
   */
  private msjCorto(msg?: string): string {
    const m = (msg || '').trim();
    if (!m) return '';
    return m.length > 110 ? m.slice(0, 107) + '…' : m;
  }

  /**
   * Fallo al activar: se revierte el interruptor y se limpia la sección.
   */
  private activacionFallida(mensaje: string): void {
    this.generatingQr.set(false);
    this.totpQrCodeUrl.set('');
    this.totpSecret.set('');
    this.showTotpSection.set(false);
    this.isTotpActive.set(false);
    this.alertMini('error', mensaje);
  }

  /**
   * Obtiene la imagen QR del secreto YA configurado, sin regenerarlo.
   * (`/wusuario/gtotp/base64` crea un secreto nuevo en cada llamada).
   */
  private cargarQrExistente(secret: string): void {
    this.generatingQr.set(true);

    this.authService.getImagenQr(secret).subscribe({
      next: (data) => {
        this.totpQrCodeUrl.set(data?.contenido || '');
        this.generatingQr.set(false);
      },
      error: () => {
        this.totpQrCodeUrl.set('');
        this.generatingQr.set(false);
      },
    });
  }

  /**
   * Copia la clave secreta de TOTP al portapapeles.
   */
  copyTotpSecret(): void {
    if (!this.totpSecret()) return;

    navigator.clipboard.writeText(this.totpSecret()).then(() => {
      this.isTotpSecretCopied.set(true);
      setTimeout(() => this.isTotpSecretCopied.set(false), 2500);
    }).catch(err => {
      console.error('Error al copiar la clave TOTP:', err);
      this.alertMini('error', 'No se pudo copiar la clave.');
    });
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
