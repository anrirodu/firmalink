import{a as v,t as r}from"./chunk-C9yOwMO6.js";import{_ as Ls,ht as Me,on as ae,w as $h}from"./main-4TJD7ILE.js";import{t as I}from"./chunk-Bbvfoj67.js";var m=class extends Error{noHabilitado;rechazoProveedor;constructor(e,t={}){super(e),this.name=`CorreoError`,this.noHabilitado=t.noHabilitado??!1,this.rechazoProveedor=t.rechazoProveedor??!1}};var b=class r{constructor(e){this.api=e}api;async enviar(e){let t={para:e.para,cc:e.cc?.length?e.cc:void 0,asunto:e.asunto,html:e.html,texto:e.texto,adjunto:e.adjunto,adjuntosInline:e.adjuntosInline?.length?e.adjuntosInline:void 0,idempotencia:e.idempotencia};try{let a=(await $h(this.api.EnviarCorreo(t)))?.contenido??{};return{id:a.id??``,para:a.para??e.para,adjuntos:a.adjuntos??0,enviadoEn:a.enviado_en??new Date().toISOString(),asunto:a.asunto??e.asunto}}catch(o){throw new m(this.mensajeDeError(o),{noHabilitado:this.estado(o)===503,rechazoProveedor:this.estado(o)===422})}}estado(e){return e?.status}mensajeDeError(e){let t=e,o=t?.error?.msj??t?.error?.mensaje;switch(t?.status){case 503:return`El servicio de correo no está habilitado en este nodo del servidor.`;case 400:return o||`La petición de correo está incompleta o mal formada.`;case 403:return o||`El servidor rechazó el envío (permisos o ruta de adjunto no permitida).`;case 413:return o||`El correo supera el tamaño máximo admitido por el proveedor.`;case 422:return o||`El proveedor de correo rechazó el envío.`;case 429:return o||`Se alcanzó el límite de envíos del proveedor. Intente más tarde.`;default:return o||(t?.status?`El servidor respondi\xF3 HTTP ${t.status}.`:t?.message??`Error de comunicación al enviar el correo.`)}}static ɵfac=function(t){return new(t||r)(Me(I))};static ɵprov=ae({token:r,factory:r.ɵfac,providedIn:`root`})};function x(r){let e=``;for(let t of(r??``).trim())/[A-Za-z0-9._-]/.test(t)?e+=t:e+=`-`;return e=e.replace(/^[-.]+|[-.]+$/g,``),e||(e=`imagen`),e.length>100&&(e=e.slice(0,100)),e}var A={sup:2.5,inf:2.5,izq:3,der:2.5};async function T(r$1,e,t){let o=e.codigo?.trim()||`ACUERDO`,a=(t??e.documentoHtml??``).trim(),d=r(r({},A),e.margen??{}),l=C(e),c=e.hashDocumento??``,n=await r$1.generarAcuerdoPdf({contenidoHtml:a,margen:d,codigo:o,fecha:l,huella:c,nombre:`${o}.pdf`});return{adjunto:{nombre:n.nombre,contenido:n.blob,contentType:`application/pdf`},paginas:n.paginas.map(s=>({nombre:s.nombre,contenido:s.blob,contentType:`image/jpeg`})),totalPaginas:n.totalPaginas}}function C(r){let e=r.fechaFirma?.trim()?new Date(r.fechaFirma):new Date;return(isNaN(e.getTime())?new Date:e).toLocaleDateString(`es-VE`,{day:`2-digit`,month:`2-digit`,year:`numeric`})}var j=x(`firmalink-isotipo.png`);async function O(){try{let r=new URL(`assets/images/isotipo.png`,document.baseURI).href,e=await fetch(r);if(!e.ok)return;let t=await e.blob();return t.size?{nombre:j,contenido:t,contentType:`image/png`}:void 0}catch{return}}var y=v(Ls());async function G(r){if(!r.hayCambiosSinGuardar())return!0;let e=await y.default.fire({icon:`question`,title:`Tienes cambios sin guardar`,html:`Si sales ahora, estos cambios quedarán solo como borrador en este navegador.<br><small>Guarda para dejarlos registrados en el servidor.</small>`,showDenyButton:!0,showCancelButton:!0,confirmButtonText:`Guardar y salir`,denyButtonText:`Salir sin guardar`,cancelButtonText:`Cancelar`,confirmButtonColor:`#0c2d48`,denyButtonColor:`#a12c2c`,cancelButtonColor:`#6c757d`,reverseButtons:!0});return e.isConfirmed?(await r.guardarAntesDeSalir()||r.respaldarAlSalir(),!0):e.isDenied?(r.respaldarAlSalir(),!0):!1}function S(){return new Date().getFullYear()}function L(r){let{titulo:e,encabezado:t,cuerpoHtml:o,preheader:a,logoCid:d,logoAlt:l=`FirmaLink`,pieTitulo:c=`\xA9 ${S()} <strong>BUNKER TECHNOLOGIES SOLUTIONS</strong>. Todos los derechos reservados.`,pieNota:n=`Este correo fue enviado automáticamente por motivos de seguridad. Por favor no respondas a este mensaje.`}=r,s=d?`<img class="logo-img" src="${i(d)}" width="220" alt="${i(l)}"
                    style="display:block;max-width:220px;width:100%;height:auto;border:0;outline:none;text-decoration:none;">`:``,v=a?`<div style="display:none;font-size:1px;color:#F3F4F6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${i(a)}${`&#847;&zwnj;&nbsp;`.repeat(80)}</div>`:``;return`<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <title>${i(e)}</title>
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
${v}
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
              ${s?`<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">${s}</td>
                </tr>
              </table>`:``}
              <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; text-align: center; word-break: break-word;">
                ${i(t)}
              </h1>
            </td>
          </tr>

          <!-- Cuerpo del mensaje -->
          <tr>
            <td class="content-card" style="padding: 32px 32px 28px 32px; background-color: #FFFFFF;">
              ${o}
            </td>
          </tr>

          <!-- Pie de p\xE1gina -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                ${c}
              </p>
              <p style="color: #9CA3AF; font-size: 11px; margin: 0; line-height: 1.5;">
                ${i(n)}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`}function i(r){return r==null?``:String(r).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}export{b as a,x as c,T as i,L as n,i as o,O as r,m as s,G as t};