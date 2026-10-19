import type { AdjuntoCorreo } from '../../shared/services/api.service';
import { sanitizarContentId } from '../../shared/correo/content-id';
import { esc, plantillaCorreo } from '../../shared/correo/plantilla-correo';
import {
  alicuotaIvaEfectiva,
  calcularTotalesPresupuesto,
  diasDeValidezRestantes,
  fechaValidezCorta,
  formatoBs,
  formatoCantidad,
  formatoPorcentaje,
  type Presupuesto,
} from './presupuesto.model';

/**
 * Cuerpo del correo con el que se remite un presupuesto digital.
 *
 * El HTML se arma sobre la plantilla institucional (`plantillaCorreo`) con
 * estilos en línea, siguiendo las reglas de los clientes de correo. La hoja
 * NO se pega como HTML en el cuerpo: viaja como archivo adjunto (PDF) y,
 * además, como una imagen incrustada por página, referenciada con `cid:`.
 *
 * A diferencia del correo de la factura, aquí no hay datos fiscales: un
 * presupuesto es un documento comercial, no un comprobante tributario. Lo que
 * sí lleva son las condiciones comerciales de la oferta (validez, forma de
 * pago, entrega, garantía, lugar y alcance) y la nota expresa de que el
 * documento no constituye una factura.
 */
export interface CorreoPresupuesto {
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

/** Fila de la tabla de renglones cotizados */
function filaRenglon(descripcion: string, cantidad: number, precio: number): string {
  const total = (Number(cantidad) || 0) * (Number(precio) || 0);
  return `
              <tr>
                <td style="padding:6px 10px 6px 0;color:#111827;font:400 13px Arial,sans-serif;border-bottom:1px solid #F3F4F6">${esc(descripcion)}</td>
                <td style="padding:6px 10px 6px 0;color:#111827;font:400 13px Arial,sans-serif;text-align:right;white-space:nowrap;border-bottom:1px solid #F3F4F6">${esc(formatoCantidad(cantidad))}</td>
                <td style="padding:6px 10px 6px 0;color:#111827;font:400 13px Arial,sans-serif;text-align:right;white-space:nowrap;border-bottom:1px solid #F3F4F6">${esc(formatoBs(precio))}</td>
                <td style="padding:6px 0;color:#111827;font:600 13px Arial,sans-serif;text-align:right;white-space:nowrap;border-bottom:1px solid #F3F4F6">${esc(formatoBs(total))}</td>
              </tr>`;
}

/** Fila de la tabla de condiciones comerciales */
function filaCondicion(etiqueta: string, valor: string | undefined): string {
  if (!valor?.trim()) return '';
  return `
              <tr>
                <td style="padding:5px 14px 5px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(etiqueta)}</td>
                <td style="padding:5px 0;color:#111827;font:400 13px Arial,sans-serif">${esc(valor)}</td>
              </tr>`;
}

/**
 * Arma el correo del presupuesto: presentación con los datos del documento, los
 * renglones cotizados, los totales, las condiciones comerciales, la hoja
 * reproducida y el pie con la huella SHA-256.
 *
 * El PDF se genera fuera (con `generarPdfPresupuesto`, de `presupuesto-pdf.ts`)
 * y sus hojas llegan listas como adjuntos incrustables.
 *
 * @param presupuesto presupuesto a remitir
 * @param mensaje nota opcional que escribe quien envía
 * @param paginas hojas del PDF ya listas como adjuntos incrustables
 * @param logoNombre nombre del logo incrustado, si se envía
 * @param totalPaginas hojas totales del PDF, cuando la vista previa va recortada
 */
export function construirCorreoPresupuesto(
  presupuesto: Presupuesto,
  mensaje?: string,
  paginas: AdjuntoCorreo[] = [],
  logoNombre?: string,
  totalPaginas?: number,
): CorreoPresupuesto {
  const numero = presupuesto.numero || '(sin número)';
  const cliente = presupuesto.cliente?.nombre?.trim() || 'Cliente sin nombre';
  const asunto = `Presupuesto ${numero} — ${cliente}`;

  const emisor = presupuesto.emisor;
  const huella = presupuesto.huella ?? '';
  const nota = mensaje?.trim();
  const pdf = `${presupuesto.codigo?.trim() || `PRESUPUESTO-${numero}`}.pdf`;

  // Sin totales congelados se calculan al vuelo: el correo nunca muestra cero
  const t = presupuesto.totales ?? calcularTotalesPresupuesto(presupuesto);
  const alicuota = alicuotaIvaEfectiva(presupuesto);
  const validezCorta = fechaValidezCorta(presupuesto);
  const diasRestantes = diasDeValidezRestantes(presupuesto);
  const validezTexto = validezCorta
    ? `Válido hasta el ${validezCorta}${
        diasRestantes > 0
          ? ` (${formatoCantidad(diasRestantes)} ${diasRestantes === 1 ? 'día' : 'días'} restantes)`
          : diasRestantes <= 0
            ? ' (vencido)'
            : ''
      }`
    : '';

  const hojasTotales = totalPaginas ?? paginas.length;
  const recortadas = hojasTotales > paginas.length;
  const avisoDocumento = recortadas
    ? `, en hoja de presupuesto de 21,7 × 28 cm (${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'}). Arriba se reproduce el comienzo, ${paginas.length} de ${hojasTotales} páginas.`
    : paginas.length
      ? ` (${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'}).`
      : '.';
  const avisoTexto = paginas.length
    ? ` (${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'})`
    : '';

  const c = presupuesto.condiciones;
  const cuerpoHtml = `
              <!-- Datos del presupuesto -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Presupuesto</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">${esc(numero)}</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${fila('Estado', presupuesto.estado)}
                ${fila('Fecha de emisión', presupuesto.fechaTexto)}
                ${fila('Validez', validezTexto)}
                ${fila('Periodo', presupuesto.mes)}
                ${fila('Cliente', presupuesto.cliente?.nombre)}
                ${fila('RIF', presupuesto.cliente?.rif || presupuesto.cliente?.identificacion)}
                ${fila('Dirección', presupuesto.cliente?.direccion)}
                ${fila('Teléfono', presupuesto.cliente?.telefono)}
              </table>

              ${
                presupuesto.items?.length
                  ? `
              <!-- Renglones cotizados -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:18px 0 0 0">
                <tr>
                  <td style="padding:0 0 8px 0;border-bottom:1px solid #F3F4F6;font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">
                    Renglones cotizados
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin-top:6px">
                      <tr>
                        <td style="padding:0 10px 6px 0;color:#6B7280;font:600 11px Arial,sans-serif;text-transform:uppercase;border-bottom:1px solid #E5E7EB">Descripción</td>
                        <td style="padding:0 10px 6px 0;color:#6B7280;font:600 11px Arial,sans-serif;text-align:right;text-transform:uppercase;border-bottom:1px solid #E5E7EB">Cantidad</td>
                        <td style="padding:0 10px 6px 0;color:#6B7280;font:600 11px Arial,sans-serif;text-align:right;text-transform:uppercase;border-bottom:1px solid #E5E7EB">Precio</td>
                        <td style="padding:0 0 6px 0;color:#6B7280;font:600 11px Arial,sans-serif;text-align:right;text-transform:uppercase;border-bottom:1px solid #E5E7EB">Total</td>
                      </tr>
                      ${presupuesto.items
                        .map((it) => filaRenglon(it.descripcion, it.cantidad, it.precio))
                        .join('')}
                    </table>
                  </td>
                </tr>
              </table>`
                  : ''
              }

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
                      ${t.descuento > 0 ? filaImporte('Descuento', `- ${t.descuento.toFixed(2)} Bs`, true) : ''}
                      ${filaImporte(`IVA (${formatoPorcentaje(alicuota)})`, `${t.montoIva.toFixed(2)} Bs`)}
                      ${filaImporte('Total Bs', `${t.total.toFixed(2)} Bs`)}
                    </table>
                  </td>
                </tr>
              </table>

              ${
                c
                  ? `
              <!-- Condiciones comerciales de la oferta -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:18px 0 0 0">
                <tr>
                  <td style="padding:0 0 8px 0;border-bottom:1px solid #F3F4F6;font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">
                    Condiciones de la oferta
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin-top:6px">
                      ${filaCondicion('Validez', c.validezDias != null ? `${formatoCantidad(c.validezDias)} días, hasta el ${validezCorta}` : '')}
                      ${filaCondicion('Forma de pago', c.formaPago)}
                      ${filaCondicion('Tiempo de entrega', c.tiempoEntrega)}
                      ${filaCondicion('Garantía', c.garantia)}
                      ${filaCondicion('Lugar', c.lugar)}
                      ${filaCondicion('Alcance', c.alcance)}
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

              <!-- Nota: el presupuesto no es un documento fiscal -->
              <div style="margin:20px 0 0 0;background-color:#FFFBEB;border:1px solid #FDE68A;border-left:4px solid #D97706;border-radius:8px;padding:14px 16px;font:400 13px Arial,sans-serif;color:#78350F">
                <strong style="letter-spacing:.04em">DOCUMENTO NO FISCAL — NO CONSTITUYE FACTURA.</strong>
                Este presupuesto es una oferta comercial de precios; no es un comprobante fiscal ni genera
                obligaciones tributarias. Para aprobarlo basta con responder a este correo indicando su
                conformidad, o devolver firmado el bloque de aceptación que aparece en la hoja adjunta.
              </div>

              <!-- Hoja del presupuesto: una imagen incrustada por página -->
              <div style="margin:28px 0 0 0;padding:22px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px">
                  Hoja del presupuesto${paginas.length > 1 ? ` — ${paginas.length} páginas` : ''}
                </div>
                ${paginas
                  .map(
                    (pagina, i) => `
                <img class="doc-page" src="cid:${sanitizarContentId(pagina.nombre)}" width="516"
                     alt="Hoja ${i + 1} del presupuesto ${esc(numero)}"
                     style="display:block;width:100%;max-width:100%;height:auto;border:1px solid #E5E7EB;border-radius:6px;margin:0 0 ${i < paginas.length - 1 ? '16px' : '0'}">`,
                  )
                  .join('')}
                <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #E5E7EB;font:400 13px Arial,sans-serif;color:#4B5563">
                  El presupuesto completo viaja adjunto a este correo en PDF:
                  <strong style="color:#065F46">${esc(pdf)}</strong>${avisoDocumento}
                </div>
              </div>

              <!-- Firma del emisor -->
              <div style="margin:24px 0 0 0;padding:16px 0 0 0;border-top:1px solid #F3F4F6;font:400 13px Arial,sans-serif;color:#37474F;line-height:1.6">
                Atentamente,<br>
                <strong style="color:#111827">${esc(emisor.nombre)}</strong><br>
                RIF: ${esc(emisor.rif)}<br>
                Correo: ${esc(emisor.correo)} &nbsp;&nbsp; Teléfonos: ${esc(emisor.telefonos)}
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
    titulo: `Presupuesto ${numero}`,
    encabezado: 'FIRMALINK',
    preheader: `${numero} — ${cliente}. Presupuesto adjunto en PDF${
      paginas.length ? ` y ${hojasTotales} ${hojasTotales === 1 ? 'página' : 'páginas'} en el cuerpo.` : '.'
    }`,
    cuerpoHtml,
    logoCid: logoNombre ? `cid:${sanitizarContentId(logoNombre)}` : undefined,
    logoAlt: 'FirmaLink',
  });

  // El texto plano repite los datos, omitiendo los que no existen
  const datos: string[] = [
    `Estado: ${presupuesto.estado}`,
    `Fecha de emisión: ${presupuesto.fechaTexto}`,
    validezTexto ? `Validez: ${validezTexto}` : '',
    presupuesto.mes ? `Periodo: ${presupuesto.mes}` : '',
    `Cliente: ${presupuesto.cliente?.nombre ?? ''}`,
    `RIF: ${presupuesto.cliente?.rif || presupuesto.cliente?.identificacion || ''}`,
    t ? `Subtotal: ${t.subtotal.toFixed(2)} Bs` : '',
    t && t.descuento > 0 ? `Descuento: - ${t.descuento.toFixed(2)} Bs` : '',
    t ? `IVA (${formatoPorcentaje(alicuota)}): ${t.montoIva.toFixed(2)} Bs` : '',
    t ? `Total Bs: ${t.total.toFixed(2)} Bs` : '',
  ].filter(Boolean);

  const condiciones: string[] = [
    c?.formaPago ? `Forma de pago: ${c.formaPago}` : '',
    c?.tiempoEntrega ? `Tiempo de entrega: ${c.tiempoEntrega}` : '',
    c?.garantia ? `Garantía: ${c.garantia}` : '',
    c?.lugar ? `Lugar: ${c.lugar}` : '',
    c?.alcance?.trim() ? `Alcance: ${c.alcance.trim()}` : '',
  ].filter(Boolean);

  const texto = [
    'FIRMALINK',
    `Presupuesto ${numero} — ${cliente}`,
    '',
    ...datos,
    ...(condiciones.length ? ['', 'Condiciones de la oferta:', ...condiciones.map((linea) => `- ${linea}`)] : []),
    ...(nota ? ['', `Nota: ${nota}`] : []),
    '',
    'DOCUMENTO NO FISCAL — NO CONSTITUYE FACTURA.',
    'Para aprobarlo basta con responder a este correo o devolver firmado el bloque de aceptación de la hoja.',
    '',
    `El presupuesto completo se envía como archivo adjunto en PDF: ${pdf}${avisoTexto}`,
    ...(recortadas
      ? [`Las primeras ${paginas.length} de ${hojasTotales} páginas se reproducen en el cuerpo del mensaje.`]
      : []),
    '',
    `Huella SHA-256: ${huella || 'sin calcular'}`,
    '',
    `Atentamente,`,
    emisor.nombre,
    `RIF: ${emisor.rif}`,
    `Correo: ${emisor.correo} — Teléfonos: ${emisor.telefonos}`,
  ].join('\n');

  return { asunto, html, texto };
}
