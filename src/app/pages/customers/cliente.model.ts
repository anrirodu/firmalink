/**
 * CLIENTES — Modelo de datos, catálogos y reglas de negocio.
 *
 * Segmentación legal, tributaria y comercial del mercado venezolano:
 *
 *  Categoría             Documento                 Particularidad
 *  V  Nacional           Cédula V                  Consumo masivo o profesional independiente
 *  E  Extranjero         Cédula E o pasaporte      Residentes o transeúntes sin cédula local
 *  J  Jurídico           RIF J                     Retenciones de IVA/ISLR según su condición
 *  G  Gobierno / Estado  RIF G                     Pago bajo partida presupuestaria
 *  D  Diplomático        RIF G/J, cédula E o pas.  Facturación exenta de IVA (franquicia)
 *  C  Comunal            RIF C                     Organizaciones del Poder Popular
 *
 * La condición ante el SENIAT (especial, ordinario, formal, exento, exonerado
 * o no contribuyente) es independiente de la categoría: se elige en el perfil
 * fiscal con valores por defecto según la categoría.
 *
 * Todo lo de este archivo es puro (sin Angular): el formulario y el servicio
 * comparten exactamente las mismas reglas.
 */

// ═══════════════════════════════════════════
// Tipos
// ═══════════════════════════════════════════

/** Categoría principal del cliente (segmentación legal). */
export type CategoriaCliente = 'V' | 'E' | 'J' | 'G' | 'D' | 'C';

/** Prefijo del documento de identificación: cédula, pasaporte o RIF. */
export type TipoDocumento = 'V' | 'E' | 'P' | 'J' | 'G' | 'C';

/** Condición del cliente ante el SENIAT. */
export type CondicionFiscal =
  | 'especial'
  | 'ordinario'
  | 'formal'
  | 'exento'
  | 'exonerado'
  | 'no_contribuyente';

/**
 * Estados del cliente.
 *
 * `eliminado` es el borrado lógico: el backend (`ccoleccion`) solo admite
 * Insert/Upsert, así que el registro se conserva para la trazabilidad y deja
 * de aparecer en el listado. No se ofrece en los selectores de estado.
 */
export type EstadoCliente = 'activo' | 'inactivo' | 'suspendido' | 'eliminado';

export type TipoSujetoDiplomatico = 'embajada' | 'consulado' | 'organismo_internacional' | 'funcionario';
export type NivelGobierno = 'nacional' | 'estadal' | 'municipal' | 'descentralizado';
export type TipoOrganizacionComunal = 'consejo_comunal' | 'comuna' | 'eps' | 'otra';
export type Moneda = 'VES' | 'USD' | 'EUR';
export type CondicionPago = 'contado' | 'credito';

/** Pestañas del formulario: cada problema de validación apunta a una. */
export type PestanaCliente = 'identificacion' | 'datos' | 'fiscal' | 'contacto' | 'comercial';

export interface RegistroMercantil {
  oficina: string;
  numero: string;
  tomo: string;
  fecha: string;
}

export interface RepresentanteLegal {
  nombre: string;
  documento: string;
  cargo: string;
  telefono: string;
  correo: string;
}

export interface DireccionFiscal {
  estado: string;
  municipio: string;
  parroquia: string;
  ciudad: string;
  zonaPostal: string;
  domicilio: string;
  referencia: string;
}

export interface DatosBancarios {
  /** Código SUDEBAN de 4 dígitos (las cuentas comienzan por él) */
  banco: string;
  tipoCuenta: '' | 'corriente' | 'ahorro';
  numeroCuenta: string;
  telefonoPagoMovil: string;
}

export interface Cliente {
  _id?: string;
  /** Código interno correlativo: CLI-000001 */
  codigo: string;
  categoria: CategoriaCliente;
  estado: EstadoCliente;

  // — Identificación —
  tipoDocumento: TipoDocumento;
  /** Normalizado al guardar: solo dígitos (cédula/RIF) o alfanumérico (pasaporte) */
  numeroDocumento: string;
  /** Dígito verificador del RIF (J, G, C). En V/E se calcula; en P no aplica. */
  digitoVerificador: string;
  /** Clave única del cliente: V-12345678, J-00012345, P-AB123456 */
  identificacion: string;
  /** RIF completo (J-12345678-9). Vacío si no aplica (pasaporte). */
  rif: string;
  /** País emisor del pasaporte */
  paisEmisor: string;

  // — Persona natural (V, E y funcionario diplomático) —
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: '' | 'F' | 'M';
  estadoCivil: string;
  nacionalidad: string;
  profesion: string;
  condicionMigratoria: '' | 'residente' | 'transeunte';

  // — Organización (J, G, C y misión diplomática) —
  razonSocial: string;
  nombreComercial: string;
  actividadEconomica: string;
  registroMercantil: RegistroMercantil;
  nivelGobierno: '' | NivelGobierno;
  enteAdscripcion: string;
  unidadAdministradora: string;
  partidaPresupuestaria: string;
  tipoSujetoDiplomatico: '' | TipoSujetoDiplomatico;
  paisRepresentado: string;
  credencialDiplomatica: string;
  vencimientoCredencial: string;
  tipoOrganizacionComunal: '' | TipoOrganizacionComunal;
  registroComunal: string;
  representante: RepresentanteLegal;

  // — Perfil fiscal (SENIAT) —
  condicionFiscal: CondicionFiscal;
  agenteRetencionIva: boolean;
  /** 75 (regla general) o 100; 0 si no retiene */
  porcentajeRetencionIva: number;
  agenteRetencionIslr: boolean;
  exentoIgtf: boolean;
  /** Ley, decreto o Gaceta que sustenta la exención/exoneración/franquicia */
  baseLegalBeneficio: string;
  /** Fin de vigencia de la exoneración */
  vigenciaBeneficio: string;

  // — Contacto y domicilio fiscal —
  correo: string;
  correoFacturacion: string;
  telefonoMovil: string;
  telefonoFijo: string;
  sitioWeb: string;
  direccion: DireccionFiscal;

  // — Condiciones comerciales —
  moneda: Moneda;
  formaPago: string;
  condicionPago: CondicionPago;
  diasCredito: number | null;
  limiteCredito: number | null;
  ejecutivo: string;
  origen: string;
  bancario: DatosBancarios;
  observaciones: string;

  // — Auditoría —
  creadoPorCedula?: string;
  creadoPorNombre?: string;
  creadoEn?: string;
  actualizadoPorCedula?: string;
  actualizadoPorNombre?: string;
  actualizadoEn?: string;
  eliminado?: boolean;
  eliminadoEn?: string;
  eliminadoPorCedula?: string;
  eliminadoPorNombre?: string;
  restauradoEn?: string;
  __v?: number;
}

// ═══════════════════════════════════════════
// Catálogos
// ═══════════════════════════════════════════

export interface Opcion<T extends string = string> {
  valor: T;
  etiqueta: string;
}

export interface CategoriaInfo {
  valor: CategoriaCliente;
  etiqueta: string;
  /** Etiqueta corta para chips y filtros */
  corta: string;
  descripcion: string;
  icono: string;
  /** Prefijos de documento admitidos */
  documentos: readonly TipoDocumento[];
}

export const CATEGORIAS: readonly CategoriaInfo[] = [
  {
    valor: 'V',
    etiqueta: 'Natural venezolano',
    corta: 'Nacional',
    descripcion: 'Persona natural con cédula V: consumo masivo o profesional independiente.',
    icono: 'person',
    documentos: ['V'],
  },
  {
    valor: 'E',
    etiqueta: 'Extranjero',
    corta: 'Extranjero',
    descripcion: 'Persona natural con cédula E o pasaporte: residentes o transeúntes.',
    icono: 'public',
    documentos: ['E', 'P'],
  },
  {
    valor: 'J',
    etiqueta: 'Jurídico (empresa)',
    corta: 'Jurídico',
    descripcion: 'Empresas y comercios con RIF J. Retienen IVA/ISLR según su condición.',
    icono: 'business',
    documentos: ['J'],
  },
  {
    valor: 'G',
    etiqueta: 'Gobierno / Estado',
    corta: 'Gobierno',
    descripcion: 'Ministerios, gobernaciones, alcaldías y entes públicos. Pago por partida presupuestaria.',
    icono: 'account_balance',
    documentos: ['G'],
  },
  {
    valor: 'D',
    etiqueta: 'Diplomático',
    corta: 'Diplomático',
    descripcion: 'Embajadas, consulados, organismos internacionales y funcionarios acreditados.',
    icono: 'flag',
    documentos: ['G', 'J', 'E', 'P'],
  },
  {
    valor: 'C',
    etiqueta: 'Comunal (Poder Popular)',
    corta: 'Comunal',
    descripcion: 'Consejos comunales, comunas y organizaciones del Poder Popular (RIF C).',
    icono: 'groups',
    documentos: ['C'],
  },
];

export const TIPOS_DOCUMENTO: Record<TipoDocumento, string> = {
  V: 'V — Cédula venezolana',
  E: 'E — Cédula de extranjero',
  P: 'P — Pasaporte',
  J: 'J — RIF persona jurídica',
  G: 'G — RIF gobierno / ente público',
  C: 'C — RIF comunal',
};

export interface CondicionInfo {
  valor: CondicionFiscal;
  etiqueta: string;
  descripcion: string;
  icono: string;
}

export const CONDICIONES_FISCALES: readonly CondicionInfo[] = [
  {
    valor: 'especial',
    etiqueta: 'Contribuyente especial',
    descripcion: 'Calificado por el SENIAT como sujeto pasivo especial: agente de retención de IVA.',
    icono: 'verified',
  },
  {
    valor: 'ordinario',
    etiqueta: 'Contribuyente ordinario',
    descripcion: 'Registrado y declarante regular de IVA, sin la calificación de especial.',
    icono: 'receipt_long',
  },
  {
    valor: 'formal',
    etiqueta: 'Contribuyente formal',
    descripcion: 'Sujeto de bajos ingresos que solo cumple deberes formales del IVA.',
    icono: 'description',
  },
  {
    valor: 'exento',
    etiqueta: 'Exento',
    descripcion: 'No paga ciertos tributos por disposición de ley (fundaciones, asociaciones sin fines de lucro, franquicia diplomática).',
    icono: 'shield',
  },
  {
    valor: 'exonerado',
    etiqueta: 'Exonerado',
    descripcion: 'Dispensado del pago por decreto del Ejecutivo, con vigencia limitada (p. ej. sector agropecuario).',
    icono: 'event_available',
  },
  {
    valor: 'no_contribuyente',
    etiqueta: 'No contribuyente',
    descripcion: 'Consumidor final sin obligaciones de IVA: se factura con su cédula o pasaporte.',
    icono: 'person_outline',
  },
];

export interface EstadoInfo {
  valor: Exclude<EstadoCliente, 'eliminado'>;
  etiqueta: string;
  icono: string;
}

/** Estados elegibles en la interfaz (el borrado lógico se hace con "Eliminar"). */
export const ESTADOS_CLIENTE: readonly EstadoInfo[] = [
  { valor: 'activo', etiqueta: 'Activo', icono: 'check_circle' },
  { valor: 'inactivo', etiqueta: 'Inactivo', icono: 'pause_circle' },
  { valor: 'suspendido', etiqueta: 'Suspendido', icono: 'block' },
];

export const TIPOS_SUJETO_DIPLOMATICO: readonly Opcion<TipoSujetoDiplomatico>[] = [
  { valor: 'embajada', etiqueta: 'Embajada o misión diplomática' },
  { valor: 'consulado', etiqueta: 'Consulado' },
  { valor: 'organismo_internacional', etiqueta: 'Organismo internacional (ONU, OEA…)' },
  { valor: 'funcionario', etiqueta: 'Funcionario extranjero acreditado' },
];

export const NIVELES_GOBIERNO: readonly Opcion<NivelGobierno>[] = [
  { valor: 'nacional', etiqueta: 'Nacional (ministerios y adscritos)' },
  { valor: 'estadal', etiqueta: 'Estadal (gobernaciones)' },
  { valor: 'municipal', etiqueta: 'Municipal (alcaldías)' },
  { valor: 'descentralizado', etiqueta: 'Descentralizado (institutos y empresas del Estado)' },
];

export const TIPOS_ORGANIZACION_COMUNAL: readonly Opcion<TipoOrganizacionComunal>[] = [
  { valor: 'consejo_comunal', etiqueta: 'Consejo comunal' },
  { valor: 'comuna', etiqueta: 'Comuna' },
  { valor: 'eps', etiqueta: 'Empresa de propiedad social (EPS)' },
  { valor: 'otra', etiqueta: 'Otra organización del Poder Popular' },
];

/** Entidades federales de Venezuela (domicilio fiscal) */
export const ESTADOS_VENEZUELA: readonly string[] = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Distrito Capital',
  'Falcón',
  'Guárico',
  'La Guaira',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Yaracuy',
  'Zulia',
  'Dependencias Federales',
];

export const ESTADOS_CIVILES: readonly string[] = [
  'Soltero(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viudo(a)',
  'Unión estable de hecho',
];

export const MONEDAS: readonly Opcion<Moneda>[] = [
  { valor: 'VES', etiqueta: 'Bolívares (Bs.)' },
  { valor: 'USD', etiqueta: 'Dólares (USD)' },
  { valor: 'EUR', etiqueta: 'Euros (EUR)' },
];

export const FORMAS_PAGO: readonly Opcion[] = [
  { valor: 'transferencia', etiqueta: 'Transferencia bancaria (Bs.)' },
  { valor: 'pago_movil', etiqueta: 'Pago móvil' },
  { valor: 'punto_venta', etiqueta: 'Punto de venta' },
  { valor: 'efectivo_bs', etiqueta: 'Efectivo (Bs.)' },
  { valor: 'divisas_efectivo', etiqueta: 'Divisas en efectivo' },
  { valor: 'transferencia_divisas', etiqueta: 'Transferencia en divisas' },
  { valor: 'cheque', etiqueta: 'Cheque' },
];

export const ORIGENES_CLIENTE: readonly Opcion[] = [
  { valor: 'referido', etiqueta: 'Referido' },
  { valor: 'web', etiqueta: 'Sitio web' },
  { valor: 'redes', etiqueta: 'Redes sociales' },
  { valor: 'visita', etiqueta: 'Visita comercial' },
  { valor: 'licitacion', etiqueta: 'Licitación / concurso' },
  { valor: 'contacto_directo', etiqueta: 'Llamada o correo' },
  { valor: 'otro', etiqueta: 'Otro' },
];

/**
 * Bancos por código SUDEBAN (los 4 primeros dígitos de toda cuenta).
 * Catálogo de referencia: verifique altas, fusiones o cambios de nombre.
 */
export const BANCOS: readonly Opcion[] = [
  { valor: '0102', etiqueta: 'Banco de Venezuela' },
  { valor: '0104', etiqueta: 'Venezolano de Crédito' },
  { valor: '0105', etiqueta: 'Mercantil' },
  { valor: '0108', etiqueta: 'BBVA Provincial' },
  { valor: '0114', etiqueta: 'Bancaribe' },
  { valor: '0115', etiqueta: 'Banco Exterior' },
  { valor: '0128', etiqueta: 'Banco Caroní' },
  { valor: '0134', etiqueta: 'Banesco' },
  { valor: '0137', etiqueta: 'Sofitasa' },
  { valor: '0138', etiqueta: 'Banco Plaza' },
  { valor: '0146', etiqueta: 'Bangente' },
  { valor: '0151', etiqueta: 'BFC Banco Fondo Común' },
  { valor: '0156', etiqueta: '100% Banco' },
  { valor: '0157', etiqueta: 'DelSur' },
  { valor: '0163', etiqueta: 'Banco del Tesoro' },
  { valor: '0166', etiqueta: 'Banco Agrícola de Venezuela' },
  { valor: '0168', etiqueta: 'Bancrecer' },
  { valor: '0169', etiqueta: 'R4 Banco Microfinanciero' },
  { valor: '0171', etiqueta: 'Banco Activo' },
  { valor: '0172', etiqueta: 'Bancamiga' },
  { valor: '0173', etiqueta: 'Banco Internacional de Desarrollo' },
  { valor: '0174', etiqueta: 'Banplus' },
  { valor: '0175', etiqueta: 'Banco Digital de los Trabajadores' },
  { valor: '0177', etiqueta: 'BANFANB' },
  { valor: '0178', etiqueta: 'N58 Banco Digital' },
  { valor: '0191', etiqueta: 'BNC Banco Nacional de Crédito' },
];

// ═══════════════════════════════════════════
// Consultas sobre catálogos
// ═══════════════════════════════════════════

export function infoCategoria(categoria: string | null | undefined): CategoriaInfo | undefined {
  return CATEGORIAS.find((c) => c.valor === categoria);
}

export function infoCondicion(condicion: string | null | undefined): CondicionInfo | undefined {
  return CONDICIONES_FISCALES.find((c) => c.valor === condicion);
}

export function etiquetaOpcion(opciones: readonly Opcion[], valor: string | null | undefined): string {
  return opciones.find((o) => o.valor === valor)?.etiqueta ?? '';
}

/** ¿El cliente es una persona natural? (los funcionarios diplomáticos lo son) */
export function esPersona(c: Pick<Cliente, 'categoria' | 'tipoSujetoDiplomatico'>): boolean {
  return (
    c.categoria === 'V' ||
    c.categoria === 'E' ||
    (c.categoria === 'D' && c.tipoSujetoDiplomatico === 'funcionario')
  );
}

/** ¿El tipo de documento es un RIF de organización con dígito capturado? */
export function esRifOrganizacion(tipo: string | null | undefined): boolean {
  return tipo === 'J' || tipo === 'G' || tipo === 'C';
}

/** Rótulo del nombre de la organización según la categoría */
export function etiquetaRazonSocial(categoria: CategoriaCliente): string {
  switch (categoria) {
    case 'G':
      return 'Nombre del ente u organismo';
    case 'D':
      return 'Nombre de la misión u organismo';
    case 'C':
      return 'Nombre de la organización';
    default:
      return 'Razón social';
  }
}

/** ¿El cliente fue eliminado? (estado o bandera de borrado lógico) */
export function estaEliminado(c: Partial<Cliente> | null | undefined): boolean {
  return c?.estado === 'eliminado' || c?.eliminado === true;
}

// ═══════════════════════════════════════════
// Documento de identidad y RIF (módulo 11 del SENIAT)
// ═══════════════════════════════════════════

export function soloDigitos(valor: unknown): string {
  return String(valor ?? '').replace(/\D+/g, '');
}

export function normalizarPasaporte(valor: unknown): string {
  return String(valor ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

/**
 * Valor de la letra en el módulo 11 (ya multiplicado por su peso, 4).
 *
 * El RIF comunal (C) no tiene un valor consensuado en las fuentes públicas:
 * unas lo igualan a J (12) y otras le asignan 24. Se aceptan ambos candidatos
 * para no rechazar RIF válidos; aun así se detectan ~8 de cada 10 errores de
 * transcripción. Si el SENIAT confirma uno, basta con dejar ese valor.
 */
const PESO_LETRA_RIF: Record<string, readonly number[]> = {
  V: [4],
  E: [8],
  J: [12],
  P: [16],
  G: [20],
  C: [12, 24],
};

const PESOS_DIGITOS_RIF = [3, 2, 7, 6, 5, 4, 3, 2] as const;

/**
 * Dígitos verificadores admitidos para un RIF.
 * Ej.: J-00002967 → [9]; G-20000110 → [0]. Devuelve [] si no se puede calcular.
 */
export function digitosVerificadoresRif(tipo: string, numero: string): number[] {
  const pesoLetra = PESO_LETRA_RIF[String(tipo ?? '').toUpperCase()];
  const cuerpo = soloDigitos(numero);
  if (!pesoLetra || !cuerpo || cuerpo.length > 8) {
    return [];
  }

  const ocho = cuerpo.padStart(8, '0');
  const suma = PESOS_DIGITOS_RIF.reduce((acc, peso, i) => acc + peso * Number(ocho[i]), 0);
  const candidatos = pesoLetra.map((base) => {
    const digito = 11 - ((base + suma) % 11);
    return digito >= 10 ? 0 : digito;
  });
  return [...new Set(candidatos)];
}

export function rifValido(tipo: string, numero: string, digito: string): boolean {
  if (!/^\d$/.test(String(digito ?? ''))) {
    return false;
  }
  return digitosVerificadoresRif(tipo, numero).includes(Number(digito));
}

/** Clave única del cliente: TIPO-NUMERO (cédula/RIF a 8 dígitos, pasaporte en mayúsculas). */
export function construirIdentificacion(tipo: TipoDocumento | '', numero: string): string {
  if (!tipo) {
    return '';
  }
  if (tipo === 'P') {
    const pasaporte = normalizarPasaporte(numero);
    return pasaporte ? `P-${pasaporte}` : '';
  }
  const digitos = soloDigitos(numero);
  return digitos ? `${tipo}-${digitos.padStart(8, '0')}` : '';
}

/**
 * RIF completo del cliente:
 * - J, G, C: con el dígito verificador capturado (validado aparte).
 * - V, E: se deriva de la cédula (el RIF de una persona es su cédula + dígito).
 * - P: no aplica (el pasaporte no genera un RIF deducible).
 */
export function construirRif(tipo: TipoDocumento | '', numero: string, digito: string): string {
  const digitos = soloDigitos(numero);
  if (!tipo || !digitos || digitos.length > 8) {
    return '';
  }
  const ocho = digitos.padStart(8, '0');

  if (tipo === 'V' || tipo === 'E') {
    const [calculado] = digitosVerificadoresRif(tipo, digitos);
    return calculado === undefined ? '' : `${tipo}-${ocho}-${calculado}`;
  }
  if (esRifOrganizacion(tipo) && /^\d$/.test(digito)) {
    return `${tipo}-${ocho}-${digito}`;
  }
  return '';
}

/**
 * Interpreta un documento pegado o escrito completo: "J-12345678-9",
 * "V12.345.678", "j123456789". Devuelve null si no tiene ese formato.
 */
export function interpretarDocumento(
  texto: string,
): { tipo: TipoDocumento; numero: string; digito: string } | null {
  const limpio = String(texto ?? '')
    .toUpperCase()
    .replace(/[\s.]/g, '');
  const partes = /^([VEJGC])-?(\d{1,8})(?:-?(\d))?$/.exec(limpio);
  if (!partes) {
    return null;
  }
  const tipo = partes[1] as TipoDocumento;
  const numero = partes[2];
  const digito = partes[3] ?? '';
  // "J123456789" sin guion: los 9 dígitos son número + dígito verificador
  if (esRifOrganizacion(tipo) && !digito && numero.length === 9) {
    return { tipo, numero: numero.slice(0, 8), digito: numero.slice(8) };
  }
  return { tipo, numero, digito };
}

/** 12345678 → 12.345.678 */
export function formatearCedula(numero: string): string {
  const digitos = soloDigitos(numero).replace(/^0+(?=\d)/, '');
  return digitos.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Documento para mostrar: V-12.345.678, J-12345678-9, P-AB123456 */
export function formatearDocumento(
  c: Pick<Cliente, 'tipoDocumento' | 'numeroDocumento' | 'digitoVerificador'>,
): string {
  if (!c?.tipoDocumento || !c.numeroDocumento) {
    return '';
  }
  if (c.tipoDocumento === 'V' || c.tipoDocumento === 'E') {
    return `${c.tipoDocumento}-${formatearCedula(c.numeroDocumento)}`;
  }
  if (c.tipoDocumento === 'P') {
    return `P-${normalizarPasaporte(c.numeroDocumento)}`;
  }
  const ocho = soloDigitos(c.numeroDocumento).padStart(8, '0');
  return c.digitoVerificador
    ? `${c.tipoDocumento}-${ocho}-${c.digitoVerificador}`
    : `${c.tipoDocumento}-${ocho}`;
}

// ═══════════════════════════════════════════
// Nombre visible y código correlativo
// ═══════════════════════════════════════════

/** Nombre y apellido de la persona, o razón social de la organización. */
export function nombreCliente(c: Partial<Cliente> | null | undefined): string {
  if (!c) {
    return '';
  }
  const persona = esPersona({
    categoria: c.categoria ?? 'V',
    tipoSujetoDiplomatico: c.tipoSujetoDiplomatico ?? '',
  });
  const nombre = persona
    ? `${c.nombres ?? ''} ${c.apellidos ?? ''}`.trim()
    : (c.razonSocial ?? '').trim();
  return nombre || c.nombreComercial?.trim() || c.identificacion || '(Cliente sin nombre)';
}

export const PREFIJO_CODIGO_CLIENTE = 'CLI-';

export function generarCodigoCliente(consecutivo: number): string {
  return `${PREFIJO_CODIGO_CLIENTE}${String(consecutivo).padStart(6, '0')}`;
}

export function extraerConsecutivoCliente(codigo: string | null | undefined): number {
  const partes = /^CLI-(\d+)$/.exec(String(codigo ?? ''));
  return partes ? parseInt(partes[1], 10) : 0;
}

/**
 * El código viaja como parámetro `$0` de la función del backend, que lo
 * sustituye literalmente dentro del JSON de la consulta: solo se admiten
 * códigos con el formato exacto para descartar cualquier inyección.
 */
export function codigoClienteValido(codigo: string | null | undefined): boolean {
  return /^CLI-\d{6,9}$/.test(String(codigo ?? ''));
}

// ═══════════════════════════════════════════
// Construcción y normalización
// ═══════════════════════════════════════════

type PerfilFiscal = Pick<
  Cliente,
  'condicionFiscal' | 'agenteRetencionIva' | 'porcentajeRetencionIva' | 'agenteRetencionIslr' | 'exentoIgtf'
>;

/**
 * Perfil fiscal sugerido por categoría (editable en el formulario):
 * - J: contribuyente ordinario, agente de retención de ISLR.
 * - G: entes públicos retienen IVA (75 %) e ISLR y están exentos de IGTF
 *      (art. 8, num. 1 y 3 de la Ley de IGTF).
 * - D: exento de IVA por franquicia diplomática; la exención de IGTF del
 *      art. 8, num. 8 solo cubre operaciones en bolívares, por eso no se marca.
 * - V, E, C: no contribuyentes.
 */
export function perfilFiscalPorDefecto(categoria: CategoriaCliente): PerfilFiscal {
  switch (categoria) {
    case 'J':
      return {
        condicionFiscal: 'ordinario',
        agenteRetencionIva: false,
        porcentajeRetencionIva: 0,
        agenteRetencionIslr: true,
        exentoIgtf: false,
      };
    case 'G':
      return {
        condicionFiscal: 'no_contribuyente',
        agenteRetencionIva: true,
        porcentajeRetencionIva: 75,
        agenteRetencionIslr: true,
        exentoIgtf: true,
      };
    case 'D':
      return {
        condicionFiscal: 'exento',
        agenteRetencionIva: false,
        porcentajeRetencionIva: 0,
        agenteRetencionIslr: false,
        exentoIgtf: false,
      };
    default:
      return {
        condicionFiscal: 'no_contribuyente',
        agenteRetencionIva: false,
        porcentajeRetencionIva: 0,
        agenteRetencionIslr: false,
        exentoIgtf: false,
      };
  }
}

/** ¿El perfil fiscal del cliente sigue siendo el sugerido para su categoría? */
export function perfilFiscalSinCambios(c: Cliente): boolean {
  const sugerido = perfilFiscalPorDefecto(c.categoria);
  return (Object.keys(sugerido) as (keyof PerfilFiscal)[]).every((k) => c[k] === sugerido[k]);
}

export function clienteVacio(categoria: CategoriaCliente = 'V'): Cliente {
  return {
    codigo: '',
    categoria,
    estado: 'activo',
    tipoDocumento: infoCategoria(categoria)?.documentos[0] ?? 'V',
    numeroDocumento: '',
    digitoVerificador: '',
    identificacion: '',
    rif: '',
    paisEmisor: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    sexo: '',
    estadoCivil: '',
    nacionalidad: categoria === 'V' ? 'Venezolana' : '',
    profesion: '',
    condicionMigratoria: '',
    razonSocial: '',
    nombreComercial: '',
    actividadEconomica: '',
    registroMercantil: { oficina: '', numero: '', tomo: '', fecha: '' },
    nivelGobierno: '',
    enteAdscripcion: '',
    unidadAdministradora: '',
    partidaPresupuestaria: '',
    tipoSujetoDiplomatico: '',
    paisRepresentado: '',
    credencialDiplomatica: '',
    vencimientoCredencial: '',
    tipoOrganizacionComunal: '',
    registroComunal: '',
    representante: { nombre: '', documento: '', cargo: '', telefono: '', correo: '' },
    ...perfilFiscalPorDefecto(categoria),
    baseLegalBeneficio: '',
    vigenciaBeneficio: '',
    correo: '',
    correoFacturacion: '',
    telefonoMovil: '',
    telefonoFijo: '',
    sitioWeb: '',
    direccion: direccionVacia(),
    moneda: 'VES',
    formaPago: '',
    condicionPago: 'contado',
    diasCredito: null,
    limiteCredito: null,
    ejecutivo: '',
    origen: '',
    bancario: { banco: '', tipoCuenta: '', numeroCuenta: '', telefonoPagoMovil: '' },
    observaciones: '',
  };
}

/** Domicilio fiscal vacío, con los campos en el orden en que se muestran. */
export function direccionVacia(): DireccionFiscal {
  return {
    estado: '',
    municipio: '',
    parroquia: '',
    ciudad: '',
    zonaPostal: '',
    domicilio: '',
    referencia: '',
  };
}

/** Campos válidos del domicilio; cualquier otra clave viene de datos heredados. */
const CLAVES_DIRECCION: readonly (keyof DireccionFiscal)[] = [
  'estado',
  'municipio',
  'parroquia',
  'ciudad',
  'zonaPostal',
  'domicilio',
  'referencia',
];

/**
 * Domicilio fiscal tolerante con los datos heredados.
 *
 * Los registros antiguos guardaban `direccion` como una cadena suelta
 * ("Av. Sucre, Caracas"): al extenderse sobre un objeto, cada letra quedaba
 * como clave numérica y el domicilio real se perdía. Aquí esa cadena pasa a
 * ser el domicilio y se descarta todo lo que no sea un campo del modelo.
 */
export function normalizarDireccion(valor: unknown): DireccionFiscal {
  const direccion = direccionVacia();
  if (typeof valor === 'string') {
    direccion.domicilio = valor.trim();
    return direccion;
  }
  if (!valor || typeof valor !== 'object') {
    return direccion;
  }
  const origen = valor as Record<string, unknown>;
  for (const clave of CLAVES_DIRECCION) {
    const texto = origen[clave];
    if (typeof texto === 'string') {
      direccion[clave] = texto.trim();
    }
  }
  return direccion;
}

/**
 * Completa un documento leído del servidor con todos los campos del modelo.
 * Evita que el formulario falle con subdocumentos ausentes (`direccion`,
 * `representante`…) en registros creados por versiones anteriores.
 */
export function normalizarCliente(parcial: Partial<Cliente> | null | undefined): Cliente {
  const categoria = infoCategoria(parcial?.categoria) ? parcial!.categoria! : 'V';
  const base = clienteVacio(categoria);
  const p = parcial ?? {};
  return {
    ...base,
    ...p,
    registroMercantil: { ...base.registroMercantil, ...(p.registroMercantil ?? {}) },
    representante: { ...base.representante, ...(p.representante ?? {}) },
    direccion: normalizarDireccion(p.direccion),
    bancario: { ...base.bancario, ...(p.bancario ?? {}) },
  };
}

// ═══════════════════════════════════════════
// Copia del cliente para un documento (acuerdo o factura)
// ═══════════════════════════════════════════

/**
 * Copia congelada de los datos del cliente que viajan dentro de un documento.
 *
 * No es un clon del cliente completo: solo lo que el instrumento imprime y
 * declara (identificación, nombre, domicilio y el perfil fiscal con el que se
 * factura o se pactan las retenciones). Se copia al elegir el cliente y solo se
 * refresca si el usuario lo pide de forma explícita, para que un documento ya
 * suscrito no cambie de contenido bajo los pies.
 */
export interface ClienteDocumento {
  /** Código interno del cliente (CLI-000001): el vínculo con su ficha */
  codigo: string;
  categoria: CategoriaCliente;
  /** Clave única: V-11350296, J-00002967, P-AB123456 */
  identificacion: string;
  /** RIF completo (J-00002967-9). Vacío si no aplica (pasaporte). */
  rif: string;
  nombre: string;
  condicionFiscal: CondicionFiscal;
  agenteRetencionIva: boolean;
  /** 75 (regla general) o 100; 0 si no retiene */
  porcentajeRetencionIva: number;
  agenteRetencionIslr: boolean;
  exentoIgtf: boolean;
  correo: string;
  telefono: string;
  /** Domicilio fiscal en una sola línea, como se imprime en el documento */
  direccion: string;
  /** Sello del momento en que se copiaron los datos (ISO 8601) */
  copiadoEn: string;
}

/** Arma la copia del cliente que se guarda dentro de un documento. */
export function snapshotCliente(c: Cliente, ahora: Date = new Date()): ClienteDocumento {
  return {
    codigo: c.codigo,
    categoria: c.categoria,
    identificacion: c.identificacion,
    rif: c.rif,
    nombre: nombreCliente(c),
    condicionFiscal: c.condicionFiscal,
    agenteRetencionIva: c.agenteRetencionIva,
    porcentajeRetencionIva: c.porcentajeRetencionIva,
    agenteRetencionIslr: c.agenteRetencionIslr,
    exentoIgtf: c.exentoIgtf,
    // El documento se emite: se prefiere el correo de facturación
    correo: c.correoFacturacion || c.correo,
    telefono: c.telefonoMovil || c.telefonoFijo,
    direccion: direccionEnLinea(c),
    copiadoEn: ahora.toISOString(),
  };
}

/**
 * Domicilio fiscal en una línea: el orden va de lo particular a lo general
 * (domicilio, parroquia, municipio, estado) y cierra con la zona postal.
 */
export function direccionEnLinea(c: Cliente): string {
  const d = normalizarDireccion(c.direccion);
  return [d.domicilio, d.parroquia, d.municipio, d.estado, d.zonaPostal ? `Z.P. ${d.zonaPostal}` : '']
    .map((parte) => (parte ?? '').trim())
    .filter(Boolean)
    .join(', ');
}

/** Recorta los espacios de todas las cadenas (también en subdocumentos). */
function recortarTextos<T>(valor: T): T {
  if (typeof valor === 'string') {
    return valor.trim() as T;
  }
  if (Array.isArray(valor)) {
    return valor.map((v) => recortarTextos(v)) as T;
  }
  if (valor && typeof valor === 'object') {
    const salida: Record<string, unknown> = {};
    for (const [clave, v] of Object.entries(valor as Record<string, unknown>)) {
      salida[clave] = recortarTextos(v);
    }
    return salida as T;
  }
  return valor;
}

/**
 * Prepara el documento para persistirlo:
 * - normaliza el documento y calcula `identificacion` y `rif`;
 * - vacía los bloques que no corresponden a la categoría (si el usuario
 *   cambió de categoría no quedan datos huérfanos);
 * - descarta `_id`/`__v` (el `$set` del upsert no puede tocar `_id`).
 */
export function prepararParaGuardar(entrada: Cliente): Cliente {
  const c = recortarTextos(normalizarCliente(entrada));
  delete c._id;
  delete c.__v;

  c.numeroDocumento =
    c.tipoDocumento === 'P' ? normalizarPasaporte(c.numeroDocumento) : soloDigitos(c.numeroDocumento);
  if (esRifOrganizacion(c.tipoDocumento)) {
    c.numeroDocumento = c.numeroDocumento.padStart(8, '0');
  } else {
    c.digitoVerificador = '';
  }
  c.identificacion = construirIdentificacion(c.tipoDocumento, c.numeroDocumento);
  c.rif = construirRif(c.tipoDocumento, c.numeroDocumento, c.digitoVerificador);
  if (c.tipoDocumento !== 'P') {
    c.paisEmisor = '';
  }

  const vacio = clienteVacio(c.categoria);
  if (esPersona(c)) {
    c.razonSocial = '';
    c.nombreComercial = '';
    c.representante = vacio.representante;
  } else {
    c.nombres = '';
    c.apellidos = '';
    c.fechaNacimiento = '';
    c.sexo = '';
    c.estadoCivil = '';
    c.profesion = '';
  }
  if (c.categoria !== 'E') {
    c.condicionMigratoria = '';
  }
  if (c.categoria !== 'J') {
    c.registroMercantil = vacio.registroMercantil;
  }
  if (c.categoria !== 'G') {
    c.nivelGobierno = '';
    c.enteAdscripcion = '';
    c.unidadAdministradora = '';
    c.partidaPresupuestaria = '';
  }
  if (c.categoria !== 'D') {
    c.tipoSujetoDiplomatico = '';
    c.paisRepresentado = '';
    c.credencialDiplomatica = '';
    c.vencimientoCredencial = '';
  }
  if (c.categoria !== 'C') {
    c.tipoOrganizacionComunal = '';
    c.registroComunal = '';
  }

  if (!c.agenteRetencionIva) {
    c.porcentajeRetencionIva = 0;
  }
  if (c.condicionFiscal !== 'exonerado') {
    c.vigenciaBeneficio = '';
  }
  if (c.condicionPago === 'contado') {
    c.diasCredito = null;
    c.limiteCredito = null;
  }
  c.bancario.numeroCuenta = soloDigitos(c.bancario.numeroCuenta);
  c.correo = c.correo.toLowerCase();
  c.correoFacturacion = c.correoFacturacion.toLowerCase();
  return c;
}

// ═══════════════════════════════════════════
// Validación
// ═══════════════════════════════════════════

export interface ProblemaCliente {
  pestana: PestanaCliente;
  /** Ruta del campo (p. ej. `direccion.estado`): resalta el control en el formulario */
  campo: string;
  mensaje: string;
}

export interface ValidacionCliente {
  /** Bloquean el guardado */
  errores: ProblemaCliente[];
  /** Advertencias que no bloquean (vencimientos, incoherencias leves) */
  avisos: ProblemaCliente[];
  /** Primer error de cada campo */
  porCampo: Record<string, string>;
  /** Cantidad de errores por pestaña */
  porPestana: Record<PestanaCliente, number>;
}

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PATRON_WEB = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$/i;

export function correoValido(correo: string): boolean {
  return PATRON_CORREO.test(String(correo ?? '').trim());
}

/**
 * Teléfono venezolano (0414-1234567, 0212-1234567, +58 414 1234567) o
 * internacional con prefijo "+" (extranjeros y misiones diplomáticas).
 */
export function telefonoValido(telefono: string): boolean {
  const texto = String(telefono ?? '').trim();
  if (!/^\+?[\d\s().-]{7,22}$/.test(texto)) {
    return false;
  }
  const digitos = soloDigitos(texto);
  if (texto.startsWith('+')) {
    return digitos.length >= 8 && digitos.length <= 15;
  }
  return (
    (digitos.length === 11 && digitos.startsWith('0')) ||
    (digitos.length === 12 && digitos.startsWith('58'))
  );
}

/** Móvil venezolano para pago móvil: 04XX-XXXXXXX (admite prefijo 58). */
export function movilVenezolanoValido(telefono: string): boolean {
  let digitos = soloDigitos(telefono);
  if (digitos.length === 12 && digitos.startsWith('58')) {
    digitos = '0' + digitos.slice(2);
  }
  return /^04\d{9}$/.test(digitos);
}

/** ¿La fecha (yyyy-mm-dd) ya pasó? Se considera vigente todo el día indicado. */
export function fechaVencida(fecha: string, hoy: Date = new Date()): boolean {
  if (!fecha) {
    return false;
  }
  const limite = new Date(`${fecha}T23:59:59`);
  return !isNaN(limite.getTime()) && limite < hoy;
}

export function validarCliente(c: Cliente, hoy: Date = new Date()): ValidacionCliente {
  const errores: ProblemaCliente[] = [];
  const avisos: ProblemaCliente[] = [];
  const error = (pestana: PestanaCliente, campo: string, mensaje: string) =>
    errores.push({ pestana, campo, mensaje });
  const aviso = (pestana: PestanaCliente, campo: string, mensaje: string) =>
    avisos.push({ pestana, campo, mensaje });
  const vacio = (valor: unknown) => !String(valor ?? '').trim();

  // — Identificación —
  const categoria = infoCategoria(c.categoria);
  if (!categoria) {
    error('identificacion', 'categoria', 'Seleccione la categoría del cliente.');
  }

  const numero = String(c.numeroDocumento ?? '').trim();
  if (!c.tipoDocumento) {
    error('identificacion', 'tipoDocumento', 'Seleccione el tipo de documento.');
  } else if (categoria && !categoria.documentos.includes(c.tipoDocumento)) {
    error(
      'identificacion',
      'tipoDocumento',
      `El documento ${c.tipoDocumento} no corresponde a la categoría ${categoria.corta}.`,
    );
  }

  if (!numero) {
    error('identificacion', 'numeroDocumento', 'Indique el número de documento.');
  } else if (c.tipoDocumento === 'P') {
    if (!/^[A-Z0-9]{5,15}$/.test(normalizarPasaporte(numero))) {
      error('identificacion', 'numeroDocumento', 'El pasaporte debe tener entre 5 y 15 letras o números.');
    }
  } else if (!/^[\d.\s-]+$/.test(numero)) {
    error('identificacion', 'numeroDocumento', 'El número solo admite dígitos.');
  } else if (c.tipoDocumento === 'V' || c.tipoDocumento === 'E') {
    const digitos = soloDigitos(numero);
    if (digitos.length > 8 || Number(digitos) === 0) {
      error('identificacion', 'numeroDocumento', 'La cédula debe tener entre 1 y 8 dígitos.');
    }
  } else if (esRifOrganizacion(c.tipoDocumento)) {
    const digitos = soloDigitos(numero);
    if (digitos.length !== 8) {
      error('identificacion', 'numeroDocumento', 'El RIF lleva 8 dígitos además del dígito verificador.');
    } else if (!/^\d$/.test(String(c.digitoVerificador ?? ''))) {
      error('identificacion', 'digitoVerificador', 'Indique el dígito verificador del RIF.');
    } else if (!rifValido(c.tipoDocumento, digitos, c.digitoVerificador)) {
      const esperados = digitosVerificadoresRif(c.tipoDocumento, digitos).join(' o ');
      error(
        'identificacion',
        'digitoVerificador',
        `El dígito verificador no coincide: para ${c.tipoDocumento}-${digitos} corresponde ${esperados}.`,
      );
    }
  }

  if (c.tipoDocumento === 'P' && vacio(c.paisEmisor)) {
    error('identificacion', 'paisEmisor', 'Indique el país emisor del pasaporte.');
  }

  // — Datos generales —
  const persona = esPersona(c);
  if (c.categoria === 'D' && !c.tipoSujetoDiplomatico) {
    error('datos', 'tipoSujetoDiplomatico', 'Indique si es una misión, un organismo o un funcionario acreditado.');
  }

  if (persona) {
    if (vacio(c.nombres)) {
      error('datos', 'nombres', 'Los nombres son obligatorios.');
    }
    if (vacio(c.apellidos)) {
      error('datos', 'apellidos', 'Los apellidos son obligatorios.');
    }
    if (c.fechaNacimiento) {
      const nacimiento = new Date(`${c.fechaNacimiento}T00:00:00`);
      if (isNaN(nacimiento.getTime()) || nacimiento > hoy) {
        error('datos', 'fechaNacimiento', 'La fecha de nacimiento no es válida.');
      }
    }
    if ((c.categoria === 'E' || c.categoria === 'D') && vacio(c.nacionalidad)) {
      error('datos', 'nacionalidad', 'Indique la nacionalidad.');
    }
  } else if (vacio(c.razonSocial)) {
    error('datos', 'razonSocial', `El campo "${etiquetaRazonSocial(c.categoria)}" es obligatorio.`);
  }

  if (c.categoria === 'G' && !c.nivelGobierno) {
    error('datos', 'nivelGobierno', 'Indique el nivel de gobierno del ente.');
  }

  if (c.categoria === 'D') {
    if (vacio(c.paisRepresentado)) {
      error('datos', 'paisRepresentado', 'Indique el país u organismo que representa.');
    }
    if (vacio(c.credencialDiplomatica)) {
      error('datos', 'credencialDiplomatica', 'Indique el N° de la credencial emitida por la Cancillería.');
    }
    if (fechaVencida(c.vencimientoCredencial, hoy)) {
      aviso(
        'datos',
        'vencimientoCredencial',
        'La credencial diplomática está vencida: la franquicia no debería aplicarse hasta renovarla.',
      );
    }
  }

  if (c.categoria === 'C') {
    if (!c.tipoOrganizacionComunal) {
      error('datos', 'tipoOrganizacionComunal', 'Indique el tipo de organización comunal.');
    }
    if (vacio(c.registroComunal)) {
      error('datos', 'registroComunal', 'Indique el código de registro ante el Ministerio de Comunas.');
    }
  }

  if (!persona) {
    if (c.representante.correo && !correoValido(c.representante.correo)) {
      error('datos', 'representante.correo', 'El correo del representante no es válido.');
    }
    if (c.representante.telefono && !telefonoValido(c.representante.telefono)) {
      error('datos', 'representante.telefono', 'El teléfono del representante no es válido.');
    }
  }

  // — Perfil fiscal —
  if (!infoCondicion(c.condicionFiscal)) {
    error('fiscal', 'condicionFiscal', 'Seleccione la condición ante el SENIAT.');
  }
  if (c.agenteRetencionIva && ![75, 100].includes(Number(c.porcentajeRetencionIva))) {
    error('fiscal', 'porcentajeRetencionIva', 'Indique el porcentaje de retención de IVA (75 % o 100 %).');
  }
  if (c.condicionFiscal === 'especial' && !persona && !c.agenteRetencionIva) {
    aviso(
      'fiscal',
      'agenteRetencionIva',
      'Los contribuyentes especiales distintos a personas naturales son agentes de retención de IVA.',
    );
  }
  if ((c.condicionFiscal === 'exento' || c.condicionFiscal === 'exonerado') && vacio(c.baseLegalBeneficio)) {
    error('fiscal', 'baseLegalBeneficio', 'Indique la base legal (ley, decreto o Gaceta Oficial) del beneficio.');
  }
  if (c.condicionFiscal === 'exonerado') {
    if (!c.vigenciaBeneficio) {
      error('fiscal', 'vigenciaBeneficio', 'Indique hasta cuándo está vigente la exoneración.');
    } else if (fechaVencida(c.vigenciaBeneficio, hoy)) {
      aviso('fiscal', 'vigenciaBeneficio', 'La exoneración está vencida: corresponde facturar con IVA.');
    }
  }
  if (c.condicionFiscal !== 'no_contribuyente' && c.tipoDocumento === 'P') {
    aviso(
      'fiscal',
      'condicionFiscal',
      'Un contribuyente debe facturarse con su RIF: el pasaporte no genera uno automáticamente.',
    );
  }

  // — Contacto y domicilio fiscal —
  if (vacio(c.correo) && vacio(c.telefonoMovil) && vacio(c.telefonoFijo)) {
    error('contacto', 'correo', 'Registre al menos un medio de contacto (correo o teléfono).');
  }
  if (c.correo && !correoValido(c.correo)) {
    error('contacto', 'correo', 'El correo electrónico no es válido.');
  }
  if (c.correoFacturacion && !correoValido(c.correoFacturacion)) {
    error('contacto', 'correoFacturacion', 'El correo de facturación no es válido.');
  }
  if (c.telefonoMovil && !telefonoValido(c.telefonoMovil)) {
    error('contacto', 'telefonoMovil', 'Teléfono no válido (ej. 0414-1234567 o +58 414 1234567).');
  }
  if (c.telefonoFijo && !telefonoValido(c.telefonoFijo)) {
    error('contacto', 'telefonoFijo', 'Teléfono no válido (ej. 0212-1234567).');
  }
  if (c.sitioWeb && !PATRON_WEB.test(c.sitioWeb.trim())) {
    error('contacto', 'sitioWeb', 'El sitio web no es válido.');
  }

  // El domicilio fiscal es obligatorio para organizaciones y contribuyentes
  const requiereDomicilio = !persona || c.condicionFiscal !== 'no_contribuyente';
  if (requiereDomicilio) {
    if (!c.direccion.estado) {
      error('contacto', 'direccion.estado', 'Seleccione el estado del domicilio fiscal.');
    }
    if (vacio(c.direccion.domicilio)) {
      error('contacto', 'direccion.domicilio', 'Indique el domicilio fiscal.');
    }
  }
  if (c.direccion.zonaPostal && !/^\d{4}$/.test(c.direccion.zonaPostal.trim())) {
    error('contacto', 'direccion.zonaPostal', 'La zona postal tiene 4 dígitos.');
  }

  // — Condiciones comerciales —
  if (c.condicionPago === 'credito') {
    const dias = Number(c.diasCredito);
    if (!Number.isInteger(dias) || dias < 1 || dias > 365) {
      error('comercial', 'diasCredito', 'Los días de crédito deben estar entre 1 y 365.');
    }
    if (c.limiteCredito !== null && c.limiteCredito !== undefined && String(c.limiteCredito) !== '') {
      const limite = Number(c.limiteCredito);
      if (isNaN(limite) || limite < 0) {
        error('comercial', 'limiteCredito', 'El límite de crédito no puede ser negativo.');
      }
    }
  }

  const cuenta = soloDigitos(c.bancario.numeroCuenta);
  if (!vacio(c.bancario.numeroCuenta)) {
    if (cuenta.length !== 20) {
      error('comercial', 'bancario.numeroCuenta', 'La cuenta bancaria debe tener 20 dígitos.');
    } else if (c.bancario.banco && !cuenta.startsWith(c.bancario.banco)) {
      error(
        'comercial',
        'bancario.numeroCuenta',
        `La cuenta no corresponde al banco elegido: debe comenzar por ${c.bancario.banco}.`,
      );
    }
  }
  if (c.bancario.telefonoPagoMovil && !movilVenezolanoValido(c.bancario.telefonoPagoMovil)) {
    error('comercial', 'bancario.telefonoPagoMovil', 'El pago móvil requiere un celular venezolano (04XX-XXXXXXX).');
  }

  // — Índices para el formulario —
  const porCampo: Record<string, string> = {};
  const porPestana: Record<PestanaCliente, number> = {
    identificacion: 0,
    datos: 0,
    fiscal: 0,
    contacto: 0,
    comercial: 0,
  };
  for (const e of errores) {
    porCampo[e.campo] ??= e.mensaje;
    porPestana[e.pestana]++;
  }

  return { errores, avisos, porCampo, porPestana };
}

// ═══════════════════════════════════════════
// Tratamiento fiscal (resumen referencial)
// ═══════════════════════════════════════════

export interface LineaTratamiento {
  icono: string;
  titulo: string;
  detalle: string;
  tono: 'info' | 'ok' | 'aviso';
}

/** 2026-10-17 → 17/10/2026 */
export function fechaCorta(fecha: string): string {
  const partes = /^(\d{4})-(\d{2})-(\d{2})/.exec(fecha ?? '');
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]}` : fecha;
}

/**
 * Resumen del tratamiento fiscal que se deriva del perfil configurado.
 * Es orientativo (no sustituye la revisión del área tributaria):
 * - IVA: alícuota general 16 %, salvo exención o exoneración vigente.
 * - Retención de IVA: 75 % general o 100 % (PA SNAT/2025/000054, arts. 4 y 5).
 * - Retención de ISLR: Decreto 1.808.
 * - IGTF: 3 % sobre pagos en divisas o criptoactivos a sujetos pasivos
 *   especiales (Ley de IGTF, arts. 4 num. 6 y 24); exenciones del art. 8.
 */
export function tratamientoFiscal(c: Cliente, hoy: Date = new Date()): LineaTratamiento[] {
  const lineas: LineaTratamiento[] = [];

  if (c.condicionFiscal === 'exento') {
    lineas.push({
      icono: 'shield',
      titulo: 'IVA exento',
      detalle: c.baseLegalBeneficio
        ? `Factura sin IVA. Base legal: ${c.baseLegalBeneficio}.`
        : 'Factura sin IVA: registre la base legal de la exención.',
      tono: 'ok',
    });
  } else if (c.condicionFiscal === 'exonerado') {
    const vencida = fechaVencida(c.vigenciaBeneficio, hoy);
    lineas.push({
      icono: vencida ? 'event_busy' : 'event_available',
      titulo: vencida ? 'Exoneración vencida' : 'IVA exonerado',
      detalle: vencida
        ? `Venció el ${fechaCorta(c.vigenciaBeneficio)}: corresponde facturar con IVA (16 %).`
        : `Factura sin IVA${c.vigenciaBeneficio ? ` hasta el ${fechaCorta(c.vigenciaBeneficio)}` : ''}.`,
      tono: vencida ? 'aviso' : 'ok',
    });
  } else {
    lineas.push({
      icono: 'receipt_long',
      titulo: 'IVA 16 %',
      detalle: 'Se factura con la alícuota general del impuesto al valor agregado.',
      tono: 'info',
    });
  }

  if (c.agenteRetencionIva) {
    lineas.push({
      icono: 'percent',
      titulo: `Retiene ${c.porcentajeRetencionIva || 75} % del IVA`,
      detalle:
        'El cliente paga el IVA neto de la retención y entrega el comprobante (PA SNAT/2025/000054).',
      tono: 'aviso',
    });
  }

  if (c.agenteRetencionIslr) {
    lineas.push({
      icono: 'request_quote',
      titulo: 'Retiene ISLR',
      detalle: 'Practica retención sobre servicios y honorarios (Decreto 1.808); exija el comprobante.',
      tono: 'aviso',
    });
  }

  if (c.exentoIgtf) {
    lineas.push({
      icono: 'verified_user',
      titulo: 'Exento de IGTF',
      detalle: 'Exención del art. 8 de la Ley de IGTF (entes públicos y supuestos equivalentes).',
      tono: 'ok',
    });
  } else if (c.categoria === 'D') {
    lineas.push({
      icono: 'currency_exchange',
      titulo: 'IGTF solo exento en bolívares',
      detalle: 'La exención diplomática (art. 8, num. 8) no cubre pagos en divisas: ahí aplica 3 %.',
      tono: 'aviso',
    });
  } else {
    lineas.push({
      icono: 'currency_exchange',
      titulo: 'IGTF 3 % en divisas',
      detalle:
        c.moneda === 'VES'
          ? 'Aplica si paga en divisas o criptoactivos a un sujeto pasivo especial.'
          : 'Paga en divisas: si el emisor es sujeto pasivo especial, percibe el 3 % de IGTF.',
      tono: c.moneda === 'VES' ? 'info' : 'aviso',
    });
  }

  if (c.categoria === 'G') {
    lineas.push({
      icono: 'account_balance',
      titulo: 'Pago presupuestario',
      detalle: `Sujeto a orden de pago y disponibilidad presupuestaria${
        c.partidaPresupuestaria ? ` (partida ${c.partidaPresupuestaria})` : ''
      }.`,
      tono: 'info',
    });
  }

  if (c.categoria === 'D' && fechaVencida(c.vencimientoCredencial, hoy)) {
    lineas.push({
      icono: 'gpp_maybe',
      titulo: 'Credencial vencida',
      detalle: `Venció el ${fechaCorta(c.vencimientoCredencial)}: solicite la renovación antes de facturar exento.`,
      tono: 'aviso',
    });
  }

  return lineas;
}
