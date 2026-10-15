export type AcuerdoEstado = 'borrador' | 'en_revision' | 'firmado' | 'anulado';

export interface AcuerdoMargen {
  sup: number;
  inf: number;
  izq: number;
  der: number;
}

export interface Acuerdo {
  _id?: string;
  codigo: string;
  prefijo: string;
  anio: number;
  titulo: string;
  proyecto: string;
  area: string;
  gerente: string;
  cedula: string;
  cedulaFirma: string;
  representante: string;
  vigencia: string;
  ciudad: string;
  fechaFirma: string;
  honorario: string;
  quincena: string;
  campos: Record<string, string>;
  documentoHtml: string;
  documentoTexto: string;
  margen: AcuerdoMargen;
  estado: AcuerdoEstado;
  hashDocumento: string;
  hashAlgoritmo: 'SHA-256';
  creadoPorCedula?: string;
  creadoPorNombre?: string;
  creadoEn?: string | Date;
  actualizadoEn?: string | Date;
  __v?: number;
}

export function generarPrefijo(): string {
  return 'CJS';
}

/**
 * Compone el código del acuerdo: PREFIJO + consecutivo de 3 dígitos + año.
 * El año es el del acuerdo (no el del reloj): permite preparar acuerdos de
 * ejercicios siguientes sin alterar la numeración del año en curso.
 */
export function generarCodigo(prefijo: string, consecutivo: number, anio?: number): string {
  const num = String(consecutivo).padStart(3, '0');
  const a = anio ?? new Date().getFullYear();
  return `${prefijo}${num}-${a}`;
}

/**
 * Extrae el consecutivo de un código con el formato PREFIJO<consecutivo>[-<año>].
 * Primero descarta el sufijo del año (si lo hay) y toma el último bloque de
 * dígitos: así CJS001-2026 → 1, CJS1234-2026 → 1234 y CJS-2026 → 0.
 */
export function extraerConsecutivo(codigo: string): number {
  if (!codigo) return 0;
  const sinAnio = codigo.replace(/-\d{4}$/, '');
  const m = sinAnio.match(/(\d+)\s*$/);
  if (!m) return 0;
  const n = parseInt(m[1], 10);
  return isNaN(n) ? 0 : n;
}

/**
 * ¿El acuerdo admite edición?
 *
 * Un acuerdo firmado es un instrumento cerrado: su contenido y su huella SHA-256
 * no pueden volver a modificarse. Lo mismo aplica a un acuerdo anulado, que es
 * un estado terminal.
 */
export function esEditable(estado: AcuerdoEstado | undefined): boolean {
  return estado === 'borrador' || estado === 'en_revision';
}

/**
 * Transiciones de estado permitidas.
 *
 * - borrador / en_revision → cualquier estado
 * - firmado               → solo anulado (nunca vuelve a edición)
 * - anulado               → ninguna (terminal)
 */
export function transicionesPermitidas(actual: AcuerdoEstado | undefined): AcuerdoEstado[] {
  switch (actual) {
    case 'borrador':
    case 'en_revision':
      return ['borrador', 'en_revision', 'firmado', 'anulado'];
    case 'firmado':
      return ['anulado'];
    case 'anulado':
      return [];
    default:
      return [];
  }
}

/** Motivo legible por el que un acuerdo no admite más edición */
export function motivoBloqueo(estado: AcuerdoEstado | undefined): string {
  if (estado === 'firmado') {
    return 'El acuerdo está firmado: su contenido y su huella quedaron cerrados y no admite más ediciones.';
  }
  if (estado === 'anulado') {
    return 'El acuerdo está anulado: es un estado terminal y no admite más ediciones.';
  }
  return '';
}
