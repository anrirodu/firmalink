import { Injectable, signal } from '@angular/core';
import { Menu } from '../../auth/interfaces/auth.interfaces';

/**
 * Interfaz para el menú mapeado (misma estructura que consola)
 */
export interface MenuItem {
  id: string;
  title: string;
  type: string; // 'item' | 'collapsible'
  icon: string;
  url?: string;
  children?: MenuItem[];
  // Campos originales
  nombre?: string;
  descripcion?: string;
  icono?: string;
  clase?: string;
  SubMenu?: Menu[];
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly _menuItems = signal<MenuItem[]>([]);

  readonly menuItems = this._menuItems.asReadonly();

  constructor() {
    // Cargar el menú desde sessionStorage al crear el servicio.
    // Así queda listo tanto al iniciar sesión como al recargar la página (F5),
    // sin necesidad de recargarlo en el ngOnInit de cada página.
    this.loadMenu();
  }

  /**
   * Carga y transforma el menú desde sessionStorage
   * Misma lógica que consola: app.component.ts
   */
  loadMenu(): void {
    const menuStr = sessionStorage.getItem('menu');
    if (menuStr) {
      try {
        const rawMenu: Menu[] = JSON.parse(menuStr);
        const mappedMenu = this.mapMenu(rawMenu);
        this._menuItems.set(mappedMenu);
      } catch (e) {
        console.error('[MenuService] Error parseando menú:', e);
        this._menuItems.set([]);
      }
    }
  }

  /**
   * Mapea el menú de la API al formato que espera el sidebar
   * Misma lógica que consola: app.component.ts lines 126-152
   */
  private mapMenu(rawMenu: Menu[]): MenuItem[] {
    return rawMenu.map(item => {
      const mapped: MenuItem = {
        id: item.nombre?.toLowerCase() || '',
        title: item.nombre || item.descripcion || '',
        type: item.clase || 'item',
        icon: item.icono || '',
        nombre: item.nombre,
        descripcion: item.descripcion,
        icono: item.icono,
        clase: item.clase,
        SubMenu: item.SubMenu,
      };

      // Si tiene submenús, mapearlos también
      if (item.SubMenu && item.SubMenu.length > 0) {
        mapped.children = item.SubMenu.map(sub => ({
          id: sub.nombre?.toLowerCase() || '',
          title: sub.descripcion || sub.nombre || '',
          type: sub.clase || 'item',
          icon: sub.icono || '',
          url: this.normalizarRuta(sub.url),
          nombre: sub.nombre,
          descripcion: sub.descripcion,
          icono: sub.icono,
          clase: sub.clase,
        }));

        // Para collapsible, la URL viene de descripcion
        switch (mapped.type) {
          case 'item':
            // Padre-enlace: la ruta SIEMPRE sale de `url` del menú.
            // Nunca de `nombre`/`descripcion` (son etiquetas visibles).
            mapped.url = this.normalizarRuta(item.url);
            break;
          case 'collapsible':
            mapped.url = '';
            break;
        }
      } else {
        // Item simple: la ruta SIEMPRE sale de `url` del menú.
        mapped.url = this.normalizarRuta(item.url);
      }

      return mapped;
    });
  }

  /**
   * Normaliza una ruta del menú: sin barra inicial ni final.
   *
   * Es necesario porque tres puntos la consumen de forma distinta:
   *  - navigateTo() → router.navigate([url])  → espera "dashboard"
   *  - isActive()   → router.url === '/' + url → espera "dashboard"
   *  - authGuard    → state.url.indexOf(url) === 1 → espera "dashboard"
   * Con "/dashboard" el guard y el resaltado del ítem activo fallan.
   */
  private normalizarRuta(url?: string): string {
    if (!url) return '';
    let ruta = String(url).trim();
    while (ruta.startsWith('/')) ruta = ruta.slice(1);
    while (ruta.endsWith('/')) ruta = ruta.slice(0, -1);
    return ruta;
  }

  /**
   * Limpia el menú
   */
  clearMenu(): void {
    this._menuItems.set([]);
    sessionStorage.removeItem('menu');
  }

  /**
   * Obtiene items raíz (item y collapsible)
   */
  getRootItems(): MenuItem[] {
    return this._menuItems();
  }

  /**
   * Obtiene submenús de un elemento
   */
  getSubItems(parent: MenuItem): MenuItem[] {
    return parent.children || [];
  }
}
