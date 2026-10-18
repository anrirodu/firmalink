import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import {
  BANCOS,
  CATEGORIAS,
  CONDICIONES_FISCALES,
  CategoriaCliente,
  Cliente,
  CondicionFiscal,
  CondicionPago,
  ESTADOS_CIVILES,
  ESTADOS_CLIENTE,
  ESTADOS_VENEZUELA,
  FORMAS_PAGO,
  LineaTratamiento,
  MONEDAS,
  NIVELES_GOBIERNO,
  ORIGENES_CLIENTE,
  PestanaCliente,
  ProblemaCliente,
  TIPOS_DOCUMENTO,
  TIPOS_ORGANIZACION_COMUNAL,
  TIPOS_SUJETO_DIPLOMATICO,
  TipoDocumento,
  ValidacionCliente,
  clienteVacio,
  construirIdentificacion,
  construirRif,
  digitosVerificadoresRif,
  esPersona,
  esRifOrganizacion,
  estaEliminado,
  etiquetaRazonSocial,
  formatearDocumento,
  infoCategoria,
  interpretarDocumento,
  nombreCliente,
  normalizarCliente,
  perfilFiscalPorDefecto,
  perfilFiscalSinCambios,
  soloDigitos,
  tratamientoFiscal,
  validarCliente,
} from '../cliente.model';
import { ClienteDuplicadoError, ClienteService } from '../cliente.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { escaparHtml } from '../../../shared/utils/escapar-html';

/** Pedido al listado para abrir otro cliente (el dueño de un documento repetido). */
export interface SolicitudAbrirCliente {
  cliente: Cliente;
  /** true si el cliente está eliminado y se quiere restaurar */
  restaurar: boolean;
}

interface PestanaInfo {
  id: PestanaCliente;
  etiqueta: string;
  icono: string;
}

/**
 * Modal "Cliente" — alta y edición de clientes.
 *
 * Patrón visual del modal de Nueva Contratación (backdrop con blur, tarjeta
 * con slideUp, cabecera en degradado y pie Cancelar/Aceptar), organizado en
 * pestañas porque la ficha completa es extensa. Las reglas viven en
 * `cliente.model.ts`; aquí solo se orquesta la captura.
 *
 * La app es zoneless: todo lo que cambia de forma asíncrona es un signal.
 * El modelo `m` lo editan los ngModel (eventos de plantilla, que sí disparan
 * la detección de cambios).
 */
@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  /** Cliente a editar (documento completo); null para un alta */
  readonly cliente = input<Cliente | null>(null);
  /** Listado completo (incluye eliminados) para detectar documentos repetidos */
  readonly clientes = input<readonly Cliente[]>([]);
  /** Se abrió para restaurar un cliente eliminado */
  readonly restaurar = input(false);

  readonly cerrar = output<void>();
  readonly guardado = output<Cliente>();
  readonly abrirCliente = output<SolicitudAbrirCliente>();

  // — Catálogos para la plantilla —
  readonly categorias = CATEGORIAS;
  readonly condiciones = CONDICIONES_FISCALES;
  readonly estados = ESTADOS_CLIENTE;
  readonly tiposDocumento = TIPOS_DOCUMENTO;
  readonly tiposSujetoDiplomatico = TIPOS_SUJETO_DIPLOMATICO;
  readonly nivelesGobierno = NIVELES_GOBIERNO;
  readonly tiposOrganizacionComunal = TIPOS_ORGANIZACION_COMUNAL;
  readonly estadosVenezuela = ESTADOS_VENEZUELA;
  readonly estadosCiviles = ESTADOS_CIVILES;
  readonly monedas = MONEDAS;
  readonly formasPago = FORMAS_PAGO;
  readonly origenes = ORIGENES_CLIENTE;
  readonly bancos = BANCOS;
  readonly esRifOrganizacion = esRifOrganizacion;
  readonly etiquetaRazonSocial = etiquetaRazonSocial;
  readonly estaEliminado = estaEliminado;
  readonly nombreCliente = nombreCliente;
  readonly formatearDocumento = formatearDocumento;

  readonly pestanas: readonly PestanaInfo[] = [
    { id: 'identificacion', etiqueta: 'Identificación', icono: 'badge' },
    { id: 'datos', etiqueta: 'Datos generales', icono: 'assignment_ind' },
    { id: 'fiscal', etiqueta: 'Perfil fiscal', icono: 'receipt_long' },
    { id: 'contacto', etiqueta: 'Contacto y domicilio', icono: 'contact_phone' },
    { id: 'comercial', etiqueta: 'Comercial', icono: 'storefront' },
  ];

  /** Modelo de trabajo */
  m: Cliente = clienteVacio();

  readonly pestana = signal<PestanaCliente>('identificacion');
  /** Se activa al intentar guardar: desde ahí se muestran los errores */
  readonly intentado = signal(false);
  readonly guardando = signal(false);
  /** Cliente que ya tiene el documento capturado */
  readonly duplicado = signal<Cliente | null>(null);

  readonly esNuevo = computed(() => !this.cliente()?.codigo);
  readonly indicePestana = computed(() => this.pestanas.findIndex((p) => p.id === this.pestana()));

  private instantanea = '';
  private readonly servicio = inject(ClienteService);
  private readonly notificar = inject(NotificacionService);
  private readonly injector = inject(Injector);
  private readonly cuerpo = viewChild<ElementRef<HTMLElement>>('cuerpo');

  /**
   * Escape cierra y Ctrl/Cmd+S guarda. Se escucha en fase de captura: los
   * scripts globales (Bootstrap / SweetAlert) se comen la fase de burbuja
   * del keydown (mismo motivo que en el listado de acuerdos).
   */
  private readonly alPulsarTecla = (evento: KeyboardEvent): void => {
    if (Swal.isVisible()) {
      return;
    }
    if (evento.key === 'Escape') {
      evento.preventDefault();
      void this.solicitarCierre();
    } else if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 's') {
      evento.preventDefault();
      void this.guardar();
    }
  };

  ngOnInit(): void {
    const origen = this.cliente();
    this.m = origen ? normalizarCliente(origen) : clienteVacio('V');
    if (this.restaurar()) {
      this.m.estado = 'activo';
    }
    this.instantanea = this.firma();
    document.addEventListener('keydown', this.alPulsarTecla, true);

    if (this.esNuevo()) {
      afterNextRender(() => this.enfocar('numeroDocumento'), { injector: this.injector });
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.alPulsarTecla, true);
  }

  // ─────────────────────────── estado derivado ───────────────────────────

  /** Se evalúa una sola vez por ciclo de detección (`@let` en la plantilla). */
  validacion(): ValidacionCliente {
    return validarCliente(this.m);
  }

  tratamiento(): LineaTratamiento[] {
    return tratamientoFiscal(this.m);
  }

  /** Mensaje de error del campo, solo después del primer intento de guardar */
  msg(validacion: ValidacionCliente, campo: string): string {
    return this.intentado() ? (validacion.porCampo[campo] ?? '') : '';
  }

  get categoriaInfo() {
    return infoCategoria(this.m.categoria);
  }

  get persona(): boolean {
    return esPersona(this.m);
  }

  get documentosPermitidos(): TipoDocumento[] {
    return [...(this.categoriaInfo?.documentos ?? [])];
  }

  /** RIF de la persona natural, derivado de su cédula */
  get rifCalculado(): string {
    return construirRif(this.m.tipoDocumento, this.m.numeroDocumento, this.m.digitoVerificador);
  }

  /** Dígito que corresponde al RIF escrito (ayuda visual junto al campo) */
  get dvSugerido(): string {
    const digitos = soloDigitos(this.m.numeroDocumento);
    return digitos.length === 8 ? digitosVerificadoresRif(this.m.tipoDocumento, digitos).join(' o ') : '';
  }

  get etiquetaNumero(): string {
    if (this.m.tipoDocumento === 'P') {
      return 'Número de pasaporte';
    }
    return esRifOrganizacion(this.m.tipoDocumento) ? 'Número de RIF' : 'Número de cédula';
  }

  get requiereDomicilio(): boolean {
    return !this.persona || this.m.condicionFiscal !== 'no_contribuyente';
  }

  get requiereBaseLegal(): boolean {
    return this.m.condicionFiscal === 'exento' || this.m.condicionFiscal === 'exonerado';
  }

  get placeholderBaseLegal(): string {
    return this.m.categoria === 'D'
      ? 'Ej.: Convención de Viena sobre Relaciones Diplomáticas (1961) · franquicia MPPRE'
      : 'Ej.: Ley de IVA, art. 18 · Decreto N° … (G.O. N° …)';
  }

  etiquetaPestana(id: PestanaCliente): string {
    return this.pestanas.find((p) => p.id === id)?.etiqueta ?? id;
  }

  // ─────────────────────────── identificación ───────────────────────────

  /**
   * Cambia la categoría. Ajusta el tipo de documento si el actual no aplica y,
   * si el perfil fiscal sigue siendo el sugerido, lo reemplaza por el de la
   * nueva categoría (lo que el usuario ya personalizó no se pisa).
   */
  elegirCategoria(categoria: CategoriaCliente): void {
    if (this.m.categoria === categoria) {
      return;
    }
    const perfilIntacto = perfilFiscalSinCambios(this.m);
    const anterior = this.m.categoria;
    this.m.categoria = categoria;

    const permitidos = infoCategoria(categoria)?.documentos ?? [];
    if (!permitidos.includes(this.m.tipoDocumento)) {
      this.m.tipoDocumento = permitidos[0];
      this.m.digitoVerificador = '';
    }
    if (perfilIntacto) {
      Object.assign(this.m, perfilFiscalPorDefecto(categoria));
    }
    if (categoria === 'V' && !this.m.nacionalidad) {
      this.m.nacionalidad = 'Venezolana';
    } else if (anterior === 'V' && this.m.nacionalidad === 'Venezolana') {
      this.m.nacionalidad = '';
    }
    this.verificarDuplicado();
  }

  cambiarTipoDocumento(tipo: TipoDocumento): void {
    this.m.tipoDocumento = tipo;
    if (!esRifOrganizacion(tipo)) {
      this.m.digitoVerificador = '';
    }
    this.verificarDuplicado();
  }

  /**
   * Al salir del número: si se pegó el documento completo ("J-12345678-9")
   * se reparte en tipo, número y dígito (y se ajusta la categoría si hace
   * falta). Luego se busca si el documento ya está registrado.
   */
  alSalirDelDocumento(): void {
    const leido = this.m.tipoDocumento === 'P' ? null : interpretarDocumento(this.m.numeroDocumento);
    if (leido) {
      if (!this.documentosPermitidos.includes(leido.tipo) && infoCategoria(leido.tipo)) {
        this.elegirCategoria(leido.tipo as CategoriaCliente);
      }
      if (this.documentosPermitidos.includes(leido.tipo)) {
        this.m.tipoDocumento = leido.tipo;
        this.m.numeroDocumento = leido.numero;
        if (!esRifOrganizacion(leido.tipo)) {
          this.m.digitoVerificador = '';
        } else if (leido.digito) {
          this.m.digitoVerificador = leido.digito;
        }
      }
    }
    this.verificarDuplicado();
  }

  verificarDuplicado(): void {
    const id = construirIdentificacion(this.m.tipoDocumento, this.m.numeroDocumento);
    const existente = id
      ? this.clientes().find((c) => c.identificacion === id && c.codigo !== this.m.codigo)
      : undefined;
    this.duplicado.set(existente ?? null);
  }

  /** Abre la ficha del cliente dueño del documento (o lo restaura si está eliminado). */
  async abrirDuplicado(): Promise<void> {
    const existente = this.duplicado();
    if (!existente || !(await this.puedeCerrarse())) {
      return;
    }
    this.abrirCliente.emit({ cliente: existente, restaurar: estaEliminado(existente) });
  }

  // ─────────────────────────── perfil fiscal y comercial ───────────────────────────

  elegirCondicion(condicion: CondicionFiscal): void {
    this.m.condicionFiscal = condicion;
    if (condicion === 'especial') {
      this.alternarRetencionIva(true);
    }
  }

  alternarRetencionIva(activo: boolean): void {
    this.m.agenteRetencionIva = activo;
    if (activo && !this.m.porcentajeRetencionIva) {
      this.m.porcentajeRetencionIva = 75;
    }
  }

  elegirCondicionPago(condicion: CondicionPago): void {
    this.m.condicionPago = condicion;
    if (condicion === 'credito' && !this.m.diasCredito) {
      this.m.diasCredito = 30;
    }
  }

  /** Con la cuenta completa se deduce el banco por su código SUDEBAN. */
  alSalirDeCuenta(): void {
    const cuenta = soloDigitos(this.m.bancario.numeroCuenta);
    if (cuenta.length === 20 && !this.m.bancario.banco) {
      this.m.bancario.banco = BANCOS.find((b) => cuenta.startsWith(b.valor))?.valor ?? '';
    }
  }

  // ─────────────────────────── navegación ───────────────────────────

  irAPestana(id: PestanaCliente): void {
    this.pestana.set(id);
    this.cuerpo()?.nativeElement.scrollTo({ top: 0 });
  }

  pestanaAnterior(): void {
    const i = this.indicePestana();
    if (i > 0) {
      this.irAPestana(this.pestanas[i - 1].id);
    }
  }

  pestanaSiguiente(): void {
    const i = this.indicePestana();
    if (i < this.pestanas.length - 1) {
      this.irAPestana(this.pestanas[i + 1].id);
    }
  }

  /** Lleva a la pestaña del problema y enfoca su campo */
  irAProblema(problema: ProblemaCliente): void {
    this.irAPestana(problema.pestana);
    afterNextRender(() => this.enfocar(problema.campo), { injector: this.injector });
  }

  private enfocar(campo: string): void {
    this.cuerpo()
      ?.nativeElement.querySelector<HTMLElement>(`[data-campo="${campo}"]`)
      ?.focus();
  }

  // ─────────────────────────── guardar / cerrar ───────────────────────────

  async guardar(): Promise<void> {
    if (this.guardando()) {
      return;
    }
    this.intentado.set(true);

    const { errores } = this.validacion();
    if (errores.length) {
      this.irAProblema(errores[0]);
      this.notificar.aviso(
        'Revise los datos del cliente',
        `${errores.length} ${errores.length === 1 ? 'dato requiere' : 'datos requieren'} atención.`,
      );
      return;
    }

    this.guardando.set(true);
    try {
      const doc = await this.servicio.guardar(this.m, {
        nuevo: this.esNuevo(),
        restaurar: this.restaurar(),
      });
      this.instantanea = this.firma();
      this.guardado.emit(doc);
    } catch (e) {
      if (e instanceof ClienteDuplicadoError) {
        this.duplicado.set(e.existente);
        this.irAPestana('identificacion');
        this.notificar.error('Documento ya registrado', e.message);
      } else {
        await this.notificar.errorModal(
          'No se pudo guardar el cliente',
          `${escaparHtml(NotificacionService.detalle(e))}<br><br>` +
            '<small>Los datos siguen en el formulario: puede reintentar.</small>',
        );
      }
    } finally {
      this.guardando.set(false);
    }
  }

  hayCambios(): boolean {
    return this.firma() !== this.instantanea;
  }

  /** true si no hay cambios o el usuario acepta descartarlos */
  async puedeCerrarse(): Promise<boolean> {
    if (!this.hayCambios()) {
      return true;
    }
    const respuesta = await Swal.fire({
      icon: 'question',
      title: '¿Descartar los cambios?',
      text: 'Los datos capturados de este cliente se perderán.',
      showCancelButton: true,
      confirmButtonText: 'Descartar',
      cancelButtonText: 'Seguir editando',
      confirmButtonColor: '#a12c2c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    return respuesta.isConfirmed;
  }

  async solicitarCierre(): Promise<void> {
    if (this.guardando()) {
      return;
    }
    if (await this.puedeCerrarse()) {
      this.cerrar.emit();
    }
  }

  fechaHora(iso: string | undefined): string {
    const fecha = iso ? new Date(iso) : null;
    return fecha && !isNaN(fecha.getTime()) ? fecha.toLocaleString('es-VE') : '—';
  }

  private firma(): string {
    return JSON.stringify(this.m);
  }
}
