import type { Acuerdo } from './new-agreement/acuerdo.model';

/**
 * Cuerpo del correo con el que se remite un acuerdo.
 *
 * El HTML va con estilos en línea porque los clientes de correo no respetan
 * hojas de estilo externas ni los márgenes de contrato de la hoja oficio.
 */
export interface CorreoAcuerdo {
  asunto: string;
  html: string;
  texto: string;
}

/** Escapa el texto que se interpola en el HTML del correo */
function esc(valor: unknown): string {
  if (valor === null || valor === undefined) return '';
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Fila de la tabla de datos del correo */
function fila(etiqueta: string, valor: unknown): string {
  const v = esc(valor);
  if (!v) return '';
  return `
    <tr>
      <td style="padding:4px 12px 4px 0;color:#757575;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(etiqueta)}</td>
      <td style="padding:4px 0;color:#212121;font:400 13px Arial,sans-serif">${v}</td>
    </tr>`;
}

/**
 * Arma el correo del acuerdo: presentación con los datos de control, el
 * documento redactado y el pie con la huella SHA-256.
 *
 * @param acuerdo acuerdo a remitir (documento ya redactado)
 * @param mensaje nota opcional que escribe quien envía
 */
export function construirCorreoAcuerdo(acuerdo: Acuerdo, mensaje?: string): CorreoAcuerdo {
  const codigo = acuerdo.codigo || '(sin código)';
  const titulo = acuerdo.titulo?.trim() || acuerdo.proyecto?.trim() || 'Acuerdo';
  const asunto = `Acuerdo ${codigo} — ${titulo}`;

  const documento = acuerdo.documentoHtml?.trim() ?? '';
  const huella = acuerdo.hashDocumento ?? '';
  const nota = mensaje?.trim();

  const html = `<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f4f6f8">
  <div style="max-width:760px;margin:0 auto;padding:24px">

    <!-- Presentación -->
    <div style="background:#0c2d48;color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0">
      <div style="font:400 12px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.85">FirmaLink — Acuerdo</div>
      <div style="font:700 20px Arial,sans-serif;margin-top:6px">${esc(codigo)}</div>
      <div style="font:400 14px Arial,sans-serif;margin-top:4px;opacity:.95">${esc(titulo)}</div>
    </div>

    <!-- Datos de control -->
    <div style="background:#ffffff;padding:18px 24px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${fila('Estado', acuerdo.estado)}
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
    </div>

    ${
      nota
        ? `<div style="background:#ffffff;padding:0 24px 18px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0">
             <div style="border-left:3px solid #00b8a9;background:#f4fbfa;padding:10px 14px;font:400 13px Arial,sans-serif;color:#37474f;white-space:pre-wrap">${esc(nota)}</div>
           </div>`
        : ''
    }

    <!-- Documento del acuerdo -->
    <div style="background:#ffffff;padding:24px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0">
      <div style="font:700 12px Arial,sans-serif;color:#757575;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid #eeeeee;padding-bottom:8px;margin-bottom:16px">
        Documento del acuerdo
      </div>
      <div style="font:400 13px 'Tahoma',Arial,sans-serif;color:#212121;line-height:1.55">
        ${documento || '<em style="color:#9e9e9e">El documento no tiene contenido redactado.</em>'}
      </div>
    </div>

    <!-- Pie con la huella -->
    <div style="background:#ffffff;padding:16px 24px 22px;border:1px solid #e0e0e0;border-top:0;border-radius:0 0 12px 12px">
      <div style="font:600 11px Arial,sans-serif;color:#757575;letter-spacing:.06em;text-transform:uppercase">Huella del documento (SHA-256)</div>
      <div style="font:400 11px 'Courier New',monospace;color:#546e7a;word-break:break-all;margin-top:4px">
        ${huella ? esc(huella) : '<em>sin calcular</em>'}
      </div>
      <div style="font:400 11px Arial,sans-serif;color:#9e9e9e;margin-top:10px">
        Enviado desde FirmaLink — ${esc(new Date().toLocaleString('es-VE'))}
      </div>
    </div>

  </div>
</body>
</html>`;

  const datos: string[] = [
    `Estado: ${acuerdo.estado ?? ''}`,
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

  const lineas: string[] = [`ACUERDO ${codigo}`, titulo, '', ...datos];

  if (nota) {
    lineas.push('', 'Nota:', nota);
  }

  lineas.push(
    '',
    '--- DOCUMENTO ---',
    (acuerdo.documentoTexto || '').trim() || '(el documento no tiene contenido redactado)',
    '',
    `Huella SHA-256: ${huella || 'sin calcular'}`,
    `Enviado desde FirmaLink — ${new Date().toLocaleString('es-VE')}`,
  );

  return {
    asunto,
    html,
    texto: lineas.join('\n'),
  };
}
