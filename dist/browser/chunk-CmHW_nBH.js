import{n as s,t as r}from"./chunk-C9yOwMO6.js";import{B as Er,Cr as zp,D as Bp,En as fg,H as Fn,I as Ee,L as Eg,Ln as k0,Lt as Tv,Nt as Sp,Pt as T,R as Ei,S as $c,T as Ae,Tn as eu,Ut as Uo,Vt as Ue$1,Xt as Xp,Y as Hn,Z as ID,ct as Lp,dr as ur,dt as Mp,ft as Mr,gt as Og,jt as S,ln as _r,mn as an,mt as NE,on as _E,pr as vD,tn as Z$1,yn as cy,zt as Ua}from"./main-2TW4EHUZ.js";import{O as y,b as j,f as S$1,l as M,n as B,p as U,u as O}from"./chunk-Bj40Om6K.js";import{B as tt$1,D as bo,F as qt,P as nn,S as Yn,_ as Tn,d as Kt,k as et$1,m as On,o as Cn,t as $n,w as _$1}from"./chunk-De3ZEI8P.js";import{C as ht,S as fe,_ as _t,a as Ht,c as J$1,d as Pe,g as Z$2,i as Hi,r as G,t as De,u as K$1,v as be}from"./chunk-DZOOkwPh.js";import{f as Ne}from"./chunk-BQkfuh2y.js";var f={anchoCm:21.7,altoCm:28,margenSuperiorCm:4.5,margenInferiorCm:2.5,margenLateralCm:2};var Z=`firmalink-factura-estilos`;var J=`
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
`;function mt(){if(typeof document>`u`||document.getElementById(Z))return;let i=document.createElement(`style`);i.id=Z,i.textContent=J,document.head.appendChild(i)}function ft(){let i=typeof document<`u`?document.getElementById(Z):null;i&&i.remove()}function x(i){let a=`assets/${i}`;if(typeof document>`u`)return a;try{return new URL(a,document.baseURI).href}catch{return a}}function Ge(){return`
  .fx-hoja {
    --fx-img-logo: url('${x(`factura/emisor.png`)}');
    --fx-img-marca: url('${x(`factura/emisor.png`)}');
    --fx-img-firma: url('${x(`factura/firma.png`)}');
    --fx-img-sello: url('${x(`factura/sello.png`)}');
  }`}function qe(i){let a=i.items??[];return a.length===0?`<tr class="fx-fila-vacia"><td colspan="4">Sin renglones registrados.</td></tr>`:a.map(e=>{let t=(Number(e.cantidad)||0)*(Number(e.precio)||0);return`<tr>
        <td class="fx-col-desc">${Ne(e.descripcion)}</td>
        <td class="fx-col-cant fx-num">${Ne(O(e.cantidad))}</td>
        <td class="fx-col-precio fx-num">${Ne(j(e.precio))}</td>
        <td class="fx-col-total fx-num">${Ne(j(t))}</td>
      </tr>`}).join(``)}function Ue(i){let a=S$1(i),e=[];return e.push(`<tr>
        <td class="fx-son-cell" colspan="2">Mes: <strong>${Ne(i.mes)}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${Ne(j(a.subtotal))}</td>
      </tr>`),e.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${Ne(y(a.total))}</span></td>
        <td class="fx-label">IVA: ${Ne(B(M(i)))}</td>
        <td class="fx-amount">${Ne(j(a.montoIva))}</td>
      </tr>`),U(i)&&e.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IGTF: ${Ne(B(i.alicuotaIgtf))}</td>
        <td class="fx-amount">${Ne(j(a.montoIgtf))}</td>
      </tr>`),e.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${Ne(j(a.total))}</td>
      </tr>`),a.retencionIva>0&&e.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. IVA: ${Ne(B(i.cliente?.porcentajeRetencionIva??0))}</td>
        <td class="fx-amount fx-retencion">- ${Ne(j(a.retencionIva))}</td>
      </tr>`),a.retencionIslr>0&&e.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. ISLR: ${Ne(B(i.alicuotaIslr))}</td>
        <td class="fx-amount fx-retencion">- ${Ne(j(a.retencionIslr))}</td>
      </tr>`),(a.retencionIva>0||a.retencionIslr>0)&&e.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Neto a pagar:</td>
        <td class="fx-amount fx-total-final">${Ne(j(a.netoAPagar))}</td>
      </tr>`),e.join(``)}function We(i){return i.emisor}function Qe(i){let a=We(i),e=i.mostrarCabeceraPie,t=i.mostrarFirmaSello,n=i.mostrarMarcaAgua,o=e?`<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${x(`factura/emisor.png`)}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${Ne(a.nombre)}</div>
        <div>RIF: ${Ne(a.rif)}</div>
        <div>Direccion: ${Ne(a.direccion)}</div>
        <div>Correo: ${Ne(a.correo)} Telefonos: ${Ne(a.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${Ne(i.formato)}</div>
        <div>N&deg; de Control</div>
        <div class="fx-control-num">${Ne(i.controlPrefijo)}${Ne(i.numeroControl)}</div>
      </div>
    </div>`:``,r=t?`<div class="fx-firma-sello">
      <img class="fx-img-firma" src="${x(`factura/firma.png`)}" alt="Firma">
      <img class="fx-img-sello" src="${x(`factura/sello.png`)}" alt="Sello">
    </div>`:``,l=e?`<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        Razon Social: <strong>${Ne(a.razonSocial)}</strong>
        ${Ne(a.razonSocialDireccion)} Telf: ${Ne(a.razonSocialTelefonos)}
        RIF: ${Ne(a.razonSocialRif)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${Ne(a.razonSocialCorreo)} &nbsp;&nbsp; Fecha: ${Ne(a.fechaControl)} &nbsp;&nbsp;
        Control desde N&deg; ${Ne(a.controlDesde)} hasta el N&deg; ${Ne(a.controlHasta)} &nbsp;&nbsp;
        Provindencia N&deg; ${Ne(a.providencia)} &nbsp;&nbsp; ${Ne(a.region)}
      </div>
      <div class="fx-original">ORIGINAL</div>
    </div>`:``;return`<div class="${n?`fx-hoja`:`fx-hoja fx-sin-marca`}">
    ${o}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${Ne(i.cliente?.nombre??``)}</strong></div>
        <div class="fx-factura-num">FACTURA: <span>${Ne(i.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${Ne(i.cliente?.rif??``)}</span></div>
        <div>Fecha de Emision: <span>${Ne(i.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${Ne(i.cliente?.telefono??``)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${Ne(i.cliente?.direccion??``)}</span></div>
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
      <tbody>${qe(i)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${Ue(i)}
    </table>

    ${r}
    ${l}
  </div>`}function Ye(i){return`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${Ne(i.numero)}</title>
<style>
${J}
${Ge()}

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
${Qe(i)}
</body>
</html>`}function xt(i){let a=window.open(``,`_blank`,`width=900,height=1100`);if(!a)return;a.document.open(),a.document.write(Ye(i));let e=()=>{a.focus(),a.print()};a.document.close();let t=Array.from(a.document.images??[]);if(t.length===0||t.every(r=>r.complete)){setTimeout(e,120);return}let n=t.length,o=()=>{n-=1,n<=0&&setTimeout(e,120)};t.forEach(r=>{r.addEventListener(`load`,o),r.addEventListener(`error`,o)})}function Je(i,a){}var _=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext;bindings};var X=(()=>{class i extends ht{_elementRef=T(Mr);_focusTrapFactory=T($n);_config;_interactivityChecker=T(On);_ngZone=T(Ae);_focusMonitor=T(Kt);_renderer=T(Ua);_changeDetectorRef=T(k0);_injector=T(Ee);_platform=T(_$1);_document=T(ur);_portalOutlet;_focusTrapped=new Z$1;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=T(_,{optional:!0})||new _,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{o(),r(),e.removeAttribute(`tabindex`)},o=this._renderer.listen(e,`blur`,n),r=this._renderer.listen(e,`mousedown`,n)})),e.focus(t)}_focusByCssSelector(e,t){let n=this._elementRef.nativeElement.querySelector(e);n&&this._forceFocus(n,t)}_trapFocus(e){this._isDestroyed||Tv(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case`dialog`:this._containsFocus()||t.focus(e);break;case!0:case`first-tabbable`:this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`,e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e==`string`?t=this._document.querySelector(e):typeof e==`boolean`?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus==`function`){let n=Tn(),o=this._elementRef.nativeElement;(!n||n===this._document.body||n===o||o.contains(n))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,t=Tn();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=Tn()))}static ɵfac=function(t){return new(t||i)};static ɵcmp=_E({type:i,selectors:[[`cdk-dialog-container`]],viewQuery:function(t,n){if(t&1&&zp(Hi,7),t&2){let o;vD(o=ID())&&(n._portalOutlet=o.first)}},hostAttrs:[`tabindex`,`-1`,1,`cdk-dialog-container`],hostVars:6,hostBindings:function(t,n){t&2&&Lp(`id`,n._config.id||null)(`role`,n._config.role)(`aria-modal`,n._config.ariaModal)(`aria-labelledby`,n._config.ariaLabel?null:n._ariaLabelledByQueue[0])(`aria-label`,n._config.ariaLabel)(`aria-describedby`,n._config.ariaDescribedBy||null)},features:[Mp],decls:1,vars:0,consts:[[`cdkPortalOutlet`,``]],template:function(t,n){t&1&&Sp(0,Je,0,0,`ng-template`,0)},dependencies:[Hi],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})}return i})();var b=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new Z$1;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(a,e){this.overlayRef=a,this.config=e,this.disableClose=e.disableClose,this.backdropClick=a.backdropClick(),this.keydownEvents=a.keydownEvents(),this.outsidePointerEvents=a.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!nn(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:`keyboard`}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:`mouse`}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=a.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(a,e){if(this._canClose(a)){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||`program`,this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(a),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(a=``,e=``){return this.overlayRef.updateSize({width:a,height:e}),this}addPanelClass(a){return this.overlayRef.addPanelClass(a),this}removePanelClass(a){return this.overlayRef.removePanelClass(a),this}_canClose(a){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(a,e,this.componentInstance))}};var Ke=new S(`DialogScrollStrategy`,{providedIn:`root`,factory:()=>{let i=T(Ee);return()=>be(i)}});var Xe=new S(`DialogData`);var et=new S(`DefaultDialogConfig`);function tt(i){let a=Uo(i),e=new Ue$1;return{valueSignal:a,get value(){return a()},change:e,ngOnDestroy(){e.complete()}}}var ee=(()=>{class i{_injector=T(Ee);_defaultOptions=T(et,{optional:!0});_parentDialog=T(i,{optional:!0,skipSelf:!0});_overlayContainer=T(Pe);_idGenerator=T(qt);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new Z$1;_afterOpenedAtThisLevel=new Z$1;_ariaHiddenElements=new Map;_scrollStrategy=T(Ke);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=fg(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Og(void 0)));open(e,t){t=r(r({},this._defaultOptions||new _),t),t.id=t.id||this._idGenerator.getId(`cdk-dialog-`),t.id&&this.getDialogById(t.id);let o=this._getOverlayConfig(t),r$1=J$1(this._injector,o),l=new b(r$1,t),d=this._attachContainer(r$1,l,t);if(l.containerInstance=d,!this.openDialogs.length){let V=this._overlayContainer.getContainerElement();d._focusTrapped?d._focusTrapped.pipe(an(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(V)}):this._hideNonDialogContentFromAssistiveTechnology(V)}return this._attachDialogContent(e,l,d,t),this.openDialogs.push(l),l.closed.subscribe(()=>this._removeOpenDialog(l,!0)),this.afterOpened.next(l),l}closeAll(){K(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){K(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),K(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new K$1({positionStrategy:e.positionStrategy||De().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,n){let o=n.injector||n.viewContainerRef?.injector,r=[{provide:_,useValue:n},{provide:b,useValue:t},{provide:_t,useValue:e}],l;n.container?typeof n.container==`function`?l=n.container:(l=n.container.type,r.push(...n.container.providers(n))):l=X;let d=new Z$2(l,n.viewContainerRef,Ee.create({parent:o||this._injector,providers:r}));return e.attach(d).instance}_attachDialogContent(e,t,n,o){if(e instanceof Er){let r$2=this._createInjector(o,t,n,void 0),l={$implicit:o.data,dialogRef:t};o.templateContext&&(l=r(r({},l),typeof o.templateContext==`function`?o.templateContext():o.templateContext)),n.attachTemplatePortal(new G(e,null,l,r$2))}else{let r=this._createInjector(o,t,n,this._injector),l=n.attachComponentPortal(new Z$2(e,o.viewContainerRef,r,null,o.bindings));t.componentRef=l,t.componentInstance=l.instance}}_createInjector(e,t,n,o){let r=e.injector||e.viewContainerRef?.injector,l=[{provide:Xe,useValue:e.data},{provide:b,useValue:t}];return e.providers&&(typeof e.providers==`function`?l.push(...e.providers(t,e,n)):l.push(...e.providers)),e.direction&&(!r||!r.get(bo,null,{optional:!0}))&&l.push({provide:bo,useValue:tt(e.direction)}),Ee.create({parent:r||o,providers:l})}_removeOpenDialog(e,t){let n=this.openDialogs.indexOf(e);n>-1&&(this.openDialogs.splice(n,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,r)=>{o?r.setAttribute(`aria-hidden`,o):r.removeAttribute(`aria-hidden`)}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let t=e.parentElement.children;for(let n=t.length-1;n>-1;n--){let o=t[n];o!==e&&o.nodeName!==`SCRIPT`&&o.nodeName!==`STYLE`&&!o.hasAttribute(`aria-live`)&&!o.hasAttribute(`popover`)&&(this._ariaHiddenElements.set(o,o.getAttribute(`aria-hidden`)),o.setAttribute(`aria-hidden`,`true`))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static ɵfac=function(t){return new(t||i)};static ɵprov=_r({token:i,factory:i.ɵfac})}return i})();function K(i,a){let e=i.length;for(;e--;)a(i[e])}var Me=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=NE({type:i});static ɵinj=eu({providers:[ee],imports:[Ht,fe,Yn,fe]})}return i})();function it(i,a){}var H=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration;bindings};var te=`mdc-dialog--open`;var $e=`mdc-dialog--opening`;var Be=`mdc-dialog--closing`;var at=150;var nt=75;var ot=(()=>{class i extends X{_animationStateChanged=new Ue$1;_animationsEnabled=!tt$1();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?He(this._config.enterAnimationDuration)??at:0;_exitAnimationDuration=this._animationsEnabled?He(this._config.exitAnimationDuration)??nt:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:`opening`,totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(ze,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add($e,te)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(te),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:`closing`,totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(te),this._animationsEnabled?(this._hostElement.style.setProperty(ze,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Be)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:`closed`,totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove($e,Be)}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame==`function`?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:`opened`,totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add(`mat-mdc-dialog-component-host`),t}static ɵfac=(()=>{let e;return function(n){return(e||(e=cy(i)))(n||i)}})();static ɵcmp=_E({type:i,selectors:[[`mat-dialog-container`]],hostAttrs:[`tabindex`,`-1`,1,`mat-mdc-dialog-container`,`mdc-dialog`],hostVars:10,hostBindings:function(t,n){t&2&&(Bp(`id`,n._config.id),Lp(`aria-modal`,n._config.ariaModal)(`role`,n._config.role)(`aria-labelledby`,n._config.ariaLabel?null:n._ariaLabelledByQueue[0])(`aria-label`,n._config.ariaLabel)(`aria-describedby`,n._config.ariaDescribedBy||null),Xp(`_mat-animation-noopable`,!n._animationsEnabled)(`mat-mdc-dialog-container-with-actions`,n._actionSectionCount>0))},features:[Mp],decls:3,vars:0,consts:[[1,`mat-mdc-dialog-inner-container`,`mdc-dialog__container`],[1,`mat-mdc-dialog-surface`,`mdc-dialog__surface`],[`cdkPortalOutlet`,``]],template:function(t,n){t&1&&(Ei(0,`div`,0)(1,`div`,1),Sp(2,it,0,0,`ng-template`,2),$c()())},dependencies:[Hi],styles:[`.mat-mdc-dialog-container {
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
`],encapsulation:2,changeDetection:1})}return i})();var ze=`--mat-dialog-transition-duration`;function He(i){return i==null?null:typeof i==`number`?i:i.endsWith(`ms`)?Cn(i.substring(0,i.length-2)):i.endsWith(`s`)?Cn(i.substring(0,i.length-1))*1e3:i===`0`?0:null}var z=(function(i){return i[i.OPEN=0]=`OPEN`,i[i.CLOSING=1]=`CLOSING`,i[i.CLOSED=2]=`CLOSED`,i})(z||{});var ie=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new Fn(1);_beforeClosed=new Fn(1);_result;_closeFallbackTimeout;_state=z.OPEN;_closeInteractionType;constructor(a,e,t){this._ref=a,this._config=e,this._containerInstance=t,this.disableClose=e.disableClose,this.id=a.id,a.addPanelClass(`mat-mdc-dialog-panel`),t._animationStateChanged.pipe(Hn(n=>n.state===`opened`),an(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(Hn(n=>n.state===`closed`),an(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),a.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Eg(this.backdropClick(),this.keydownEvents().pipe(Hn(n=>n.keyCode===27&&!this.disableClose&&!nn(n)))).subscribe(n=>{this.disableClose||(n.preventDefault(),st(this,n.type===`keydown`?`keyboard`:`mouse`))})}close(a){let e=this._config.closePredicate;e&&!e(a,this._config,this.componentInstance)||(this._result=a,this._containerInstance._animationStateChanged.pipe(Hn(t=>t.state===`closing`),an(1)).subscribe(t=>{this._beforeClosed.next(a),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=z.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(a){let e=this._ref.config.positionStrategy;return a&&(a.left||a.right)?a.left?e.left(a.left):e.right(a.right):e.centerHorizontally(),a&&(a.top||a.bottom)?a.top?e.top(a.top):e.bottom(a.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(a=``,e=``){return this._ref.updateSize(a,e),this}addPanelClass(a){return this._ref.addPanelClass(a),this}removePanelClass(a){return this._ref.removePanelClass(a),this}getState(){return this._state}_finishDialogClose(){this._state=z.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function st(i,a,e){return i._closeInteractionType=a,i.close(e)}var rt=new S(`MatMdcDialogData`);var lt=new S(`mat-mdc-dialog-default-options`);var ct=new S(`mat-mdc-dialog-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=T(Ee);return()=>be(i)}});var dt=(()=>{class i{_defaultOptions=T(lt,{optional:!0});_scrollStrategy=T(ct);_parentDialog=T(i,{optional:!0,skipSelf:!0});_idGenerator=T(qt);_injector=T(Ee);_dialog=T(ee);_animationsDisabled=tt$1();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new Z$1;_afterOpenedAtThisLevel=new Z$1;dialogConfigClass=H;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=fg(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Og(void 0)));constructor(){this._dialogRefConstructor=ie,this._dialogContainerType=ot,this._dialogDataToken=rt}open(e,t){let n;t=r(r({},this._defaultOptions||new H),t),t.id=t.id||this._idGenerator.getId(`mat-mdc-dialog-`),t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,s(r({},t),{positionStrategy:De(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||t.enterAnimationDuration?.toLocaleString()===`0`||t.exitAnimationDuration?.toString()===`0`,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:_,useValue:t}]},templateContext:()=>({dialogRef:n}),providers:(r,l,d)=>(n=new this._dialogRefConstructor(r,t,d),n.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:d},{provide:this._dialogDataToken,useValue:l.data},{provide:this._dialogRefConstructor,useValue:n},{provide:b,useValue:null}])}));return n.componentRef=o.componentRef,n.componentInstance=o.componentInstance,this.openDialogs.push(n),this.afterOpened.next(n),n.afterClosed().subscribe(()=>{let r=this.openDialogs.indexOf(n);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||this._getAfterAllClosed().next())}),n}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close()}static ɵfac=function(t){return new(t||i)};static ɵprov=_r({token:i,factory:i.ɵfac})}return i})();var li=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=NE({type:i});static ɵinj=eu({providers:[dt],imports:[Me,Ht,fe,et$1]})}return i})();export{ft as a,x as c,f as i,xt as l,Qe as n,li as o,dt as r,mt as s,J as t};