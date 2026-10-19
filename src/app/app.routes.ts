import { Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';
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
    // activa. Con sólo `canActivate`, pasar de /budgets a /billing no revisaría
    // el menú.
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
        // Calculadora de facturación. Herramienta interna: proyecta el neto de
        // una factura cobrada por depósito y guarda el cálculo en
        // `firmalink_calculos`. Aterriza en el listado, que monta el editor
        // como modal (igual que facturas y presupuestos).
        path: 'calculator',
        loadComponent: () =>
          import('./pages/calculator/list-calculator/list-calculator.component').then(
            m => m.ListCalculatorComponent,
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
