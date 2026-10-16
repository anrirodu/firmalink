/**
 * Plantilla base de los correos de FirmaLink.
 *
 * Es un armazón reutilizable: la cabecera con el degradado y el isotipo, el
 * cuerpo variable y el pie institucional. Cualquier mensaje (confirmación de
 * cuenta, restablecimiento de contraseña, remisión de un acuerdo) se construye
 * pasando su propio `cuerpoHtml`.
 *
 * Todo el correo respeta las reglas de los clientes de correo:
 *
 *   - Maquetación con tablas, no con flex ni grid: Outlook renderiza con el
 *     motor de Word y no entiende CSS moderno.
 *   - Estilos en línea como respaldo, porque varios clientes recortan el
 *     `<style>` del `<head>`.
 *   - El degradado lleva un color plano debajo: Outlook no soporta
 *     `linear-gradient` y sin el respaldo pintaría la cabecera en blanco.
 *   - El logo viaja como imagen incrustada (Content-ID) y no como URL: el
 *     servidor no tiene por qué ser alcanzable desde el cliente de correo.
 */

export interface OpcionesPlantillaCorreo {
  /** Texto de la pestaña del navegador y de algunos clientes de escritorio */
  titulo: string;
  /** Titular de la cabecera, sobre el degradado */
  encabezado: string;
  /** Cuerpo del mensaje, ya en HTML */
  cuerpoHtml: string;
  /**
   * Texto de vista previa que muestran las bandejas junto al asunto. Sin él,
   * el cliente toma las primeras palabras del cuerpo y el resumen sale
   * arbitrario (a menudo un trozo de tabla).
   */
  preheader?: string;
  /** Referencia del logo, p. ej. `cid:firmalink-isotipo.png`. Sin él no se pinta */
  logoCid?: string;
  /** Texto alternativo del logo */
  logoAlt?: string;
  /** Rótulo del pie; por defecto, el institucional */
  pieTitulo?: string;
  /** Nota del pie; por defecto, la de mensaje automático */
  pieNota?: string;
}

/** Año del pie, siempre el actual */
function anioActual(): number {
  return new Date().getFullYear();
}

/**
 * Construye el documento HTML completo del correo.
 *
 * @param opciones contenido de cada zona de la plantilla
 */
export function plantillaCorreo(opciones: OpcionesPlantillaCorreo): string {
  const {
    titulo,
    encabezado,
    cuerpoHtml,
    preheader,
    logoCid,
    logoAlt = 'FirmaLink',
    pieTitulo = `© ${anioActual()} <strong>BUNKER TECHNOLOGIES SOLUTIONS</strong>. Todos los derechos reservados.`,
    pieNota = 'Este correo fue enviado automáticamente por motivos de seguridad. Por favor no respondas a este mensaje.',
  } = opciones;

  // Se escapa: un cid saneado no lleva caracteres especiales y queda intacto,
  // pero una URL con parámetros (`?a=1&b=2`) rompería el atributo sin escaparla.
  const logo = logoCid
    ? `<img class="logo-img" src="${esc(logoCid)}" width="220" alt="${esc(logoAlt)}"
                    style="display:block;max-width:220px;width:100%;height:auto;border:0;outline:none;text-decoration:none;">`
    : '';

  // Vista previa de la bandeja: va oculta justo tras el body. El relleno de
  // caracteres de ancho cero evita que el cliente complete el resumen con el
  // primer texto visible del cuerpo (que en este correo es una tabla).
  const vistaPrevia = preheader
    ? `<div style="display:none;font-size:1px;color:#F3F4F6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${esc(
        preheader,
      )}${'&#847;&zwnj;&nbsp;'.repeat(80)}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <title>${esc(titulo)}</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse: collapse; border-spacing: 0; margin: 0;}
    div, p, a, li, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
  <style type="text/css">
    body {
      margin: 0 !important;
      padding: 0 !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
      -webkit-font-smoothing: antialiased !important;
      background-color: #F3F4F6 !important;
    }
    a { text-decoration: none !important; }
    .btn-cta:hover {
      opacity: 0.92 !important;
      box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
    }
    /* Las páginas del acuerdo se ajustan al ancho de la tarjeta */
    .doc-page {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
      .content-card { padding: 24px 20px !important; }
      .header-pad { padding: 32px 20px 24px 20px !important; }
      .mobile-button {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
      .logo-img { max-width: 180px !important; height: auto !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
${vistaPrevia}
  <!-- Contenedor principal / lienzo exterior -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"
         style="background-color: #F3F4F6; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 40px 10px;">

        <!-- Tarjeta del correo -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" role="presentation"
               style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #E5E7EB;">

          <!-- Encabezado con degradado (color plano de respaldo para Outlook) -->
          <tr>
            <td align="center" class="header-pad"
                style="padding: 36px 32px 28px 32px; background-color: #047857; background-image: linear-gradient(135deg, #059669 0%, #1E1B4B 100%);">
              ${
                logo
                  ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">${logo}</td>
                </tr>
              </table>`
                  : ''
              }
              <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; text-align: center; word-break: break-word;">
                ${esc(encabezado)}
              </h1>
            </td>
          </tr>

          <!-- Cuerpo del mensaje -->
          <tr>
            <td class="content-card" style="padding: 32px 32px 28px 32px; background-color: #FFFFFF;">
              ${cuerpoHtml}
            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                ${pieTitulo}
              </p>
              <p style="color: #9CA3AF; font-size: 11px; margin: 0; line-height: 1.5;">
                ${esc(pieNota)}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/** Escapa el texto que se interpola en el HTML del correo */
export function esc(valor: unknown): string {
  if (valor === null || valor === undefined) return '';
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
