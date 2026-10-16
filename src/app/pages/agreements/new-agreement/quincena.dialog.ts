import Swal from 'sweetalert2';

/** Escapa el texto para poder insertarlo en el HTML del modal */
function escaparHtml(texto: string): string {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Pregunta el "Monto por quincena" en un modal (SweetAlert).
 *
 * El campo vive fuera del panel de campos editables: en la pantalla solo se
 * muestra el valor vigente y un botón que abre este modal.
 *
 * @param valorActual Texto que ya tiene el campo (se precarga en el textarea).
 * @returns El texto escrito y limpio, o `null` si el usuario cancela.
 */
export async function pedirMontoQuincena(valorActual = ''): Promise<string | null> {
  const resultado = await Swal.fire({
    title: 'Monto por quincena',
    html: `
      <div style="text-align:left">
        <label for="fl-quincena" style="font-size:12px;font-weight:600;color:#0c2d48">
          Monto por quincena (en letras y cifras)
        </label>
        <textarea
          id="fl-quincena"
          class="swal2-textarea"
          style="width:100%;margin:6px 0 0"
          rows="3"
          placeholder="Cuatro Cien Dólares de los Estados Unidos de América (400,00 $)"
        >${escaparHtml(valorActual)}</textarea>
        <div style="font-size:11px;color:#9e9e9e;margin-top:10px">
          Se refleja en la cláusula de contraprestación del documento.
        </div>
      </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Aplicar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0c2d48',
    preConfirm: () => {
      const area = document.getElementById('fl-quincena') as HTMLTextAreaElement | null;
      return (area?.value ?? '').trim();
    },
  });

  if (!resultado.isConfirmed) {
    return null;
  }

  return resultado.value as string;
}
