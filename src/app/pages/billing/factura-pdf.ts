import type { AdjuntoCorreo } from '../../shared/services/api.service';
import { sanitizarContentId } from '../../shared/correo/content-id';
import { CSS_FACTURA, HOJA_FACTURA } from '../../shared/impresion/factura-estilos';
import { construirHojaFactura } from './factura.impresion';
import type { Factura } from './factura.model';

/**
 * PDF de la factura digital, listo para adjuntar al correo.
 *
 * A diferencia del acuerdo —que es un documento libre en hoja Carta y se
 * compone con cortes inteligentes entre renglones—, la factura es una hoja
 * fija de 21,7 × 28 cm con el mismo formato en pantalla, en papel y en PDF.
 * La conversión es directa:
 *
 *   1. La hoja se pinta en un contenedor oculto con `CSS_FACTURA` (la única
 *      definición del formato, compartida con la vista previa y la impresión).
 *   2. `html2canvas` la rasteriza a 192 ppp.
 *   3. jsPDF la coloca en páginas del tamaño exacto de la hoja. Por diseño la
 *      factura cabe en una página; si una lista de renglones larga la desborda,
 *      se parte en tantas hojas como haga falta (sin reflow: el corte es
 *      geométrico, igual que lo que haría la impresora).
 */
export interface PdfFacturaGenerado {
  /** Adjunto que viaja con el correo */
  adjunto: AdjuntoCorreo;
  /** Cada hoja como imagen JPEG, para incrustarla en el cuerpo del mensaje */
  paginas: AdjuntoCorreo[];
  /** Hojas totales del PDF, para avisar si la vista previa va recortada */
  totalPaginas: number;
}

/** Píxeles CSS por centímetro (96 ppp) */
const PX_POR_CM = 96 / 2.54;
/** 2× de 96 ppp = 192 ppp, nítido en pantalla y en papel */
const ESCALA = 2;

/** Hoja medida en milímetros, tal como jsPDF la declara */
const ANCHO_MM = Math.round(HOJA_FACTURA.anchoCm * 10);
const ALTO_MM = Math.round(HOJA_FACTURA.altoCm * 10);

/** Mismos topes que el PDF de acuerdos: los fija el endpoint de correo */
const ADJUNTOS_MAXIMOS = 10;
const PIEZAS_FIJAS = 2; // el PDF y el logo
const PAGINAS_INCRUSTADAS_MAX = ADJUNTOS_MAXIMOS - PIEZAS_FIJAS;

const BYTES_POR_MB = 1024 * 1024;
const PRESUPUESTO_BYTES = 28 * BYTES_POR_MB;
const HOLGURA_BYTES = 2 * BYTES_POR_MB;

/**
 * Tamaño de la página en píxeles del lienzo.
 *
 * Se calcula con la MISMA regla que usa html2canvas para dimensionar el lienzo
 * del elemento raíz —`floor(ceil(css) * scale)`— y no con un redondeo directo,
 * porque si no, la cuenta no cuadra:
 *
 *   hoja: 28 cm = 1058,27 px CSS
 *   html2canvas → ceil(1058,27) = 1059 → lienzo 1059 × 2 = 2118 px
 *   página con round(1058,27 × 2)  = 2117 px   → sobra 1 px
 *
 * Ese píxel de sobra no se ve, pero `componerPaginas` lo tomaba como contenido
 * pendiente y añadía una hoja más al PDF: la página en blanco del correo.
 */
function paginaPx(pxCss: number): number {
  return Math.floor(Math.ceil(pxCss) * ESCALA);
}

/**
 * Resto de lienzo que ya no se considera una hoja aparte. Absorbe las
 * diferencias de redondeo sub-píxel (1 px CSS) para que no reaparezca una
 * página fantasma si el navegador mide la hoja unas centésimas más alta.
 */
const RESTO_MINIMO_PX = ESCALA;

/**
 * Genera el PDF de la factura para adjuntarlo al correo y para incrustarlo en
 * el cuerpo del mensaje. La conversión ocurre en el navegador: el servidor
 * solo acepta adjuntos ya formados.
 */
export async function generarPdfFactura(factura: Factura): Promise<PdfFacturaGenerado> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const anchoCss = HOJA_FACTURA.anchoCm * PX_POR_CM;
  const anchoPaginaPx = paginaPx(anchoCss);
  const altoPaginaPx = paginaPx(HOJA_FACTURA.altoCm * PX_POR_CM);

  const host = prepararCaptura(factura, anchoCss);

  let lienzo: HTMLCanvasElement;
  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await esperarImagenes(host);
    await esperarPintura();

    const hoja = host.querySelector('.fx-hoja');
    if (!hoja) {
      throw new Error('La hoja de la factura no se pudo componer para el PDF.');
    }

    lienzo = await html2canvas(hoja as HTMLElement, {
      scale: ESCALA,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });
  } finally {
    host.remove();
  }

  const paginas = componerPaginas(lienzo, anchoPaginaPx, altoPaginaPx);
  const base = baseSegura(factura);
  const nombrePdf = `${base}.pdf`;

  const pdf = new jsPDF({
    unit: 'mm',
    format: [ANCHO_MM, ALTO_MM],
    orientation: 'portrait',
    compress: true,
  });
  for (let i = 0; i < paginas.length; i++) {
    if (i > 0) {
      pdf.addPage([ANCHO_MM, ALTO_MM], 'portrait');
    }
    pdf.addImage(paginas[i], 'JPEG', 0, 0, ANCHO_MM, ALTO_MM);
  }

  const blob = pdf.output('blob');
  const todas: AdjuntoCorreo[] = paginas.map((dataUrl, i) => ({
    nombre: sanitizarContentId(`${base}-p${i + 1}.jpg`),
    contenido: dataUrlABlob(dataUrl),
    contentType: 'image/jpeg',
  }));

  return {
    adjunto: {
      nombre: nombrePdf,
      contenido: blob,
      contentType: 'application/pdf',
    },
    paginas: elegirIncrustadas(todas, blob.size),
    totalPaginas: todas.length,
  };
}

/**
 * Pinta la hoja en un contenedor oculto, con los mismos estilos que la vista
 * previa y la ventana de impresión. Las imágenes ya resuelven contra
 * `document.baseURI`, que es el documento de la aplicación.
 */
function prepararCaptura(factura: Factura, anchoCss: number): HTMLDivElement {
  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText =
    `position:fixed;left:-20000px;top:0;width:${anchoCss}px;` +
    'margin:0;padding:0;background:#ffffff;z-index:-1;box-sizing:border-box;';

  const estilo = document.createElement('style');
  estilo.textContent = `
    ${CSS_FACTURA}
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .fx-hoja {
      margin: 0;
      border: none;
      box-shadow: none;
      zoom: 1;
    }
  `;
  host.appendChild(estilo);

  const contenido = document.createElement('div');
  contenido.innerHTML = construirHojaFactura(factura);
  host.appendChild(contenido);

  document.body.appendChild(host);
  return host;
}

/**
 * Divide el lienzo en hojas del tamaño del papel.
 *
 * El corte es geométrico (a altura fija): la factura está diseñada para caber
 * en una hoja y un desborde solo ocurre con listas de renglones muy largas,
 * donde lo importante es no perder filas. El ancho se estira al de la página
 * por si el raster redondeó un píxel distinto al compuesto.
 *
 * Un resto menor que `RESTO_MINIMO_PX` NO abre una hoja nueva: si no, el
 * redondeo del raster (un píxel de más) acabaría en una página en blanco.
 */
function componerPaginas(
  lienzo: HTMLCanvasElement,
  anchoPaginaPx: number,
  altoPaginaPx: number,
): string[] {
  const paginas: string[] = [];
  let origenY = 0;

  while (lienzo.height - origenY > RESTO_MINIMO_PX) {
    const altoTrozo = Math.min(altoPaginaPx, lienzo.height - origenY);

    const hoja = document.createElement('canvas');
    hoja.width = anchoPaginaPx;
    hoja.height = altoPaginaPx;

    const ctx = hoja.getContext('2d');
    if (!ctx) {
      throw new Error('El navegador no permitió crear el lienzo de la página del PDF.');
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, hoja.width, hoja.height);
    ctx.drawImage(lienzo, 0, origenY, lienzo.width, altoTrozo, 0, 0, anchoPaginaPx, altoTrozo);

    paginas.push(hoja.toDataURL('image/jpeg', 0.92));
    origenY += altoTrozo;
  }

  return paginas.length > 0 ? paginas : [blanco(anchoPaginaPx, altoPaginaPx)];
}

/** Hoja en blanco, para una factura sin contenido rasterizable */
function blanco(ancho: number, alto: number): string {
  const hoja = document.createElement('canvas');
  hoja.width = ancho;
  hoja.height = alto;
  const ctx = hoja.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, ancho, alto);
  }
  return hoja.toDataURL('image/jpeg', 0.92);
}

/** Recorta las páginas incrustables a lo que el correo puede llevar */
function elegirIncrustadas(paginas: AdjuntoCorreo[], tamanoPdf: number): AdjuntoCorreo[] {
  let disponible = PRESUPUESTO_BYTES - HOLGURA_BYTES - tamanoPdf;
  const elegidas: AdjuntoCorreo[] = [];

  for (const pagina of paginas) {
    if (elegidas.length >= PAGINAS_INCRUSTADAS_MAX || pagina.contenido.size > disponible) {
      break;
    }
    disponible -= pagina.contenido.size;
    elegidas.push(pagina);
  }

  return elegidas;
}

/** Nombre base del archivo: el código de la factura, o su número */
function baseSegura(f: Factura): string {
  const bruto = f.codigo?.trim() || `FACTURA-${f.numero || '0000000'}`;
  return (
    bruto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'factura'
  );
}

/** Convierte un data URL base64 en Blob sin pasar por red */
function dataUrlABlob(dataUrl: string): Blob {
  const coma = dataUrl.indexOf(',');
  const cabecera = dataUrl.slice(0, coma);
  const tipo = /:(.*?);/.exec(cabecera)?.[1] || 'image/jpeg';
  const binario = atob(dataUrl.slice(coma + 1));
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) {
    bytes[i] = binario.charCodeAt(i);
  }
  return new Blob([bytes], { type: tipo });
}

/** Espera a que las imágenes de la hoja (logo, firma, sello) estén cargadas */
async function esperarImagenes(host: HTMLElement): Promise<void> {
  const imagenes = Array.from(host.querySelectorAll('img'));
  const pendientes = imagenes.filter((img) => !img.complete);
  if (pendientes.length === 0) return;

  await Promise.all(
    pendientes.map(
      (img) =>
        new Promise<void>((resolver) => {
          img.addEventListener('load', () => resolver(), { once: true });
          img.addEventListener('error', () => resolver(), { once: true });
        }),
    ),
  );
}

/** Da un cuadro de pintura a Chromium antes de rasterizar */
async function esperarPintura(): Promise<void> {
  await new Promise((res) => requestAnimationFrame(() => setTimeout(res, 0)));
}
