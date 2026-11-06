/**
 * Configuración del proxy de desarrollo de FirmaLink con logs legibles.
 *
 * Angular 17+ usa Vite para `ng serve`, así que las opciones del proxy son
 * las de `http-proxy` (no las de `http-proxy-middleware`). Por eso el antiguo
 * `logLevel: "debug"` se ignoraba y no se imprimía nada por cada petición.
 *
 * El hook `configure` registra cada petición reenviada y pinta una línea por
 * respuesta con: hora, estado, método, ruta y duración.
 *
 * Este archivo sólo lo usa el dev server (`ng serve` / `npm start`); no afecta
 * al build de producción.
 */

const destino = 'https://localhost';

/** ¿Se pueden usar colores ANSI en la salida actual? */
const colorOn = Boolean(process.stdout.isTTY) && !process.env['NO_COLOR'];

/** Códigos ANSI usados por los logs. */
const C = {
  reset: '\u001b[0m',
  dim: '\u001b[2m',
  bold: '\u001b[1m',
  gray: '\u001b[90m',
  cyan: '\u001b[36m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  red: '\u001b[31m',
  magenta: '\u001b[35m',
  blue: '\u001b[34m',
};

/** Aplica un color sólo si la terminal lo soporta. */
function pintar(codigo, texto) {
  return colorOn ? `${codigo}${texto}${C.reset}` : texto;
}

/** Hora local en formato HH:MM:SS. */
function hora() {
  return new Date().toLocaleTimeString('es-VE', { hour12: false });
}

/** Color e icono según el código HTTP. */
function estado(status) {
  if (status >= 500) return { color: C.red, icono: '✗' };
  if (status >= 400) return { color: C.yellow, icono: '!' };
  if (status >= 300) return { color: C.cyan, icono: '→' };
  if (status >= 200) return { color: C.green, icono: '✓' };
  return { color: C.gray, icono: '·' };
}

/** Color por método HTTP. */
function colorMetodo(metodo) {
  switch (metodo) {
    case 'GET':
      return C.cyan;
    case 'POST':
      return C.green;
    case 'PUT':
    case 'PATCH':
      return C.yellow;
    case 'DELETE':
      return C.red;
    default:
      return C.blue;
  }
}

/** Imprime una línea por petición completada. */
function logPeticion(metodo, url, status, ms, objetivo) {
  const m = String(metodo || 'GET').toUpperCase();
  const { color, icono } = estado(status);
  const duracion = `${Math.max(1, Math.round(ms))} ms`;

  console.log(
    [
      pintar(C.gray, '[HPM]'),
      pintar(C.dim, hora()),
      pintar(color, `${String(status).padStart(3)} ${icono}`),
      pintar(colorMetodo(m), m.padEnd(6)),
      url,
      pintar(C.dim, '·'),
      pintar(C.dim, duracion.padStart(7)),
      pintar(C.dim, `→ ${objetivo}`),
    ].join(' '),
  );
}

/** Imprime una línea de error de proxy. */
function logError(metodo, url, ms, objetivo, err) {
  const m = String(metodo || 'GET').toUpperCase();
  const duracion = `${Math.max(1, Math.round(ms || 0))} ms`;

  console.log(
    [
      pintar(C.gray, '[HPM]'),
      pintar(C.dim, hora()),
      pintar(C.red, 'ERR  ✗'),
      pintar(colorMetodo(m), m.padEnd(6)),
      url || '-',
      pintar(C.dim, '·'),
      pintar(C.dim, duracion.padStart(7)),
      pintar(C.dim, `→ ${objetivo}`),
      pintar(C.red, `(${err?.code || err?.message || 'error'})`),
    ].join(' '),
  );
}

/** Crea una entrada del proxy con logging legible. */
function conLog() {
  /** Momento de entrada de cada petición (para medir la duración). */
  const inicio = new WeakMap();

  return {
    target: destino,
    secure: false,
    configure(proxy, opciones) {
      const objetivo = String(opciones.target ?? destino);

      proxy.on('proxyReq', (_proxyReq, req) => {
        inicio.set(req, process.hrtime.bigint());
      });

      proxy.on('proxyRes', (proxyRes, req) => {
        const t0 = inicio.get(req);
        const ms = t0 ? Number(process.hrtime.bigint() - t0) / 1e6 : 0;
        logPeticion(req.method, req.url, proxyRes.statusCode, ms, objetivo);
      });

      proxy.on('error', (err, req) => {
        const t0 = req ? inicio.get(req) : undefined;
        const ms = t0 ? Number(process.hrtime.bigint() - t0) / 1e6 : 0;
        logError(req?.method, req?.url, ms, objetivo, err);
      });
    },
  };
}

const config = {
  '/v1/api': conLog(),
  '/v1/xapi': conLog(),
  '/devel/api': conLog(),
};

// Aviso único al arrancar el dev server.
const ancho = 64;
const rutas = Object.keys(config).join(', ');
console.log(
  `${pintar(C.gray, '┌─')} ${pintar(C.bold, 'Proxy de desarrollo')} ${pintar(
    C.gray,
    '─'.repeat(ancho - 22),
  )}`,
);
console.log(`${pintar(C.gray, '│')} ${rutas} ${pintar(C.dim, '→')} ${destino}`);
console.log(pintar(C.gray, `└${'─'.repeat(ancho)}`));

module.exports = config;
