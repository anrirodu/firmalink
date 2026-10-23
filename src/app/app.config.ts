import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { zoneInterceptor } from './shared/interceptors/zone.interceptor';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { BrandingService } from './shared/services/branding.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Antes del primer render: título, favicon y variables de la paleta.
    provideAppInitializer(() => inject(BrandingService).aplicar()),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withInterceptors([tokenInterceptor, zoneInterceptor, authInterceptor])),
    provideAnimationsAsync(),
  ]
};
