import type { AdjuntoCorreo } from '../../shared/services/api.service';
import { sanitizarContentId } from '../../shared/correo/content-id';
import { esc, plantillaCorreo } from '../../shared/correo/plantilla-correo';
import { formatearControl, type Factura } from './factura.model';

/**
 * Cuerpo del correo con el que se remite una factura digital.
 *
 * El HTML se arma sobre la plantilla institucional (`plantillaCorreo`) con
 * estilos en línea, siguiendo las reglas de los clientes de correo. La hoja
 * NO se pega como HTML en el cuerpo: viaja como archivo adjunto (PDF) y,
 * además, como una imagen incrustada por página, referenciada con `cid:`.
 */
export interface CorreoFactura {
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

/** Fila de importe de la tabla de totales */
function filaImporte(etiqueta: string, importe: string, negativo = false): string {
  if (!importe) return '';
  return `
              <tr>
                <td style="padding:4px 14px 4px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap">${esc(etiqueta)}</td>
                <td style="padding:4px 0;font:600 13px Arial,sans-serif;text-align:right;white-space:nowrap;${
                  negativo ? 'color:#B91C1C' : 'color:#111827'
                }">${esc(importe)}</td>
              </tr>`;
}

/**
 * Arma el correo de la factura: presentación con los datos de control, los
 * totales, la hoja reproducida y el pie con la huella SHA-256.
 *
 * @param factura factura a remitir
 * @param mensaje nota opcional que escribe quien envía
 * @param paginas hojas del PDF ya listas como adjuntos incrustables
 * @param logoNombre nombre del logo incrustado, si se envía
 * @param totalPaginas hojas totales del PDF, cuando la vista previa va recortada
 */
export function construirCorreoFactura(
  factura: Factura,
  mensaje?: string,
  paginas: AdjuntoCorreo[] = [],
  logoNombre?: string,
  totalPaginas?: number,
): CorreoFactura {
  const numero = factura.numero || '(sin número)';
  const control = formatearControl(factura.controlPrefijo, factura.numeroControl);
  const cliente = factura.cliente?.nombre?.trim() || 'Cliente sin nombre';
  const asunto = `Factura ${numero} — ${cliente}`;

  const huella = factura.huella ?? '';
  const nota = mensaje?.trim();
  const pdf = `${factura.codigo?.trim() || `FACTURA-${numero}`}.pdf`;

  const t = factura.totales;
  const hojasTotales = totalPaginas ?? paginas.length;
  const recortadas = hojasTotales > paginas.length;
  const avisoDocumento = recortadas
    ? `, en hoja de facturación de 21,7 × 28 cm (${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'}). Arriba se reproduce el comienzo, ${paginas.length} de ${hojasTotales} páginas.`
    : paginas.length
      ? ` (${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'}).`
      : '.';
  const avisoTexto = paginas.length
    ? ` (${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'})`
    : '';

  const cuerpoHtml = `
              <!-- Datos de control -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Factura</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">${esc(numero)}</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${fila('N° de control', control)}
                ${fila('Formato', factura.formato)}
                ${fila('Estado', factura.estado)}
                ${fila('Fecha de emisión', factura.fechaTexto)}
                ${fila('Periodo', factura.mes)}
                ${fila('Cliente', factura.cliente?.nombre)}
                ${fila('RIF', factura.cliente?.rif || factura.cliente?.identificacion)}
                ${fila('Dirección', factura.cliente?.direccion)}
              </table>

              ${
                t
                  ? `
              <!-- Totales -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:18px 0 0 0">
                <tr>
                  <td style="padding:0 0 8px 0;border-bottom:1px solid #F3F4F6;font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">
                    Totales
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin-top:6px">
                      ${filaImporte('Subtotal', `${t.subtotal.toFixed(2)} Bs`)}
                      ${t.montoIva > 0 ? filaImporte('IVA', `${t.montoIva.toFixed(2)} Bs`) : ''}
                      ${t.montoIgtf > 0 ? filaImporte('IGTF', `${t.montoIgtf.toFixed(2)} Bs`) : ''}
                      ${filaImporte('Total Bs', `${t.total.toFixed(2)} Bs`)}
                      ${t.retencionIva > 0 ? filaImporte('Ret. IVA', `- ${t.retencionIva.toFixed(2)} Bs`, true) : ''}
                      ${t.retencionIslr > 0 ? filaImporte('Ret. ISLR', `- ${t.retencionIslr.toFixed(2)} Bs`, true) : ''}
                      ${t.retencionIva > 0 || t.retencionIslr > 0 ? filaImporte('Neto a pagar', `${t.netoAPagar.toFixed(2)} Bs`) : ''}
                    </table>
                  </td>
                </tr>
              </table>`
                  : ''
              }

              ${
                nota
                  ? `<div style="margin:20px 0 0 0;border-left:3px solid #059669;background-color:#F0FDF7;padding:12px 16px;font:400 13px Arial,sans-serif;color:#37474F;white-space:pre-wrap">${esc(nota)}</div>`
                  : ''
              }

              <!-- Hoja de la factura: una imagen incrustada por página -->
              <div style="margin:28px 0 0 0;padding:22px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px">
                  Hoja de la factura${paginas.length > 1 ? ` — ${paginas.length} páginas` : ''}
                </div>
                ${paginas
                  .map(
                    (pagina, i) => `
                <img class="doc-page" src="cid:${sanitizarContentId(pagina.nombre)}" width="516"
                     alt="Hoja ${i + 1} de la factura ${esc(numero)}"
                     style="display:block;width:100%;max-width:100%;height:auto;border:1px solid #E5E7EB;border-radius:6px;margin:0 0 ${i < paginas.length - 1 ? '16px' : '0'}">`,
                  )
                  .join('')}
                <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #E5E7EB;font:400 13px Arial,sans-serif;color:#4B5563">
                  La factura completa viaja adjunta a este correo en PDF:
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
    titulo: `Factura ${numero}`,
    encabezado: 'FIRMALINK',
    preheader: `${numero} — ${cliente}. Factura adjunta en PDF${
      paginas.length ? ` y ${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'} en el cuerpo.` : '.'
    }`,
    cuerpoHtml,
    logoCid: logoNombre ? `cid:${sanitizarContentId(logoNombre)}` : undefined,
    logoAlt: 'FirmaLink',
  });

  // El texto plano repite los datos, omitiendo los que no existen
  const datos: string[] = [
    `N° de control: ${control}`,
    `Formato: ${factura.formato}`,
    `Estado: ${factura.estado}`,
    `Fecha de emisión: ${factura.fechaTexto}`,
    `Periodo: ${factura.mes}`,
    `Cliente: ${factura.cliente?.nombre ?? ''}`,
    `RIF: ${factura.cliente?.rif || factura.cliente?.identificacion || ''}`,
    t ? `Subtotal: ${t.subtotal.toFixed(2)} Bs` : '',
    t && t.montoIva > 0 ? `IVA: ${t.montoIva.toFixed(2)} Bs` : '',
    t && t.montoIgtf > 0 ? `IGTF: ${t.montoIgtf.toFixed(2)} Bs` : '',
    t ? `Total Bs: ${t.total.toFixed(2)} Bs` : '',
    t && t.retencionIva > 0 ? `Ret. IVA: ${t.retencionIva.toFixed(2)} Bs` : '',
    t && t.retencionIslr > 0 ? `Ret. ISLR: ${t.retencionIslr.toFixed(2)} Bs` : '',
    t && (t.retencionIva > 0 || t.retencionIslr > 0) ? `Neto a pagar: ${t.netoAPagar.toFixed(2)} Bs` : '',
  ].filter(Boolean);

  const texto = [
    'FIRMALINK',
    `Factura ${numero} — ${cliente}`,
    '',
    ...datos,
    ...(nota ? ['', `Nota: ${nota}`] : []),
    '',
    `La factura completa se envía como archivo adjunto en PDF: ${pdf}${avisoTexto}`,
    ...(recortadas
      ? [`Las primeras ${paginas.length} de ${hojasTotales} páginas se reproducen en el cuerpo del mensaje.`]
      : []),
    '',
    `Huella SHA-256: ${huella || 'sin calcular'}`,
  ].join('\n');

  return { asunto, html, texto };
}
