/**
 * Saneado de los identificadores de imagen incrustada en el correo.
 *
 * El Content-ID es un contrato entre dos programas distintos: el navegador
 * escribe `src="cid:<valor>"` en el HTML y el servidor asigna el header
 * `Content-ID` del adjunto. Si los dos valores no coinciden caracter por
 * caracter, el cliente de correo no encuentra la imagen y el destinatario ve un
 * hueco roto.
 *
 * El servidor sanea el nombre del archivo subido (`SanitizarContentID` en
 * `core/email/attachment.go`), así que el navegador tiene que aplicar
 * exactamente la misma transformación y usar ese resultado como `cid:`.
 *
 * Regla replicada literalmente del servidor: se conservan letras, dígitos,
 * punto, guion y guion bajo; cualquier otro carácter se vuelve un guion; luego
 * se recortan los guiones y puntos de los extremos; si queda vacío, "imagen".
 * Una diferencia sutil pero necesaria: los guiones NO se colapsan, porque el
 * servidor tampoco lo hace ("ACTA 04 (A).png" → "ACTA-04--A-.png").
 */

/** Tope de longitud del servidor para nombres de adjunto */
const LONGITUD_MAXIMA = 100;

/**
 * Convierte un nombre de archivo en el identificador que viajará en el
 * `Content-ID` y en el `src="cid:..."` del HTML.
 */
export function sanitizarContentId(nombre: string): string {
  let salida = '';
  for (const caracter of (nombre ?? '').trim()) {
    if (/[A-Za-z0-9._-]/.test(caracter)) {
      salida += caracter;
    } else {
      salida += '-';
    }
  }

  salida = salida.replace(/^[-.]+|[-.]+$/g, '');
  if (!salida) {
    salida = 'imagen';
  }
  if (salida.length > LONGITUD_MAXIMA) {
    salida = salida.slice(0, LONGITUD_MAXIMA);
  }
  return salida;
}
