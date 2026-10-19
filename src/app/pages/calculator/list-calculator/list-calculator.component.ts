import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  Calculo,
  CalculoEstado,
  MonedaDivisa,
  detalleDeduccion,
  formatoBs,
  infoEstadoCalculo,
  nombreCalculo,
  nombreDeduccion,
  transicionesCalculo,
} from '../calculo.model';
import { CalculoService } from '../calculo.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { PrivilegiosService } from '../../../shared/services/privilegios.service';
import { PuedeSalir, confirmarSalida } from '../../../shared/guards/cambios-sin-guardar.guard';
import { CalculatorComponent } from '../new/calculator.component';

interface DivisaOpcion {
  /** `sin-tasa` no es una divisa: agrupa los cálculos sin tasa consultada. */
  valor: MonedaDivisa | 'sin-tasa';
  etiqueta: string;
  icono: string;
}

interface KpiCalculo {
  etiqueta: string;
  valor: number;
  clase: string;
  icono: string;
  /** Texto formateado (importes); si existe, se muestra en lugar del número */
  texto?: string;
}

/**
 * LIST CALCULATOR — Cálculos de facturación guardados.
 *
 * Lista los cálculos de la colección `firmalink_calculos` (función
 * `_SYS_CFirmaLinkCalculos`), permite filtrarlos por texto y por divisa, abrirlos
 * en la calculadora, copiar su huella SHA-256 y eliminarlos sin abrir el editor.
 *
 * La calculadora se monta como MODAL de pantalla completa: el listado es su
 * dueño (lo abre por estado, no por ruta) y controla el cierre, confirmando
 * antes si quedaron cambios sin guardar.
 *
 * La app es zoneless: el listado y los filtros son signals y la tabla se
 * alimenta de un `computed`, así que cualquier cambio asíncrono (la consulta al
 * servidor, un borrado) se pinta solo, sin esperar a un clic del usuario.
 */
@Component({
  selector: 'app-list-calculator',
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
    CalculatorComponent,
  ],
  templateUrl: './list-calculator.component.html',
  styleUrls: ['./list-calculator.component.scss'],
})
export class ListCalculatorComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly displayedColumns: string[] = [
    'nombre',
    'fecha',
    'factura',
    'deducciones',
    'saldoLibre',
    'tasa',
    'estatus',
    'acciones',
  ];

  readonly dataSource = new MatTableDataSource<Calculo>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  /**
   * Calculadora montada como MODAL de pantalla completa. El listado la abre por
   * estado y controla el cierre, confirmando antes si hay cambios sin guardar.
   */
  readonly editorAbierto = signal(false);
  readonly editor = viewChild<CalculatorComponent>(CalculatorComponent);

  /**
   * Speed dial flotante (móvil y tablet): el botón de acción principal despliega
   * el resto de botones del encabezado, que se ocultan allí porque no caben en
   * la barra superior de una pantalla angosta.
   */
  readonly accionesAbiertas = signal(false);

  /** Cálculos visibles, tal como llegaron del servidor (o de la copia local). */
  readonly filas = signal<Calculo[]>([]);
  readonly cargando = signal(false);

  // — Filtros —
  readonly filtroTexto = signal('');
  /** Divisa por la que se filtra (vacío = todas, `sin-tasa` = sin consultar) */
  readonly filtroDivisa = signal<MonedaDivisa | 'sin-tasa' | ''>('');

  /**
   * Divisas del filtro: dólar y euro son las que consulta el botón «Consultar»
   * de la calculadora, y `sin-tasa` agrupa los cálculos a los que todavía no se
   * les pidió la tasa.
   */
  readonly divisas: DivisaOpcion[] = [
    { valor: 'dolar', etiqueta: 'Dólar (USD)', icono: 'attach_money' },
    { valor: 'euro', etiqueta: 'Euro (EUR)', icono: 'euro_symbol' },
    { valor: 'sin-tasa', etiqueta: 'Sin tasa cargada', icono: 'money_off' },
  ];

  /** Texto de búsqueda precalculado por cálculo (no se rehace en cada tecla). */
  private readonly indiceBusqueda = computed(
    () => new Map(this.filas().map((c) => [c, this.textoBuscable(c)])),
  );

  /** Lo que se ve en la tabla: el listado ya filtrado por texto y divisa. */
  readonly filtradas = computed<Calculo[]>(() => {
    const texto = this.normalizar(this.filtroTexto());
    const divisa = this.filtroDivisa();
    const indice = this.indiceBusqueda();

    return this.filas().filter((c) => {
      if (divisa === 'sin-tasa' && (c.tasa?.valor ?? 0) > 0) return false;
      if ((divisa === 'dolar' || divisa === 'euro') && c.tasa?.moneda !== divisa) return false;
      return !texto || (indice.get(c) ?? '').includes(texto);
    });
  });

  /**
   * Indicadores del listado: cuántos cálculos y de qué tamaño.
   *
   * Los importes solo suman cálculos **procesados**: un borrador todavía no es
   * resultado, y una anulada o borrada ya no cuenta. Lo que se mira aquí es el
   * dinero que quedó cerrado. Los conteos sí distinguen: «Cálculos» es el total
   * del listado y «Anuladas» cuántas quedaron descartadas.
   */
  readonly kpis = computed<KpiCalculo[]>(() => {
    const datos = this.filas();
    const procesados = datos.filter((c) => c.estado === 'procesado');
    const anuladas = datos.filter((c) => c.estado === 'anulada').length;

    const facturado = procesados.reduce((acc, c) => acc + (c.montoTotal ?? 0), 0);
    const deducido = procesados.reduce((acc, c) => acc + (c.subtotalDeducciones ?? 0), 0);
    const libre = procesados.reduce((acc, c) => acc + (c.saldoLibre ?? 0), 0);
    const conTasa = procesados.filter((c) => (c.tasa?.valor ?? 0) > 0).length;

    return [
      { etiqueta: 'Cálculos', valor: datos.length, clase: 'kpi-total', icono: 'calculate' },
      {
        etiqueta: 'Facturado',
        valor: facturado,
        clase: 'kpi-facturado',
        icono: 'receipt_long',
        texto: formatoBs(facturado) + ' Bs',
      },
      {
        etiqueta: 'Deducciones',
        valor: deducido,
        clase: 'kpi-deduccion',
        icono: 'content_cut',
        texto: formatoBs(deducido) + ' Bs',
      },
      {
        etiqueta: 'Saldo libre',
        valor: libre,
        clase: 'kpi-libre',
        icono: 'savings',
        texto: formatoBs(libre) + ' Bs',
      },
      { etiqueta: 'Anuladas', valor: anuladas, clase: 'kpi-anuladas', icono: 'block' },
      { etiqueta: 'Con tasa', valor: conTasa, clase: 'kpi-tasa', icono: 'currency_exchange' },
    ];
  });

  /** Utilidades del modelo que usa la plantilla. */
  readonly formatoBs = formatoBs;
  readonly infoEstado = infoEstadoCalculo;
  readonly transiciones = transicionesCalculo;

  constructor(
    private calculos: CalculoService,
    private notificar: NotificacionService,
    private privilegios: PrivilegiosService,
  ) {
    // La tabla siempre refleja el resultado de los filtros
    effect(() => {
      this.dataSource.data = this.filtradas();
    });
  }

  /**
   * ¿La sesión trae este privilegio para este listado?
   *
   * El menú declara `Create`/`Read`/`Update`/`Delete` para `calculator`. La
   * plantilla los usa para mostrar sólo lo permitido: crear, abrir y eliminar.
   */
  Privilegio(metodo: string): boolean {
    return this.privilegios.tiene(metodo);
  }

  /**
   * Escape cierra el speed dial. Se registra en fase de captura: hay scripts
   * globales (Bootstrap / SweetAlert) que se comen la fase de burbuja del
   * keydown, así que con un @HostListener('document:keydown.escape') el evento
   * nunca llegaba al componente.
   */
  private readonly alPulsarEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.accionesAbiertas()) {
      this.accionesAbiertas.set(false);
    }
  };

  ngOnInit(): void {
    document.addEventListener('keydown', this.alPulsarEscape, true);
    void this.cargar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.sortingDataAccessor = (item, propiedad) => {
      switch (propiedad) {
        case 'fecha':
          return new Date(item.fechaEmision ?? '').getTime() || 0;
        case 'factura':
          return item.montoTotal ?? 0;
        case 'deducciones':
          return item.subtotalDeducciones ?? 0;
        case 'saldoLibre':
          return item.saldoLibre ?? 0;
        case 'tasa':
          return item.tasa?.valor ?? 0;
        // La celda del nombre muestra más de un dato: se ordena por él
        case 'nombre':
          return nombreCalculo(item).toLowerCase();
        default:
          return String((item as unknown as Record<string, unknown>)[propiedad] ?? '').toLowerCase();
      }
    };
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.alPulsarEscape, true);
  }

  /** Cierra el speed dial si el clic cae fuera de él. */
  @HostListener('document:click', ['$event'])
  cerrarAccionesPorClicExterno(event: MouseEvent): void {
    if (!this.accionesAbiertas()) {
      return;
    }
    const destino = event.target as HTMLElement | null;
    if (!destino?.closest('.lb-speeddial')) {
      this.accionesAbiertas.set(false);
    }
  }

  toggleAcciones(): void {
    this.accionesAbiertas.update((abierto) => !abierto);
  }

  /** Cierra el speed dial (al elegir una de sus acciones). */
  cerrarAcciones(): void {
    this.accionesAbiertas.set(false);
  }

  // ═══════════════════════════════════════════
  // Carga y filtros
  // ═══════════════════════════════════════════

  /** Carga el listado desde el servidor (con degradación a la copia local). */
  async cargar(): Promise<void> {
    this.cargando.set(true);
    try {
      const lista = await this.calculos.listar();
      this.filas.set(this.ordenar(lista));
    } catch (e) {
      this.notificar.error(
        'No se pudo cargar el listado de cálculos',
        NotificacionService.detalle(e),
      );
    } finally {
      this.cargando.set(false);
    }
  }

  /** Más recientes primero */
  private ordenar(lista: Calculo[]): Calculo[] {
    return [...lista].sort(
      (a, b) => new Date(b.fechaEmision ?? '').getTime() - new Date(a.fechaEmision ?? '').getTime(),
    );
  }

  /** Todo lo que se puede buscar de un cálculo: nombre, código, deducciones… */
  private textoBuscable(c: Calculo): string {
    return this.normalizar(
      [
        c.codigo,
        c.nombre,
        c.fechaTexto,
        c.usuario,
        c.tasa?.moneda,
        c.tasa?.fecha,
        c.tasa?.fuente,
        ...(c.deducciones ?? []).map((d) => nombreDeduccion(d)),
      ]
        .filter(Boolean)
        .join(' '),
    );
  }

  /** Minúsculas y sin acentos, para que "calculo" encuentre "Cálculo". */
  private normalizar(texto: string): string {
    return (texto ?? '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  onFiltroTexto(valor: string): void {
    this.filtroTexto.set(valor ?? '');
  }

  onFiltroDivisa(valor: MonedaDivisa | 'sin-tasa' | ''): void {
    this.filtroDivisa.set(valor ?? '');
  }

  limpiarFiltros(entrada?: HTMLInputElement): void {
    this.filtroTexto.set('');
    this.filtroDivisa.set('');
    if (entrada) entrada.value = '';
  }

  // ═══════════════════════════════════════════
  // Editor-modal
  // ═══════════════════════════════════════════

  /** Abre un cálculo guardado en la calculadora. */
  editar(c: Calculo): void {
    if (!c?.codigo) {
      this.notificar.aviso('Cálculo sin código', 'No se puede abrir un cálculo sin código.');
      return;
    }
    this.calculos.marcarParaEditar(c.codigo);
    this.editorAbierto.set(true);
  }

  /** Abre la calculadora en blanco (cálculo nuevo). */
  nuevoCalculo(): void {
    this.calculos.marcarParaEditar('');
    this.editorAbierto.set(true);
  }

  /**
   * Cierra el modal. Si el editor tiene cambios sin guardar, la salida se
   * confirma con SweetAlert: Guardar y salir / Salir sin guardar / Cancelar.
   */
  async cerrarEditor(): Promise<void> {
    const editor = this.editor();
    if (editor && !(await confirmarSalida(editor as PuedeSalir))) {
      return; // el usuario canceló: el modal se queda abierto
    }
    this.editorAbierto.set(false);
    // La calculadora pudo guardar o eliminar: se refresca la tabla al cerrarla.
    void this.cargar();
  }

  // ═══════════════════════════════════════════
  // Presentación
  // ═══════════════════════════════════════════

  nombre(c: Calculo): string {
    return nombreCalculo(c);
  }

  /** Detalle de cada deducción, para el tooltip de la celda. */
  detalleDeducciones(c: Calculo): string {
    const lista = (c.deducciones ?? []).filter((d) => (d.monto ?? 0) > 0);
    if (lista.length === 0) return 'Sin deducciones';
    return [
      ...lista.map((d) => `• ${nombreDeduccion(d)}: ${detalleDeduccion(d)}`),
      `Total: ${formatoBs(c.subtotalDeducciones)} Bs`,
    ].join('\n');
  }

  /** Tasa de la fila: "881,07" (la divisa la dice el chip de la celda) */
  tasaTexto(c: Calculo): string {
    const valor = c.tasa?.valor ?? 0;
    if (!(valor > 0)) return 'Sin tasa';
    const divisa = c.tasa?.moneda === 'euro' ? 'EUR' : 'USD';
    return `${formatoBs(valor)} ${divisa}`;
  }

  /** Clase del chip de la tasa: verde con tasa, gris si falta */
  claseDivisa(c: Calculo): string {
    if (!((c.tasa?.valor ?? 0) > 0)) return 'tasa-vacia';
    return c.tasa?.moneda === 'euro' ? 'tasa-euro' : 'tasa-dolar';
  }

  iconoDivisa(c: Calculo): string {
    if (!((c.tasa?.valor ?? 0) > 0)) return 'money_off';
    return c.tasa?.moneda === 'euro' ? 'euro_symbol' : 'attach_money';
  }

  /** Tooltip de la celda de tasa: de dónde salió y de cuándo es */
  detalleTasa(c: Calculo): string {
    const t = c.tasa;
    if (!((t?.valor ?? 0) > 0)) {
      return 'Todavía no se le consultó la tasa a esta divisa';
    }
    return [
      t?.fuente ? `Fuente: ${t.fuente}` : '',
      t?.fecha ? `Fecha de la tasa: ${t.fecha}` : '',
      t?.actualizadaEn ? `Consultada: ${new Date(t.actualizadaEn).toLocaleString('es-VE')}` : '',
    ]
      .filter(Boolean)
      .join(' — ');
  }

  /**
   * Cambia el estatus de la fila (procesar, anular, devolver a borrador).
   *
   * El listado no reconsulta el servidor: la fila se actualiza en sitio, como en
   * el resto de los listados, y la cache local queda con el nuevo estatus.
   */
  async cambiarEstado(c: Calculo, estado: CalculoEstado): Promise<void> {
    if (!c?.codigo || c.estado === estado) return;

    const info = infoEstadoCalculo(estado);
    const { isConfirmed } = await Swal.fire({
      icon: estado === 'anulada' ? 'warning' : 'question',
      title: `¿Pasar el cálculo a «${info.etiqueta}»?`,
      html: `«<strong>${nombreCalculo(c)}</strong>» (${c.codigo}) quedará como <strong>${info.etiqueta}</strong>.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: info.color,
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    const ok = await this.calculos.fijarEstado(c.codigo, estado, c.estado);
    if (!ok) return;

    this.filas.update((lista) =>
      lista.map((x) => (x.codigo === c.codigo ? { ...x, estado } : x)),
    );
    this.notificar.exito(
      'Estatus actualizado',
      `El cálculo ${c.codigo} quedó como «${info.etiqueta}».`,
    );
  }

  /** Fecha absoluta para el tooltip */
  fechaAbsoluta(c: Calculo): string {
    const fecha = c.fechaEmision;
    if (!fecha) return 'Sin fecha';
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? fecha : d.toLocaleDateString('es-VE');
  }

  /** "hace 5 min", "ayer 14:30"... a partir de la fecha del cálculo */
  hace(c: Calculo): string {
    const fecha = c.fechaEmision;
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

  // ═══════════════════════════════════════════
  // Acciones de fila
  // ═══════════════════════════════════════════

  /**
   * Elimina el cálculo de la lista.
   *
   * El backend (`ccoleccion`) no admite borrados físicos, así que el registro se
   * actualiza con el estatus `eliminado` y deja de aparecer en el listado,
   * conservándose para la trazabilidad.
   */
  async eliminar(c: Calculo): Promise<void> {
    if (!c?.codigo) return;

    const confirmar = await Swal.fire({
      icon: 'warning',
      title: `¿Borrar el cálculo ${c.codigo}?`,
      html:
        `«<strong>${nombreCalculo(c)}</strong>» dejará de aparecer en el listado ` +
        'y <strong>no se contará</strong> en los indicadores.<br><br>' +
        '<small>El registro se conserva en el sistema con el estatus borrado.</small>',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b3261e',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!confirmar.isConfirmed) return;

    const ok = await this.calculos.eliminar(c.codigo);
    if (!ok) return;

    this.filas.update((lista) => lista.filter((x) => x.codigo !== c.codigo));
    this.notificar.exito('Cálculo borrado', `El cálculo ${c.codigo} salió del listado.`);
  }
}
