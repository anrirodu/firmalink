import{a as v$1,n as s,t as r}from"./chunk-C9yOwMO6.js";import{$t as dt,Cn as ne,O as De,Xt as dl,_ as O,dn as ih,g as Ls,v as j$1}from"./main-23MESZPR.js";import{n as R,t as I}from"./chunk-C6DkSoc-.js";function U(o){return o?.estado===`eliminado`||o?.eliminado===!0}function Y(o,e,t){return`${o}${String(e).padStart(3,`0`)}-${t??new Date().getFullYear()}`}function D(o){if(!o)return 0;let t=o.replace(/-\d{4}$/,``).match(/(\d+)\s*$/);if(!t)return 0;let r=parseInt(t[1],10);return isNaN(r)?0:r}function be(o){return o===`borrador`||o===`en_revision`}function q(o){switch(o){case`borrador`:case`en_revision`:return[`borrador`,`en_revision`,`firmado`,`anulado`];case`firmado`:return[`anulado`];case`anulado`:return[];default:return[]}}function xe(o){return o===`firmado`?`El acuerdo está firmado: su contenido y su huella quedaron cerrados y no admite más ediciones.`:o===`anulado`?`El acuerdo está anulado: es un estado terminal y no admite más ediciones.`:o===`eliminado`?`El acuerdo está eliminado: ya no aparece en el listado y no admite ediciones.`:``}var T=v$1(Ls());var v=class o{toast=T.default.mixin({toast:!0,position:`top-end`,showConfirmButton:!1,timer:5e3,timerProgressBar:!0});aviso(e,t){this.toast.fire({icon:`warning`,title:e,text:t})}info(e,t){this.toast.fire({icon:`info`,title:e,text:t})}exito(e,t){this.toast.fire({icon:`success`,title:e,text:t})}error(e,t){this.toast.fire({icon:`error`,title:e,text:t})}errorModal(e,t){return T.default.fire({icon:`error`,title:e,html:t,confirmButtonColor:`#0c2d48`})}static detalle(e){if(e==null)return`Sin detalle`;if(typeof e==`string`)return e;let t=e;return t.error?.msj?t.error.msj:t.status?`HTTP ${t.status}${t.message?` — `+t.message:``}`:t.message??`Sin detalle`}static ɵfac=function(t){return new(t||o)};static ɵprov=ne({token:o,factory:o.ɵfac,providedIn:`root`})};var N=class extends Error{noHabilitado;rechazoProveedor;constructor(e,t={}){super(e),this.name=`CorreoError`,this.noHabilitado=t.noHabilitado??!1,this.rechazoProveedor=t.rechazoProveedor??!1}};var G=class o{constructor(e){this.api=e}api;async enviar(e){let t={para:e.para,cc:e.cc?.length?e.cc:void 0,asunto:e.asunto,html:e.html,texto:e.texto,adjunto:e.adjunto,adjuntosInline:e.adjuntosInline?.length?e.adjuntosInline:void 0,idempotencia:e.idempotencia};try{let a=(await ih(this.api.EnviarCorreo(t)))?.contenido??{};return{id:a.id??``,para:a.para??e.para,adjuntos:a.adjuntos??0,enviadoEn:a.enviado_en??new Date().toISOString(),asunto:a.asunto??e.asunto}}catch(r){throw new N(this.mensajeDeError(r),{noHabilitado:this.estado(r)===503,rechazoProveedor:this.estado(r)===422})}}estado(e){return e?.status}mensajeDeError(e){let t=e,r=t?.error?.msj??t?.error?.mensaje;switch(t?.status){case 503:return`El servicio de correo no está habilitado en este nodo del servidor.`;case 400:return r||`La petición de correo está incompleta o mal formada.`;case 403:return r||`El servidor rechazó el envío (permisos o ruta de adjunto no permitida).`;case 413:return r||`El correo supera el tamaño máximo admitido por el proveedor.`;case 422:return r||`El proveedor de correo rechazó el envío.`;case 429:return r||`Se alcanzó el límite de envíos del proveedor. Intente más tarde.`;default:return r||(t?.status?`El servidor respondi\xF3 HTTP ${t.status}.`:t?.message??`Error de comunicación al enviar el correo.`)}}static ɵfac=function(t){return new(t||o)(De(I))};static ɵprov=ne({token:o,factory:o.ɵfac,providedIn:`root`})};function w(o){let e=``;for(let t of(o??``).trim())/[A-Za-z0-9._-]/.test(t)?e+=t:e+=`-`;return e=e.replace(/^[-.]+|[-.]+$/g,``),e||(e=`imagen`),e.length>100&&(e=e.slice(0,100)),e}function ie(){return new Date().getFullYear()}function J(o){let{titulo:e,encabezado:t,cuerpoHtml:r,preheader:a,logoCid:n,logoAlt:i=`FirmaLink`,pieTitulo:s=`\xA9 ${ie()} <strong>BUNKER TECHNOLOGIES SOLUTIONS</strong>. Todos los derechos reservados.`,pieNota:c=`Este correo fue enviado automáticamente por motivos de seguridad. Por favor no respondas a este mensaje.`}=o,l=n?`<img class="logo-img" src="${m(n)}" width="220" alt="${m(i)}"
                    style="display:block;max-width:220px;width:100%;height:auto;border:0;outline:none;text-decoration:none;">`:``,u=a?`<div style="display:none;font-size:1px;color:#F3F4F6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${m(a)}${`&#847;&zwnj;&nbsp;`.repeat(80)}</div>`:``;return`<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <title>${m(e)}</title>
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
${u}
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
              ${l?`<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">${l}</td>
                </tr>
              </table>`:``}
              <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; text-align: center; word-break: break-word;">
                ${m(t)}
              </h1>
            </td>
          </tr>

          <!-- Cuerpo del mensaje -->
          <tr>
            <td class="content-card" style="padding: 32px 32px 28px 32px; background-color: #FFFFFF;">
              ${r}
            </td>
          </tr>

          <!-- Pie de p\xE1gina -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                ${s}
              </p>
              <p style="color: #9CA3AF; font-size: 11px; margin: 0; line-height: 1.5;">
                ${m(c)}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`}function m(o){return o==null?``:String(o).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function g(o,e){let t=m(e);return t?`
              <tr>
                <td style="padding:5px 14px 5px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${m(o)}</td>
                <td style="padding:5px 0;color:#111827;font:400 13px Arial,sans-serif">${t}</td>
              </tr>`:``}function Se(o,e,t=[],r,a){let n=o.codigo||`(sin código)`,i=o.titulo?.trim()||o.proyecto?.trim()||`Acuerdo`,s=`Acuerdo ${n} \u2014 ${i}`,c=o.hashDocumento??``,l=e?.trim(),u=`${n}.pdf`,d=a??t.length,p=d>t.length,P=p?`, en hoja Carta (${d} p\xE1ginas). Arriba se reproduce el comienzo, ${t.length} de ${d} p\xE1ginas.`:t.length?`, en hoja Carta (${d} ${d===1?`página`:`páginas`}).`:`.`,f=t.length?`, en hoja Carta (${d} ${d===1?`página`:`páginas`})`:``,y=`
              <!-- Datos de control -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Acuerdo</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">${m(n)}</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${g(`Estado`,o.estado)}
                ${g(`Título`,i)}
                ${g(`Proyecto`,o.proyecto)}
                ${g(`Área`,o.area)}
                ${g(`Gerente`,o.gerente)}
                ${g(`Representante`,o.representante)}
                ${g(`Cédula`,o.cedula)}
                ${g(`Vigencia`,o.vigencia)}
                ${g(`Ciudad`,o.ciudad)}
                ${g(`Fecha de firma`,o.fechaFirma)}
                ${g(`Honorario`,o.honorario?`${o.honorario} (${o.quincena||`sin periodicidad`})`:``)}
              </table>

              ${l?`<div style="margin:20px 0 0 0;border-left:3px solid #059669;background-color:#F0FDF7;padding:12px 16px;font:400 13px Arial,sans-serif;color:#37474F;white-space:pre-wrap">${m(l)}</div>`:``}

              <!-- Documento: una imagen incrustada por p\xE1gina -->
              <div style="margin:28px 0 0 0;padding:22px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px">
                  Documento del acuerdo${t.length>1?` \u2014 ${t.length} p\xE1ginas`:``}
                </div>
                ${t.map((oe,R)=>`
                <img class="doc-page" src="cid:${w(oe.nombre)}" width="516"
                     alt="P\xE1gina ${R+1} del acuerdo ${m(n)}"
                     style="display:block;width:100%;max-width:100%;height:auto;border:1px solid #E5E7EB;border-radius:6px;margin:0 0 ${R<t.length-1?`16px`:`0`}">`).join(``)}
                <!-- Siempre visible: si el cliente descarta las im\xE1genes, este
                     aviso es lo \xFAnico que le dice al destinatario d\xF3nde est\xE1
                     el documento. -->
                <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #E5E7EB;font:400 13px Arial,sans-serif;color:#4B5563">
                  El documento completo viaja adjunto a este correo:
                  <strong style="color:#065F46">${m(u)}</strong>${P}
                </div>
              </div>

              <!-- Huella -->
              <div style="margin:24px 0 0 0;background-color:#ECFDF5;border:1px solid #A7F3D0;border-left:4px solid #059669;border-radius:8px;padding:14px 16px">
                <div style="font:700 11px Arial,sans-serif;color:#047857;letter-spacing:.06em;text-transform:uppercase">
                  Huella del documento (SHA-256)
                </div>
                <div style="font:400 12px 'Courier New',Courier,monospace;color:#047857;word-break:break-all;margin-top:6px">
                  ${c?m(c):`<em style="color:#9CA3AF">sin calcular</em>`}
                </div>
              </div>`,h=J({titulo:`Acuerdo ${n}`,encabezado:`FIRMALINK`,preheader:`${n} \u2014 ${i}. Documento adjunto en PDF${t.length?` y ${d} ${d===1?`página`:`páginas`} en el cuerpo.`:`.`}`,cuerpoHtml:y,logoCid:r?`cid:${w(r)}`:void 0,logoAlt:`FirmaLink`}),b=[o.estado?`Estado: ${o.estado}`:``,`T\xEDtulo: ${i}`,o.proyecto?`Proyecto: ${o.proyecto}`:``,o.area?`\xC1rea: ${o.area}`:``,o.gerente?`Gerente: ${o.gerente}`:``,o.representante?`Representante: ${o.representante}`:``,o.cedula?`C\xE9dula: ${o.cedula}`:``,o.vigencia?`Vigencia: ${o.vigencia}`:``,o.ciudad?`Ciudad: ${o.ciudad}`:``,o.fechaFirma?`Fecha de firma: ${o.fechaFirma}`:``,o.honorario?`Honorario: ${o.honorario}`:``].filter(Boolean);return{asunto:s,html:h,texto:[`FIRMALINK`,`${n} \u2014 ${i}`,``,...b,...l?[``,`Nota: ${l}`]:[],``,`El documento completo se env\xEDa como archivo adjunto: ${u}${f}`,...p?[`Las primeras ${t.length} de ${d} p\xE1ginas se reproducen en el cuerpo del mensaje.`]:[],``,`Huella SHA-256: ${c||`sin calcular`}`].join(`
`)}}var se={sup:2.5,inf:2.5,izq:3,der:2.5};async function je(o,e,t){let r$1=e.codigo?.trim()||`ACUERDO`,a=(t??e.documentoHtml??``).trim(),n=r(r({},se),e.margen??{}),i=ce(e),s=e.hashDocumento??``,c=await o.generarAcuerdoPdf({contenidoHtml:a,margen:n,codigo:r$1,fecha:i,huella:s,nombre:`${r$1}.pdf`});return{adjunto:{nombre:c.nombre,contenido:c.blob,contentType:`application/pdf`},paginas:c.paginas.map(l=>({nombre:l.nombre,contenido:l.blob,contentType:`image/jpeg`})),totalPaginas:c.totalPaginas}}function ce(o){let e=o.fechaFirma?.trim()?new Date(o.fechaFirma):new Date;return(isNaN(e.getTime())?new Date:e).toLocaleDateString(`es-VE`,{day:`2-digit`,month:`2-digit`,year:`numeric`})}var le=w(`firmalink-isotipo.png`);async function Fe(){try{let o=new URL(`assets/images/isotipo.png`,document.baseURI).href,e=await fetch(o);if(!e.ok)return;let t=await e.blob();return t.size?{nombre:le,contenido:t,contentType:`image/png`}:void 0}catch{return}}var j=v$1(Ls());var de=/^[^\s@,;]+@[^\s@,;]+\.[a-zA-Z]{2,}$/;function K(o){return(o??``).split(/[,;\s]+/).map(e=>e.trim()).filter(e=>e.length>0)}function V(o){return o.filter(e=>!de.test(e))}async function Oe(o,e=``){let t=o?.codigo||`(sin código)`,r=o?.titulo?.trim()||o?.proyecto?.trim()||``,a=await j.default.fire({title:`Enviar el acuerdo por correo`,html:`
      <div style="text-align:left;font-size:13px;color:#546e7a;margin-bottom:12px">
        <strong>${t}</strong>${r?` — `+r:``}
      </div>
      <div style="text-align:left">
        <label for="fl-para" style="font-size:12px;font-weight:600;color:#0c2d48">Para *</label>
        <input id="fl-para" class="swal2-input" style="width:100%;margin:6px 0 12px" placeholder="nombre@dominio.com, otro@dominio.com" value="${e}">
        <label for="fl-cc" style="font-size:12px;font-weight:600;color:#0c2d48">Copia (CC)</label>
        <input id="fl-cc" class="swal2-input" style="width:100%;margin:6px 0 12px" placeholder="opcional">
        <label for="fl-mensaje" style="font-size:12px;font-weight:600;color:#0c2d48">Nota para el destinatario</label>
        <textarea id="fl-mensaje" class="swal2-textarea" style="width:100%;margin:6px 0 0" rows="3" placeholder="opcional"></textarea>
        <div style="font-size:11px;color:#9e9e9e;margin-top:10px">
          Se env\xEDa el documento redactado con los datos de control y la huella SHA-256.
        </div>
      </div>`,focusConfirm:!1,showCancelButton:!0,confirmButtonText:`Enviar`,cancelButtonText:`Cancelar`,confirmButtonColor:`#0c2d48`,preConfirm:()=>{let n=K(document.getElementById(`fl-para`)?.value??``),i=K(document.getElementById(`fl-cc`)?.value??``),s=document.getElementById(`fl-mensaje`)?.value??``;if(n.length===0)return j.default.showValidationMessage(`Indique al menos un destinatario en el campo Para.`),!1;let c=[...V(n),...V(i)];return c.length>0?(j.default.showValidationMessage(`Revise ${c.length===1?`esta dirección`:`estas direcciones`}: ${c.join(`, `)}`),!1):{para:n,cc:i,mensaje:s}}});return a.isConfirmed?a.value:null}var X=class o{constructor(e,t,r,a){this.api=e;this.sha=t;this.notificar=r;this.auth=a}api;sha;notificar;auth;LIST_KEY=`firmalink:acuerdos:list`;BORRADOR_KEY=`firmalink:acuerdo:borrador`;guardar(e){let t=new Date().toISOString(),r$2=s(r({},e),{eliminado:!1,actualizadoEn:t,creadoEn:e.creadoEn??t,hashAlgoritmo:`SHA-256`}),a={coleccion:j$1.colecciones.ACUERDO,objeto:r$2,donde:JSON.stringify({codigo:r$2.codigo}),driver:j$1.driver.PRINCIPAL,upsert:!0};return this.api.ExecColeccion(a).pipe(dt(n=>r$2),dl(n=>{throw console.error(`[AcuerdoService] Error guardando:`,n),n}))}async listar(e=!1){let t=await this.consultarServidor();return e?t:t.filter(r=>!U(r))}async consultarServidor(){let e=j$1.functions?.CONSULTAR_ACUERDOS;if(e)try{let t=await ih(this.api.Ejecutar({funcion:e,parametros:``})),r=t?.Cuerpo!==void 0?t.Cuerpo:t;if(typeof r==`string`)try{r=JSON.parse(r)}catch{r=[]}if(r&&!Array.isArray(r)&&r.tipo!==void 0)return this.notificar.aviso(`No se pudo consultar el listado de acuerdos`,`El servidor respondi\xF3: ${r.msj??`sin detalle`}. La numeraci\xF3n se calcula con la lista local de este navegador.`),this.leerCacheLocal();if(Array.isArray(r)){let a=r;return this.guardarCacheLocal(a),a}this.notificar.aviso(`Respuesta inesperada al listar acuerdos`,`La funci\xF3n ${e} no devolvi\xF3 una lista. Se usar\xE1 la lista local.`)}catch(t){console.warn(`[AcuerdoService] Falló consulta vía función; usar cache local.`,t),this.notificar.aviso(`No se pudo consultar el listado de acuerdos`,`Error de comunicaci\xF3n con el servidor (${v.detalle(t)}). La numeraci\xF3n se calcula con la lista local de este navegador.`)}return this.leerCacheLocal()}async obtener(e){if(!e)return null;let t=j$1.functions?.CONSULTAR_ACUERDO;if(t)try{let n=await ih(this.api.Ejecutar({funcion:t,parametros:e})),i=n?.Cuerpo!==void 0?n.Cuerpo:n;if(typeof i==`string`)try{i=JSON.parse(i)}catch{i=null}if(i&&!Array.isArray(i)&&i.tipo!==void 0)this.notificar.aviso(`No se pudo leer el acuerdo`,`El servidor respondi\xF3: ${i.msj??`sin detalle`}. Se intentar\xE1 con la copia local del listado.`);else if(Array.isArray(i)){let s=i[0]??null;if(s)return s}else if(i&&typeof i==`object`)return i}catch(n){console.warn(`[AcuerdoService] Falló lectura del acuerdo por función.`,n),this.notificar.aviso(`No se pudo leer el acuerdo desde el servidor`,`Error de comunicaci\xF3n (${v.detalle(n)}). Se intentar\xE1 con la copia local.`)}let r=this.leerCacheLocal().find(n=>n.codigo===e);if(r)return r;let a=this.leerBorradorLocal();return a&&a.codigo===e?a:null}EDITAR_KEY=`firmalink:acuerdo:editar`;acuerdoParaEditar=null;setAcuerdoParaEditar(e){this.acuerdoParaEditar=e}tomarAcuerdoParaEditar(){let e=this.acuerdoParaEditar;return this.acuerdoParaEditar=null,e}marcarParaEditar(e){try{e?sessionStorage.setItem(this.EDITAR_KEY,e):sessionStorage.removeItem(this.EDITAR_KEY)}catch{}}tomarPendienteEdicion(){try{let e=sessionStorage.getItem(this.EDITAR_KEY);return e&&sessionStorage.removeItem(this.EDITAR_KEY),e}catch{return null}}async cambiarEstado(e,t,r){if(!e)return!1;if(r&&!q(r).includes(t))return this.notificar.error(`Cambio de estado no permitido`,r===`firmado`?`El acuerdo ${e} est\xE1 firmado y solo puede anularse.`:`El acuerdo ${e} est\xE1 anulado y no admite m\xE1s cambios de estado.`),!1;let a={coleccion:j$1.colecciones.ACUERDO,objeto:{estado:t,actualizadoEn:new Date().toISOString()},donde:JSON.stringify({codigo:e}),driver:j$1.driver.PRINCIPAL,upsert:!0};try{return await ih(this.api.ExecColeccion(a)),!0}catch(n){return this.notificar.error(`No se pudo cambiar el estado`,`El acuerdo ${e} conserva su estado anterior (${v.detalle(n)}).`),!1}}async eliminar(e,t){if(!e)return!1;if(t===`firmado`)return this.notificar.error(`Acuerdo firmado: no se puede eliminar`,`El acuerdo ${e} est\xE1 firmado: su contenido y su huella son definitivos. Si ya no lo necesita, m\xE1rquelo como Anulado.`),!1;let r=new Date().toISOString(),a=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario,n={coleccion:j$1.colecciones.ACUERDO,objeto:{estado:`eliminado`,eliminado:!0,eliminadoEn:r,eliminadoPorCedula:a?.cedula??``,eliminadoPorNombre:a?.nombre??``,actualizadoEn:r},donde:JSON.stringify({codigo:e}),driver:j$1.driver.PRINCIPAL,upsert:!0};try{return await ih(this.api.ExecColeccion(n)),this.guardarCacheLocal(this.leerCacheLocal().filter(i=>i.codigo!==e)),!0}catch(i){return this.notificar.error(`No se pudo eliminar el acuerdo`,`El acuerdo ${e} sigue en el listado (${v.detalle(i)}).`),!1}}async siguienteCodigo(e,t){let r=t??new Date().getFullYear(),a=await this.listar(!0),n=this.leerBorradorLocal(),i=0;for(let c of a)if(c.prefijo===e&&c.anio===r){let l=D(c.codigo);l>i&&(i=l)}if(n&&n.prefijo===e&&n.anio===r){let c=D(n.codigo);c>i&&(i=c)}return Y(e,i+1,r)}async huella(e){let t=e.campos??{},r=e.documentoHtml??``,a=e.margen??{sup:2.5,inf:2.5,izq:3,der:2.5},n=e.codigo??``,i=e.prefijo??`CJS`,s=e.anio??new Date().getFullYear(),c=JSON.stringify(t)+`|`+r+`|`+JSON.stringify(a)+`|`+n+`|`+i+`|`+s;return this.sha.hash(c)}guardarCacheLocal(e){try{localStorage.setItem(this.LIST_KEY,JSON.stringify(e))}catch{}}leerCacheLocal(){try{let e=localStorage.getItem(this.LIST_KEY);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}guardarBorradorLocal(e){try{localStorage.setItem(this.BORRADOR_KEY,JSON.stringify(e))}catch{}}leerBorradorLocal(){try{let e=localStorage.getItem(this.BORRADOR_KEY);return e?JSON.parse(e):null}catch{return null}}descartarBorradorLocal(){try{localStorage.removeItem(this.BORRADOR_KEY)}catch{}}static ɵfac=function(t){return new(t||o)(De(I),De(O),De(v),De(R))};static ɵprov=ne({token:o,factory:o.ɵfac,providedIn:`root`})};var Z=`
  body {
    font-family: Tahoma, Verdana, Geneva, sans-serif;
    font-size: 13pt;
    line-height: 1.15;
    color: #000000;
    text-align: justify;
  }

  p, div {
    margin: 0 0 0.45em 0;
    text-align: justify;
  }

  strong, b { font-weight: 700; }

  ul, ol { margin: 0.4em 0 0.9em 0; }
  li { margin-bottom: 0.35em; text-align: justify; }

  .doc-codigo { text-align: left; margin-bottom: 1.1em; letter-spacing: 0.5px; }
  .doc-titulo { text-align: center; margin-bottom: 1.4em; }
  .doc-clausula { margin-top: 1.1em; margin-bottom: 0.55em; text-align: left; }
  .doc-literal { list-style-type: lower-alpha; padding-left: 1.6em; }
  .doc-vineta { list-style-type: disc; padding-left: 1.4em; }

  .doc-firmas { width: 100%; border-collapse: collapse; margin-top: 0.6em; }
  .doc-firmas td {
    vertical-align: top;
    padding: 0.15em 0.4em;
    text-align: center;
  }
  .doc-firma-nombre { font-weight: 700; letter-spacing: 0.3px; }
  .doc-firma-cedula { font-size: 12pt; }

  .doc-clausula, .doc-firmas {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* Nada desborda el ancho de la columna: tablas e im\xE1genes se ajustan y las
     cadenas largas se parten en vez de salirse del papel. */
  table { max-width: 100%; }
  img { max-width: 100%; height: auto; }
  p, li, td, div { overflow-wrap: anywhere; }
`;var W=8.5;var Q=11;var ue=96/2.54;var F=2;var ee=96*F;var ge=8;var re=1024*1024;var fe=28*re;var he=2*re;var te=class o{async generarAcuerdoPdf(e){let[{default:t},{jsPDF:r}]=await Promise.all([import(`./chunk-BocJPyV_.js`),import(`./chunk-DSPIKa6B.js`)]),a=this.geometria(e.margen),n=this.prepararCaptura(e,a.anchoUtilCss),i;try{document.fonts?.ready&&await document.fonts.ready,await this.esperarPintura(),i=await t(n,{scale:F,backgroundColor:`#ffffff`,useCORS:!0,logging:!1})}finally{n.remove()}let s=this.componerPaginas(i,a,e),c=this.nombreSeguro(e.nombre),l=new r({unit:`in`,format:`letter`,orientation:`portrait`,compress:!0});for(let p=0;p<s.length;p++)p>0&&l.addPage(`letter`,`portrait`),l.addImage(s[p],`JPEG`,0,0,W,Q);let u=l.output(`blob`),d=this.nombrarPaginas(s,c);return{blob:u,nombre:c,paginas:this.elegirIncrustadas(d,u.size),totalPaginas:d.length}}elegirIncrustadas(e,t){let r=fe-he-t,a=[];for(let n of e){if(a.length>=ge||n.blob.size>r)break;r-=n.blob.size,a.push(n)}return a}nombrarPaginas(e,t){let r=this.baseSegura(t);return e.map((a,n)=>({nombre:w(`${r}-p${n+1}.jpg`),blob:this.dataUrlABlob(a)}))}dataUrlABlob(e){let t=e.indexOf(`,`),r=e.slice(0,t),a=/:(.*?);/.exec(r)?.[1]||`image/jpeg`,n=atob(e.slice(t+1)),i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return new Blob([i],{type:a})}geometria(e){let t=l=>Math.round(l*ue*F),r=t(e.izq),a=t(e.der),n=t(e.sup),i=t(e.inf),s=Math.round(W*ee),c=Math.round(Q*ee);return{anchoHojaPx:s,altoHojaPx:c,anchoUtilPx:s-r-a,altoUtilPx:c-n-i,anchoUtilCss:(s-r-a)/F,margenIzqPx:r,margenSupPx:n,margenInfPx:i}}prepararCaptura(e,t){let r=document.createElement(`div`);r.setAttribute(`aria-hidden`,`true`),r.style.cssText=`position:fixed;left:-20000px;top:0;width:${t}px;margin:0;padding:0;background:#ffffff;z-index:-1;box-sizing:border-box;`;let a=document.createElement(`style`);a.textContent=`
      html, body { margin: 0; padding: 0; background: #ffffff; }
      ${Z}
    `,r.appendChild(a),r.style.fontFamily=`Tahoma, Verdana, Geneva, sans-serif`,r.style.fontSize=`13pt`,r.style.lineHeight=`1.15`,r.style.color=`#000000`,r.style.textAlign=`justify`;let n=document.createElement(`div`);return n.innerHTML=e.contenidoHtml??``,r.appendChild(n),document.body.appendChild(r),r}componerPaginas(e,t,r){if(e.width!==t.anchoUtilPx)throw new Error(`El ancho rasterizado (${e.width}px) no coincide con la columna \xFAtil (${t.anchoUtilPx}px).`);let a=this.calcularCortes(e,t.altoUtilPx),n=[];for(let i=0;i<a.length;i++){let s=i===0?0:a[i-1],c=i===a.length-1?e.height:a[i],l=Math.max(0,c-s),u=document.createElement(`canvas`);u.width=t.anchoHojaPx,u.height=t.altoHojaPx;let d=u.getContext(`2d`);if(!d)throw new Error(`El navegador no permitió crear el lienzo de la página del PDF.`);d.fillStyle=`#ffffff`,d.fillRect(0,0,u.width,u.height),l>0&&d.drawImage(e,0,s,e.width,l,t.margenIzqPx,t.margenSupPx,e.width,l),this.dibujarFolioEnHoja(d,u,r,t),n.push(u.toDataURL(`image/jpeg`,.92))}return n}calcularCortes(e,t){let r=e.height;if(r<=t)return[r];let a=this.leerPixeles(e),n=2,i=Math.max(8,Math.round(t*.12)),s=3,c=new Map,l=p=>{if(p<1||p>=r)return Number.POSITIVE_INFINITY;let P=c.get(p);if(P!==void 0)return P;let f=p*e.width*4,y=0;for(let h=0;h<e.width;h+=n){let b=f+h*4;(a[b]<250||a[b+1]<250||a[b+2]<250)&&y++}return c.set(p,y),y},u=[],d=0;for(;r-d>t;){let p=d+t,P=Math.max(d+1,p-i),f=p,y=Number.POSITIVE_INFINITY;for(let h=p;h>=P;h--){let b=0;for(let S=-3;S<=s;S++)b+=l(h+S);b<y&&(y=b,f=h)}(f>p||f-d<t/4)&&(f=p),u.push(f),d=f}return u.push(r),u}leerPixeles(e){let t=e.getContext(`2d`);if(!t)throw new Error(`El navegador no permitió leer el lienzo del documento.`);return t.getImageData(0,0,e.width,e.height).data}dibujarFolioEnHoja(e,t,r,a){e.font=`21px Tahoma, Verdana, Geneva, sans-serif`,e.fillStyle=`#000000`,e.textAlign=`center`,e.textBaseline=`alphabetic`;let n=t.width/2,i=`C\xD3D.: ${r.codigo||`ACUERDO`} | Fecha: ${r.fecha||``} | SANDRA SERVER`;e.fillText(i,n,t.height-a.margenInfPx+70),r.huella&&e.fillText(`SHA-256: ${r.huella}`,n,t.height-a.margenInfPx+110)}async esperarPintura(){await new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0)))}nombreSeguro(e){let t=this.baseSegura(e);return t.toLowerCase().endsWith(`.pdf`)?t:`${t}.pdf`}baseSegura(e){return(e||`acuerdo`).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^A-Za-z0-9._-]+/g,`-`).replace(/-+/g,`-`).replace(/^-|-$/g,``).replace(/\.pdf$/i,``).replace(/^[-.]+|[-.]+$/g,``)||`acuerdo`}static ɵfac=function(t){return new(t||o)};static ɵprov=ne({token:o,factory:o.ɵfac,providedIn:`root`})};export{Se as a,be as c,te as d,v as f,Oe as i,je as l,G as n,X as o,xe as p,N as r,Z as s,Fe as t,q as u};