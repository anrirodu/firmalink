/**
 * Modelo de la calculadora de FirmaLink.
 *
 * Es una herramienta interna para proyectar el neto que queda de una factura
 * cobrada por depósito bancario. Se entra por el **monto subtotal de la factura**
 * (la base, sin IVA) y el modelo desglosa hacia abajo: el IVA de la alícuota, el
 * **monto total** de la factura (subtotal + IVA), el monto depositado, las
 * **deducciones que el usuario quiera** (cada una en porcentaje o en monto fijo,
 * sobre la base que elija), el saldo disponible, la ganancia y el saldo libre. La
 * tasa de cambio se consulta contra el BCV a través de `POST /v1/api/divisa`.
 *
 * A diferencia de la factura o el presupuesto, un cálculo **no es un documento
 * legal**: es una simulación. Por eso no lleva numeración de control ni emisor;
 * solo un nombre, sus cifras y una huella SHA-256 que permite detectar si el
 * cálculo guardado fue alterado.
 *
 * Las cifras fuente se escriben a mano (monto subtotal, alícuota, depósito,
 * deducciones y ganancia objetivo); las derivadas se autocalculan y solo pasan a
 * ser manuales si el usuario las desbloquea: entonces quedan marcadas como
 * ajuste hasta que las devuelva a la fórmula.
 */

/*
 * Aritmética de bolívares y fechas: se reutilizan las utilidades de la factura
 * (`parsearNumero`, `redondear`, `formatoBs`, `fechaTextoEmision`…) para que un
 * mismo monto se lea igual en todo el ecosistema. No se duplican.
 */
import {
  fechaTextoEmision,
  formatoBs,
  formatoPorcentaje,
  parsearNumero,
  redondear,
} from '../billing/factura.model';

export {
  fechaCorta,
  fechaTextoEmision,
  formatoBs,
  formatoCantidad,
  formatoPorcentaje,
  parsearNumero,
  redondear,
} from '../billing/factura.model';

// ═══════════════════════════════════════════
// Estados
// ═══════════════════════════════════════════

/**
 * Situación de un cálculo dentro de su ciclo de vida.
 *
 * - `borrador`: se está armando, todavía no vale como resultado.
 * - `procesado`: el cálculo está terminado y sus cifras son las que quedaron.
 * - `anulada`: se descarta sin borrarlo; queda visible para la traza.
 * - `eliminado`: borrado lógico (el registro se conserva en la base pero
 *   desaparece del listado, igual que en los demás documentos).
 */
export type CalculoEstado = 'borrador' | 'procesado' | 'anulada' | 'eliminado';

/** Estatus con los que un cálculo puede quedar guardado (sin el borrado lógico). */
export const ESTADOS_CALCULO: CalculoEstado[] = ['borrador', 'procesado', 'anulada'];

/** Cómo se pinta un estatus: rótulo, color e icono. */
export interface InfoEstadoCalculo {
  etiqueta: string;
  color: string;
  icono: string;
}

/** Rótulo, color e icono de cada estatus. */
export function infoEstadoCalculo(estado: CalculoEstado | undefined): InfoEstadoCalculo {
  switch (estado) {
    case 'procesado':
      return { etiqueta: 'Procesado', color: '#1565c0', icono: 'check_circle' };
    case 'anulada':
      return { etiqueta: 'Anulada', color: '#c62828', icono: 'block' };
    case 'eliminado':
      return { etiqueta: 'Borrado', color: '#757575', icono: 'delete_outline' };
    default:
      return { etiqueta: 'Borrador', color: '#ef6c00', icono: 'edit_note' };
  }
}

/** ¿El cálculo admite más ediciones? Procesado y anulada son estados cerrados. */
export function esCalculoEditable(estado: CalculoEstado | undefined): boolean {
  return !estado || estado === 'borrador';
}

/**
 * ¿El estatus está descartado? Un cálculo anulado o borrado ya no cuenta para
 * los totales del listado: sigue en la base para la traza, pero no representa
 * dinero en pie.
 */
export function esEstadoDescartado(estado: CalculoEstado | undefined): boolean {
  return estado === 'anulada' || estado === 'eliminado';
}

/** Motivo legible por el que un cálculo ya no se edita. */
export function motivoBloqueoCalculo(estado: CalculoEstado | undefined): string {
  switch (estado) {
    case 'procesado':
      return 'El cálculo está procesado: sus cifras quedaron cerradas y no admiten ediciones.';
    case 'anulada':
      return 'El cálculo está anulado: es un estado terminal y no admite ediciones.';
    case 'eliminado':
      return 'El cálculo está borrado: ya no aparece en el listado y no admite ediciones.';
    default:
      return '';
  }
}

/** Transiciones de estatus que se ofrecen desde el listado. */
export function transicionesCalculo(estado: CalculoEstado | undefined): CalculoEstado[] {
  if (estado === 'procesado') return ['borrador', 'anulada', 'eliminado'];
  if (estado === 'anulada') return ['procesado', 'eliminado'];
  if (estado === 'eliminado') return [];
  return ['procesado', 'anulada', 'eliminado'];
}

/** Operador de la divisa que se consulta para la tasa. */
export type MonedaDivisa = 'dolar' | 'euro';

// ═══════════════════════════════════════════
// Valores por defecto
// ═══════════════════════════════════════════

/** Alícuota general de IVA (16 %), la que trae el formulario. */
export const IVA_DEFAULT = 16;
/**
 * Retención de IVA que aplica el agente: 75 % del IVA. Del IVA facturado, el
 * agente retiene tres cuartas partes y libera el 25 % restante.
 */
export const IVA_RETENCION_DEFAULT = 75;
/** Complemento para completar el 100 % del IVA: 25 % restante */
export const IVA_RETENCION_25_DEFAULT = 25;
/** Honorarios profesionales no mercantiles (PJD): 5 % del subtotal. */
export const HONORARIOS_DEFAULT = 5;
/** Timbre fiscal: 0,1 % del subtotal. */
export const TIMBRE_FISCAL_DEFAULT = 0.1;
/** Responsabilidad social: 3 % del subtotal. */
export const RESPONSABILIDAD_SOCIAL_DEFAULT = 3;
/** Comisión Negro Primero: 3 % del monto depositado. */
export const NEGRO_PRIMERO_DEFAULT = 3;
/** Ganancia objetivo sobre el saldo disponible. */
export const GANANCIA_DEFAULT = 10;

// ═══════════════════════════════════════════
// Tasa de cambio
// ═══════════════════════════════════════════

/** Tasa de cambio vigente, tal como la devuelve `POST /v1/api/divisa`. */
export interface TasaDivisa {
  /** Divisa consultada: dólar o euro */
  moneda: MonedaDivisa;
  /** Valor en bolívares por unidad de divisa (881,0664) */
  valor: number;
  /** Símbolo tal como lo devuelve el BCV: " USD", " EUR" */
  simbolo: string;
  /** Fecha publicada: "Lunes, 19 Octubre 2026" */
  fecha: string;
  /** Página oficial de la que proviene el valor */
  fuente: string;
  /** Cuándo la trajo el navegador (ISO 8601) */
  actualizadaEn: string;
}

/** Tasa de cambio en blanco, a la espera de consultarse. */
export function tasaVacia(moneda: MonedaDivisa = 'dolar'): TasaDivisa {
  return { moneda, valor: 0, simbolo: '', fecha: '', fuente: '', actualizadaEn: '' };
}

// ═══════════════════════════════════════════
// Deducciones
// ═══════════════════════════════════════════

/** Cómo se expresa una deducción: un porcentaje de una base, o un monto fijo. */
export type TipoDeduccion = 'porcentaje' | 'monto';

/** Sobre qué cifra se aplica el porcentaje de una deducción. */
export type BaseDeduccion = 'depositado' | 'iva' | 'subtotal' | 'total' | 'saldoLibre';

/**
 * Una deducción del cálculo.
 *
 * Las hay de fábrica (Negro Primero, retención de IVA) pero el usuario puede
 * agregar las que quiera: cada una lleva su nombre, cómo se calcula y sobre qué.
 */
export interface Deduccion {
  /** Identificador de la fila, para seguirla mientras se edita (no entra en la huella) */
  id: string;
  /** Nombre con el que se reconoce: "Negro Primero", "Retención de IVA"… */
  nombre: string;
  /** Porcentaje de una base, o monto fijo en bolívares */
  tipo: TipoDeduccion;
  /** El porcentaje (3) o el monto en bolívares (25000), según `tipo` */
  valor: number;
  /** Cifra sobre la que se aplica el porcentaje (se ignora si `tipo` es `monto`) */
  base: BaseDeduccion;
  /** Bolívares que resta esta deducción (derivado) */
  monto: number;
  /** A quién corresponde la retención/deducción */
  origen?: 'cliente' | 'empresa';
}

/** Bases sobre las que se puede aplicar el porcentaje de una deducción. */
export const BASES_DEDUCCION: { valor: BaseDeduccion; etiqueta: string; corta: string }[] = [
  { valor: 'depositado', etiqueta: 'Monto depositado', corta: 'depositado' },
  { valor: 'iva', etiqueta: 'IVA de la factura', corta: 'IVA' },
  { valor: 'subtotal', etiqueta: 'Monto subtotal', corta: 'subtotal' },
  { valor: 'total', etiqueta: 'Monto total de la factura', corta: 'total' },
  { valor: 'saldoLibre', etiqueta: 'Saldo libre', corta: 'saldo libre' },
];

/** Formas de expresar una deducción, para el selector de la fila. */
export const TIPOS_DEDUCCION: { valor: TipoDeduccion; etiqueta: string }[] = [
  { valor: 'porcentaje', etiqueta: '%' },
  { valor: 'monto', etiqueta: 'Bs' },
];

/** Deducciones que se ofrecen como atajo para agregar de un clic. */
export const PRESETS_DEDUCCION: { id: string; etiqueta: string; deduccion: Omit<Deduccion, 'id' | 'monto'> }[] = [
  {
    id: 'retencion-iva',
    etiqueta: 'Retención de IVA · 75 % del IVA',
    deduccion: { nombre: 'Retención de IVA (75%)', tipo: 'porcentaje', valor: IVA_RETENCION_DEFAULT, base: 'iva', origen: 'cliente' },
  },
  {
    id: 'retencion-iva-25',
    etiqueta: 'Retención de IVA · 25 % del IVA',
    deduccion: { nombre: 'Retención de IVA (25%)', tipo: 'porcentaje', valor: IVA_RETENCION_25_DEFAULT, base: 'iva', origen: 'empresa' },
  },
  {
    id: 'honorarios',
    etiqueta: 'Honorarios (PJD) · 5 % del subtotal',
    deduccion: { nombre: 'Honorarios profesionales', tipo: 'porcentaje', valor: HONORARIOS_DEFAULT, base: 'subtotal', origen: 'cliente' },
  },
  {
    id: 'timbre-fiscal',
    etiqueta: 'Timbre Fiscal · 0,1 % del subtotal',
    deduccion: { nombre: 'Timbre Fiscal', tipo: 'porcentaje', valor: TIMBRE_FISCAL_DEFAULT, base: 'subtotal', origen: 'cliente' },
  },
  {
    id: 'responsabilidad-social',
    etiqueta: 'Responsabilidad Social · 3 % del subtotal',
    deduccion: { nombre: 'Responsabilidad Social', tipo: 'porcentaje', valor: RESPONSABILIDAD_SOCIAL_DEFAULT, base: 'subtotal', origen: 'cliente' },
  },
  {
    id: 'negro-primero',
    etiqueta: 'Negro Primero · 3 % del depositado',
    deduccion: { nombre: 'Negro Primero', tipo: 'porcentaje', valor: NEGRO_PRIMERO_DEFAULT, base: 'depositado', origen: 'cliente' },
  },
  {
    id: 'monto-fijo',
    etiqueta: 'Otra deducción · monto fijo en Bs',
    deduccion: { nombre: '', tipo: 'monto', valor: 0, base: 'depositado', origen: 'cliente' },
  },
];

/** ¿El texto corresponde a una base conocida? */
function esBase(valor: unknown): valor is BaseDeduccion {
  return BASES_DEDUCCION.some((b) => b.valor === valor);
}

/** Etiqueta corta de una base ("depositado", "IVA"…). */
export function baseCorta(base: BaseDeduccion): string {
  return BASES_DEDUCCION.find((b) => b.valor === base)?.corta ?? 'depositado';
}

/** Etiqueta completa de una base ("Monto depositado", "IVA de la factura"…). */
export function etiquetaBase(base: BaseDeduccion): string {
  return BASES_DEDUCCION.find((b) => b.valor === base)?.etiqueta ?? 'Monto depositado';
}

/** Contador local: basta para distinguir las filas de una misma sesión. */
let secuencia = 0;

/** Identificador de fila, único dentro de la sesión. */
export function idDeduccion(): string {
  secuencia += 1;
  return `d${Date.now().toString(36)}${secuencia.toString(36)}`;
}

/** Deducción nueva (o completada a partir de un documento guardado). */
export function nuevaDeduccion(parcial: Partial<Deduccion> = {}): Deduccion {
  return {
    id: parcial.id || idDeduccion(),
    nombre: parcial.nombre ?? '',
    tipo: parcial.tipo === 'monto' ? 'monto' : 'porcentaje',
    valor: parsearNumero(parcial.valor ?? 0),
    base: normalizarBase(parcial.base),
    monto: parsearNumero(parcial.monto ?? 0),
    origen: parcial.origen ?? 'cliente',
  };
}

/** Base válida de una deducción; `factura` del modelo viejo pasa a ser `total`. */
function normalizarBase(base: unknown): BaseDeduccion {
  if (base === 'factura') return 'total';
  return esBase(base) ? base : 'depositado';
}

/**
 * Deducciones con las que arranca un cálculo nuevo: las retenciones de siempre
 * (retensión de IVA al 75 %, honorarios PJD, timbre fiscal y responsabilidad
 * social), todas calculadas sobre el subtotal o el IVA. A partir de aquí el
 * usuario agrega, quita o reescribe las que necesite.
 */
export function deduccionesIniciales(): Deduccion[] {
  return [
    nuevaDeduccion({ nombre: 'Retención de IVA (75%)', tipo: 'porcentaje', valor: IVA_RETENCION_DEFAULT, base: 'iva', origen: 'cliente' }),
    nuevaDeduccion({ nombre: 'Honorarios profesionales', tipo: 'porcentaje', valor: HONORARIOS_DEFAULT, base: 'subtotal', origen: 'cliente' }),
    nuevaDeduccion({ nombre: 'Timbre Fiscal', tipo: 'porcentaje', valor: TIMBRE_FISCAL_DEFAULT, base: 'subtotal', origen: 'cliente' }),
    nuevaDeduccion({ nombre: 'Responsabilidad Social', tipo: 'porcentaje', valor: RESPONSABILIDAD_SOCIAL_DEFAULT, base: 'subtotal', origen: 'cliente' }),
  ];
}

/** Nombre legible de una deducción (las sin nombre se describen por su forma). */
export function nombreDeduccion(d: Deduccion): string {
  const nombre = (d?.nombre ?? '').trim();
  if (nombre) return nombre;
  return d?.tipo === 'porcentaje' ? `Deducción ${formatoPorcentaje(d.valor)}` : 'Deducción en Bs';
}

/**
 * Cómo se calcula una deducción, en una línea: "3 % del depositado",
 * "monto fijo en Bs", "75 % del IVA".
 */
export function formulaDeduccion(d: Deduccion): string {
  if (d?.tipo === 'monto') return 'monto fijo';
  return `${formatoPorcentaje(parsearNumero(d?.valor))} del ${baseCorta(d?.base)}`;
}

/** Detalle de una deducción para el tooltip: "3 % del depositado = 25.200,00 Bs". */
export function detalleDeduccion(d: Deduccion): string {
  const monto = `${formatoBs(parsearNumero(d?.monto))} Bs`;
  return d?.tipo === 'monto' ? `Monto fijo: ${monto}` : `${formulaDeduccion(d)} = ${monto}`;
}

/**
 * Resumen de las deducciones de un cálculo, para el listado y los tooltips:
 * "Negro Primero 25.200,00 · Retención de IVA 40.000,00 · +1 más".
 */
export function resumenDeducciones(
  c: Pick<Calculo, 'deducciones'> | null | undefined,
  visibles = 2,
): string {
  const lista = (c?.deducciones ?? []).filter((d) => parsearNumero(d?.monto) > 0);
  if (lista.length === 0) return 'Sin deducciones';
  const partes = lista.slice(0, Math.max(1, visibles)).map((d) => `${nombreDeduccion(d)} ${formatoBs(d.monto)}`);
  const resto = lista.length - partes.length;
  return partes.join(' · ') + (resto > 0 ? ` · +${resto} más` : '');
}

/** ¿Hay alguna deducción con monto? */
export function hayDeducciones(c: Pick<Calculo, 'deducciones'> | null | undefined): boolean {
  return (c?.deducciones ?? []).some((d) => parsearNumero(d?.monto) > 0);
}

// ═══════════════════════════════════════════
// Documento
// ═══════════════════════════════════════════

/**
 * Un cálculo guardado.
 *
 * Las cifras se agrupan por bloque como se leen en pantalla: facturación,
 * bancarios, deducciones y resultados. Las que son fruto de una fórmula también
 * se guardan para que un cálculo abierto meses después muestre exactamente lo
 * que se vio al guardarlo, aunque la fórmula cambie.
 */
export interface Calculo {
  _id?: string;
  /** Código interno correlativo: CALC-000001 */
  codigo: string;
  /** Nombre con el que el usuario reconoce el cálculo */
  nombre: string;
  estado: CalculoEstado;
  /** Fecha de creación en ISO 8601 */
  fechaEmision: string;
  /** Fecha como se imprime: "Caracas 19/Octubre/2026" */
  fechaTexto: string;

  // ── Datos de facturación ──
  /** Monto subtotal de la factura (la base, sin IVA). Cifra fuente. */
  montoSubtotal: number;
  /** Alícuota de IVA aplicada, en porcentaje (16 por defecto) */
  ivaPorcentaje: number;
  /** IVA del subtotal = subtotal × alícuota */
  montoIva: number;
  /** Monto total de la factura = subtotal + IVA */
  montoTotal: number;

  // ── Datos bancarios ──
  /** Monto que entró al banco (por defecto, el subtotal) */
  montoDepositado: number;

  // ── Deducciones ──
  /** Deducciones aplicadas al depósito, las que haya puesto el usuario */
  deducciones: Deduccion[];
  /** Suma de las deducciones aplicadas al depósito */
  subtotalDeducciones: number;

  // ── Resultados ──
  /** Monto depositado menos las deducciones */
  saldoDisponible: number;
  /** Ganancia sobre el saldo disponible, en porcentaje (10 %) */
  gananciaPorcentaje: number;
  /** Ganancia en bolívares */
  ganancia: number;
  /** Saldo disponible menos la ganancia */
  saldoLibre: number;

  /** Tasa de cambio con la que se proyectó el cálculo */
  tasa: TasaDivisa;

  /** Huella SHA-256 del contenido (detecta alteraciones) */
  huella?: string;
  creadoEn?: string;
  actualizadoEn?: string;
  usuario?: string;
  /** Marca del borrado lógico */
  eliminadoEn?: string;
}

// ═══════════════════════════════════════════
// Numeración
// ═══════════════════════════════════════════

/** Código interno correlativo: CALC-000007. */
export function formatearCodigoCalculo(n: number): string {
  return 'CALC-' + String(Math.max(1, Math.trunc(n))).padStart(6, '0');
}

// ═══════════════════════════════════════════
// Cálculos
// ═══════════════════════════════════════════

/** Cifras que salen de una fórmula, no de la mano del usuario. */
export interface CamposDerivados {
  montoIva: number;
  montoTotal: number;
  subtotalDeducciones: number;
  saldoDisponible: number;
  ganancia: number;
  saldoLibre: number;
}

/** Cifras que se autocalculan. */
export const CAMPOS_DERIVADOS: (keyof CamposDerivados)[] = [
  'montoIva',
  'montoTotal',
  'subtotalDeducciones',
  'saldoDisponible',
  'ganancia',
  'saldoLibre',
];

/**
 * Cifras derivadas que el usuario puede desbloquear para escribirlas a mano
 * (cuando el documento real no cuadra con la fórmula). El resto son resultado.
 */
export const CAMPOS_AJUSTABLES: ('montoIva' | 'montoTotal' | 'ganancia')[] = [
  'montoIva',
  'montoTotal',
  'ganancia',
];

/** Campos que sirven de fuente: escribirlos rehace la cadena de abajo. */
export const CAMPOS_BASE: (keyof Calculo)[] = [
  'montoSubtotal',
  'ivaPorcentaje',
  'montoDepositado',
  'gananciaPorcentaje',
];

/** Clave con la que una deducción entra en la lista de ajustes manuales. */
export function claveDeduccion(id: string): string {
  return `deduccion:${id}`;
}

/** Cifra sobre la que se aplica el porcentaje de una deducción. */
export function baseDeduccion(c: Calculo, base: BaseDeduccion): number {
  switch (base) {
    case 'iva':
      return parsearNumero(c.montoIva);
    case 'subtotal':
      return parsearNumero(c.montoSubtotal);
    case 'total':
      return parsearNumero(c.montoTotal);
    case 'saldoLibre':
      return parsearNumero(c.saldoLibre);
    case 'depositado':
    default:
      return parsearNumero(c.montoDepositado);
  }
}

/**
 * Aplica la fórmula del modelo a las cifras fuente y devuelve las derivadas.
 *
 * El orden importa: el subtotal depende del IVA, el monto depositado del
 * subtotal, cada deducción de la cifra sobre la que se calcula, y el saldo libre
 * de la ganancia sobre el saldo disponible. No toca el objeto que recibe.
 */
export function calcularDerivados(c: Calculo): CamposDerivados {
  const r = recalcular(c, new Set(), false);
  return {
    montoIva: r.montoIva,
    montoTotal: r.montoTotal,
    subtotalDeducciones: r.subtotalDeducciones,
    saldoDisponible: r.saldoDisponible,
    ganancia: r.ganancia,
    saldoLibre: r.saldoLibre,
  };
}

/**
 * Recalcula el cálculo completo respetando lo que el usuario ajustó a mano.
 *
 * Todas las cifras se derivan de las fuentes (monto subtotal de la factura,
 * alícuota, monto depositado, deducciones y ganancia objetivo), salvo las que
 * estén en `ajustes`: esas conservan el valor que escribió el usuario. Las
 * deducciones en porcentaje entran por su propia clave (`deduccion:<id>`)
 * cuando el usuario escribe el monto en bolívares directamente.
 *
 * Cada eslabón de la cadena lee el valor ya resuelto del anterior, de modo que
 * un IVA ajustado a mano sí arrastra a las deducciones calculadas sobre él —y no
 * a la cifra que la fórmula habría dado por su cuenta—.
 *
 * El **monto depositado** sigue al **total menos las deducciones** (lo que de
 * verdad abona el banco), salvo que el usuario lo escriba a mano. Por eso las
 * deducciones se resuelven en dos tiempos: primero las que no dependen del
 * depósito (IVA, subtotal, total, monto fijo), luego el depósito, y al final las
 * que se aplican sobre él (p. ej. Negro Primero).
 */
export function recalcular(
  c: Calculo,
  ajustes: ReadonlySet<string> = new Set(),
  depositadoManual = false,
): Calculo {
  const manual = (k: string) => ajustes.has(k);
  const out: Calculo = { ...c };

  if (!manual('montoIva')) {
    out.montoIva = redondear(out.montoSubtotal * (out.ivaPorcentaje / 100));
  }
  if (!manual('montoTotal')) {
    out.montoTotal = redondear(out.montoSubtotal + out.montoIva);
  }

  // Cada deducción se calcula sobre el valor ya resuelto de su base. Las que
  // están en porcentaje pueden llevar el monto escrito a mano; las de monto fijo
  // no admiten ajuste: su cifra ES el valor.
  const calcularDeduccion = (d: Deduccion): Deduccion => {
    if (d.tipo === 'porcentaje' && manual(claveDeduccion(d.id))) return { ...d };
    const monto =
      d.tipo === 'monto'
        ? redondear(parsearNumero(d.valor))
        : redondear(baseDeduccion(out, d.base) * (parsearNumero(d.valor) / 100));
    return { ...d, monto };
  };

  // 1.º Las que no dependen del depósito (IVA, subtotal, total y monto fijo).
  const sobreOtrasBases = (d: Deduccion) => d.tipo === 'monto' || d.base !== 'depositado';
  const resueltas = new Map<string, Deduccion>();
  (out.deducciones ?? []).forEach((d) => {
    if (sobreOtrasBases(d)) resueltas.set(d.id, calcularDeduccion(d));
  });

  // 2.º El depósito: total menos lo ya retenido (salvo que se escriba a mano).
  if (!depositadoManual && !manual('montoDepositado')) {
    const retenido = [...resueltas.values()].reduce((acc, d) => acc + parsearNumero(d.monto), 0);
    out.montoDepositado = redondear(out.montoTotal - retenido);
  }

  // 3.º Las que sí dependen del depósito, ya resuelto.
  out.deducciones = (out.deducciones ?? []).map(
    (d) => resueltas.get(d.id) ?? calcularDeduccion(d),
  );

  out.subtotalDeducciones = redondear(out.deducciones.reduce((acc, d) => acc + parsearNumero(d.monto), 0));
  out.saldoDisponible = redondear(out.montoDepositado);

  if (!manual('ganancia')) {
    out.ganancia = redondear(out.saldoDisponible * (out.gananciaPorcentaje / 100));
  }
  out.saldoLibre = redondear(out.saldoDisponible - out.ganancia);

  return out;
}

/** ¿El campo se autocalcula? */
export function esCampoDerivado(campo: string): campo is keyof CamposDerivados {
  return (CAMPOS_DERIVADOS as string[]).includes(campo);
}

/** ¿La cifra derivada puede escribirse a mano? */
export function esCampoAjustable(campo: string): boolean {
  return (CAMPOS_AJUSTABLES as string[]).includes(campo);
}

/** Equivalente en divisas de un monto en bolívares, según la tasa guardada. */
export function equivalenteDivisa(montoBs: number, tasa: TasaDivisa): number {
  const valor = parsearNumero(tasa?.valor);
  return valor > 0 ? redondear(parsearNumero(montoBs) / valor) : 0;
}

// ═══════════════════════════════════════════
// Fábrica y normalización
// ═══════════════════════════════════════════

/** Cálculo nuevo en blanco, listo para el editor. */
export function calculoVacio(opciones: { ahora?: Date; usuario?: string } = {}): Calculo {
  const ahora = opciones.ahora ?? new Date();
  return {
    codigo: '',
    nombre: '',
    estado: 'borrador',
    fechaEmision: ahora.toISOString(),
    fechaTexto: fechaTextoEmision(ahora),

    montoSubtotal: 0,
    ivaPorcentaje: IVA_DEFAULT,
    montoIva: 0,
    montoTotal: 0,

    montoDepositado: 0,

    deducciones: deduccionesIniciales(),
    subtotalDeducciones: 0,

    saldoDisponible: 0,
    gananciaPorcentaje: GANANCIA_DEFAULT,
    ganancia: 0,
    saldoLibre: 0,

    tasa: tasaVacia(),
    creadoEn: ahora.toISOString(),
    usuario: opciones.usuario ?? '',
  };
}

/**
 * Normaliza un documento venido de Mongo o del almacenamiento local.
 *
 * La base puede guardar números como texto y documentos antiguos pueden no traer
 * la tasa ni las deducciones: la tasa se completa vacía y las deducciones se
 * reconstruyen a partir de los campos fijos del modelo anterior, en vez de dejar
 * el formulario roto.
 *
 * El modelo anterior entraba por el **monto total de la factura** (IVA incluido)
 * y derivaba el subtotal; ahora se entra por el **subtotal** y se deriva el
 * total. Al leer un documento viejo se toma su `montoSubtotal` como base (o se
 * reconstruye desde `montoFactura`) y el total se recalcula.
 */
export function normalizarCalculo(c: Partial<Calculo> | null | undefined): Calculo {
  const base = calculoVacio();
  if (!c) return base;

  const viejo = c as Record<string, unknown>;
  const subtotalLegado = subtotalDesdeDocumentoViejo(viejo, base);

  const calculo: Calculo = {
    ...base,
    ...c,
    codigo: String(c.codigo ?? ''),
    nombre: String(c.nombre ?? ''),
    estado: normalizarEstado(c.estado),
    fechaEmision: c.fechaEmision || base.fechaEmision,
    fechaTexto: c.fechaTexto || base.fechaTexto,

    montoSubtotal: subtotalLegado,
    ivaPorcentaje: parsearNumero(c.ivaPorcentaje ?? base.ivaPorcentaje),
    montoIva: parsearNumero(c.montoIva ?? base.montoIva),
    montoTotal: parsearNumero(c.montoTotal ?? base.montoTotal),

    montoDepositado: parsearNumero(c.montoDepositado ?? base.montoDepositado),

    deducciones: normalizarDeducciones(c),
    subtotalDeducciones: parsearNumero(c.subtotalDeducciones ?? base.subtotalDeducciones),

    saldoDisponible: parsearNumero(c.saldoDisponible ?? base.saldoDisponible),
    gananciaPorcentaje: parsearNumero(c.gananciaPorcentaje ?? base.gananciaPorcentaje),
    ganancia: parsearNumero(c.ganancia ?? base.ganancia),
    saldoLibre: parsearNumero(c.saldoLibre ?? base.saldoLibre),

    tasa: {
      ...base.tasa,
      ...(c.tasa ?? {}),
      moneda: c.tasa?.moneda === 'euro' ? 'euro' : 'dolar',
      valor: parsearNumero(c.tasa?.valor ?? base.tasa.valor),
    },
  };

  // Documentos guardados antes del cambio de modelo: si no traían total propio,
  // se rehace la cadena respetando las cifras que ya venían guardadas (el IVA
  // del documento viejo entra como ajuste, para que el total cuadre con él).
  if (!(parsearNumero(viejo['montoTotal']) > 0)) {
    const ajustes = new Set<string>();
    if (parsearNumero(viejo['montoIva']) > 0) ajustes.add('montoIva');
    return recalcular(calculo, ajustes);
  }

  return calculo;
}

/**
 * Subtotal de un documento, migrando el modelo anterior.
 *
 * Antes la cifra fuente era `montoFactura` (con IVA) y el subtotal su derivado;
 * ahora es al revés. Se prefiere el `montoSubtotal` guardado y, si no lo hay, se
 * reconstruye restando el IVA al monto facturado del documento viejo.
 */
function subtotalDesdeDocumentoViejo(viejo: Record<string, unknown>, base: Calculo): number {
  const subtotalGuardado = parsearNumero(viejo['montoSubtotal'] ?? 0);
  if (subtotalGuardado > 0) return subtotalGuardado;

  const factura = parsearNumero(viejo['montoFactura'] ?? 0);
  if (factura > 0) {
    const iva = parsearNumero(viejo['montoIva'] ?? 0);
    return iva > 0 ? redondear(factura - iva) : factura;
  }

  return base.montoSubtotal;
}

/** Estatus de un documento venido de la base: `activo` del modelo viejo es un borrador. */
function normalizarEstado(estado: CalculoEstado | undefined): CalculoEstado {
  if (estado === 'procesado' || estado === 'anulada' || estado === 'eliminado') return estado;
  return 'borrador';
}

/** Deducciones de un documento guardado, migrando las del modelo anterior. */
export function normalizarDeducciones(c: Partial<Calculo> | null | undefined): Deduccion[] {
  const guardadas = (c as { deducciones?: unknown } | null | undefined)?.deducciones;
  if (Array.isArray(guardadas)) {
    return guardadas.map((d) => nuevaDeduccion(d as Partial<Deduccion>));
  }
  return deduccionesFijasDeAntes(c);
}

/**
 * Reconstruye las deducciones de un cálculo guardado con el modelo anterior,
 * cuando eran dos cifras fijas (Negro Primero y retención de IVA).
 */
function deduccionesFijasDeAntes(c: Partial<Calculo> | null | undefined): Deduccion[] {
  const viejo = (c ?? {}) as Record<string, unknown>;
  const iva = parsearNumero(viejo['montoIva'] ?? 0);
  const depositado = parsearNumero(viejo['montoDepositado'] ?? 0);

  const porcentajeIva = parsearNumero(viejo['ivaRetencionPorcentaje'] ?? IVA_RETENCION_DEFAULT);
  const porcentajeNegro = parsearNumero(viejo['negroPrimeroPorcentaje'] ?? NEGRO_PRIMERO_DEFAULT);

  const retenido = parsearNumero(viejo['montoIvaRetenido'] ?? 0) || redondear(iva * (porcentajeIva / 100));
  const negro = parsearNumero(viejo['negroPrimero'] ?? 0) || redondear(depositado * (porcentajeNegro / 100));

  const lista: Deduccion[] = [];
  if (negro > 0) {
    lista.push(
      nuevaDeduccion({ nombre: 'Negro Primero', tipo: 'porcentaje', valor: porcentajeNegro, base: 'depositado', monto: negro }),
    );
  }
  if (retenido > 0) {
    lista.push(
      nuevaDeduccion({ nombre: 'Retención de IVA', tipo: 'porcentaje', valor: porcentajeIva, base: 'iva', monto: retenido }),
    );
  }
  return lista.length > 0 ? lista : deduccionesIniciales();
}

/** Nombre legible del cálculo: el suyo, o su código si aún no tiene nombre. */
export function nombreCalculo(c: Pick<Calculo, 'nombre' | 'codigo'>): string {
  const nombre = (c.nombre ?? '').trim();
  return nombre || c.codigo || 'Cálculo sin nombre';
}

// ═══════════════════════════════════════════
// Validación
// ═══════════════════════════════════════════

export interface ProblemaCalculo {
  campo: string;
  mensaje: string;
}

/**
 * Lo que impide guardar el cálculo.
 *
 * Solo se exige un nombre (para reconocerlo en el listado) y un monto subtotal
 * mayor que cero: sin cifra no hay nada que calcular. El resto puede quedar en
 * cero mientras el usuario ajusta la simulación.
 */
export function validarCalculo(c: Calculo): ProblemaCalculo[] {
  const problemas: ProblemaCalculo[] = [];

  if (!(c.nombre ?? '').trim()) {
    problemas.push({ campo: 'nombre', mensaje: 'Escriba un nombre para identificar el cálculo.' });
  }
  if (!(parsearNumero(c.montoSubtotal) > 0)) {
    problemas.push({ campo: 'montoSubtotal', mensaje: 'El monto subtotal de la factura debe ser mayor que cero.' });
  }

  return problemas;
}

/** ¿El cálculo fue descartado? */
export function estaEliminado(c: Pick<Calculo, 'estado'> | undefined): boolean {
  return c?.estado === 'eliminado';
}
