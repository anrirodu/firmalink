import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

/**
 * Servicio de expiración de sesión por inactividad.
 * Replica la lógica de v2consola (IdleService): cuando se cumple la
 * duración de la sesión (definida en el token, Usuario.FirmaDigital.duracion)
 * aparece el mensaje de SweetAlert2 preguntando si desea CONTINUAR la sesión
 * o CERRAR SESIÓN por seguridad, con un contador regresivo de 60 segundos.
 */
@Injectable({ providedIn: 'root' })
export class IdleService {
  private idleTimer: Subscription = undefined as any;
  private eventSubscription: Subscription = undefined as any;
  private lastActivity: number = Date.now();
  private duration: number = 300;
  private checkInterval: number = 1000;
  private isModalOpen: boolean = false;

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
    if (decoded?.Usuario?.FirmaDigital?.duracion) {
      this.duration = parseInt(
        String(decoded.Usuario.FirmaDigital.duracion),
        10,
      );
    } else {
      this.duration = 300;
    }

    if (Number.isNaN(this.duration) || this.duration <= 0) {
      this.duration = 300;
    }

    this.startWatching();
    this.startTimer();
  }

  private startWatching(): void {
    const events = ['mousemove', 'click', 'scroll', 'keypress', 'touchstart'];

    const eventStreams = events.map((ev) => fromEvent(document, ev));
    const allEvents = merge(...eventStreams);

    this.eventSubscription = allEvents
      .pipe(throttleTime(1000))
      .subscribe(() => {
        this.resetTimer();
      });
  }

  private resetTimer(): void {
    this.lastActivity = Date.now();
  }

  private startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.idleTimer = timer(0, this.checkInterval).subscribe(() => {
        this.checkIdle();
      });
    });
  }

  private checkIdle(): void {
    if (this.isModalOpen) return;

    if (
      this.router.url.includes('/login') ||
      !sessionStorage.getItem('token')
    ) {
      this.stop();
      return;
    }

    const now = Date.now();
    const timeInactive = (now - this.lastActivity) / 1000;

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
