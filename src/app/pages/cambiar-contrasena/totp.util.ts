/* ============================================
   TOTP (RFC 6238) — verificación en el navegador
   ============================================
   Sandra Server entrega la clave en Base32 al generar el QR (`wusuario/gtotp`)
   y valida el código en el inicio de sesión. Para no "activar a ciegas" ni
   desactivar sin comprobar al usuario, el diálogo de 2FA comprueba el código
   aquí antes de persistir el secreto.

   La comprobación es una barrera de experiencia (evita que el usuario se
   quede fuera de su cuenta al guardar un secreto que su aplicación no tiene);
   la validación de seguridad real sigue siendo la del servidor en el login.
   ============================================ */

/** Alfabeto Base32 estándar (RFC 4648), sin relleno `=`. */
const ALFABETO_BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/** Periodo estándar de TOTP: 30 segundos. */
const PERIODO_MS = 30_000;

/** Cantidad de dígitos del código. */
const DIGITOS = 6;

/**
 * Limpia la clave: mayúsculas, sin espacios ni separadores.
 * Las aplicaciones de autenticación muestran la clave en grupos de 4
 * (`JBSW Y3DP ...`); el secreto real no lleva espacios.
 */
export function normalizarSecreto(secreto: string): string {
  return (secreto ?? '')
    .toUpperCase()
    .replace(/[\s\-_]/g, '')
    .replace(/=+$/, '');
}

/**
 * Presenta la clave en grupos de 4 caracteres para que sea legible y fácil
 * de transcribir. No modifica el secreto que se copia ni el que se valida.
 */
export function formatearSecreto(secreto: string): string {
  const limpio = normalizarSecreto(secreto);
  return limpio.replace(/(.{4})/g, '$1 ').trim();
}

/** Decodifica Base32 a bytes (sin relleno). */
function base32ABytes(secreto: string): ArrayBuffer {
  const limpio = normalizarSecreto(secreto);
  if (!limpio) {
    throw new Error('La clave TOTP está vacía.');
  }

  let bits = 0;
  let valor = 0;
  const bytes: number[] = [];

  for (const caracter of limpio) {
    const indice = ALFABETO_BASE32.indexOf(caracter);
    if (indice === -1) {
      throw new Error('La clave TOTP contiene caracteres inválidos.');
    }
    valor = (valor << 5) | indice;
    bits += 5;
    if (bits >= 8) {
      bytes.push((valor >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }

  const buffer = new ArrayBuffer(bytes.length);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

/** Contador de 8 bytes big-endian (paso de 30 s desde la época Unix). */
function contadorBytes(momento: number): ArrayBuffer {
  const paso = Math.floor(momento / 1000 / (PERIODO_MS / 1000));
  const buffer = new ArrayBuffer(8);
  const contador = new Uint8Array(buffer);
  let resto = paso;
  for (let i = 7; i >= 0; i--) {
    contador[i] = resto & 0xff;
    resto = Math.floor(resto / 256);
  }
  return buffer;
}

/**
 * Calcula el código TOTP de 6 dígitos para un momento dado (HMAC-SHA1).
 * Requiere WebCrypto, disponible en https y en localhost.
 */
export async function codigoTotp(secreto: string, momento = Date.now()): Promise<string> {
  const crypto = globalThis.crypto;
  if (!crypto?.subtle) {
    throw new Error('El navegador no permite verificar el código (WebCrypto no disponible).');
  }

  const clave = await crypto.subtle.importKey(
    'raw',
    base32ABytes(secreto),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );

  const firma = new Uint8Array(await crypto.subtle.sign('HMAC', clave, contadorBytes(momento)));

  // Truncamiento dinámico RFC 4226: los 4 bits bajos del último byte indican
  // el desplazamiento del bloque de 4 bytes que se convierte en entero.
  const desplazamiento = firma[firma.length - 1] & 0x0f;
  const binario =
    ((firma[desplazamiento] & 0x7f) << 24) |
    (firma[desplazamiento + 1] << 16) |
    (firma[desplazamiento + 2] << 8) |
    firma[desplazamiento + 3];

  return String(binario % 10 ** DIGITOS).padStart(DIGITOS, '0');
}

/**
 * Comprueba un código de 6 dígitos contra el secreto.
 * Se acepta una ventana de ±1 periodo (30 s) para tolerar el desfase de reloj
 * del teléfono y el tiempo que tarda el usuario en escribirlo.
 */
export async function codigoTotpValido(
  secreto: string,
  codigo: string,
  ventana = 1,
): Promise<boolean> {
  const limpio = (codigo ?? '').replace(/\D/g, '');
  if (limpio.length !== DIGITOS) {
    return false;
  }

  const ahora = Date.now();
  for (let desfase = -ventana; desfase <= ventana; desfase++) {
    const esperado = await codigoTotp(secreto, ahora + desfase * PERIODO_MS);
    if (esperado === limpio) {
      return true;
    }
  }
  return false;
}

/** Segundos que le quedan de validez al código actual (para la cuenta regresiva). */
export function segundosRestantes(momento = Date.now()): number {
  return Math.max(1, Math.ceil((PERIODO_MS - (momento % PERIODO_MS)) / 1000));
}
