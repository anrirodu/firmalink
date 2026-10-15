import Swal from 'sweetalert2';
import type { Acuerdo } from './new-agreement/acuerdo.model';

export interface DestinatariosCorreo {
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
 * Pregunta los destinatarios del acuerdo con SweetAlert.
 * Devuelve null si el usuario cancela.
 */
export async function pedirDestinatariosCorreo(
  acuerdo: Acuerdo,
  sugerido = '',
): Promise<DestinatariosCorreo | null> {
  const codigo = acuerdo?.codigo || '(sin código)';
  const titulo = acuerdo?.titulo?.trim() || acuerdo?.proyecto?.trim() || '';

  const resultado = await Swal.fire({
    title: 'Enviar el acuerdo por correo',
    html: `
      <div style="text-align:left;font-size:13px;color:#546e7a;margin-bottom:12px">
        <strong>${codigo}</strong>${titulo ? ' — ' + titulo : ''}
      </div>
      <div style="text-align:left">
        <label for="fl-para" style="font-size:12px;font-weight:600;color:#0c2d48">Para *</label>
        <input id="fl-para" class="swal2-input" style="width:100%;margin:6px 0 12px" placeholder="nombre@dominio.com, otro@dominio.com" value="${sugerido}">
        <label for="fl-cc" style="font-size:12px;font-weight:600;color:#0c2d48">Copia (CC)</label>
        <input id="fl-cc" class="swal2-input" style="width:100%;margin:6px 0 12px" placeholder="opcional">
        <label for="fl-mensaje" style="font-size:12px;font-weight:600;color:#0c2d48">Nota para el destinatario</label>
        <textarea id="fl-mensaje" class="swal2-textarea" style="width:100%;margin:6px 0 0" rows="3" placeholder="opcional"></textarea>
        <div style="font-size:11px;color:#9e9e9e;margin-top:10px">
          Se envía el documento redactado con los datos de control y la huella SHA-256.
        </div>
      </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0c2d48',
    preConfirm: () => {
      const para = separarCorreos((document.getElementById('fl-para') as HTMLInputElement)?.value ?? '');
      const cc = separarCorreos((document.getElementById('fl-cc') as HTMLInputElement)?.value ?? '');
      const mensaje = (document.getElementById('fl-mensaje') as HTMLTextAreaElement)?.value ?? '';

      if (para.length === 0) {
        Swal.showValidationMessage('Indique al menos un destinatario en el campo Para.');
        return false as unknown as DestinatariosCorreo;
      }

      const invalidos = [...correosInvalidos(para), ...correosInvalidos(cc)];
      if (invalidos.length > 0) {
        Swal.showValidationMessage(
          `Revise ${invalidos.length === 1 ? 'esta dirección' : 'estas direcciones'}: ${invalidos.join(', ')}`,
        );
        return false as unknown as DestinatariosCorreo;
      }

      return { para, cc, mensaje };
    },
  });

  if (!resultado.isConfirmed) {
    return null;
  }

  return resultado.value as DestinatariosCorreo;
}
