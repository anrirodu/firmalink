/**
 * Estilos de la hoja de factura, compartidos por la pantalla, la impresión y
 * el PDF.
 *
 * Reproduce la hoja de la plantilla de facturación: 21,7 × 28 cm con márgenes
 * internos de 4,5 cm arriba, 2 cm a los lados y 2,5 cm abajo (zona útil
 * 17,7 × 21 cm), de modo que el documento se imprima exactamente en una
 * página.
 *
 * Las clases van prefijadas `fx-` porque estos estilos se inyectan en el
 * documento global (el `[innerHTML]` de la vista previa no lleva los atributos
 * de encapsulado de Angular, y la ventana de impresión es otro documento).
 * Ojo al tocar las columnas: los anchos de `.fx-items` y `.fx-totales` tienen
 * que coincidir (cantidad ↔ hueco, precio ↔ etiqueta, total ↔ importe) para que
 * Precio y Total queden alineados con SubTotal e importes.
 */

/** Medidas de la hoja, en centímetros (las usa también el servicio de PDF). */
export const HOJA_FACTURA = {
  anchoCm: 21.7,
  altoCm: 28,
  margenSuperiorCm: 4.5,
  margenInferiorCm: 2.5,
  margenLateralCm: 2,
} as const;

/** Identificador del `<style>` para no inyectarlo dos veces. */
export const ID_ESTILOS_FACTURA = 'firmalink-factura-estilos';

/**
 * Las imágenes de la hoja se referencian por variables para que la ventana de
 * impresión —que se abre en `about:blank` y no hereda el `base href`— pueda
 * reemplazarlas por rutas absolutas.
 */
const IMAGENES = `
  --fx-img-logo: url('assets/factura/emisor.png');
  --fx-img-marca: url('assets/factura/emisor.png');
  --fx-img-firma: url('assets/factura/firma.png');
  --fx-img-sello: url('assets/factura/sello.png');
`;

export const CSS_FACTURA = `
/* ── Lienzo de la vista previa ───────────────────────────────────────────── */
.fx-lienzo {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1.25rem 0.5rem 2.5rem;
  overflow: auto;
}

/* ── La hoja 21,7 × 28 cm ────────────────────────────────────────────────── */
.fx-hoja {
  ${IMAGENES}
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  width: ${HOJA_FACTURA.anchoCm}cm;
  min-height: ${HOJA_FACTURA.altoCm}cm;
  padding: ${HOJA_FACTURA.margenSuperiorCm}cm ${HOJA_FACTURA.margenLateralCm}cm ${HOJA_FACTURA.margenInferiorCm}cm;
  background: #fff;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  line-height: 1.35;
  border: 1px solid #000;
  box-shadow: 0 4px 18px rgba(0, 0, 0, .35);
  zoom: var(--fx-escala, 1);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Marca de agua: el logo tenue al centro, detrás del contenido */
.fx-hoja::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--fx-img-marca) center center / 9cm no-repeat;
  opacity: 0.06;
  z-index: -1;
  pointer-events: none;
}

.fx-hoja.fx-sin-marca::before { display: none; }

/* ── Cabecera superior (dentro del margen superior de la hoja) ───────────── */
.fx-header-top {
  position: absolute;
  top: 0.8cm;
  left: ${HOJA_FACTURA.margenLateralCm}cm;
  right: ${HOJA_FACTURA.margenLateralCm}cm;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 0.4cm;
}

.fx-header-logo { justify-self: start; }
.fx-header-logo img { width: 2cm; height: auto; }

.fx-header-empresa {
  justify-self: center;
  text-align: center;
  font-size: 11px;
  line-height: 1.35;
}
.fx-header-empresa .fx-empresa-nombre { font-weight: 700; font-size: 12px; }

.fx-header-formato {
  justify-self: end;
  text-align: right;
  font-size: 11px;
  line-height: 1.35;
}
.fx-header-formato .fx-formato { font-weight: 700; }
.fx-header-formato .fx-control-num { font-weight: 700; color: #cc0000; }

/* ── Datos de la factura y del cliente ───────────────────────────────────── */
.fx-factura-header { margin-bottom: 1.6cm; }

.fx-header-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1cm;
}
.fx-header-line + .fx-header-line { margin-top: 1mm; }
.fx-header-line .fx-cliente { font-weight: 400; }

.fx-factura-num {
  font-weight: 700;
  white-space: nowrap;
  color: #cc0000;
}

/* ── Tabla de renglones ──────────────────────────────────────────────────── */
.fx-items {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 10px;
  margin-bottom: 1.2cm;
}

.fx-items th,
.fx-items td {
  border: 1px solid #000;
  padding: 2mm 3mm;
  vertical-align: middle;
}

.fx-items thead th {
  text-align: center;
  font-weight: 700;
  background: #f0f0f0;
}

/* Anchos fijos: deben coincidir con .fx-totales */
.fx-items .fx-col-desc   { text-align: left; white-space: pre-wrap; word-break: break-word; }
.fx-items .fx-col-cant   { width: 2.2cm; text-align: right; white-space: nowrap; }
.fx-items .fx-col-precio { width: 2.8cm; text-align: right; white-space: nowrap; }
.fx-items .fx-col-total  { width: 2.8cm; text-align: right; white-space: nowrap; }
.fx-items td.fx-num { text-align: right; white-space: nowrap; }

.fx-fila-vacia td { text-align: center; font-style: italic; color: #777; }

/* ── Total y retenciones ─────────────────────────────────────────────────── */
.fx-totales {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 10px;
  margin-top: 1cm;
}

.fx-totales td {
  border: 1px solid #000;
  padding: 2mm 3mm;
  vertical-align: top;
}

.fx-totales .fx-son-cell { text-align: left; }
.fx-totales col.fx-gap    { width: 2.2cm; }
.fx-totales col.fx-label  { width: 2.8cm; }
.fx-totales col.fx-amount { width: 2.8cm; }
.fx-totales td.fx-label   { text-align: right; white-space: nowrap; font-weight: 600; }
.fx-totales td.fx-amount  { text-align: right; white-space: nowrap; font-weight: 600; }
.fx-totales .fx-total-final { font-size: 11px; font-weight: 800; }
.fx-totales .fx-retencion   { font-weight: 400; font-size: 9px; }

.fx-son { text-transform: uppercase; }

/* ── Firma y sello ───────────────────────────────────────────────────────── */
.fx-firma-sello {
  position: relative;
  margin-top: 0.6cm;
  text-align: center;
  line-height: 0;
}
.fx-firma-sello .fx-img-firma { height: 7cm; width: auto; }
.fx-firma-sello .fx-img-sello {
  position: absolute;
  top: 0.5cm;
  right: 1.5cm;
  height: 8cm;
  width: auto;
}

/* ── Pie de emisor / razón social ────────────────────────────────────────── */
.fx-emisor {
  position: absolute;
  left: 1cm;
  right: 1cm;
  bottom: 0.9cm;
  text-align: center;
  font-size: 7.5px;
  line-height: 1.4;
}
.fx-emisor .fx-emisor-linea {
  border-top: 1px dashed #000;
  margin-bottom: 2mm;
}
.fx-emisor .fx-emisor-texto + .fx-emisor-texto { margin-top: 1mm; }
.fx-emisor .fx-original {
  margin-top: 2mm;
  color: #cc0000;
  font-weight: 700;
}

/* Elementos que los botones de la barra pueden ocultar */
.fx-oculto { display: none !important; }

/* ══════════════════════════════════════════════════════════════════════════
   PRESUPUESTO
   La hoja es la misma (21,7 × 28 cm, mismos márgenes y misma tabla de
   renglones): lo que cambia es lo que un presupuesto añade a una factura.
   Estas reglas viven aquí —y no en un archivo aparte— para que exista una
   sola definición de la hoja y el formato no pueda divergir.
   ══════════════════════════════════════════════════════════════════════════ */

/* N° del documento en la cabecera: el presupuesto no tiene N° de Control,
   así que su número ocupa el mismo lugar y con el mismo énfasis. */
.fx-doc-num { font-weight: 700; color: #cc0000; }

/* ── Condiciones comerciales ─────────────────────────────────────────────── */
.fx-condiciones {
  margin-top: 1cm;
  padding: 2mm 3mm;
  border: 1px solid #000;
  font-size: 9.5px;
  line-height: 1.5;
}

.fx-condiciones-titulo {
  margin-bottom: 1.5mm;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .02em;
}

.fx-cond-linea + .fx-cond-linea { margin-top: 0.6mm; }
.fx-cond-etiqueta { font-weight: 600; }

/* ── Firma del emisor y aceptación del cliente ───────────────────────────── */
.fx-firmas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1cm;
  margin-top: 0.6cm;
}

.fx-firma-col {
  position: relative;
  text-align: center;
  line-height: 0;
}

.fx-firma-col .fx-img-firma { height: 3.6cm; width: auto; }
.fx-firma-col .fx-img-sello {
  position: absolute;
  top: 0.1cm;
  right: 0.4cm;
  height: 4.2cm;
  width: auto;
}

.fx-firma-linea {
  margin-top: 0.4cm;
  border-top: 1px solid #000;
  line-height: 1.35;
}

/* La columna del cliente no lleva imagen: la línea deja el hueco de la firma
   manuscrita, que es lo que el cliente firma y devuelve. */
.fx-firma-col.fx-sin-imagen .fx-firma-linea { margin-top: 4.2cm; }

.fx-firma-pie { font-size: 8px; line-height: 1.35; }

/* ── Nota de documento no fiscal ─────────────────────────────────────────── */
.fx-no-fiscal {
  margin-top: 2mm;
  color: #cc0000;
  font-weight: 700;
}

/* ── Impresión ───────────────────────────────────────────────────────────── */
@page {
  size: ${HOJA_FACTURA.anchoCm}cm ${HOJA_FACTURA.altoCm}cm;
  margin: 0;
}

@media print {
  html, body { background: #fff !important; }

  /* La hoja se imprime sola: se oculta todo lo demás sin depender de las
     clases del armazón de la aplicación (barra lateral, cabecera, panel). */
  body * { visibility: hidden; }
  .fx-hoja, .fx-hoja * { visibility: visible; }
  .fx-hoja {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    zoom: 1;
    box-shadow: none;
  }

  .fx-items tr,
  .fx-totales tr { page-break-inside: avoid; }
  .fx-items thead { display: table-header-group; }
}
`;

/** Inyecta los estilos de la factura en el documento (una sola vez). */
export function inyectarEstilosFactura(): void {
  if (typeof document === 'undefined' || document.getElementById(ID_ESTILOS_FACTURA)) {
    return;
  }
  const estilo = document.createElement('style');
  estilo.id = ID_ESTILOS_FACTURA;
  estilo.textContent = CSS_FACTURA;
  document.head.appendChild(estilo);
}

/**
 * Retira los estilos del documento.
 *
 * La hoja se define en un solo lugar (esta constante) para que se vea igual en
 * pantalla y en el papel; al salir de la facturación ya no hacen falta.
 */
export function retirarEstilosFactura(): void {
  const estilo = typeof document !== 'undefined' ? document.getElementById(ID_ESTILOS_FACTURA) : null;
  if (estilo) {
    estilo.remove();
  }
}
