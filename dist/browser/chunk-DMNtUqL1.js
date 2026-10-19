import{n as s$1,t as r}from"./chunk-C9yOwMO6.js";import{t as g$1}from"./chunk-CP0TiItl.js";var A={nombre:`BUNKER TECHNOLOGIES SOLUTIONS, C.A`,rif:`J- 50561969-1`,direccion:`Av Fuerte Tiuna, Edif. D06, Piso 6, Apto B6, Sector Los Constituyentistas`,correo:`bunkertechs@gmail.com`,telefonos:`0412-2602101 / 0412-6553516 / 0412-9967096`,razonSocial:`Libreria y Papeleria Dimargi, C.A`,razonSocialDireccion:`Av.Bolivar Edf. Nevic, Local 5 Los Teques - Edo Miranda`,razonSocialTelefonos:`0426-9110914 / 04143219896`,razonSocialRif:`J-00216902-8`,razonSocialCorreo:`libreriadimargi@gmail.com`,fechaControl:`01-09-2026`,controlDesde:`00-00000101`,controlHasta:`00-00000200`,providencia:`SENIAT/01/01043 de fecha 08-10-2008`,region:`Region Capital`};var D=16;var j=3;var L=5;var O=`00-`;function f(e){let t=String(e??``).trim();if(!t)return 0;t.includes(`.`)&&t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):t.includes(`,`)&&(t=t.replace(`,`,`.`));let a=parseFloat(t);return isNaN(a)?0:a}function s(e){let t=Number.isFinite(e)?e:0,a=t<0,[r,n]=Math.abs(t).toFixed(2).split(`.`),i=r.replace(/\B(?=(\d{3})+(?!\d))/g,`.`);return(a?`-`:``)+i+`,`+n}function E(e){let a=Math.round((Number.isFinite(e)?e:0)*1e3)/1e3,[r,n]=String(a).split(`.`),i=r.replace(/\B(?=(\d{3})+(?!\d))/g,`.`);return n?i+`,`+n:i}function p(e){return E(e)+`%`}var N=[`CERO`,`UNO`,`DOS`,`TRES`,`CUATRO`,`CINCO`,`SEIS`,`SIETE`,`OCHO`,`NUEVE`,`DIEZ`,`ONCE`,`DOCE`,`TRECE`,`CATORCE`,`QUINCE`,`DIECISEIS`,`DIECISIETE`,`DIECIOCHO`,`DIECINUEVE`,`VEINTE`,`VEINTIUNO`,`VEINTIDOS`,`VEINTITRES`,`VEINTICUATRO`,`VEINTICINCO`,`VEINTISEIS`,`VEINTISIETE`,`VEINTIOCHO`,`VEINTINUEVE`];var z=[``,`DIEZ`,`VEINTE`,`TREINTA`,`CUARENTA`,`CINCUENTA`,`SESENTA`,`SETENTA`,`OCHENTA`,`NOVENTA`];var M=[``,`CIENTO`,`DOSCIENTOS`,`TRESCIENTOS`,`CUATROCIENTOS`,`QUINIENTOS`,`SEISCIENTOS`,`SETECIENTOS`,`OCHOCIENTOS`,`NOVECIENTOS`];var w=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];function x(e){if(e===0)return`CERO`;if(e===100)return`CIEN`;let t=Math.floor(e/100),a=e%100,r=t>0?M[t]+` `:``;if(a>0)if(a<30)r+=N[a];else{let n=Math.floor(a/10),i=a%10;r+=z[n],i>0&&(r+=` Y `+N[i])}return r.trim()}function $(e){if(e===0)return`CERO`;let t=Math.floor(e/0xe8d4a51000),a=Math.floor(e%0xe8d4a51000/1e6),r=Math.floor(e%1e6/1e3),n=e%1e3,i=``;return t>0&&(i+=t===1?`UN BILLON `:x(t)+` BILLONES `),a>0&&(i+=a===1?`UN MILLON `:x(a)+` MILLONES `),r>0&&(i+=r===1?`MIL `:x(r)+` MIL `),n>0&&(i+=x(n)),i.trim()}function y(e){let a=Math.abs(Number.isFinite(e)?e:0).toFixed(2).split(`.`),r=parseInt(a[0],10),n=parseInt(a[1],10),i=$(r);return i+=r===1?` BOLIVAR`:` BOLIVARES`,i+=` CON `+(n>0?$(n):`CERO`),i+=n===1?` CENTIMO`:` CENTIMOS`,i.replace(/\bUNO\b/g,`UN`)}function P(e=new Date){return`${w[e.getMonth()]} ${e.getFullYear()}`}function I(e){return String(e).padStart(2,`0`)}function U(e,t=`Caracas`){return`${t} ${I(e.getDate())}/${w[e.getMonth()]}/${e.getFullYear()}`}function ee(e){return`${I(e.getDate())}/${I(e.getMonth()+1)}/${e.getFullYear()}`}function g(e){return(String(e??``).replace(/\D/g,``)||`0`).slice(-7).padStart(7,`0`)}function te(e,t){return`${e||O}${g(t)}`}function V(e){let t=parseInt(String(e??``).replace(/\D/g,``)||`0`,10);return g(Number.isFinite(t)?t+1:1)}function ae(e){return`FAC-`+String(Math.max(1,Math.trunc(e))).padStart(6,`0`)}function oe(e,t){let a=parseInt(String(t).replace(/\D/g,``)||`0`,10),r=parseInt(String(e.controlDesde).replace(/\D/g,``)||`0`,10),n=parseInt(String(e.controlHasta).replace(/\D/g,``)||`0`,10);return a>=r&&a<=n}function k(e){let t=e.cliente;return!!t&&t.agenteRetencionIva&&t.porcentajeRetencionIva>0}function q(e){return e.cliente?.condicionFiscal===`exento`}function v(e){return q(e)?0:h(e.alicuotaIva)}function _(e){return!!e.cliente&&e.cliente.agenteRetencionIslr}function C(e){return!!e.aplicaIgtf&&!e.cliente?.exentoIgtf}function B(e){return(e??[]).reduce((t,a)=>t+(Number(a?.cantidad)||0)*(Number(a?.precio)||0),0)}function b(e){let t=u(B(e.items)),a=u(t*(v(e)/100)),r=C(e)?u((t+a)*(h(e.alicuotaIgtf)/100)):0,n=u(t+a+r),i=k(e)?u(a*(h(e.cliente?.porcentajeRetencionIva)/100)):0,l=_(e)?u(t*(h(e.alicuotaIslr)/100)):0;return{subtotal:t,montoIva:a,montoIgtf:r,retencionIva:i,retencionIslr:l,total:n,netoAPagar:u(n-i-l)}}function u(e){return Math.round((Number.isFinite(e)?e:0)*100)/100}function h(e){let t=Number(e);return Number.isFinite(t)?t:0}function H(e={}){let t=e.ahora??new Date,a=e.numero!=null?g(e.numero):V(e.ultimoNumero??`0000000`);return{codigo:``,numero:a,controlPrefijo:O,numeroControl:a,formato:`FORMATO LIBRE`,estado:`borrador`,fechaEmision:t.toISOString(),fechaTexto:U(t),mes:P(t),alicuotaIva:D,aplicaIgtf:!1,alicuotaIgtf:j,alicuotaIslr:L,items:[],cliente:null,emisor:r(r({},A),e.emisor??{}),mostrarFirmaSello:!0,mostrarCabeceraPie:!0,mostrarMarcaAgua:!0,observaciones:``,creadoEn:t.toISOString(),usuario:e.usuario??``}}function re(e){let t=H();if(!e)return t;let a=Array.isArray(e.items)?e.items.map(n=>({descripcion:String(n?.descripcion??``),cantidad:f(n?.cantidad),precio:f(n?.precio)})):[],r$1=s$1(r(r({},t),e),{numero:g(e.numero??t.numero),controlPrefijo:e.controlPrefijo||t.controlPrefijo,numeroControl:g(e.numeroControl??e.numero??t.numero),fechaEmision:e.fechaEmision||t.fechaEmision,fechaTexto:e.fechaTexto||t.fechaTexto,mes:e.mes||t.mes,alicuotaIva:f(e.alicuotaIva??t.alicuotaIva),alicuotaIgtf:f(e.alicuotaIgtf??t.alicuotaIgtf),alicuotaIslr:f(e.alicuotaIslr??t.alicuotaIslr),aplicaIgtf:!!e.aplicaIgtf,mostrarFirmaSello:e.mostrarFirmaSello!==!1,mostrarCabeceraPie:e.mostrarCabeceraPie!==!1,mostrarMarcaAgua:e.mostrarMarcaAgua!==!1,items:a,cliente:e.cliente??null,emisor:r(r({},A),e.emisor??{}),observaciones:e.observaciones??``});return r$1.totales=e.totales??b(r$1),r$1}function ne(e){return e===`eliminado`}function ie(e){return!e||e===`borrador`}function se(e){return e===`emitida`?`La factura está emitida: su numeración es correlativa y su contenido no admite ediciones.`:e===`anulada`?`La factura está anulada: es un estado terminal y no admite ediciones.`:e===`eliminado`?`La factura está eliminada: ya no aparece en el listado y no admite ediciones.`:``}function ce(e){return e===`borrador`||!e?[`emitida`,`eliminado`]:e===`emitida`?[`anulada`,`eliminado`]:[]}function le(e){switch(e){case`emitida`:return{etiqueta:`Emitida`,color:`#1565c0`,icono:`receipt_long`};case`anulada`:return{etiqueta:`Anulada`,color:`#c62828`,icono:`block`};case`eliminado`:return{etiqueta:`Eliminada`,color:`#757575`,icono:`delete_outline`};default:return{etiqueta:`Borrador`,color:`#ef6c00`,icono:`edit_note`}}}var me=[`borrador`,`emitida`,`anulada`];function ue(e){let t=[];return(!e.numero||!/^\d{7}$/.test(e.numero))&&t.push({campo:`numero`,mensaje:`El número de factura debe tener 7 dígitos.`}),(!e.numeroControl||!/^\d{7}$/.test(e.numeroControl))&&t.push({campo:`numeroControl`,mensaje:`El número de control debe tener 7 dígitos.`}),e.cliente||t.push({campo:`cliente`,mensaje:`Seleccione el cliente al que se factura.`}),e.fechaEmision||t.push({campo:`fechaEmision`,mensaje:`Indique la fecha de emisión.`}),(e.items??[]).length===0&&t.push({campo:`items`,mensaje:`Agregue al menos un renglón a la factura.`}),(e.items??[]).forEach((a,r)=>{a.descripcion?.trim()||t.push({campo:`items.${r}.descripcion`,mensaje:`El rengl\xF3n ${r+1} no tiene descripci\xF3n.`}),a.cantidad>0||t.push({campo:`items.${r}.cantidad`,mensaje:`La cantidad del rengl\xF3n ${r+1} debe ser mayor que cero.`}),a.precio>=0||t.push({campo:`items.${r}.precio`,mensaje:`El precio del rengl\xF3n ${r+1} no puede ser negativo.`})}),b(e).total<=0&&t.push({campo:`items`,mensaje:`El total de la factura debe ser mayor que cero.`}),t}var c={anchoCm:21.7,altoCm:28,margenSuperiorCm:4.5,margenInferiorCm:2.5,margenLateralCm:2};var F=`firmalink-factura-estilos`;var S=`
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
  width: ${c.anchoCm}cm;
  min-height: ${c.altoCm}cm;
  padding: ${c.margenSuperiorCm}cm ${c.margenLateralCm}cm ${c.margenInferiorCm}cm;
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
  left: ${c.margenLateralCm}cm;
  right: ${c.margenLateralCm}cm;
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

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   PRESUPUESTO
   La hoja es la misma (21,7 \xD7 28 cm, mismos m\xE1rgenes y misma tabla de
   renglones): lo que cambia es lo que un presupuesto a\xF1ade a una factura.
   Estas reglas viven aqu\xED \u2014y no en un archivo aparte\u2014 para que exista una
   sola definici\xF3n de la hoja y el formato no pueda divergir.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* N\xB0 del documento en la cabecera: el presupuesto no tiene N\xB0 de Control,
   as\xED que su n\xFAmero ocupa el mismo lugar y con el mismo \xE9nfasis. */
.fx-doc-num { font-weight: 700; color: #cc0000; }

/* \u2500\u2500 Condiciones comerciales \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-condiciones {
  margin-top: 1cm;
  padding: 2mm 3mm;
  border: 1px solid #000;
  font-size: 9.5px;
  line-height: 1.5;
}

.fx-condiciones-titulo {
  margin-bottom: 1.5mm;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .02em;
}

.fx-cond-linea + .fx-cond-linea { margin-top: 0.6mm; }
.fx-cond-etiqueta { font-weight: 600; }

/* \u2500\u2500 Firma del emisor y aceptaci\xF3n del cliente \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-firmas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1cm;
  margin-top: 0.6cm;
}

.fx-firma-col {
  position: relative;
  text-align: center;
  line-height: 0;
}

.fx-firma-col .fx-img-firma { height: 3.6cm; width: auto; }
.fx-firma-col .fx-img-sello {
  position: absolute;
  top: 0.1cm;
  right: 0.4cm;
  height: 4.2cm;
  width: auto;
}

.fx-firma-linea {
  margin-top: 0.4cm;
  border-top: 1px solid #000;
  line-height: 1.35;
}

/* La columna del cliente no lleva imagen: la l\xEDnea deja el hueco de la firma
   manuscrita, que es lo que el cliente firma y devuelve. */
.fx-firma-col.fx-sin-imagen .fx-firma-linea { margin-top: 4.2cm; }

.fx-firma-pie { font-size: 8px; line-height: 1.35; }

/* \u2500\u2500 Nota de documento no fiscal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fx-no-fiscal {
  margin-top: 2mm;
  color: #cc0000;
  font-weight: 700;
}

/* \u2500\u2500 Impresi\xF3n \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@page {
  size: ${c.anchoCm}cm ${c.altoCm}cm;
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
`;function ge(){if(typeof document>`u`||document.getElementById(F))return;let e=document.createElement(`style`);e.id=F,e.textContent=S,document.head.appendChild(e)}function pe(){let e=typeof document<`u`?document.getElementById(F):null;e&&e.remove()}function d(e){let t=`assets/${e}`;if(typeof document>`u`)return t;try{return new URL(t,document.baseURI).href}catch{return t}}function G(){return`
  .fx-hoja {
    --fx-img-logo: url('${d(`factura/emisor.png`)}');
    --fx-img-marca: url('${d(`factura/emisor.png`)}');
    --fx-img-firma: url('${d(`factura/firma.png`)}');
    --fx-img-sello: url('${d(`factura/sello.png`)}');
  }`}function Y(e){let t=e.items??[];return t.length===0?`<tr class="fx-fila-vacia"><td colspan="4">Sin renglones registrados.</td></tr>`:t.map(a=>{let r=(Number(a.cantidad)||0)*(Number(a.precio)||0);return`<tr>
        <td class="fx-col-desc">${g$1(a.descripcion)}</td>
        <td class="fx-col-cant fx-num">${g$1(E(a.cantidad))}</td>
        <td class="fx-col-precio fx-num">${g$1(s(a.precio))}</td>
        <td class="fx-col-total fx-num">${g$1(s(r))}</td>
      </tr>`}).join(``)}function Q(e){let t=b(e),a=[];return a.push(`<tr>
        <td class="fx-son-cell" colspan="2">Mes: <strong>${g$1(e.mes)}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${g$1(s(t.subtotal))}</td>
      </tr>`),a.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${g$1(y(t.total))}</span></td>
        <td class="fx-label">IVA: ${g$1(p(v(e)))}</td>
        <td class="fx-amount">${g$1(s(t.montoIva))}</td>
      </tr>`),C(e)&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IGTF: ${g$1(p(e.alicuotaIgtf))}</td>
        <td class="fx-amount">${g$1(s(t.montoIgtf))}</td>
      </tr>`),a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${g$1(s(t.total))}</td>
      </tr>`),t.retencionIva>0&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. IVA: ${g$1(p(e.cliente?.porcentajeRetencionIva??0))}</td>
        <td class="fx-amount fx-retencion">- ${g$1(s(t.retencionIva))}</td>
      </tr>`),t.retencionIslr>0&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. ISLR: ${g$1(p(e.alicuotaIslr))}</td>
        <td class="fx-amount fx-retencion">- ${g$1(s(t.retencionIslr))}</td>
      </tr>`),(t.retencionIva>0||t.retencionIslr>0)&&a.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Neto a pagar:</td>
        <td class="fx-amount fx-total-final">${g$1(s(t.netoAPagar))}</td>
      </tr>`),a.join(``)}function Z(e){return e.emisor}function K(e){let t=Z(e),a=e.mostrarCabeceraPie,r=e.mostrarFirmaSello,n=e.mostrarMarcaAgua,i=a?`<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${d(`factura/emisor.png`)}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${g$1(t.nombre)}</div>
        <div>RIF: ${g$1(t.rif)}</div>
        <div>Direccion: ${g$1(t.direccion)}</div>
        <div>Correo: ${g$1(t.correo)} Telefonos: ${g$1(t.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${g$1(e.formato)}</div>
        <div>N&deg; de Control</div>
        <div class="fx-control-num">${g$1(e.controlPrefijo)}${g$1(e.numeroControl)}</div>
      </div>
    </div>`:``,l=r?`<div class="fx-firma-sello">
      <img class="fx-img-firma" src="${d(`factura/firma.png`)}" alt="Firma">
      <img class="fx-img-sello" src="${d(`factura/sello.png`)}" alt="Sello">
    </div>`:``,R=a?`<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        Razon Social: <strong>${g$1(t.razonSocial)}</strong>
        ${g$1(t.razonSocialDireccion)} Telf: ${g$1(t.razonSocialTelefonos)}
        RIF: ${g$1(t.razonSocialRif)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${g$1(t.razonSocialCorreo)} &nbsp;&nbsp; Fecha: ${g$1(t.fechaControl)} &nbsp;&nbsp;
        Control desde N&deg; ${g$1(t.controlDesde)} hasta el N&deg; ${g$1(t.controlHasta)} &nbsp;&nbsp;
        Provindencia N&deg; ${g$1(t.providencia)} &nbsp;&nbsp; ${g$1(t.region)}
      </div>
      <div class="fx-original">ORIGINAL</div>
    </div>`:``;return`<div class="${n?`fx-hoja`:`fx-hoja fx-sin-marca`}">
    ${i}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${g$1(e.cliente?.nombre??``)}</strong></div>
        <div class="fx-factura-num">FACTURA: <span>${g$1(e.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${g$1(e.cliente?.rif??``)}</span></div>
        <div>Fecha de Emision: <span>${g$1(e.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${g$1(e.cliente?.telefono??``)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${g$1(e.cliente?.direccion??``)}</span></div>
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
      <tbody>${Y(e)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${Q(e)}
    </table>

    ${l}
    ${R}
  </div>`}function W(e){return`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${g$1(e.numero)}</title>
<style>
${S}
${G()}

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
${K(e)}
</body>
</html>`}function ve(e){let t=window.open(``,`_blank`,`width=900,height=1100`);if(!t)return;t.document.open(),t.document.write(W(e));let a=()=>{t.focus(),t.print()};t.document.close();let r=Array.from(t.document.images??[]);if(r.length===0||r.every(l=>l.complete)){setTimeout(a,120);return}let n=r.length,i=()=>{n-=1,n<=0&&setTimeout(a,120)};r.forEach(l=>{l.addEventListener(`load`,i),l.addEventListener(`error`,i)})}export{te as A,oe as C,re as D,q as E,y as F,ue as M,v as N,s as O,ve as P,ne as S,pe as T,g as _,K as a,le as b,U as c,b as d,c as f,f as g,ee as h,H as i,u as j,se as k,V as l,d as m,B as n,P as o,ce as p,E as r,S as s,A as t,ae as u,ge as v,p as w,me as x,ie as y};