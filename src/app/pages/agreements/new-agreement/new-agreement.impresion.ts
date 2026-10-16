import { CSS_CONTENIDO_IMPRESION, type MargenCm } from '../../../shared/impresion/acuerdo-estilos';

export type { MargenCm };

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

${CSS_CONTENIDO_IMPRESION}

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
