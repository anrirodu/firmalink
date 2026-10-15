export interface MargenCm {
  sup: number;
  inf: number;
  izq: number;
  der: number;
}

export function construirDocumentoImpresion(opts: {
  contenidoHtml: string;
  margen: MargenCm;
  codigo: string;
  fecha: string;
  huella: string;
}): string {
  const { contenidoHtml, margen, codigo, fecha, huella } = opts;
  const codigoSeg = codigo || 'ACUERDO';
  /**
   * Separación del pie de página al borde inferior del papel.
   *
   * Con `@page { margin: 0 }` el folio quedaría pegado al borde físico de la
   * hoja y las impresoras (que no imprimen los últimos ~0.5 cm) lo cortarían,
   * por eso se levanta dentro de la banda de margen inferior.
   */
  const pieDesdeBordeCm = Math.min(1.2, margen.inf / 2);
  /**
   * Alto útil de la banda del pie: el margen inferior menos la separación al
   * borde. Así la banda completa sigue midiendo exactamente `margen.inf`
   * (no se pierde área de escritura ni se añaden páginas) y el folio queda
   * dentro del área imprimible.
   */
  const altoPieCm = Math.max(0, margen.inf - pieDesdeBordeCm);
  const fechaSeg = fecha || '';
  const huellaSeg = huella || '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>${codigoSeg}</title>
<style>
  @page { size: letter portrait; margin: 0; }

  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: Tahoma, Verdana, Geneva, sans-serif;
    font-size: 13pt;
    line-height: 1.15;
    color: #000000;
    text-align: justify;
  }

  table.marco { width: 100%; border-collapse: collapse; }
  table.marco > thead > tr > td { height: ${margen.sup}cm; padding: 0; }
  table.marco > tfoot > tr > td {
    height: ${altoPieCm}cm;
    padding: 0 ${margen.der}cm ${pieDesdeBordeCm}cm ${margen.izq}cm;
    vertical-align: bottom;
  }
  table.marco > tbody > tr > td {
    padding-left: ${margen.izq}cm;
    padding-right: ${margen.der}cm;
    vertical-align: top;
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

  .na-pie {
    width: 100%;
    margin: 0;
    font-size: 8pt;
    line-height: 1.25;
    text-align: center;
    word-break: break-word;
    opacity: 0.95;
  }

  .na-pie-linea {
    display: block;
  }

  .na-pie-hash {
    display: block;
    letter-spacing: 0.02em;
  }
</style>
</head>
<body>
<table class="marco">
  <thead><tr><td></td></tr></thead>
  <tfoot><tr><td>
    <div class="na-pie">
      <span class="na-pie-linea">CÓD.: ${codigoSeg} | Fecha: ${fechaSeg} | SANDRA SERVER</span>
      <span class="na-pie-linea na-pie-hash">SHA-256: ${huellaSeg}</span>
    </div>
  </td></tr></tfoot>
  <tbody><tr><td>${contenidoHtml}</td></tr></tbody>
</table>
</body>
</html>`;
}
