import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { CaptchaService, ICaptchaSolution } from '../../services/captcha.service';

/** Estados visuales del validador de seguridad. */
export type EstadoValidador = 'idle' | 'cargando' | 'exito' | 'error';

/**
 * ValidadorSeguridadComponent — "Validador de Seguridad Nativo" (Sandra Server Core).
 *
 * Control de verificación humana basado en Proof-of-Work: Sandra Server emite un
 * reto (salt + challenge) y el navegador busca el número que resuelve el hash.
 *
 * Dos modos de uso:
 *
 *  - `resolver`  → sólo resuelve el reto. La solución viaja al endpoint de
 *    acceso (`wusuario/loginWeb`), que la valida y consume como parte del
 *    inicio de sesión.
 *  - `verificar` → además valida la solución en el servidor
 *    (`POST /v1/api/captcha/verify`) antes de dejar que la pantalla continúe.
 *    Es el modo de los flujos pre-autenticación (recuperación de contraseña),
 *    donde la petición que sigue no lleva la prueba de la solución.
 *
 * El reto se pide y se resuelve en segundo plano al montar la pantalla: si el
 * usuario llega antes, basta con pulsarlo para resolver uno nuevo.
 */
@Component({
  selector: 'app-validador-seguridad',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './validador-seguridad.component.html',
  styleUrl: './validador-seguridad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidadorSeguridadComponent implements OnInit {
  private readonly captcha = inject(CaptchaService);

  /**
   * `resolver` deja la solución lista para enviarla al login web;
   * `verificar` la valida además en el servidor.
   */
  @Input() modo: 'resolver' | 'verificar' = 'verificar';

  /** Texto de la marca que se muestra bajo el mensaje principal. */
  @Input() marca = 'Sandra Server Core • Búnker Technologies Solutions';

  /** Estado visual del control. */
  readonly estado = signal<EstadoValidador>('idle');

  /** Solución vigente del reto; `null` si no se resolvió o si ya se consumió. */
  readonly solucion = signal<ICaptchaSolution | null>(null);

  /** `true` cuando el servidor validó la solución (sólo en modo `verificar`). */
  readonly verificado = signal(false);

  /** Notifica el cambio de estado para que la pantalla reaccione. */
  @Output() readonly cambioEstado = new EventEmitter<EstadoValidador>();

  /** Resolución en curso: las llamadas concurrentes comparten la misma promesa. */
  private enCurso: Promise<ICaptchaSolution | null> | null = null;

  ngOnInit(): void {
    // Verificación sin fricción: el reto se pide y se resuelve en segundo plano
    // mientras el usuario completa el formulario.
    void this.pulsar();
  }

  /**
   * El usuario pulsó el control. Resuelve un reto nuevo (y lo valida en el
   * servidor cuando el modo es `verificar`).
   */
  pulsar(): void {
    void this.ejecutar(this.modo);
  }

  /**
   * Devuelve una solución lista para usar.
   *
   * En modo `verificar` garantiza que el servidor validó la solución; en modo
   * `resolver` sólo que existe una solución vigente (el endpoint de acceso la
   * validará). Devuelve `null` si no se pudo resolver o validar.
   */
  async asegurar(): Promise<ICaptchaSolution | null> {
    if (this.modo === 'verificar') {
      if (this.verificado() && this.solucion()) {
        return this.solucion();
      }
      return this.ejecutar('verificar');
    }

    if (this.solucion()) {
      return this.solucion();
    }
    return this.ejecutar('resolver');
  }

  /**
   * Descarta la solución vigente (el servidor ya la consumió) y prepara un
   * reto nuevo para el siguiente intento.
   */
  invalidar(): void {
    void this.renovar();
  }

  /**
   * Igual que `invalidar()`, pero devuelve la promesa: el flujo que llama al
   * endpoint protegido espera a tener el reto nuevo resuelto y validado.
   *
   * Se usa cuando cada intento debe consumir un reto distinto (por ejemplo,
   * la verificación de dos pasos: sin esto, un código TOTP incorrecto podría
   * reusar la solución ya consumida).
   */
  async renovar(): Promise<ICaptchaSolution | null> {
    this.solucion.set(null);
    this.verificado.set(false);

    return this.ejecutar(this.modo);
  }

  // ─────────────────────────── Internos ───────────────────────────

  /**
   * Ejecuta el ciclo completo (pedir reto, resolverlo y, si aplica,
   * validarlo en el servidor) de forma **serializada**: las llamadas
   * concurrentes comparten la misma promesa.
   *
   * La serialización es obligatoria: el servidor consume la solución al
   * validarla, así que verificar dos veces el mismo reto dejaría la segunda
   * en error.
   */
  private ejecutar(modo: 'resolver' | 'verificar'): Promise<ICaptchaSolution | null> {
    if (this.enCurso) {
      return this.enCurso;
    }

    this.enCurso = this.ejecutarInterno(modo).finally(() => {
      this.enCurso = null;
    });

    return this.enCurso;
  }

  private async ejecutarInterno(
    modo: 'resolver' | 'verificar',
  ): Promise<ICaptchaSolution | null> {
    this.actualizarEstado('cargando');

    let sol: ICaptchaSolution | null = null;

    try {
      sol = await this.captcha.obtenerYResolver();
    } catch (e) {
      console.warn('[ValidadorSeguridad] No se pudo resolver el reto:', e);
      sol = null;
    }

    if (!sol) {
      this.solucion.set(null);
      this.verificado.set(false);
      this.actualizarEstado('error');
      return null;
    }

    this.solucion.set(sol);

    if (modo === 'verificar') {
      // El estado sigue en `cargando` hasta que el servidor responda.
      const ok = await firstValueFrom(this.captcha.verificar(sol));

      if (!ok) {
        this.solucion.set(null);
        this.verificado.set(false);
        this.actualizarEstado('error');
        return null;
      }

      this.verificado.set(true);
    }

    this.actualizarEstado('exito');
    return sol;
  }

  private actualizarEstado(estado: EstadoValidador): void {
    this.estado.set(estado);
    this.cambioEstado.emit(estado);
  }
}
