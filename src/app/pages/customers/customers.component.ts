import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
  CATEGORIAS,
  CONDICIONES_FISCALES,
  CategoriaCliente,
  Cliente,
  CondicionFiscal,
  ESTADOS_CLIENTE,
  EstadoCliente,
  estaEliminado,
  formatearDocumento,
  infoCategoria,
  infoCondicion,
  nombreCliente,
} from './cliente.model';
import { ClienteService } from './cliente.service';
import { CustomerFormComponent, SolicitudAbrirCliente } from './customer-form/customer-form.component';
import { PantallaConFormulario } from './salir-de-clientes.guard';
import { NotificacionService } from '../../shared/services/notificacion.service';
import { PrivilegiosService } from '../../shared/services/privilegios.service';
import { escaparHtml } from '../../shared/utils/escapar-html';

interface Kpi {
  id: string;
  etiqueta: string;
  valor: number;
  icono: string;
  activo: boolean;
}

/** Ficha abierta en el modal (null = cerrado) */
interface FichaAbierta {
  cliente: Cliente | null;
  restaurar: boolean;
}

type EstadoVisible = Exclude<EstadoCliente, 'eliminado'>;

const PLURAL_CATEGORIA: Record<CategoriaCliente, string> = {
  V: 'Nacionales',
  E: 'Extranjeros',
  J: 'Jurídicos',
  G: 'Gobierno',
  D: 'Diplomáticos',
  C: 'Comunales',
};

/** Minúsculas y sin acentos: "Pérez" se encuentra buscando "perez" */
function normalizarBusqueda(texto: string): string {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * CUSTOMERS — Clientes registrados.
 *
 * Listado con indicadores por categoría (V, E, J, G, D, C), filtros por
 * texto, categoría, condición ante el SENIAT y estado, y la ficha completa
 * del cliente en un modal (`app-customer-form`).
 *
 * La app es zoneless: el listado y los filtros son signals y la tabla se
 * alimenta de un `computed`, así cualquier cambio asíncrono se pinta solo.
 */
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
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
    CustomerFormComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, AfterViewInit, OnDestroy, PantallaConFormulario {
  readonly displayedColumns = [
    'codigo',
    'cliente',
    'identificacion',
    'categoria',
    'condicion',
    'contacto',
    'estado',
    'acciones',
  ];

  readonly categorias = CATEGORIAS;
  readonly condiciones = CONDICIONES_FISCALES;
  readonly estados = ESTADOS_CLIENTE;
  readonly nombreCliente = nombreCliente;
  readonly formatearDocumento = formatearDocumento;

  readonly dataSource = new MatTableDataSource<Cliente>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  /** Todos los clientes leídos, incluidos los eliminados (numeración y duplicados) */
  readonly clientes = signal<Cliente[]>([]);
  readonly cargando = signal(false);
  /** Se está leyendo la ficha completa de un cliente */
  readonly abriendo = signal(false);
  readonly ficha = signal<FichaAbierta | null>(null);
  /** Speed dial flotante (móvil y tablet) */
  readonly accionesAbiertas = signal(false);

  // — Filtros —
  readonly filtroTexto = signal('');
  readonly filtroCategoria = signal<CategoriaCliente | ''>('');
  readonly filtroCondicion = signal<CondicionFiscal | ''>('');
  readonly filtroEstado = signal<EstadoVisible | ''>('');

  readonly visibles = computed(() => this.clientes().filter((c) => !estaEliminado(c)));

  /** Texto de búsqueda precalculado por cliente (no se recalcula en cada tecla) */
  private readonly indiceBusqueda = computed(
    () => new Map(this.visibles().map((c) => [c, this.textoBuscable(c)])),
  );

  readonly filtrados = computed(() => {
    const texto = normalizarBusqueda(this.filtroTexto());
    const categoria = this.filtroCategoria();
    const condicion = this.filtroCondicion();
    const estado = this.filtroEstado();
    const indice = this.indiceBusqueda();
    return this.visibles().filter(
      (c) =>
        (!categoria || c.categoria === categoria) &&
        (!condicion || c.condicionFiscal === condicion) &&
        (!estado || c.estado === estado) &&
        (!texto || (indice.get(c) ?? '').includes(texto)),
    );
  });

  readonly kpis = computed<Kpi[]>(() => {
    const lista = this.visibles();
    const categoria = this.filtroCategoria();
    const condicion = this.filtroCondicion();
    return [
      {
        id: 'total',
        etiqueta: 'Clientes',
        valor: lista.length,
        icono: 'contacts',
        activo: !categoria && !condicion,
      },
      ...CATEGORIAS.map((cat) => ({
        id: cat.valor,
        etiqueta: PLURAL_CATEGORIA[cat.valor],
        valor: lista.filter((c) => c.categoria === cat.valor).length,
        icono: cat.icono,
        activo: categoria === cat.valor,
      })),
      {
        id: 'especial',
        etiqueta: 'Contrib. especiales',
        valor: lista.filter((c) => c.condicionFiscal === 'especial').length,
        icono: 'verified',
        activo: condicion === 'especial',
      },
    ];
  });

  private readonly servicio = inject(ClienteService);
  private readonly notificar = inject(NotificacionService);
  private readonly router = inject(Router);
  private readonly privilegios = inject(PrivilegiosService);
  private readonly formulario = viewChild(CustomerFormComponent);

  /**
   * ¿La sesión trae este privilegio (`Create`/`Read`/`Update`/`Delete`) para el
   * listado de clientes? La plantilla lo usa para mostrar sólo lo permitido.
   */
  Privilegio(metodo: string): boolean {
    return this.privilegios.tiene(metodo);
  }

  /** Escape cierra el speed dial (fase de captura, igual que en acuerdos). */
  private readonly alPulsarEscape = (evento: KeyboardEvent): void => {
    if (evento.key === 'Escape' && this.accionesAbiertas()) {
      this.accionesAbiertas.set(false);
    }
  };

  constructor() {
    // La tabla siempre refleja el resultado de los filtros
    effect(() => {
      this.dataSource.data = this.filtrados();
    });
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.alPulsarEscape, true);
    void this.cargar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.sortingDataAccessor = (c, columna) => {
      switch (columna) {
        case 'cliente':
          return normalizarBusqueda(nombreCliente(c));
        case 'identificacion':
          return c.identificacion;
        case 'categoria':
          return c.categoria;
        case 'condicion':
          return c.condicionFiscal;
        case 'estado':
          return c.estado;
        default:
          return c.codigo;
      }
    };
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.alPulsarEscape, true);
  }

  /** Cierra el speed dial si el clic cae fuera de él */
  @HostListener('document:click', ['$event'])
  cerrarAccionesPorClicExterno(evento: MouseEvent): void {
    if (this.accionesAbiertas() && !(evento.target as HTMLElement | null)?.closest('.cu-speeddial')) {
      this.accionesAbiertas.set(false);
    }
  }

  toggleAcciones(): void {
    this.accionesAbiertas.update((abierto) => !abierto);
  }

  // ─────────────────────────── datos ───────────────────────────

  async cargar(): Promise<void> {
    this.cargando.set(true);
    try {
      const lista = await this.servicio.listar();
      // Más recientes primero (el código es correlativo)
      this.clientes.set([...lista].sort((a, b) => b.codigo.localeCompare(a.codigo)));
    } catch (e) {
      this.notificar.error('No se pudo cargar el listado de clientes', NotificacionService.detalle(e));
    } finally {
      this.cargando.set(false);
    }
  }

  private textoBuscable(c: Cliente): string {
    return normalizarBusqueda(
      [
        c.codigo,
        nombreCliente(c),
        c.nombreComercial,
        c.identificacion,
        c.rif,
        formatearDocumento(c),
        c.numeroDocumento,
        c.correo,
        c.telefonoMovil,
        c.telefonoFijo,
        c.direccion?.domicilio,
        c.direccion?.ciudad,
        c.direccion?.estado,
      ]
        .filter(Boolean)
        .join(' '),
    );
  }

  /** Reemplaza (o agrega al inicio) un cliente en el listado local */
  private actualizarLocal(doc: Cliente): void {
    this.clientes.update((lista) => {
      const i = lista.findIndex((c) => c.codigo === doc.codigo);
      return i >= 0 ? lista.map((c, j) => (j === i ? doc : c)) : [doc, ...lista];
    });
  }

  // ─────────────────────────── filtros ───────────────────────────

  private irAlInicio(): void {
    this.paginator?.firstPage();
  }

  onFiltroTexto(valor: string): void {
    this.filtroTexto.set(valor ?? '');
    this.irAlInicio();
  }

  onFiltroCategoria(valor: CategoriaCliente | ''): void {
    this.filtroCategoria.set(valor ?? '');
    this.irAlInicio();
  }

  onFiltroCondicion(valor: CondicionFiscal | ''): void {
    this.filtroCondicion.set(valor ?? '');
    this.irAlInicio();
  }

  onFiltroEstado(valor: EstadoVisible | ''): void {
    this.filtroEstado.set(valor ?? '');
    this.irAlInicio();
  }

  /** Los indicadores también filtran: categoría, especiales o todos */
  elegirKpi(kpi: Kpi): void {
    if (kpi.id === 'total') {
      this.filtroCategoria.set('');
      this.filtroCondicion.set('');
    } else if (kpi.id === 'especial') {
      this.filtroCondicion.set(kpi.activo ? '' : 'especial');
    } else {
      this.filtroCategoria.set(kpi.activo ? '' : (kpi.id as CategoriaCliente));
    }
    this.irAlInicio();
  }

  limpiarFiltros(entrada?: HTMLInputElement): void {
    this.filtroTexto.set('');
    this.filtroCategoria.set('');
    this.filtroCondicion.set('');
    this.filtroEstado.set('');
    if (entrada) {
      entrada.value = '';
    }
    this.irAlInicio();
  }

  // ─────────────────────────── presentación ───────────────────────────

  etiquetaCategoria(c: Cliente): string {
    return infoCategoria(c.categoria)?.corta ?? c.categoria;
  }

  iconoCategoria(c: Cliente): string {
    return infoCategoria(c.categoria)?.icono ?? 'help_outline';
  }

  etiquetaCondicion(c: Cliente): string {
    return infoCondicion(c.condicionFiscal)?.etiqueta ?? '—';
  }

  etiquetaEstado(estado: EstadoCliente): string {
    return this.estados.find((e) => e.valor === estado)?.etiqueta ?? estado;
  }

  iconoEstado(estado: EstadoCliente): string {
    return this.estados.find((e) => e.valor === estado)?.icono ?? 'help_outline';
  }

  iniciales(c: Cliente): string {
    const palabras = nombreCliente(c).split(/\s+/).filter((p) => /^[\p{L}\d]/u.test(p));
    return palabras
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');
  }

  subtitulo(c: Cliente): string {
    return [c.nombreComercial, c.direccion?.ciudad || c.direccion?.estado].filter(Boolean).join(' · ');
  }

  fechaActualizacion(c: Cliente): string {
    const fecha = c.actualizadoEn ?? c.creadoEn;
    const d = fecha ? new Date(fecha) : null;
    return d && !isNaN(d.getTime())
      ? `Actualizado el ${d.toLocaleString('es-VE')}${c.actualizadoPorNombre ? ' por ' + c.actualizadoPorNombre : ''}`
      : 'Sin fecha de actualización';
  }

  // ─────────────────────────── ficha (modal) ───────────────────────────

  nuevoCliente(): void {
    this.ficha.set({ cliente: null, restaurar: false });
  }

  /**
   * Abre la ficha completa. El listado trae una proyección liviana: se lee
   * el documento completo y, si no se puede, NO se abre (guardar una ficha
   * incompleta vaciaría en el servidor los campos que faltan).
   */
  async editar(c: Cliente, restaurar = false): Promise<void> {
    if (this.abriendo()) {
      return;
    }
    this.abriendo.set(true);
    try {
      this.ficha.set({ cliente: await this.servicio.obtener(c.codigo), restaurar });
    } catch (e) {
      await this.notificar.errorModal(
        'No se pudo abrir el cliente',
        `No se leyó la ficha de <strong>${escaparHtml(c.codigo)}</strong>: ` +
          escaparHtml(NotificacionService.detalle(e)),
      );
    } finally {
      this.abriendo.set(false);
    }
  }

  cerrarFicha(): void {
    this.ficha.set(null);
  }

  onGuardado(doc: Cliente): void {
    const alta = !this.ficha()?.cliente;
    const restaurado = !!this.ficha()?.restaurar;
    this.ficha.set(null);
    this.actualizarLocal(doc);
    this.notificar.exito(
      alta ? 'Cliente registrado' : restaurado ? 'Cliente restaurado' : 'Cliente actualizado',
      `${doc.codigo} · ${nombreCliente(doc)}`,
    );
  }

  /** Desde la ficha: abrir (o restaurar) al dueño de un documento repetido */
  async onAbrirCliente(solicitud: SolicitudAbrirCliente): Promise<void> {
    this.ficha.set(null);
    await this.editar(solicitud.cliente, solicitud.restaurar);
  }

  async puedeAbandonar(): Promise<boolean> {
    const formulario = this.formulario();
    return !this.ficha() || !formulario || formulario.puedeCerrarse();
  }

  // ─────────────────────────── acciones de fila ───────────────────────────

  copiarDocumento(c: Cliente): void {
    const texto = c.rif || formatearDocumento(c);
    navigator.clipboard
      ?.writeText(texto)
      .then(() => this.notificar.exito('Documento copiado', texto))
      .catch(() => this.notificar.aviso('No se pudo copiar', 'Copie el documento manualmente.'));
  }

  /**
   * Abre el listado de acuerdos acotado a este cliente.
   *
   * El código viaja en el estado de navegación (no en la URL) y el listado
   * pide sus acuerdos al servidor con `_SYS_CFirmaLinkAcuerdosCliente`.
   */
  verAcuerdos(c: Cliente): void {
    void this.router.navigate(['/agreements/list-agreement'], {
      state: { cliente: c.codigo, clienteNombre: nombreCliente(c) },
    });
  }

  async cambiarEstado(c: Cliente, estado: EstadoVisible): Promise<void> {
    if (c.estado === estado) {
      return;
    }
    const etiqueta = this.etiquetaEstado(estado);
    const confirmar = await Swal.fire({
      icon: estado === 'suspendido' ? 'warning' : 'question',
      title: `¿Marcar a ${c.codigo} como ${etiqueta.toLowerCase()}?`,
      html:
        `<strong>${escaparHtml(nombreCliente(c))}</strong> pasará de ` +
        `<strong>${escaparHtml(this.etiquetaEstado(c.estado))}</strong> a <strong>${etiqueta}</strong>.`,
      showCancelButton: true,
      confirmButtonText: `Sí, ${etiqueta.toLowerCase()}`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: estado === 'suspendido' ? '#b3261e' : '#0c2d48',
    });
    if (!confirmar.isConfirmed) {
      return;
    }

    try {
      await this.servicio.cambiarEstado(c.codigo, estado);
      this.actualizarLocal({ ...c, estado, actualizadoEn: new Date().toISOString() });
      this.notificar.exito('Estado actualizado', `${c.codigo} → ${etiqueta}.`);
    } catch (e) {
      this.notificar.error('No se pudo cambiar el estado', NotificacionService.detalle(e));
    }
  }

  /** Borrado lógico: el backend no admite borrados físicos. */
  async eliminar(c: Cliente): Promise<void> {
    const confirmar = await Swal.fire({
      icon: 'warning',
      title: `¿Eliminar ${c.codigo}?`,
      html:
        `<strong>${escaparHtml(nombreCliente(c))}</strong> dejará de aparecer en el listado ` +
        'y en los indicadores.<br><br>' +
        '<small>El registro se conserva en el sistema: si su documento se vuelve a registrar, ' +
        'podrá restaurarse con todo su historial. Los acuerdos ya emitidos a su nombre ' +
        'mantienen los datos del cliente tal como quedaron al suscribirse.</small>',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b3261e',
    });
    if (!confirmar.isConfirmed) {
      return;
    }

    try {
      await this.servicio.eliminar(c.codigo);
      this.actualizarLocal({ ...c, estado: 'eliminado', eliminado: true });
      this.notificar.exito('Cliente eliminado', `${c.codigo} ya no aparece en el listado.`);
    } catch (e) {
      this.notificar.error('No se pudo eliminar el cliente', NotificacionService.detalle(e));
    }
  }
}
