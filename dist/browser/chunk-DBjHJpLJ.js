import{a as v,n as s,t as r}from"./chunk-C9yOwMO6.js";import{$t as dt,Cn as ne,O as De,Xt as dl,_ as O,dn as ih,g as Ls,v as j}from"./main-AT25TTVA.js";import{t as l$1}from"./chunk-DImlHsbk.js";function D(r,e,t){return`${r}${String(e).padStart(3,`0`)}-${t??new Date().getFullYear()}`}function A(r){if(!r)return 0;let t=r.replace(/-\d{4}$/,``).match(/(\d+)\s*$/);if(!t)return 0;let o=parseInt(t[1],10);return isNaN(o)?0:o}function z(r){return r===`borrador`||r===`en_revision`}function R(r){switch(r){case`borrador`:case`en_revision`:return[`borrador`,`en_revision`,`firmado`,`anulado`];case`firmado`:return[`anulado`];case`anulado`:return[];default:return[]}}function _(r){return r===`firmado`?`El acuerdo está firmado: su contenido y su huella quedaron cerrados y no admite más ediciones.`:r===`anulado`?`El acuerdo está anulado: es un estado terminal y no admite más ediciones.`:``}var b=v(Ls());var d=class r{toast=b.default.mixin({toast:!0,position:`top-end`,showConfirmButton:!1,timer:5e3,timerProgressBar:!0});aviso(e,t){this.toast.fire({icon:`warning`,title:e,text:t})}info(e,t){this.toast.fire({icon:`info`,title:e,text:t})}exito(e,t){this.toast.fire({icon:`success`,title:e,text:t})}error(e,t){this.toast.fire({icon:`error`,title:e,text:t})}errorModal(e,t){return b.default.fire({icon:`error`,title:e,html:t,confirmButtonColor:`#0c2d48`})}static detalle(e){if(e==null)return`Sin detalle`;if(typeof e==`string`)return e;let t=e;return t.error?.msj?t.error.msj:t.status?`HTTP ${t.status}${t.message?` — `+t.message:``}`:t.message??`Sin detalle`}static ɵfac=function(t){return new(t||r)};static ɵprov=ne({token:r,factory:r.ɵfac,providedIn:`root`})};var E=class extends Error{noHabilitado;rechazoProveedor;constructor(e,t={}){super(e),this.name=`CorreoError`,this.noHabilitado=t.noHabilitado??!1,this.rechazoProveedor=t.rechazoProveedor??!1}};var L=class r{constructor(e){this.api=e}api;async enviar(e){let t={para:e.para,cc:e.cc?.length?e.cc:void 0,asunto:e.asunto,html:e.html,texto:e.texto,idempotencia:e.idempotencia};try{let i=(await ih(this.api.EnviarCorreo(t)))?.contenido??{};return{id:i.id??``,para:i.para??e.para,adjuntos:i.adjuntos??0,enviadoEn:i.enviado_en??new Date().toISOString(),asunto:i.asunto??e.asunto}}catch(o){throw new E(this.mensajeDeError(o),{noHabilitado:this.estado(o)===503,rechazoProveedor:this.estado(o)===422})}}estado(e){return e?.status}mensajeDeError(e){let t=e,o=t?.error?.msj??t?.error?.mensaje;switch(t?.status){case 503:return`El servicio de correo no está habilitado en este nodo del servidor.`;case 400:return o||`La petición de correo está incompleta o mal formada.`;case 403:return o||`El servidor rechazó el envío (permisos o ruta de adjunto no permitida).`;case 413:return o||`El correo supera el tamaño máximo admitido por el proveedor.`;case 422:return o||`El proveedor de correo rechazó el envío.`;case 429:return o||`Se alcanzó el límite de envíos del proveedor. Intente más tarde.`;default:return o||(t?.status?`El servidor respondi\xF3 HTTP ${t.status}.`:t?.message??`Error de comunicación al enviar el correo.`)}}static ɵfac=function(t){return new(t||r)(De(l$1))};static ɵprov=ne({token:r,factory:r.ɵfac,providedIn:`root`})};function p(r){return r==null?``:String(r).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function l(r,e){let t=p(e);return t?`
    <tr>
      <td style="padding:4px 12px 4px 0;color:#757575;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${p(r)}</td>
      <td style="padding:4px 0;color:#212121;font:400 13px Arial,sans-serif">${t}</td>
    </tr>`:``}function M(r,e){let t=r.codigo||`(sin código)`,o=r.titulo?.trim()||r.proyecto?.trim()||`Acuerdo`,i=`Acuerdo ${t} \u2014 ${o}`,a=r.documentoHtml?.trim()??``,n=r.hashDocumento??``,s=e?.trim(),c=`<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f4f6f8">
  <div style="max-width:760px;margin:0 auto;padding:24px">

    <!-- Presentaci\xF3n -->
    <div style="background:#0c2d48;color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0">
      <div style="font:400 12px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.85">FirmaLink \u2014 Acuerdo</div>
      <div style="font:700 20px Arial,sans-serif;margin-top:6px">${p(t)}</div>
      <div style="font:400 14px Arial,sans-serif;margin-top:4px;opacity:.95">${p(o)}</div>
    </div>

    <!-- Datos de control -->
    <div style="background:#ffffff;padding:18px 24px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${l(`Estado`,r.estado)}
        ${l(`Proyecto`,r.proyecto)}
        ${l(`Área`,r.area)}
        ${l(`Gerente`,r.gerente)}
        ${l(`Representante`,r.representante)}
        ${l(`Cédula`,r.cedula)}
        ${l(`Vigencia`,r.vigencia)}
        ${l(`Ciudad`,r.ciudad)}
        ${l(`Fecha de firma`,r.fechaFirma)}
        ${l(`Honorario`,r.honorario?`${r.honorario} (${r.quincena||`sin periodicidad`})`:``)}
      </table>
    </div>

    ${s?`<div style="background:#ffffff;padding:0 24px 18px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0">
             <div style="border-left:3px solid #00b8a9;background:#f4fbfa;padding:10px 14px;font:400 13px Arial,sans-serif;color:#37474f;white-space:pre-wrap">${p(s)}</div>
           </div>`:``}

    <!-- Documento del acuerdo -->
    <div style="background:#ffffff;padding:24px;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0">
      <div style="font:700 12px Arial,sans-serif;color:#757575;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid #eeeeee;padding-bottom:8px;margin-bottom:16px">
        Documento del acuerdo
      </div>
      <div style="font:400 13px 'Tahoma',Arial,sans-serif;color:#212121;line-height:1.55">
        ${a||`<em style="color:#9e9e9e">El documento no tiene contenido redactado.</em>`}
      </div>
    </div>

    <!-- Pie con la huella -->
    <div style="background:#ffffff;padding:16px 24px 22px;border:1px solid #e0e0e0;border-top:0;border-radius:0 0 12px 12px">
      <div style="font:600 11px Arial,sans-serif;color:#757575;letter-spacing:.06em;text-transform:uppercase">Huella del documento (SHA-256)</div>
      <div style="font:400 11px 'Courier New',monospace;color:#546e7a;word-break:break-all;margin-top:4px">
        ${n?p(n):`<em>sin calcular</em>`}
      </div>
      <div style="font:400 11px Arial,sans-serif;color:#9e9e9e;margin-top:10px">
        Enviado desde FirmaLink \u2014 ${p(new Date().toLocaleString(`es-VE`))}
      </div>
    </div>

  </div>
</body>
</html>`,v=[`Estado: ${r.estado??``}`,r.proyecto?`Proyecto: ${r.proyecto}`:``,r.area?`\xC1rea: ${r.area}`:``,r.gerente?`Gerente: ${r.gerente}`:``,r.representante?`Representante: ${r.representante}`:``,r.cedula?`C\xE9dula: ${r.cedula}`:``,r.vigencia?`Vigencia: ${r.vigencia}`:``,r.ciudad?`Ciudad: ${r.ciudad}`:``,r.fechaFirma?`Fecha de firma: ${r.fechaFirma}`:``,r.honorario?`Honorario: ${r.honorario}`:``].filter(Boolean),x=[`ACUERDO ${t}`,o,``,...v];return s&&x.push(``,`Nota:`,s),x.push(``,`--- DOCUMENTO ---`,(r.documentoTexto||``).trim()||`(el documento no tiene contenido redactado)`,``,`Huella SHA-256: ${n||`sin calcular`}`,`Enviado desde FirmaLink \u2014 ${new Date().toLocaleString(`es-VE`)}`),{asunto:i,html:c,texto:x.join(`
`)}}var y=v(Ls());var F=/^[^\s@,;]+@[^\s@,;]+\.[a-zA-Z]{2,}$/;function N(r){return(r??``).split(/[,;\s]+/).map(e=>e.trim()).filter(e=>e.length>0)}function k(r){return r.filter(e=>!F.test(e))}async function U(r,e=``){let t=r?.codigo||`(sin código)`,o=r?.titulo?.trim()||r?.proyecto?.trim()||``,i=await y.default.fire({title:`Enviar el acuerdo por correo`,html:`
      <div style="text-align:left;font-size:13px;color:#546e7a;margin-bottom:12px">
        <strong>${t}</strong>${o?` — `+o:``}
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
      </div>`,focusConfirm:!1,showCancelButton:!0,confirmButtonText:`Enviar`,cancelButtonText:`Cancelar`,confirmButtonColor:`#0c2d48`,preConfirm:()=>{let a=N(document.getElementById(`fl-para`)?.value??``),n=N(document.getElementById(`fl-cc`)?.value??``),s=document.getElementById(`fl-mensaje`)?.value??``;if(a.length===0)return y.default.showValidationMessage(`Indique al menos un destinatario en el campo Para.`),!1;let c=[...k(a),...k(n)];return c.length>0?(y.default.showValidationMessage(`Revise ${c.length===1?`esta dirección`:`estas direcciones`}: ${c.join(`, `)}`),!1):{para:a,cc:n,mensaje:s}}});return i.isConfirmed?i.value:null}var T=class r$1{constructor(e,t,o){this.api=e;this.sha=t;this.notificar=o}api;sha;notificar;LIST_KEY=`firmalink:acuerdos:list`;BORRADOR_KEY=`firmalink:acuerdo:borrador`;guardar(e){let t=new Date().toISOString(),o=s(r({},e),{actualizadoEn:t,creadoEn:e.creadoEn??t,hashAlgoritmo:`SHA-256`}),i={coleccion:j.colecciones.ACUERDO,objeto:o,donde:JSON.stringify({codigo:o.codigo}),driver:j.driver.PRINCIPAL,upsert:!0};return this.api.ExecColeccion(i).pipe(dt(a=>o),dl(a=>{throw console.error(`[AcuerdoService] Error guardando:`,a),a}))}async listar(){let e=j.functions?.CONSULTAR_ACUERDOS;if(e)try{let t=await ih(this.api.Ejecutar({funcion:e,parametros:``})),o=t?.Cuerpo!==void 0?t.Cuerpo:t;if(typeof o==`string`)try{o=JSON.parse(o)}catch{o=[]}if(o&&!Array.isArray(o)&&o.tipo!==void 0)return this.notificar.aviso(`No se pudo consultar el listado de acuerdos`,`El servidor respondi\xF3: ${o.msj??`sin detalle`}. La numeraci\xF3n se calcula con la lista local de este navegador.`),this.leerCacheLocal();if(Array.isArray(o)){let i=o;return this.guardarCacheLocal(i),i}this.notificar.aviso(`Respuesta inesperada al listar acuerdos`,`La funci\xF3n ${e} no devolvi\xF3 una lista. Se usar\xE1 la lista local.`)}catch(t){console.warn(`[AcuerdoService] Falló consulta vía función; usar cache local.`,t),this.notificar.aviso(`No se pudo consultar el listado de acuerdos`,`Error de comunicaci\xF3n con el servidor (${d.detalle(t)}). La numeraci\xF3n se calcula con la lista local de este navegador.`)}return this.leerCacheLocal()}async obtener(e){if(!e)return null;let t=j.functions?.CONSULTAR_ACUERDO;if(t)try{let a=await ih(this.api.Ejecutar({funcion:t,parametros:e})),n=a?.Cuerpo!==void 0?a.Cuerpo:a;if(typeof n==`string`)try{n=JSON.parse(n)}catch{n=null}if(n&&!Array.isArray(n)&&n.tipo!==void 0)this.notificar.aviso(`No se pudo leer el acuerdo`,`El servidor respondi\xF3: ${n.msj??`sin detalle`}. Se intentar\xE1 con la copia local del listado.`);else if(Array.isArray(n)){let s=n[0]??null;if(s)return s}else if(n&&typeof n==`object`)return n}catch(a){console.warn(`[AcuerdoService] Falló lectura del acuerdo por función.`,a),this.notificar.aviso(`No se pudo leer el acuerdo desde el servidor`,`Error de comunicaci\xF3n (${d.detalle(a)}). Se intentar\xE1 con la copia local.`)}let o=this.leerCacheLocal().find(a=>a.codigo===e);if(o)return o;let i=this.leerBorradorLocal();return i&&i.codigo===e?i:null}EDITAR_KEY=`firmalink:acuerdo:editar`;acuerdoParaEditar=null;setAcuerdoParaEditar(e){this.acuerdoParaEditar=e}tomarAcuerdoParaEditar(){let e=this.acuerdoParaEditar;return this.acuerdoParaEditar=null,e}marcarParaEditar(e){try{e?sessionStorage.setItem(this.EDITAR_KEY,e):sessionStorage.removeItem(this.EDITAR_KEY)}catch{}}tomarPendienteEdicion(){try{let e=sessionStorage.getItem(this.EDITAR_KEY);return e&&sessionStorage.removeItem(this.EDITAR_KEY),e}catch{return null}}async cambiarEstado(e,t,o){if(!e)return!1;if(o&&!R(o).includes(t))return this.notificar.error(`Cambio de estado no permitido`,o===`firmado`?`El acuerdo ${e} est\xE1 firmado y solo puede anularse.`:`El acuerdo ${e} est\xE1 anulado y no admite m\xE1s cambios de estado.`),!1;let i={coleccion:j.colecciones.ACUERDO,objeto:{estado:t,actualizadoEn:new Date().toISOString()},donde:JSON.stringify({codigo:e}),driver:j.driver.PRINCIPAL,upsert:!0};try{return await ih(this.api.ExecColeccion(i)),!0}catch(a){return this.notificar.error(`No se pudo cambiar el estado`,`El acuerdo ${e} conserva su estado anterior (${d.detalle(a)}).`),!1}}async siguienteCodigo(e,t){let o=t??new Date().getFullYear(),i=await this.listar(),a=this.leerBorradorLocal(),n=0;for(let c of i)if(c.prefijo===e&&c.anio===o){let v=A(c.codigo);v>n&&(n=v)}if(a&&a.prefijo===e&&a.anio===o){let c=A(a.codigo);c>n&&(n=c)}return D(e,n+1,o)}async huella(e){let t=e.campos??{},o=e.documentoHtml??``,i=e.margen??{sup:2.5,inf:2.5,izq:3,der:2.5},a=e.codigo??``,n=e.prefijo??`CJS`,s=e.anio??new Date().getFullYear(),c=JSON.stringify(t)+`|`+o+`|`+JSON.stringify(i)+`|`+a+`|`+n+`|`+s;return this.sha.hash(c)}guardarCacheLocal(e){try{localStorage.setItem(this.LIST_KEY,JSON.stringify(e))}catch{}}leerCacheLocal(){try{let e=localStorage.getItem(this.LIST_KEY);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}guardarBorradorLocal(e){try{localStorage.setItem(this.BORRADOR_KEY,JSON.stringify(e))}catch{}}leerBorradorLocal(){try{let e=localStorage.getItem(this.BORRADOR_KEY);return e?JSON.parse(e):null}catch{return null}}descartarBorradorLocal(){try{localStorage.removeItem(this.BORRADOR_KEY)}catch{}}static ɵfac=function(t){return new(t||r$1)(De(l$1),De(O),De(d))};static ɵprov=ne({token:r$1,factory:r$1.ɵfac,providedIn:`root`})};export{T as a,d as c,R as i,z as l,L as n,U as o,M as r,_ as s,E as t};