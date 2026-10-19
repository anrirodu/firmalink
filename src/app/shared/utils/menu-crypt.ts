/**
 * Sesión y menú: huella del menú y control de acceso por ruta.
 *
 * El backend entrega el menú del perfil al iniciar sesión. Se guarda tal cual
 * como JSON en `sessionStorage['menu']` y su huella en `sessionStorage['crypt']`.
 * En cada navegación, `authGuardGuard` recalcula la huella y la compara: si no
 * coinciden, alguien editó el menú a mano y la sesión se cierra.
 *
 * Las funciones viven aquí —y no copiadas en el guard y en el servicio de
 * autenticación— porque son los dos extremos de la misma verificación: quien
 * guarda la sesión (`AuthService.obtenerPerfil`) y quien la valida
 * (`authGuardGuard`) tienen que usar exactamente el mismo cálculo. Con la
 * lógica duplicada en dos sitios, un cambio en un solo lado deja la validación
 * sin autorizar nada, o autorizando todo.
 *
 * Es un hash de compatibilidad de 32 bits (el mismo de la consola), no una firma
 * criptográfica: sirve para detectar una edición casual del `sessionStorage`,
 * no para resistir a alguien que se proponga recalcularlo. La restricción real
 * de acceso le corresponde al backend.
 */

/** Huella del menú de la sesión: la que se guarda en `sessionStorage['crypt']`. */
export function huellaMenu(menuJson: string): string {
  let hash = 0;
  for (let i = 0; i < menuJson.length; i++) {
    hash = ((hash << 5) - hash) + menuJson.charCodeAt(i);
    hash = hash & hash; // 32 bits, como el hash de Java
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Rutas declaradas en el menú: la de cada entrada y la de sus submenús.
 *
 * Son las únicas pantallas a las que el usuario puede entrar. Las entradas de
 * agrupación (Finanzas, Acuerdos) traen `url: '#'` y no aportan ninguna.
 */
export function rutasDelMenu(menu: unknown): Set<string> {
  const rutas = new Set<string>();

  const recorrer = (items: any[] | undefined): void => {
    for (const item of items ?? []) {
      const ruta = normalizarRuta(item?.url);
      if (ruta && ruta !== '#') rutas.add(ruta);
      recorrer(item?.SubMenu);
    }
  };

  recorrer(Array.isArray(menu) ? menu : []);
  return rutas;
}

/**
 * Ruta comparable: sin query, sin ancla, sin barras de sobra y en minúsculas,
 * para que `/Budgets/` y `budgets?estado=borrador` sean la misma ruta.
 */
export function normalizarRuta(url: string | undefined | null): string {
  return (url ?? '')
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
}

/** Rutas que no dependen del menú: entrar, cambiar la contraseña y el panel. */
export const RUTAS_LIBRES = ['login', 'dashboard', 'change-password'];

/**
 * Qué hacer con una ruta. Es la política del guard, separada de Angular para
 * poder probarla sin montar la aplicación.
 *
 * - `libre`: la pantalla no depende del menú (entrar, cambiar contraseña, panel).
 * - `autorizado`: la ruta está declarada en el menú del usuario.
 * - `restringido`: el menú es válido, pero esa pantalla no es suya.
 * - `alterado`: falta el menú o su huella, o no coinciden → la sesión se cierra.
 */
export type DecisionAcceso = 'libre' | 'autorizado' | 'restringido' | 'alterado';

/**
 * Decide si la sesión puede entrar a una ruta.
 *
 * La comparación es por **ruta exacta** y nunca por prefijo: que el menú traiga
 * `agreements` no autoriza `agreements/list-agreement`. Cada pantalla que el
 * usuario pueda abrir tiene que estar en su menú. Los editores (presupuesto,
 * factura, acuerdo) ya no son rutas —son modales del listado—, así que su
 * acceso no pasa por aquí.
 */
export function decidirAcceso(
  url: string,
  menuJson: string | null,
  crypt: string | null,
): DecisionAcceso {
  if (!menuJson || !crypt || huellaMenu(menuJson) !== crypt) {
    return 'alterado';
  }

  let menu: unknown;
  try {
    menu = JSON.parse(menuJson);
    if (!Array.isArray(menu)) return 'alterado';
  } catch {
    return 'alterado';
  }

  const ruta = normalizarRuta(url);
  if (RUTAS_LIBRES.includes(ruta)) {
    return 'libre';
  }

  return rutasDelMenu(menu).has(ruta) ? 'autorizado' : 'restringido';
}
