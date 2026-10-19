import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Privilegio } from '../../auth/interfaces/auth.interfaces';
import { huellaMenu, normalizarRuta } from '../utils/menu-crypt';

/**
 * PrivilegiosService — los permisos finos de la pantalla que se está viendo.
 *
 * El menú de la sesión no sólo declara **qué pantallas** puede abrir el usuario
 * (eso lo controla `authGuardGuard`), sino también **qué puede hacer dentro** de
 * cada una: viene con un arreglo `Privilegios` por entrada. Cada privilegio trae
 * un `metodo` —`Create`, `Read`, `Update`, `Delete`— y es lo que habilita el
 * botón correspondiente:
 *
 *   Create → habilitar "Nuevo"       (crear)
 *   Read   → ver el listado, paginar y buscar
 *   Update → habilitar "Editar"      (modificar)
 *   Delete → habilitar "Eliminar"
 *
 * El menú se lee de `sessionStorage['menu']`, el mismo JSON que el guard valida
 * contra su huella `crypt`. Aquí se vuelve a comprobar esa huella con
 * `huellaMenu` (la misma función, no una copia): si el menú no está firmado, no
 * se concede ningún privilegio. Es el criterio de intranet/EJB, adaptado a esta
 * aplicación.
 *
 * Uso en una pantalla:
 *
 *   privilegios = inject(PrivilegiosService);
 *   // en la plantilla:  *ngIf="privilegios.tiene('Create')"
 *
 * o, con la misma forma de intranet:
 *
 *   cargarPrivilegios() { this.metodos = this.privilegios.metodos(); }
 *   Privilegio(metodo: string): boolean { return this.privilegios.tiene(metodo); }
 */
@Injectable({ providedIn: 'root' })
export class PrivilegiosService {
  private readonly location = inject(Location);

  /** Privilegios de la pantalla actual (menú del usuario para esta URL). */
  privilegios(): Privilegio[] {
    return this.privilegiosDe(this.location.path());
  }

  /** Métodos disponibles en la pantalla actual, p. ej. `['Create','Read',...]`. */
  metodos(): string[] {
    return this.privilegios().map(p => p.metodo);
  }

  /** ¿La pantalla actual trae este privilegio? */
  tiene(metodo: string): boolean {
    return this.tieneEn(this.location.path(), metodo);
  }

  /** Privilegios de una URL concreta (no la actual). */
  privilegiosDe(url: string): Privilegio[] {
    const menu = this.menuFirmado();
    if (!menu) return [];
    return this.buscarPrivilegios(menu, normalizarRuta(url));
  }

  /** ¿La URL dada trae este privilegio? */
  tieneEn(url: string, metodo: string): boolean {
    return this.privilegiosDe(url).some(p => p.metodo === metodo);
  }

  /**
   * El menú de la sesión, sólo si su huella coincide con `crypt`. Se reutiliza
   * `huellaMenu` para no tener dos algoritmos de integridad distintos: si el
   * menú fue editado a mano, no se concede ningún privilegio.
   */
  private menuFirmado(): any[] | null {
    const menuJson = sessionStorage.getItem('menu');
    const crypt = sessionStorage.getItem('crypt');
    if (!menuJson || !crypt || huellaMenu(menuJson) !== crypt) return null;

    try {
      const menu = JSON.parse(menuJson);
      return Array.isArray(menu) ? menu : null;
    } catch {
      return null;
    }
  }

  /**
   * Busca, recorriendo el menú (raíz + `SubMenu`), la entrada cuya URL coincide
   * con la pedida y devuelve sus `Privilegios`. Acepta la clave `Privilegio`
   * (singular) por compatibilidad con perfiles que la usan.
   */
  private buscarPrivilegios(menu: any[], targetUrl: string): Privilegio[] {
    const buscar = (items: any[]): Privilegio[] => {
      for (const item of items ?? []) {
        if (normalizarRuta(item?.url) === targetUrl) {
          const propios = item?.Privilegios ?? item?.Privilegio;
          if (Array.isArray(propios) && propios.length) return propios;
          // La entrada coincide pero no declara privilegios: se heredan los del
          // único hijo con privilegios (p. ej. un colapsable que agrupa una sola
          // pantalla), igual que en intranet.
          const delHijo = (item?.SubMenu ?? []).find(
            (s: any) => (s?.Privilegios ?? s?.Privilegio)?.length,
          );
          return delHijo?.Privilegios ?? delHijo?.Privilegio ?? [];
        }

        const enSub = buscar(item?.SubMenu ?? []);
        if (enSub.length) return enSub;
      }
      return [];
    };

    return buscar(menu);
  }
}
