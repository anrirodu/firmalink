import { Injectable } from '@angular/core';
import { sanitizarContentId } from '../correo/content-id';
import { CSS_CONTENIDO_IMPRESION, type MargenCm } from '../impresion/acuerdo-estilos';

export type { MargenCm };

export interface SolicitudPdfAcuerdo {
  /** Cuerpo del acuerdo (el HTML del editor, sin el marco de impresión) */
  contenidoHtml: string;
  margen: MargenCm;
  codigo: string;
  fecha: string;
  huella: string;
  /** Nombre del archivo, p. ej. `CJS004-2026.pdf` */
  nombre: string;
}

/**
 * Una página del acuerdo ya rasterizada, lista para viajar en el correo.
 *
 * `nombre` es a la vez el nombre del archivo y el Content-ID con el que el
 * cuerpo del mensaje la referencia (`<img src="cid:...">`). Tiene que llevar
 * solo caracteres que ningún cliente de correo reescriba al resolver el cid,
 * y coincidir con `SanitizarContentID` del servidor.
 */
export interface PaginaAcuerdo {
  nombre: string;
  blob: Blob;
}

export interface PdfAcuerdo {
  blob: Blob;
  nombre: string;
  /** Cada página como imagen JPEG, para incrustarla en el cuerpo del correo */
  paginas: PaginaAcuerdo[];
  /**
   * Páginas que tiene el PDF. Puede ser mayor que `paginas.length`: cuando el
   * documento es largo no todas caben como imagen incrustada, porque cada una
   * ocupa un lugar en el cupo de adjuntos del correo. El PDF las lleva todas.
   */
  totalPaginas: number;
}

/** Hoja Carta en pulgadas */
const ANCHO_CARTA_IN = 8.5;
const ALTO_CARTA_IN = 11;
/** Pulgadas por centímetro */
const PX_POR_CM = 96 / 2.54;
/** Píxeles por pulgada en el lienzo de trabajo (2× = 192 ppp, nítido en pantalla y en papel) */
const ESCALA = 2;
const PX_POR_IN = 96 * ESCALA;

/**
 * Cupo de adjuntos que acepta el endpoint de correo de Sandra
 * (`DefaultConfig().MaxAttachments`). Pasarse devuelve 413 y el envío entero se
 * pierde, así que el navegador no puede proponer más piezas que el servidor.
 */
const ADJUNTOS_MAXIMOS = 10;
/** Piezas que no son páginas: el PDF y, cuando existe, el logo de la cabecera */
const PIEZAS_FIJAS = 2;
/** Tope de páginas incrustables: el resto del cupo se lo llevan el PDF y el logo */
const PAGINAS_INCRUSTADAS_MAX = ADJUNTOS_MAXIMOS - PIEZAS_FIJAS;

const BYTES_POR_MB = 1024 * 1024;
/** Presupuesto del correo (`DefaultConfig().MaxSizeMB`) */
const PRESUPUESTO_BYTES = 28 * BYTES_POR_MB;
/**
 * Holgura para todo lo que no son páginas: el PDF, el logo, los datos del
 * formulario y el propio envoltorio multipart.
 */
const HOLGURA_BYTES = 2 * BYTES_POR_MB;

/**
 * PdfService — convierte el documento del acuerdo en un PDF Carta para
 * adjuntarlo al correo y para incrustarlo en el cuerpo del mensaje.
 *
 * No existe una API del navegador para "imprimir a PDF" de forma programática,
 * y el servidor (Sandra, en Go) no expone un conversor HTML→PDF genérico, así
 * que la conversión se hace en el cliente:
 *
 *   1. El cuerpo del acuerdo se pinta en un contenedor oculto de ancho
 *      exactamente igual al de la columna útil de la hoja (Carta menos los
 *      márgenes laterales configurados).
 *   2. `html2canvas` lo rasteriza.
 *   3. Cada página Carta se compone a mano: un lienzo blanco del tamaño de
 *      la hoja con el trozo de texto pegado en el margen que corresponde.
 *
 * Los márgenes no los aplica el CSS del papel: los dibuja el paso 3. Así el
 * texto no puede desbordar hacia ellos, porque el contenido se pinta ya con
 * el ancho útil y la página se rellena alrededor.
 */
@Injectable({ providedIn: 'root' })
export class PdfService {
  async generarAcuerdoPdf(solicitud: SolicitudPdfAcuerdo): Promise<PdfAcuerdo> {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const geo = this.geometria(solicitud.margen);
    const host = this.prepararCaptura(solicitud, geo.anchoUtilCss);

    let lienzoContenido: HTMLCanvasElement;
    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      await this.esperarPintura();

      lienzoContenido = await html2canvas(host, {
        scale: ESCALA,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      });
    } finally {
      host.remove();
    }

    const paginas = this.componerPaginas(lienzoContenido, geo, solicitud);
    const nombrePdf = this.nombreSeguro(solicitud.nombre);

    const pdf = new jsPDF({
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
      compress: true,
    });
    for (let i = 0; i < paginas.length; i++) {
      if (i > 0) {
        pdf.addPage('letter', 'portrait');
      }
      pdf.addImage(paginas[i], 'JPEG', 0, 0, ANCHO_CARTA_IN, ALTO_CARTA_IN);
    }

    const blob = pdf.output('blob');
    // Las páginas incrustadas se eligen en función del peso del PDF: el cupo de
    // adjuntos y el de tamaño son del envío completo, no de cada pieza.
    const todas = this.nombrarPaginas(paginas, nombrePdf);

    return {
      blob,
      nombre: nombrePdf,
      paginas: this.elegirIncrustadas(todas, blob.size),
      totalPaginas: todas.length,
    };
  }

  /**
   * Recorta la lista de páginas incrustables a lo que el correo puede llevar.
   *
   * Un documento largo rompía el envío: cada página es un adjunto, y con más de
   * diez piezas el servidor responde 413 y se pierde el correo completo. Se
   * corta por la cola, en orden, para que la vista previa del mensaje conserve
   * el principio del documento; el PDF adjunto sigue llevando todas las hojas.
   *
   * @param paginas todas las páginas, en orden
   * @param tamanoPdf peso del PDF, que también compite por el presupuesto
   */
  private elegirIncrustadas(paginas: PaginaAcuerdo[], tamanoPdf: number): PaginaAcuerdo[] {
    let disponible = PRESUPUESTO_BYTES - HOLGURA_BYTES - tamanoPdf;
    const elegidas: PaginaAcuerdo[] = [];

    for (const pagina of paginas) {
      // Se corta en la primera que no entra: las páginas van en orden y una
      // vista previa con huecos en medio no le sirve a nadie.
      if (elegidas.length >= PAGINAS_INCRUSTADAS_MAX || pagina.blob.size > disponible) {
        break;
      }
      disponible -= pagina.blob.size;
      elegidas.push(pagina);
    }

    return elegidas;
  }

  /**
   * Convierte los data URL de las páginas en adjuntos incrustables.
   *
   * El nombre de cada página es su Content-ID, así que se deriva del código del
   * acuerdo (`CJS004-2026-p1.jpg`) y se pasa por el saneador compartido: el
   * nombre que se envía como archivo y el `cid:` del HTML tienen que ser el
   * mismo valor, y salen de aquí una sola vez para que no puedan divergir.
   */
  private nombrarPaginas(paginas: string[], nombrePdf: string): PaginaAcuerdo[] {
    const base = this.baseSegura(nombrePdf);
    return paginas.map((dataUrl, i) => ({
      nombre: sanitizarContentId(`${base}-p${i + 1}.jpg`),
      blob: this.dataUrlABlob(dataUrl),
    }));
  }

  /** Convierte un data URL base64 en Blob sin pasar por red */
  private dataUrlABlob(dataUrl: string): Blob {
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

  /**
   * Posiciones de la hoja en píxeles del lienzo de trabajo. Todo el compuesto
   * sale de aquí, de modo que margen, ancho de columna y banda de pie son
   * números exactos y no dependen de cómo el navegador resuelva el CSS.
   */
  private geometria(margen: MargenCm) {
    const cmAPx = (cm: number) => Math.round(cm * PX_POR_CM * ESCALA);
    const margenIzqPx = cmAPx(margen.izq);
    const margenDerPx = cmAPx(margen.der);
    const margenSupPx = cmAPx(margen.sup);
    const margenInfPx = cmAPx(margen.inf);

    const anchoHojaPx = Math.round(ANCHO_CARTA_IN * PX_POR_IN);
    const altoHojaPx = Math.round(ALTO_CARTA_IN * PX_POR_IN);

    return {
      anchoHojaPx,
      altoHojaPx,
      anchoUtilPx: anchoHojaPx - margenIzqPx - margenDerPx,
      altoUtilPx: altoHojaPx - margenSupPx - margenInfPx,
      /**
       * Ancho del contenedor en píxeles de CSS. `html2canvas` multiplica por
       * la escala al rasterizar: si se le pasara ya escalado, el texto saldría
       * al doble de ancho y se cortaría contra el borde derecho de la hoja.
       */
      anchoUtilCss: (anchoHojaPx - margenIzqPx - margenDerPx) / ESCALA,
      margenIzqPx,
      margenSupPx,
      margenInfPx,
    };
  }

  /**
   * Pinta el cuerpo con el ancho de la columna y la tipografía de contrato.
   * Sin marco de tabla: el papel lo compone `componerPaginas`.
   *
   * `anchoUtilCss` va en píxeles de CSS, sin escalar: `html2canvas` aplica la
   * escala por su cuenta.
   */
  private prepararCaptura(solicitud: SolicitudPdfAcuerdo, anchoUtilCss: number): HTMLDivElement {
    const host = document.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText =
      `position:fixed;left:-20000px;top:0;width:${anchoUtilCss}px;` +
      'margin:0;padding:0;background:#ffffff;z-index:-1;box-sizing:border-box;';

    const estilo = document.createElement('style');
    estilo.textContent = `
      html, body { margin: 0; padding: 0; background: #ffffff; }
      ${CSS_CONTENIDO_IMPRESION}
    `;
    host.appendChild(estilo);

    // El CSS de impresión define la tipografía sobre `body`: aquí ese rol lo
    // asume el contenedor.
    host.style.fontFamily = 'Tahoma, Verdana, Geneva, sans-serif';
    host.style.fontSize = '13pt';
    host.style.lineHeight = '1.15';
    host.style.color = '#000000';
    host.style.textAlign = 'justify';

    const contenido = document.createElement('div');
    contenido.innerHTML = solicitud.contenidoHtml ?? '';
    host.appendChild(contenido);

    document.body.appendChild(host);
    return host;
  }

  /**
   * Compone cada página Carta: lienzo blanco del tamaño de la hoja con el
   * trozo de contenido de esa página pegado en los márgenes.
   *
   * El corte NO se hace a altura fija: se busca la fila en blanco más
   * cercana al límite, de modo que nunca parte un renglón por la mitad ni
   * deja letras a media tinta en el borde entre páginas.
   */
  private componerPaginas(
    lienzo: HTMLCanvasElement,
    geo: ReturnType<PdfService['geometria']>,
    solicitud: SolicitudPdfAcuerdo,
  ): string[] {
    if (lienzo.width !== geo.anchoUtilPx) {
      // Si el raster no coincide con la columna útil, componerlo igual
      // desbordaría el texto contra el borde de la hoja.
      throw new Error(
        `El ancho rasterizado (${lienzo.width}px) no coincide con la columna útil (${geo.anchoUtilPx}px).`,
      );
    }

    const cortes = this.calcularCortes(lienzo, geo.altoUtilPx);
    const paginas: string[] = [];

    for (let pagina = 0; pagina < cortes.length; pagina++) {
      const origenY = pagina === 0 ? 0 : cortes[pagina - 1];
      const finY = pagina === cortes.length - 1 ? lienzo.height : cortes[pagina];
      const altoTrozo = Math.max(0, finY - origenY);

      const hoja = document.createElement('canvas');
      hoja.width = geo.anchoHojaPx;
      hoja.height = geo.altoHojaPx;

      const ctx = hoja.getContext('2d');
      if (!ctx) {
        throw new Error('El navegador no permitió crear el lienzo de la página del PDF.');
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, hoja.width, hoja.height);

      if (altoTrozo > 0) {
        ctx.drawImage(
          lienzo,
          0, origenY, lienzo.width, altoTrozo,
          geo.margenIzqPx, geo.margenSupPx, lienzo.width, altoTrozo,
        );
      }

      // Folio en la banda del margen inferior, debajo del texto: nunca lo pisa
      this.dibujarFolioEnHoja(ctx, hoja, solicitud, geo);

      paginas.push(hoja.toDataURL('image/jpeg', 0.92));
    }

    return paginas;
  }

  /**
   * Alturas de corte entre página y página.
   *
   * Dos reglas gobiernan cada corte:
   *
   * 1. Nunca rebasa el límite teórico de la columna útil (`desde +
   *    altoUtilPx`). Si lo rebasara, el texto se saldría por el margen
   *    inferior y el folio de la hoja quedaría pintado encima: palabras
   *    montadas sobre palabras. Por eso la búsqueda solo mira hacia arriba.
   *
   * 2. Cae en el hueco entre dos renglones, eligiendo la fila cuyo
   *    vecindario tiene menos tinta. Exigir una fila totalmente blanca no
   *    sirve cuando el bloque lleva una tabla: las líneas verticales tienen
   *    tinta en todas las filas y no existiría hueco blanco nunca. Tampoco
   *    basta con la fila de menos tinta a secas, porque un borde fino o un
   *    borde suave dejan huecos de una sola fila que empatan con el centro
   *    de un hueco ancho; puntuando el vecindario gana siempre el hueco
   *    ancho, que es el que separa dos renglones de verdad.
   *
   * La ventana es un 12% de la altura útil. Si un bloque no deja hueco en
   * todo ese tramo, se corta en el límite (sin reflow no hay otra).
   */
  private calcularCortes(lienzo: HTMLCanvasElement, altoUtilPx: number): number[] {
    const altura = lienzo.height;
    if (altura <= altoUtilPx) {
      return [altura];
    }

    const pixeles = this.leerPixeles(lienzo);
    const muestreo = 2; // a 192 ppp ningún trazo de letra cabe en 2px
    const ventana = Math.max(8, Math.round(altoUtilPx * 0.12));
    /**
     * Filas a cada lado que se suman al puntuar una candidata. Puntuar el
     * vecindario en vez de la fila suelta descarta los falsos huecos de una
     * sola fila (un borde fino, un borde suave) y centra el corte en los
     * huecos anchos, que son los que separan dos renglones de verdad.
     */
    const radio = 3;

    const tinta = new Map<number, number>();
    /** Muestras con tinta en una fila; en blanco, si el vecindario la pide */
    const tintaDeFila = (y: number): number => {
      if (y < 1 || y >= altura) {
        return Number.POSITIVE_INFINITY; // fuera del lienzo: nunca es un hueco
      }
      const memorizado = tinta.get(y);
      if (memorizado !== undefined) {
        return memorizado;
      }
      const base = y * lienzo.width * 4;
      let cuenta = 0;
      for (let x = 0; x < lienzo.width; x += muestreo) {
        const i = base + x * 4;
        if (pixeles[i] < 250 || pixeles[i + 1] < 250 || pixeles[i + 2] < 250) {
          cuenta++;
        }
      }
      tinta.set(y, cuenta);
      return cuenta;
    };

    const cortes: number[] = [];
    let desde = 0;

    while (altura - desde > altoUtilPx) {
      const limite = desde + altoUtilPx;
      const techo = Math.max(desde + 1, limite - ventana);

      // Se recorre de abajo arriba y solo se acepta una puntuación
      // estrictamente menor, de modo que los empates se resuelven quedándose
      // con la candidata más pegada al límite: el hueco más aprovechado.
      let corte = limite;
      let mejor = Number.POSITIVE_INFINITY;
      for (let y = limite; y >= techo; y--) {
        let puntuacion = 0;
        for (let k = -radio; k <= radio; k++) {
          puntuacion += tintaDeFila(y + k);
        }
        if (puntuacion < mejor) {
          mejor = puntuacion;
          corte = y;
        }
      }

      // Red de seguridad: el corte no puede rebasar el límite (el texto
      // pisaría el margen inferior) ni quedarse tan arriba que deje la
      // página prácticamente vacía.
      if (corte > limite || corte - desde < altoUtilPx / 4) {
        corte = limite;
      }

      cortes.push(corte);
      desde = corte;
    }

    cortes.push(altura);
    return cortes;
  }

  /** Pixeles del lienzo completos, para decidir dónde cortar */
  private leerPixeles(lienzo: HTMLCanvasElement): Uint8ClampedArray {
    // El lienzo ya tiene contexto (lo creó html2canvas); solo se lee
    const ctx = lienzo.getContext('2d');
    if (!ctx) {
      throw new Error('El navegador no permitió leer el lienzo del documento.');
    }
    return ctx.getImageData(0, 0, lienzo.width, lienzo.height).data;
  }

  /** Escribe código, fecha y huella en el margen inferior de la hoja */
  private dibujarFolioEnHoja(
    ctx: CanvasRenderingContext2D,
    hoja: HTMLCanvasElement,
    solicitud: SolicitudPdfAcuerdo,
    geo: ReturnType<PdfService['geometria']>,
  ): void {
    // 8pt a 2× de 96 ppp ≈ 21px de alto de fuente
    ctx.font = '21px Tahoma, Verdana, Geneva, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    const centro = hoja.width / 2;
    const pie = `CÓD.: ${solicitud.codigo || 'ACUERDO'} | Fecha: ${solicitud.fecha || ''} | SANDRA SERVER`;
    // Dentro de la banda del margen inferior, por debajo del último renglón
    ctx.fillText(pie, centro, hoja.height - geo.margenInfPx + 70);

    if (solicitud.huella) {
      ctx.fillText(`SHA-256: ${solicitud.huella}`, centro, hoja.height - geo.margenInfPx + 110);
    }
  }

  /** Da un cuadro de pintura a Chromium antes de rasterizar */
  private async esperarPintura(): Promise<void> {
    await new Promise((res) => requestAnimationFrame(() => setTimeout(res, 0)));
  }

  /** Sanea el nombre del archivo y garantiza la extensión .pdf */
  private nombreSeguro(nombre: string): string {
    const limpio = this.baseSegura(nombre);
    return limpio.toLowerCase().endsWith('.pdf') ? limpio : `${limpio}.pdf`;
  }

  /**
   * Deja un nombre sin acentos, espacios ni signos. Es la misma lista de
   * caracteres que conserva `SanitizarContentID` en el servidor: si aquí se
   * colara un carácter que el servidor cambia por un guion, el `cid:` del HTML
   * dejaría de encontrar su imagen y el correo saldría sin el documento.
   */
  private baseSegura(nombre: string): string {
    const base = (nombre || 'acuerdo')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return base.replace(/\.pdf$/i, '').replace(/^[-.]+|[-.]+$/g, '') || 'acuerdo';
  }
}
