import{n as s,t as r}from"./chunk-C9yOwMO6.js";import{At as Rn,B as Dr,Dn as hr,Dt as Ql,Et as Q$1,F as Be,Gn as p0,H as Eg,J as Fc,Kn as pE,L as Bo,M as Ap,Mn as ja,Mt as S$1,On as iD,Ot as Qm,Pt as T,Qn as sg,W as Er,Wn as or,X as Fp,Zn as sD,_t as Ne,ar as uv,at as Ie,br as yp,ct as Jh,fn as bp,pt as Ln,st as Ip,wn as gE,xn as en,yr as yi,zt as Up}from"./main-4TJD7ILE.js";import{B as tt$1,D as bo,F as qt$1,P as nn,S as Yn,_ as Tn,d as Kt,k as et$1,m as On,o as Cn,t as $n,w as _$1}from"./chunk-D1OpZURi.js";import{C as ht$1,S as fe$1,_ as _t$1,a as Ht$1,c as J,d as Pe,g as Z,i as Hi,r as G$1,t as De,u as K,v as be}from"./chunk-BMnLpOpi.js";import{H as yo}from"./chunk-Coys_j8o.js";var Ue={nombre:`BUNKER TECHNOLOGIES SOLUTIONS, C.A`,rif:`J- 50561969-1`,direccion:`Av Fuerte Tiuna, Edif. D06, Piso 6, Apto B6, Sector Los Constituyentistas`,correo:`bunkertechs@gmail.com`,telefonos:`0412-2602101 / 0412-6553516 / 0412-9967096`,razonSocial:`Libreria y Papeleria Dimargi, C.A`,razonSocialDireccion:`Av.Bolivar Edf. Nevic, Local 5 Los Teques - Edo Miranda`,razonSocialTelefonos:`0426-9110914 / 04143219896`,razonSocialRif:`J-00216902-8`,razonSocialCorreo:`libreriadimargi@gmail.com`,fechaControl:`01-09-2026`,controlDesde:`00-00000101`,controlHasta:`00-00000200`,providencia:`SENIAT/01/01043 de fecha 08-10-2008`,region:`Region Capital`};var et=16;var tt=3;var it=5;var qe=`00-`;function E(e){let i=String(e??``).trim();if(!i)return 0;i.includes(`.`)&&i.includes(`,`)?i=i.replace(/\./g,``).replace(`,`,`.`):i.includes(`,`)&&(i=i.replace(`,`,`.`));let t=parseFloat(i);return isNaN(t)?0:t}function u(e){let i=Number.isFinite(e)?e:0,t=i<0,[a,n]=Math.abs(i).toFixed(2).split(`.`),o=a.replace(/\B(?=(\d{3})+(?!\d))/g,`.`);return(t?`-`:``)+o+`,`+n}function ne(e){let t=Math.round((Number.isFinite(e)?e:0)*1e3)/1e3,[a,n]=String(t).split(`.`),o=a.replace(/\B(?=(\d{3})+(?!\d))/g,`.`);return n?o+`,`+n:o}function S(e){return ne(e)+`%`}var Ve=[`CERO`,`UNO`,`DOS`,`TRES`,`CUATRO`,`CINCO`,`SEIS`,`SIETE`,`OCHO`,`NUEVE`,`DIEZ`,`ONCE`,`DOCE`,`TRECE`,`CATORCE`,`QUINCE`,`DIECISEIS`,`DIECISIETE`,`DIECIOCHO`,`DIECINUEVE`,`VEINTE`,`VEINTIUNO`,`VEINTIDOS`,`VEINTITRES`,`VEINTICUATRO`,`VEINTICINCO`,`VEINTISEIS`,`VEINTISIETE`,`VEINTIOCHO`,`VEINTINUEVE`];var at=[``,`DIEZ`,`VEINTE`,`TREINTA`,`CUARENTA`,`CINCUENTA`,`SESENTA`,`SETENTA`,`OCHENTA`,`NOVENTA`];var nt=[``,`CIENTO`,`DOSCIENTOS`,`TRESCIENTOS`,`CUATROCIENTOS`,`QUINIENTOS`,`SEISCIENTOS`,`SETECIENTOS`,`OCHOCIENTOS`,`NOVECIENTOS`];var Ge=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];function q(e){if(e===0)return`CERO`;if(e===100)return`CIEN`;let i=Math.floor(e/100),t=e%100,a=i>0?nt[i]+` `:``;if(t>0)if(t<30)a+=Ve[t];else{let n=Math.floor(t/10),o=t%10;a+=at[n],o>0&&(a+=` Y `+Ve[o])}return a.trim()}function He(e){if(e===0)return`CERO`;let i=Math.floor(e/0xe8d4a51000),t=Math.floor(e%0xe8d4a51000/1e6),a=Math.floor(e%1e6/1e3),n=e%1e3,o=``;return i>0&&(o+=i===1?`UN BILLON `:q(i)+` BILLONES `),t>0&&(o+=t===1?`UN MILLON `:q(t)+` MILLONES `),a>0&&(o+=a===1?`MIL `:q(a)+` MIL `),n>0&&(o+=q(n)),o.trim()}function We(e){let t=Math.abs(Number.isFinite(e)?e:0).toFixed(2).split(`.`),a=parseInt(t[0],10),n=parseInt(t[1],10),o=He(a);return o+=a===1?` BOLIVAR`:` BOLIVARES`,o+=` CON `+(n>0?He(n):`CERO`),o+=n===1?` CENTIMO`:` CENTIMOS`,o.replace(/\bUNO\b/g,`UN`)}function ot(e=new Date){return`${Ge[e.getMonth()]} ${e.getFullYear()}`}function ae(e){return String(e).padStart(2,`0`)}function rt(e,i=`Caracas`){return`${i} ${ae(e.getDate())}/${Ge[e.getMonth()]}/${e.getFullYear()}`}function kt(e){return`${ae(e.getDate())}/${ae(e.getMonth()+1)}/${e.getFullYear()}`}function A(e){return(String(e??``).replace(/\D/g,``)||`0`).slice(-7).padStart(7,`0`)}function Pt(e,i){return`${e||qe}${A(i)}`}function st(e){let i=parseInt(String(e??``).replace(/\D/g,``)||`0`,10);return A(Number.isFinite(i)?i+1:1)}function Mt(e){return`FAC-`+String(Math.max(1,Math.trunc(e))).padStart(6,`0`)}function jt(e,i){let t=parseInt(String(i).replace(/\D/g,``)||`0`,10),a=parseInt(String(e.controlDesde).replace(/\D/g,``)||`0`,10),n=parseInt(String(e.controlHasta).replace(/\D/g,``)||`0`,10);return t>=a&&t<=n}function lt(e){let i=e.cliente;return!!i&&i.agenteRetencionIva&&i.porcentajeRetencionIva>0}function ct(e){return e.cliente?.condicionFiscal===`exento`}function oe(e){return ct(e)?0:G(e.alicuotaIva)}function dt(e){return!!e.cliente&&e.cliente.agenteRetencionIslr}function re(e){return!!e.aplicaIgtf&&!e.cliente?.exentoIgtf}function mt(e){return(e??[]).reduce((i,t)=>i+(Number(t?.cantidad)||0)*(Number(t?.precio)||0),0)}function W(e){let i=_(mt(e.items)),t=_(i*(oe(e)/100)),a=re(e)?_((i+t)*(G(e.alicuotaIgtf)/100)):0,n=_(i+t+a),o=lt(e)?_(t*(G(e.cliente?.porcentajeRetencionIva)/100)):0,s=dt(e)?_(i*(G(e.alicuotaIslr)/100)):0;return{subtotal:i,montoIva:t,montoIgtf:a,retencionIva:o,retencionIslr:s,total:n,netoAPagar:_(n-o-s)}}function _(e){return Math.round((Number.isFinite(e)?e:0)*100)/100}function G(e){let i=Number(e);return Number.isFinite(i)?i:0}function ut(e={}){let i=e.ahora??new Date,t=e.numero!=null?A(e.numero):st(e.ultimoNumero??`0000000`);return{codigo:``,numero:t,controlPrefijo:qe,numeroControl:t,formato:`FORMATO LIBRE`,estado:`borrador`,fechaEmision:i.toISOString(),fechaTexto:rt(i),mes:ot(i),alicuotaIva:et,aplicaIgtf:!1,alicuotaIgtf:tt,alicuotaIslr:it,items:[],cliente:null,emisor:r(r({},Ue),e.emisor??{}),mostrarFirmaSello:!0,mostrarCabeceraPie:!0,mostrarMarcaAgua:!0,observaciones:``,creadoEn:i.toISOString(),usuario:e.usuario??``}}function $t(e){let i=ut();if(!e)return i;let t=Array.isArray(e.items)?e.items.map(n=>({descripcion:String(n?.descripcion??``),cantidad:E(n?.cantidad),precio:E(n?.precio)})):[],a=s(r(r({},i),e),{numero:A(e.numero??i.numero),controlPrefijo:e.controlPrefijo||i.controlPrefijo,numeroControl:A(e.numeroControl??e.numero??i.numero),fechaEmision:e.fechaEmision||i.fechaEmision,fechaTexto:e.fechaTexto||i.fechaTexto,mes:e.mes||i.mes,alicuotaIva:E(e.alicuotaIva??i.alicuotaIva),alicuotaIgtf:E(e.alicuotaIgtf??i.alicuotaIgtf),alicuotaIslr:E(e.alicuotaIslr??i.alicuotaIslr),aplicaIgtf:!!e.aplicaIgtf,mostrarFirmaSello:e.mostrarFirmaSello!==!1,mostrarCabeceraPie:e.mostrarCabeceraPie!==!1,mostrarMarcaAgua:e.mostrarMarcaAgua!==!1,items:t,cliente:e.cliente??null,emisor:r(r({},Ue),e.emisor??{}),observaciones:e.observaciones??``});return a.totales=e.totales??W(a),a}function Bt(e){return e===`eliminado`}function zt(e){return!e||e===`borrador`}function Vt(e){return e===`emitida`?`La factura está emitida: su numeración es correlativa y su contenido no admite ediciones.`:e===`anulada`?`La factura está anulada: es un estado terminal y no admite ediciones.`:e===`eliminado`?`La factura está eliminada: ya no aparece en el listado y no admite ediciones.`:``}function Ht(e){return e===`borrador`||!e?[`emitida`,`eliminado`]:e===`emitida`?[`anulada`,`eliminado`]:[]}function Ut(e){switch(e){case`emitida`:return{etiqueta:`Emitida`,color:`#1565c0`,icono:`receipt_long`};case`anulada`:return{etiqueta:`Anulada`,color:`#c62828`,icono:`block`};case`eliminado`:return{etiqueta:`Eliminada`,color:`#757575`,icono:`delete_outline`};default:return{etiqueta:`Borrador`,color:`#ef6c00`,icono:`edit_note`}}}var qt=[`borrador`,`emitida`,`anulada`];function Gt(e){let i=[];return(!e.numero||!/^\d{7}$/.test(e.numero))&&i.push({campo:`numero`,mensaje:`El número de factura debe tener 7 dígitos.`}),(!e.numeroControl||!/^\d{7}$/.test(e.numeroControl))&&i.push({campo:`numeroControl`,mensaje:`El número de control debe tener 7 dígitos.`}),e.cliente||i.push({campo:`cliente`,mensaje:`Seleccione el cliente al que se factura.`}),e.fechaEmision||i.push({campo:`fechaEmision`,mensaje:`Indique la fecha de emisión.`}),(e.items??[]).length===0&&i.push({campo:`items`,mensaje:`Agregue al menos un renglón a la factura.`}),(e.items??[]).forEach((t,a)=>{t.descripcion?.trim()||i.push({campo:`items.${a}.descripcion`,mensaje:`El rengl\xF3n ${a+1} no tiene descripci\xF3n.`}),t.cantidad>0||i.push({campo:`items.${a}.cantidad`,mensaje:`La cantidad del rengl\xF3n ${a+1} debe ser mayor que cero.`}),t.precio>=0||i.push({campo:`items.${a}.precio`,mensaje:`El precio del rengl\xF3n ${a+1} no puede ser negativo.`})}),W(e).total<=0&&i.push({campo:`items`,mensaje:`El total de la factura debe ser mayor que cero.`}),i}var f={anchoCm:21.7,altoCm:28,margenSuperiorCm:4.5,margenInferiorCm:2.5,margenLateralCm:2};var se=`firmalink-factura-estilos`;var le=`
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
  width: ${f.anchoCm}cm;
  min-height: ${f.altoCm}cm;
  padding: ${f.margenSuperiorCm}cm ${f.margenLateralCm}cm ${f.margenInferiorCm}cm;
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
  left: ${f.margenLateralCm}cm;
  right: ${f.margenLateralCm}cm;
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
  size: ${f.anchoCm}cm ${f.altoCm}cm;
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
`;function Yt(){if(typeof document>`u`||document.getElementById(se))return;let e=document.createElement(`style`);e.id=se,e.textContent=le,document.head.appendChild(e)}function Jt(){let e=typeof document<`u`?document.getElementById(se):null;e&&e.remove()}function x(e){let i=`assets/${e}`;if(typeof document>`u`)return i;try{return new URL(i,document.baseURI).href}catch{return i}}function gt(){return`
  .fx-hoja {
    --fx-img-logo: url('${x(`factura/emisor.png`)}');
    --fx-img-marca: url('${x(`factura/emisor.png`)}');
    --fx-img-firma: url('${x(`factura/firma.png`)}');
    --fx-img-sello: url('${x(`factura/sello.png`)}');
  }`}function ht(e){let i=e.items??[];return i.length===0?`<tr class="fx-fila-vacia"><td colspan="4">Sin renglones registrados.</td></tr>`:i.map(t=>{let a=(Number(t.cantidad)||0)*(Number(t.precio)||0);return`<tr>
        <td class="fx-col-desc">${yo(t.descripcion)}</td>
        <td class="fx-col-cant fx-num">${yo(ne(t.cantidad))}</td>
        <td class="fx-col-precio fx-num">${yo(u(t.precio))}</td>
        <td class="fx-col-total fx-num">${yo(u(a))}</td>
      </tr>`}).join(``)}function pt(e){let i=W(e),t=[];return t.push(`<tr>
        <td class="fx-son-cell" colspan="2">Mes: <strong>${yo(e.mes)}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${yo(u(i.subtotal))}</td>
      </tr>`),t.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${yo(We(i.total))}</span></td>
        <td class="fx-label">IVA: ${yo(S(oe(e)))}</td>
        <td class="fx-amount">${yo(u(i.montoIva))}</td>
      </tr>`),re(e)&&t.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IGTF: ${yo(S(e.alicuotaIgtf))}</td>
        <td class="fx-amount">${yo(u(i.montoIgtf))}</td>
      </tr>`),t.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${yo(u(i.total))}</td>
      </tr>`),i.retencionIva>0&&t.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. IVA: ${yo(S(e.cliente?.porcentajeRetencionIva??0))}</td>
        <td class="fx-amount fx-retencion">- ${yo(u(i.retencionIva))}</td>
      </tr>`),i.retencionIslr>0&&t.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. ISLR: ${yo(S(e.alicuotaIslr))}</td>
        <td class="fx-amount fx-retencion">- ${yo(u(i.retencionIslr))}</td>
      </tr>`),(i.retencionIva>0||i.retencionIslr>0)&&t.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Neto a pagar:</td>
        <td class="fx-amount fx-total-final">${yo(u(i.netoAPagar))}</td>
      </tr>`),t.join(``)}function bt(e){return e.emisor}function _t(e){let i=bt(e),t=e.mostrarCabeceraPie,a=e.mostrarFirmaSello,n=e.mostrarMarcaAgua,o=t?`<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${x(`factura/emisor.png`)}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${yo(i.nombre)}</div>
        <div>RIF: ${yo(i.rif)}</div>
        <div>Direccion: ${yo(i.direccion)}</div>
        <div>Correo: ${yo(i.correo)} Telefonos: ${yo(i.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${yo(e.formato)}</div>
        <div>N&deg; de Control</div>
        <div class="fx-control-num">${yo(e.controlPrefijo)}${yo(e.numeroControl)}</div>
      </div>
    </div>`:``,s=a?`<div class="fx-firma-sello">
      <img class="fx-img-firma" src="${x(`factura/firma.png`)}" alt="Firma">
      <img class="fx-img-sello" src="${x(`factura/sello.png`)}" alt="Sello">
    </div>`:``,l=t?`<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        Razon Social: <strong>${yo(i.razonSocial)}</strong>
        ${yo(i.razonSocialDireccion)} Telf: ${yo(i.razonSocialTelefonos)}
        RIF: ${yo(i.razonSocialRif)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${yo(i.razonSocialCorreo)} &nbsp;&nbsp; Fecha: ${yo(i.fechaControl)} &nbsp;&nbsp;
        Control desde N&deg; ${yo(i.controlDesde)} hasta el N&deg; ${yo(i.controlHasta)} &nbsp;&nbsp;
        Provindencia N&deg; ${yo(i.providencia)} &nbsp;&nbsp; ${yo(i.region)}
      </div>
      <div class="fx-original">ORIGINAL</div>
    </div>`:``;return`<div class="${n?`fx-hoja`:`fx-hoja fx-sin-marca`}">
    ${o}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${yo(e.cliente?.nombre??``)}</strong></div>
        <div class="fx-factura-num">FACTURA: <span>${yo(e.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${yo(e.cliente?.rif??``)}</span></div>
        <div>Fecha de Emision: <span>${yo(e.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${yo(e.cliente?.telefono??``)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${yo(e.cliente?.direccion??``)}</span></div>
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
      <tbody>${ht(e)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${pt(e)}
    </table>

    ${s}
    ${l}
  </div>`}function xt(e){return`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${yo(e.numero)}</title>
<style>
${le}
${gt()}

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
${_t(e)}
</body>
</html>`}function ii(e){let i=window.open(``,`_blank`,`width=900,height=1100`);if(!i)return;i.document.open(),i.document.write(xt(e));let t=()=>{i.focus(),i.print()};i.document.close();let a=Array.from(i.document.images??[]);if(a.length===0||a.every(s=>s.complete)){setTimeout(t,120);return}let n=a.length,o=()=>{n-=1,n<=0&&setTimeout(t,120)};a.forEach(s=>{s.addEventListener(`load`,o),s.addEventListener(`error`,o)})}function Ct(e,i){}var b=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext;bindings};var de=(()=>{class e extends ht$1{_elementRef=T(Dr);_focusTrapFactory=T($n);_config;_interactivityChecker=T(On);_ngZone=T(Ne);_focusMonitor=T(Kt);_renderer=T(ja);_changeDetectorRef=T(p0);_injector=T(Ie);_platform=T(_$1);_document=T(or);_portalOutlet;_focusTrapped=new Q$1;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=T(b,{optional:!0})||new b,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(t){this._ariaLabelledByQueue.push(t),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(t){let a=this._ariaLabelledByQueue.indexOf(t);a>-1&&(this._ariaLabelledByQueue.splice(a,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();let a=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),a}attachTemplatePortal(t){this._portalOutlet.hasAttached();let a=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),a}attachDomPortal=t=>{this._portalOutlet.hasAttached();let a=this._portalOutlet.attachDomPortal(t);return this._contentAttached(),a};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,a){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{o(),s(),t.removeAttribute(`tabindex`)},o=this._renderer.listen(t,`blur`,n),s=this._renderer.listen(t,`mousedown`,n)})),t.focus(a)}_focusByCssSelector(t,a){let n=this._elementRef.nativeElement.querySelector(t);n&&this._forceFocus(n,a)}_trapFocus(t){this._isDestroyed||uv(()=>{let a=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case`dialog`:this._containsFocus()||a.focus(t);break;case!0:case`first-tabbable`:this._focusTrap?.focusInitialElement(t)||this._focusDialogContainer(t);break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`,t);break;default:this._focusByCssSelector(this._config.autoFocus,t);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let t=this._config.restoreFocus,a=null;if(typeof t==`string`?a=this._document.querySelector(t):typeof t==`boolean`?a=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(a=t),this._config.restoreFocus&&a&&typeof a.focus==`function`){let n=Tn(),o=this._elementRef.nativeElement;(!n||n===this._document.body||n===o||o.contains(n))&&(this._focusMonitor?(this._focusMonitor.focusVia(a,this._closeInteractionType),this._closeInteractionType=null):a.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(t){this._elementRef.nativeElement.focus?.(t)}_containsFocus(){let t=this._elementRef.nativeElement,a=Tn();return t===a||t.contains(a)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=Tn()))}static ɵfac=function(a){return new(a||e)};static ɵcmp=pE({type:e,selectors:[[`cdk-dialog-container`]],viewQuery:function(a,n){if(a&1&&Fp(Hi,7),a&2){let o;iD(o=sD())&&(n._portalOutlet=o.first)}},hostAttrs:[`tabindex`,`-1`,1,`cdk-dialog-container`],hostVars:6,hostBindings:function(a,n){a&2&&bp(`id`,n._config.id||null)(`role`,n._config.role)(`aria-modal`,n._config.ariaModal)(`aria-labelledby`,n._config.ariaLabel?null:n._ariaLabelledByQueue[0])(`aria-label`,n._config.ariaLabel)(`aria-describedby`,n._config.ariaDescribedBy||null)},features:[yp],decls:1,vars:0,consts:[[`cdkPortalOutlet`,``]],template:function(a,n){a&1&&Ip(0,Ct,0,0,`ng-template`,0)},dependencies:[Hi],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})}return e})();var v=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new Q$1;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(i,t){this.overlayRef=i,this.config=t,this.disableClose=t.disableClose,this.backdropClick=i.backdropClick(),this.keydownEvents=i.keydownEvents(),this.outsidePointerEvents=i.outsidePointerEvents(),this.id=t.id,this.keydownEvents.subscribe(a=>{a.keyCode===27&&!this.disableClose&&!nn(a)&&(a.preventDefault(),this.close(void 0,{focusOrigin:`keyboard`}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:`mouse`}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=i.detachments().subscribe(()=>{t.closeOnOverlayDetachments!==!1&&this.close()})}close(i,t){if(this._canClose(i)){let a=this.closed;this.containerInstance._closeInteractionType=t?.focusOrigin||`program`,this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),a.next(i),a.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(i=``,t=``){return this.overlayRef.updateSize({width:i,height:t}),this}addPanelClass(i){return this.overlayRef.addPanelClass(i),this}removePanelClass(i){return this.overlayRef.removePanelClass(i),this}_canClose(i){let t=this.config;return!!this.containerInstance&&(!t.closePredicate||t.closePredicate(i,t,this.componentInstance))}};var yt=new S$1(`DialogScrollStrategy`,{providedIn:`root`,factory:()=>{let e=T(Ie);return()=>be(e)}});var Dt=new S$1(`DialogData`);var It=new S$1(`DefaultDialogConfig`);function Et(e){let i=Bo(e),t=new Be;return{valueSignal:i,get value(){return i()},change:t,ngOnDestroy(){t.complete()}}}var me=(()=>{class e{_injector=T(Ie);_defaultOptions=T(It,{optional:!0});_parentDialog=T(e,{optional:!0,skipSelf:!0});_overlayContainer=T(Pe);_idGenerator=T(qt$1);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new Q$1;_afterOpenedAtThisLevel=new Q$1;_ariaHiddenElements=new Map;_scrollStrategy=T(yt);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=Jh(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Eg(void 0)));open(t,a){a=r(r({},this._defaultOptions||new b),a),a.id=a.id||this._idGenerator.getId(`cdk-dialog-`),a.id&&this.getDialogById(a.id);let o=this._getOverlayConfig(a),s=J(this._injector,o),l=new v(s,a),m=this._attachContainer(s,l,a);if(l.containerInstance=m,!this.openDialogs.length){let J=this._overlayContainer.getContainerElement();m._focusTrapped?m._focusTrapped.pipe(en(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(J)}):this._hideNonDialogContentFromAssistiveTechnology(J)}return this._attachDialogContent(t,l,m,a),this.openDialogs.push(l),l.closed.subscribe(()=>this._removeOpenDialog(l,!0)),this.afterOpened.next(l),l}closeAll(){ce(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(a=>a.id===t)}ngOnDestroy(){ce(this._openDialogsAtThisLevel,t=>{t.config.closeOnDestroy===!1&&this._removeOpenDialog(t,!1)}),ce(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){let a=new K({positionStrategy:t.positionStrategy||De().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation,disableAnimations:t.disableAnimations});return t.backdropClass&&(a.backdropClass=t.backdropClass),a}_attachContainer(t,a,n){let o=n.injector||n.viewContainerRef?.injector,s=[{provide:b,useValue:n},{provide:v,useValue:a},{provide:_t$1,useValue:t}],l;n.container?typeof n.container==`function`?l=n.container:(l=n.container.type,s.push(...n.container.providers(n))):l=de;let m=new Z(l,n.viewContainerRef,Ie.create({parent:o||this._injector,providers:s}));return t.attach(m).instance}_attachDialogContent(t,a,n,o){if(t instanceof hr){let s=this._createInjector(o,a,n,void 0),l={$implicit:o.data,dialogRef:a};o.templateContext&&(l=r(r({},l),typeof o.templateContext==`function`?o.templateContext():o.templateContext)),n.attachTemplatePortal(new G$1(t,null,l,s))}else{let s=this._createInjector(o,a,n,this._injector),l=n.attachComponentPortal(new Z(t,o.viewContainerRef,s,null,o.bindings));a.componentRef=l,a.componentInstance=l.instance}}_createInjector(t,a,n,o){let s=t.injector||t.viewContainerRef?.injector,l=[{provide:Dt,useValue:t.data},{provide:v,useValue:a}];return t.providers&&(typeof t.providers==`function`?l.push(...t.providers(a,t,n)):l.push(...t.providers)),t.direction&&(!s||!s.get(bo,null,{optional:!0}))&&l.push({provide:bo,useValue:Et(t.direction)}),Ie.create({parent:s||o,providers:l})}_removeOpenDialog(t,a){let n=this.openDialogs.indexOf(t);n>-1&&(this.openDialogs.splice(n,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,s)=>{o?s.setAttribute(`aria-hidden`,o):s.removeAttribute(`aria-hidden`)}),this._ariaHiddenElements.clear(),a&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(t){if(t.parentElement){let a=t.parentElement.children;for(let n=a.length-1;n>-1;n--){let o=a[n];o!==t&&o.nodeName!==`SCRIPT`&&o.nodeName!==`STYLE`&&!o.hasAttribute(`aria-live`)&&!o.hasAttribute(`popover`)&&(this._ariaHiddenElements.set(o,o.getAttribute(`aria-hidden`)),o.setAttribute(`aria-hidden`,`true`))}}}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}static ɵfac=function(a){return new(a||e)};static ɵprov=Er({token:e,factory:e.ɵfac})}return e})();function ce(e,i){let t=e.length;for(;t--;)i(e[t])}var Ye=(()=>{class e{static ɵfac=function(a){return new(a||e)};static ɵmod=gE({type:e});static ɵinj=Ql({providers:[me],imports:[Ht$1,fe$1,Yn,fe$1]})}return e})();function At(e,i){}var Y=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration;bindings};var ue=`mdc-dialog--open`;var Je=`mdc-dialog--opening`;var Ze=`mdc-dialog--closing`;var St=150;var Tt=75;var Ot=(()=>{class e extends de{_animationStateChanged=new Be;_animationsEnabled=!tt$1();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?Xe(this._config.enterAnimationDuration)??St:0;_exitAnimationDuration=this._animationsEnabled?Xe(this._config.exitAnimationDuration)??Tt:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:`opening`,totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Ke,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Je,ue)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(ue),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:`closing`,totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(ue),this._animationsEnabled?(this._hostElement.style.setProperty(Ke,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Ze)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(t){this._actionSectionCount+=t,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:`closed`,totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Je,Ze)}_waitForAnimationToComplete(t,a){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(a,t)}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame==`function`?requestAnimationFrame(t):t()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:`opened`,totalTime:t})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(t){let a=super.attachComponentPortal(t);return a.location.nativeElement.classList.add(`mat-mdc-dialog-component-host`),a}static ɵfac=(()=>{let t;return function(n){return(t||(t=Qm(e)))(n||e)}})();static ɵcmp=pE({type:e,selectors:[[`mat-dialog-container`]],hostAttrs:[`tabindex`,`-1`,1,`mat-mdc-dialog-container`,`mdc-dialog`],hostVars:10,hostBindings:function(a,n){a&2&&(Ap(`id`,n._config.id),bp(`aria-modal`,n._config.ariaModal)(`role`,n._config.role)(`aria-labelledby`,n._config.ariaLabel?null:n._ariaLabelledByQueue[0])(`aria-label`,n._config.ariaLabel)(`aria-describedby`,n._config.ariaDescribedBy||null),Up(`_mat-animation-noopable`,!n._animationsEnabled)(`mat-mdc-dialog-container-with-actions`,n._actionSectionCount>0))},features:[yp],decls:3,vars:0,consts:[[1,`mat-mdc-dialog-inner-container`,`mdc-dialog__container`],[1,`mat-mdc-dialog-surface`,`mdc-dialog__surface`],[`cdkPortalOutlet`,``]],template:function(a,n){a&1&&(yi(0,`div`,0)(1,`div`,1),Ip(2,At,0,0,`ng-template`,2),Fc()())},dependencies:[Hi],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--%NS%mat-dialog-container-max-width, 560px);
  min-width: var(--%NS%mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--%NS%mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--%NS%mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--%NS%mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--%NS%mat-dialog-container-elevation-shadow, none);
  border-radius: var(--%NS%mat-dialog-container-shape, var(--%NS%mat-sys-corner-extra-large, 4px));
  background-color: var(--%NS%mat-dialog-container-color, var(--%NS%mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--%NS%mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--%NS%mat-dialog-subhead-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-dialog-subhead-font, var(--%NS%mat-sys-headline-small-font, inherit));
  line-height: var(--%NS%mat-dialog-subhead-line-height, var(--%NS%mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-subhead-size, var(--%NS%mat-sys-headline-small-size, 1rem));
  font-weight: var(--%NS%mat-dialog-subhead-weight, var(--%NS%mat-sys-headline-small-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-subhead-tracking, var(--%NS%mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--%NS%mat-dialog-supporting-text-color, var(--%NS%mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--%NS%mat-dialog-supporting-text-font, var(--%NS%mat-sys-body-medium-font, inherit));
  line-height: var(--%NS%mat-dialog-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 1rem));
  font-weight: var(--%NS%mat-dialog-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--%NS%mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--%NS%mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})}return e})();var Ke=`--mat-dialog-transition-duration`;function Xe(e){return e==null?null:typeof e==`number`?e:e.endsWith(`ms`)?Cn(e.substring(0,e.length-2)):e.endsWith(`s`)?Cn(e.substring(0,e.length-1))*1e3:e===`0`?0:null}var Q=(function(e){return e[e.OPEN=0]=`OPEN`,e[e.CLOSING=1]=`CLOSING`,e[e.CLOSED=2]=`CLOSED`,e})(Q||{});var fe=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new Rn(1);_beforeClosed=new Rn(1);_result;_closeFallbackTimeout;_state=Q.OPEN;_closeInteractionType;constructor(i,t,a){this._ref=i,this._config=t,this._containerInstance=a,this.disableClose=t.disableClose,this.id=i.id,i.addPanelClass(`mat-mdc-dialog-panel`),a._animationStateChanged.pipe(Ln(n=>n.state===`opened`),en(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),a._animationStateChanged.pipe(Ln(n=>n.state===`closed`),en(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),i.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),sg(this.backdropClick(),this.keydownEvents().pipe(Ln(n=>n.keyCode===27&&!this.disableClose&&!nn(n)))).subscribe(n=>{this.disableClose||(n.preventDefault(),Ft(this,n.type===`keydown`?`keyboard`:`mouse`))})}close(i){let t=this._config.closePredicate;t&&!t(i,this._config,this.componentInstance)||(this._result=i,this._containerInstance._animationStateChanged.pipe(Ln(a=>a.state===`closing`),en(1)).subscribe(a=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),a.totalTime+100)}),this._state=Q.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(i){let t=this._ref.config.positionStrategy;return i&&(i.left||i.right)?i.left?t.left(i.left):t.right(i.right):t.centerHorizontally(),i&&(i.top||i.bottom)?i.top?t.top(i.top):t.bottom(i.bottom):t.centerVertically(),this._ref.updatePosition(),this}updateSize(i=``,t=``){return this._ref.updateSize(i,t),this}addPanelClass(i){return this._ref.addPanelClass(i),this}removePanelClass(i){return this._ref.removePanelClass(i),this}getState(){return this._state}_finishDialogClose(){this._state=Q.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function Ft(e,i,t){return e._closeInteractionType=i,e.close(t)}var wt=new S$1(`MatMdcDialogData`);var Nt=new S$1(`mat-mdc-dialog-default-options`);var Rt=new S$1(`mat-mdc-dialog-scroll-strategy`,{providedIn:`root`,factory:()=>{let e=T(Ie);return()=>be(e)}});var Lt=(()=>{class e{_defaultOptions=T(Nt,{optional:!0});_scrollStrategy=T(Rt);_parentDialog=T(e,{optional:!0,skipSelf:!0});_idGenerator=T(qt$1);_injector=T(Ie);_dialog=T(me);_animationsDisabled=tt$1();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new Q$1;_afterOpenedAtThisLevel=new Q$1;dialogConfigClass=Y;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=Jh(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Eg(void 0)));constructor(){this._dialogRefConstructor=fe,this._dialogContainerType=Ot,this._dialogDataToken=wt}open(t,a){let n;a=r(r({},this._defaultOptions||new Y),a),a.id=a.id||this._idGenerator.getId(`mat-mdc-dialog-`),a.scrollStrategy=a.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(t,s(r({},a),{positionStrategy:De(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||a.enterAnimationDuration?.toLocaleString()===`0`||a.exitAnimationDuration?.toString()===`0`,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:a},{provide:b,useValue:a}]},templateContext:()=>({dialogRef:n}),providers:(s,l,m)=>(n=new this._dialogRefConstructor(s,a,m),n.updatePosition(a?.position),[{provide:this._dialogContainerType,useValue:m},{provide:this._dialogDataToken,useValue:l.data},{provide:this._dialogRefConstructor,useValue:n},{provide:v,useValue:null}])}));return n.componentRef=o.componentRef,n.componentInstance=o.componentInstance,this.openDialogs.push(n),this.afterOpened.next(n),n.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(n);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),n}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(a=>a.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let a=t.length;for(;a--;)t[a].close()}static ɵfac=function(a){return new(a||e)};static ɵprov=Er({token:e,factory:e.ɵfac})}return e})();var Gi=(()=>{class e{static ɵfac=function(a){return new(a||e)};static ɵmod=gE({type:e});static ɵinj=Ql({providers:[Lt],imports:[Ye,Ht$1,fe$1,et$1]})}return e})();export{ot as A,ii as C,mt as D,le as E,ut as F,x as I,zt as L,rt as M,st as N,ne as O,u as P,f as S,kt as T,We as _,Gi as a,_t as b,Jt as c,Pt as d,S as f,W as g,Vt as h,E as i,qt as j,oe as k,Lt as l,Ut as m,A as n,Gt as o,Ue as p,Bt as r,Ht as s,$t as t,Mt as u,Yt as v,jt as w,ct as x,_ as y};