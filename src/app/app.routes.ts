import { Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';
import { cambiosSinGuardarGuard } from './shared/guards/cambios-sin-guardar.guard';
import { salirDeClientesGuard } from './pages/customers/salir-de-clientes.guard';

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
    // Layout compartido: sidebar + topbar + footer fijos alrededor del router-outlet.
    //
    // `canActivate` sólo se ejecuta cuando la ruta del layout se activa (primera
    // entrada o recarga completa). Para que el control de acceso se evalúe en
    // **cada** navegación entre pantallas —el sidebar usa router.navigate, no
    // recarga— hace falta `canActivateChild`, que corre en cada hijo que se
    // activa. Con sólo `canActivate`, entrar de /budgets a /budgets/new pasaría
    // sin revisar el menú.
    path: '',
    canActivate: [authGuardGuard],
    canActivateChild: [authGuardGuard],
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
        // Clientes. `salirDeClientesGuard` pide confirmación si hay una ficha
        // con cambios sin guardar (el menú del JWT ya incluye esta entrada).
        path: 'customers',
        canDeactivate: [salirDeClientesGuard],
        loadComponent: () =>
          import('./pages/customers/customers.component').then(m => m.CustomersComponent),
      },
      {
        // Facturación digital. El menú del JWT ya trae la entrada "Facturacion"
        // (Finanzas → billing) y aterriza en el listado de facturas generadas.
        path: 'billing',
        loadComponent: () =>
          import('./pages/billing/list-billing/list-billing.component').then(
            m => m.ListBillingComponent,
          ),
      },
      {
        // Editor de facturas (nueva o en consulta). `cambiosSinGuardarGuard`
        // evita perder una factura a medio escribir.
        path: 'billing/new',
        canDeactivate: [cambiosSinGuardarGuard],
        loadComponent: () =>
          import('./pages/billing/new/billing.component').then(m => m.BillingComponent),
      },
      {
        // Presupuestos. Documento comercial (no fiscal) que se cotiza antes de
        // facturar: aterriza en el listado y ofrece el ciclo completo
        // borrador → enviado → aprobado/rechazado → anulado.
        path: 'budgets',
        loadComponent: () =>
          import('./pages/budgets/list-budgets/list-budgets.component').then(
            m => m.ListBudgetsComponent,
          ),
      },
      {
        // Editor de presupuestos (nuevo o en consulta). `cambiosSinGuardarGuard`
        // evita perder un presupuesto a medio escribir.
        path: 'budgets/new',
        canDeactivate: [cambiosSinGuardarGuard],
        loadComponent: () =>
          import('./pages/budgets/new/budget.component').then(m => m.BudgetsComponent),
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
