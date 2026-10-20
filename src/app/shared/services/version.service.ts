import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Intervalo (ms) entre comprobaciones de versión publicada. */
const INTERVALO_COMPROBACION = 30_000;

/** Tiempo (ms) que "Más tarde" silencia la alerta antes de volver a insistir. */
const SILENCIO_POSPOSICION = 30 * 60_000; // 30 minutos

/**
 * VersionService — detección de despliegues nuevos.
 *
 * Compara el `buildDate` compilado dentro del bundle (`environment.buildDate`)
 * contra el publicado en `version.json`. Si difieren, hay una versión más
 * reciente desplegada y se expone en la señal `versionDisponible`.
 *
 * "Más tarde" silencia la alerta temporalmente (con caducidad), nunca la
 * entierra: si aparece una versión aún más nueva, se vuelve a avisar.
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

  /**
   * Versión pospuesta con "Más tarde" y el instante (ms) hasta el que se
   * silencia. En memoria: al recargar la página el silencio se reinicia.
   */
  private pospuesta: { version: string; hasta: number } | null = null;

  /** Inicia la comprobación inmediata y periódica de versiones. */
  iniciar(): void {
    // En desarrollo no se comprueba: `buildDate` es 'Development' y no aplica.
    if (!environment.production) return;
    if (this.temporizador !== null) return;

    // Diagnóstico: exponer el servicio para poder forzar comprobaciones desde
    // la consola del navegador (p. ej. `__firmalinkVersion.comprobar()`).
    try {
      (window as unknown as { __firmalinkVersion?: unknown }).__firmalinkVersion = this;
    } catch {
      /* no disponible */
    }

    console.info(`[version] bundle cargado con buildDate="${this.versionActual}"`);

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

  /**
   * Silencia la alerta de la versión publicada actual (botón "Más tarde").
   * No la entierra: tras `SILENCIO_POSPOSICION` vuelve a avisar, y una versión
   * más nueva avisa de inmediato aunque esta esté pospuesta.
   */
  posponer(): void {
    const publicada = this.versionPublicada();
    if (!publicada) return;
    this.pospuesta = { version: publicada, hasta: Date.now() + SILENCIO_POSPOSICION };
    this.versionDisponible.set(false);
  }

  /** ¿La versión publicada está pospuesta y aún dentro del tiempo de silencio? */
  private estaSilenciada(publicada: string): boolean {
    if (!this.pospuesta) return false;
    // Otra versión distinta a la pospuesta → no aplica el silencio.
    if (this.pospuesta.version !== publicada) return false;
    // Silencio vencido → ya no aplica.
    if (Date.now() >= this.pospuesta.hasta) {
      this.pospuesta = null;
      return false;
    }
    return true;
  }

  /** Último error de comprobación, útil para diagnóstico en producción. */
  readonly ultimoError = signal<string | null>(null);

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
        const msg =
          respuesta.status === 404
            ? `version.json NO encontrado (404) en ${url.pathname} — ¿se desplegó public/version.json?`
            : `version.json respondió HTTP ${respuesta.status} en ${url.pathname}`;
        this.ultimoError.set(msg);
        console.warn(`[version] ${msg}`);
        return;
      }

      const datos = (await respuesta.json()) as { buildDate?: string };
      const publicada = datos.buildDate ?? null;
      this.versionPublicada.set(publicada);
      this.ultimoError.set(null);

      const hayCambio = !!publicada && !!this.versionActual && publicada !== this.versionActual;

      console.info(
        `[version] actual="${this.versionActual}" publicada="${publicada}" → ${
          hayCambio ? 'ACTUALIZACIÓN DISPONIBLE' : 'sin cambios'
        }`,
      );

      if (hayCambio) {
        // Si el usuario pospuso ESTA misma versión y aún no venció el silencio,
        // no se vuelve a avisar. Una versión distinta (más nueva) sí avisa.
        if (this.estaSilenciada(publicada)) {
          return;
        }
        this.versionDisponible.set(true);
      } else {
        // Volvió a coincidir (p. ej. tras actualizar): limpiar el aviso y el
        // silencio, porque ya no hay nada pendiente.
        this.versionDisponible.set(false);
        this.pospuesta = null;
      }
    } catch (e) {
      // Fallo de red o JSON inválido: se reintentará en el próximo ciclo.
      const msg = `no se pudo comprobar version.json: ${String(e)}`;
      this.ultimoError.set(msg);
      console.warn(`[version] ${msg}`);
    }
  }

  /**
   * Limpia TODO el estado que el navegador permite borrar desde JavaScript
   * (almacenamiento, cookies, CacheStorage, IndexedDB y service workers) y
   * recarga solicitando el index.html sin caché.
   *
   * Nota: una web NO puede vaciar la caché HTTP completa del navegador por
   * seguridad. Eso se resuelve porque Angular genera nombres de archivo con
   * hash por build; al recargar el index.html sin caché, todo lo demás se
   * descarga nuevo automáticamente.
   *
   * Diseñado para NO poder colgarse: cada paso tiene su try/catch y las
   * operaciones bloqueantes corren con un tiempo límite.
   */
  async aplicarActualizacion(): Promise<void> {
    this.detener();

    // 1. Almacenamiento web (síncrono y fiable).
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

    // 2. Cookies del dominio actual (síncrono y fiable).
    try {
      const cookies = document.cookie ? document.cookie.split(';') : [];
      for (const cookie of cookies) {
        const nombre = cookie.split('=')[0].trim();
        if (!nombre) continue;
        document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${location.hostname}`;
      }
    } catch {
      /* no disponible */
    }

    // 3. Service workers: desregistrar TODOS y borrar todas las cachés. Esto
    //    es lo que libera la caché de una PWA (si la hubiera).
    await this.conLimite(
      (async () => {
        if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
          const registros = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registros.map((r) => r.unregister()));
        }
      })(),
      1000,
    );
    await this.conLimite(
      (async () => {
        if (typeof caches !== 'undefined') {
          const nombres = await caches.keys();
          await Promise.all(nombres.map((nombre) => caches.delete(nombre)));
        }
      })(),
      1000,
    );

    // 4. IndexedDB: borrado best-effort, también con tiempo límite. NO se
    //    espera a que el borrado termine (deleteDatabase puede quedar
    //    bloqueado si hay conexiones abiertas); solo se dispara.
    await this.conLimite(this.limpiarIndexedDB(), 1000);

    // 5. Recarga SIEMPRE, forzando que el index.html NO salga de caché.
    this.recargarSinCache();
  }

  /**
   * Recarga la aplicación evitando la caché del navegador.
   *
   * Técnica: navegar a una URL con parámetros únicos. El navegador no tiene
   * cacheada esa URL exacta, por lo que pide el index.html al servidor de
   * nuevo (efecto equivalente, en la mayoría de casos, a un hard refresh).
   *
   * Nota: forzar un Ctrl+Shift+R real es imposible desde JavaScript (lo
   * controla el navegador por seguridad); esta es la máxima aproximación
   * posible desde el cliente sin tocar el servidor.
   */
  private recargarSinCache(): void {
    const forzar = () => {
      try {
        const url = new URL(window.location.href);
        // Parámetros únicos: fuerzan a pedir el index.html fresco.
        url.searchParams.set('_v', String(Date.now()));
        url.searchParams.set('_r', String(Math.random()).slice(2));
        // `href` navega igual que replace pero añade la URL al historial;
        // para el refresco tras actualizar es irrelevante y es más fiable.
        window.location.href = url.toString();
      } catch {
        window.location.reload();
      }
    };

    // Recarga dura inmediata como respaldo, y navegación con URL única.
    try {
      window.location.reload();
    } catch {
      /* ignorar */
    }
    forzar();
  }

  /** Ejecuta una promesa con un tiempo máximo; si expira, continúa igual. */
  private conLimite(promesa: Promise<unknown>, ms: number): Promise<void> {
    return Promise.race([
      promesa.catch(() => undefined),
      new Promise<void>((resolver) => setTimeout(resolver, ms)),
    ]).then(() => undefined);
  }

  /** Dispara el borrado de bases IndexedDB sin esperar a que se completen. */
  private limpiarIndexedDB(): Promise<void> {
    try {
      const idb = indexedDB as unknown as { databases?: () => Promise<{ name?: string }[]> };
      if (typeof idb.databases !== 'function') return Promise.resolve();
      return idb
        .databases()
        .then((bases) => {
          bases.forEach((base) => {
            if (base.name) {
              try {
                indexedDB.deleteDatabase(base.name);
              } catch {
                /* best-effort */
              }
            }
          });
        })
        .catch(() => undefined);
    } catch {
      return Promise.resolve();
    }
  }
}
