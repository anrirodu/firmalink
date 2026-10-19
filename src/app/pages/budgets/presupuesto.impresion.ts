/**
 * La hoja del presupuesto en HTML.
 *
 * Igual que la de la factura, es la única definición del formato: de aquí
 * salen la vista previa (que se pinta con `[innerHTML]`), la ventana de
 * impresión y el PDF. Si la hoja cambia, cambia en los tres sitios a la vez.
 *
 * Comparte con la factura la cabecera superior (logo de BUNKER, empresa, RIF),
 * los datos del cliente, la tabla de renglones y la tabla de totales con los
 * importes en letras. Lo que cambia es lo propio de un presupuesto:
 *
 *   · en la cabecera, el **N° de presupuesto** y su validez ocupan el sitio del
 *     N° de Control, porque un presupuesto no tiene numeración autorizada;
 *   · los totales no llevan IGTF ni retenciones, y sí el descuento comercial;
 *   · debajo de los totales van las **condiciones** (validez, entrega, garantía,
 *     forma de pago, alcance);
 *   · la firma del emisor comparte espacio con la **línea de aceptación del
 *     cliente**, que es la que devuelve firmada;
 *   · el pie lleva la nota de que el documento **no es fiscal**.
 */
import { CSS_FACTURA, HOJA_FACTURA } from '../../shared/impresion/factura-estilos';
import { escaparHtml } from '../../shared/utils/escapar-html';
// `urlAsset` resuelve las imágenes de la hoja en la ventana de impresión, que
// se abre vacía y no hereda el `base href`. Es la misma necesidad que en la
// factura, así que se reutiliza en vez de escribir una segunda versión.
import { urlAsset } from '../billing/factura.impresion';
import {
  Presupuesto,
  alicuotaIvaEfectiva,
  calcularTotalesPresupuesto,
  descuentoEfectivo,
  fechaValidezCorta,
} from './presupuesto.model';
import { formatoBs, formatoCantidad, formatoPorcentaje, montoEnLetras } from '../billing/factura.model';

/** Título del documento. El presupuesto no es "formato libre" ni "nota de entrega". */
export const TITULO_DOCUMENTO = 'PRESUPUESTO';

/** Renglones de la hoja: una fila por item, con los importes ya calculados. */
function filasItems(p: Presupuesto): string {
  const items = p.items ?? [];
  if (items.length === 0) {
    return '<tr class="fx-fila-vacia"><td colspan="4">Sin renglones cotizados.</td></tr>';
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
 * Con un descuento de cero quedan tres filas (SubTotal, IVA y Total Bs), las
 * mismas de la factura. Si hay descuento se intercala su propia fila: el
 * descuento se aplica sobre el subtotal y el IVA se calcula sobre lo que
 * realmente se cobra, así que el cliente tiene que poder leer las dos cifras.
 */
function filasTotales(p: Presupuesto): string {
  const t = calcularTotalesPresupuesto(p);
  const descuento = descuentoEfectivo(p);
  const filas: string[] = [];

  filas.push(`<tr>
        <td class="fx-son-cell" colspan="2">Valido hasta: <strong>${escaparHtml(fechaValidezCorta(p))}</strong></td>
        <td class="fx-label">SubTotal</td>
        <td class="fx-amount">${escaparHtml(formatoBs(t.subtotal))}</td>
      </tr>`);

  filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"><span class="fx-label">Son:</span> <span class="fx-son">${escaparHtml(montoEnLetras(t.total))}</span></td>
        <td class="fx-label">${descuento > 0 ? 'Descuento' : 'IVA'}: ${escaparHtml(formatoPorcentaje(descuento > 0 ? descuento : alicuotaIvaEfectiva(p)))}</td>
        <td class="fx-amount">${descuento > 0 ? '- ' : ''}${escaparHtml(formatoBs(descuento > 0 ? t.descuento : t.montoIva))}</td>
      </tr>`);

  if (descuento > 0) {
    filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label">IVA: ${escaparHtml(formatoPorcentaje(alicuotaIvaEfectiva(p)))}</td>
        <td class="fx-amount">${escaparHtml(formatoBs(t.montoIva))}</td>
      </tr>`);
  }

  filas.push(`<tr>
        <td class="fx-son-cell" colspan="2"></td>
        <td class="fx-label fx-total-final">Total Bs:</td>
        <td class="fx-amount fx-total-final">${escaparHtml(formatoBs(t.total))}</td>
      </tr>`);

  return filas.join('');
}

/** Condiciones comerciales: lo que el cliente evalúa antes de aceptar. */
function bloqueCondiciones(p: Presupuesto): string {
  const c = p.condiciones;
  if (!c) return '';

  const lineas: string[] = [];
  const linea = (etiqueta: string, valor: string) => {
    if (!valor?.trim()) return;
    lineas.push(
      `<div class="fx-cond-linea"><span class="fx-cond-etiqueta">${escaparHtml(etiqueta)}:</span> ${escaparHtml(valor)}</div>`,
    );
  };

  linea('Validez', `${formatoCantidad(c.validezDias)} dias, hasta el ${fechaValidezCorta(p)}`);
  linea('Forma de pago', c.formaPago);
  linea('Tiempo de entrega', c.tiempoEntrega);
  linea('Garantia', c.garantia);
  linea('Lugar', c.lugar);
  linea('Alcance', c.alcance);

  if (lineas.length === 0) return '';

  return `<div class="fx-condiciones">
    <div class="fx-condiciones-titulo">Condiciones</div>
    ${lineas.join('')}
  </div>`;
}

/**
 * Firmas: la del emisor a la izquierda y la línea de aceptación del cliente a
 * la derecha.
 *
 * El interruptor de firma y sello quita la firma y el sello del emisor, pero la
 * línea del cliente se imprime siempre: un presupuesto sin casilla de
 * aceptación no sirve para que el cliente lo apruebe y lo devuelva.
 */
function bloqueFirmas(p: Presupuesto): string {
  const emisor = p.mostrarFirmaSello
    ? `<img class="fx-img-firma" src="${urlAsset('factura/firma.png')}" alt="Firma">
       <img class="fx-img-sello" src="${urlAsset('factura/sello.png')}" alt="Sello">`
    : '';

  return `<div class="fx-firmas">
    <div class="fx-firma-col">
      ${emisor}
      <div class="fx-firma-linea">
        <div class="fx-firma-pie">Por ${escaparHtml(p.emisor.nombre)}</div>
      </div>
    </div>
    <div class="fx-firma-col fx-sin-imagen">
      <div class="fx-firma-linea">
        <div class="fx-firma-pie">Aprobado por el cliente &mdash; nombre, cedula y fecha</div>
      </div>
    </div>
  </div>`;
}

/**
 * La hoja completa (sin los estilos).
 *
 * Respeta los interruptores guardados en el presupuesto —cabecera y pie, firma
 * y sello, marca de agua—: son parte del documento, no de la pantalla, y por
 * eso la hoja impresa coincide con la vista previa.
 */
export function construirHojaPresupuesto(p: Presupuesto): string {
  const emisor = p.emisor;
  const mostrarCabecera = p.mostrarCabeceraPie;
  const marcaAgua = p.mostrarMarcaAgua;

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
        <div class="fx-formato">${TITULO_DOCUMENTO}</div>
        <div>N&deg; de Presupuesto</div>
        <div class="fx-doc-num">${escaparHtml(p.numero)}</div>
        <div>Valido hasta: ${escaparHtml(fechaValidezCorta(p))}</div>
      </div>
    </div>`
    : '';

  const pie = mostrarCabecera
    ? `<div class="fx-emisor">
      <div class="fx-emisor-linea"></div>
      <div class="fx-emisor-texto">
        <strong>${escaparHtml(emisor.nombre)}</strong>
        RIF: ${escaparHtml(emisor.rif)} ${escaparHtml(emisor.direccion)}
      </div>
      <div class="fx-emisor-texto">
        Email: ${escaparHtml(emisor.correo)} &nbsp;&nbsp; Telf: ${escaparHtml(emisor.telefonos)}
      </div>
      <div class="fx-no-fiscal">DOCUMENTO NO FISCAL &mdash; NO CONSTITUYE FACTURA</div>
    </div>`
    : '';

  const claseHoja = marcaAgua ? 'fx-hoja' : 'fx-hoja fx-sin-marca';

  return `<div class="${claseHoja}">
    ${cabeceraTop}

    <div class="fx-factura-header">
      <div class="fx-header-line">
        <div class="fx-cliente">Cliente: <strong>${escaparHtml(p.cliente?.nombre ?? '')}</strong></div>
        <div class="fx-factura-num">PRESUPUESTO: <span>${escaparHtml(p.numero)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>R.I.F: <span>${escaparHtml(p.cliente?.rif ?? '')}</span></div>
        <div>Fecha de Emision: <span>${escaparHtml(p.fechaTexto)}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Telefono: <span>${escaparHtml(p.cliente?.telefono ?? '')}</span></div>
        <div>Validez: <span>${escaparHtml(fechaValidezCorta(p))}</span></div>
      </div>
      <div class="fx-header-line">
        <div>Direccion: <span>${escaparHtml(p.cliente?.direccion ?? '')}</span></div>
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
      <tbody>${filasItems(p)}</tbody>
    </table>

    <table class="fx-totales">
      <colgroup>
        <col>
        <col class="fx-gap">
        <col class="fx-label">
        <col class="fx-amount">
      </colgroup>
      ${filasTotales(p)}
    </table>

    ${bloqueCondiciones(p)}
    ${bloqueFirmas(p)}
    ${pie}
  </div>`;
}

/** Documento completo (hoja + estilos) listo para imprimir o para el PDF. */
export function construirDocumentoPresupuesto(p: Presupuesto): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Presupuesto ${escaparHtml(p.numero)}</title>
<style>
${CSS_FACTURA}

  .fx-hoja {
    --fx-img-logo: url('${urlAsset('factura/emisor.png')}');
    --fx-img-marca: url('${urlAsset('factura/emisor.png')}');
    --fx-img-firma: url('${urlAsset('factura/firma.png')}');
    --fx-img-sello: url('${urlAsset('factura/sello.png')}');
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
${construirHojaPresupuesto(p)}
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
export function imprimirPresupuesto(p: Presupuesto): void {
  const ventana = window.open('', '_blank', 'width=900,height=1100');
  if (!ventana) {
    return;
  }

  ventana.document.open();
  ventana.document.write(construirDocumentoPresupuesto(p));

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
export const MEDIDAS_HOJA_PRESUPUESTO = HOJA_FACTURA;
