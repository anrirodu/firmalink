import{a as v,n as s,t as r}from"./chunk-C9yOwMO6.js";import{$ as He,$t as _l,_ as Ls,cn as bh,pt as Me,rn as ae,v as O,y as P}from"./main-E3N7RBJU.js";import{n as R$1,t as I$1}from"./chunk-DIVwY93H.js";import{t as n}from"./chunk-QiLaSU9z.js";import{a as i,s as x,t as D$1}from"./chunk-BzAgKuph.js";function R(a){return a?.estado===`eliminado`||a?.eliminado===!0}function H(a,e,t){return`${a}${String(e).padStart(3,`0`)}-${t??new Date().getFullYear()}`}function D(a){if(!a)return 0;let t=a.replace(/-\d{4}$/,``).match(/(\d+)\s*$/);if(!t)return 0;let r=parseInt(t[1],10);return isNaN(r)?0:r}function le(a){return a===`borrador`||a===`en_revision`}function z(a){switch(a){case`borrador`:case`en_revision`:return[`borrador`,`en_revision`,`firmado`,`anulado`];case`firmado`:return[`anulado`];case`anulado`:return[];default:return[]}}function ce(a){return a===`firmado`?`El acuerdo está firmado: su contenido y su huella quedaron cerrados y no admite más ediciones.`:a===`anulado`?`El acuerdo está anulado: es un estado terminal y no admite más ediciones.`:a===`eliminado`?`El acuerdo está eliminado: ya no aparece en el listado y no admite ediciones.`:``}function p(a,e){let t=i(e);return t?`
              <tr>
                <td style="padding:5px 14px 5px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${i(a)}</td>
                <td style="padding:5px 0;color:#111827;font:400 13px Arial,sans-serif">${t}</td>
              </tr>`:``}function pe(a,e,t=[],r,i$1){let o=a.codigo||`(sin código)`,n=a.titulo?.trim()||a.proyecto?.trim()||`Acuerdo`,s=`Acuerdo ${o} \u2014 ${n}`,l=a.hashDocumento??``,d=e?.trim(),m=`${o}.pdf`,c=i$1??t.length,u=c>t.length,x$1=u?`, en hoja Carta (${c} p\xE1ginas). Arriba se reproduce el comienzo, ${t.length} de ${c} p\xE1ginas.`:t.length?`, en hoja Carta (${c} ${c===1?`página`:`páginas`}).`:`.`,f=t.length?`, en hoja Carta (${c} ${c===1?`página`:`páginas`})`:``,A=`
              <!-- Datos de control -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Acuerdo</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">${i(o)}</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${p(`Estado`,a.estado)}
                ${p(`Título`,n)}
                ${p(`Proyecto`,a.proyecto)}
                ${p(`Área`,a.area)}
                ${p(`Gerente`,a.gerente)}
                ${p(`Representante`,a.representante)}
                ${p(`Cédula`,a.cedula)}
                ${p(`Vigencia`,a.vigencia)}
                ${p(`Ciudad`,a.ciudad)}
                ${p(`Fecha de firma`,a.fechaFirma)}
                ${p(`Honorario`,a.honorario?`${a.honorario} (${a.quincena||`sin periodicidad`})`:``)}
              </table>

              ${d?`<div style="margin:20px 0 0 0;border-left:3px solid #059669;background-color:#F0FDF7;padding:12px 16px;font:400 13px Arial,sans-serif;color:#37474F;white-space:pre-wrap">${i(d)}</div>`:``}

              <!-- Documento: una imagen incrustada por p\xE1gina -->
              <div style="margin:28px 0 0 0;padding:22px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px">
                  Documento del acuerdo${t.length>1?` \u2014 ${t.length} p\xE1ginas`:``}
                </div>
                ${t.map((Z,N)=>`
                <img class="doc-page" src="cid:${x(Z.nombre)}" width="516"
                     alt="P\xE1gina ${N+1} del acuerdo ${i(o)}"
                     style="display:block;width:100%;max-width:100%;height:auto;border:1px solid #E5E7EB;border-radius:6px;margin:0 0 ${N<t.length-1?`16px`:`0`}">`).join(``)}
                <!-- Siempre visible: si el cliente descarta las im\xE1genes, este
                     aviso es lo \xFAnico que le dice al destinatario d\xF3nde est\xE1
                     el documento. -->
                <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #E5E7EB;font:400 13px Arial,sans-serif;color:#4B5563">
                  El documento completo viaja adjunto a este correo:
                  <strong style="color:#065F46">${i(m)}</strong>${x$1}
                </div>
              </div>

              <!-- Huella -->
              <div style="margin:24px 0 0 0;background-color:#ECFDF5;border:1px solid #A7F3D0;border-left:4px solid #059669;border-radius:8px;padding:14px 16px">
                <div style="font:700 11px Arial,sans-serif;color:#047857;letter-spacing:.06em;text-transform:uppercase">
                  Huella del documento (SHA-256)
                </div>
                <div style="font:400 12px 'Courier New',Courier,monospace;color:#047857;word-break:break-all;margin-top:6px">
                  ${l?i(l):`<em style="color:#9CA3AF">sin calcular</em>`}
                </div>
              </div>`,g=D$1({titulo:`Acuerdo ${o}`,encabezado:`FIRMALINK`,preheader:`${o} \u2014 ${n}. Documento adjunto en PDF${t.length?` y ${c} ${c===1?`página`:`páginas`} en el cuerpo.`:`.`}`,cuerpoHtml:A,logoCid:r?`cid:${x(r)}`:void 0,logoAlt:`FirmaLink`}),v=[a.estado?`Estado: ${a.estado}`:``,`T\xEDtulo: ${n}`,a.proyecto?`Proyecto: ${a.proyecto}`:``,a.area?`\xC1rea: ${a.area}`:``,a.gerente?`Gerente: ${a.gerente}`:``,a.representante?`Representante: ${a.representante}`:``,a.cedula?`C\xE9dula: ${a.cedula}`:``,a.vigencia?`Vigencia: ${a.vigencia}`:``,a.ciudad?`Ciudad: ${a.ciudad}`:``,a.fechaFirma?`Fecha de firma: ${a.fechaFirma}`:``,a.honorario?`Honorario: ${a.honorario}`:``].filter(Boolean);return{asunto:s,html:g,texto:[`FIRMALINK`,`${o} \u2014 ${n}`,``,...v,...d?[``,`Nota: ${d}`]:[],``,`El documento completo se env\xEDa como archivo adjunto: ${m}${f}`,...u?[`Las primeras ${t.length} de ${c} p\xE1ginas se reproducen en el cuerpo del mensaje.`]:[],``,`Huella SHA-256: ${l||`sin calcular`}`].join(`
`)}}var w=v(Ls());var ee=/^[^\s@,;]+@[^\s@,;]+\.[a-zA-Z]{2,}$/;function U(a){return(a??``).split(/[,;\s]+/).map(e=>e.trim()).filter(e=>e.length>0)}function k(a){return a.filter(e=>!ee.test(e))}async function ge(a,e=``){let t=a?.codigo||`(sin código)`,r=a?.titulo?.trim()||a?.proyecto?.trim()||``,i=await w.default.fire({title:`Enviar el acuerdo por correo`,html:`
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
      </div>`,focusConfirm:!1,showCancelButton:!0,confirmButtonText:`Enviar`,cancelButtonText:`Cancelar`,confirmButtonColor:`#0c2d48`,preConfirm:()=>{let o=U(document.getElementById(`fl-para`)?.value??``),n=U(document.getElementById(`fl-cc`)?.value??``),s=document.getElementById(`fl-mensaje`)?.value??``;if(o.length===0)return w.default.showValidationMessage(`Indique al menos un destinatario en el campo Para.`),!1;let l=[...k(o),...k(n)];return l.length>0?(w.default.showValidationMessage(`Revise ${l.length===1?`esta dirección`:`estas direcciones`}: ${l.join(`, `)}`),!1):{para:o,cc:n,mensaje:s}}});return i.isConfirmed?i.value:null}var Y=class a{constructor(e,t,r,i){this.api=e;this.sha=t;this.notificar=r;this.auth=i}api;sha;notificar;auth;LIST_KEY=`firmalink:acuerdos:list`;BORRADOR_KEY=`firmalink:acuerdo:borrador`;guardar(e){let t=new Date().toISOString(),r$1=s(r({},e),{eliminado:!1,actualizadoEn:t,creadoEn:e.creadoEn??t,hashAlgoritmo:`SHA-256`}),i={coleccion:P.colecciones.ACUERDO,objeto:r$1,donde:JSON.stringify({codigo:r$1.codigo}),driver:P.driver.PRINCIPAL,upsert:!0};return this.api.ExecColeccion(i).pipe(He(o=>r$1),_l(o=>{throw console.error(`[AcuerdoService] Error guardando:`,o),o}))}async listar(e=!1){let t=await this.consultarServidor();return e?t:t.filter(r=>!R(r))}async listarPorCliente(e,t=!1){if(!e)return this.listar(t);let r=P.functions?.CONSULTAR_ACUERDOS_CLIENTE,o=await this.consultarServidorRemoto(r,e,`los acuerdos de ${e}`,!1)??this.filtrarPorCliente(this.leerCacheLocal(),e);return t?o:o.filter(n=>!R(n))}filtrarPorCliente(e,t){return e.filter(r=>r.cliente?.codigo===t)}async consultarServidor(){return await this.consultarServidorRemoto(P.functions?.CONSULTAR_ACUERDOS,``,`el listado de acuerdos`,!0)??this.leerCacheLocal()}async consultarServidorRemoto(e,t,r,i){if(!e)return null;try{let o=await bh(this.api.Ejecutar({funcion:e,parametros:t})),s=o?.Cuerpo!==void 0?o.Cuerpo:o;if(typeof s==`string`)try{s=JSON.parse(s)}catch{s=[]}if(s&&!Array.isArray(s)&&s.tipo!==void 0)return this.notificar.aviso(`No se pudo consultar ${r}`,`El servidor respondi\xF3: ${s.msj??`sin detalle`}.`+(i?` La numeración se calcula con la lista local de este navegador.`:``)),null;if(Array.isArray(s)){let l=s;return i&&this.guardarCacheLocal(l),l}this.notificar.aviso(`Respuesta inesperada al consultar ${r}`,`La funci\xF3n ${e} no devolvi\xF3 una lista.`)}catch(o){console.warn(`[AcuerdoService] Fall\xF3 la consulta de ${r}; se usa la copia local.`,o),this.notificar.aviso(`No se pudo consultar ${r}`,`Error de comunicaci\xF3n con el servidor (${n.detalle(o)}).`+(i?` La numeración se calcula con la lista local de este navegador.`:``))}return null}async obtener(e){if(!e)return null;let t=P.functions?.CONSULTAR_ACUERDO;if(t)try{let o=await bh(this.api.Ejecutar({funcion:t,parametros:e})),n=o?.Cuerpo!==void 0?o.Cuerpo:o;if(typeof n==`string`)try{n=JSON.parse(n)}catch{n=null}if(n&&!Array.isArray(n)&&n.tipo!==void 0)this.notificar.aviso(`No se pudo leer el acuerdo`,`El servidor respondi\xF3: ${n.msj??`sin detalle`}. Se intentar\xE1 con la copia local del listado.`);else if(Array.isArray(n)){let s=n[0]??null;if(s)return s}else if(n&&typeof n==`object`)return n}catch(o){console.warn(`[AcuerdoService] Falló lectura del acuerdo por función.`,o),this.notificar.aviso(`No se pudo leer el acuerdo desde el servidor`,`Error de comunicaci\xF3n (${n.detalle(o)}). Se intentar\xE1 con la copia local.`)}let r=this.leerCacheLocal().find(o=>o.codigo===e);if(r)return r;let i=this.leerBorradorLocal();return i&&i.codigo===e?i:null}EDITAR_KEY=`firmalink:acuerdo:editar`;acuerdoParaEditar=null;setAcuerdoParaEditar(e){this.acuerdoParaEditar=e}tomarAcuerdoParaEditar(){let e=this.acuerdoParaEditar;return this.acuerdoParaEditar=null,e}marcarParaEditar(e){try{e?sessionStorage.setItem(this.EDITAR_KEY,e):sessionStorage.removeItem(this.EDITAR_KEY)}catch{}}tomarPendienteEdicion(){try{let e=sessionStorage.getItem(this.EDITAR_KEY);return e&&sessionStorage.removeItem(this.EDITAR_KEY),e}catch{return null}}async cambiarEstado(e,t,r){if(!e)return!1;if(r&&!z(r).includes(t))return this.notificar.error(`Cambio de estado no permitido`,r===`firmado`?`El acuerdo ${e} est\xE1 firmado y solo puede anularse.`:`El acuerdo ${e} est\xE1 anulado y no admite m\xE1s cambios de estado.`),!1;let i={coleccion:P.colecciones.ACUERDO,objeto:{estado:t,actualizadoEn:new Date().toISOString()},donde:JSON.stringify({codigo:e}),driver:P.driver.PRINCIPAL,upsert:!0};try{return await bh(this.api.ExecColeccion(i)),!0}catch(o){return this.notificar.error(`No se pudo cambiar el estado`,`El acuerdo ${e} conserva su estado anterior (${n.detalle(o)}).`),!1}}async eliminar(e,t){if(!e)return!1;if(t===`firmado`)return this.notificar.error(`Acuerdo firmado: no se puede eliminar`,`El acuerdo ${e} est\xE1 firmado: su contenido y su huella son definitivos. Si ya no lo necesita, m\xE1rquelo como Anulado.`),!1;let r=new Date().toISOString(),i=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario,o={coleccion:P.colecciones.ACUERDO,objeto:{estado:`eliminado`,eliminado:!0,eliminadoEn:r,eliminadoPorCedula:i?.cedula??``,eliminadoPorNombre:i?.nombre??``,actualizadoEn:r},donde:JSON.stringify({codigo:e}),driver:P.driver.PRINCIPAL,upsert:!0};try{return await bh(this.api.ExecColeccion(o)),this.guardarCacheLocal(this.leerCacheLocal().filter(n=>n.codigo!==e)),!0}catch(n$1){return this.notificar.error(`No se pudo eliminar el acuerdo`,`El acuerdo ${e} sigue en el listado (${n.detalle(n$1)}).`),!1}}async siguienteCodigo(e,t){let r=t??new Date().getFullYear(),i=await this.listar(!0),o=this.leerBorradorLocal(),n=0;for(let l of i)if(l.prefijo===e&&l.anio===r){let d=D(l.codigo);d>n&&(n=d)}if(o&&o.prefijo===e&&o.anio===r){let l=D(o.codigo);l>n&&(n=l)}return H(e,n+1,r)}async huella(e){let t=e.campos??{},r=e.documentoHtml??``,i=e.margen??{sup:2.5,inf:2.5,izq:3,der:2.5},o=e.codigo??``,n=e.prefijo??`CJS`,s=e.anio??new Date().getFullYear(),l=JSON.stringify(t)+`|`+r+`|`+JSON.stringify(i)+`|`+o+`|`+n+`|`+s;return this.sha.hash(l)}guardarCacheLocal(e){try{localStorage.setItem(this.LIST_KEY,JSON.stringify(e))}catch{}}leerCacheLocal(){try{let e=localStorage.getItem(this.LIST_KEY);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}guardarBorradorLocal(e){try{localStorage.setItem(this.BORRADOR_KEY,JSON.stringify(e))}catch{}}leerBorradorLocal(){try{let e=localStorage.getItem(this.BORRADOR_KEY);return e?JSON.parse(e):null}catch{return null}}descartarBorradorLocal(){try{localStorage.removeItem(this.BORRADOR_KEY)}catch{}}static ɵfac=function(t){return new(t||a)(Me(I$1),Me(O),Me(n),Me(R$1))};static ɵprov=ae({token:a,factory:a.ɵfac,providedIn:`root`})};var J=`
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
`;var q=8.5;var K=11;var re=96/2.54;var I=2;var V=96*I;var ne=8;var X=1024*1024;var ie=28*X;var se=2*X;var G=class a{async generarAcuerdoPdf(e){let[{default:t},{jsPDF:r}]=await Promise.all([import(`./chunk-BocJPyV_.js`),import(`./chunk-DSPIKa6B2.js`)]),i=this.geometria(e.margen),o=this.prepararCaptura(e,i.anchoUtilCss),n;try{document.fonts?.ready&&await document.fonts.ready,await this.esperarPintura(),n=await t(o,{scale:I,backgroundColor:`#ffffff`,useCORS:!0,logging:!1})}finally{o.remove()}let s=this.componerPaginas(n,i,e),l=this.nombreSeguro(e.nombre),d=new r({unit:`in`,format:`letter`,orientation:`portrait`,compress:!0});for(let u=0;u<s.length;u++)u>0&&d.addPage(`letter`,`portrait`),d.addImage(s[u],`JPEG`,0,0,q,K);let m=d.output(`blob`),c=this.nombrarPaginas(s,l);return{blob:m,nombre:l,paginas:this.elegirIncrustadas(c,m.size),totalPaginas:c.length}}elegirIncrustadas(e,t){let r=ie-se-t,i=[];for(let o of e){if(i.length>=ne||o.blob.size>r)break;r-=o.blob.size,i.push(o)}return i}nombrarPaginas(e,t){let r=this.baseSegura(t);return e.map((i,o)=>({nombre:x(`${r}-p${o+1}.jpg`),blob:this.dataUrlABlob(i)}))}dataUrlABlob(e){let t=e.indexOf(`,`),r=e.slice(0,t),i=/:(.*?);/.exec(r)?.[1]||`image/jpeg`,o=atob(e.slice(t+1)),n=new Uint8Array(o.length);for(let s=0;s<o.length;s++)n[s]=o.charCodeAt(s);return new Blob([n],{type:i})}geometria(e){let t=d=>Math.round(d*re*I),r=t(e.izq),i=t(e.der),o=t(e.sup),n=t(e.inf),s=Math.round(q*V),l=Math.round(K*V);return{anchoHojaPx:s,altoHojaPx:l,anchoUtilPx:s-r-i,altoUtilPx:l-o-n,anchoUtilCss:(s-r-i)/I,margenIzqPx:r,margenSupPx:o,margenInfPx:n}}prepararCaptura(e,t){let r=document.createElement(`div`);r.setAttribute(`aria-hidden`,`true`),r.style.cssText=`position:fixed;left:-20000px;top:0;width:${t}px;margin:0;padding:0;background:#ffffff;z-index:-1;box-sizing:border-box;`;let i=document.createElement(`style`);i.textContent=`
      html, body { margin: 0; padding: 0; background: #ffffff; }
      ${J}
    `,r.appendChild(i),r.style.fontFamily=`Tahoma, Verdana, Geneva, sans-serif`,r.style.fontSize=`13pt`,r.style.lineHeight=`1.15`,r.style.color=`#000000`,r.style.textAlign=`justify`;let o=document.createElement(`div`);return o.innerHTML=e.contenidoHtml??``,r.appendChild(o),document.body.appendChild(r),r}componerPaginas(e,t,r){if(e.width!==t.anchoUtilPx)throw new Error(`El ancho rasterizado (${e.width}px) no coincide con la columna \xFAtil (${t.anchoUtilPx}px).`);let i=this.calcularCortes(e,t.altoUtilPx),o=[];for(let n=0;n<i.length;n++){let s=n===0?0:i[n-1],l=n===i.length-1?e.height:i[n],d=Math.max(0,l-s),m=document.createElement(`canvas`);m.width=t.anchoHojaPx,m.height=t.altoHojaPx;let c=m.getContext(`2d`);if(!c)throw new Error(`El navegador no permitió crear el lienzo de la página del PDF.`);c.fillStyle=`#ffffff`,c.fillRect(0,0,m.width,m.height),d>0&&c.drawImage(e,0,s,e.width,d,t.margenIzqPx,t.margenSupPx,e.width,d),this.dibujarFolioEnHoja(c,m,r,t),o.push(m.toDataURL(`image/jpeg`,.92))}return o}calcularCortes(e,t){let r=e.height;if(r<=t)return[r];let i=this.leerPixeles(e),o=2,n=Math.max(8,Math.round(t*.12)),s=3,l=new Map,d=u=>{if(u<1||u>=r)return Number.POSITIVE_INFINITY;let x=l.get(u);if(x!==void 0)return x;let f=u*e.width*4,A=0;for(let g=0;g<e.width;g+=o){let v=f+g*4;(i[v]<250||i[v+1]<250||i[v+2]<250)&&A++}return l.set(u,A),A},m=[],c=0;for(;r-c>t;){let u=c+t,x=Math.max(c+1,u-n),f=u,A=Number.POSITIVE_INFINITY;for(let g=u;g>=x;g--){let v=0;for(let E=-3;E<=s;E++)v+=d(g+E);v<A&&(A=v,f=g)}(f>u||f-c<t/4)&&(f=u),m.push(f),c=f}return m.push(r),m}leerPixeles(e){let t=e.getContext(`2d`);if(!t)throw new Error(`El navegador no permitió leer el lienzo del documento.`);return t.getImageData(0,0,e.width,e.height).data}dibujarFolioEnHoja(e,t,r,i){e.font=`21px Tahoma, Verdana, Geneva, sans-serif`,e.fillStyle=`#000000`,e.textAlign=`center`,e.textBaseline=`alphabetic`;let o=t.width/2,n=`C\xD3D.: ${r.codigo||`ACUERDO`} | Fecha: ${r.fecha||``} | SANDRA SERVER`;e.fillText(n,o,t.height-i.margenInfPx+70),r.huella&&e.fillText(`SHA-256: ${r.huella}`,o,t.height-i.margenInfPx+110)}async esperarPintura(){await new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0)))}nombreSeguro(e){let t=this.baseSegura(e);return t.toLowerCase().endsWith(`.pdf`)?t:`${t}.pdf`}baseSegura(e){return(e||`acuerdo`).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^A-Za-z0-9._-]+/g,`-`).replace(/-+/g,`-`).replace(/^-|-$/g,``).replace(/\.pdf$/i,``).replace(/^[-.]+|[-.]+$/g,``)||`acuerdo`}static ɵfac=function(t){return new(t||a)};static ɵprov=ae({token:a,factory:a.ɵfac,providedIn:`root`})};export{ge as a,z as c,ce as i,J as n,le as o,Y as r,pe as s,G as t};