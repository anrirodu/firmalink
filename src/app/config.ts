/**
 * ============================================================================
 *  CONFIG.TS — Configuración de la aplicación (única fuente de verdad)
 * ============================================================================
 *
 *  Esta plantilla Angular es reutilizable para varios productos. Todo lo que
 *  cambia de un proyecto a otro (nombre, eslogan, logo, colores, enlaces,
 *  textos de acceso y del correo) vive AQUÍ. Para montar un producto nuevo:
 *
 *    1. Copia el proyecto y ajusta los valores de este archivo.
 *    2. Reemplaza `src/assets/images/logo.png` y `favicon.ico`.
 *    3. Verifica `src/environments/environment*.ts` (endpoints del servidor).
 *
 *  No hace falta tocar componentes: `BrandingService` aplica el título, el
 *  favicon, el `theme-color` y genera las variables CSS (`--primary`,
 *  `--accent`, `--brand-gradiente-auth`, …) al arrancar, y los componentes
 *  leen `CONFIG` directamente.
 *
 *  Nota sobre los colores: los degradados de las superficies de marca
 *  (login, barra lateral, botones) se derivan de `marca.colores` y
 *  `marca.superficies`, así que basta con cambiar la paleta.
 */

/** Clave de un token de color de la paleta. */
export type TokenColor =
  | 'primario'
  | 'primarioClaro'
  | 'primarioOscuro'
  | 'acento'
  | 'acentoClaro'
  | 'error';

export interface PaletaMarca {
  /** Color institucional principal (sidebar, botones, encabezados). */
  primario: string;
  /** Variante clara del primario (enlaces, estados hover, tema oscuro). */
  primarioClaro: string;
  /** Variante oscura del primario (bordes, sombras, degradados). */
  primarioOscuro: string;
  /** Color de acento (llamadas a la acción, checks, indicadores). */
  acento: string;
  /** Variante clara del acento (textos sobre fondo oscuro, brillos). */
  acentoClaro: string;
  /** Color de error / advertencia. */
  error: string;
}

/** Colores de las superficies de marca (fondos con degradado). */
export interface SuperficiesMarca {
  /** Tono más profundo: extremo inicial del degradado de acceso y sidebar. */
  profundo: string;
  /** Tono intermedio: centro del degradado de acceso y del botón principal. */
  medio: string;
  /** Tono más claro: extremo final del degradado de acceso. */
  claro: string;
}

export interface Identidad {
  /** Nombre comercial. Se usa en títulos, sidebar, correos y mensajes. */
  nombre: string;
  /** Nombre para la pestaña del navegador y metadatos. */
  nombreLargo: string;
  /** Descripción corta / eslogan. */
  eslogan: string;
  /** Razón social que firma el pie de página y los correos. */
  empresa: string;
  /** Año de fundación (informativo). */
  anioInicio: number;
  /** Versión visible de la aplicación (si se deja vacía, se usa la del build). */
  version: string;
  /** Código de idioma para `<html lang>`. */
  idioma: string;
}

export interface Enlaces {
  soporte: string;
  terminos: string;
  privacidad: string;
  sitioWeb: string;
}

export interface Beneficio {
  /** Nombre del icono Material Icons. */
  icono: string;
  titulo: string;
  detalle: string;
}

export interface ConfiguracionAuth {
  /** Etiqueta accesible del isotipo (aria-label). */
  etiquetaIsotipo: string;
  /** Beneficios que se listan en el panel izquierdo del acceso. */
  beneficios: Beneficio[];
  /** Puntos informativos del panel de "¿Olvidó su contraseña?". */
  recuperacion: Beneficio[];
  /** Puntos informativos del panel de restablecimiento (token). */
  restablecer: Beneficio[];
  /** Texto del pie del panel de marca (sin el año, que se añade solo). */
  pieMarca: string;
  /** Mensaje del overlay tras autenticarse. */
  mensajeBienvenida: string;
}

export interface ConfiguracionCorreo {
  /** Nombre visible del remitente en los correos de seguridad. */
  remitente: string;
  /** Rótulo del pie de los correos (sin el año, que se añade solo). */
  pieTitulo: string;
  /** Nota del pie de los correos. */
  pieNota: string;
  /** Texto alternativo del logo incrustado. */
  logoAlt: string;
}

export interface ConfiguracionApp {
  identidad: Identidad;
  marca: {
    /** Paleta del tema claro. */
    colores: PaletaMarca;
    /**
     * Ajustes del tema oscuro. Sólo se declaran los tonos que cambian; el
     * resto se hereda del tema claro.
     */
    oscuro: Partial<PaletaMarca>;
    /** Tonos de los fondos con degradado. */
    superficies: SuperficiesMarca;
    /** Familia tipográfica (debe estar cargada en index.html). */
    tipografia: string;
    /** Radio base de los componentes, en píxeles. */
    radio: number;
  };
  recursos: {
    /** Logo horizontal (sidebar y cabeceras). */
    logo: string;
    /** Favicon de la pestaña. */
    favicon: string;
    /** Meta `theme-color` (barra del navegador en móvil). Vacío = primario. */
    colorBarra: string;
  };
  enlaces: Enlaces;
  auth: ConfiguracionAuth;
  correo: ConfiguracionCorreo;
}

/**
 * Valores del producto actual. Cambia sólo este objeto para rebautizar la
 * aplicación completa.
 */
export const CONFIG: ConfiguracionApp = {
  identidad: {
    nombre: 'FirmaLink',
    nombreLargo: 'FirmaLink — Sistema de Gestión',
    eslogan: 'La forma inteligente de acordar y firmar.',
    empresa: 'BUNKER TECHNOLOGIES SOLUTIONS C.A',
    anioInicio: 2024,
    version: '',
    idioma: 'es',
  },

  marca: {
    colores: {
      primario: '#0c2d48',
      primarioClaro: '#2a6fb0',
      primarioOscuro: '#061829',
      acento: '#00c9a7',
      acentoClaro: '#4ee1c8',
      error: '#f44336',
    },
    oscuro: {
      primario: '#1e5f9e',
      primarioClaro: '#2fd4bb',
      primarioOscuro: '#0a3358',
      acentoClaro: '#5ff0d4',
      error: '#ff5252',
    },
    superficies: {
      profundo: '#0d1b3e',
      medio: '#12406b',
      claro: '#1a5490',
    },
    tipografia: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    radio: 12,
  },

  recursos: {
    logo: 'assets/images/logo.png',
    favicon: 'assets/images/logo.png',
    /** Si se deja vacío, se usa el color primario de la paleta. */
    colorBarra: '',
  },

  // Enlaces del pie. Dejar en `''` mientras no existan los destinos: un
  // `javascript:void(0)` como href es saneado por Angular (warning en consola)
  // y un href vacío se renderiza como enlace inerte sin disparar navegación.
  enlaces: {
    soporte: '',
    terminos: '',
    privacidad: '',
    sitioWeb: 'https://bunker.com.ve',
  },

  auth: {
    etiquetaIsotipo: 'FirmaLink — La forma inteligente de acordar y firmar',
    beneficios: [
      {
        icono: 'hub',
        titulo: 'Conexión Inteligente',
        detalle: 'Enlaza personas, acuerdos y firmas en una sola plataforma',
      },
      {
        icono: 'bolt',
        titulo: 'Firma Ágil',
        detalle: 'Acuerdos firmados en tiempo real, sin fricción ni papeleo',
      },
      {
        icono: 'verified_user',
        titulo: 'Confianza y Seguridad',
        detalle: 'Autenticación robusta y protección de datos de extremo a extremo',
      },
      {
        icono: 'task_alt',
        titulo: 'Trazabilidad Total',
        detalle: 'Seguimiento, métricas y reportes de cada acuerdo y firma',
      },
    ],
    pieMarca: 'BUNKER TECHNOLOGIES SOLUTIONS C.A',
    mensajeBienvenida: 'Bienvenido a FirmaLink',
    recuperacion: [
      {
        icono: 'schedule',
        titulo: 'Enlace temporal',
        detalle: 'El enlace vence en 15 minutos y solo puede usarse una vez.',
      },
      {
        icono: 'lock_reset',
        titulo: 'Clave renovada',
        detalle: 'La nueva contraseña queda cifrada con el mismo estándar del sistema.',
      },
      {
        icono: 'verified_user',
        titulo: 'Verificación previa',
        detalle: 'Solo los correos registrados en el sistema reciben el enlace.',
      },
    ],
    restablecer: [
      {
        icono: 'password',
        titulo: 'Clave renovada',
        detalle:
          'Elija una clave de 8-16 caracteres con mayúscula, minúscula, número y símbolo.',
      },
      {
        icono: 'timer',
        titulo: 'Un solo uso',
        detalle: 'Al confirmar, el enlace se consume y queda invalidado.',
      },
      {
        icono: 'enhanced_encryption',
        titulo: 'Cifrado estándar',
        detalle: 'La clave se guarda con el mismo hash SHA-256 del sistema.',
      },
    ],
  },

  correo: {
    remitente: 'FirmaLink',
    pieTitulo: 'BUNKER TECHNOLOGIES SOLUTIONS',
    pieNota:
      'Este correo fue enviado automáticamente por motivos de seguridad. Por favor no respondas a este mensaje.',
    logoAlt: 'FirmaLink',
  },
};
