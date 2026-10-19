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
  Presupuesto,
  PresupuestoEstado,
  PresupuestoEstadoVisible,
  calcularTotalesPresupuesto,
  diasDeValidezRestantes,
  esEditable,
  estadoVisible,
  fechaValidezCorta,
  formatoBs,
  infoEstadoPresupuesto,
  motivoBloqueo,
  transicionesPermitidas,
  validarPresupuesto,
} from '../presupuesto.model';
import { PresupuestoService } from '../presupuesto.service';
import { imprimirPresupuesto } from '../presupuesto.impresion';
import { generarPdfPresupuesto, type PdfPresupuestoGenerado } from '../presupuesto-pdf';
import { construirCorreoPresupuesto } from '../presupuesto-correo';
import { pedirDestinatariosCorreoPresupuesto } from '../enviar-correo-presupuesto.dialog';
import { cargarLogoCorreo } from '../../agreements/acuerdo-pdf';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { CorreoError, CorreoService } from '../../../shared/services/correo.service';
import { PrivilegiosService } from '../../../shared/services/privilegios.service';

/**
 * LIST BUDGETS — Presupuestos generados.
 *
 * Lista todos los presupuestos de la colección `firmalink_presupuestos` (función
 * `_SYS_CFirmaLinkPresupuestos`), permite filtrarlos por texto/estado/cliente,
 * enviarlos al cliente, registrar la respuesta (aprobar/rechazar), anularlos y
 * eliminar borradores sin abrir el editor, y remitir un presupuesto enviado por
 * correo con la hoja en PDF adjunto y la huella SHA-256 como constancia.
 *
 * El estado que se muestra en cada fila es el **visible**: un presupuesto
 * enviado cuya validez ya pasó aparece como "Vencido" sin haberlo guardado así.
 */

interface EstadoOpcion {
  valor: PresupuestoEstadoVisible;
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
  selector: 'app-list-budgets',
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
  templateUrl: './list-budgets.component.html',
  styleUrls: ['./list-budgets.component.scss'],
})
export class ListBudgetsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'numero',
    'fechaEmision',
    'cliente',
    'validez',
    'estado',
    'total',
    'huella',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Presupuesto>();

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
   * acciones. `eliminado` no aparece: es el resultado de "Eliminar" y esos
   * presupuestos salen del listado. `vencido` es derivado (enviado con la
   * validez pasada), no un estado guardado.
   */
  readonly estados: EstadoOpcion[] = [
    { valor: 'borrador', etiqueta: 'Borrador', clase: 'estado-borrador', icono: 'edit_note' },
    { valor: 'enviado', etiqueta: 'Enviado', clase: 'estado-enviado', icono: 'send' },
    { valor: 'aprobado', etiqueta: 'Aprobado', clase: 'estado-aprobado', icono: 'verified' },
    { valor: 'rechazado', etiqueta: 'Rechazado', clase: 'estado-rechazado', icono: 'thumb_down' },
    { valor: 'anulado', etiqueta: 'Anulado', clase: 'estado-anulado', icono: 'block' },
    { valor: 'vencido', etiqueta: 'Vencido', clase: 'estado-vencido', icono: 'schedule' },
  ];

  kpis: KpiEstado[] = [];

  constructor(
    private presupuestos: PresupuestoService,
    private correo: CorreoService,
    private router: Router,
    private notificar: NotificacionService,
    private privilegios: PrivilegiosService,
  ) {}

  /**
   * ¿La sesión trae este privilegio para este listado?
   *
   * El menú declara `Create`/`Read`/`Update`/`Delete` para `budgets`. La
   * plantilla los usa para mostrar sólo lo permitido: crear, editar y eliminar.
   * `Read` no se comprueba aquí —la pantalla ya pasó por `authGuardGuard`—, pero
   * el servicio lo expone para quien lo necesite.
   */
  Privilegio(metodo: string): boolean {
    return this.privilegios.tiene(metodo);
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.alPulsarEscape, true);

    // "Ver presupuestos" desde la ficha de un cliente: el código viaja en el
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
        ? await this.presupuestos.listarPorCliente(codigoCliente)
        : await this.presupuestos.listar();
      this.dataSource.data = this.ordenar(lista);
      this.clientesEnLista = this.clientesDelListado(this.dataSource.data);
      this.aplicarFiltros();
    } catch (e) {
      this.notificar.error(
        'No se pudo cargar el listado de presupuestos',
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
          if (propiedad === 'validez') {
            return new Date(item.fechaValidez ?? '').getTime() || 0;
          }
          if (propiedad === 'total') {
            return this.totalDe(item);
          }
          // El cliente se ordena por nombre (la celda muestra más de un dato)
          if (propiedad === 'cliente') {
            return (item.cliente?.nombre ?? '').toLowerCase();
          }
          return String((item as unknown as Record<string, unknown>)[propiedad] ?? '').toLowerCase();
        };
        this.aplicarFiltros();
      });
    }
  }

  /** Más recientes primero */
  private ordenar(lista: Presupuesto[]): Presupuesto[] {
    return [...lista].sort(
      (a, b) => new Date(b.fechaEmision ?? '').getTime() - new Date(a.fechaEmision ?? '').getTime(),
    );
  }

  /** Filtro combinado: texto libre + estado (visible) + cliente seleccionado */
  private aplicarFiltros(): void {
    const texto = (this.filtroTexto ?? '').trim().toLowerCase();
    const estado = this.filtroEstado;
    const cliente = this.filtroCliente;

    this.dataSource.filterPredicate = (p: Presupuesto) => {
      // El estado se compara sobre el VISIBLE: así "Vencido" filtra los
      // enviados cuya validez ya pasó, que es como el usuario los ve.
      if (estado && estadoVisible(p) !== estado) return false;
      if (cliente && p.cliente?.codigo !== cliente) return false;
      if (!texto) return true;
      const heno = [
        p.codigo,
        p.numero,
        p.mes,
        p.fechaTexto,
        p.observaciones,
        p.usuario,
        // La copia del cliente también se busca: permite encontrar los
        // presupuestos de una persona por su nombre, su RIF o su cédula.
        p.cliente?.nombre,
        p.cliente?.identificacion,
        p.cliente?.rif,
        p.cliente?.codigo,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return heno.includes(texto);
    };

    this.dataSource.filter = `${texto}|${estado}|${cliente}|${Date.now()}`;
  }

  filtroTexto = '';
  filtroEstado: PresupuestoEstadoVisible | '' = '';
  /** Código del cliente por el que se filtra (vacío = todos) */
  filtroCliente = '';

  /**
   * Cliente por el que se está consultando el listado (vacío = todos).
   *
   * Se guarda aparte de `filtroCliente` porque la consulta se resuelve en el
   * servidor: cambiar de cliente exige volver a preguntar por sus presupuestos.
   */
  clienteConsultado = '';

  /**
   * Clientes que aparecen en el listado, para el filtro.
   *
   * Se arma a partir de los presupuestos cargados (no de la ficha de clientes):
   * el filtro solo ofrece clientes que tienen presupuestos, que es lo que el
   * listado puede mostrar.
   */
  clientesEnLista: { codigo: string; nombre: string }[] = [];

  /**
   * Nombre del cliente pedido desde su ficha ("Ver presupuestos"). Se usa para
   * etiquetar el filtro cuando todavía no llegó ningún presupuesto suyo.
   */
  nombreClientePedido = '';

  private clientesDelListado(lista: Presupuesto[]): { codigo: string; nombre: string }[] {
    const porCodigo = new Map<string, string>();
    for (const p of lista) {
      const c = p.cliente;
      if (c?.codigo && !porCodigo.has(c.codigo)) {
        porCodigo.set(c.codigo, c.nombre || c.codigo);
      }
    }

    // Un cliente por el que se consultó y no tiene presupuestos se agrega igual:
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

  onFiltroEstado(valor: PresupuestoEstadoVisible | ''): void {
    this.filtroEstado = valor ?? '';
    this.aplicarFiltros();
  }

  /**
   * Cambio de cliente en el filtro: si el listado ya venía acotado a otro
   * cliente hay que volver a consultar (los presupuestos que no son suyos no
   * están cargados); si se vuelve a "Todos los clientes" se pide el listado
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
    const cuenta = (estado: PresupuestoEstado) => datos.filter((p) => p.estado === estado).length;
    // "Por vencer": enviados cuya validez se agota en 7 días o menos (los ya
    // vencidos cuentan aparte, en el KPI "Vencidos").
    const porVencer = datos.filter(
      (p) => p.estado === 'enviado' && estadoVisible(p) !== 'vencido' && diasDeValidezRestantes(p) <= 7,
    ).length;
    const vencidos = datos.filter((p) => estadoVisible(p) === 'vencido').length;
    const cotizado = datos.reduce((acc, p) => acc + this.totalDe(p), 0);

    this.kpis = [
      { etiqueta: 'Presupuestos', valor: datos.length, clase: 'kpi-total', icono: 'receipt_long' },
      { etiqueta: 'Aprobados', valor: cuenta('aprobado'), clase: 'kpi-aprobado', icono: 'verified' },
      { etiqueta: 'Por vencer', valor: porVencer, clase: 'kpi-porvencer', icono: 'hourglass_top' },
      { etiqueta: 'Vencidos', valor: vencidos, clase: 'kpi-vencido', icono: 'schedule' },
      {
        etiqueta: 'Cotizado',
        valor: cotizado,
        clase: 'kpi-cotizado',
        icono: 'payments',
        texto: formatoBs(cotizado) + ' Bs',
      },
    ];
  }

  // --- Presentación ---

  /** Estado que se muestra en la fila: el guardado, o `vencido` si ya pasó */
  estadoDe(p: Presupuesto): PresupuestoEstadoVisible {
    return estadoVisible(p);
  }

  etiquetaEstado(estado: PresupuestoEstadoVisible): string {
    return infoEstadoPresupuesto(estado).etiqueta;
  }

  claseEstado(estado: PresupuestoEstadoVisible): string {
    return this.estados.find((e) => e.valor === estado)?.clase ?? 'estado-desconocido';
  }

  iconoEstado(estado: PresupuestoEstadoVisible): string {
    return infoEstadoPresupuesto(estado).icono;
  }

  /** Validez corta en pantalla: "18/11/2026" */
  validezTexto(p: Presupuesto): string {
    return fechaValidezCorta(p);
  }

  /** Clase de la celda de validez: púrpura si está vencido, rojo si está por vencer */
  claseValidez(p: Presupuesto): string {
    if (estadoVisible(p) === 'vencido') return 'validez-vencida';
    if (p.estado === 'enviado' && diasDeValidezRestantes(p) <= 7) return 'validez-por-vencer';
    return '';
  }

  /** Tooltip de la celda de validez: cuándo vence o cuánto tiempo vencida */
  notaValidez(p: Presupuesto): string {
    const dias = diasDeValidezRestantes(p);
    if (estadoVisible(p) === 'vencido') {
      return `Venció el ${fechaValidezCorta(p)} (hace ${Math.abs(dias)} día${Math.abs(dias) === 1 ? '' : 's'})`;
    }
    if (p.estado === 'enviado' && dias <= 7) {
      return `Vence el ${fechaValidezCorta(p)} (quedan ${dias} día${dias === 1 ? '' : 's'})`;
    }
    return `Vale hasta el ${fechaValidezCorta(p)}`;
  }

  huellaCorta(p: Presupuesto): string {
    return (p.huella ?? '').slice(0, 12);
  }

  /** Total cotizado del presupuesto (los congelados al enviar mandan) */
  totalDe(p: Presupuesto): number {
    return p.totales ? p.totales.total : calcularTotalesPresupuesto(p).total;
  }

  totalTexto(p: Presupuesto): string {
    const total = this.totalDe(p);
    return total > 0 ? formatoBs(total) + ' Bs' : '—';
  }

  /**
   * Iniciales del cliente, para el avatar de la columna.
   * Se toman las dos primeras palabras con letra o dígito, para que "Inversiones
   * Demo, C.A." dé "ID" y no "I,".
   */
  inicialesCliente(p: Presupuesto): string {
    const palabras = (p.cliente?.nombre ?? '').split(/\s+/).filter((pal) => /^[\p{L}\d]/u.test(pal));
    return palabras
      .slice(0, 2)
      .map((pal) => pal[0].toUpperCase())
      .join('');
  }

  /** Detalle del cliente para el tooltip de la celda */
  detalleCliente(p: Presupuesto): string {
    const c = p.cliente;
    if (!c) {
      return 'Sin cliente asignado';
    }
    return [c.identificacion, c.rif ? `RIF ${c.rif}` : '', c.codigo, c.correo]
      .filter(Boolean)
      .join(' — ');
  }

  /** "hace 5 min", "ayer 14:30"... a partir de la fecha de emisión */
  hace(p: Presupuesto): string {
    const fecha = p.fechaEmision;
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
  fechaAbsoluta(p: Presupuesto): string {
    const fecha = p.fechaEmision;
    if (!fecha) return 'Sin fecha de emisión';
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? fecha : d.toLocaleDateString('es-VE');
  }

  // --- Acciones ---

  /** ¿El presupuesto admite edición? (solo el borrador; el resto está cerrado) */
  editable(p: Presupuesto): boolean {
    return esEditable(p?.estado);
  }

  /** Motivo por el que un presupuesto no admite edición (para el tooltip) */
  notaBloqueo(p: Presupuesto): string {
    return esEditable(p?.estado)
      ? 'Abrir este presupuesto en el editor'
      : motivoBloqueo(p?.estado);
  }

  /**
   * Continúa la edición de un presupuesto borrador elegido de la lista.
   *
   * Solo los borradores se editan: cualquier otro estado es un documento
   * cerrado (ya se envió al cliente o respondió) y no se toca.
   */
  async editar(p: Presupuesto): Promise<void> {
    if (!p?.codigo) {
      this.notificar.aviso('Presupuesto sin código', 'No se puede abrir un presupuesto sin código.');
      return;
    }
    if (!esEditable(p.estado)) {
      this.notificar.aviso('Presupuesto cerrado', motivoBloqueo(p.estado));
      return;
    }

    this.presupuestos.marcarParaEditar(p.codigo);
    await this.router.navigate(['/budgets/new']);
  }

  /** Abre el editor en blanco (presupuesto nuevo) */
  async nuevaPresupuesto(): Promise<void> {
    this.presupuestos.marcarParaEditar('');
    await this.router.navigate(['/budgets/new']);
  }

  /**
   * Imprime la hoja del presupuesto (21,7 × 28 cm). Desde el diálogo de
   * impresión también puede guardarse como PDF.
   */
  async imprimir(p: Presupuesto): Promise<void> {
    if (!p?.codigo) {
      this.notificar.aviso('Presupuesto sin código', 'No se puede imprimir un presupuesto sin código.');
      return;
    }
    this.cargando = true;
    try {
      // El listado es liviano: se relee el documento completo para imprimirlo
      const doc = (await this.presupuestos.obtener(p.codigo)) ?? p;
      imprimirPresupuesto(doc);
    } catch (e) {
      this.notificar.error(
        'No se pudo imprimir el presupuesto',
        NotificacionService.detalle(e),
      );
    } finally {
      this.cargando = false;
    }
  }

  // --- Enviar al cliente ---

  /** ¿Se puede enviar este presupuesto al cliente desde la lista? (solo borradores) */
  puedeEnviar(p: Presupuesto): boolean {
    return !!p?.codigo && p.estado === 'borrador';
  }

  /**
   * Envía un borrador al cliente.
   *
   * Se relee el documento completo y se validan los datos mínimos (cliente,
   * renglones, validez, forma de pago); al confirmar, el estado pasa a
   * "enviado" y el documento queda cerrado para edición.
   */
  async enviar(p: Presupuesto): Promise<void> {
    if (!this.puedeEnviar(p)) return;

    this.cargando = true;
    try {
      const doc = (await this.presupuestos.obtener(p.codigo)) ?? p;

      const problemas = validarPresupuesto(doc);
      if (problemas.length > 0) {
        await Swal.fire({
          icon: 'info',
          title: 'El presupuesto no está listo para enviar',
          html:
            '<div style="text-align:left;font-size:13px;color:#546e7a">' +
            problemas.map((x) => `• ${x.mensaje}`).join('<br>') +
            '</div><br><small>Ábrelo en el editor para completarlo.</small>',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#0c2d48',
        });
        return;
      }

      const confirmar = await Swal.fire({
        icon: 'question',
        title: '¿Enviar el presupuesto al cliente?',
        html:
          `El presupuesto <strong>${doc.numero}</strong> será entregado al cliente. ` +
          'Los montos y la validez quedan <strong>congelados</strong>: a partir de ese momento ' +
          'el documento no admite más ediciones.',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0c2d48',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
      });
      if (!confirmar.isConfirmed) return;

      const ok = await this.presupuestos.cambiarEstado(doc.codigo, 'enviado', doc.estado);
      if (ok) {
        this.refrescarFila({ ...doc, estado: 'enviado' });
        this.notificar.exito(
          'Presupuesto enviado',
          `El presupuesto ${doc.numero} quedó enviado al cliente y ya no admite ediciones.`,
        );
      }
    } catch (e) {
      this.notificar.error('No se pudo enviar el presupuesto', NotificacionService.detalle(e));
    } finally {
      this.cargando = false;
    }
  }

  // --- Respuesta del cliente (aprobar / rechazar) ---

  /** ¿Se puede registrar la respuesta del cliente? (solo presupuestos enviados) */
  puedeResponder(p: Presupuesto): boolean {
    return !!p?.codigo && p.estado === 'enviado';
  }

  /**
   * Registra la aprobación del presupuesto por parte del cliente.
   *
   * Pregunta quién aprobó (queda asentado en el documento) y delega en
   * `responder()`, que guarda el estado junto con la constancia de la respuesta.
   */
  async aprobar(p: Presupuesto): Promise<void> {
    if (!this.puedeResponder(p)) return;

    const resultado = await Swal.fire({
      icon: 'question',
      title: `¿Aprobar el presupuesto ${p.numero}?`,
      html: 'El presupuesto quedará <strong>aprobado</strong> por el cliente.',
      input: 'text',
      inputLabel: 'Quién aprobó',
      inputPlaceholder: 'Nombre de quien aprueba, del lado del cliente',
      inputValidator: (valor) =>
        valor && valor.trim() ? undefined : 'Indique quién aprobó el presupuesto.',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!resultado.isConfirmed) return;

    const aprobadoPor = String(resultado.value ?? '').trim();
    const ok = await this.presupuestos.responder(p.codigo, 'aprobado', { aprobadoPor });
    if (ok) {
      this.refrescarFila({ ...p, estado: 'aprobado', aprobadoPor });
      this.notificar.exito(
        'Presupuesto aprobado',
        `El presupuesto ${p.numero} fue aprobado por ${aprobadoPor}.`,
      );
    }
  }

  /**
   * Registra el rechazo del presupuesto por parte del cliente.
   *
   * Pregunta el motivo (queda asentado en el documento) y delega en
   * `responder()`.
   */
  async rechazar(p: Presupuesto): Promise<void> {
    if (!this.puedeResponder(p)) return;

    const resultado = await Swal.fire({
      icon: 'warning',
      title: `¿Rechazar el presupuesto ${p.numero}?`,
      html: 'El presupuesto quedará <strong>rechazado</strong>. El motivo queda asentado en el documento.',
      input: 'text',
      inputLabel: 'Motivo del rechazo',
      inputPlaceholder: 'Ej.: fuera de alcance, fuera de plazo, precio superior al esperado',
      inputValidator: (valor) =>
        valor && valor.trim() ? undefined : 'Indique el motivo del rechazo.',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c62828',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!resultado.isConfirmed) return;

    const motivoRechazo = String(resultado.value ?? '').trim();
    const ok = await this.presupuestos.responder(p.codigo, 'rechazado', { motivoRechazo });
    if (ok) {
      this.refrescarFila({ ...p, estado: 'rechazado', motivoRechazo });
      this.notificar.exito('Presupuesto rechazado', `El presupuesto ${p.numero} fue rechazado.`);
    }
  }

  // --- Anulación ---

  /** ¿Se puede anular este presupuesto desde la lista? (enviado, aprobado o rechazado) */
  puedeAnular(p: Presupuesto): boolean {
    return !!p?.codigo && transicionesPermitidas(p.estado).includes('anulado');
  }

  /** Anula un presupuesto enviado, aprobado o rechazado desde la lista. */
  async anular(p: Presupuesto): Promise<void> {
    if (!this.puedeAnular(p)) return;

    const confirmar = await Swal.fire({
      icon: 'warning',
      title: '¿Anular el presupuesto?',
      html: `El presupuesto <strong>${p.numero}</strong> queda sin efecto. Su número no se reutiliza.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!confirmar.isConfirmed) return;

    const ok = await this.presupuestos.cambiarEstado(p.codigo, 'anulado', p.estado);
    if (ok) {
      this.refrescarFila({ ...p, estado: 'anulado' });
      this.notificar.exito('Presupuesto anulado', `El presupuesto ${p.numero} quedó anulado.`);
    }
  }

  // --- Envío por correo ---

  /**
   * ¿Se puede enviar el presupuesto por correo?
   *
   * Solo presupuestos ENVIADOS: el envío difunde un documento con los montos
   * y la validez congelados, con su huella. Un borrador puede cambiar y un
   * anulado ya no tiene efecto, así que ninguno de los dos se envía.
   */
  puedeEnviarCorreo(p: Presupuesto): boolean {
    return !!p?.codigo && p.estado === 'enviado';
  }

  /** Motivo por el que un presupuesto no admite envío por correo (tooltip) */
  notaEnviarCorreo(p: Presupuesto): string {
    if (this.puedeEnviarCorreo(p)) {
      return 'Enviar el presupuesto enviado por correo, con la hoja en PDF adjunto';
    }
    if (p?.estado === 'anulado') {
      return 'Un presupuesto anulado no se envía por correo: ya no tiene efecto.';
    }
    return 'Solo se envían por correo los presupuestos enviados.';
  }

  /**
   * Envía el presupuesto por correo (servicio de correo de Sandra Server / Resend)
   * con la hoja completa como PDF adjunto y reproducida en el cuerpo.
   */
  async enviarCorreo(p: Presupuesto): Promise<void> {
    if (!p?.codigo) {
      this.notificar.aviso('Presupuesto sin código', 'No se puede enviar un presupuesto sin código.');
      return;
    }
    if (!this.puedeEnviarCorreo(p)) {
      this.notificar.aviso('Envío no permitido', this.notaEnviarCorreo(p));
      return;
    }

    const destinatarios = await pedirDestinatariosCorreoPresupuesto(p);
    if (!destinatarios) return;

    this.cargando = true;
    try {
      // El listado es liviano: se relee el documento completo para el PDF
      const doc = (await this.presupuestos.obtener(p.codigo)) ?? p;
      // El PDF se arma antes que el cuerpo: el mensaje incrusta sus hojas
      const pdf = await this.prepararPdfPresupuesto(doc);
      const logo = await cargarLogoCorreo();
      const cuerpo = construirCorreoPresupuesto(
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
          `El presupuesto <strong>${doc.numero}</strong> se envió a:<br>` +
          `<small>${resultado.para.join(', ')}</small><br>` +
          (adjunto ? `<small>Adjunto: ${adjunto.nombre}</small><br>` : '') +
          `<br><small style="color:#9e9e9e">Identificador del proveedor: ${resultado.id || 'sin identificar'}</small>`,
        confirmButtonColor: '#0c2d48',
      });
    } catch (e) {
      await this.reportarFalloCorreo(e, p.codigo);
    } finally {
      this.cargando = false;
    }
  }

  /**
   * Convierte el presupuesto en un PDF de 21,7 × 28 cm. Si la conversión falla no
   * se bloquea el envío: se avisa y el correo sale sin adjunto ni imágenes.
   */
  private async prepararPdfPresupuesto(doc: Presupuesto): Promise<PdfPresupuestoGenerado | undefined> {
    try {
      return await generarPdfPresupuesto(doc);
    } catch (e) {
      console.error('[ListBudgets] No se pudo generar el PDF del presupuesto:', e);
      this.notificar.aviso(
        'El correo saldrá sin el PDF adjunto',
        `No se pudo generar el archivo PDF del presupuesto ${doc.numero} (${NotificacionService.detalle(e)}).`,
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
        `El presupuesto <strong>${codigo}</strong> no se envió.<br><br>` +
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
      const presupuesto = this.dataSource.data.find((x) => x.codigo === codigo);
      if (presupuesto) await this.enviarCorreo(presupuesto);
    }
  }

  // --- Eliminación (borrado lógico) ---

  /**
   * ¿Se puede eliminar el presupuesto?
   * Solo un borrador se elimina: un presupuesto que ya salió al cliente se
   * **anula** desde el menú de acciones, para conservar su rastro.
   */
  sePuedeEliminar(p: Presupuesto): boolean {
    return !!p?.codigo && esEditable(p?.estado);
  }

  /** Motivo por el que un presupuesto no admite eliminarse (tooltip) */
  notaEliminar(p: Presupuesto): string {
    return this.sePuedeEliminar(p)
      ? 'Eliminar este presupuesto del listado (borrado lógico)'
      : 'Un presupuesto que ya salió al cliente no se puede eliminar: anúlelo.';
  }

  /**
   * Elimina el presupuesto de la lista.
   *
   * El backend (`ccoleccion`) no admite borrados físicos, así que el registro
   * se actualiza con el estado `eliminado` y deja de aparecer en el listado,
   * conservándose para la trazabilidad.
   */
  async eliminar(p: Presupuesto): Promise<void> {
    if (!p?.codigo) return;

    if (!this.sePuedeEliminar(p)) {
      this.notificar.aviso('Presupuesto cerrado: no se puede eliminar', this.notaEliminar(p));
      return;
    }

    const confirmar = await Swal.fire({
      icon: 'warning',
      title: `¿Eliminar el presupuesto ${p.numero}?`,
      html:
        `El presupuesto <strong>${p.numero}</strong> dejará de aparecer en el listado ` +
        'y <strong>no se contará</strong> en los indicadores.<br><br>' +
        '<small>El registro se conserva en el sistema con el estado eliminado ' +
        '(la huella SHA-256 no se borra).</small>',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b3261e',
    });

    if (!confirmar.isConfirmed) return;

    const ok = await this.presupuestos.eliminar(p.codigo, p.estado);
    if (!ok) return;

    this.dataSource.data = this.dataSource.data.filter((x) => x.codigo !== p.codigo);
    this.aplicarFiltros();
    this.calcularKpis();
    this.notificar.exito('Presupuesto eliminado', `El presupuesto ${p.numero} salió del listado.`);
  }

  /** Copia la huella completa al portapapeles */
  copiarHuella(p: Presupuesto): void {
    const huella = p.huella ?? '';
    if (!huella) {
      this.notificar.aviso('Sin huella', `El presupuesto ${p.numero} todavía no tiene huella calculada.`);
      return;
    }
    navigator.clipboard
      ?.writeText(huella)
      .then(() => this.notificar.exito('Huella copiada', `${huella.slice(0, 24)}…`))
      .catch(() => this.notificar.aviso('No se pudo copiar la huella', 'Copie el texto manualmente.'));
  }

  /** Actualiza la fila en la tabla y los KPIs tras un cambio de estado */
  private refrescarFila(presupuesto: Presupuesto): void {
    this.dataSource.data = this.dataSource.data.map((p) =>
      p.codigo === presupuesto.codigo ? { ...p, ...presupuesto } : p,
    );
    this.aplicarFiltros();
    this.calcularKpis();
  }
}
