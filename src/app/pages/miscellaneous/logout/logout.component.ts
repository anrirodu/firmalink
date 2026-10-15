import { Component, OnInit, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

interface LogoutStep {
  key: string;
  label: string;
  status: 'pending' | 'in-progress' | 'done' | 'error';
}

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  private _steps = signal<LogoutStep[]>([
    { key: 'SERVER_LOGOUT', label: 'Finalizando sesión en el servidor', status: 'pending' },
    { key: 'CLEAR_SESSION', label: 'Limpiando datos de la sesión local', status: 'pending' },
    { key: 'REDIRECT', label: 'Redirigiendo al login', status: 'pending' }
  ]);
  get steps() { return this._steps(); }

  private _finalMessage = signal('');
  get finalMessage() { return this._finalMessage(); }

  private messageToStepKey: { [message: string]: string } = {
    'Finalizando sesión en el servidor...': 'SERVER_LOGOUT',
    'No se pudo contactar al servidor, limpiando localmente...': 'SERVER_LOGOUT',
    'Limpiando datos de la sesión...': 'CLEAR_SESSION',
    '¡Hasta pronto!': 'REDIRECT'
  };

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.executeLogout();
  }

  async executeLogout(): Promise<void> {
    await this.authService.performLogoutProcess((message: string) => {
      this.ngZone.run(() => {
        this.updateStepStatus(message);
      });
    });
  }

  private updateStepStatus(message: string): void {
    const stepKey = this.messageToStepKey[message];
    if (!stepKey) return;

    this._steps.update(currentSteps => {
      const currentStepIndex = currentSteps.findIndex(s => s.key === stepKey);
      if (currentStepIndex === -1) return currentSteps;

      const newSteps = currentSteps.map((step, i) => {
        if (i < currentStepIndex && step.status !== 'error') {
          return { ...step, status: 'done' as const };
        }
        if (i === currentStepIndex) {
          if (message.includes('No se pudo')) {
            return { ...step, status: 'error' as const };
          } else if (message === '¡Hasta pronto!') {
            this._finalMessage.set('¡Sesión cerrada con éxito!');
            return { ...step, status: 'done' as const };
          } else {
            return { ...step, status: 'in-progress' as const };
          }
        }
        return step;
      });
      return newSteps;
    });
  }
}
