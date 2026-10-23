import{y as e}from"./main-MFM6IOBJ.js";function m(){return new Date().getFullYear()}function h(e$1){let{titulo:n,encabezado:l,cuerpoHtml:d,preheader:a,logoCid:i,logoAlt:p=e.correo.logoAlt,pieTitulo:s=`\xA9 ${m()} <strong>${e.correo.pieTitulo}</strong>. Todos los derechos reservados.`,pieNota:c=e.correo.pieNota}=e$1,r=i?`<img class="logo-img" src="${t(i)}" width="220" alt="${t(p)}"
                    style="display:block;max-width:220px;width:100%;height:auto;border:0;outline:none;text-decoration:none;">`:``,g=a?`<div style="display:none;font-size:1px;color:#F3F4F6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${t(a)}${`&#847;&zwnj;&nbsp;`.repeat(80)}</div>`:``;return`<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <title>${t(n)}</title>
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
    /* Las p\xE1ginas del acuerdo se ajustan al ancho de la tarjeta */
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
${g}
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
              ${r?`<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">${r}</td>
                </tr>
              </table>`:``}
              <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; text-align: center; word-break: break-word;">
                ${t(l)}
              </h1>
            </td>
          </tr>

          <!-- Cuerpo del mensaje -->
          <tr>
            <td class="content-card" style="padding: 32px 32px 28px 32px; background-color: #FFFFFF;">
              ${d}
            </td>
          </tr>

          <!-- Pie de p\xE1gina -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                ${s}
              </p>
              <p style="color: #9CA3AF; font-size: 11px; margin: 0; line-height: 1.5;">
                ${t(c)}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`}function t(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}export{t as n,h as t};