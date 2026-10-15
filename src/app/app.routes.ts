import { Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';
import { cambiosSinGuardarGuard } from './shared/guards/cambios-sin-guardar.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    // Layout compartido: sidebar + topbar + footer fijos alrededor del router-outlet
    path: '',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./layout/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'hiring',
        loadComponent: () =>
          import('./pages/hiring/hiring.component').then(m => m.HiringComponent),
      },
      {
        path: 'agreements/list-agreement',
        loadComponent: () =>
          import('./pages/agreements/list-agreement/list-agreement.component').then(
            m => m.ListAgreementComponent,
          ),
      },
      {
        path: 'agreements/new-agreement',
        canDeactivate: [cambiosSinGuardarGuard],
        loadComponent: () =>
          import('./pages/agreements/new-agreement/new-agreement.component').then(
            m => m.NewAgreementComponent,
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./pages/cambiar-contrasena/cambiar-contrasena.component').then(m => m.CambiarContrasenaComponent),
      },
    ],
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./pages/miscellaneous/error/error.component').then(m => m.ErrorComponent),
  },
  {
    path: 'not-authorized',
    loadComponent: () =>
      import('./pages/miscellaneous/not-authorized/not-authorized.component').then(m => m.NotAuthorizedComponent),
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./pages/miscellaneous/maintenance/maintenance.component').then(m => m.MaintenanceComponent),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./pages/miscellaneous/logout/logout.component').then(m => m.LogoutComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/miscellaneous/error/error.component').then(m => m.ErrorComponent),
  },
];
