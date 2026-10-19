import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';
import {
  Factura,
  FacturaEstado,
  calcularTotales,
  esEditable,
  formatearControl,
  formatoBs,
  infoEstadoFactura,
  motivoBloqueo,
  validarFactura,
} from '../factura.model';
import { FacturaService } from '../factura.service';
import { imprimirFactura } from '../factura.impresion';
import { generarPdfFactura, type PdfFacturaGenerado } from '../factura-pdf';
import { construirCorreoFactura } from '../factura-correo';
import { pedirDestinatariosCorreoFactura } from '../enviar-correo-factura.dialog';
import { cargarLogoCorreo } from '../../agreements/acuerdo-pdf';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { PrivilegiosService } from '../../../shared/services/privilegios.service';
import { CorreoError, CorreoService } from '../../../shared/services/correo.service';

/**
 * LIST BILLING — Facturas generadas.
 *
 * Lista todas las facturas de la colección `firmalink_facturas` (función
 * `_SYS_CFirmaLinkFacturas`), permite filtrarlas por texto/estado/cliente,
 * emitir, anular y eliminar borradores sin abrir el editor, y remitir una
 * factura emitida por correo con la hoja en PDF adjunto y la huella
 * SHA-256 como constancia. Elegir una factura abre el editor (una emitida
 * o anulada se abre en modo consulta).
 */

interface EstadoOpcion {
  valor: FacturaEstado;
  etiqueta: string;
  clase: string;
  icono: string;
}

interface KpiEstado {
  etiqueta: string;
  valor: number;
  clase: string;
  icono: string;
  /** Texto formateado (importes); si existe, se muestra en lugar del número */
  texto?: string;
}

@Component({
  selector: 'app-list-billing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
  templateUrl: './list-billing.component.html',
  styleUrls: ['./list-billing.component.scss'],
})
export class ListBillingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'numero',
    'control',
    'cliente',
    'estado',
    'total',
    'huella',
    'fechaEmision',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Factura>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Speed dial flotante (móvil y tablet): el botón de acción principal
   * despliega el resto de botones del encabezado, que se ocultan allí
   * porque no caben en la barra superior de una pantalla angosta.
   */
  accionesAbiertas = false;

  toggleAcciones(): void {
    this.accionesAbiertas = !this.accionesAbiertas;
  }

  /**
   * Escape cierra el speed dial. Se registra en fase de captura: hay scripts
   * globales (Bootstrap / SweetAlert) que se comen la fase de burbuja del
   * keydown, así que con un @HostListener('document:keydown.escape') el
   * evento nunca llegaba al componente.
   */
  private readonly alPulsarEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.accionesAbiertas) {
      this.accionesAbiertas = false;
    }
  };

  /** Cierra el speed dial si el clic cae fuera de él. */
  @HostListener('document:click', ['$event'])
  cerrarAccionesPorClicExterno(event: MouseEvent): void {
    if (!this.accionesAbiertas) {
      return;
    }
    const destino = event.target as HTMLElement | null;
    if (!destino?.closest('.lb-speeddial')) {
      this.accionesAbiertas = false;
    }
  }

  cargando = false;

  /**
   * Estados que el listado muestra: el filtro por estado y el menú de
   * acciones. `eliminado` no aparece: es el resultado de "Eliminar" y esas
   * facturas salen del listado.
   */
  readonly estados: EstadoOpcion[] = [
    { valor: 'borrador', etiqueta: 'Borrador', clase: 'estado-borrador', icono: 'edit_note' },
    { valor: 'emitida', etiqueta: 'Emitida', clase: 'estado-emitida', icono: 'receipt_long' },
    { valor: 'anulada', etiqueta: 'Anulada', clase: 'estado-anulada', icono: 'block' },
  ];

  kpis: KpiEstado[] = [];

  constructor(
    private facturas: FacturaService,
    private correo: CorreoService,
    private router: Router,
    private notificar: NotificacionService,
    private privilegios: PrivilegiosService,
  ) {}

  /**
   * ¿La sesión trae este privilegio (`Create`/`Read`/`Update`/`Delete`) para el
   * listado de facturas? La plantilla lo usa para mostrar sólo lo permitido.
   */
  Privilegio(metodo: string): boolean {
    return this.privilegios.tiene(metodo);
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.alPulsarEscape, true);

    // "Ver facturas" desde la ficha de un cliente: el código viaja en el
    // estado de navegación (no en la URL) y la consulta la resuelve el
    // servidor.
    const pedido = this.clienteDeLaNavegacion();
    if (pedido?.codigo) {
      this.clienteConsultado = pedido.codigo;
      this.filtroCliente = pedido.codigo;
      this.nombreClientePedido = pedido.nombre ?? '';
    }

    void this.cargar();
  }

  /**
   * Cliente pedido al abrir el listado.
   *
   * `history.state` conserva lo que envió `Router.navigate({ state })` —incluso
   * si se recarga la página— y `getCurrentNavigation()` lo cubre en la misma
   * navegación.
   */
  private clienteDeLaNavegacion(): { codigo: string; nombre?: string } | null {
    const estado =
      (this.router.getCurrentNavigation()?.extras?.state as any) ??
      (typeof history !== 'undefined' ? (history.state as any) : null);
    const codigo = estado?.cliente ?? '';
    return codigo ? { codigo: String(codigo), nombre: estado?.clienteNombre ?? '' } : null;
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.alPulsarEscape, true);
  }

  /**
   * Carga el listado desde el servidor (con avisos de degradación a local).
   *
   * @param codigoCliente acota la consulta a un cliente; vacío = todos.
   */
  async cargar(codigoCliente: string = this.clienteConsultado): Promise<void> {
    this.clienteConsultado = codigoCliente;
    this.filtroCliente = codigoCliente;
    this.cargando = true;
    try {
      const lista = codigoCliente
        ? await this.facturas.listarPorCliente(codigoCliente)
        : await this.facturas.listar();
      this.dataSource.data = this.ordenar(lista);
      this.clientesEnLista = this.clientesDelListado(this.dataSource.data);
      this.aplicarFiltros();
    } catch (e) {
      this.notificar.error(
        'No se pudo cargar el listado de facturas',
        NotificacionService.detalle(e),
      );
    } finally {
      this.cargando = false;
      this.calcularKpis();
      // Los paginadores/sorters se enlazan cuando la tabla ya fue renderizada
      setTimeout(() => {
        this.dataSource.paginator = this.paginator ?? null;
        this.dataSource.sort = this.sort ?? null;
        this.dataSource.sortingDataAccessor = (item, propiedad) => {
          if (propiedad === 'fechaEmision') {
            return new Date(item.fechaEmision ?? '').getTime() || 0;
          }
          if (propiedad === 'total') {
            return this.totalDe(item);
          }
          // El cliente se ordena por nombre (la celda muestra más de un dato)
          if (propiedad === 'cliente') {
            return (item.cliente?.nombre ?? '').toLowerCase();
          }
          if (propiedad === 'control') {
            return item.numeroControl ?? '';
          }
          return String((item as unknown as Record<string, unknown>)[propiedad] ?? '').toLowerCase();
        };
        this.aplicarFiltros();
      });
    }
  }

  /** Más recientes primero */
  private ordenar(lista: Factura[]): Factura[] {
    return [...lista].sort(
      (a, b) => new Date(b.fechaEmision ?? '').getTime() - new Date(a.fechaEmision ?? '').getTime(),
    );
  }

  /** Filtro combinado: texto libre + estado + cliente seleccionado */
  private aplicarFiltros(): void {
    const texto = (this.filtroTexto ?? '').trim().toLowerCase();
    const estado = this.filtroEstado;
    const cliente = this.filtroCliente;

    this.dataSource.filterPredicate = (f: Factura) => {
      if (estado && f.estado !== estado) return false;
      if (cliente && f.cliente?.codigo !== cliente) return false;
      if (!texto) return true;
      const heno = [
        f.codigo,
        f.numero,
        formatearControl(f.controlPrefijo, f.numeroControl),
        f.formato,
        f.mes,
        f.fechaTexto,
        f.observaciones,
        f.usuario,
        // La copia del cliente también se busca: permite encontrar las
        // facturas de una persona por su nombre, su RIF o su cédula.
        f.cliente?.nombre,
        f.cliente?.identificacion,
        f.cliente?.rif,
        f.cliente?.codigo,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return heno.includes(texto);
    };

    this.dataSource.filter = `${texto}|${estado}|${cliente}|${Date.now()}`;
  }

  filtroTexto = '';
  filtroEstado: FacturaEstado | '' = '';
  /** Código del cliente por el que se filtra (vacío = todos) */
  filtroCliente = '';

  /**
   * Cliente por el que se está consultando el listado (vacío = todos).
   *
   * Se guarda aparte de `filtroCliente` porque la consulta se resuelve en el
   * servidor: cambiar de cliente exige volver a preguntar por sus facturas.
   */
  clienteConsultado = '';

  /**
   * Clientes que aparecen en el listado, para el filtro.
   *
   * Se arma a partir de las facturas cargadas (no de la ficha de clientes):
   * el filtro solo ofrece clientes que tienen facturas, que es lo que el
   * listado puede mostrar.
   */
  clientesEnLista: { codigo: string; nombre: string }[] = [];

  /**
   * Nombre del cliente pedido desde su ficha ("Ver facturas"). Se usa para
   * etiquetar el filtro cuando todavía no llegó ninguna factura suya.
   */
  nombreClientePedido = '';

  private clientesDelListado(lista: Factura[]): { codigo: string; nombre: string }[] {
    const porCodigo = new Map<string, string>();
    for (const f of lista) {
      const c = f.cliente;
      if (c?.codigo && !porCodigo.has(c.codigo)) {
        porCodigo.set(c.codigo, c.nombre || c.codigo);
      }
    }

    // Un cliente por el que se consultó y no tiene facturas se agrega igual:
    // el selector lo muestra y el usuario puede quitarlo.
    if (this.clienteConsultado && !porCodigo.has(this.clienteConsultado)) {
      porCodigo.set(this.clienteConsultado, this.nombreClientePedido || this.clienteConsultado);
    }

    return [...porCodigo]
      .map(([codigo, nombre]) => ({ codigo, nombre }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  onFiltroTexto(valor: string): void {
    this.filtroTexto = valor ?? '';
    this.aplicarFiltros();
  }

  onFiltroEstado(valor: FacturaEstado | ''): void {
    this.filtroEstado = valor ?? '';
    this.aplicarFiltros();
  }

  /**
   * Cambio de cliente en el filtro: si el listado ya venía acotado a otro
   * cliente hay que volver a consultar (las facturas que no son suyas no
   * están cargadas); si se vuelve a "Todos los clientes" se pide el listado
   * completo.
   */
  onFiltroCliente(valor: string): void {
    const codigo = valor ?? '';
    this.filtroCliente = codigo;
    if (codigo !== this.clienteConsultado) {
      void this.cargar(codigo);
      return;
    }
    this.aplicarFiltros();
  }

  limpiarFiltros(entrada?: HTMLInputElement): void {
    this.filtroTexto = '';
    this.filtroEstado = '';
    this.filtroCliente = '';
    const recargar = this.clienteConsultado !== '';
    this.clienteConsultado = '';
    this.nombreClientePedido = '';
    if (entrada) entrada.value = '';
    if (recargar) {
      // Con un cliente puesto el listado está acotado: hay que traerlo completo.
      void this.cargar('');
      return;
    }
    this.aplicarFiltros();
  }

  private calcularKpis(): void {
    const datos = this.dataSource.data ?? [];
    const cuenta = (estado: FacturaEstado) => datos.filter((f) => f.estado === estado).length;
    const facturado = datos
      .filter((f) => f.estado === 'emitida')
      .reduce((acc, f) => acc + this.totalDe(f), 0);

    this.kpis = [
      { etiqueta: 'Facturas', valor: datos.length, clase: 'kpi-total', icono: 'receipt_long' },
      { etiqueta: 'Borradores', valor: cuenta('borrador'), clase: 'kpi-borrador', icono: 'edit_note' },
      { etiqueta: 'Emitidas', valor: cuenta('emitida'), clase: 'kpi-emitida', icono: 'done_all' },
      { etiqueta: 'Anuladas', valor: cuenta('anulada'), clase: 'kpi-anulada', icono: 'block' },
      {
        etiqueta: 'Facturado',
        valor: facturado,
        clase: 'kpi-facturado',
        icono: 'payments',
        texto: formatoBs(facturado) + ' Bs',
      },
    ];
  }

  // --- Presentación ---

  etiquetaEstado(estado: FacturaEstado): string {
    return infoEstadoFactura(estado).etiqueta;
  }

  claseEstado(estado: FacturaEstado): string {
    return this.estados.find((e) => e.valor === estado)?.clase ?? 'estado-desconocido';
  }

  iconoEstado(estado: FacturaEstado): string {
    return infoEstadoFactura(estado).icono;
  }

  huellaCorta(f: Factura): string {
    return (f.huella ?? '').slice(0, 12);
  }

  /** Número de control como se imprime en la hoja: 00-0000007 */
  controlTexto(f: Factura): string {
    return formatearControl(f.controlPrefijo, f.numeroControl);
  }

  /** Total facturado de la factura (los congelados al emitir mandan) */
  totalDe(f: Factura): number {
    return f.totales ? f.totales.total : calcularTotales(f).total;
  }

  totalTexto(f: Factura): string {
    const total = this.totalDe(f);
    return total > 0 ? formatoBs(total) + ' Bs' : '—';
  }

  /**
   * Iniciales del cliente, para el avatar de la columna.
   * Se toman las dos primeras palabras con letra o dígito, para que "Inversiones
   * Demo, C.A." dé "ID" y no "I,".
   */
  inicialesCliente(f: Factura): string {
    const palabras = (f.cliente?.nombre ?? '').split(/\s+/).filter((p) => /^[\p{L}\d]/u.test(p));
    return palabras
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');
  }

  /** Detalle del cliente para el tooltip de la celda */
  detalleCliente(f: Factura): string {
    const c = f.cliente;
    if (!c) {
      return 'Sin cliente asignado';
    }
    return [c.identificacion, c.rif ? `RIF ${c.rif}` : '', c.codigo, c.correo]
      .filter(Boolean)
      .join(' — ');
  }

  /** "hace 5 min", "ayer 14:30"... a partir de la fecha de emisión */
  hace(f: Factura): string {
    const fecha = f.fechaEmision;
    if (!fecha) return '—';
    const ms = Date.now() - new Date(fecha).getTime();
    if (isNaN(ms)) return '—';
    const min = Math.floor(ms / 60000);
    if (min < 1) return 'hace instantes';
    if (min < 60) return `hace ${min} min`;
    const horas = Math.floor(min / 60);
    if (horas < 24) return `hace ${horas} h`;
    const dias = Math.floor(horas / 24);
    if (dias === 1) return 'ayer';
    if (dias < 30) return `hace ${dias} días`;
    return new Date(fecha).toLocaleDateString('es-VE');
  }

  /** Fecha absoluta para el tooltip */
  fechaAbsoluta(f: Factura): string {
    const fecha = f.fechaEmision;
    if (!fecha) return 'Sin fecha de emisión';
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? fecha : d.toLocaleDateString('es-VE');
  }

  // --- Acciones ---

  /** ¿La factura admite edición? (emitida y anulada son documentos cerrados) */
  editable(f: Factura): boolean {
    return esEditable(f?.estado);
  }

  /** Motivo por el que una factura no admite edición (para el tooltip) */
  notaBloqueo(f: Factura): string {
    return esEditable(f?.estado)
      ? 'Abrir esta factura en el editor'
      : `${motivoBloqueo(f?.estado)} Se abre en modo consulta.`;
  }

  /**
   * Continúa la edición (o consulta) de una factura elegida de la lista.
   *
   * El listado trae una proyección liviana: se relee el documento completo y
   * se pasa su código por sessionStorage, igual que en acuerdos.
   */
  async editar(f: Factura): Promise<void> {
    if (!f?.codigo) {
      this.notificar.aviso('Factura sin código', 'No se puede abrir una factura sin código.');
      return;
    }

    this.cargando = true;
    try {
      const doc = await this.facturas.obtener(f.codigo);
      if (!doc) {
        await this.notificar.errorModal(
          'No se pudo abrir la factura',
          `No se encontró <strong>${f.codigo}</strong> en el servidor ni en la copia local de este navegador.`,
        );
        return;
      }
      this.facturas.marcarParaEditar(doc.codigo);
      await this.router.navigate(['/billing/new']);
    } catch (e) {
      this.notificar.errorModal(
        'No se pudo abrir la factura',
        `Error inesperado al leer <strong>${f.codigo}</strong>: ${NotificacionService.detalle(e)}.`,
      );
    } finally {
      this.cargando = false;
    }
  }

  /** Abre el editor en blanco (factura nueva) */
  async nuevaFactura(): Promise<void> {
    this.facturas.marcarParaEditar('');
    await this.router.navigate(['/billing/new']);
  }

  /**
   * Imprime la factura con su hoja de 21,7 × 28 cm. Desde el diálogo de
   * impresión también puede guardarse como PDF.
   */
  async imprimir(f: Factura): Promise<void> {
    if (!f?.codigo) {
      this.notificar.aviso('Factura sin código', 'No se puede imprimir una factura sin código.');
      return;
    }
    this.cargando = true;
    try {
      // El listado es liviano: se relee el documento completo para imprimirlo
      const doc = (await this.facturas.obtener(f.codigo)) ?? f;
      imprimirFactura(doc);
    } catch (e) {
      this.notificar.error(
        'No se pudo imprimir la factura',
        NotificacionService.detalle(e),
      );
    } finally {
      this.cargando = false;
    }
  }

  // --- Emitir y anular ---

  /** ¿Se puede emitir esta factura desde la lista? */
  puedeEmitir(f: Factura): boolean {
    return !!f?.codigo && f.estado === 'borrador';
  }

  /** ¿Se puede anular esta factura desde la lista? */
  puedeAnular(f: Factura): boolean {
    return !!f?.codigo && f.estado === 'emitida';
  }

  /**
   * Emite un borrador elegido de la lista.
   *
   * Se relee el documento completo, se validan los datos mínimos (cliente,
   * renglones, totales) y se guarda congelando totales y huella, igual que
   * el editor.
   */
  async emitir(f: Factura): Promise<void> {
    if (!this.puedeEmitir(f)) return;

    this.cargando = true;
    let doc: Factura | null = null;
    try {
      doc = (await this.facturas.obtener(f.codigo)) ?? f;

      const problemas = validarFactura(doc);
      if (problemas.length > 0) {
        await Swal.fire({
          icon: 'info',
          title: 'La factura no está lista para emitir',
          html:
            '<div style="text-align:left;font-size:13px;color:#546e7a">' +
            problemas.map((p) => `• ${p.mensaje}`).join('<br>') +
            '</div><br><small>Ábrela en el editor para completarla.</small>',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#0c2d48',
        });
        return;
      }

      const controlFuera =
        !!doc.numeroControl &&
        (() => {
          const n = parseInt(String(doc!.numeroControl).replace(/\D/g, '') || '0', 10);
          const desde = parseInt(String(doc!.emisor.controlDesde).replace(/\D/g, '') || '0', 10);
          const hasta = parseInt(String(doc!.emisor.controlHasta).replace(/\D/g, '') || '0', 10);
          return n < desde || n > hasta;
        })();

      const confirmar = await Swal.fire({
        icon: 'question',
        title: `¿Emitir la factura ${doc.numero}?`,
        html:
          'La factura quedará <strong>cerrada</strong>: no admitirá más ediciones y su numeración sale declarada.' +
          (controlFuera
            ? `<br><br><span style="color:#b26a00"><small>El control ${this.controlTexto(doc)} está fuera del rango autorizado (${doc.emisor.controlDesde} – ${doc.emisor.controlHasta}).</small></span>`
            : ''),
        showCancelButton: true,
        confirmButtonText: 'Sí, emitir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0c2d48',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
      });
      if (!confirmar.isConfirmed) return;

      const guardado = await this.facturas.guardar({ ...doc, estado: 'emitida' });
      if (!guardado) return;

      this.refrescarFila(guardado);
      this.notificar.exito(
        'Factura emitida',
        `La factura ${guardado.numero} quedó emitida y ya no admite ediciones.`,
      );
    } catch (e) {
      this.notificar.error('No se pudo emitir la factura', NotificacionService.detalle(e));
    } finally {
      this.cargando = false;
    }
  }

  /** Anula una factura emitida desde la lista (estado terminal). */
  async anular(f: Factura): Promise<void> {
    if (!this.puedeAnular(f)) return;

    const confirmar = await Swal.fire({
      icon: 'warning',
      title: '¿Anular la factura?',
      html: `La factura <strong>${f.numero}</strong> queda sin efecto. Su número no se reutiliza.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!confirmar.isConfirmed) return;

    const ok = await this.facturas.cambiarEstado(f.codigo, 'anulada', f.estado);
    if (ok) {
      this.refrescarFila({ ...f, estado: 'anulada' });
      this.notificar.exito('Factura anulada', `La factura ${f.numero} quedó anulada.`);
    }
  }

  // --- Envío por correo ---

  /**
   * ¿Se puede enviar la factura por correo?
   *
   * Solo facturas EMITIDAS: el envío difunde un documento fiscal cerrado, con
   * su numeración declarada y su huella. Un borrador puede cambiar y una
   * anulada ya no tiene efecto, así que ninguna de las dos se envía.
   */
  puedeEnviarCorreo(f: Factura): boolean {
    return !!f?.codigo && f.estado === 'emitida';
  }

  /** Motivo por el que una factura no admite envío por correo (tooltip) */
  notaEnviarCorreo(f: Factura): string {
    if (this.puedeEnviarCorreo(f)) {
      return 'Enviar la factura emitida por correo, con la hoja en PDF adjunto';
    }
    if (f?.estado === 'anulada') {
      return 'Una factura anulada no se envía por correo: ya no tiene efecto.';
    }
    return 'Solo se envían por correo las facturas emitidas.';
  }

  /**
   * Envía la factura por correo (servicio de correo de Sandra Server / Resend)
   * con la hoja completa como PDF adjunto y reproducida en el cuerpo.
   */
  async enviarCorreo(f: Factura): Promise<void> {
    if (!f?.codigo) {
      this.notificar.aviso('Factura sin código', 'No se puede enviar una factura sin código.');
      return;
    }
    if (!this.puedeEnviarCorreo(f)) {
      this.notificar.aviso('Envío no permitido', this.notaEnviarCorreo(f));
      return;
    }

    const destinatarios = await pedirDestinatariosCorreoFactura(f);
    if (!destinatarios) return;

    this.cargando = true;
    try {
      // El listado es liviano: se relee el documento completo para el PDF
      const doc = (await this.facturas.obtener(f.codigo)) ?? f;
      // El PDF se arma antes que el cuerpo: el mensaje incrusta sus hojas
      const pdf = await this.prepararPdfFactura(doc);
      const logo = await cargarLogoCorreo();
      const cuerpo = construirCorreoFactura(
        doc,
        destinatarios.mensaje,
        pdf?.paginas ?? [],
        logo?.nombre,
        pdf?.totalPaginas,
      );
      const adjunto = pdf?.adjunto;
      // Las hojas y el logo viajan como imágenes incrustadas (Content-ID)
      const adjuntosInline = [...(pdf?.paginas ?? []), ...(logo ? [logo] : [])];

      const resultado = await this.correo.enviar({
        para: destinatarios.para,
        cc: destinatarios.cc,
        asunto: cuerpo.asunto,
        html: cuerpo.html,
        texto: cuerpo.texto,
        adjunto,
        adjuntosInline,
        idempotencia: `${doc.codigo}:${doc.huella ?? ''}:${Date.now()}`,
      });

      await Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        html:
          `La factura <strong>${doc.numero}</strong> se envió a:<br>` +
          `<small>${resultado.para.join(', ')}</small><br>` +
          (adjunto ? `<small>Adjunto: ${adjunto.nombre}</small><br>` : '') +
          `<br><small style="color:#9e9e9e">Identificador del proveedor: ${resultado.id || 'sin identificar'}</small>`,
        confirmButtonColor: '#0c2d48',
      });
    } catch (e) {
      await this.reportarFalloCorreo(e, f.codigo);
    } finally {
      this.cargando = false;
    }
  }

  /**
   * Convierte la factura en un PDF de 21,7 × 28 cm. Si la conversión falla no
   * se bloquea el envío: se avisa y el correo sale sin adjunto ni imágenes.
   */
  private async prepararPdfFactura(doc: Factura): Promise<PdfFacturaGenerado | undefined> {
    try {
      return await generarPdfFactura(doc);
    } catch (e) {
      console.error('[ListBilling] No se pudo generar el PDF de la factura:', e);
      this.notificar.aviso(
        'El correo saldrá sin el PDF adjunto',
        `No se pudo generar el archivo PDF de la factura ${doc.numero} (${NotificacionService.detalle(e)}).`,
      );
      return undefined;
    }
  }

  /** Presenta el fallo de correo con el detalle del servidor y vías alternas */
  private async reportarFalloCorreo(e: unknown, codigo: string): Promise<void> {
    const esCorreo = e instanceof CorreoError;
    const mensaje = esCorreo ? e.message : NotificacionService.detalle(e);
    const noHabilitado = esCorreo && e.noHabilitado;
    const rechazoProveedor = esCorreo && e.rechazoProveedor;

    const ayudas: string[] = [];
    if (noHabilitado) {
      ayudas.push(
        'El envío de correo está deshabilitado en el servidor: revise la sección [email] de sandra.ini (enabled y api_key de Resend).',
      );
    }
    if (rechazoProveedor) {
      ayudas.push(
        'Con el remitente de prueba de Resend (onboarding@resend.dev) solo se entrega al correo dueño de la cuenta; para enviar a otros destinatarios hay que verificar el dominio en Resend.',
      );
    }

    const confirmar = await Swal.fire({
      icon: 'error',
      title: 'No se pudo enviar el correo',
      html:
        `La factura <strong>${codigo}</strong> no se envió.<br><br>` +
        `<div style="text-align:left;font-size:12px;color:#546e7a">${mensaje}</div>` +
        (ayudas.length
          ? `<div style="text-align:left;font-size:12px;color:#8a6d3b;background:#fcf8e3;border-radius:8px;padding:8px 10px;margin-top:10px">${ayudas.join('<br><br>')}</div>`
          : ''),
      showCancelButton: true,
      confirmButtonText: 'Reintentar',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#0c2d48',
    });

    if (confirmar.isConfirmed) {
      const factura = this.dataSource.data.find((x) => x.codigo === codigo);
      if (factura) await this.enviarCorreo(factura);
    }
  }

  // --- Eliminación (borrado lógico) ---

  /**
   * ¿Se puede eliminar la factura?
   * Una factura emitida no se elimina nunca: su numeración está declarada.
   * En su lugar puede anularse desde el menú de acciones.
   */
  sePuedeEliminar(f: Factura): boolean {
    return !!f?.codigo && f?.estado !== 'emitida';
  }

  /** Motivo por el que una factura no admite eliminarse (tooltip) */
  notaEliminar(f: Factura): string {
    return this.sePuedeEliminar(f)
      ? 'Eliminar esta factura del listado (borrado lógico)'
      : 'Una factura emitida no se puede eliminar: su numeración está declarada. Puede anularse.';
  }

  /**
   * Elimina la factura de la lista.
   *
   * El backend (`ccoleccion`) no admite borrados físicos, así que el registro
   * se actualiza con el estado `eliminado` y deja de aparecer en el listado,
   * conservándose para la trazabilidad.
   */
  async eliminar(f: Factura): Promise<void> {
    if (!f?.codigo) return;

    if (!this.sePuedeEliminar(f)) {
      this.notificar.aviso('Factura emitida: no se puede eliminar', this.notaEliminar(f));
      return;
    }

    const confirmar = await Swal.fire({
      icon: 'warning',
      title: `¿Eliminar la factura ${f.numero}?`,
      html:
        `La factura <strong>${f.numero}</strong> dejará de aparecer en el listado ` +
        'y <strong>no se contará</strong> en los indicadores.<br><br>' +
        '<small>El registro se conserva en el sistema con el estado eliminado ' +
        '(la huella SHA-256 no se borra).</small>',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b3261e',
    });

    if (!confirmar.isConfirmed) return;

    const ok = await this.facturas.eliminar(f.codigo, f.estado);
    if (!ok) return;

    this.dataSource.data = this.dataSource.data.filter((x) => x.codigo !== f.codigo);
    this.aplicarFiltros();
    this.calcularKpis();
    this.notificar.exito('Factura eliminada', `La factura ${f.numero} salió del listado.`);
  }

  /** Copia la huella completa al portapapeles */
  copiarHuella(f: Factura): void {
    const huella = f.huella ?? '';
    if (!huella) {
      this.notificar.aviso('Sin huella', `La factura ${f.numero} todavía no tiene huella calculada.`);
      return;
    }
    navigator.clipboard
      ?.writeText(huella)
      .then(() => this.notificar.exito('Huella copiada', `${huella.slice(0, 24)}…`))
      .catch(() => this.notificar.aviso('No se pudo copiar la huella', 'Copie el texto manualmente.'));
  }

  /** Actualiza la fila en la tabla y los KPIs tras un cambio de estado */
  private refrescarFila(factura: Factura): void {
    this.dataSource.data = this.dataSource.data.map((f) =>
      f.codigo === factura.codigo ? { ...f, ...factura } : f,
    );
    this.aplicarFiltros();
    this.calcularKpis();
  }
}
