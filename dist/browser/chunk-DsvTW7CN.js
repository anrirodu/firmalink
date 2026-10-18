import{n as s,r as t,t as r}from"./chunk-C9yOwMO6.js";import{cn as bh,pt as Me,rn as ae$1,v as O$1,y as P}from"./main-E3N7RBJU.js";import{n as R$1,t as I$1}from"./chunk-DIVwY93H.js";import{t as g$1}from"./chunk-CP0TiItl.js";import{t as n}from"./chunk-QiLaSU9z.js";var B={nombre:`BUNKER TECHNOLOGIES SOLUTIONS, C.A`,rif:`J- 50561969-1`,direccion:`Av Fuerte Tiuna, Edif. D06, Piso 6, Apto B6, Sector Los Constituyentistas`,correo:`bunkertechs@gmail.com`,telefonos:`0412-2602101 / 0412-6553516 / 0412-9967096`,razonSocial:`Libreria y Papeleria Dimargi, C.A`,razonSocialDireccion:`Av.Bolivar Edf. Nevic, Local 5 Los Teques - Edo Miranda`,razonSocialTelefonos:`0426-9110914 / 04143219896`,razonSocialRif:`J-00216902-8`,razonSocialCorreo:`libreriadimargi@gmail.com`,fechaControl:`01-09-2026`,controlDesde:`00-00000101`,controlHasta:`00-00000200`,providencia:`SENIAT/01/01043 de fecha 08-10-2008`,region:`Region Capital`};var Q=16;var Z=3;var W=5;var k=`00-`;function C(t){let e=String(t??``).trim();if(!e)return 0;e.includes(`.`)&&e.includes(`,`)?e=e.replace(/\./g,``).replace(`,`,`.`):e.includes(`,`)&&(e=e.replace(`,`,`.`));let a=parseFloat(e);return isNaN(a)?0:a}function m(t){let e=Number.isFinite(t)?t:0,a=e<0,[r,o]=Math.abs(e).toFixed(2).split(`.`),i=r.replace(/\B(?=(\d{3})+(?!\d))/g,`.`);return(a?`-`:``)+i+`,`+o}function y(t){let a=Math.round((Number.isFinite(t)?t:0)*1e3)/1e3,[r,o]=String(a).split(`.`),i=r.replace(/\B(?=(\d{3})+(?!\d))/g,`.`);return o?i+`,`+o:i}function F(t){return y(t)+`%`}var M=[`CERO`,`UNO`,`DOS`,`TRES`,`CUATRO`,`CINCO`,`SEIS`,`SIETE`,`OCHO`,`NUEVE`,`DIEZ`,`ONCE`,`DOCE`,`TRECE`,`CATORCE`,`QUINCE`,`DIECISEIS`,`DIECISIETE`,`DIECIOCHO`,`DIECINUEVE`,`VEINTE`,`VEINTIUNO`,`VEINTIDOS`,`VEINTITRES`,`VEINTICUATRO`,`VEINTICINCO`,`VEINTISEIS`,`VEINTISIETE`,`VEINTIOCHO`,`VEINTINUEVE`];var X=[``,`DIEZ`,`VEINTE`,`TREINTA`,`CUARENTA`,`CINCUENTA`,`SESENTA`,`SETENTA`,`OCHENTA`,`NOVENTA`];var ee=[``,`CIENTO`,`DOSCIENTOS`,`TRESCIENTOS`,`CUATROCIENTOS`,`QUINIENTOS`,`SEISCIENTOS`,`SETECIENTOS`,`OCHOCIENTOS`,`NOVECIENTOS`];var V=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];function A(t){if(t===0)return`CERO`;if(t===100)return`CIEN`;let e=Math.floor(t/100),a=t%100,r=e>0?ee[e]+` `:``;if(a>0)if(a<30)r+=M[a];else{let o=Math.floor(a/10),i=a%10;r+=X[o],i>0&&(r+=` Y `+M[i])}return r.trim()}function _(t){if(t===0)return`CERO`;let e=Math.floor(t/0xe8d4a51000),a=Math.floor(t%0xe8d4a51000/1e6),r=Math.floor(t%1e6/1e3),o=t%1e3,i=``;return e>0&&(i+=e===1?`UN BILLON `:A(e)+` BILLONES `),a>0&&(i+=a===1?`UN MILLON `:A(a)+` MILLONES `),r>0&&(i+=r===1?`MIL `:A(r)+` MIL `),o>0&&(i+=A(o)),i.trim()}function H(t){let a=Math.abs(Number.isFinite(t)?t:0).toFixed(2).split(`.`),r=parseInt(a[0],10),o=parseInt(a[1],10),i=_(r);return i+=r===1?` BOLIVAR`:` BOLIVARES`,i+=` CON `+(o>0?_(o):`CERO`),i+=o===1?` CENTIMO`:` CENTIMOS`,i.replace(/\bUNO\b/g,`UN`)}function te(t=new Date){return`${V[t.getMonth()]} ${t.getFullYear()}`}function ae(t){return String(t).padStart(2,`0`)}function re(t,e=`Caracas`){return`${e} ${ae(t.getDate())}/${V[t.getMonth()]}/${t.getFullYear()}`}function p(t){return(String(t??``).replace(/\D/g,``)||`0`).slice(-7).padStart(7,`0`)}function he(t,e){return`${t||k}${p(e)}`}function T(t){let e=parseInt(String(t??``).replace(/\D/g,``)||`0`,10);return p(Number.isFinite(e)?e+1:1)}function J(t){return`FAC-`+String(Math.max(1,Math.trunc(t))).padStart(6,`0`)}function xe(t,e){let a=parseInt(String(e).replace(/\D/g,``)||`0`,10),r=parseInt(String(t.controlDesde).replace(/\D/g,``)||`0`,10),o=parseInt(String(t.controlHasta).replace(/\D/g,``)||`0`,10);return a>=r&&a<=o}function oe(t){let e=t.cliente;return!!e&&e.agenteRetencionIva&&e.porcentajeRetencionIva>0}function ie(t){return t.cliente?.condicionFiscal===`exento`}function $(t){return ie(t)?0:N(t.alicuotaIva)}function ne(t){return!!t.cliente&&t.cliente.agenteRetencionIslr}function O(t){return!!t.aplicaIgtf&&!t.cliente?.exentoIgtf}function se(t){return(t??[]).reduce((e,a)=>e+(Number(a?.cantidad)||0)*(Number(a?.precio)||0),0)}function I(t){let e=g(se(t.items)),a=g(e*($(t)/100)),r=O(t)?g((e+a)*(N(t.alicuotaIgtf)/100)):0,o=g(e+a+r),i=oe(t)?g(a*(N(t.cliente?.porcentajeRetencionIva)/100)):0,s=ne(t)?g(e*(N(t.alicuotaIslr)/100)):0;return{subtotal:e,montoIva:a,montoIgtf:r,retencionIva:i,retencionIslr:s,total:o,netoAPagar:g(o-i-s)}}function g(t){return Math.round((Number.isFinite(t)?t:0)*100)/100}function N(t){let e=Number(t);return Number.isFinite(e)?e:0}function ce(t={}){let e=t.ahora??new Date,a=t.numero!=null?p(t.numero):T(t.ultimoNumero??`0000000`);return{codigo:``,numero:a,controlPrefijo:k,numeroControl:a,formato:`FORMATO LIBRE`,estado:`borrador`,fechaEmision:e.toISOString(),fechaTexto:re(e),mes:te(e),alicuotaIva:Q,aplicaIgtf:!1,alicuotaIgtf:Z,alicuotaIslr:W,items:[],cliente:null,emisor:r(r({},B),t.emisor??{}),mostrarFirmaSello:!0,mostrarCabeceraPie:!0,mostrarMarcaAgua:!0,observaciones:``,creadoEn:e.toISOString(),usuario:t.usuario??``}}function h(t){let e=ce();if(!t)return e;let a=Array.isArray(t.items)?t.items.map(o=>({descripcion:String(o?.descripcion??``),cantidad:C(o?.cantidad),precio:C(o?.precio)})):[],r$1=s(r(r({},e),t),{numero:p(t.numero??e.numero),controlPrefijo:t.controlPrefijo||e.controlPrefijo,numeroControl:p(t.numeroControl??t.numero??e.numero),fechaEmision:t.fechaEmision||e.fechaEmision,fechaTexto:t.fechaTexto||e.fechaTexto,mes:t.mes||e.mes,alicuotaIva:C(t.alicuotaIva??e.alicuotaIva),alicuotaIgtf:C(t.alicuotaIgtf??e.alicuotaIgtf),alicuotaIslr:C(t.alicuotaIslr??e.alicuotaIslr),aplicaIgtf:!!t.aplicaIgtf,mostrarFirmaSello:t.mostrarFirmaSello!==!1,mostrarCabeceraPie:t.mostrarCabeceraPie!==!1,mostrarMarcaAgua:t.mostrarMarcaAgua!==!1,items:a,cliente:t.cliente??null,emisor:r(r({},B),t.emisor??{}),observaciones:t.observaciones??``});return r$1.totales=t.totales??I(r$1),r$1}function R(t){return t===`eliminado`}function Y(t){return!t||t===`borrador`}function be(t){return t===`emitida`?`La factura está emitida: su numeración es correlativa y su contenido no admite ediciones.`:t===`anulada`?`La factura está anulada: es un estado terminal y no admite ediciones.`:t===`eliminado`?`La factura está eliminada: ya no aparece en el listado y no admite ediciones.`:``}function q(t){return t===`borrador`||!t?[`emitida`,`eliminado`]:t===`emitida`?[`anulada`,`eliminado`]:[]}function Ie(t){switch(t){case`emitida`:return{etiqueta:`Emitida`,color:`#1565c0`,icono:`receipt_long`};case`anulada`:return{etiqueta:`Anulada`,color:`#c62828`,icono:`block`};case`eliminado`:return{etiqueta:`Eliminada`,color:`#757575`,icono:`delete_outline`};default:return{etiqueta:`Borrador`,color:`#ef6c00`,icono:`edit_note`}}}var Ee=[`borrador`,`emitida`,`anulada`];function ve(t){let e=[];return(!t.numero||!/^\d{7}$/.test(t.numero))&&e.push({campo:`numero`,mensaje:`El número de factura debe tener 7 dígitos.`}),(!t.numeroControl||!/^\d{7}$/.test(t.numeroControl))&&e.push({campo:`numeroControl`,mensaje:`El número de control debe tener 7 dígitos.`}),t.cliente||e.push({campo:`cliente`,mensaje:`Seleccione el cliente al que se factura.`}),t.fechaEmision||e.push({campo:`fechaEmision`,mensaje:`Indique la fecha de emisión.`}),(t.items??[]).length===0&&e.push({campo:`items`,mensaje:`Agregue al menos un renglón a la factura.`}),(t.items??[]).forEach((a,r)=>{a.descripcion?.trim()||e.push({campo:`items.${r}.descripcion`,mensaje:`El rengl\xF3n ${r+1} no tiene descripci\xF3n.`}),a.cantidad>0||e.push({campo:`items.${r}.cantidad`,mensaje:`La cantidad del rengl\xF3n ${r+1} debe ser mayor que cero.`}),a.precio>=0||e.push({campo:`items.${r}.precio`,mensaje:`El precio del rengl\xF3n ${r+1} no puede ser negativo.`})}),I(t).total<=0&&e.push({campo:`items`,mensaje:`El total de la factura debe ser mayor que cero.`}),e}var d={anchoCm:21.7,altoCm:28,margenSuperiorCm:4.5,margenInferiorCm:2.5,margenLateralCm:2};var L=`firmalink-factura-estilos`;var w=`
/* \u2500\u2500 Lienzo de la vista previa \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-lienzo {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1.25rem 0.5rem 2.5rem;
  overflow: auto;
}

/* \u2500\u2500 La hoja 21,7 \xD7 28 cm \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-hoja {
  
  --fx-img-logo: url('assets/factura/emisor.png');
  --fx-img-marca: url('assets/factura/emisor.png');
  --fx-img-firma: url('assets/factura/firma.png');
  --fx-img-sello: url('assets/factura/sello.png');

  position: relative;
  z-index: 0;
  box-sizing: border-box;
  width: ${d.anchoCm}cm;
  min-height: ${d.altoCm}cm;
  padding: ${d.margenSuperiorCm}cm ${d.margenLateralCm}cm ${d.margenInferiorCm}cm;
  background: #fff;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  line-height: 1.35;
  border: 1px solid #000;
  box-shadow: 0 4px 18px rgba(0, 0, 0, .35);
  zoom: var(--fx-escala, 1);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Marca de agua: el logo tenue al centro, detr\xE1s del contenido */
.fx-hoja::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--fx-img-marca) center center / 9cm no-repeat;
  opacity: 0.06;
  z-index: -1;
  pointer-events: none;
}

.fx-hoja.fx-sin-marca::before { display: none; }

/* \u2500\u2500 Cabecera superior (dentro del margen superior de la hoja) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-header-top {
  position: absolute;
  top: 0.8cm;
  left: ${d.margenLateralCm}cm;
  right: ${d.margenLateralCm}cm;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 0.4cm;
}

.fx-header-logo { justify-self: start; }
.fx-header-logo img { width: 2cm; height: auto; }

.fx-header-empresa {
  justify-self: center;
  text-align: center;
  font-size: 11px;
  line-height: 1.35;
}
.fx-header-empresa .fx-empresa-nombre { font-weight: 700; font-size: 12px; }

.fx-header-formato {
  justify-self: end;
  text-align: right;
  font-size: 11px;
  line-height: 1.35;
}
.fx-header-formato .fx-formato { font-weight: 700; }
.fx-header-formato .fx-control-num { font-weight: 700; color: #cc0000; }

/* \u2500\u2500 Datos de la factura y del cliente \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-factura-header { margin-bottom: 1.6cm; }

.fx-header-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1cm;
}
.fx-header-line + .fx-header-line { margin-top: 1mm; }
.fx-header-line .fx-cliente { font-weight: 400; }

.fx-factura-num {
  font-weight: 700;
  white-space: nowrap;
  color: #cc0000;
}

/* \u2500\u2500 Tabla de renglones \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-items {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 10px;
  margin-bottom: 1.2cm;
}

.fx-items th,
.fx-items td {
  border: 1px solid #000;
  padding: 2mm 3mm;
  vertical-align: middle;
}

.fx-items thead th {
  text-align: center;
  font-weight: 700;
  background: #f0f0f0;
}

/* Anchos fijos: deben coincidir con .fx-totales */
.fx-items .fx-col-desc   { text-align: left; white-space: pre-wrap; word-break: break-word; }
.fx-items .fx-col-cant   { width: 2.2cm; text-align: right; white-space: nowrap; }
.fx-items .fx-col-precio { width: 2.8cm; text-align: right; white-space: nowrap; }
.fx-items .fx-col-total  { width: 2.8cm; text-align: right; white-space: nowrap; }
.fx-items td.fx-num { text-align: right; white-space: nowrap; }

.fx-fila-vacia td { text-align: center; font-style: italic; color: #777; }

/* \u2500\u2500 Total y retenciones \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-totales {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 10px;
  margin-top: 1cm;
}

.fx-totales td {
  border: 1px solid #000;
  padding: 2mm 3mm;
  vertical-align: top;
}

.fx-totales .fx-son-cell { text-align: left; }
.fx-totales col.fx-gap    { width: 2.2cm; }
.fx-totales col.fx-label  { width: 2.8cm; }
.fx-totales col.fx-amount { width: 2.8cm; }
.fx-totales td.fx-label   { text-align: right; white-space: nowrap; font-weight: 600; }
.fx-totales td.fx-amount  { text-align: right; white-space: nowrap; font-weight: 600; }
.fx-totales .fx-total-final { font-size: 11px; font-weight: 800; }
.fx-totales .fx-retencion   { font-weight: 400; font-size: 9px; }

.fx-son { text-transform: uppercase; }

/* \u2500\u2500 Firma y sello \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-firma-sello {
  position: relative;
  margin-top: 0.6cm;
  text-align: center;
  line-height: 0;
}
.fx-firma-sello .fx-img-firma { height: 7cm; width: auto; }
.fx-firma-sello .fx-img-sello {
  position: absolute;
  top: 0.5cm;
  right: 1.5cm;
  height: 8cm;
  width: auto;
}

/* \u2500\u2500 Pie de emisor / raz\xF3n social \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-emisor {
  position: absolute;
  left: 1cm;
  right: 1cm;
  bottom: 0.9cm;
  text-align: center;
  font-size: 7.5px;
  line-height: 1.4;
}
.fx-emisor .fx-emisor-linea {
  border-top: 1px dashed #000;
  margin-bottom: 2mm;
}
.fx-emisor .fx-emisor-texto + .fx-emisor-texto { margin-top: 1mm; }
.fx-emisor .fx-original {
  margin-top: 2mm;
  color: #cc0000;
  font-weight: 700;
}

/* Elementos que los botones de la barra pueden ocultar */
.fx-oculto { display: none !important; }

/* \u2500\u2500 Impresi\xF3n \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@page {
  size: ${d.anchoCm}cm ${d.altoCm}cm;
  margin: 0;
}

@media print {
  html, body { background: #fff !important; }

  /* La hoja se imprime sola: se oculta todo lo dem\xE1s sin depender de las
     clases del armaz\xF3n de la aplicaci\xF3n (barra lateral, cabecera, panel). */
  body * { visibility: hidden; }
  .fx-hoja, .fx-hoja * { visibility: visible; }
  .fx-hoja {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    zoom: 1;
    box-shadow: none;
  }

  .fx-items tr,
  .fx-totales tr { page-break-inside: avoid; }
  .fx-items thead { display: table-header-group; }
}
`;function Fe(){if(typeof document>`u`||document.getElementById(L))return;let t=document.createElement(`style`);t.id=L,t.textContent=w,document.head.appendChild(t)}function Ae(){let t=typeof document<`u`?document.getElementById(L):null;t&&t.remove()}function x(t){let e=`assets/${t}`;if(typeof document>`u`)return e;try{return new URL(e,document.baseURI).href}catch{return e}}function ue(){return`
  .fx-hoja {
    --fx-img-logo: url('${x(`factura/emisor.png`)}');
    --fx-img-marca: url('${x(`factura/emisor.png`)}');
    --fx-img-firma: url('${x(`factura/firma.png`)}');
    --fx-img-sello: url('${x(`factura/sello.png`)}');
  }`}function me(t){let e=t.items??[];return e.length===0?`<tr class="fx-fila-vacia"><td colspan="4">Sin renglones registrados.</td></tr>`:e.map(a=>{let r=(Number(a.cantidad)||0)*(Number(a.precio)||0);return`<tr>
        <td class="fx-col-desc">${g$1(a.descripcion)}</td>
        <td class="fx-col-cant fx-num">${g$1(y(a.cantidad))}</td>
        <td class="fx-col-precio fx-num">${g$1(m(a.precio))}</td>
        <td class="fx-col-total fx-num">${g$1(m(r))}</td>
      </tr>`}).join(``)}function de(t){let e=I(t),a=[];return a.push(`<tr>
        <td class="fx-son-cell" colspan="2">Mes: <strong>${g$1(t.mes)}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${g$1(m(e.subtotal))}</td>
      </tr>`),a.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${g$1(H(e.total))}</span></td>
        <td class="fx-label">IVA: ${g$1(F($(t)))}</td>
        <td class="fx-amount">${g$1(m(e.montoIva))}</td>
      </tr>`),O(t)&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IGTF: ${g$1(F(t.alicuotaIgtf))}</td>
        <td class="fx-amount">${g$1(m(e.montoIgtf))}</td>
      </tr>`),a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${g$1(m(e.total))}</td>
      </tr>`),e.retencionIva>0&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. IVA: ${g$1(F(t.cliente?.porcentajeRetencionIva??0))}</td>
        <td class="fx-amount fx-retencion">- ${g$1(m(e.retencionIva))}</td>
      </tr>`),e.retencionIslr>0&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. ISLR: ${g$1(F(t.alicuotaIslr))}</td>
        <td class="fx-amount fx-retencion">- ${g$1(m(e.retencionIslr))}</td>
      </tr>`),(e.retencionIva>0||e.retencionIslr>0)&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Neto a pagar:</td>
        <td class="fx-amount fx-total-final">${g$1(m(e.netoAPagar))}</td>
      </tr>`),a.join(``)}function fe(t){return t.emisor}function pe(t){let e=fe(t),a=t.mostrarCabeceraPie,r=t.mostrarFirmaSello,o=t.mostrarMarcaAgua,i=a?`<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${x(`factura/emisor.png`)}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${g$1(e.nombre)}</div>
        <div>RIF: ${g$1(e.rif)}</div>
        <div>Direccion: ${g$1(e.direccion)}</div>
        <div>Correo: ${g$1(e.correo)} Telefonos: ${g$1(e.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${g$1(t.formato)}</div>
        <div>N&deg; de Control</div>
        <div class="fx-control-num">${g$1(t.controlPrefijo)}${g$1(t.numeroControl)}</div>
      </div>
    </div>`:``,s=r?`<div class="fx-firma-sello">
      <img class="fx-img-firma" src="${x(`factura/firma.png`)}" alt="Firma">
      <img class="fx-img-sello" src="${x(`factura/sello.png`)}" alt="Sello">
    </div>`:``,c=a?`<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        Razon Social: <strong>${g$1(e.razonSocial)}</strong>
        ${g$1(e.razonSocialDireccion)} Telf: ${g$1(e.razonSocialTelefonos)}
        RIF: ${g$1(e.razonSocialRif)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${g$1(e.razonSocialCorreo)} &nbsp;&nbsp; Fecha: ${g$1(e.fechaControl)} &nbsp;&nbsp;
        Control desde N&deg; ${g$1(e.controlDesde)} hasta el N&deg; ${g$1(e.controlHasta)} &nbsp;&nbsp;
        Provindencia N&deg; ${g$1(e.providencia)} &nbsp;&nbsp; ${g$1(e.region)}
      </div>
      <div class="fx-original">ORIGINAL</div>
    </div>`:``;return`<div class="${o?`fx-hoja`:`fx-hoja fx-sin-marca`}">
    ${i}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${g$1(t.cliente?.nombre??``)}</strong></div>
        <div class="fx-factura-num">FACTURA: <span>${g$1(t.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${g$1(t.cliente?.rif??``)}</span></div>
        <div>Fecha de Emision: <span>${g$1(t.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${g$1(t.cliente?.telefono??``)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${g$1(t.cliente?.direccion??``)}</span></div>
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
      <tbody>${me(t)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${de(t)}
    </table>

    ${s}
    ${c}
  </div>`}function ge(t){return`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${g$1(t.numero)}</title>
<style>
${w}
${ue()}

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
${pe(t)}
</body>
</html>`}function Re(t){let e=window.open(``,`_blank`,`width=900,height=1100`);if(!e)return;e.document.open(),e.document.write(ge(t));let a=()=>{e.focus(),e.print()};e.document.close();let r=Array.from(e.document.images??[]);if(r.length===0||r.every(s=>s.complete)){setTimeout(a,120);return}let o=r.length,i=()=>{o-=1,o<=0&&setTimeout(a,120)};r.forEach(s=>{s.addEventListener(`load`,i),s.addEventListener(`error`,i)})}var K=class t$1{constructor(e,a,r,o){this.api=e;this.sha=a;this.notificar=r;this.auth=o}api;sha;notificar;auth;LIST_KEY=`firmalink:facturas:list`;BORRADOR_KEY=`firmalink:factura:borrador`;async guardar(e){let a=new Date().toISOString(),r$2=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario,o=s(r({},e),{codigo:e.codigo||await this.siguienteCodigo(),numero:p(e.numero),numeroControl:p(e.numeroControl),creadoEn:e.creadoEn??a,actualizadoEn:a,usuario:e.usuario||r$2?.cedula||``});o.totales=I(o),(o.estado===`emitida`||!o.huella)&&(o.huella=await this.huella(o));let E=o,{_id:i}=E,s$1=t(E,[`_id`]),c={coleccion:P.colecciones.FACTURA,objeto:s$1,donde:JSON.stringify({codigo:o.codigo}),driver:P.driver.PRINCIPAL,upsert:!0};try{return await bh(this.api.ExecColeccion(c)),this.fusionarEnCache(o),o}catch(G){return this.notificar.error(`No se pudo guardar la factura`,`La factura ${o.numero} qued\xF3 solo en este navegador (${n.detalle(G)}).`),null}}async huella(e){let a=JSON.stringify({numero:e.numero,control:e.controlPrefijo+e.numeroControl,fecha:e.fechaEmision,mes:e.mes,cliente:e.cliente?.codigo??``,rif:e.cliente?.rif??``,items:e.items,alicuotas:[e.alicuotaIva,e.aplicaIgtf?e.alicuotaIgtf:0,e.alicuotaIslr]});return this.sha.hash(a)}async listar(e=!1){let a=await this.consultarServidor();return e?a:a.filter(r=>!R(r.estado))}async listarPorCliente(e,a=!1){if(!e)return this.listar(a);let r=P.functions?.CONSULTAR_FACTURAS_CLIENTE,i=await this.consultarServidorRemoto(r,e,`las facturas de ${e}`,!1)??this.leerCacheLocal().filter(s=>s.cliente?.codigo===e);return a?i:i.filter(s=>!R(s.estado))}async obtener(e){if(!e)return null;let a=P.functions?.CONSULTAR_FACTURA;if(a)try{let i=await bh(this.api.Ejecutar({funcion:a,parametros:e})),s=this.desempaquetar(i);if(s&&!Array.isArray(s)&&s.tipo!==void 0)this.notificar.aviso(`No se pudo leer la factura`,`El servidor respondi\xF3: ${s.msj??`sin detalle`}. Se intentar\xE1 con la copia local del listado.`);else if(Array.isArray(s)){let c=s[0]??null;if(c)return h(c)}else if(s&&typeof s==`object`)return h(s)}catch(i){this.notificar.aviso(`No se pudo leer la factura desde el servidor`,`Error de comunicaci\xF3n (${n.detalle(i)}). Se intentar\xE1 con la copia local.`)}let r=this.leerCacheLocal().find(i=>i.codigo===e);if(r)return h(r);let o=this.leerBorradorLocal();return o&&o.codigo===e?o:null}async siguienteNumero(){let e=await this.listar(!0),a=this.leerBorradorLocal(),r=0;for(let o of e){let i=parseInt(String(o.numero).replace(/\D/g,``)||`0`,10);i>r&&(r=i)}if(a){let o=parseInt(String(a.numero).replace(/\D/g,``)||`0`,10);o>r&&(r=o)}return T(r)}async siguienteCodigo(){let e=await this.listar(!0),a=0;for(let r of e){let o=parseInt(String(r.codigo).replace(/\D/g,``)||`0`,10);o>a&&(a=o)}return J(a+1)}async cambiarEstado(e,a,r$3){if(!e)return!1;if(r$3&&!q(r$3).includes(a))return this.notificar.error(`Cambio de estado no permitido`,r$3===`emitida`?`La factura ${e} est\xE1 emitida y solo puede anularse.`:`La factura ${e} est\xE1 anulada y no admite m\xE1s cambios de estado.`),!1;let o=new Date().toISOString(),i={coleccion:P.colecciones.FACTURA,objeto:{estado:a,actualizadoEn:o},donde:JSON.stringify({codigo:e}),driver:P.driver.PRINCIPAL,upsert:!0};try{await bh(this.api.ExecColeccion(i));let s$2=this.leerCacheLocal().map(c=>c.codigo===e?s(r({},c),{estado:a,actualizadoEn:o}):c);return this.guardarCacheLocal(s$2),!0}catch(s){return this.notificar.error(`No se pudo cambiar el estado`,`La factura ${e} conserva su estado anterior (${n.detalle(s)}).`),!1}}async eliminar(e,a){if(!e)return!1;if(a===`emitida`)return this.notificar.error(`Factura emitida: no se puede eliminar`,`La factura ${e} ya fue emitida y su numeraci\xF3n est\xE1 declarada. Si ya no tiene efecto, an\xFAlela.`),!1;let r=new Date().toISOString(),o=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario,i={coleccion:P.colecciones.FACTURA,objeto:{estado:`eliminado`,eliminadoEn:r,eliminadoPorCedula:o?.cedula??``,eliminadoPorNombre:o?.nombre??``,actualizadoEn:r},donde:JSON.stringify({codigo:e}),driver:P.driver.PRINCIPAL,upsert:!0};try{return await bh(this.api.ExecColeccion(i)),this.guardarCacheLocal(this.leerCacheLocal().filter(s=>s.codigo!==e)),!0}catch(s){return this.notificar.error(`No se pudo eliminar la factura`,`La factura ${e} sigue en el listado (${n.detalle(s)}).`),!1}}copiaDesactualizada(e){return!!e.cliente&&!Y(e.estado)&&!!e.cliente.copiadoEn}EDITAR_KEY=`firmalink:factura:editar`;marcarParaEditar(e){try{e?sessionStorage.setItem(this.EDITAR_KEY,e):sessionStorage.removeItem(this.EDITAR_KEY)}catch{}}tomarPendienteEdicion(){try{let e=sessionStorage.getItem(this.EDITAR_KEY);return e&&sessionStorage.removeItem(this.EDITAR_KEY),e}catch{return null}}async consultarServidor(){return await this.consultarServidorRemoto(P.functions?.CONSULTAR_FACTURAS,``,`el listado de facturas`,!0)??this.leerCacheLocal()}async consultarServidorRemoto(e,a,r,o){if(!e)return null;try{let i=await bh(this.api.Ejecutar({funcion:e,parametros:a})),s=this.desempaquetar(i);if(s&&!Array.isArray(s)&&s.tipo!==void 0)return this.notificar.aviso(`No se pudo consultar ${r}`,`El servidor respondi\xF3: ${s.msj??`sin detalle`}.`+(o?` La numeración se calcula con la lista local de este navegador.`:``)),null;if(Array.isArray(s)){let c=s.map(E=>h(E));return o&&this.guardarCacheLocal(c),c}this.notificar.aviso(`Respuesta inesperada al consultar ${r}`,`La funci\xF3n ${e} no devolvi\xF3 una lista.`)}catch(i){console.warn(`[FacturaService] Fall\xF3 la consulta de ${r}; se usa la copia local.`,i),this.notificar.aviso(`No se pudo consultar ${r}`,`Error de comunicaci\xF3n con el servidor (${n.detalle(i)}).`+(o?` La numeración se calcula con la lista local de este navegador.`:``))}return null}desempaquetar(e){let a=e?.Cuerpo!==void 0?e.Cuerpo:e;if(typeof a==`string`)try{a=JSON.parse(a)}catch{a=[]}return a}guardarCacheLocal(e){try{localStorage.setItem(this.LIST_KEY,JSON.stringify(e))}catch{}}leerCacheLocal(){try{let e=localStorage.getItem(this.LIST_KEY);if(!e)return[];let a=JSON.parse(e);return Array.isArray(a)?a.map(r=>h(r)):[]}catch{return[]}}fusionarEnCache(e){let a=this.leerCacheLocal(),r=a.findIndex(o=>o.codigo===e.codigo);r>=0?a[r]=e:a.push(e),this.guardarCacheLocal(a)}guardarBorradorLocal(e){try{localStorage.setItem(this.BORRADOR_KEY,JSON.stringify(e))}catch{}}leerBorradorLocal(){try{let e=localStorage.getItem(this.BORRADOR_KEY);return e?h(JSON.parse(e)):null}catch{return null}}descartarBorradorLocal(){try{localStorage.removeItem(this.BORRADOR_KEY)}catch{}}static ɵfac=function(a){return new(a||t$1)(Me(I$1),Me(O$1),Me(n),Me(R$1))};static ɵprov=ae$1({token:t$1,factory:t$1.ɵfac,providedIn:`root`})};export{w as C,ve as S,y as T,m as _,F as a,re as b,Ie as c,Y as d,be as f,ie as g,he as h,Ee as i,K as l,d as m,Ae as n,Fe as o,ce as p,C as r,I as s,$ as t,Re as u,p as v,xe as w,te as x,pe as y};