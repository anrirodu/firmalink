/**
 * Modelo de la factura digital de FirmaLink.
 *
 * Reproduce la hoja de la plantilla de facturación (21,7 × 28 cm, márgenes
 * 4,5 / 2 / 2,5 cm) y le agrega lo que la plantilla no tenía: el vínculo con la
 * ficha del cliente de FirmaLink y el tratamiento fiscal que ese cliente
 * declara (IGTF, retención de IVA e ISLR).
 *
 * La aritmética es la de la plantilla original —`parseNum`, `formatoBs`,
 * `montoEnLetras`— portada tal cual, para que un mismo número se lea igual en
 * pantalla, en la hoja impresa y en el PDF. Verificada contra la plantilla en
 * `npm run test:factura`.
 */
import { ClienteDocumento } from '../customers/cliente.model';

export type FacturaEstado = 'borrador' | 'emitida' | 'anulada' | 'eliminado';

// ═══════════════════════════════════════════
// Documento
// ═══════════════════════════════════════════

/** Renglón facturado: es la fila de la tabla de items de la hoja. */
export interface ItemFactura {
  /** Descripción tal como se imprime (texto libre, puede ser largo) */
  descripcion: string;
  cantidad: number;
  /** Precio unitario en bolívares */
  precio: number;
}

/**
 * Emisor que se imprime en la hoja: la cabecera superior (logo, empresa y
 * formato de impresión) y el bloque fiscal del pie (razón social, rango de
 * control autorizado y providencia del SENIAT).
 *
 * Va dentro de la factura, no en un ajuste global, porque los rangos de
 * control autorizados cambian con el tiempo y una factura emitida debe seguir
 * mostrando el rango con el que se emitió.
 */
export interface EmisorFactura {
  /** Nombre comercial en la cabecera */
  nombre: string;
  rif: string;
  direccion: string;
  correo: string;
  telefonos: string;
  /** Razón social fiscal del pie */
  razonSocial: string;
  razonSocialDireccion: string;
  razonSocialTelefonos: string;
  razonSocialRif: string;
  razonSocialCorreo: string;
  /** Fecha del pie (la del rango de control autorizado) */
  fechaControl: string;
  controlDesde: string;
  controlHasta: string;
  providencia: string;
  region: string;
}

/** Total por el que se emite el documento, sin retenciones. */
export interface TotalesFactura {
  subtotal: number;
  montoIva: number;
  /** IGTF (3 % sobre el total) cuando la operación se paga en divisas */
  montoIgtf: number;
  /** Retención de IVA que practica el cliente agente de retención */
  retencionIva: number;
  /** Retención de ISLR que practica el cliente agente de retención */
  retencionIslr: number;
  /** Total facturado: subtotal + IVA (+ IGTF). Es el "Total Bs" de la hoja */
  total: number;
  /** Lo que efectivamente paga el cliente, ya descontadas las retenciones */
  netoAPagar: number;
}

/** Documentos que admite la hoja: el formato libre y la nota de entrega. */
export type FacturaFormato = 'FORMATO LIBRE' | 'NOTA DE ENTREGA';

export interface Factura {
  _id?: string;
  /** Código interno (FAC-000001): el mismo esquema que usan los clientes */
  codigo: string;
  /** Número de factura, 7 dígitos: 0000001 */
  numero: string;
  /** Prefijo del número de control autorizado: 00- */
  controlPrefijo: string;
  /** Consecutivo dentro del rango autorizado */
  numeroControl: string;
  formato: FacturaFormato;
  estado: FacturaEstado;
  /** Fecha de emisión en ISO 8601 (el día que se factura) */
  fechaEmision: string;
  /** Fecha como se imprime: "Caracas 04/Septiembre/2026" */
  fechaTexto: string;
  /** Periodo facturado: "Agosto 2026" */
  mes: string;
  /** Alícuota de IVA en porcentaje (16 la general) */
  alicuotaIva: number;
  /** La operación se paga en divisas: corresponde IGTF */
  aplicaIgtf: boolean;
  /** Alícuota de IGTF en porcentaje (3) */
  alicuotaIgtf: number;
  /** Alícuota de ISLR en porcentaje, cuando el cliente lo retiene */
  alicuotaIslr: number;
  items: ItemFactura[];
  cliente: ClienteDocumento | null;
  emisor: EmisorFactura;
  /** Interruptores de la hoja (los mismos botones de la plantilla) */
  mostrarFirmaSello: boolean;
  mostrarCabeceraPie: boolean;
  mostrarMarcaAgua: boolean;
  observaciones: string;
  /** Totales al momento de emitir (congelados) */
  totales?: TotalesFactura;
  /** Huella SHA-256 del contenido impreso (al emitir) */
  huella?: string;
  creadoEn?: string;
  actualizadoEn?: string;
  usuario?: string;
}

// ═══════════════════════════════════════════
// Emisor por defecto
// ═══════════════════════════════════════════

export const EMISOR_DEFAULT: EmisorFactura = {
  nombre: 'BUNKER TECHNOLOGIES SOLUTIONS, C.A',
  rif: 'J- 50561969-1',
  direccion: 'Av Fuerte Tiuna, Edif. D06, Piso 6, Apto B6, Sector Los Constituyentistas',
  correo: 'bunkertechs@gmail.com',
  telefonos: '0412-2602101 / 0412-6553516 / 0412-9967096',
  razonSocial: 'Libreria y Papeleria Dimargi, C.A',
  razonSocialDireccion: 'Av.Bolivar Edf. Nevic, Local 5 Los Teques - Edo Miranda',
  razonSocialTelefonos: '0426-9110914 / 04143219896',
  razonSocialRif: 'J-00216902-8',
  razonSocialCorreo: 'libreriadimargi@gmail.com',
  fechaControl: '01-09-2026',
  controlDesde: '00-00000101',
  controlHasta: '00-00000200',
  providencia: 'SENIAT/01/01043 de fecha 08-10-2008',
  region: 'Region Capital',
};

/** Alícuotas vigentes de la plantilla: IVA general 16 %, IGTF 3 %, ISLR de servicios 5 %. */
export const ALICUOTA_IVA = 16;
export const ALICUOTA_IGTF = 3;
export const ALICUOTA_ISLR = 5;

/** Prefijo del número de control autorizado. */
export const CONTROL_PREFIJO = '00-';

// ═══════════════════════════════════════════
// Utilidades numéricas (portadas de la plantilla)
// ═══════════════════════════════════════════

/** Convierte "1.234,56" | "1234,56" | "1234.56" en número. */
export function parsearNumero(v: unknown): number {
  let s = String(v ?? '').trim();
  if (!s) return 0;
  if (s.includes('.') && s.includes(',')) {
    s = s.replace(/\./g, '').replace(',', '.'); // formato venezolano
  } else if (s.includes(',')) {
    s = s.replace(',', '.'); // coma decimal
  }
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

/** Formato bolívares: 1.234.567,89 */
export function formatoBs(n: number): string {
  const valor = Number.isFinite(n) ? n : 0;
  const neg = valor < 0;
  const [i, d] = Math.abs(valor).toFixed(2).split('.');
  const entero = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '-' : '') + entero + ',' + d;
}

/** Formato cantidad: 1 | 2,5 | 0,125 */
export function formatoCantidad(n: number): string {
  const valor = Number.isFinite(n) ? n : 0;
  const redondeado = Math.round(valor * 1000) / 1000;
  const [i, d] = String(redondeado).split('.');
  const entero = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return d ? entero + ',' + d : entero;
}

/** Alícuota como se imprime en la hoja: 16 % → "16%", 8,5 % → "8,5%". */
export function formatoPorcentaje(n: number): string {
  return formatoCantidad(n) + '%';
}

// ═══════════════════════════════════════════
// Número → letras
// ═══════════════════════════════════════════

const N0_29 = [
  'CERO', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE',
  'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE',
  'DIECIOCHO', 'DIECINUEVE', 'VEINTE', 'VEINTIUNO', 'VEINTIDOS', 'VEINTITRES',
  'VEINTICUATRO', 'VEINTICINCO', 'VEINTISEIS', 'VEINTISIETE', 'VEINTIOCHO', 'VEINTINUEVE',
];
const DECENAS = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA',
  'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
const CENTENAS = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS',
  'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function tresDigitosALetras(n: number): string {
  if (n === 0) return 'CERO';
  if (n === 100) return 'CIEN';
  const c = Math.floor(n / 100);
  const r = n % 100;
  let s = c > 0 ? CENTENAS[c] + ' ' : '';
  if (r > 0) {
    if (r < 30) {
      s += N0_29[r];
    } else {
      const d = Math.floor(r / 10);
      const u = r % 10;
      s += DECENAS[d];
      if (u > 0) s += ' Y ' + N0_29[u];
    }
  }
  return s.trim();
}

export function enteroALetras(n: number): string {
  if (n === 0) return 'CERO';
  const billones = Math.floor(n / 1e12);
  const millones = Math.floor((n % 1e12) / 1e6);
  const miles = Math.floor((n % 1e6) / 1000);
  const resto = n % 1000;
  let s = '';
  if (billones > 0) {
    s += billones === 1 ? 'UN BILLON ' : tresDigitosALetras(billones) + ' BILLONES ';
  }
  if (millones > 0) {
    s += millones === 1 ? 'UN MILLON ' : tresDigitosALetras(millones) + ' MILLONES ';
  }
  if (miles > 0) {
    s += miles === 1 ? 'MIL ' : tresDigitosALetras(miles) + ' MIL ';
  }
  if (resto > 0) s += tresDigitosALetras(resto);
  return s.trim();
}

/** 1.234,56 → "UN MIL DOSCIENTOS TREINTA Y CUATRO BOLIVARES CON CINCUENTA Y SEIS CENTIMOS" */
export function montoEnLetras(monto: number): string {
  const valor = Number.isFinite(monto) ? monto : 0;
  const abs = Math.abs(valor).toFixed(2).split('.');
  const enteros = parseInt(abs[0], 10);
  const centimos = parseInt(abs[1], 10);
  let s = enteroALetras(enteros);
  s += enteros === 1 ? ' BOLIVAR' : ' BOLIVARES';
  s += ' CON ' + (centimos > 0 ? enteroALetras(centimos) : 'CERO');
  s += centimos === 1 ? ' CENTIMO' : ' CENTIMOS';
  // "UNO" como palabra independiente → "UN" (UN BOLIVAR, UN MILLON UN, ...)
  return s.replace(/\bUNO\b/g, 'UN');
}

// ═══════════════════════════════════════════
// Fechas y mes facturado
// ═══════════════════════════════════════════

/** "Agosto 2026" para el periodo facturado. */
export function mesFacturado(fecha: Date = new Date()): string {
  return `${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;
}

function dosDigitos(n: number): string {
  return String(n).padStart(2, '0');
}

/** "Caracas 04/Septiembre/2026", como se imprime en la fecha de emisión. */
export function fechaTextoEmision(fecha: Date, ciudad = 'Caracas'): string {
  return `${ciudad} ${dosDigitos(fecha.getDate())}/${MESES[fecha.getMonth()]}/${fecha.getFullYear()}`;
}

/** Solo la fecha, sin ciudad: "04/09/2026". */
export function fechaCorta(fecha: Date): string {
  return `${dosDigitos(fecha.getDate())}/${dosDigitos(fecha.getMonth() + 1)}/${fecha.getFullYear()}`;
}

// ═══════════════════════════════════════════
// Numeración
// ═══════════════════════════════════════════

/** Número de factura con 7 dígitos: 7 → "0000007". */
export function formatearNumeroFactura(n: number | string): string {
  const soloDigitos = String(n ?? '').replace(/\D/g, '');
  return (soloDigitos || '0').slice(-7).padStart(7, '0');
}

/** Número de control como se imprime, con su prefijo: "00-0000007". */
export function formatearControl(prefijo: string, numero: string): string {
  return `${prefijo || CONTROL_PREFIJO}${formatearNumeroFactura(numero)}`;
}

/** Siguiente número de la serie a partir del último emitido. */
export function siguienteNumero(ultimo: string | number | null | undefined): string {
  const n = parseInt(String(ultimo ?? '').replace(/\D/g, '') || '0', 10);
  return formatearNumeroFactura(Number.isFinite(n) ? n + 1 : 1);
}

/** Código interno correlativo: FAC-000007. */
export function formatearCodigoFactura(n: number): string {
  return 'FAC-' + String(Math.max(1, Math.trunc(n))).padStart(6, '0');
}

/**
 * ¿El número de control está dentro del rango autorizado? El SENIAT autoriza
 * un rango; emitir fuera de él es una falta, así que se avisa antes de guardar.
 */
export function controlEnRango(emisor: EmisorFactura, numeroControl: string): boolean {
  const n = parseInt(String(numeroControl).replace(/\D/g, '') || '0', 10);
  const desde = parseInt(String(emisor.controlDesde).replace(/\D/g, '') || '0', 10);
  const hasta = parseInt(String(emisor.controlHasta).replace(/\D/g, '') || '0', 10);
  return n >= desde && n <= hasta;
}

// ═══════════════════════════════════════════
// Cálculos
// ═══════════════════════════════════════════

/** ¿El cliente retiene IVA? (agente de retención con porcentaje declarado) */
export function clienteRetieneIva(f: Pick<Factura, 'cliente'>): boolean {
  const c = f.cliente;
  return !!c && c.agenteRetencionIva && c.porcentajeRetencionIva > 0;
}

/** ¿El cliente está exento de IVA? (su condición fiscal manda sobre la alícuota) */
export function clienteExentoIva(f: Pick<Factura, 'cliente'>): boolean {
  return f.cliente?.condicionFiscal === 'exento';
}

/**
 * Alícuota de IVA que de verdad se aplica.
 *
 * Un cliente exento compra sin IVA por mandato legal, así que su factura se
 * emite en cero aunque la alícuota general siga siendo 16 %.
 */
export function alicuotaIvaEfectiva(f: Pick<Factura, 'cliente' | 'alicuotaIva'>): number {
  return clienteExentoIva(f) ? 0 : numeroOpcional(f.alicuotaIva);
}

/** ¿El cliente retiene ISLR? */
export function clienteRetieneIslr(f: Pick<Factura, 'cliente'>): boolean {
  return !!f.cliente && f.cliente.agenteRetencionIslr;
}

/** ¿Le corresponde IGTF a esta factura? El cliente exento nunca lo paga. */
export function aplicarIgtf(f: Pick<Factura, 'aplicaIgtf' | 'cliente'>): boolean {
  return !!f.aplicaIgtf && !f.cliente?.exentoIgtf;
}

/** Subtotal: suma de cantidad × precio de los renglones. */
export function subtotalFactura(items: ItemFactura[]): number {
  return (items ?? []).reduce(
    (acc, it) => acc + (Number(it?.cantidad) || 0) * (Number(it?.precio) || 0),
    0,
  );
}

/**
 * Total del documento.
 *
 * `total` es "Total Bs" de la hoja: lo que se factura (subtotal + IVA + IGTF).
 * Las retenciones NO lo rebajan —son un pago a cuenta que el agente de
 * retención descuenta al pagar—, por eso se informan aparte y el efectivo a
 * recibir es `netoAPagar`.
 */
export function calcularTotales(f: Factura): TotalesFactura {
  const subtotal = redondear(subtotalFactura(f.items));
  const montoIva = redondear(subtotal * (alicuotaIvaEfectiva(f) / 100));
  const montoIgtf = aplicarIgtf(f)
    ? redondear((subtotal + montoIva) * (numeroOpcional(f.alicuotaIgtf) / 100))
    : 0;
  const total = redondear(subtotal + montoIva + montoIgtf);

  const retencionIva = clienteRetieneIva(f)
    ? redondear(montoIva * (numeroOpcional(f.cliente?.porcentajeRetencionIva) / 100))
    : 0;
  const retencionIslr = clienteRetieneIslr(f)
    ? redondear(subtotal * (numeroOpcional(f.alicuotaIslr) / 100))
    : 0;

  return {
    subtotal,
    montoIva,
    montoIgtf,
    retencionIva,
    retencionIslr,
    total,
    netoAPagar: redondear(total - retencionIva - retencionIslr),
  };
}

/** Céntimos, para que un subtotal con decimales no arrastre ruido binario. */
function redondear(n: number): number {
  return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}

function numeroOpcional(n: unknown): number {
  const v = Number(n);
  return Number.isFinite(v) ? v : 0;
}

// ═══════════════════════════════════════════
// Fábrica y normalización
// ═══════════════════════════════════════════

export interface OpcionesFacturaVacia {
  numero?: string | number;
  /** Último número emitido, para correlacionar la serie */
  ultimoNumero?: string | number;
  ahora?: Date;
  emisor?: Partial<EmisorFactura>;
  usuario?: string;
}

/** Factura nueva en blanco, lista para el editor. */
export function facturaVacia(opciones: OpcionesFacturaVacia = {}): Factura {
  const ahora = opciones.ahora ?? new Date();
  const numero = opciones.numero != null
    ? formatearNumeroFactura(opciones.numero)
    : siguienteNumero(opciones.ultimoNumero ?? '0000000');

  return {
    codigo: '',
    numero,
    controlPrefijo: CONTROL_PREFIJO,
    numeroControl: numero,
    formato: 'FORMATO LIBRE',
    estado: 'borrador',
    fechaEmision: ahora.toISOString(),
    fechaTexto: fechaTextoEmision(ahora),
    mes: mesFacturado(ahora),
    alicuotaIva: ALICUOTA_IVA,
    aplicaIgtf: false,
    alicuotaIgtf: ALICUOTA_IGTF,
    alicuotaIslr: ALICUOTA_ISLR,
    items: [],
    cliente: null,
    emisor: { ...EMISOR_DEFAULT, ...(opciones.emisor ?? {}) },
    mostrarFirmaSello: true,
    mostrarCabeceraPie: true,
    mostrarMarcaAgua: true,
    observaciones: '',
    creadoEn: ahora.toISOString(),
    usuario: opciones.usuario ?? '',
  };
}

/** Renglón vacío para el formulario de items. */
export function itemVacio(): ItemFactura {
  return { descripcion: '', cantidad: 1, precio: 0 };
}

/**
 * Normaliza un documento venido de Mongo: la hoja espera números donde puede
 * haberlos guardado como texto (la plantilla original los escribía así) y
 * booleanos donde puede haber `undefined` en facturas anteriores.
 */
export function normalizarFactura(p: Partial<Factura> | null | undefined): Factura {
  const base = facturaVacia();
  if (!p) return base;

  const items = Array.isArray(p.items)
    ? p.items.map((it) => ({
      descripcion: String(it?.descripcion ?? ''),
      cantidad: parsearNumero(it?.cantidad),
      precio: parsearNumero(it?.precio),
    }))
    : [];

  const factura: Factura = {
    ...base,
    ...p,
    numero: formatearNumeroFactura(p.numero ?? base.numero),
    controlPrefijo: p.controlPrefijo || base.controlPrefijo,
    numeroControl: formatearNumeroFactura(p.numeroControl ?? p.numero ?? base.numero),
    fechaEmision: p.fechaEmision || base.fechaEmision,
    fechaTexto: p.fechaTexto || base.fechaTexto,
    mes: p.mes || base.mes,
    alicuotaIva: parsearNumero(p.alicuotaIva ?? base.alicuotaIva),
    alicuotaIgtf: parsearNumero(p.alicuotaIgtf ?? base.alicuotaIgtf),
    alicuotaIslr: parsearNumero(p.alicuotaIslr ?? base.alicuotaIslr),
    aplicaIgtf: !!p.aplicaIgtf,
    mostrarFirmaSello: p.mostrarFirmaSello !== false,
    mostrarCabeceraPie: p.mostrarCabeceraPie !== false,
    mostrarMarcaAgua: p.mostrarMarcaAgua !== false,
    items,
    cliente: p.cliente ?? null,
    emisor: { ...EMISOR_DEFAULT, ...(p.emisor ?? {}) },
    observaciones: p.observaciones ?? '',
  };

  // Totales congelados al emitir: se conservan si venían, se recalculan si no.
  factura.totales = p.totales ?? calcularTotales(factura);
  return factura;
}

// ═══════════════════════════════════════════
// Estados
// ═══════════════════════════════════════════

export function estaEliminada(estado: FacturaEstado | undefined): boolean {
  return estado === 'eliminado';
}

/** Solo el borrador se edita: emitida y anulada son estados cerrados. */
export function esEditable(estado: FacturaEstado | undefined): boolean {
  return !estado || estado === 'borrador';
}

/** Motivo legible por el que una factura no admite más edición. */
export function motivoBloqueo(estado: FacturaEstado | undefined): string {
  if (estado === 'emitida') {
    return 'La factura está emitida: su numeración es correlativa y su contenido no admite ediciones.';
  }
  if (estado === 'anulada') {
    return 'La factura está anulada: es un estado terminal y no admite ediciones.';
  }
  if (estado === 'eliminado') {
    return 'La factura está eliminada: ya no aparece en el listado y no admite ediciones.';
  }
  return '';
}

export function transicionesPermitidas(estado: FacturaEstado | undefined): FacturaEstado[] {
  if (estado === 'borrador' || !estado) return ['emitida', 'eliminado'];
  if (estado === 'emitida') return ['anulada', 'eliminado'];
  return [];
}

export interface InfoEstadoFactura {
  etiqueta: string;
  color: string;
  icono: string;
}

export function infoEstadoFactura(estado: FacturaEstado | undefined): InfoEstadoFactura {
  switch (estado) {
    case 'emitida':
      return { etiqueta: 'Emitida', color: '#1565c0', icono: 'receipt_long' };
    case 'anulada':
      return { etiqueta: 'Anulada', color: '#c62828', icono: 'block' };
    case 'eliminado':
      return { etiqueta: 'Eliminada', color: '#757575', icono: 'delete_outline' };
    default:
      return { etiqueta: 'Borrador', color: '#ef6c00', icono: 'edit_note' };
  }
}

export const ESTADOS_FACTURA: FacturaEstado[] = ['borrador', 'emitida', 'anulada'];

// ═══════════════════════════════════════════
// Validación
// ═══════════════════════════════════════════

export interface ProblemaFactura {
  campo: string;
  mensaje: string;
}

/**
 * Lo que impide emitir: sin cliente no hay factura nominal y sin renglones no
 * hay nada que cobrar. El número de control fuera del rango autorizado se
 * informa, pero no bloquea (hay quien continúa un rango vencido).
 */
export function validarFactura(f: Factura): ProblemaFactura[] {
  const problemas: ProblemaFactura[] = [];
  if (!f.numero || !/^\d{7}$/.test(f.numero)) {
    problemas.push({ campo: 'numero', mensaje: 'El número de factura debe tener 7 dígitos.' });
  }
  if (!f.numeroControl || !/^\d{7}$/.test(f.numeroControl)) {
    problemas.push({ campo: 'numeroControl', mensaje: 'El número de control debe tener 7 dígitos.' });
  }
  if (!f.cliente) {
    problemas.push({ campo: 'cliente', mensaje: 'Seleccione el cliente al que se factura.' });
  }
  if (!f.fechaEmision) {
    problemas.push({ campo: 'fechaEmision', mensaje: 'Indique la fecha de emisión.' });
  }
  if ((f.items ?? []).length === 0) {
    problemas.push({ campo: 'items', mensaje: 'Agregue al menos un renglón a la factura.' });
  }
  (f.items ?? []).forEach((it, i) => {
    if (!it.descripcion?.trim()) {
      problemas.push({ campo: `items.${i}.descripcion`, mensaje: `El renglón ${i + 1} no tiene descripción.` });
    }
    if (!(it.cantidad > 0)) {
      problemas.push({ campo: `items.${i}.cantidad`, mensaje: `La cantidad del renglón ${i + 1} debe ser mayor que cero.` });
    }
    if (!(it.precio >= 0)) {
      problemas.push({ campo: `items.${i}.precio`, mensaje: `El precio del renglón ${i + 1} no puede ser negativo.` });
    }
  });
  if (calcularTotales(f).total <= 0) {
    problemas.push({ campo: 'items', mensaje: 'El total de la factura debe ser mayor que cero.' });
  }
  return problemas;
}
