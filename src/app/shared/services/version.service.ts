import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Intervalo (ms) entre comprobaciones de versión publicada. */
const INTERVALO_COMPROBACION = 30_000;

/** Clave de sessionStorage donde se recuerda la versión ya avisada. */
const CLAVE_AVISO = 'firmalink_version_avisada';

/**
 * VersionService — detección de despliegues nuevos.
 *
 * Compara el `buildDate` compilado dentro del bundle (`environment.buildDate`)
 * contra el publicado en `version.json`. Si difieren, hay una versión más
 * reciente desplegada y se expone en la señal `versionDisponible`.
 *
 * `sessionStorage` se usa SOLO para recordar qué versión ya se avisó, y no
 * volver a mostrar la alerta de la misma versión durante la misma sesión.
 * La comparación en sí siempre es bundle (memoria) vs version.json (servidor).
 */
@Injectable({ providedIn: 'root' })
export class VersionService {
  /** `buildDate` con el que se compiló este bundle. */
  readonly versionActual = environment.buildDate || '';

  /** `buildDate` publicado en el servidor, o `null` si aún no se consultó. */
  readonly versionPublicada = signal<string | null>(null);

  /** `true` cuando el servidor tiene una versión distinta a la cargada. */
  readonly versionDisponible = signal(false);

  private temporizador: ReturnType<typeof setInterval> | null = null;

  /** Inicia la comprobación inmediata y periódica de versiones. */
  iniciar(): void {
    // En desarrollo no se comprueba: `buildDate` es 'Development' y no aplica.
    if (!environment.production) return;
    if (this.temporizador !== null) return;

    void this.comprobar();

    this.temporizador = setInterval(() => {
      void this.comprobar();
    }, INTERVALO_COMPROBACION);
  }

  /** Detiene la comprobación periódica. */
  detener(): void {
    if (this.temporizador !== null) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }

  /** ¿Esta versión publicada ya fue avisada en esta sesión? */
  private yaAvisada(publicada: string): boolean {
    try {
      return sessionStorage.getItem(CLAVE_AVISO) === publicada;
    } catch {
      return false;
    }
  }

  /** Marca una versión como ya avisada en esta sesión. */
  private marcarAvisada(publicada: string): void {
    try {
      sessionStorage.setItem(CLAVE_AVISO, publicada);
    } catch {
      /* almacenamiento no disponible: la alerta podría repetirse */
    }
  }

  /** Consulta `version.json` y actualiza el estado de versión. */
  async comprobar(): Promise<void> {
    try {
      // Construir la URL a partir de la base del documento para que funcione
      // tanto en la raíz como servido en una subruta (p. ej. /firmalink/).
      const base = document.baseURI || window.location.href;
      const url = new URL('version.json', base);
      url.searchParams.set('t', String(Date.now()));

      const respuesta = await fetch(url.toString(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      });

      if (!respuesta.ok) {
        console.warn(`[version] version.json respondió HTTP ${respuesta.status}`);
        return;
      }

      const datos = (await respuesta.json()) as { buildDate?: string };
      const publicada = datos.buildDate ?? null;
      this.versionPublicada.set(publicada);

      const hayCambio = !!publicada && !!this.versionActual && publicada !== this.versionActual;

      console.info(
        `[version] actual="${this.versionActual}" publicada="${publicada}" → ${
          hayCambio ? 'ACTUALIZACIÓN DISPONIBLE' : 'sin cambios'
        }`,
      );

      if (hayCambio) {
        // No reavisar la misma versión si el usuario ya decidió no actualizar
        // en esta sesión (con fallback: sin sessionStorage, siempre avisa).
        if (!this.yaAvisada(publicada)) {
          this.versionDisponible.set(true);
        }
      } else {
        // Volvió a coincidir (p. ej. tras actualizar): limpiar el aviso.
        this.versionDisponible.set(false);
      }
    } catch (e) {
      // Fallo de red o JSON inválido: se reintentará en el próximo ciclo.
      console.warn('[version] no se pudo comprobar version.json', e);
    }
  }

  /** Marca la versión publicada como avisada (la alerta ya se mostró). */
  confirmarAviso(): void {
    const publicada = this.versionPublicada();
    if (publicada) this.marcarAvisada(publicada);
  }

  /**
   * Limpia el estado cliente (almacenamiento, cachés y cookies) y recarga la
   * aplicación solicitando recursos frescos al servidor.
   */
  async aplicarActualizacion(): Promise<void> {
    this.detener();

    // 1. Almacenamiento web.
    try {
      localStorage.clear();
    } catch {
      /* no disponible */
    }
    try {
      sessionStorage.clear();
    } catch {
      /* no disponible */
    }

    // 2. CacheStorage (service workers / recursos cacheados).
    try {
      if (typeof caches !== 'undefined') {
        const nombres = await caches.keys();
        await Promise.all(nombres.map((nombre) => caches.delete(nombre)));
      }
    } catch {
      /* no disponible */
    }

    // 3. IndexedDB (best-effort).
    try {
      const idb = indexedDB as unknown as { databases?: () => Promise<{ name?: string }[]> };
      if (typeof idb.databases === 'function') {
        const bases = await idb.databases();
        bases.forEach((base) => {
          if (base.name) indexedDB.deleteDatabase(base.name);
        });
      }
    } catch {
      /* no disponible */
    }

    // 4. Cookies del dominio actual.
    try {
      const cookies = document.cookie ? document.cookie.split(';') : [];
      for (const cookie of cookies) {
        const nombre = cookie.split('=')[0].trim();
        if (!nombre) continue;
        document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    } catch {
      /* no disponible */
    }

    // 5. Recargar forzando bypass de caché. `location.reload(true)` está
    //    obsoleto; se navega con un parámetro cache-buster.
    const url = new URL(window.location.href);
    url.searchParams.set('v', String(Date.now()));
    window.location.replace(url.toString());
  }
}
