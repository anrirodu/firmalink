/**
 * Modelo del presupuesto de FirmaLink.
 *
 * A diferencia de la factura —documento fiscal con numeración de control
 * autorizada por el SENIAT—, el presupuesto es un documento **comercial**: no
 * lleva control ni providencia, no genera IGTF ni retenciones, y en cambio
 * declara lo que un cliente necesita para decidir: **hasta cuándo vale**,
 * cuánto tarda la entrega, con qué garantía y bajo qué forma de pago. Lleva
 * además una nota expresa de que no es una factura y un bloque de aceptación
 * para que el cliente lo apruebe por escrito.
 *
 * El emisor es **BUNKER TECHNOLOGIES SOLUTIONS, C.A** el mismo de la factura:
 * su identidad se arma desde `EMISOR_DEFAULT` para que un cambio de teléfono o
 * de correo se haga en un solo sitio y valga para los dos documentos.
 */

import { ClienteDocumento } from '../customers/cliente.model';

/*
 * Utilidades compartidas con la factura.
 *
 * La aritmética de bolívares, el paso de número a letras y las fechas nacieron
 * en `factura.model.ts` (portadas de la plantilla original y verificadas en
 * `npm run test:factura`) y son las mismas para los dos documentos: si el
 * presupuesto tuviera su propia copia, un mismo monto podría leerse distinto en
 * una factura y en un presupuesto. Se importan, por tanto, en vez de duplicarse.
 */
import {
  EMISOR_DEFAULT,
  clienteExentoIva,
  enteroALetras,
  fechaCorta,
  fechaTextoEmision,
  formatearNumeroFactura,
  formatoBs,
  parsearNumero,
  redondear,
  siguienteNumero,
  subtotalFactura,
} from '../billing/factura.model';

/*
 * Las utilidades compartidas se reexportan para que el módulo de presupuestos
 * importe desde un solo sitio: el día que se extraigan a `shared/` el cambio
 * queda encerrado en esta línea.
 */
export {
  clienteExentoIva,
  fechaTextoEmision,
  formatoBs,
  formatoCantidad,
  formatoPorcentaje,
  mesFacturado,
  parsearNumero,
} from '../billing/factura.model';

// ═══════════════════════════════════════════
// Estados
// ═══════════════════════════════════════════

/**
 * Ciclo de vida del presupuesto.
 *
 * El borrador es lo único editable; al **enviarlo** al cliente se congelan los
 * totales y se estampa la huella, porque a partir de ahí el cliente tiene en su
 * poder un documento concreto. La respuesta del cliente lo lleva a `aprobado` o
 * `rechazado`, y solo lo aprobado o lo rechazado pueden anularse.
 */
export type PresupuestoEstado =
  | 'borrador'
  | 'enviado'
  | 'aprobado'
  | 'rechazado'
  | 'anulado'
  | 'eliminado';

/**
 * Estado que se muestra, que no siempre es el guardado: un presupuesto enviado
 * cuya validez ya pasó se muestra **vencido** sin necesidad de guardarlo así
 * (el vencimiento ocurre por el paso del tiempo, no por una acción del usuario).
 */
export type PresupuestoEstadoVisible = PresupuestoEstado | 'vencido';

/** Estados que el usuario puede elegir en el filtro del listado. */
export const ESTADOS_PRESUPUESTO: PresupuestoEstado[] = [
  'borrador',
  'enviado',
  'aprobado',
  'rechazado',
  'anulado',
];

// ═══════════════════════════════════════════
// Moneda
// ═══════════════════════════════════════════

/**
 * Divisa en la que se cotiza el presupuesto.
 *
 * No convierte importes: el presupuesto se negocia en una sola moneda y todos
 * los renglones, el descuento y el IVA se expresan en ella. Cambiar de divisa
 * sólo cambia el símbolo y el nombre con el que se imprime.
 */
export type MonedaPresupuesto = 'VES' | 'USD' | 'EUR';

/** Datos de impresión de cada divisa. */
export interface DatosMoneda {
  /** Símbolo que precede al monto en la hoja y en pantalla */
  simbolo: string;
  /** Nombre singular usado en el monto en letras ("DOLAR") */
  nombre: string;
  /** Nombre plural usado en el monto en letras ("DOLARES") */
  plural: string;
  /** Rótulo corto para tablas y totales ("Bs", "USD", "EUR") */
  etiqueta: string;
}

/** Catálogo de divisas admitidas. */
export const MONEDAS_PRESUPUESTO: Record<MonedaPresupuesto, DatosMoneda> = {
  VES: { simbolo: 'Bs', nombre: 'BOLIVAR', plural: 'BOLIVARES', etiqueta: 'Bs' },
  USD: { simbolo: '$', nombre: 'DOLAR', plural: 'DOLARES', etiqueta: 'USD' },
  EUR: { simbolo: '€', nombre: 'EURO', plural: 'EUROS', etiqueta: 'EUR' },
};

/** Opciones para el selector del formulario, en el orden en que se muestran. */
export const MONEDAS_OPCIONES: { valor: MonedaPresupuesto; texto: string }[] = [
  { valor: 'VES', texto: 'Bolívares (Bs)' },
  { valor: 'USD', texto: 'Dólares (USD)' },
  { valor: 'EUR', texto: 'Euros (EUR)' },
];

/** Moneda por defecto de un presupuesto nuevo. */
export const MONEDA_DEFAULT: MonedaPresupuesto = 'VES';

/** Normaliza la divisa: cualquier valor desconocido cae en bolívares. */
export function monedaValida(moneda: string | undefined | null): MonedaPresupuesto {
  return moneda === 'USD' || moneda === 'EUR' || moneda === 'VES' ? moneda : MONEDA_DEFAULT;
}

/** Datos de impresión de la divisa del presupuesto (VES si viene vacía). */
export function datosMoneda(p: Pick<Presupuesto, 'moneda'> | MonedaPresupuesto | undefined): DatosMoneda {
  const clave = typeof p === 'string' ? p : p?.moneda;
  return MONEDAS_PRESUPUESTO[clave ?? MONEDA_DEFAULT] ?? MONEDAS_PRESUPUESTO.VES;
}

/**
 * Monto con su símbolo de divisa: "Bs 1.234,56", "$ 1.234,56", "€ 1.234,56".
 *
 * Reutiliza el formato numérico venezolano (miles con punto, decimales con
 * coma) para las tres divisas: es el que ya usan la hoja y la pantalla.
 */
export function formatoMoneda(monto: number, p: Pick<Presupuesto, 'moneda'> | MonedaPresupuesto | undefined): string {
  return `${datosMoneda(p).simbolo} ${formatoBs(monto)}`;
}

/**
 * Importe en letras con el nombre de la divisa: "UN MIL ... DOLARES CON ...".
 *
 * La factura sólo conoce bolívares, así que su `montoEnLetras` termina siempre
 * en "BOLIVARES". Aquí se reutiliza su conversión de número a letras y se
 * sustituye el nombre de la moneda por el de la divisa del presupuesto.
 */
export function montoEnLetrasMoneda(monto: number, moneda: DatosMoneda): string {
  const valor = Number.isFinite(monto) ? monto : 0;
  const [enteros, centimos] = Math.abs(valor).toFixed(2).split('.');

  let texto = enteroALetras(parseInt(enteros, 10));
  texto += parseInt(enteros, 10) === 1 ? ` ${moneda.nombre}` : ` ${moneda.plural}`;
  texto += ' CON ' + (parseInt(centimos, 10) > 0 ? enteroALetras(parseInt(centimos, 10)) : 'CERO');
  texto += parseInt(centimos, 10) === 1 ? ' CENTIMO' : ' CENTIMOS';
  // "UNO" como palabra independiente → "UN" (UN DOLAR, UN MILLON UN, ...)
  return texto.replace(/\bUNO\b/g, 'UN');
}

// ═══════════════════════════════════════════
// Documento
// ═══════════════════════════════════════════

/**
 * Renglón cotizado: es la fila de la tabla de items de la hoja.
 *
 * No lleva unidad de medida a propósito: en un presupuesto el alcance suele ir
 * descrito en la propia descripción ("Pentest externo — 40 horas de analista"),
 * que es como se negocia.
 */
export interface ItemPresupuesto {
  /** Descripción tal como se imprime (texto libre, puede ser largo) */
  descripcion: string;
  cantidad: number;
  /** Precio unitario en la moneda del presupuesto (`Presupuesto.moneda`) */
  precio: number;
}

/**
 * Emisor que se imprime en la hoja: BUNKER en la cabecera (logo, nombre, RIF,
 * dirección y contacto) y en el pie. Sin bloque fiscal: el presupuesto no
 * declara rangos de control ni providencias porque no es un documento fiscal.
 */
export interface EmisorPresupuesto {
  /** Nombre comercial en la cabecera */
  nombre: string;
  rif: string;
  direccion: string;
  correo: string;
  telefonos: string;
}

/**
 * Condiciones comerciales de la oferta. Son lo que distingue un presupuesto de
 * una factura: no son cálculos, son **compromisos** que el cliente evalúa antes
 * de aceptar, y viajan con el documento igual que los renglones.
 */
export interface CondicionesPresupuesto {
  /** Días de vigencia contados desde la emisión (30 por defecto) */
  validezDias: number;
  /** Forma de pago ofrecida: "Contado", "50 % anticipo, 50 % contra entrega"… */
  formaPago: string;
  /** Tiempo de entrega o de ejecución: "15 días hábiles" */
  tiempoEntrega: string;
  /** Garantía ofrecida sobre el trabajo o los equipos */
  garantia: string;
  /** Lugar de entrega o de prestación del servicio */
  lugar: string;
  /** Alcance del trabajo y sus exclusiones, en texto libre */
  alcance: string;
}

/** Importes del presupuesto: no hay IGTF ni retenciones (no es fiscal). */
export interface TotalesPresupuesto {
  /** Suma de cantidad × precio de los renglones */
  subtotal: number;
  /** Descuento comercial aplicado sobre el subtotal */
  descuento: number;
  /** Base sobre la que se calcula el IVA: subtotal − descuento */
  baseImponible: number;
  montoIva: number;
  /** Total de la moneda del presupuesto: base + IVA (IVA = 0 si no aplica) */
  total: number;
}

export interface Presupuesto {
  _id?: string;
  /** Código interno (PRE-000001): el mismo esquema que clientes y facturas */
  codigo: string;
  /** Número de presupuesto, 7 dígitos: 0000007 */
  numero: string;
  estado: PresupuestoEstado;
  /** Fecha de emisión en ISO 8601 */
  fechaEmision: string;
  /** Fecha como se imprime: "Caracas 19/Octubre/2026" */
  fechaTexto: string;
  /** Mes de emisión "2026-10": permite agrupar y filtrar por período */
  mes?: string;
  /** Último día de validez en ISO 8601 (emisión + `condiciones.validezDias`) */
  fechaValidez: string;
  /** Divisa en la que se cotiza: bolívares, dólares o euros */
  moneda: MonedaPresupuesto;
  /**
   * ¿El presupuesto lleva IVA? Al desactivarlo, el total sale sin impuesto y la
   * hoja lo advierte en rojo: el monto cotizado no incluye IVA.
   */
  aplicaIva: boolean;
  /** Alícuota de IVA en porcentaje (16 la general, 0 si el cliente está exento) */
  alicuotaIva: number;
  /** Descuento comercial en porcentaje (0 la mayoría de las veces) */
  descuentoPorcentaje: number;
  items: ItemPresupuesto[];
  cliente: ClienteDocumento | null;
  condiciones: CondicionesPresupuesto;
  emisor: EmisorPresupuesto;
  /** Interruptores de la hoja (los mismos botones de la plantilla) */
  mostrarFirmaSello: boolean;
  mostrarCabeceraPie: boolean;
  mostrarMarcaAgua: boolean;
  observaciones: string;
  /** Totales congelados al enviar */
  totales?: TotalesPresupuesto;
  /** Huella SHA-256 del contenido impreso (al enviar) */
  huella?: string;
  /** Quién aprobó el presupuesto del lado del cliente */
  aprobadoPor?: string;
  /** Cuándo respondió el cliente (ISO 8601) */
  fechaRespuesta?: string;
  /** Motivo del rechazo, cuando el cliente no acepta la oferta */
  motivoRechazo?: string;
  creadoEn?: string;
  actualizadoEn?: string;
  usuario?: string;
}

// ═══════════════════════════════════════════
// Valores por defecto
// ═══════════════════════════════════════════

/** Vigencia con la que se emite un presupuesto si nadie dice lo contrario. */
export const VALIDEZ_DIAS_DEFAULT = 30;

/** Condiciones con las que arranca un presupuesto nuevo. */
export const CONDICIONES_DEFAULT: CondicionesPresupuesto = {
  validezDias: VALIDEZ_DIAS_DEFAULT,
  formaPago: 'Contado contra entrega',
  tiempoEntrega: 'A convenir con el cliente',
  garantia: '30 días sobre defectos de fabricación',
  lugar: 'Caracas, Distrito Capital',
  alcance: '',
};

/** Alícuota de IVA general (16 %), la que trae el formulario. */
export const ALICUOTA_IVA_DEFAULT = 16;

/** Un presupuesto nuevo arranca con IVA. */
export const APLICA_IVA_DEFAULT = true;

/**
 * Identidad de BUNKER para la cabecera y el pie del presupuesto.
 *
 * Se arma desde `EMISOR_DEFAULT` —la ficha del emisor de la factura— y no con
 * literales propios, para que el nombre, el RIF o los teléfonos de BUNKER se
 * mantengan en un solo lugar.
 */
export function emisorPresupuestoPorDefecto(): EmisorPresupuesto {
  return {
    nombre: EMISOR_DEFAULT.nombre,
    rif: EMISOR_DEFAULT.rif,
    direccion: EMISOR_DEFAULT.direccion,
    correo: EMISOR_DEFAULT.correo,
    telefonos: EMISOR_DEFAULT.telefonos,
  };
}

// ═══════════════════════════════════════════
// Numeración
// ═══════════════════════════════════════════

/** Número de presupuesto con 7 dígitos: 7 → "0000007". */
export const formatearNumeroPresupuesto = formatearNumeroFactura;

/** Código interno correlativo: PRE-000007. */
export function formatearCodigoPresupuesto(n: number): string {
  return 'PRE-' + String(Math.max(1, Math.trunc(n))).padStart(6, '0');
}

/** Siguiente número de la serie a partir del último emitido. */
export const siguienteNumeroPresupuesto = siguienteNumero;

// ═══════════════════════════════════════════
// Fechas de validez
// ═══════════════════════════════════════════

/** Suma días a una fecha sin tocar el original. */
export function sumarDias(fecha: Date, dias: number): Date {
  const copia = new Date(fecha.getTime());
  copia.setDate(copia.getDate() + Math.max(0, Math.trunc(dias)));
  return copia;
}

/**
 * Último día de validez de un presupuesto emitido en `fecha`.
 *
 * Empieza a contar el día de la emisión, así que un presupuesto de 30 días
 * emitido el 1° vence el 1° del mes siguiente: es como lo lee el cliente.
 */
export function fechaValidez(fecha: Date, validezDias: number): Date {
  return sumarDias(fecha, validezDias);
}

/** ¿El presupuesto ya pasó su fecha de validez? */
export function estaVencido(p: Pick<Presupuesto, 'fechaValidez' | 'estado'>, ahora = new Date()): boolean {
  if (p.estado !== 'enviado') return false;
  const limite = new Date(p.fechaValidez);
  if (isNaN(limite.getTime())) return false;
  // Se compara por días: el documento vale hasta el final de su último día.
  const fin = new Date(limite.getFullYear(), limite.getMonth(), limite.getDate(), 23, 59, 59);
  return ahora.getTime() > fin.getTime();
}

/** Días que quedan de validez (negativos si ya venció). */
export function diasDeValidezRestantes(p: Pick<Presupuesto, 'fechaValidez'>, ahora = new Date()): number {
  const limite = new Date(p.fechaValidez);
  if (isNaN(limite.getTime())) return 0;
  const MS_DIA = 24 * 60 * 60 * 1000;
  return Math.ceil((limite.getTime() - ahora.getTime()) / MS_DIA);
}

// ═══════════════════════════════════════════
// Cálculos
// ═══════════════════════════════════════════

/**
 * Alícuota de IVA que de verdad se aplica.
 *
 * Dos cosas pueden dejar el presupuesto sin IVA: que el usuario lo haya
 * desactivado con el interruptor (`aplicaIva` en falso) o que el cliente sea
 * exento por mandato legal. En ambos casos el impuesto es cero aunque la
 * alícuota general siga escrita en 16 %.
 */
export function alicuotaIvaEfectiva(
  p: Pick<Presupuesto, 'cliente' | 'alicuotaIva' | 'aplicaIva'>,
): number {
  if (p.aplicaIva === false) return 0;
  return clienteExentoIva(p) ? 0 : parsearNumero(p.alicuotaIva);
}

/**
 * ¿El presupuesto sale sin IVA por una razón que conviene advertir?
 *
 * Sólo cuenta el interruptor del usuario: un cliente exento ya tiene su propio
 * aviso ("el presupuesto sale sin IVA") y no es algo que el usuario pueda
 * corregir. Aquí interesa el caso en que el usuario apagó el impuesto, porque
 * el monto cotizado deja de llevarlo incluido y hay que decirlo en rojo.
 */
export function presupuestoSinIva(p: Pick<Presupuesto, 'aplicaIva' | 'cliente'>): boolean {
  return p.aplicaIva === false && !clienteExentoIva(p);
}

/** Subtotal: suma de cantidad × precio de los renglones. */
export function subtotalPresupuesto(items: ItemPresupuesto[]): number {
  return subtotalFactura(items);
}

/** Descuento en porcentaje acotado a 0–100. */
export function descuentoEfectivo(p: Pick<Presupuesto, 'descuentoPorcentaje'>): number {
  const pct = parsearNumero(p.descuentoPorcentaje);
  return Math.min(100, Math.max(0, pct));
}

/**
 * Importes del presupuesto.
 *
 * El descuento se aplica **antes** del IVA (se descuenta sobre el subtotal y el
 * impuesto se calcula sobre lo que realmente se cobra), y no hay IGTF ni
 * retenciones porque no es una operación fiscal.
 */
export function calcularTotalesPresupuesto(p: Presupuesto): TotalesPresupuesto {
  const subtotal = redondear(subtotalPresupuesto(p.items));
  const descuento = redondear(subtotal * (descuentoEfectivo(p) / 100));
  const baseImponible = redondear(subtotal - descuento);
  const montoIva = redondear(baseImponible * (alicuotaIvaEfectiva(p) / 100));

  return {
    subtotal,
    descuento,
    baseImponible,
    montoIva,
    total: redondear(baseImponible + montoIva),
  };
}

// ═══════════════════════════════════════════
// Fábrica y normalización
// ═══════════════════════════════════════════

export interface OpcionesPresupuestoVacio {
  numero?: string | number;
  /** Divisa con la que nace el presupuesto (VES por defecto) */
  moneda?: MonedaPresupuesto;
  /** Último número emitido, para correlacionar la serie */
  ultimoNumero?: string | number;
  ahora?: Date;
  condiciones?: Partial<CondicionesPresupuesto>;
  emisor?: Partial<EmisorPresupuesto>;
  usuario?: string;
}

/** Presupuesto nuevo en blanco, listo para el editor. */
export function presupuestoVacio(opciones: OpcionesPresupuestoVacio = {}): Presupuesto {
  const ahora = opciones.ahora ?? new Date();
  const numero = opciones.numero != null
    ? formatearNumeroPresupuesto(opciones.numero)
    : siguienteNumeroPresupuesto(opciones.ultimoNumero ?? '0000000');
  const condiciones = { ...CONDICIONES_DEFAULT, ...(opciones.condiciones ?? {}) };

  return {
    codigo: '',
    numero,
    estado: 'borrador',
    fechaEmision: ahora.toISOString(),
    fechaTexto: fechaTextoEmision(ahora),
    fechaValidez: fechaValidez(ahora, condiciones.validezDias).toISOString(),
    moneda: opciones.moneda ?? MONEDA_DEFAULT,
    aplicaIva: APLICA_IVA_DEFAULT,
    alicuotaIva: ALICUOTA_IVA_DEFAULT,
    descuentoPorcentaje: 0,
    items: [],
    cliente: null,
    condiciones,
    emisor: { ...emisorPresupuestoPorDefecto(), ...(opciones.emisor ?? {}) },
    mostrarFirmaSello: true,
    mostrarCabeceraPie: true,
    mostrarMarcaAgua: true,
    observaciones: '',
    creadoEn: ahora.toISOString(),
    usuario: opciones.usuario ?? '',
  };
}

/** Renglón vacío para el formulario de items. */
export function itemVacio(): ItemPresupuesto {
  return { descripcion: '', cantidad: 1, precio: 0 };
}

/**
 * Normaliza un documento venido de Mongo.
 *
 * La hoja espera números donde puede haberlos guardado como texto, y las
 * condiciones pueden faltar en presupuestos guardados antes de tenerlas: en ese
 * caso se completan con las de por defecto en vez de dejar la hoja en blanco.
 */
export function normalizarPresupuesto(p: Partial<Presupuesto> | null | undefined): Presupuesto {
  const base = presupuestoVacio();
  if (!p) return base;

  const items = Array.isArray(p.items)
    ? p.items.map((it) => ({
      descripcion: String(it?.descripcion ?? ''),
      cantidad: parsearNumero(it?.cantidad),
      precio: parsearNumero(it?.precio),
    }))
    : [];

  const condiciones: CondicionesPresupuesto = {
    ...CONDICIONES_DEFAULT,
    ...(p.condiciones ?? {}),
    validezDias: parsearNumero(p.condiciones?.validezDias ?? base.condiciones.validezDias),
  };

  const presupuesto: Presupuesto = {
    ...base,
    ...p,
    numero: formatearNumeroPresupuesto(p.numero ?? base.numero),
    fechaEmision: p.fechaEmision || base.fechaEmision,
    fechaTexto: p.fechaTexto || base.fechaTexto,
    fechaValidez: p.fechaValidez || fechaValidez(new Date(p.fechaEmision || base.fechaEmision), condiciones.validezDias).toISOString(),
    moneda: monedaValida(p.moneda),
    // Documentos guardados antes de existir el interruptor: si traen alícuota
    // mayor que cero, el IVA estaba activo; se respeta esa intención.
    aplicaIva: p.aplicaIva ?? (parsearNumero(p.alicuotaIva ?? base.alicuotaIva) > 0),
    alicuotaIva: parsearNumero(p.alicuotaIva ?? base.alicuotaIva),
    descuentoPorcentaje: parsearNumero(p.descuentoPorcentaje ?? base.descuentoPorcentaje),
    mostrarFirmaSello: p.mostrarFirmaSello !== false,
    mostrarCabeceraPie: p.mostrarCabeceraPie !== false,
    mostrarMarcaAgua: p.mostrarMarcaAgua !== false,
    items,
    cliente: p.cliente ?? null,
    condiciones,
    emisor: { ...emisorPresupuestoPorDefecto(), ...(p.emisor ?? {}) },
    observaciones: p.observaciones ?? '',
  };

  // Totales congelados al enviar: se conservan si venían, se recalculan si no.
  presupuesto.totales = p.totales ?? calcularTotalesPresupuesto(presupuesto);
  return presupuesto;
}

// ═══════════════════════════════════════════
// Estados
// ═══════════════════════════════════════════

export function estaEliminado(estado: PresupuestoEstado | undefined): boolean {
  return estado === 'eliminado';
}

/** Solo el borrador se edita: enviado, aprobado, rechazado y anulado son cerrados. */
export function esEditable(estado: PresupuestoEstado | undefined): boolean {
  return !estado || estado === 'borrador';
}

/** Motivo legible por el que un presupuesto no admite más edición. */
export function motivoBloqueo(estado: PresupuestoEstado | undefined): string {
  switch (estado) {
    case 'enviado':
      return 'El presupuesto ya se envió al cliente: su contenido quedó congelado para que coincida con lo que él recibió.';
    case 'aprobado':
      return 'El presupuesto está aprobado por el cliente: para cambiar algo hay que emitir uno nuevo.';
    case 'rechazado':
      return 'El presupuesto fue rechazado: para renegociar hay que emitir uno nuevo.';
    case 'anulado':
      return 'El presupuesto está anulado: es un estado terminal y no admite ediciones.';
    case 'eliminado':
      return 'El presupuesto está eliminado: ya no aparece en el listado y no admite ediciones.';
    default:
      return '';
  }
}

/**
 * Transiciones de estado que ofrece el menú.
 *
 * Enviar es el paso que congela el documento; de ahí en adelante el cliente
 * decide (aprobar o rechazar) y lo que queda cerrado solo puede anularse.
 */
export function transicionesPermitidas(estado: PresupuestoEstado | undefined): PresupuestoEstado[] {
  switch (estado) {
    case 'borrador':
    case undefined:
      return ['enviado', 'eliminado'];
    case 'enviado':
      return ['aprobado', 'rechazado', 'anulado'];
    case 'aprobado':
    case 'rechazado':
      return ['anulado'];
    default:
      return [];
  }
}

/** Estado que se muestra en pantalla: el guardado, o `vencido` si ya pasó. */
export function estadoVisible(p: Presupuesto, ahora = new Date()): PresupuestoEstadoVisible {
  return estaVencido(p, ahora) ? 'vencido' : p.estado;
}

export interface InfoEstadoPresupuesto {
  etiqueta: string;
  color: string;
  icono: string;
}

export function infoEstadoPresupuesto(estado: PresupuestoEstadoVisible | undefined): InfoEstadoPresupuesto {
  switch (estado) {
    case 'enviado':
      return { etiqueta: 'Enviado', color: '#1565c0', icono: 'send' };
    case 'aprobado':
      return { etiqueta: 'Aprobado', color: '#2e7d32', icono: 'verified' };
    case 'rechazado':
      return { etiqueta: 'Rechazado', color: '#c62828', icono: 'thumb_down' };
    case 'vencido':
      return { etiqueta: 'Vencido', color: '#8e24aa', icono: 'schedule' };
    case 'anulado':
      return { etiqueta: 'Anulado', color: '#757575', icono: 'block' };
    case 'eliminado':
      return { etiqueta: 'Eliminado', color: '#757575', icono: 'delete_outline' };
    default:
      return { etiqueta: 'Borrador', color: '#ef6c00', icono: 'edit_note' };
  }
}

// ═══════════════════════════════════════════
// Validación
// ═══════════════════════════════════════════

export interface ProblemaPresupuesto {
  campo: string;
  mensaje: string;
}

/**
 * Lo que impide enviar el presupuesto.
 *
 * Un presupuesto sin cliente no tiene destinatario, sin renglones no cotiza
 * nada, sin validez no se sabe hasta cuándo compromete el precio y sin forma de
 * pago no se puede aceptar: cualquiera de las cuatro bloquea el envío.
 */
export function validarPresupuesto(p: Presupuesto): ProblemaPresupuesto[] {
  const problemas: ProblemaPresupuesto[] = [];

  if (!p.numero || !/^\d{7}$/.test(p.numero)) {
    problemas.push({ campo: 'numero', mensaje: 'El número de presupuesto debe tener 7 dígitos.' });
  }
  if (!p.cliente) {
    problemas.push({ campo: 'cliente', mensaje: 'Seleccione el cliente al que se cotiza.' });
  }
  if (!p.fechaEmision) {
    problemas.push({ campo: 'fechaEmision', mensaje: 'Indique la fecha de emisión.' });
  }
  if (!p.fechaValidez) {
    problemas.push({ campo: 'fechaValidez', mensaje: 'Indique hasta cuándo vale el presupuesto.' });
  } else if (new Date(p.fechaValidez) < new Date(p.fechaEmision)) {
    problemas.push({
      campo: 'fechaValidez',
      mensaje: 'La fecha de validez no puede ser anterior a la emisión.',
    });
  }
  if (parsearNumero(p.condiciones?.validezDias) <= 0) {
    problemas.push({ campo: 'condiciones.validezDias', mensaje: 'La validez debe ser de al menos un día.' });
  }
  if (!p.condiciones?.formaPago?.trim()) {
    problemas.push({ campo: 'condiciones.formaPago', mensaje: 'Indique la forma de pago ofrecida.' });
  }
  if ((p.items ?? []).length === 0) {
    problemas.push({ campo: 'items', mensaje: 'Agregue al menos un renglón al presupuesto.' });
  }
  (p.items ?? []).forEach((it, i) => {
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
  if (calcularTotalesPresupuesto(p).total <= 0) {
    problemas.push({ campo: 'items', mensaje: 'El total del presupuesto debe ser mayor que cero.' });
  }

  return problemas;
}

/** Fecha de validez como se lee en pantalla y en la hoja: "18/11/2026". */
export function fechaValidezCorta(p: Pick<Presupuesto, 'fechaValidez'>): string {
  const fecha = new Date(p.fechaValidez);
  return isNaN(fecha.getTime()) ? '' : fechaCorta(fecha);
}
