import { Injectable, NgZone, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { TokenPayload } from '../../auth/interfaces/auth.interfaces';

/**
 * Servicio de expiración de sesión por inactividad.
 * Replica la lógica de v2consola (IdleService): cuando se cumple la
 * duración de la sesión (definida en el token, Usuario.FirmaDigital.duracion)
 * aparece el mensaje de SweetAlert2 preguntando si desea CONTINUAR la sesión
 * o CERRAR SESIÓN por seguridad, con un contador regresivo de 60 segundos.
 */
@Injectable({ providedIn: 'root' })
export class IdleService {
  /** Segundos sin actividad necesarios para considerar al usuario inactivo. */
  private static readonly DETECCION_INACTIVIDAD_SEGUNDOS = 5;

  private idleTimer: Subscription = undefined as any;
  private eventSubscription: Subscription = undefined as any;
  private lastActivity: number = Date.now();
  private duration: number = 300;
  private checkInterval: number = 500;
  private isModalOpen: boolean = false;

  /** Instante (ms epoch) en que vence la vigencia, o `null` si es fija. */
  private vigenciaFin: number | null = null;

  /** Duración total configurada para la inactividad, en segundos. */
  readonly duracionSegundos = signal(300);

  /** Segundos que faltan para que se dispare el aviso de inactividad. */
  readonly segundosRestantes = signal(300);

  /**
   * `true` cuando el usuario lleva más de 5 s sin actividad. Igual que la
   * consola, el indicador de inactividad sólo se muestra en ese momento.
   */
  readonly idleActivo = signal(false);

  /**
   * Días de vigencia restantes del certificado de firma digital
   * (`Usuario.FirmaDigital.vigencia`, 180 días por defecto). Igual que la
   * consola, la vigencia se expresa en días, no en horas.
   */
  readonly vigenciaDias = signal<number | null>(null);

  /** Estado visual de la vigencia: `normal`, `warning` (≤15 d) o `danger`. */
  readonly vigenciaEstado = signal<'normal' | 'warning' | 'danger'>('normal');

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
  ) {}

  init(): void {
    this.stop();
    this.resetTimer();

    const token = sessionStorage.getItem('token');
    if (!token) return;

    const decoded = this.authService.getUserDecrypt(token);
    const rawDuracion = decoded?.Usuario?.FirmaDigital?.duracion;

    // Igual que la consola: `duracion` viene en MINUTOS cuando es ≤ 60
    // (p. ej. 15 → 900 s); si es mayor, ya viene en segundos.
    if (rawDuracion !== undefined && rawDuracion !== null) {
      const valor = parseInt(String(rawDuracion), 10);
      this.duration =
        !Number.isNaN(valor) && valor > 0 ? (valor <= 60 ? valor * 60 : valor) : 300;
    } else {
      this.duration = 300;
    }

    this.calcularVigencia(decoded);

    // Fijar los valores iniciales que muestra la barra superior.
    this.duracionSegundos.set(this.duration);
    this.segundosRestantes.set(this.duration);

    this.startWatching();
    this.startTimer();
  }

  /**
   * Calcula los días de vigencia del certificado de firma digital, replicando
   * la lógica de la consola: `fechaFin = tiempo + vigencia días`.
   * Respaldo: el claim `exp` del JWT y, si no hay datos, 180 días.
   */
  private calcularVigencia(decoded: TokenPayload | null): void {
    const usuario = decoded?.Usuario;
    const firma = usuario?.FirmaDigital;
    let dias: number | null = null;
    let vencimiento: number | null = null;

    if (firma) {
      const rawTiempo =
        typeof firma.tiempo === 'object' ? firma.tiempo?.$date : firma.tiempo;
      const diasVigencia = Number(firma.vigencia ?? 180);

      if (rawTiempo) {
        const inicio = new Date(rawTiempo);
        if (!Number.isNaN(inicio.getTime()) && !Number.isNaN(diasVigencia)) {
          vencimiento = inicio.getTime() + diasVigencia * 86_400_000;
          dias = Math.ceil((vencimiento - Date.now()) / 86_400_000);
        }
      }

      if (dias === null && !Number.isNaN(diasVigencia) && diasVigencia > 0) {
        dias = diasVigencia;
      }
    }

    // Respaldo: vencimiento estándar del JWT.
    if (dias === null && decoded?.exp) {
      vencimiento = decoded.exp * 1000;
      dias = Math.ceil((vencimiento - Date.now()) / 86_400_000);
    }

    if (dias === null) {
      dias = 180;
    }

    this.vigenciaFin = vencimiento;

    dias = Math.max(0, dias);
    this.vigenciaDias.set(dias);
    this.vigenciaEstado.set(dias <= 0 ? 'danger' : dias <= 15 ? 'warning' : 'normal');
  }

  private startWatching(): void {
    const events = [
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keydown',
      'keypress',
      'wheel',
      'touchstart',
      'touchmove',
    ];

    const eventStreams = events.map((ev) => fromEvent(document, ev));
    const allEvents = merge(...eventStreams);

    this.eventSubscription = allEvents
      .pipe(throttleTime(500))
      .subscribe(() => {
        this.resetTimer();
      });
  }

  private resetTimer(): void {
    this.lastActivity = Date.now();

    // Cualquier actividad oculta el indicador y restablece la cuenta.
    if (this.idleActivo() || this.segundosRestantes() !== this.duration) {
      this.ngZone.run(() => {
        this.idleActivo.set(false);
        this.segundosRestantes.set(this.duration);
      });
    }
  }

  private startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.idleTimer = timer(0, this.checkInterval).subscribe(() => {
        this.checkIdle();
      });
    });
  }

  private checkIdle(): void {
    if (
      this.router.url.includes('/login') ||
      !sessionStorage.getItem('token')
    ) {
      this.stop();
      return;
    }

    const now = Date.now();
    const timeInactive = (now - this.lastActivity) / 1000;

    // Igual que la consola: la inactividad se detecta a los 5 s sin actividad.
    // Mientras tanto el indicador permanece oculto y la cuenta no corre.
    const idle = timeInactive >= IdleService.DETECCION_INACTIVIDAD_SEGUNDOS;
    const restante = idle
      ? Math.max(0, Math.floor(this.duration - timeInactive))
      : this.duration;

    // Refrescar los contadores que se muestran en la barra superior. Sólo se
    // entra en la zona de Angular cuando alguno de los valores cambia.
    let vigenciaCambio = false;
    let dias: number | null = null;
    if (this.vigenciaFin !== null) {
      dias = Math.max(
        0,
        Math.ceil((this.vigenciaFin - now) / 86_400_000),
      );
      vigenciaCambio = this.vigenciaDias() !== dias;
    }

    if (
      this.idleActivo() !== idle ||
      this.segundosRestantes() !== restante ||
      vigenciaCambio
    ) {
      this.ngZone.run(() => {
        if (this.idleActivo() !== idle) {
          this.idleActivo.set(idle);
        }
        if (this.segundosRestantes() !== restante) {
          this.segundosRestantes.set(restante);
        }
        if (vigenciaCambio && dias !== null) {
          this.vigenciaDias.set(dias);
          this.vigenciaEstado.set(
            dias <= 0 ? 'danger' : dias <= 15 ? 'warning' : 'normal',
          );
        }
      });
    }

    if (this.isModalOpen) return;

    if (timeInactive >= this.duration) {
      this.ngZone.run(() => {
        this.handleTimeout();
      });
    }
  }

  private handleTimeout(): void {
    this.isModalOpen = true;

    let timerInterval: any;

    Swal.fire({
      title: '¡Gracias por su visita!',
      html: '¿Desea continuar disfrutando de nuestros servicios o prefiere cerrar sesión por seguridad?<br><br>Cerrando sesión en <b></b> segundos.',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Continuar Sesión',
      denyButtonText: 'Cerrar Sesión',
      confirmButtonColor: '#0c2d48',
      denyButtonColor: '#ea5455',
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 60000,
      timerProgressBar: true,
      didOpen: () => {
        const b = Swal.getHtmlContainer()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (b) {
            b.textContent = Math.round(
              (Swal.getTimerLeft() ?? 0) / 1000,
            ).toString();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      this.isModalOpen = false;

      if (result.isConfirmed) {
        this.resetTimer();
        Swal.fire({
          icon: 'success',
          title: 'Sesión Extendida',
          text: 'Puede continuar trabajando.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else if (
        result.isDenied ||
        result.dismiss === Swal.DismissReason.timer
      ) {
        this.logout();
      }    });
  }

  private logout(): void {
    this.stop();
    this.router.navigate(['/logout']);
  }

  stop(): void {
    if (this.eventSubscription) this.eventSubscription.unsubscribe();
    if (this.idleTimer) this.idleTimer.unsubscribe();
    this.isModalOpen = false;
  }
}
