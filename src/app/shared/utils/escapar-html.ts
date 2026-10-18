const ENTIDADES_HTML: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapa un texto para interpolarlo dentro de HTML.
 *
 * SweetAlert pinta su opción `html` tal cual: cualquier dato capturado por el
 * usuario (nombres, razones sociales, observaciones) que se inserte ahí sin
 * escapar es un vector de XSS. Las plantillas de Angular ya escapan solas;
 * esto es para el HTML que se arma a mano.
 */
export function escaparHtml(texto: unknown): string {
  return String(texto ?? '').replace(/[&<>"']/g, (caracter) => ENTIDADES_HTML[caracter] ?? caracter);
}
