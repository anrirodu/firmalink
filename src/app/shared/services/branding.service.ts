import { Injectable } from '@angular/core';
import { CONFIG, ConfiguracionApp, PaletaMarca, SuperficiesMarca } from '../../config';

/**
 * BrandingService — Aplica la configuración de `config.ts` al documento.
 *
 * Hace dos cosas al arrancar (antes del primer render, vía
 * `provideAppInitializer`):
 *
 *  1. Metadatos: título de la pestaña, favicon, `theme-color`, idioma y
 *     descripción.
 *  2. Tema: inyecta un `<style>` con las variables CSS de la paleta y los
 *     degradados de marca. Como se añade al final del `<head>`, gana por
 *     cascada a los valores por defecto de `styles.scss` (misma
 *     especificidad, posterior en el orden), de modo que cambiar la paleta en
 *     `config.ts` repinta toda la aplicación sin tocar el SCSS.
 */
@Injectable({ providedIn: 'root' })
export class BrandingService {
  /** Configuración del producto, para inyectar en componentes si se prefiere. */
  readonly config: ConfiguracionApp = CONFIG;

  /** Año actual, para los pies de página. */
  readonly anioActual = new Date().getFullYear();

  /** Id del `<style>` generado (permite regenerarlo sin duplicarlo). */
  private static readonly ID_ESTILO = 'branding-vars';

  /** Aplica toda la configuración de marca al documento. */
  aplicar(): void {
    this.aplicarMetadatos();
    this.aplicarTema();
  }

  // ─────────────────────────── Metadatos ───────────────────────────

  private aplicarMetadatos(): void {
    const { identidad, recursos } = CONFIG;

    document.title = identidad.nombreLargo;
    document.documentElement.lang = identidad.idioma;

    this.actualizarEnlace('icon', recursos.favicon);
    this.actualizarMeta(
      'theme-color',
      recursos.colorBarra || CONFIG.marca.colores.primario,
    );
    this.actualizarMeta('description', identidad.eslogan, true);
    this.actualizarMeta('apple-mobile-web-app-title', identidad.nombre, true);
  }

  private actualizarEnlace(rel: string, href: string): void {
    let enlace = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!enlace) {
      enlace = document.createElement('link');
      enlace.rel = rel;
      document.head.appendChild(enlace);
    }
    enlace.href = href;
  }

  private actualizarMeta(nombre: string, contenido: string, crear = false): void {
    let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${nombre}"]`);
    if (!meta) {
      if (!crear) return;
      meta = document.createElement('meta');
      meta.name = nombre;
      document.head.appendChild(meta);
    }
    meta.content = contenido;
  }

  // ───────────────────────────── Tema ─────────────────────────────

  private aplicarTema(): void {
    let estilo = document.getElementById(BrandingService.ID_ESTILO) as HTMLStyleElement | null;
    if (!estilo) {
      estilo = document.createElement('style');
      estilo.id = BrandingService.ID_ESTILO;
      document.head.appendChild(estilo);
    }
    estilo.textContent = this.cssTema();
  }

  /** Construye el CSS con las variables del tema claro y oscuro. */
  private cssTema(): string {
    const { colores, oscuro, superficies, tipografia, radio } = CONFIG.marca;

    const claro = this.variables(colores, superficies, tipografia, radio);
    const oscuroCss = this.variables(
      { ...colores, ...oscuro },
      superficies,
      tipografia,
      radio,
      /* soloCambios */ Object.keys(oscuro) as (keyof PaletaMarca)[],
    );

    return `:root {\n${claro}}\n[data-theme="dark"] {\n${oscuroCss}}`;
  }

  /**
   * Genera el bloque de variables.
   *
   * @param colores paleta efectiva
   * @param soloCambios si se indica, sólo se emiten esas claves (tema oscuro)
   */
  private variables(
    colores: PaletaMarca,
    superficies: SuperficiesMarca,
    tipografia: string,
    radio: number,
    soloCambios?: (keyof PaletaMarca)[],
  ): string {
    const lineas: string[] = [];

    const poner = (clave: keyof PaletaMarca, variable: string): void => {
      if (soloCambios && !soloCambios.includes(clave)) return;
      lineas.push(`  ${variable}: ${colores[clave]};`);
    };

    poner('primario', '--primary');
    poner('primarioClaro', '--primary-light');
    poner('primarioOscuro', '--primary-dark');
    poner('acento', '--accent');
    poner('acentoClaro', '--accent-light');
    poner('error', '--warn');

    // Superficies y degradados: no cambian con el tema (ya son oscuros).
    if (!soloCambios) {
      lineas.push(
        `  --brand-profundo: ${superficies.profundo};`,
        `  --brand-medio: ${superficies.medio};`,
        `  --brand-claro: ${superficies.claro};`,
        `  --accent-rgb: ${this.aRgb(colores.acento)};`,
        `  --primary-rgb: ${this.aRgb(colores.primario)};`,
        `  --brand-gradiente-auth: linear-gradient(135deg, ${superficies.profundo} 0%, ${colores.primario} 40%, ${superficies.medio} 70%, ${superficies.claro} 100%);`,
        `  --brand-gradiente-sidebar: linear-gradient(180deg, ${superficies.profundo} 0%, ${colores.primario} 100%);`,
        `  --brand-gradiente-boton: linear-gradient(135deg, ${colores.primario}, ${superficies.medio});`,
        `  --brand-gradiente-titulo: linear-gradient(135deg, #ffffff 0%, ${colores.acentoClaro} 100%);`,
        `  --brand-gradiente-acento: linear-gradient(90deg, ${colores.acento}, ${colores.acentoClaro});`,
        `  --brand-tipografia: ${tipografia};`,
        `  --brand-radio: ${radio}px;`,
      );
    }

    return lineas.join('\n') + '\n';
  }

  /**
   * Convierte un color hex a la terna `R G B`, para poder usarlo con
   * `rgb(var(--token-rgb) / alfa)` en los adornos translúcidos.
   */
  private aRgb(hex: string): string {
    const limpio = hex.replace('#', '').trim();
    const completo =
      limpio.length === 3
        ? limpio
            .split('')
            .map((c) => c + c)
            .join('')
        : limpio;
    const n = parseInt(completo, 16);
    // eslint-disable-next-line no-bitwise
    return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
  }
}

/** Tipos reexportados para comodidad de los consumidores. */
export type { ConfiguracionApp, PaletaMarca, SuperficiesMarca } from '../../config';
