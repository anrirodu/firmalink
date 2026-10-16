import type { AdjuntoCorreo } from '../../shared/services/api.service';
import { sanitizarContentId } from '../../shared/correo/content-id';
import { esc, plantillaCorreo } from '../../shared/correo/plantilla-correo';
import type { Acuerdo } from './new-agreement/acuerdo.model';

/**
 * Cuerpo del correo con el que se remite un acuerdo.
 *
 * El HTML se arma sobre la plantilla institucional (`plantillaCorreo`) y usa
 * estilos en línea porque los clientes de correo no respetan hojas de estilo
 * externas ni los márgenes de contrato de la hoja oficio.
 */
export interface CorreoAcuerdo {
  asunto: string;
  html: string;
  texto: string;
}

/** Fila de la tabla de datos del correo */
function fila(etiqueta: string, valor: unknown): string {
  const v = esc(valor);
  if (!v) return '';
  return `
              <tr>
                <td style="padding:5px 14px 5px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(etiqueta)}</td>
                <td style="padding:5px 0;color:#111827;font:400 13px Arial,sans-serif">${v}</td>
              </tr>`;
}

/**
 * Arma el correo del acuerdo: presentación con los datos de control, las
 * páginas del documento y el pie con la huella SHA-256.
 *
 * El documento NO se pega como HTML en el cuerpo: viaja como archivo adjunto y,
 * además, como una imagen incrustada por página. Las imágenes se referencian
 * con `cid:`, no con un `data:` URI, porque Gmail y Outlook descartan los
 * `data:` URI y el documento se vería como un hueco en blanco.
 *
 * @param acuerdo acuerdo a remitir
 * @param mensaje nota opcional que escribe quien envía
 * @param paginas páginas del PDF ya listas como adjuntos incrustables
 * @param logoNombre nombre del logo incrustado, si se envía
 * @param totalPaginas páginas totales del PDF, cuando la vista previa va recortada
 */
export function construirCorreoAcuerdo(
  acuerdo: Acuerdo,
  mensaje?: string,
  paginas: AdjuntoCorreo[] = [],
  logoNombre?: string,
  totalPaginas?: number,
): CorreoAcuerdo {
  const codigo = acuerdo.codigo || '(sin código)';
  const titulo = acuerdo.titulo?.trim() || acuerdo.proyecto?.trim() || 'Acuerdo';
  const asunto = `Acuerdo ${codigo} — ${titulo}`;

  const huella = acuerdo.hashDocumento ?? '';
  const nota = mensaje?.trim();
  const pdf = `${codigo}.pdf`;

  // El PDF siempre lleva el documento completo; la vista previa del cuerpo no,
  // cuando el acuerdo es tan largo que sus páginas no caben en el cupo de
  // adjuntos del correo. El aviso lo dice para que nadie dé por leído lo que no
  // se reprodujo.
  const paginasTotales = totalPaginas ?? paginas.length;
  const recortadas = paginasTotales > paginas.length;
  const avisoDocumento = recortadas
    ? `, en hoja Carta (${paginasTotales} páginas). Arriba se reproduce el comienzo, ${paginas.length} de ${paginasTotales} páginas.`
    : paginas.length
      ? `, en hoja Carta (${paginasTotales} ${paginasTotales === 1 ? 'página' : 'páginas'}).`
      : '.';
  // Versión para el texto plano: ahí no se describe dónde está la vista previa
  const avisoTexto = paginas.length
    ? `, en hoja Carta (${paginasTotales} ${paginasTotales === 1 ? 'página' : 'páginas'})`
    : '';

  const cuerpoHtml = `
              <!-- Datos de control -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Acuerdo</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">${esc(codigo)}</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${fila('Estado', acuerdo.estado)}
                ${fila('Título', titulo)}
                ${fila('Proyecto', acuerdo.proyecto)}
                ${fila('Área', acuerdo.area)}
                ${fila('Gerente', acuerdo.gerente)}
                ${fila('Representante', acuerdo.representante)}
                ${fila('Cédula', acuerdo.cedula)}
                ${fila('Vigencia', acuerdo.vigencia)}
                ${fila('Ciudad', acuerdo.ciudad)}
                ${fila('Fecha de firma', acuerdo.fechaFirma)}
                ${fila('Honorario', acuerdo.honorario ? `${acuerdo.honorario} (${acuerdo.quincena || 'sin periodicidad'})` : '')}
              </table>

              ${
                nota
                  ? `<div style="margin:20px 0 0 0;border-left:3px solid #059669;background-color:#F0FDF7;padding:12px 16px;font:400 13px Arial,sans-serif;color:#37474F;white-space:pre-wrap">${esc(nota)}</div>`
                  : ''
              }

              <!-- Documento: una imagen incrustada por página -->
              <div style="margin:28px 0 0 0;padding:22px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px">
                  Documento del acuerdo${paginas.length > 1 ? ` — ${paginas.length} páginas` : ''}
                </div>
                ${paginas
                  .map(
                    (pagina, i) => `
                <img class="doc-page" src="cid:${sanitizarContentId(pagina.nombre)}" width="516"
                     alt="Página ${i + 1} del acuerdo ${esc(codigo)}"
                     style="display:block;width:100%;max-width:100%;height:auto;border:1px solid #E5E7EB;border-radius:6px;margin:0 0 ${i < paginas.length - 1 ? '16px' : '0'}">`,
                  )
                  .join('')}
                <!-- Siempre visible: si el cliente descarta las imágenes, este
                     aviso es lo único que le dice al destinatario dónde está
                     el documento. -->
                <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #E5E7EB;font:400 13px Arial,sans-serif;color:#4B5563">
                  El documento completo viaja adjunto a este correo:
                  <strong style="color:#065F46">${esc(pdf)}</strong>${avisoDocumento}
                </div>
              </div>

              <!-- Huella -->
              <div style="margin:24px 0 0 0;background-color:#ECFDF5;border:1px solid #A7F3D0;border-left:4px solid #059669;border-radius:8px;padding:14px 16px">
                <div style="font:700 11px Arial,sans-serif;color:#047857;letter-spacing:.06em;text-transform:uppercase">
                  Huella del documento (SHA-256)
                </div>
                <div style="font:400 12px 'Courier New',Courier,monospace;color:#047857;word-break:break-all;margin-top:6px">
                  ${huella ? esc(huella) : '<em style="color:#9CA3AF">sin calcular</em>'}
                </div>
              </div>`;

  const html = plantillaCorreo({
    titulo: `Acuerdo ${codigo}`,
    encabezado: 'FIRMALINK',
    preheader: `${codigo} — ${titulo}. Documento adjunto en PDF${
      paginas.length ? ` y ${paginasTotales} ${paginasTotales === 1 ? 'página' : 'páginas'} en el cuerpo.` : '.'
    }`,
    cuerpoHtml,
    logoCid: logoNombre ? `cid:${sanitizarContentId(logoNombre)}` : undefined,
    logoAlt: 'FirmaLink',
  });

  // El texto plano repite los datos de la tabla, omitiendo los que no existen
  // (el HTML ya los salta en `fila`): una etiqueta sin valor no informa de nada
  const datos: string[] = [
    acuerdo.estado ? `Estado: ${acuerdo.estado}` : '',
    `Título: ${titulo}`,
    acuerdo.proyecto ? `Proyecto: ${acuerdo.proyecto}` : '',
    acuerdo.area ? `Área: ${acuerdo.area}` : '',
    acuerdo.gerente ? `Gerente: ${acuerdo.gerente}` : '',
    acuerdo.representante ? `Representante: ${acuerdo.representante}` : '',
    acuerdo.cedula ? `Cédula: ${acuerdo.cedula}` : '',
    acuerdo.vigencia ? `Vigencia: ${acuerdo.vigencia}` : '',
    acuerdo.ciudad ? `Ciudad: ${acuerdo.ciudad}` : '',
    acuerdo.fechaFirma ? `Fecha de firma: ${acuerdo.fechaFirma}` : '',
    acuerdo.honorario ? `Honorario: ${acuerdo.honorario}` : '',
  ].filter(Boolean);

  const texto = [
    'FIRMALINK',
    `${codigo} — ${titulo}`,
    '',
    ...datos,
    // La nota va en su propio bloque para que no se confunda con los datos
    ...(nota ? ['', `Nota: ${nota}`] : []),
    '',
    `El documento completo se envía como archivo adjunto: ${pdf}${avisoTexto}`,
    // Solo cuando la vista previa va recortada: en texto plano no hay "arriba"
    ...(recortadas
      ? [`Las primeras ${paginas.length} de ${paginasTotales} páginas se reproducen en el cuerpo del mensaje.`]
      : []),
    '',
    `Huella SHA-256: ${huella || 'sin calcular'}`,
  ].join('\n');

  return { asunto, html, texto };
}
