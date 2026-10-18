import Swal from 'sweetalert2';
import type { Factura } from './factura.model';

export interface DestinatariosCorreoFactura {
  para: string[];
  cc: string[];
  mensaje: string;
}

const RX_CORREO = /^[^\s@,;]+@[^\s@,;]+\.[a-zA-Z]{2,}$/;

/**
 * Convierte "a@b.com, c@d.com; e@f.com" en un arreglo limpio de correos.
 * Acepta comas, punto y coma y espacios como separadores.
 */
export function separarCorreos(entrada: string): string[] {
  return (entrada ?? '')
    .split(/[,;\s]+/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
}

/** Correos inválidos de una lista (vacío si todos son válidos) */
export function correosInvalidos(lista: string[]): string[] {
  return lista.filter((c) => !RX_CORREO.test(c));
}

/**
 * Pregunta los destinatarios de la factura con SweetAlert.
 *
 * El campo "Para" viene prellenado con el correo de facturación del cliente
 * (la copia congelada dentro de la factura): es el destinatario natural del
 * documento y quien envía solo tiene que confirmarlo o ajustarlo.
 *
 * Devuelve null si el usuario cancela.
 */
export async function pedirDestinatariosCorreoFactura(
  factura: Factura,
  sugerido = '',
): Promise<DestinatariosCorreoFactura | null> {
  const numero = factura?.numero || '(sin número)';
  const cliente = factura?.cliente?.nombre?.trim() || '';
  const inicial = sugerido || factura?.cliente?.correo?.trim() || '';

  const resultado = await Swal.fire({
    title: 'Enviar la factura por correo',
    html: `
      <div style="text-align:left;font-size:13px;color:#546e7a;margin-bottom:12px">
        <strong>Factura ${numero}</strong>${cliente ? ' — ' + cliente : ''}
      </div>
      <div style="text-align:left">
        <label for="flf-para" style="font-size:12px;font-weight:600;color:#0c2d48">Para *</label>
        <input id="flf-para" class="swal2-input" style="width:100%;margin:6px 0 12px" placeholder="nombre@dominio.com, otro@dominio.com" value="${inicial}">
        <label for="flf-cc" style="font-size:12px;font-weight:600;color:#0c2d48">Copia (CC)</label>
        <input id="flf-cc" class="swal2-input" style="width:100%;margin:6px 0 12px" placeholder="opcional">
        <label for="flf-mensaje" style="font-size:12px;font-weight:600;color:#0c2d48">Nota para el destinatario</label>
        <textarea id="flf-mensaje" class="swal2-textarea" style="width:100%;margin:6px 0 0" rows="3" placeholder="opcional"></textarea>
        <div style="font-size:11px;color:#9e9e9e;margin-top:10px">
          Se envía la hoja de la factura como archivo PDF adjunto, con la huella SHA-256 como constancia.
        </div>
      </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0c2d48',
    preConfirm: () => {
      const para = separarCorreos((document.getElementById('flf-para') as HTMLInputElement)?.value ?? '');
      const cc = separarCorreos((document.getElementById('flf-cc') as HTMLInputElement)?.value ?? '');
      const mensaje = (document.getElementById('flf-mensaje') as HTMLTextAreaElement)?.value ?? '';

      if (para.length === 0) {
        Swal.showValidationMessage('Indique al menos un destinatario en el campo Para.');
        return false as unknown as DestinatariosCorreoFactura;
      }

      const invalidos = [...correosInvalidos(para), ...correosInvalidos(cc)];
      if (invalidos.length > 0) {
        Swal.showValidationMessage(
          `Revise ${invalidos.length === 1 ? 'esta dirección' : 'estas direcciones'}: ${invalidos.join(', ')}`,
        );
        return false as unknown as DestinatariosCorreoFactura;
      }

      return { para, cc, mensaje };
    },
  });

  if (!resultado.isConfirmed) {
    return null;
  }

  return resultado.value as DestinatariosCorreoFactura;
}
