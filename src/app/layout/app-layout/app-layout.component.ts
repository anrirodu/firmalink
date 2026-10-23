import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../auth/services/auth.service';
import { MenuService, MenuItem } from '../../shared/services/menu.service';
import { ThemeService } from '../../shared/services/theme.service';
import { IdleService } from '../../shared/services/idle.service';
import { CONFIG } from '../../config';

/**
 * Layout compartido después de iniciar sesión.
 * El sidebar + topbar + footer viven UNA sola vez aquí, fijos,
 * envueltos alrededor del <router-outlet>. Así el menú nunca se
 * oculta ni se re-monta al navegar entre páginas.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  /** Configuración del producto (marca, enlaces y textos). */
  protected readonly cfg = CONFIG;

  /**
   * Ancho máximo (px) en el que el sidebar pasa a comportarse como panel
   * deslizante. Cubre tablet y móvil: en esos tamaños el menú nace cerrado,
   * se abre con el botón de la barra superior y se cierra al elegir un ítem.
   */
  private readonly ANCHO_COMPACTO = 1024;

  sidenavOpen = signal(true);
  /** true en móvil y tablet (el sidebar se muestra como panel deslizante) */
  isCompact = signal(false);
  currentYear = new Date().getFullYear();

  /**
   * Enlaces del pie sin destino todavía: se anula la navegación para que el
   * clic no recargue ni salte a `#`. Cuando config traiga la URL real, el
   * navegador la abre normalmente.
   */
  sinDestino(evento: Event): void {
    if (!(evento.currentTarget as HTMLAnchorElement)?.getAttribute('href')) {
      evento.preventDefault();
    }
  }

  // Submenús expandidos del menu dinámico
  expandedMenus = signal<Set<string>>(new Set());

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    public menuService: MenuService,
    private idleService: IdleService,
    private router: Router,
  ) {
    this.checkScreen();
  }

  ngOnInit(): void {
    // Inicializar control de expiración de sesión por inactividad
    this.idleService.init();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreen();
  }

  private checkScreen(): void {
    // Móvil y tablet comparten comportamiento: menú cerrado por defecto
    const compacto = window.innerWidth <= this.ANCHO_COMPACTO;
    this.isCompact.set(compacto);

    if (compacto) {
      this.sidenavOpen.set(false);
    }
  }

  toggleSidenav(): void {
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  closeSidenav(): void {
    this.sidenavOpen.set(false);
  }

  toggleSubmenu(menu: MenuItem): void {
    const expanded = new Set(this.expandedMenus());
    if (expanded.has(menu.id)) {
      expanded.delete(menu.id);
    } else {
      expanded.add(menu.id);
    }
    this.expandedMenus.set(expanded);
  }

  isExpanded(menu: MenuItem): boolean {
    return this.expandedMenus().has(menu.id);
  }

  navigateTo(url: string): void {
    if (!url) {
      return;
    }

    this.router.navigate([url]);

    // En móvil y tablet el menú se cierra al elegir un ítem; en escritorio
    // queda fijo (abierto o colapsado según el usuario).
    if (this.isCompact()) {
      this.closeSidenav();
    }
  }

  isActive(url: string): boolean {
    // El ítem "Dashboard" (url vacía) debe marcarse activo en la ruta /dashboard
    if (!url || url === 'dashboard') {
      return this.router.url === '/dashboard' || this.router.url === '/';
    }
    return this.router.url === '/' + url;
  }

  logout(): void {
    this.authService.logout();
  }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  /** Menú superior usuario → cambio de contraseña */
  goChangePassword(): void {
    this.router.navigate(['/change-password']);
  }

}
