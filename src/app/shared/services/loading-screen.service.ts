import { Inject, Injectable, DOCUMENT, NgZone } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingScreenService {
  private loadingScreenEl: HTMLElement | null = null;
  private animationPlayer!: AnimationPlayer;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _router: Router,
    private _animationBuilder: AnimationBuilder,
    private _ngZone: NgZone,
  ) {
    this.init();
  }

  private init(): void {
    this.loadingScreenEl = this._document.body.querySelector('#loading-bg');

    if (this.loadingScreenEl) {
      // Ocultar en la primera navegación
      this._router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          take(1),
        )
        .subscribe(() => {
          setTimeout(() => this.hide());
        });

      // Fallback: ocultar después de 3 segundos si algo falla
      setTimeout(() => {
        this.removeLoadingScreen();
      }, 3000);
    }
  }

  hide(): void {
    this.removeLoadingScreen();
  }

  private removeLoadingScreen(): void {
    if (!this.loadingScreenEl) return;

    try {
      this.animationPlayer = this._animationBuilder
        .build([
          style({ opacity: '1' }),
          animate('250ms ease', style({ opacity: '0', zIndex: '-10' })),
        ])
        .create(this.loadingScreenEl);

      this.animationPlayer.onDone(() => {
        if (this.loadingScreenEl?.parentNode) {
          this.loadingScreenEl.remove();
          this.loadingScreenEl = null;
        }
      });

      this.animationPlayer.play();
    } catch (e) {
      // Si falla la animación, remover directamente
      if (this.loadingScreenEl?.parentNode) {
        this.loadingScreenEl.remove();
        this.loadingScreenEl = null;
      }
    }
  }
}
