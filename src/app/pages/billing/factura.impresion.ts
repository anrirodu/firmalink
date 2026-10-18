/**
 * La hoja de la factura en HTML.
 *
 * Es la única definición del formato: de aquí salen la vista previa (que se
 * pinta con `[innerHTML]`), la ventana de impresión y el PDF. Si la hoja
 * cambia, cambia en los tres sitios a la vez.
 *
 * El formato es el de la plantilla de facturación: cabecera superior en el
 * margen (logo, empresa, formato y número de control), datos del cliente,
 * tabla de renglones, tabla de totales con los importes en letras, firma y
 * sello, y el pie del emisor con la razón social y el rango de control
 * autorizado.
 */
import { CSS_FACTURA, HOJA_FACTURA } from '../../shared/impresion/factura-estilos';
import { escaparHtml } from '../../shared/utils/escapar-html';
import {
  alicuotaIvaEfectiva,
  aplicarIgtf,
  calcularTotales,
  Factura,
  formatoBs,
  formatoCantidad,
  formatoPorcentaje,
  montoEnLetras,
} from './factura.model';

/** Ruta absoluta de un recurso: la ventana de impresión no hereda el `base href`. */
export function urlAsset(ruta: string): string {
  const relativa = `assets/${ruta}`;
  if (typeof document === 'undefined') {
    return relativa;
  }
  try {
    return new URL(relativa, document.baseURI).href;
  } catch (e) {
    return relativa;
  }
}

/**
 * Sustituye las imágenes de la hoja por rutas absolutas.
 *
 * Los estilos referencian las imágenes con `url('assets/...')`, que solo
 * resuelven en el documento de la aplicación. La ventana de impresión se abre
 * vacía, así que ahí hay que declararlas completas.
 */
function imagenesAbsolutas(): string {
  return `
  .fx-hoja {
    --fx-img-logo: url('${urlAsset('factura/emisor.png')}');
    --fx-img-marca: url('${urlAsset('factura/emisor.png')}');
    --fx-img-firma: url('${urlAsset('factura/firma.png')}');
    --fx-img-sello: url('${urlAsset('factura/sello.png')}');
  }`;
}

/** Renglones de la hoja: una fila por item, con los importes ya calculados. */
function filasItems(f: Factura): string {
  const items = f.items ?? [];
  if (items.length === 0) {
    return '<tr class="fx-fila-vacia"><td colspan="4">Sin renglones registrados.</td></tr>';
  }

  return items
    .map((it) => {
      const total = (Number(it.cantidad) || 0) * (Number(it.precio) || 0);
      return `<tr>
        <td class="fx-col-desc">${escaparHtml(it.descripcion)}</td>
        <td class="fx-col-cant fx-num">${escaparHtml(formatoCantidad(it.cantidad))}</td>
        <td class="fx-col-precio fx-num">${escaparHtml(formatoBs(it.precio))}</td>
        <td class="fx-col-total fx-num">${escaparHtml(formatoBs(total))}</td>
      </tr>`;
    })
    .join('');
}

/**
 * Filas de la tabla de totales.
 *
 * Con un cliente corriente —sin retenciones ni IGTF— quedan las tres filas de
 * la plantilla (SubTotal, IVA y Total Bs). Los clientes que retienen agregan
 * sus filas debajo del total: la retención no rebaja el total facturado, es un
 * pago a cuenta que el agente descuenta al pagar, y por eso se informa aparte
 * junto con el neto a pagar.
 */
function filasTotales(f: Factura): string {
  const t = calcularTotales(f);
  const filas: string[] = [];

  filas.push(`<tr>
        <td class="fx-son-cell" colspan="2">Mes: <strong>${escaparHtml(f.mes)}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${escaparHtml(formatoBs(t.subtotal))}</td>
      </tr>`);

  filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${escaparHtml(montoEnLetras(t.total))}</span></td>
        <td class="fx-label">IVA: ${escaparHtml(formatoPorcentaje(alicuotaIvaEfectiva(f)))}</td>
        <td class="fx-amount">${escaparHtml(formatoBs(t.montoIva))}</td>
      </tr>`);

  if (aplicarIgtf(f)) {
    filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IGTF: ${escaparHtml(formatoPorcentaje(f.alicuotaIgtf))}</td>
        <td class="fx-amount">${escaparHtml(formatoBs(t.montoIgtf))}</td>
      </tr>`);
  }

  filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${escaparHtml(formatoBs(t.total))}</td>
      </tr>`);

  if (t.retencionIva > 0) {
    filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. IVA: ${escaparHtml(formatoPorcentaje(f.cliente?.porcentajeRetencionIva ?? 0))}</td>
        <td class="fx-amount fx-retencion">- ${escaparHtml(formatoBs(t.retencionIva))}</td>
      </tr>`);
  }

  if (t.retencionIslr > 0) {
    filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-retencion">Ret. ISLR: ${escaparHtml(formatoPorcentaje(f.alicuotaIslr))}</td>
        <td class="fx-amount fx-retencion">- ${escaparHtml(formatoBs(t.retencionIslr))}</td>
      </tr>`);
  }

  if (t.retencionIva > 0 || t.retencionIslr > 0) {
    filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Neto a pagar:</td>
        <td class="fx-amount fx-total-final">${escaparHtml(formatoBs(t.netoAPagar))}</td>
      </tr>`);
  }

  return filas.join('');
}

/** Datos de emisor por defecto cuando la factura todavía no los tiene. */
function emisorDe(f: Factura) {
  return f.emisor;
}

/**
 * La hoja completa (sin los estilos).
 *
 * Respeta los interruptores guardados en la factura —cabecera y pie, firma y
 * sello, marca de agua—: son parte del documento, no de la pantalla, y por eso
 * la hoja impresa coincide con la vista previa.
 */
export function construirHojaFactura(f: Factura): string {
  const emisor = emisorDe(f);
  const mostrarCabecera = f.mostrarCabeceraPie;
  const mostrarFirma = f.mostrarFirmaSello;
  const marcaAgua = f.mostrarMarcaAgua;

  const cabeceraTop = mostrarCabecera
    ? `<div class="fx-header-top">
      <div class="fx-header-logo"><img src="${urlAsset('factura/emisor.png')}" alt=""></div>
      <div class="fx-header-empresa">
        <div class="fx-empresa-nombre">${escaparHtml(emisor.nombre)}</div>
        <div>RIF: ${escaparHtml(emisor.rif)}</div>
        <div>Direccion: ${escaparHtml(emisor.direccion)}</div>
        <div>Correo: ${escaparHtml(emisor.correo)} Telefonos: ${escaparHtml(emisor.telefonos)}</div>
      </div>
      <div class="fx-header-formato">
        <div class="fx-formato">${escaparHtml(f.formato)}</div>
        <div>N&deg; de Control</div>
        <div class="fx-control-num">${escaparHtml(f.controlPrefijo)}${escaparHtml(f.numeroControl)}</div>
      </div>
    </div>`
    : '';

  const firma = mostrarFirma
    ? `<div class="fx-firma-sello">
      <img class="fx-img-firma" src="${urlAsset('factura/firma.png')}" alt="Firma">
      <img class="fx-img-sello" src="${urlAsset('factura/sello.png')}" alt="Sello">
    </div>`
    : '';

  const pie = mostrarCabecera
    ? `<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        Razon Social: <strong>${escaparHtml(emisor.razonSocial)}</strong>
        ${escaparHtml(emisor.razonSocialDireccion)} Telf: ${escaparHtml(emisor.razonSocialTelefonos)}
        RIF: ${escaparHtml(emisor.razonSocialRif)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${escaparHtml(emisor.razonSocialCorreo)} &nbsp;&nbsp; Fecha: ${escaparHtml(emisor.fechaControl)} &nbsp;&nbsp;
        Control desde N&deg; ${escaparHtml(emisor.controlDesde)} hasta el N&deg; ${escaparHtml(emisor.controlHasta)} &nbsp;&nbsp;
        Provindencia N&deg; ${escaparHtml(emisor.providencia)} &nbsp;&nbsp; ${escaparHtml(emisor.region)}
      </div>
      <div class="fx-original">ORIGINAL</div>
    </div>`
    : '';

  const claseHoja = marcaAgua ? 'fx-hoja' : 'fx-hoja fx-sin-marca';

  return `<div class="${claseHoja}">
    ${cabeceraTop}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${escaparHtml(f.cliente?.nombre ?? '')}</strong></div>
        <div class="fx-factura-num">FACTURA: <span>${escaparHtml(f.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${escaparHtml(f.cliente?.rif ?? '')}</span></div>
        <div>Fecha de Emision: <span>${escaparHtml(f.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${escaparHtml(f.cliente?.telefono ?? '')}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${escaparHtml(f.cliente?.direccion ?? '')}</span></div>
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
      <tbody>${filasItems(f)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${filasTotales(f)}
    </table>

    ${firma}
    ${pie}
  </div>`;
}

/** Documento completo (hoja + estilos) listo para imprimir o para el PDF. */
export function construirDocumentoFactura(f: Factura): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${escaparHtml(f.numero)}</title>
<style>
${CSS_FACTURA}
${imagenesAbsolutas()}

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
${construirHojaFactura(f)}
</body>
</html>`;
}

/**
 * Abre el diálogo de impresión con la hoja en una ventana aparte.
 *
 * La ventana es un documento limpio: no arrastra la barra lateral ni el panel
 * de la aplicación, así que la hoja sale sola y con el tamaño de papel que
 * declara `@page`.
 */
export function imprimirFactura(f: Factura): void {
  const ventana = window.open('', '_blank', 'width=900,height=1100');
  if (!ventana) {
    return;
  }

  ventana.document.open();
  ventana.document.write(construirDocumentoFactura(f));

  // Las imágenes (firma, sello y logo) tienen que estar cargadas antes de
  // imprimir o salen en blanco.
  const imprimir = () => {
    ventana.focus();
    ventana.print();
  };
  ventana.document.close();

  const imagenes = Array.from(ventana.document.images ?? []);
  if (imagenes.length === 0 || imagenes.every((img) => img.complete)) {
    setTimeout(imprimir, 120);
    return;
  }

  let pendientes = imagenes.length;
  const listo = () => {
    pendientes -= 1;
    if (pendientes <= 0) {
      setTimeout(imprimir, 120);
    }
  };
  imagenes.forEach((img) => {
    img.addEventListener('load', listo);
    img.addEventListener('error', listo);
  });
}

/** Alto y ancho de la hoja, en centímetros (los usa el servicio de PDF). */
export const MEDIDAS_HOJA = HOJA_FACTURA;
