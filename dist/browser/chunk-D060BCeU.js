import{n as s,r as t,t as r}from"./chunk-C9yOwMO6.js";import{an as ae$1,b as j,ht as Me,un as bh,x as k}from"./main-ARBYWG72.js";import{n as _,t as I}from"./chunk-DvktxqGA.js";import{t as g$1}from"./chunk-CP0TiItl.js";import{E as q,F as y,O as s$1,_ as g$2,c as U,g as f,h as ee$1,j as u,l as V,m as d,n as B$1,r as E,s as S$1,t as A,w as p}from"./chunk-DMNtUqL1.js";import{n as p$1}from"./chunk-CiWD4Y4C.js";var fe=[`borrador`,`enviado`,`aprobado`,`rechazado`,`anulado`];var B={validezDias:30,formaPago:`Contado contra entrega`,tiempoEntrega:`A convenir con el cliente`,garantia:`30 días sobre defectos de fabricación`,lugar:`Caracas, Distrito Capital`,alcance:``};var X=16;function K(){return{nombre:A.nombre,rif:A.rif,direccion:A.direccion,correo:A.correo,telefonos:A.telefonos}}var C=g$2;function J(o){return`PRE-`+String(Math.max(1,Math.trunc(o))).padStart(6,`0`)}var z=V;function ee(o,e){let t=new Date(o.getTime());return t.setDate(t.getDate()+Math.max(0,Math.trunc(e))),t}function H(o,e){return ee(o,e)}function oe(o,e=new Date){if(o.estado!==`enviado`)return!1;let t=new Date(o.fechaValidez);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),23,59,59);return e.getTime()>a.getTime()}function pe(o,e=new Date){let t=new Date(o.fechaValidez);if(isNaN(t.getTime()))return 0;return Math.ceil((t.getTime()-e.getTime())/(1440*60*1e3))}function D(o){return q(o)?0:f(o.alicuotaIva)}function te(o){return B$1(o)}function O(o){let e=f(o.descuentoPorcentaje);return Math.min(100,Math.max(0,e))}function x(o){let e=u(te(o.items)),t=u(e*(O(o)/100)),a=u(e-t),r=u(a*(D(o)/100));return{subtotal:e,descuento:t,baseImponible:a,montoIva:r,total:u(a+r)}}function ae(o={}){let e=o.ahora??new Date,t=o.numero!=null?C(o.numero):z(o.ultimoNumero??`0000000`),a=r(r({},B),o.condiciones??{});return{codigo:``,numero:t,estado:`borrador`,fechaEmision:e.toISOString(),fechaTexto:U(e),fechaValidez:H(e,a.validezDias).toISOString(),alicuotaIva:X,descuentoPorcentaje:0,items:[],cliente:null,condiciones:a,emisor:r(r({},K()),o.emisor??{}),mostrarFirmaSello:!0,mostrarCabeceraPie:!0,mostrarMarcaAgua:!0,observaciones:``,creadoEn:e.toISOString(),usuario:o.usuario??``}}function g(o){let e=ae();if(!o)return e;let t=Array.isArray(o.items)?o.items.map(n=>({descripcion:String(n?.descripcion??``),cantidad:f(n?.cantidad),precio:f(n?.precio)})):[],a=s(r(r({},B),o.condiciones??{}),{validezDias:f(o.condiciones?.validezDias??e.condiciones.validezDias)}),r$1=s(r(r({},e),o),{numero:C(o.numero??e.numero),fechaEmision:o.fechaEmision||e.fechaEmision,fechaTexto:o.fechaTexto||e.fechaTexto,fechaValidez:o.fechaValidez||H(new Date(o.fechaEmision||e.fechaEmision),a.validezDias).toISOString(),alicuotaIva:f(o.alicuotaIva??e.alicuotaIva),descuentoPorcentaje:f(o.descuentoPorcentaje??e.descuentoPorcentaje),mostrarFirmaSello:o.mostrarFirmaSello!==!1,mostrarCabeceraPie:o.mostrarCabeceraPie!==!1,mostrarMarcaAgua:o.mostrarMarcaAgua!==!1,items:t,cliente:o.cliente??null,condiciones:a,emisor:r(r({},K()),o.emisor??{}),observaciones:o.observaciones??``});return r$1.totales=o.totales??x(r$1),r$1}function R(o){return o===`eliminado`}function N(o){return!o||o===`borrador`}function he(o){switch(o){case`enviado`:return`El presupuesto ya se envió al cliente: su contenido quedó congelado para que coincida con lo que él recibió.`;case`aprobado`:return`El presupuesto está aprobado por el cliente: para cambiar algo hay que emitir uno nuevo.`;case`rechazado`:return`El presupuesto fue rechazado: para renegociar hay que emitir uno nuevo.`;case`anulado`:return`El presupuesto está anulado: es un estado terminal y no admite ediciones.`;case`eliminado`:return`El presupuesto está eliminado: ya no aparece en el listado y no admite ediciones.`;default:return``}}function G(o){switch(o){case`borrador`:case void 0:return[`enviado`,`eliminado`];case`enviado`:return[`aprobado`,`rechazado`,`anulado`];case`aprobado`:case`rechazado`:return[`anulado`];default:return[]}}function ge(o,e=new Date){return oe(o,e)?`vencido`:o.estado}function ve(o){switch(o){case`enviado`:return{etiqueta:`Enviado`,color:`#1565c0`,icono:`send`};case`aprobado`:return{etiqueta:`Aprobado`,color:`#2e7d32`,icono:`verified`};case`rechazado`:return{etiqueta:`Rechazado`,color:`#c62828`,icono:`thumb_down`};case`vencido`:return{etiqueta:`Vencido`,color:`#8e24aa`,icono:`schedule`};case`anulado`:return{etiqueta:`Anulado`,color:`#757575`,icono:`block`};case`eliminado`:return{etiqueta:`Eliminado`,color:`#757575`,icono:`delete_outline`};default:return{etiqueta:`Borrador`,color:`#ef6c00`,icono:`edit_note`}}}function Pe(o){let e=[];return(!o.numero||!/^\d{7}$/.test(o.numero))&&e.push({campo:`numero`,mensaje:`El número de presupuesto debe tener 7 dígitos.`}),o.cliente||e.push({campo:`cliente`,mensaje:`Seleccione el cliente al que se cotiza.`}),o.fechaEmision||e.push({campo:`fechaEmision`,mensaje:`Indique la fecha de emisión.`}),o.fechaValidez?new Date(o.fechaValidez)<new Date(o.fechaEmision)&&e.push({campo:`fechaValidez`,mensaje:`La fecha de validez no puede ser anterior a la emisión.`}):e.push({campo:`fechaValidez`,mensaje:`Indique hasta cuándo vale el presupuesto.`}),f(o.condiciones?.validezDias)<=0&&e.push({campo:`condiciones.validezDias`,mensaje:`La validez debe ser de al menos un día.`}),o.condiciones?.formaPago?.trim()||e.push({campo:`condiciones.formaPago`,mensaje:`Indique la forma de pago ofrecida.`}),(o.items??[]).length===0&&e.push({campo:`items`,mensaje:`Agregue al menos un renglón al presupuesto.`}),(o.items??[]).forEach((t,a)=>{t.descripcion?.trim()||e.push({campo:`items.${a}.descripcion`,mensaje:`El rengl\xF3n ${a+1} no tiene descripci\xF3n.`}),t.cantidad>0||e.push({campo:`items.${a}.cantidad`,mensaje:`La cantidad del rengl\xF3n ${a+1} debe ser mayor que cero.`}),t.precio>=0||e.push({campo:`items.${a}.precio`,mensaje:`El precio del rengl\xF3n ${a+1} no puede ser negativo.`})}),x(o).total<=0&&e.push({campo:`items`,mensaje:`El total del presupuesto debe ser mayor que cero.`}),e}function S(o){let e=new Date(o.fechaValidez);return isNaN(e.getTime())?``:ee$1(e)}var re=`PRESUPUESTO`;function se(o){let e=o.items??[];return e.length===0?`<tr class="fx-fila-vacia"><td colspan="4">Sin renglones cotizados.</td></tr>`:e.map(t=>{let a=(Number(t.cantidad)||0)*(Number(t.precio)||0);return`<tr>
        <td class="fx-col-desc">${g$1(t.descripcion)}</td>
        <td class="fx-col-cant fx-num">${g$1(E(t.cantidad))}</td>
        <td class="fx-col-precio fx-num">${g$1(s$1(t.precio))}</td>
        <td class="fx-col-total fx-num">${g$1(s$1(a))}</td>
      </tr>`}).join(``)}function ie(o){let e=x(o),t=O(o),a=[];return a.push(`<tr>
        <td class="fx-son-cell" colspan="2">Valido hasta: <strong>${g$1(S(o))}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${g$1(s$1(e.subtotal))}</td>
      </tr>`),a.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${g$1(y(e.total))}</span></td>
        <td class="fx-label">${t>0?`Descuento`:`IVA`}: ${g$1(p(t>0?t:D(o)))}</td>
        <td class="fx-amount">${t>0?`- `:``}${g$1(s$1(t>0?e.descuento:e.montoIva))}</td>
      </tr>`),t>0&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IVA: ${g$1(p(D(o)))}</td>
        <td class="fx-amount">${g$1(s$1(e.montoIva))}</td>
      </tr>`),a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${g$1(s$1(e.total))}</td>
      </tr>`),a.join(``)}function ne(o){let e=o.condiciones;if(!e)return``;let t=[],a=(r,n)=>{n?.trim()&&t.push(`<div class="fx-cond-linea"><span class="fx-cond-etiqueta">${g$1(r)}:</span> ${g$1(n)}</div>`)};return a(`Validez`,`${E(e.validezDias)} dias, hasta el ${S(o)}`),a(`Forma de pago`,e.formaPago),a(`Tiempo de entrega`,e.tiempoEntrega),a(`Garantia`,e.garantia),a(`Lugar`,e.lugar),a(`Alcance`,e.alcance),t.length===0?``:`<div class="fx-condiciones">
    <div class="fx-condiciones-titulo">Condiciones</div>
    ${t.join(``)}
  </div>`}function ce(o){return`<div class="fx-firmas">
    <div class="fx-firma-col">
      ${o.mostrarFirmaSello?`<img class="fx-img-firma" src="${d(`factura/firma.png`)}" alt="Firma">
       <img class="fx-img-sello" src="${d(`factura/sello.png`)}" alt="Sello">`:``}
      <div class="fx-firma-linea">
        <div class="fx-firma-pie">Por ${g$1(o.emisor.nombre)}</div>
      </div>
    </div>
    <div class="fx-firma-col fx-sin-imagen">
      <div class="fx-firma-linea">
        <div class="fx-firma-pie">Aprobado por el cliente &mdash; nombre, cedula y fecha</div>
      </div>
    </div>
  </div>`}function ue(o){let e=o.emisor,t=o.mostrarCabeceraPie,a=o.mostrarMarcaAgua,r=t?`<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${d(`factura/emisor.png`)}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${g$1(e.nombre)}</div>
        <div>RIF: ${g$1(e.rif)}</div>
        <div>Direccion: ${g$1(e.direccion)}</div>
        <div>Correo: ${g$1(e.correo)} Telefonos: ${g$1(e.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${re}</div>
        <div>N&deg; de Presupuesto</div>
        <div class="fx-doc-num">${g$1(o.numero)}</div>
        <div>Valido hasta: ${g$1(S(o))}</div>
      </div>
    </div>`:``,n=t?`<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        <strong>${g$1(e.nombre)}</strong>
        RIF: ${g$1(e.rif)} ${g$1(e.direccion)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${g$1(e.correo)} &nbsp;&nbsp; Telf: ${g$1(e.telefonos)}
      </div>
      <div class="fx-no-fiscal">DOCUMENTO NO FISCAL &mdash; NO CONSTITUYE FACTURA</div>
    </div>`:``;return`<div class="${a?`fx-hoja`:`fx-hoja fx-sin-marca`}">
    ${r}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${g$1(o.cliente?.nombre??``)}</strong></div>
        <div class="fx-factura-num">PRESUPUESTO: <span>${g$1(o.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${g$1(o.cliente?.rif??``)}</span></div>
        <div>Fecha de Emision: <span>${g$1(o.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${g$1(o.cliente?.telefono??``)}</span></div>
        <div>Validez: <span>${g$1(S(o))}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${g$1(o.cliente?.direccion??``)}</span></div>
      </div>
    </div>

    <table class="fx-items">
      <colgroup>
        <col>
        <col class="fx-col-cant">
        <col class="fx-col-precio">
        <col class="fx-col-total">
      </colgroup>
      <thead>
        <tr>
          <th class="fx-col-desc">Descripcion</th>
          <th class="fx-col-cant">Cantidad</th>
          <th class="fx-col-precio">Precio</th>
          <th class="fx-col-total">Total</th>
        </tr>
      </thead>
      <tbody>${se(o)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${ie(o)}
    </table>

    ${ne(o)}
    ${ce(o)}
    ${n}
  </div>`}function le(o){return`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Presupuesto ${g$1(o.numero)}</title>
<style>
${S$1}

  .fx-hoja {
    --fx-img-logo: url('${d(`factura/emisor.png`)}');
    --fx-img-marca: url('${d(`factura/emisor.png`)}');
    --fx-img-firma: url('${d(`factura/firma.png`)}');
    --fx-img-sello: url('${d(`factura/sello.png`)}');
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  .fx-hoja {
    margin: 0;
    border: none;
    box-shadow: none;
  }

</style>
</head>
<body>
${ue(o)}
</body>
</html>`}function Ae(o){let e=window.open(``,`_blank`,`width=900,height=1100`);if(!e)return;e.document.open(),e.document.write(le(o));let t=()=>{e.focus(),e.print()};e.document.close();let a=Array.from(e.document.images??[]);if(a.length===0||a.every(s=>s.complete)){setTimeout(t,120);return}let r=a.length,n=()=>{r-=1,r<=0&&setTimeout(t,120)};a.forEach(s=>{s.addEventListener(`load`,n),s.addEventListener(`error`,n)})}var Z=class o{constructor(e,t,a,r){this.api=e;this.sha=t;this.notificar=a;this.auth=r}api;sha;notificar;auth;LIST_KEY=`firmalink:presupuestos:list`;BORRADOR_KEY=`firmalink:presupuesto:borrador`;EDITAR_KEY=`firmalink:presupuesto:editar`;async guardar(e){let t$1=new Date().toISOString(),a=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario,r$2=s(r({},e),{codigo:e.codigo||await this.siguienteCodigo(),numero:C(e.numero),creadoEn:e.creadoEn??t$1,actualizadoEn:t$1,usuario:e.usuario||a?.cedula||``});r$2.totales=x(r$2),(r$2.estado===`enviado`||!r$2.huella)&&(r$2.huella=await this.huella(r$2));let y=r$2,{_id:n}=y,s$2=t(y,[`_id`]),p={coleccion:j.colecciones.PRESUPUESTO,objeto:s$2,donde:JSON.stringify({codigo:r$2.codigo}),driver:j.driver.PRINCIPAL,upsert:!0};try{return await bh(this.api.ExecColeccion(p)),this.fusionarEnCache(r$2),r$2}catch(Q){return this.notificar.error(`No se pudo guardar el presupuesto`,`El presupuesto ${r$2.numero} qued\xF3 solo en este navegador (${p$1.detalle(Q)}).`),null}}async huella(e){let t=JSON.stringify({numero:e.numero,fecha:e.fechaEmision,validez:e.fechaValidez,cliente:e.cliente?.codigo??``,rif:e.cliente?.rif??``,items:e.items,alicuotaIva:e.alicuotaIva,descuento:e.descuentoPorcentaje});return this.sha.hash(t)}async listar(e=!1){let t=await this.consultarServidor();return e?t:t.filter(a=>!R(a.estado))}async listarPorCliente(e,t=!1){if(!e)return this.listar(t);let a=j.functions?.CONSULTAR_PRESUPUESTOS_CLIENTE,n=await this.consultarServidorRemoto(a,e,`los presupuestos de ${e}`,!1)??this.leerCacheLocal().filter(s=>s.cliente?.codigo===e);return t?n:n.filter(s=>!R(s.estado))}async obtener(e){if(!e)return null;let t=j.functions?.CONSULTAR_PRESUPUESTO;if(t)try{let n=await bh(this.api.Ejecutar({funcion:t,parametros:e})),s=this.desempaquetar(n);if(s&&!Array.isArray(s)&&s.tipo!==void 0)this.notificar.aviso(`No se pudo leer el presupuesto`,`El servidor respondi\xF3: ${s.msj??`sin detalle`}. Se intentar\xE1 con la copia local del listado.`);else if(Array.isArray(s)){let p=s[0]??null;if(p)return g(p)}else if(s&&typeof s==`object`)return g(s)}catch(n){this.notificar.aviso(`No se pudo leer el presupuesto desde el servidor`,`Error de comunicaci\xF3n (${p$1.detalle(n)}). Se intentar\xE1 con la copia local.`)}let a=this.leerCacheLocal().find(n=>n.codigo===e);if(a)return g(a);let r=this.leerBorradorLocal();return r&&r.codigo===e?r:null}async siguienteNumero(){let e=await this.listar(!0),t=this.leerBorradorLocal(),a=0;for(let r of e){let n=parseInt(String(r.numero).replace(/\D/g,``)||`0`,10);n>a&&(a=n)}if(t){let r=parseInt(String(t.numero).replace(/\D/g,``)||`0`,10);r>a&&(a=r)}return z(a)}async siguienteCodigo(){let e=await this.listar(!0),t=0;for(let a of e){let r=parseInt(String(a.codigo).replace(/\D/g,``)||`0`,10);r>t&&(t=r)}return J(t+1)}async cambiarEstado(e,t,a){return e?a&&!G(a).includes(t)?(this.notificar.error(`Cambio de estado no permitido`,`El presupuesto ${e} est\xE1 en "${a}" y desde ah\xED no puede pasar a "${t}".`),!1):this.escribirEstado(e,{estado:t}):!1}async responder(e,t,a={}){return e?this.escribirEstado(e,{estado:t,aprobadoPor:a.aprobadoPor??``,motivoRechazo:t===`rechazado`?a.motivoRechazo??``:``,fechaRespuesta:new Date().toISOString()}):!1}async escribirEstado(e,t){let a=new Date().toISOString(),r$3={coleccion:j.colecciones.PRESUPUESTO,objeto:s(r({},t),{actualizadoEn:a}),donde:JSON.stringify({codigo:e}),driver:j.driver.PRINCIPAL,upsert:!0};try{await bh(this.api.ExecColeccion(r$3));let n=this.leerCacheLocal().map(s$3=>s$3.codigo===e?s(r(r({},s$3),t),{actualizadoEn:a}):s$3);return this.guardarCacheLocal(n),!0}catch(n){return this.notificar.error(`No se pudo cambiar el estado`,`El presupuesto ${e} conserva su estado anterior (${p$1.detalle(n)}).`),!1}}async eliminar(e,t){if(!e)return!1;if(!N(t))return this.notificar.error(`Presupuesto ya emitido: no se puede eliminar`,`El presupuesto ${e} ya sali\xF3 al cliente (${t}). Si ya no tiene efecto, an\xFAlelo.`),!1;let a=new Date().toISOString(),r=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario,n={coleccion:j.colecciones.PRESUPUESTO,objeto:{estado:`eliminado`,eliminadoEn:a,eliminadoPorCedula:r?.cedula??``,eliminadoPorNombre:r?.nombre??``,actualizadoEn:a},donde:JSON.stringify({codigo:e}),driver:j.driver.PRINCIPAL,upsert:!0};try{return await bh(this.api.ExecColeccion(n)),this.guardarCacheLocal(this.leerCacheLocal().filter(s=>s.codigo!==e)),!0}catch(s){return this.notificar.error(`No se pudo eliminar el presupuesto`,`El presupuesto ${e} sigue en el listado (${p$1.detalle(s)}).`),!1}}copiaDesactualizada(e){return!!e.cliente&&!N(e.estado)&&!!e.cliente.copiadoEn}marcarParaEditar(e){try{e?sessionStorage.setItem(this.EDITAR_KEY,e):sessionStorage.removeItem(this.EDITAR_KEY)}catch{}}tomarPendienteEdicion(){try{let e=sessionStorage.getItem(this.EDITAR_KEY);return e&&sessionStorage.removeItem(this.EDITAR_KEY),e}catch{return null}}async consultarServidor(){return await this.consultarServidorRemoto(j.functions?.CONSULTAR_PRESUPUESTOS,``,`el listado de presupuestos`,!0)??this.leerCacheLocal()}async consultarServidorRemoto(e,t,a,r){if(!e)return null;try{let n=await bh(this.api.Ejecutar({funcion:e,parametros:t})),s=this.desempaquetar(n);if(s&&!Array.isArray(s)&&s.tipo!==void 0)return this.notificar.aviso(`No se pudo consultar ${a}`,`El servidor respondi\xF3: ${s.msj??`sin detalle`}.`+(r?` La numeración se calcula con la lista local de este navegador.`:``)),null;if(Array.isArray(s)){let p=s.map(y=>g(y));return r&&this.guardarCacheLocal(p),p}this.notificar.aviso(`Respuesta inesperada al consultar ${a}`,`La funci\xF3n ${e} no devolvi\xF3 una lista.`)}catch(n){console.warn(`[PresupuestoService] Fall\xF3 la consulta de ${a}; se usa la copia local.`,n),this.notificar.aviso(`No se pudo consultar ${a}`,`Error de comunicaci\xF3n con el servidor (${p$1.detalle(n)}).`+(r?` La numeración se calcula con la lista local de este navegador.`:``))}return null}desempaquetar(e){let t=e?.Cuerpo!==void 0?e.Cuerpo:e;if(typeof t==`string`)try{t=JSON.parse(t)}catch{t=[]}return t}guardarCacheLocal(e){try{localStorage.setItem(this.LIST_KEY,JSON.stringify(e))}catch{}}leerCacheLocal(){try{let e=localStorage.getItem(this.LIST_KEY);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.map(a=>g(a)):[]}catch{return[]}}fusionarEnCache(e){let t=this.leerCacheLocal(),a=t.findIndex(r=>r.codigo===e.codigo);a>=0?t[a]=e:t.push(e),this.guardarCacheLocal(t)}guardarBorradorLocal(e){try{localStorage.setItem(this.BORRADOR_KEY,JSON.stringify(e))}catch{}}leerBorradorLocal(){try{let e=localStorage.getItem(this.BORRADOR_KEY);return e?g(JSON.parse(e)):null}catch{return null}}descartarBorradorLocal(){try{localStorage.removeItem(this.BORRADOR_KEY)}catch{}}static ɵfac=function(t){return new(t||o)(Me(I),Me(k),Me(p$1),Me(_))};static ɵprov=ae$1({token:o,factory:o.ɵfac,providedIn:`root`})};export{ve as _,H as a,Pe as c,ae as d,fe as f,ue as g,pe as h,G as i,S as l,he as m,C as n,N as o,ge as p,D as r,O as s,Ae as t,Z as u,x as v};