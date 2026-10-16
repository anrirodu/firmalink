import type { AdjuntoCorreo } from '../../shared/services/api.service';
import { sanitizarContentId } from '../../shared/correo/content-id';
import type { PdfAcuerdo, PdfService } from '../../shared/services/pdf.service';
import type { Acuerdo } from './new-agreement/acuerdo.model';

/** Márgenes de contrato por defecto, iguales a los del editor */
const MARGEN_DEFECTO = { sup: 2.5, inf: 2.5, izq: 3, der: 2.5 };

export interface PdfAcuerdoGenerado {
  /** Adjunto que viaja con el correo */
  adjunto: AdjuntoCorreo;
  /**
   * Cada página como imagen, para incrustarla en el cuerpo del mensaje. El
   * nombre de cada una es su Content-ID: el HTML las referencia con `cid:`.
   *
   * Puede llevar menos páginas que el PDF: el correo tiene un cupo máximo de
   * adjuntos y un documento largo no cabe entero como imagen.
   */
  paginas: AdjuntoCorreo[];
  /** Páginas totales del PDF, para poder avisar si la vista previa va recortada */
  totalPaginas: number;
}

/**
 * Genera el PDF del acuerdo para adjuntarlo al correo y para incrustarlo en
 * el cuerpo del mensaje.
 *
 * La conversión ocurre en el navegador: el servidor no expone un conversor
 * HTML→PDF y solo acepta adjuntos ya formados. Se respeta la tipografía y los
 * márgenes configurados en el editor.
 *
 * @param pdf servicio que rasteriza y arma el archivo
 * @param acuerdo acuerdo a remitir
 * @param contenidoHtml cuerpo del documento; si se omite se usa el del acuerdo
 */
export async function generarPdfAcuerdo(
  pdf: PdfService,
  acuerdo: Acuerdo,
  contenidoHtml?: string,
): Promise<PdfAcuerdoGenerado> {
  const codigo = acuerdo.codigo?.trim() || 'ACUERDO';
  const contenido = (contenidoHtml ?? acuerdo.documentoHtml ?? '').trim();
  const margen = { ...MARGEN_DEFECTO, ...(acuerdo.margen ?? {}) };
  const fecha = fechaDelAcuerdo(acuerdo);
  const huella = acuerdo.hashDocumento ?? '';

  const resultado: PdfAcuerdo = await pdf.generarAcuerdoPdf({
    contenidoHtml: contenido,
    margen,
    codigo,
    fecha,
    huella,
    nombre: `${codigo}.pdf`,
  });

  return {
    adjunto: {
      nombre: resultado.nombre,
      contenido: resultado.blob,
      contentType: 'application/pdf',
    },
    paginas: resultado.paginas.map((pagina) => ({
      nombre: pagina.nombre,
      contenido: pagina.blob,
      contentType: 'image/jpeg',
    })),
    totalPaginas: resultado.totalPaginas,
  };
}

/** Fecha del pie: la de firma si existe, si no la del día */
function fechaDelAcuerdo(acuerdo: Acuerdo): string {
  const d = acuerdo.fechaFirma?.trim() ? new Date(acuerdo.fechaFirma) : new Date();
  const fecha = isNaN(d.getTime()) ? new Date() : d;
  return fecha.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Nombre con el que viaja el isotipo en el correo. Es a la vez el Content-ID
 * que usa la plantilla (`cid:firmalink-isotipo.png`).
 */
export const LOGO_CORREO = sanitizarContentId('firmalink-isotipo.png');

/**
 * Carga el isotipo del proyecto para incrustarlo en la cabecera del correo.
 *
 * Se lee del propio paquete de la aplicación, no de una URL pública: el
 * servidor puede estar detrás de una VPN y el cliente de correo no tendría
 * forma de alcanzarlo. Se usa el PNG y no el webp porque Outlook no pinta webp.
 *
 * Devuelve `undefined` si el archivo no está: el correo sale sin logo, que es
 * preferible a no enviarlo.
 */
export async function cargarLogoCorreo(): Promise<AdjuntoCorreo | undefined> {
  try {
    const url = new URL('assets/images/isotipo.png', document.baseURI).href;
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      return undefined;
    }
    const contenido = await respuesta.blob();
    if (!contenido.size) {
      return undefined;
    }
    return { nombre: LOGO_CORREO, contenido, contentType: 'image/png' };
  } catch {
    return undefined;
  }
}
