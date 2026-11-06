import{f as Ne}from"./chunk-BKM20rfe.js";import{d as O,k as y$1,m as U,n as B,p as S,u as M,x as j$1}from"./chunk-qTBJhSUT.js";var n={anchoCm:21.7,altoCm:28,margenSuperiorCm:4.5,margenInferiorCm:2.5,margenLateralCm:2};var d=`firmalink-factura-estilos`;var x=`
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
  width: ${n.anchoCm}cm;
  min-height: ${n.altoCm}cm;
  padding: ${n.margenSuperiorCm}cm ${n.margenLateralCm}cm ${n.margenInferiorCm}cm;
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
  left: ${n.margenLateralCm}cm;
  right: ${n.margenLateralCm}cm;
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

/* Presupuesto sin IVA: el importe cotizado no lleva el impuesto incluido y
   tiene que leerse antes de la firma, por eso va en rojo y en su propia fila. */
.fx-sin-iva-tag {
  color: #c62828;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.fx-aviso-sin-iva {
  margin-top: 2mm;
  padding: 1.6mm 2.5mm;
  border: 1px solid #c62828;
  border-left: 1.2mm solid #c62828;
  border-radius: 1mm;
  background: #fdecec;
  color: #b3261e;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-align: center;
}

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
  size: ${n.anchoCm}cm ${n.altoCm}cm;
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
`;function A(){if(typeof document>`u`||document.getElementById(d))return;let a=document.createElement(`style`);a.id=d,a.textContent=x,document.head.appendChild(a)}function T(){let a=typeof document<`u`?document.getElementById(d):null;a&&a.remove()}function s(a){let e=`assets/${a}`;if(typeof document>`u`)return e;try{return new URL(e,document.baseURI).href}catch{return e}}function w(){return`
  .fx-hoja {
    --fx-img-logo: url('${s(`factura/emisor.png`)}');
    --fx-img-marca: url('${s(`factura/emisor.png`)}');
    --fx-img-firma: url('${s(`factura/firma.png`)}');
    --fx-img-sello: url('${s(`factura/sello.png`)}');
  }`}function y(a){let e=a.items??[];return e.length===0?`<tr class="fx-fila-vacia"><td colspan="4">Sin renglones registrados.</td></tr>`:e.map(o=>{let r=(Number(o.cantidad)||0)*(Number(o.precio)||0);return`<tr>
        <td class="fx-col-desc">${Ne(o.descripcion)}</td>
        <td class="fx-col-cant fx-num">${Ne(O(o.cantidad))}</td>
        <td class="fx-col-precio fx-num">${Ne(j$1(o.precio))}</td>
        <td class="fx-col-total fx-num">${Ne(j$1(r))}</td>
      </tr>`}).join(``)}function C(a){let e=S(a),o=[];return o.push(`<tr>
        <td class="fx-son-cell" colspan="2">Mes: <strong>${Ne(a.mes)}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${Ne(j$1(e.subtotal))}</td>
      </tr>`),o.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${Ne(y$1(e.total))}</span></td>
        <td class="fx-label">IVA: ${Ne(B(M(a)))}</td>
        <td class="fx-amount">${Ne(j$1(e.montoIva))}</td>
      </tr>`),U(a)&&o.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IGTF: ${Ne(B(a.alicuotaIgtf))}</td>
        <td class="fx-amount">${Ne(j$1(e.montoIgtf))}</td>
      </tr>`),o.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${Ne(j$1(e.total))}</td>
      </tr>`),e.retencionIva>0&&o.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. IVA: ${Ne(B(a.cliente?.porcentajeRetencionIva??0))}</td>
        <td class="fx-amount fx-retencion">- ${Ne(j$1(e.retencionIva))}</td>
      </tr>`),e.retencionIslr>0&&o.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. ISLR: ${Ne(B(a.alicuotaIslr))}</td>
        <td class="fx-amount fx-retencion">- ${Ne(j$1(e.retencionIslr))}</td>
      </tr>`),(e.retencionIva>0||e.retencionIslr>0)&&o.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Neto a pagar:</td>
        <td class="fx-amount fx-total-final">${Ne(j$1(e.netoAPagar))}</td>
      </tr>`),o.join(``)}function I(a){return a.emisor}function j(a){let e=I(a),o=a.mostrarCabeceraPie,r=a.mostrarFirmaSello,f=a.mostrarMarcaAgua,m=o?`<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${s(`factura/emisor.png`)}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${Ne(e.nombre)}</div>
        <div>RIF: ${Ne(e.rif)}</div>
        <div>Direccion: ${Ne(e.direccion)}</div>
        <div>Correo: ${Ne(e.correo)} Telefonos: ${Ne(e.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${Ne(a.formato)}</div>
        <div>N&deg; de Control</div>
        <div class="fx-control-num">${Ne(a.controlPrefijo)}${Ne(a.numeroControl)}</div>
      </div>
    </div>`:``,l=r?`<div class="fx-firma-sello">
      <img class="fx-img-firma" src="${s(`factura/firma.png`)}" alt="Firma">
      <img class="fx-img-sello" src="${s(`factura/sello.png`)}" alt="Sello">
    </div>`:``,b=o?`<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        Razon Social: <strong>${Ne(e.razonSocial)}</strong>
        ${Ne(e.razonSocialDireccion)} Telf: ${Ne(e.razonSocialTelefonos)}
        RIF: ${Ne(e.razonSocialRif)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${Ne(e.razonSocialCorreo)} &nbsp;&nbsp; Fecha: ${Ne(e.fechaControl)} &nbsp;&nbsp;
        Control desde N&deg; ${Ne(e.controlDesde)} hasta el N&deg; ${Ne(e.controlHasta)} &nbsp;&nbsp;
        Provindencia N&deg; ${Ne(e.providencia)} &nbsp;&nbsp; ${Ne(e.region)}
      </div>
      <div class="fx-original">ORIGINAL</div>
    </div>`:``;return`<div class="${f?`fx-hoja`:`fx-hoja fx-sin-marca`}">
    ${m}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${Ne(a.cliente?.nombre??``)}</strong></div>
        <div class="fx-factura-num">FACTURA: <span>${Ne(a.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${Ne(a.cliente?.rif??``)}</span></div>
        <div>Fecha de Emision: <span>${Ne(a.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${Ne(a.cliente?.telefono??``)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${Ne(a.cliente?.direccion??``)}</span></div>
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
      <tbody>${y(a)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${C(a)}
    </table>

    ${l}
    ${b}
  </div>`}function F(a){return`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${Ne(a.numero)}</title>
<style>
${x}
${w()}

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
${j(a)}
</body>
</html>`}function D(a){let e=window.open(``,`_blank`,`width=900,height=1100`);if(!e)return;e.document.open(),e.document.write(F(a));let o=()=>{e.focus(),e.print()};e.document.close();let r=Array.from(e.document.images??[]);if(r.length===0||r.every(l=>l.complete)){setTimeout(o,120);return}let f=r.length,m=()=>{f-=1,f<=0&&setTimeout(o,120)};r.forEach(l=>{l.addEventListener(`load`,m),l.addEventListener(`error`,m)})}export{n as a,j as i,D as n,s as o,T as r,x as s,A as t};