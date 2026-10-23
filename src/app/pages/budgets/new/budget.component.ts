import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
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
import { PrivilegiosService } from '../../../shared/services/privilegios.service';
import { PuedeSalir } from '../../../shared/guards/cambios-sin-guardar.guard';
import { inyectarEstilosFactura, retirarEstilosFactura } from '../../../shared/impresion/factura-estilos';
import { ClienteService } from '../../customers/cliente.service';
import {
  Cliente,
  ClienteDocumento,
  LineaTratamiento,
  nombreCliente,
  snapshotCliente,
} from '../../customers/cliente.model';
import {
  CondicionesPresupuesto,
  ESTADOS_PRESUPUESTO,
  MONEDAS_OPCIONES,
  MonedaPresupuesto,
  Presupuesto,
  PresupuestoEstado,
  alicuotaIvaEfectiva,
  calcularTotalesPresupuesto,
  clienteExentoIva,
  datosMoneda,
  descuentoEfectivo,
  esEditable,
  estadoVisible,
  fechaTextoEmision,
  fechaValidez,
  fechaValidezCorta,
  formatoBs,
  formatoCantidad,
  formatoMoneda,
  formatoPorcentaje,
  formatearNumeroPresupuesto,
  infoEstadoPresupuesto,
  mesFacturado,
  motivoBloqueo,
  parsearNumero,
  presupuestoVacio,
  presupuestoSinIva,
  validarPresupuesto,
} from '../presupuesto.model';
import { PresupuestoService } from '../presupuesto.service';
import { construirHojaPresupuesto, imprimirPresupuesto } from '../presupuesto.impresion';

/** Escalas de la vista previa: la hoja mide 21,7 cm y no cabe entera en móvil. */
const ESCALAS = [1, 0.85, 0.7, 0.55] as const;

@Component({
  selector: 'app-budgets',
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
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetsComponent implements OnInit, OnDestroy, PuedeSalir {
  /** El presupuesto en edición. */
  readonly presupuesto = signal<Presupuesto>(presupuestoVacio());

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

  /**
   * El editor es de sólo lectura por dos motivos, y ambos muestran lo mismo: no
   * se puede escribir el documento. O el presupuesto ya está cerrado (enviado,
   * aprobado, rechazado, anulado) o la sesión no trae el privilegio `Update`.
   * Así un usuario de sólo lectura —`Read`— ve la pantalla completa pero sin
   * campos ni botones de escritura.
   */
  readonly readonly_ = computed(
    () => !esEditable(this.presupuesto().estado) || !this.privilegios.tiene('Update'),
  );

  /** Clientes para el buscador de la ficha. */
  readonly clientes = signal<Cliente[]>([]);
  readonly buscarCliente = new FormControl('');
  readonly clienteTexto = signal('');

  /**
   * Totales en vivo —se recalculan con cada tecla— para el resumen del panel.
   * El documento que se guarda lleva su propia copia congelada.
   */
  readonly totales = computed(() => calcularTotalesPresupuesto(this.presupuesto()));
  readonly problemas = computed(() => validarPresupuesto(this.presupuesto()));
  /** Estado que se muestra: un enviado cuya validez ya pasó se lee "vencido". */
  readonly estadoMostrado = computed(() => estadoVisible(this.presupuesto()));
  readonly estadoInfo = computed(() => infoEstadoPresupuesto(this.estadoMostrado()));
  readonly bloqueo = computed(() => motivoBloqueo(this.presupuesto().estado));
  /** Descuento comercial en la moneda del presupuesto, tal como lo resta la hoja. */
  readonly descuento = computed(() => descuentoEfectivo(this.presupuesto()));

  /** Divisa del presupuesto: símbolo, nombre y etiqueta para los totales. */
  readonly moneda = computed(() => datosMoneda(this.presupuesto()));

  /**
   * El usuario apagó el IVA: hay que advertir en rojo que el monto cotizado no
   * lleva impuesto incluido. El cliente exento tiene su propio aviso aparte.
   */
  readonly sinIva = computed(() => presupuestoSinIva(this.presupuesto()));

  /** La hoja impresa, igual que se ve en la vista previa. */
  readonly hoja = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(construirHojaPresupuesto(this.presupuesto())),
  );

  readonly escalas = ESCALAS;
  readonly estadosPresupuesto = ESTADOS_PRESUPUESTO;
  readonly monedasOpciones = MONEDAS_OPCIONES;

  /** Utilidades del modelo y del cliente que usa la plantilla. */
  readonly nombreCliente = nombreCliente;
  readonly formatoBs = formatoBs;
  readonly formatoCantidad = formatoCantidad;
  readonly formatoPorcentaje = formatoPorcentaje;
  /** Formato del modelo, atado a la divisa del documento. */
  readonly formatoMoneda = (monto: number): string => formatoMoneda(monto, this.presupuesto());
  readonly formatearNumeroPresupuesto = formatearNumeroPresupuesto;
  readonly fechaValidezCorta = fechaValidezCorta;

  constructor(
    private clienteService: ClienteService,
    private presupuestoService: PresupuestoService,
    private notificar: NotificacionService,
    private sanitizer: DomSanitizer,
    private breakpoints: BreakpointObserver,
    private dialog: MatDialog,
    private privilegios: PrivilegiosService,
  ) {}

  /**
   * El listado monta este editor como MODAL de pantalla completa. Al pulsar
   * «volver» se pide el cierre; el listado decide si hay cambios pendientes
   * antes de desmontarlo (ver `confirmarSalida`).
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * ¿La sesión trae este privilegio (`Create`/`Read`/`Update`/`Delete`) para el
   * editor de presupuestos? Manda sobre los botones de escritura: guardar y
   * responder exigen `Update`, eliminar exige `Delete`. El servidor vuelve a
   * validarlo; aquí sólo se evita ofrecer acciones que van a ser rechazadas.
   */
  Privilegio(metodo: string): boolean {
    return this.privilegios.tiene(metodo);
  }

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

    const pendiente = this.presupuestoService.tomarPendienteEdicion();
    if (pendiente) {
      const doc = await this.presupuestoService.obtener(pendiente);
      if (doc) {
        this.presupuesto.set(doc);
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

  /** Presupuesto nuevo con el siguiente número de la serie. */
  async nueva(): Promise<void> {
    const numero = await this.presupuestoService.siguienteNumero();
    this.presupuesto.set(presupuestoVacio({ numero }));
    this.clienteTexto.set('');
    this.buscarCliente.setValue('', { emitEvent: false });
    this.cambiado.set(false);
    this.cargando.set(false);
  }

  /**
   * Pide cerrar el editor. El listado dueño del modal confirma la salida si hay
   * cambios pendientes antes de desmontarlo.
   */
  volver(): void {
    this.cerrar.emit();
  }

  /** Escribe un campo del documento y marca los cambios pendientes. */
  set<K extends keyof Presupuesto>(campo: K, valor: Presupuesto[K]): void {
    if (this.readonly_()) return;
    this.presupuesto.update((f) => ({ ...f, [campo]: valor }));
    this.cambiado.set(true);
  }

  /** Cambia un campo de la copia del cliente (no toca su ficha). */
  setCliente<K extends keyof ClienteDocumento>(campo: K, valor: ClienteDocumento[K]): void {
    if (this.readonly_()) return;
    this.presupuesto.update((f) => ({
      ...f,
      cliente: f.cliente ? { ...f.cliente, [campo]: valor } : f.cliente,
    }));
    this.cambiado.set(true);
  }

  /** Cambia un número escrito como texto ("1.234,56") en un campo del documento. */
  setNumero(campo: 'alicuotaIva' | 'descuentoPorcentaje', valor: string): void {
    this.set(campo, parsearNumero(valor));
  }

  /** Cambia la divisa del presupuesto (no convierte importes). */
  setMoneda(moneda: string): void {
    this.set('moneda', moneda as MonedaPresupuesto);
  }

  /**
   * Enciende o apaga el IVA del presupuesto.
   *
   * Al apagarlo el impuesto deja de sumarse y la hoja y el resumen advierten que
   * el monto no lo lleva incluido; al encenderlo vuelve la alícuota guardada.
   */
  alternarIva(): void {
    if (this.readonly_()) return;
    this.set('aplicaIva', !this.presupuesto().aplicaIva);
  }

  /**
   * Cambia una de las condiciones comerciales de la oferta.
   *
   * `validezDias` es la única que además mueve una fecha: la validez del
   * presupuesto se recalcula desde la emisión para que el documento nunca diga
   * una cosa en el texto y otra en el pie.
   */
  setCondicion<K extends keyof CondicionesPresupuesto>(
    campo: K,
    valor: CondicionesPresupuesto[K],
  ): void {
    if (this.readonly_()) return;
    this.presupuesto.update((f) => {
      const condiciones = { ...f.condiciones, [campo]: valor };
      const dias = campo === 'validezDias' ? parsearNumero(valor) : f.condiciones.validezDias;
      return {
        ...f,
        condiciones,
        fechaValidez: fechaValidez(new Date(f.fechaEmision), dias).toISOString(),
      };
    });
    this.cambiado.set(true);
  }

  /** Validez en días escrita en el formulario. */
  setValidezDias(valor: string): void {
    this.setCondicion('validezDias', parsearNumero(valor));
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
   * Elige el cliente al que se cotiza.
   *
   * Se guarda una copia congelada de sus datos —RIF, domicilio, correo y trato
   * fiscal— porque el presupuesto enviado tiene que seguir diciendo lo mismo
   * aunque después se edite la ficha. El cliente exento de IVA deja el
   * presupuesto sin IVA.
   */
  elegirCliente(c: Cliente): void {
    if (this.readonly_()) return;
    const copia = snapshotCliente(c);
    this.presupuesto.update((f) => ({ ...f, cliente: copia }));
    this.clienteTexto.set('');
    this.buscarCliente.setValue('', { emitEvent: false });
    this.cambiado.set(true);
  }

  /** Refresca la copia del cliente con los datos actuales de su ficha. */
  async refrescarCliente(): Promise<void> {
    const codigo = this.presupuesto().cliente?.codigo;
    if (!codigo || this.readonly_()) return;

    const vivo = this.clientes().find((c) => c.codigo === codigo) ?? (await this.ficha(codigo));
    if (!vivo) {
      this.notificar.aviso(
        'No se encontró la ficha del cliente',
        `El cliente ${codigo} ya no está en el listado; se conserva la copia guardada.`,
      );
      return;
    }

    this.presupuesto.update((f) => ({ ...f, cliente: snapshotCliente(vivo) }));
    this.cambiado.set(true);
    this.notificar.exito(
      'Datos del cliente actualizados',
      'La copia del presupuesto se refrescó desde la ficha del cliente.',
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
    this.presupuesto.update((f) => ({ ...f, cliente: null }));
    this.cambiado.set(true);
  }

  /** Notas del cliente que sí cambian lo cotizado, para la tarjeta del panel. */
  notasCliente(c: ClienteDocumento | null): LineaTratamiento[] {
    if (!c) return [];
    const lineas: LineaTratamiento[] = [];

    if (this.clienteExentoIva()) {
      lineas.push({
        icono: 'money_off',
        titulo: 'Cliente exento de IVA',
        detalle: 'El presupuesto se cotiza sin IVA: la alícuota se aplica en cero.',
        tono: 'ok',
      });
    }
    if (c.condicionFiscal === 'ordinario') {
      lineas.push({
        icono: 'receipt_long',
        titulo: 'Contribuyente ordinario',
        detalle: 'Se aplica la alícuota general de IVA sobre la base imponible.',
        tono: 'info',
      });
    }
    if (this.descuento() > 0) {
      lineas.push({
        icono: 'percent',
        titulo: `Descuento comercial ${formatoPorcentaje(this.presupuesto().descuentoPorcentaje)}`,
        detalle: `Se descuentan ${formatoBs(this.descuento())} Bs antes de calcular el IVA.`,
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
    this.presupuesto.update((f) => ({
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
    const items = [...this.presupuesto().items];
    const item = items[indice];
    if (!item) return;

    items[indice] =
      campo === 'descripcion'
        ? { ...item, descripcion: valor }
        : { ...item, [campo]: parsearNumero(valor) };

    this.presupuesto.update((f) => ({ ...f, items }));
    this.cambiado.set(true);
  }

  /** Importe del renglón (cantidad × precio), tal como lo calcula la hoja. */
  totalItem(indice: number): number {
    const it = this.presupuesto().items[indice];
    return (Number(it?.cantidad) || 0) * (Number(it?.precio) || 0);
  }

  quitarItem(indice: number): void {
    if (this.readonly_()) return;
    this.presupuesto.update((f) => ({ ...f, items: f.items.filter((_, i) => i !== indice) }));
    this.cambiado.set(true);
  }

  async limpiarItems(): Promise<void> {
    if (this.readonly_()) return;
    if (this.presupuesto().items.length === 0) {
      this.notificar.aviso('Sin renglones', 'No hay renglones que quitar.');
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Quitar todos los renglones?',
      text: 'El presupuesto queda sin productos ni servicios cotizados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;
    this.presupuesto.update((f) => ({ ...f, items: [] }));
    this.cambiado.set(true);
  }

  // ═══════════════════════════════════════════
  // Fechas y numeración
  // ═══════════════════════════════════════════

  /**
   * El `input[type=date]` da "2026-10-18": se guardan las tres caras de la
   * fecha —ISO para ordenar, texto para imprimir y mes cotizado—.
   */
  setFecha(valor: string): void {
    if (!valor) return;
    const fecha = new Date(`${valor}T00:00:00`);
    if (isNaN(fecha.getTime())) return;
    this.presupuesto.update((f) => ({
      ...f,
      fechaEmision: fecha.toISOString(),
      fechaTexto: fechaTextoEmision(fecha),
      mes: f.mes || mesFacturado(fecha),
    }));
    this.cambiado.set(true);
  }

  /** Valor para el `input[type=date]`, a partir de la fecha ISO guardada. */
  fechaParaInput(f: Presupuesto): string {
    const d = new Date(f.fechaEmision);
    if (isNaN(d.getTime())) return '';
    const dos = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
  }

  /** Rehace el texto de emisión cuando cambia la ciudad o la fecha del encabezado. */
  setFechaTexto(valor: string): void {
    this.set('fechaTexto', valor);
  }

  // ═══════════════════════════════════════════
  // Impuestos de la oferta
  // ═══════════════════════════════════════════

  readonly clienteExentoIva = computed(() => clienteExentoIva(this.presupuesto()));
  readonly alicuotaIvaEfectiva = computed(() => alicuotaIvaEfectiva(this.presupuesto()));

  /** Interruptores de la hoja (los botones de la plantilla). */
  alternar(campo: 'mostrarFirmaSello' | 'mostrarCabeceraPie' | 'mostrarMarcaAgua'): void {
    if (this.readonly_()) return;
    this.presupuesto.update((f) => ({ ...f, [campo]: !f[campo] }));
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
   * Guarda el presupuesto. Con `enviar` pasa a `enviado`: los totales y la
   * huella quedan congelados y el documento deja de ser editable.
   */
  async guardar(enviar = false): Promise<boolean> {
    const f = this.presupuesto();
    if (this.readonly_()) return true;

    const problemas = validarPresupuesto(f);
    if (problemas.length > 0) {
      this.notificar.aviso(
        'Faltan datos del presupuesto',
        problemas.map((p) => p.mensaje).join(' '),
      );
      return false;
    }

    if (enviar) {
      const { isConfirmed } = await Swal.fire({
        title: '¿Enviar el presupuesto al cliente?',
        html: `El presupuesto <strong>${f.numero}</strong> queda cerrado con los montos de hoy ` +
          `y válido hasta el <strong>${fechaValidezCorta(f)}</strong>.<br>` +
          '<small>Después de enviarlo solo podrá aprobarse, rechazarse o anularse.</small>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Revisar',
        confirmButtonColor: '#0c2d48',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
      });
      if (!isConfirmed) return false;
    }

    this.guardando.set(true);
    const doc = await this.presupuestoService.guardar(enviar ? { ...f, estado: 'enviado' } : f);
    this.guardando.set(false);
    if (!doc) return false;

    this.presupuesto.set(doc);
    this.cambiado.set(false);
    this.notificar.exito(
      enviar ? 'Presupuesto enviado' : 'Presupuesto guardado',
      enviar
        ? `El presupuesto ${doc.numero} quedó enviado y ya no admite ediciones.`
        : `El presupuesto ${doc.numero} quedó registrado.`,
    );
    return true;
  }

  /**
   * Registra la respuesta del cliente sobre un presupuesto enviado.
   *
   * Aprobar o rechazar deja constancia de quién respondió y de por qué (en el
   * rechazo): es lo que después permite defender el precio cotizado.
   */
  async responder(respuesta: Extract<PresupuestoEstado, 'aprobado' | 'rechazado'>): Promise<void> {
    const f = this.presupuesto();
    const aprobado = respuesta === 'aprobado';

    const { isConfirmed, value } = await Swal.fire({
      title: aprobado ? '¿El cliente aprobó el presupuesto?' : '¿El cliente rechazó el presupuesto?',
      html: aprobado
        ? `El presupuesto <strong>${f.numero}</strong> queda aprobado y listo para facturar.`
        : `El presupuesto <strong>${f.numero}</strong> queda rechazado y no se factura.`,
      input: 'text',
      inputLabel: aprobado ? 'Quién aprobó' : 'Motivo del rechazo',
      inputPlaceholder: aprobado ? 'Nombre y apellido de quien aceptó' : 'Precio, plazo, alcance…',
      inputValidator: (v) => (v && v.trim() ? null : 'Escriba el dato para dejar constancia.'),
      icon: aprobado ? 'success' : 'warning',
      showCancelButton: true,
      confirmButtonText: aprobado ? 'Sí, aprobado' : 'Sí, rechazado',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: aprobado ? '#2e7d32' : '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    const texto = String(value ?? '').trim();
    const ok = await this.presupuestoService.responder(f.codigo, respuesta, {
      aprobadoPor: aprobado ? texto : '',
      motivoRechazo: aprobado ? '' : texto,
    });
    if (ok) {
      this.presupuesto.set({
        ...f,
        estado: respuesta,
        aprobadoPor: aprobado ? texto : '',
        motivoRechazo: aprobado ? '' : texto,
        fechaRespuesta: new Date().toISOString(),
      });
      this.notificar.exito(
        aprobado ? 'Presupuesto aprobado' : 'Presupuesto rechazado',
        aprobado
          ? `El presupuesto ${f.numero} quedó aprobado por ${texto}.`
          : `El presupuesto ${f.numero} quedó rechazado: ${texto}`,
      );
    }
  }

  /** Anula un presupuesto ya enviado (estado terminal, el número no se reutiliza). */
  async anular(): Promise<void> {
    const f = this.presupuesto();
    const { isConfirmed } = await Swal.fire({
      title: '¿Anular el presupuesto?',
      html: `El presupuesto <strong>${f.numero}</strong> queda sin efecto. Su número no se reutiliza.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    const ok = await this.presupuestoService.cambiarEstado(f.codigo, 'anulado', f.estado);
    if (ok) {
      this.presupuesto.set({ ...f, estado: 'anulado' });
      this.notificar.exito('Presupuesto anulado', `El presupuesto ${f.numero} quedó anulado.`);
    }
  }

  /** Elimina el borrador (borrado lógico: queda en la base para la traza). */
  async eliminar(): Promise<void> {
    const f = this.presupuesto();
    if (!f.codigo) {
      this.notificar.aviso(
        'Sin guardar',
        'El presupuesto todavía no está registrado: no hay nada que eliminar.',
      );
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar el presupuesto?',
      html: `El presupuesto <strong>${f.numero}</strong> deja de aparecer en el listado.<br>
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

    const ok = await this.presupuestoService.eliminar(f.codigo, f.estado);
    if (ok) {
      this.notificar.exito('Presupuesto eliminado', `El presupuesto ${f.numero} salió del listado.`);
      await this.nueva();
    }
  }

  /** Estado al que se puede pasar desde el actual. */
  async cambiarEstado(estado: PresupuestoEstado): Promise<void> {
    if (estado === 'anulado') {
      await this.anular();
      return;
    }
    if (estado === 'eliminado') {
      await this.eliminar();
      return;
    }
    if (estado === 'aprobado' || estado === 'rechazado') {
      await this.responder(estado);
      return;
    }
    if (estado === 'enviado') {
      await this.guardar(true);
    }
  }

  // ═══════════════════════════════════════════
  // Impresión
  // ═══════════════════════════════════════════

  async imprimir(): Promise<void> {
    const f = this.presupuesto();
    const { isConfirmed } = await Swal.fire({
      title: '¿Imprimir el presupuesto?',
      html: `Se abre el diálogo de impresión con la hoja de <strong>${f.numero}</strong>.<br>
        <small>Desde ahí también puede guardarlo como PDF.</small>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Imprimir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0c2d48',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;
    imprimirPresupuesto(f);
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
      this.presupuestoService.guardarBorradorLocal(this.presupuesto());
    }
  }
}
