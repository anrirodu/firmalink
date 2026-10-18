import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { PuedeSalir } from '../../../shared/guards/cambios-sin-guardar.guard';
import { inyectarEstilosFactura, retirarEstilosFactura } from '../../../shared/impresion/factura-estilos';
import { ClienteService } from '../../customers/cliente.service';
import {
  Cliente,
  ClienteDocumento,
  LineaTratamiento,
  infoCondicion,
  nombreCliente,
  snapshotCliente,
  tratamientoFiscal,
} from '../../customers/cliente.model';
import {
  ESTADOS_FACTURA,
  Factura,
  FacturaEstado,
  alicuotaIvaEfectiva,
  calcularTotales,
  clienteExentoIva,
  controlEnRango,
  esEditable,
  facturaVacia,
  fechaTextoEmision,
  formatoBs,
  formatoCantidad,
  formatoPorcentaje,
  formatearNumeroFactura,
  infoEstadoFactura,
  mesFacturado,
  motivoBloqueo,
  parsearNumero,
  validarFactura,
} from '../factura.model';
import { FacturaService } from '../factura.service';
import { construirHojaFactura, imprimirFactura } from '../factura.impresion';

/** Escalas de la vista previa: la hoja mide 21,7 cm y no cabe entera en móvil. */
const ESCALAS = [1, 0.85, 0.7, 0.55] as const;

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy, PuedeSalir {
  /** La factura en edición. */
  readonly factura = signal<Factura>(facturaVacia());

  readonly cargando = signal(true);
  readonly guardando = signal(false);
  readonly cambiado = signal(false);
  readonly escala = signal<number>(ESCALAS[0]);

  /**
   * Pantallas angostas (móvil/tablet): el panel de datos deja de ser una
   * columna a la izquierda y sus secciones se abren como modal desde botones
   * contextuales apilados bajo la hoja.
   */
  readonly esCompacta = signal(false);

  /** Una factura emitida o anulada es un documento cerrado: no se edita. */
  readonly readonly_ = computed(() => !esEditable(this.factura().estado));

  /** Clientes para el buscador de la ficha. */
  readonly clientes = signal<Cliente[]>([]);
  readonly buscarCliente = new FormControl('');
  readonly clienteTexto = signal('');

  /**
   * Totales en vivo —se recalculan con cada tecla— para el resumen del panel.
   * El documento que se guarda lleva su propia copia congelada.
   */
  readonly totales = computed(() => calcularTotales(this.factura()));
  readonly problemas = computed(() => validarFactura(this.factura()));
  readonly estadoInfo = computed(() => infoEstadoFactura(this.factura().estado));
  readonly bloqueo = computed(() => motivoBloqueo(this.factura().estado));
  readonly controlFueraDeRango = computed(() => {
    const f = this.factura();
    return !!f.numeroControl && !controlEnRango(f.emisor, f.numeroControl);
  });

  /** La hoja impresa, igual que se ve en la vista previa. */
  readonly hoja = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(construirHojaFactura(this.factura())),
  );

  readonly escalas = ESCALAS;
  readonly estadosFactura = ESTADOS_FACTURA;

  /** Utilidades del modelo y del cliente que usa la plantilla. */
  readonly nombreCliente = nombreCliente;
  readonly tratamientoFiscal = tratamientoFiscal;
  readonly infoCondicion = infoCondicion;
  readonly formatoBs = formatoBs;
  readonly formatoCantidad = formatoCantidad;
  readonly formatoPorcentaje = formatoPorcentaje;
  readonly formatearNumeroFactura = formatearNumeroFactura;

  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private notificar: NotificacionService,
    private sanitizer: DomSanitizer,
    private breakpoints: BreakpointObserver,
    private dialog: MatDialog,
  ) {}

  async ngOnInit(): Promise<void> {
    // La hoja se pinta con `[innerHTML]`, que no hereda los estilos del
    // componente: se inyectan en el documento mientras la pantalla vive.
    inyectarEstilosFactura();

    // En móvil/tablet el panel de datos se abre por secciones, en modal.
    this.breakpoints.observe('(max-width: 1024px)').subscribe((r) => {
      this.esCompacta.set(r.matches);
    });

    this.buscarCliente.valueChanges.subscribe((v) => this.clienteTexto.set(v ?? ''));

    try {
      const clientes = await this.clienteService.listar();
      this.clientes.set(clientes.filter((c) => c.estado !== 'eliminado'));
    } catch (e) {
      this.notificar.aviso(
        'No se pudo cargar la lista de clientes',
        `El buscador de clientes queda vacío (${NotificacionService.detalle(e)}).`,
      );
    }

    const pendiente = this.facturaService.tomarPendienteEdicion();
    if (pendiente) {
      const doc = await this.facturaService.obtener(pendiente);
      if (doc) {
        this.factura.set(doc);
        this.cargando.set(false);
        return;
      }
    }

    await this.nueva();
  }

  ngOnDestroy(): void {
    retirarEstilosFactura();
  }

  // ═══════════════════════════════════════════
  // Documento
  // ═══════════════════════════════════════════

  /** Factura nueva con el siguiente número de la serie. */
  async nueva(): Promise<void> {
    const numero = await this.facturaService.siguienteNumero();
    this.factura.set(facturaVacia({ numero }));
    this.clienteTexto.set('');
    this.buscarCliente.setValue('', { emitEvent: false });
    this.cambiado.set(false);
    this.cargando.set(false);
  }

  /** Escribe un campo del documento y marca los cambios pendientes. */
  set<K extends keyof Factura>(campo: K, valor: Factura[K]): void {
    if (this.readonly_()) return;
    this.factura.update((f) => ({ ...f, [campo]: valor }));
    this.cambiado.set(true);
  }

  /** Cambia un campo de la copia del cliente (no toca su ficha). */
  setCliente<K extends keyof ClienteDocumento>(campo: K, valor: ClienteDocumento[K]): void {
    if (this.readonly_()) return;
    this.factura.update((f) => ({
      ...f,
      cliente: f.cliente ? { ...f.cliente, [campo]: valor } : f.cliente,
    }));
    this.cambiado.set(true);
  }

  /** Cambia un número escrito como texto ("1.234,56") en un campo del documento. */
  setNumero(campo: 'alicuotaIva' | 'alicuotaIgtf' | 'alicuotaIslr', valor: string): void {
    this.set(campo, parsearNumero(valor));
  }

  // ═══════════════════════════════════════════
  // Cliente
  // ═══════════════════════════════════════════

  readonly clientesFiltrados = computed(() => {
    const texto = this.normalizar(this.clienteTexto());
    const lista = this.clientes();
    if (!texto) return lista.slice(0, 50);
    return lista
      .filter((c) =>
        [nombreCliente(c), c.rif, c.identificacion, c.codigo]
          .map((v) => this.normalizar(String(v ?? '')))
          .some((v) => v.includes(texto)),
      )
      .slice(0, 50);
  });

  private normalizar(v: string): string {
    return v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  /**
   * Elige el cliente de la factura.
   *
   * Se guarda una copia congelada de sus datos y de su trato fiscal —RIF,
   * domicilio, retención de IVA e ISLR, exención de IGTF—, porque la factura
   * emitida tiene que seguir diciendo lo mismo aunque después se edite la
   * ficha. El cliente exento de IVA deja la factura sin IVA, y el exento de
   * IGTF apaga esa casilla.
   */
  elegirCliente(c: Cliente): void {
    if (this.readonly_()) return;
    const copia = snapshotCliente(c);
    this.factura.update((f) => ({
      ...f,
      cliente: copia,
      aplicaIgtf: copia.exentoIgtf ? false : f.aplicaIgtf,
    }));
    this.clienteTexto.set('');
    this.buscarCliente.setValue('', { emitEvent: false });
    this.cambiado.set(true);
  }

  /** Refresca la copia del cliente con los datos actuales de su ficha. */
  async refrescarCliente(): Promise<void> {
    const codigo = this.factura().cliente?.codigo;
    if (!codigo || this.readonly_()) return;

    const vivo = this.clientes().find((c) => c.codigo === codigo) ?? (await this.ficha(codigo));
    if (!vivo) {
      this.notificar.aviso(
        'No se encontró la ficha del cliente',
        `El cliente ${codigo} ya no está en el listado; se conserva la copia guardada.`,
      );
      return;
    }

    this.factura.update((f) => ({ ...f, cliente: snapshotCliente(vivo) }));
    this.cambiado.set(true);
    this.notificar.exito(
      'Datos del cliente actualizados',
      'La copia de la factura se refrescó desde la ficha del cliente.',
    );
  }

  private async ficha(codigo: string): Promise<Cliente | null> {
    try {
      return await this.clienteService.obtener(codigo);
    } catch (e) {
      return null;
    }
  }

  quitarCliente(): void {
    if (this.readonly_()) return;
    this.factura.update((f) => ({ ...f, cliente: null }));
    this.cambiado.set(true);
  }

  /** Notas fiscales de la ficha del cliente, para la tarjeta del panel. */
  notasFiscales(c: ClienteDocumento | null): LineaTratamiento[] {
    if (!c) return [];
    const lineas: LineaTratamiento[] = [];

    if (c.agenteRetencionIva) {
      lineas.push({
        icono: 'percent',
        titulo: `Retiene IVA ${formatoPorcentaje(c.porcentajeRetencionIva)}`,
        detalle: 'El cliente es agente de retención: descuenta ese porcentaje del IVA al pagar.',
        tono: 'info',
      });
    }
    if (c.agenteRetencionIslr) {
      lineas.push({
        icono: 'gavel',
        titulo: `Retiene ISLR ${formatoPorcentaje(this.factura().alicuotaIslr)}`,
        detalle: 'Agente de retención de ISLR sobre el subtotal de servicios.',
        tono: 'info',
      });
    }
    if (c.exentoIgtf) {
      lineas.push({
        icono: 'shield',
        titulo: 'Exento de IGTF',
        detalle: 'Cliente exento: la factura no lleva IGTF aunque se pague en divisas.',
        tono: 'ok',
      });
    }
    if (c.condicionFiscal === 'exento') {
      lineas.push({
        icono: 'money_off',
        titulo: 'IVA exento',
        detalle: 'Factura sin IVA: la alícuota se aplica en cero.',
        tono: 'ok',
      });
    }

    return lineas;
  }

  // ═══════════════════════════════════════════
  // Renglones
  // ═══════════════════════════════════════════

  agregarItem(): void {
    if (this.readonly_()) return;
    this.factura.update((f) => ({
      ...f,
      items: [...f.items, { descripcion: '', cantidad: 1, precio: 0 }],
    }));
    this.cambiado.set(true);
    // El foco entra en la descripción del renglón recién creado.
    setTimeout(() => {
      const campos = document.querySelectorAll<HTMLTextAreaElement>('.bl-item-desc textarea');
      campos[campos.length - 1]?.focus();
    });
  }

  editarItem(indice: number, campo: 'descripcion' | 'cantidad' | 'precio', valor: string): void {
    if (this.readonly_()) return;
    const items = [...this.factura().items];
    const item = items[indice];
    if (!item) return;

    items[indice] =
      campo === 'descripcion'
        ? { ...item, descripcion: valor }
        : { ...item, [campo]: parsearNumero(valor) };

    this.factura.update((f) => ({ ...f, items }));
    this.cambiado.set(true);
  }

  /** Importe del renglón (cantidad × precio), tal como lo calcula la hoja. */
  totalItem(indice: number): number {
    const it = this.factura().items[indice];
    return (Number(it?.cantidad) || 0) * (Number(it?.precio) || 0);
  }

  quitarItem(indice: number): void {
    if (this.readonly_()) return;
    this.factura.update((f) => ({ ...f, items: f.items.filter((_, i) => i !== indice) }));
    this.cambiado.set(true);
  }

  async limpiarItems(): Promise<void> {
    if (this.readonly_()) return;
    if (this.factura().items.length === 0) {
      this.notificar.aviso('Sin renglones', 'No hay renglones que quitar.');
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Quitar todos los renglones?',
      text: 'La factura queda sin productos ni servicios facturados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;
    this.factura.update((f) => ({ ...f, items: [] }));
    this.cambiado.set(true);
  }

  // ═══════════════════════════════════════════
  // Fechas y numeración
  // ═══════════════════════════════════════════

  /**
   * El `input[type=date]` da "2026-10-18": se guardan las tres caras de la
   * fecha —ISO para ordenar, texto para imprimir y mes facturado—.
   */
  setFecha(valor: string): void {
    if (!valor) return;
    const fecha = new Date(`${valor}T00:00:00`);
    if (isNaN(fecha.getTime())) return;
    this.factura.update((f) => ({
      ...f,
      fechaEmision: fecha.toISOString(),
      fechaTexto: fechaTextoEmision(fecha),
      mes: f.mes || mesFacturado(fecha),
    }));
    this.cambiado.set(true);
  }

  /** Valor para el `input[type=date]`, a partir de la fecha ISO guardada. */
  fechaParaInput(f: Factura): string {
    const d = new Date(f.fechaEmision);
    if (isNaN(d.getTime())) return '';
    const dos = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
  }

  /** Copia el número de factura al de control: la serie arranca igual. */
  sincronizarControl(): void {
    if (this.readonly_()) return;
    this.set('numeroControl', this.factura().numero);
  }

  /** Rehace el texto de emisión cuando cambia la ciudad o la fecha del encabezado. */
  setFechaTexto(valor: string): void {
    this.set('fechaTexto', valor);
  }

  // ═══════════════════════════════════════════
  // Trato fiscal de la factura
  // ═══════════════════════════════════════════

  readonly clienteExentoIva = computed(() => clienteExentoIva(this.factura()));
  readonly alicuotaIvaEfectiva = computed(() => alicuotaIvaEfectiva(this.factura()));

  /** El IGTF no lo paga un cliente exento: la casilla queda deshabilitada. */
  readonly puedeAplicarIgtf = computed(() => !this.factura().cliente?.exentoIgtf);

  alternarIgtf(): void {
    if (this.readonly_() || !this.puedeAplicarIgtf()) return;
    this.set('aplicaIgtf', !this.factura().aplicaIgtf);
  }

  /** Interruptores de la hoja (los botones de la plantilla). */
  alternar(campo: 'mostrarFirmaSello' | 'mostrarCabeceraPie' | 'mostrarMarcaAgua'): void {
    if (this.readonly_()) return;
    this.factura.update((f) => ({ ...f, [campo]: !f[campo] }));
    this.cambiado.set(true);
  }

  // ═══════════════════════════════════════════
  // Pantallas angostas: secciones en modal
  // ═══════════════════════════════════════════

  /**
   * Abre una sección del panel en un modal (solo se usa en móvil/tablet).
   * `plantilla` es un `<ng-template>` con el contenido de la sección.
   */
  abrirSeccion(titulo: string, plantilla: TemplateRef<unknown>): void {
    this.dialog.open(plantilla, {
      minWidth: 'min(92vw, 560px)',
      maxWidth: '96vw',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: 'bl-seccion-dialog',
      data: { titulo },
    });
  }

  /** Título de la sección en el modal. */
  seccionTitulo(titulo: string): string {
    return titulo;
  }

  // ═══════════════════════════════════════════
  // Guardado y emisión
  // ═══════════════════════════════════════════

  /**
   * Guarda la factura. Con `emitir` pasa a `emitida`: la numeración queda
   * declarada y el documento deja de ser editable.
   */
  async guardar(emitir = false): Promise<boolean> {
    const f = this.factura();
    if (this.readonly_()) return true;

    const problemas = validarFactura(f);
    if (problemas.length > 0) {
      this.notificar.aviso(
        'Faltan datos de la factura',
        problemas.map((p) => p.mensaje).join(' '),
      );
      return false;
    }

    if (emitir && this.controlFueraDeRango()) {
      const { isConfirmed } = await Swal.fire({
        title: 'Número de control fuera del rango autorizado',
        html:
          `El rango autorizado del emisor va del <strong>${f.emisor.controlDesde}</strong> ` +
          `al <strong>${f.emisor.controlHasta}</strong>.<br>` +
          '<small>Emitir fuera de ese rango es una falta ante el SENIAT.</small>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Emitir igual',
        cancelButtonText: 'Revisar',
        confirmButtonColor: '#a12c2c',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
      });
      if (!isConfirmed) return false;
    }

    this.guardando.set(true);
    const doc = await this.facturaService.guardar(emitir ? { ...f, estado: 'emitida' } : f);
    this.guardando.set(false);
    if (!doc) return false;

    this.factura.set(doc);
    this.cambiado.set(false);
    this.notificar.exito(
      emitir ? 'Factura emitida' : 'Factura guardada',
      emitir
        ? `La factura ${doc.numero} quedó emitida y ya no admite ediciones.`
        : `La factura ${doc.numero} quedó registrada.`,
    );
    return true;
  }

  /** Anula una factura emitida (estado terminal, el número no se reutiliza). */
  async anular(): Promise<void> {
    const f = this.factura();
    const { isConfirmed } = await Swal.fire({
      title: '¿Anular la factura?',
      html: `La factura <strong>${f.numero}</strong> queda sin efecto. Su número no se reutiliza.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    const ok = await this.facturaService.cambiarEstado(f.codigo, 'anulada', f.estado);
    if (ok) {
      this.factura.set({ ...f, estado: 'anulada' });
      this.notificar.exito('Factura anulada', `La factura ${f.numero} quedó anulada.`);
    }
  }

  /** Elimina el borrador (borrado lógico: queda en la base para la traza). */
  async eliminar(): Promise<void> {
    const f = this.factura();
    if (!f.codigo) {
      this.notificar.aviso(
        'Sin guardar',
        'La factura todavía no está registrada: no hay nada que eliminar.',
      );
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar la factura?',
      html: `La factura <strong>${f.numero}</strong> deja de aparecer en el listado.<br>
        <small>El registro se conserva en la base de datos para la trazabilidad.</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    const ok = await this.facturaService.eliminar(f.codigo, f.estado);
    if (ok) {
      this.notificar.exito('Factura eliminada', `La factura ${f.numero} salió del listado.`);
      await this.nueva();
    }
  }

  /** Estado al que se puede pasar desde el actual. */
  async cambiarEstado(estado: FacturaEstado): Promise<void> {
    const f = this.factura();
    if (estado === 'anulada') {
      await this.anular();
      return;
    }
    if (estado === 'eliminado') {
      await this.eliminar();
      return;
    }
    if (estado === 'emitida') {
      await this.guardar(true);
    }
  }

  // ═══════════════════════════════════════════
  // Impresión
  // ═══════════════════════════════════════════

  async imprimir(): Promise<void> {
    const f = this.factura();
    const { isConfirmed } = await Swal.fire({
      title: '¿Imprimir la factura?',
      html: `Se abre el diálogo de impresión con la hoja de <strong>${f.numero}</strong>.<br>
        <small>Desde ahí también puede guardarla como PDF.</small>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Imprimir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0c2d48',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;
    imprimirFactura(f);
  }

  /** Recorre las escalas de la vista previa (la hoja es más ancha que un móvil). */
  cambiarEscala(): void {
    const i = ESCALAS.indexOf(this.escala() as (typeof ESCALAS)[number]);
    this.escala.set(ESCALAS[(i + 1) % ESCALAS.length]);
  }

  // ═══════════════════════════════════════════
  // PuedeSalir (guarda de cambios sin guardar)
  // ═══════════════════════════════════════════

  hayCambiosSinGuardar(): boolean {
    return this.cambiado() && !this.readonly_();
  }

  async guardarAntesDeSalir(): Promise<boolean> {
    return this.guardar(false);
  }

  respaldarAlSalir(): void {
    if (this.cambiado() && !this.readonly_()) {
      this.facturaService.guardarBorradorLocal(this.factura());
    }
  }
}
