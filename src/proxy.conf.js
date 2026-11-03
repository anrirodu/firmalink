/**
 * Configuración del proxy de desarrollo de FirmaLink.
 *
 * Angular 17+ usa Vite para `ng serve`, por lo que las opciones del proxy son
 * las de `http-proxy` (no las de `http-proxy-middleware`). Eso significa que
 * `logLevel: "debug"` del antiguo `proxy.conf.json` se ignora y no se imprime
 * nada por cada petición.
 *
 * Aquí se replica el log de `http-proxy-middleware` (`[HPM] ...`) mediante el
 * hook `configure`, para ver en consola cada petición que se reenvía al
 * backend durante el desarrollo.
 *
 * Este archivo sólo lo usa el dev server (`ng serve` / `npm start`); no afecta
 * al build de producción.
 */

const destino = 'https://localhost';

/**
 * Crea una entrada del proxy con logging de peticiones.
 *
 * @returns {import('vite').ProxyOptions}
 */
function conLog() {
  return {
    target: destino,
    secure: false,
    configure(proxy, opciones) {
      const objetivo = String(opciones.target ?? destino);

      proxy.on('proxyReq', (proxyReq, req) => {
        console.log(`[HPM] ${req.method} ${req.url} -> ${objetivo}`);
      });

      proxy.on('proxyRes', (proxyRes, req) => {
        console.log(
          `[HPM] ${proxyRes.statusCode} ${req.method} ${req.url} <- ${objetivo}`,
        );
      });

      proxy.on('error', (err, req) => {
        console.error(
          `[HPM] ERROR ${req?.method ?? ''} ${req?.url ?? ''} -> ${objetivo}: ${err.message}`,
        );
      });
    },
  };
}

module.exports = {
  '/v1/api': conLog(),
  '/v1/xapi': conLog(),
  '/devel/api': conLog(),
};
