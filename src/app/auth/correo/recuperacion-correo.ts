/**
 * Correo de recuperación de contraseña de FirmaLink.
 *
 * Se construye con la misma receta que el correo de presupuestos
 * (`pages/budgets/presupuesto-correo.ts`): plantilla institucional compartida,
 * bloque de control con rótulo en mayúsculas, tabla de datos con `fila()`,
 * aviso destacado en ámbar y nota en verde. La única diferencia es que este
 * correo no lleva adjuntos ni imágenes incrustadas (el enlace de
 * restablecimiento no requiere Content-ID).
 */

import { esc, plantillaCorreo } from '../../shared/correo/plantilla-correo';
import { CONFIG } from '../../config';

/** Minutos de vigencia del enlace, repetidos en el aviso del cuerpo. */
export const VIGENCIA_MINUTOS = 15;

/** Fila etiqueta/valor, con el mismo formato que la tabla de presupuestos. */
function fila(etiqueta: string, valor: unknown): string {
  const v = esc(valor);
  if (!v) return '';
  return `
              <tr>
                <td style="padding:5px 14px 5px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(etiqueta)}</td>
                <td style="padding:5px 0;color:#111827;font:400 13px Arial,sans-serif">${v}</td>
              </tr>`;
}

/** Fecha de la solicitud en el formato corto del sistema (dd/mm/aaaa, hh:mm). */
function fechaSolicitud(fecha: Date): string {
  const dia = fecha.toLocaleDateString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const hora = fecha.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
  return `${dia}, ${hora}`;
}

/**
 * Construye el HTML del correo con el enlace de restablecimiento.
 *
 * @param login usuario dueño de la cuenta
 * @param enlace URL completa (con `#`) del formulario de clave nueva
 * @param fecha momento de la solicitud, para la tabla de control
 */
export function htmlRecuperacion(login: string, enlace: string, fecha = new Date()): string {
  const cuerpoHtml = `
              <!-- Datos de la solicitud -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Seguridad de la cuenta</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">Restablecer contraseña</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${fila('Usuario', login)}
                ${fila('Solicitud', fechaSolicitud(fecha))}
                ${fila('Vigencia', `${VIGENCIA_MINUTOS} minutos`)}
                ${fila('Uso', 'Un solo uso')}
              </table>

              <p style="margin:22px 0 0 0;font:400 14px Arial,sans-serif;color:#374151;line-height:1.6">
                Hola <strong style="color:#111827">${esc(login)}</strong>, recibimos una solicitud para
                restablecer la contraseña de su cuenta. Pulse el botón para elegir una clave nueva.
              </p>

              <!-- Acción principal -->
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px auto 0 auto">
                <tr>
                  <td align="center" bgcolor="#059669" style="border-radius:10px">
                    <a class="btn-cta mobile-button" href="${esc(enlace)}"
                       style="display:inline-block;padding:14px 32px;font:600 15px Arial,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:10px">Restablecer contraseña</a>
                  </td>
                </tr>
              </table>

              <!-- Aviso de vigencia (mismo bloque destacado de los presupuestos) -->
              <div style="margin:24px 0 0 0;background-color:#FFFBEB;border:1px solid #FDE68A;border-left:4px solid #D97706;border-radius:8px;padding:14px 16px;font:400 13px Arial,sans-serif;color:#78350F;line-height:1.6">
                <strong style="letter-spacing:.04em">ENLACE DE UN SOLO USO — VENCE EN ${VIGENCIA_MINUTOS} MINUTOS.</strong>
                Si no solicitó este correo, ignórelo: su contraseña actual sigue vigente y no se
                realizará ningún cambio.
              </div>

              <!-- Enlace copiable -->
              <div style="margin:24px 0 0 0;padding:18px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 11px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">
                  Si el botón no funciona
                </div>
                <div style="font:400 12px 'Courier New',Courier,monospace;color:#047857;word-break:break-all">
                  ${esc(enlace)}
                </div>
              </div>

              <!-- Nota de seguridad -->
              <div style="margin:20px 0 0 0;border-left:3px solid #059669;background-color:#F0FDF7;padding:12px 16px;font:400 13px Arial,sans-serif;color:#37474F;line-height:1.6">
                Nadie de ${CONFIG.identidad.nombre} le pedirá su contraseña por correo ni por teléfono. Si no reconoce
                esta solicitud, no pulse el enlace y comuníquelo al administrador del sistema.
              </div>`;

  return plantillaCorreo({
    titulo: `Recuperación de contraseña — ${CONFIG.identidad.nombre}`,
    encabezado: CONFIG.identidad.nombre.toUpperCase(),
    preheader: `Restablezca su contraseña: el enlace vence en ${VIGENCIA_MINUTOS} minutos y solo se puede usar una vez.`,
    cuerpoHtml,
    logoAlt: CONFIG.correo.logoAlt,
  });
}

/** Versión en texto plano del mismo mensaje, con los datos de la solicitud. */
export function textoRecuperacion(login: string, enlace: string, fecha = new Date()): string {
  return [
    'FIRMALINK',
    'Seguridad de la cuenta — Restablecer contraseña',
    '',
    `Usuario: ${login}`,
    `Solicitud: ${fechaSolicitud(fecha)}`,
    `Vigencia: ${VIGENCIA_MINUTOS} minutos`,
    'Uso: un solo uso',
    '',
    'Recibimos una solicitud para restablecer la contraseña de su cuenta.',
    'Abra este enlace para elegir una clave nueva:',
    enlace,
    '',
    'Si no solicitó este correo, ignore este mensaje: su contraseña no cambia.',
  ].join('\n');
}
