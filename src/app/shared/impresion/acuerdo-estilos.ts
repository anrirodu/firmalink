/**
 * Estilos del documento de contrato, compartidos por la impresión y el PDF.
 *
 * Son dos caminos distintos hacia el mismo papel, así que tienen que pintar
 * el texto idéntico. Vivir en `shared` evita que el servicio de PDF dependa
 * de una página concreta.
 */

/** Márgenes de la hoja en centímetros */
export interface MargenCm {
  sup: number;
  inf: number;
  izq: number;
  der: number;
}

export const CSS_CONTENIDO_IMPRESION = `
  body {
    font-family: Tahoma, Verdana, Geneva, sans-serif;
    font-size: 13pt;
    line-height: 1.15;
    color: #000000;
    text-align: justify;
  }

  p, div {
    margin: 0 0 0.45em 0;
    text-align: justify;
  }

  strong, b { font-weight: 700; }

  ul, ol { margin: 0.4em 0 0.9em 0; }
  li { margin-bottom: 0.35em; text-align: justify; }

  .doc-codigo { text-align: left; margin-bottom: 1.1em; letter-spacing: 0.5px; }
  .doc-titulo { text-align: center; margin-bottom: 1.4em; }
  .doc-clausula { margin-top: 1.1em; margin-bottom: 0.55em; text-align: left; }
  .doc-literal { list-style-type: lower-alpha; padding-left: 1.6em; }
  .doc-vineta { list-style-type: disc; padding-left: 1.4em; }

  .doc-firmas { width: 100%; border-collapse: collapse; margin-top: 0.6em; }
  .doc-firmas td {
    vertical-align: top;
    padding: 0.15em 0.4em;
    text-align: center;
  }
  .doc-firma-nombre { font-weight: 700; letter-spacing: 0.3px; }
  .doc-firma-cedula { font-size: 12pt; }

  .doc-clausula, .doc-firmas {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* Nada desborda el ancho de la columna: tablas e imágenes se ajustan y las
     cadenas largas se parten en vez de salirse del papel. */
  table { max-width: 100%; }
  img { max-width: 100%; height: auto; }
  p, li, td, div { overflow-wrap: anywhere; }
`;
