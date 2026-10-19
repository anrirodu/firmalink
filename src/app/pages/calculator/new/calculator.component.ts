import { Component, EventEmitter, OnInit, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { ApiService, MonedaDivisa } from '../../../shared/services/api.service';
import { PuedeSalir } from '../../../shared/guards/cambios-sin-guardar.guard';
import {
  BASES_DEDUCCION,
  BaseDeduccion,
  Calculo,
  CalculoEstado,
  Deduccion,
  ESTADOS_CALCULO,
  PRESETS_DEDUCCION,
  TIPOS_DEDUCCION,
  TipoDeduccion,
  calculoVacio,
  claveDeduccion,
  detalleDeduccion,
  equivalenteDivisa,
  etiquetaBase,
  formulaDeduccion,
  formatoBs,
  formatoPorcentaje,
  infoEstadoCalculo,
  nombreCalculo,
  nombreDeduccion,
  nuevaDeduccion,
  parsearNumero,
  recalcular,
  validarCalculo,
} from '../calculo.model';
import { CalculoService } from '../calculo.service';

/** Cifras derivadas que el editor deja escribir a mano. */
type CifraAjustable = 'montoIva' | 'montoTotal' | 'ganancia';
/** Cifras fuente que se escriben con el teclado. */
type CifraFuente = 'montoSubtotal' | 'ivaPorcentaje' | 'gananciaPorcentaje';

/**
 * Calculadora: proyecta el neto de una factura cobrada por depósito.
 *
 * Se monta como MODAL de pantalla completa desde el listado (ver
 * `ListCalculatorComponent`), igual que el editor de facturas y presupuestos.
 *
 * El recorrido va de arriba abajo, como se hace la cuenta a mano:
 *
 *   1. el **monto total de la factura** y la alícuota → el IVA y el subtotal se
 *      calculan solos;
 *   2. el **monto depositado** (por defecto, el subtotal);
 *   3. las **deducciones**, que el usuario agrega a su gusto: cada una en
 *      porcentaje sobre la base que elija, o en monto fijo;
 *   4. el **saldo disponible**, la ganancia objetivo y el **saldo libre**.
 *
 * Las cifras que salen de una fórmula se autocalculan. Si el documento real no
 * cuadra con la fórmula, el usuario desbloquea la casilla (el lápiz) y escribe
 * su cifra: queda marcada como ajuste hasta que la devuelva a la fórmula con el
 * botón de deshacer.
 */
@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit, PuedeSalir {
  /** El cálculo en edición. */
  readonly calculo = signal<Calculo>(calculoVacio());

  readonly cargando = signal(true);
  readonly guardando = signal(false);
  readonly cambiado = signal(false);
  readonly consultandoTasa = signal(false);

  /** Cifras derivadas que el usuario desbloqueó (la fórmula no las toca). */
  readonly ajustes = signal<string[]>([]);
  /** ¿El monto depositado se escribió a mano? Si no, sigue al subtotal. */
  readonly depositadoManual = signal(false);

  /** Lo que impide guardar (nombre y monto de factura). */
  readonly problemas = computed(() => validarCalculo(this.calculo()));

  /** Deducciones del cálculo, en el orden en que se ven. */
  readonly deducciones = computed<Deduccion[]>(() => this.calculo().deducciones ?? []);

  /** ¿Hay alguna cifra fuera de la fórmula? */
  readonly hayAjustes = computed(() => this.ajustes().length > 0 || this.depositadoManual());

  /** Las deducciones superan el depósito: el saldo disponible queda en negativo. */
  readonly excedido = computed(
    () => parsearNumero(this.calculo().subtotalDeducciones) > parsearNumero(this.calculo().montoDepositado),
  );

  /** ¿Hay una tasa cargada con la que convertir a divisas? */
  readonly hayTasa = computed(() => parsearNumero(this.calculo().tasa?.valor) > 0);
  readonly simboloDivisa = computed(() => {
    const t = this.calculo().tasa;
    return (t?.simbolo || (t?.moneda === 'euro' ? ' EUR' : ' USD')).trim();
  });
  readonly subtotalEnDivisa = computed(() =>
    equivalenteDivisa(this.calculo().montoSubtotal, this.calculo().tasa),
  );
  readonly depositadoEnDivisa = computed(() =>
    equivalenteDivisa(this.calculo().montoDepositado, this.calculo().tasa),
  );
  readonly saldoLibreEnDivisa = computed(() =>
    equivalenteDivisa(this.calculo().saldoLibre, this.calculo().tasa),
  );

  /** Catálogos y utilidades del modelo que usa la plantilla. */
  readonly bases = BASES_DEDUCCION;
  readonly tipos = TIPOS_DEDUCCION;
  readonly presets = PRESETS_DEDUCCION;
  readonly estados = ESTADOS_CALCULO;
  readonly infoEstado = infoEstadoCalculo;
  readonly formatoBs = formatoBs;
  readonly formatoPorcentaje = formatoPorcentaje;
  readonly nombreCalculo = nombreCalculo;
  readonly nombreDeduccion = nombreDeduccion;
  readonly formulaDeduccion = formulaDeduccion;
  readonly detalleDeduccion = detalleDeduccion;
  readonly etiquetaBase = etiquetaBase;

  readonly monedas: { valor: MonedaDivisa; etiqueta: string }[] = [
    { valor: 'dolar', etiqueta: 'Dólar' },
    { valor: 'euro', etiqueta: 'Euro' },
  ];

  constructor(
    private calculoService: CalculoService,
    private api: ApiService,
    private notificar: NotificacionService,
  ) {}

  /** El listado dueño del modal escucha este evento para desmontarlo. */
  @Output() cerrar = new EventEmitter<void>();

  async ngOnInit(): Promise<void> {
    // Si el listado pidió editar un cálculo, se abre ese.
    const pendiente = this.calculoService.tomarPendienteEdicion();
    if (pendiente) {
      const doc = await this.calculoService.obtener(pendiente);
      if (doc) {
        this.calculo.set(doc);
        this.detectarAjustes(doc);
        this.depositadoManual.set(this.esDepositadoManual(doc));
        this.cargando.set(false);
        // La tasa no se consulta sola: se pide con el botón «Consultar» o se
        // escribe a mano. Así el editor no sale a la red cada vez que se abre.
        return;
      }
    }

    await this.nuevo();
  }

  // ═══════════════════════════════════════════
  // Ciclo del formulario
  // ═══════════════════════════════════════════

  /** Cálculo en blanco. Reanuda el borrador local si quedó uno sin registrar. */
  async nuevo(): Promise<void> {
    const borrador = this.calculoService.leerBorradorLocal();

    if (borrador && !borrador.codigo) {
      this.calculo.set(recalcular(borrador));
      this.ajustes.set([]);
      this.depositadoManual.set(this.esDepositadoManual(borrador));
      this.cambiado.set(true);
      this.cargando.set(false);
      return;
    }

    this.calculo.set(calculoVacio());
    this.ajustes.set([]);
    this.depositadoManual.set(false);
    this.cambiado.set(false);
    this.cargando.set(false);
  }

  /** Pide cerrar el modal; el listado confirma si hay cambios pendientes. */
  volver(): void {
    this.cerrar.emit();
  }

  // ═══════════════════════════════════════════
  // Cifras fuente
  // ═══════════════════════════════════════════

  /** Escribe una cifra de la que cuelga el resto del desglose. */
  setFuente(campo: CifraFuente, texto: string): void {
    this.calculo.update((c) => ({ ...c, [campo]: parsearNumero(texto) }));
    this.recalcular();
    this.cambiado.set(true);
  }

  /** Monto depositado: al escribirlo deja de seguir a la fórmula (total − deducciones). */
  setDepositado(texto: string): void {
    this.calculo.update((c) => ({ ...c, montoDepositado: parsearNumero(texto) }));
    this.depositadoManual.set(true);
    this.recalcular();
    this.cambiado.set(true);
  }

  /** Vuelve a dejar el depósito en automático (total − deducciones). */
  usarDepositoAutomatico(): void {
    this.depositadoManual.set(false);
    this.soltarAjuste('montoDepositado', false);
    this.recalcular();
    this.cambiado.set(true);
  }

  /** Nombre con el que se reconoce el cálculo en el listado. */
  setNombre(texto: string): void {
    this.calculo.update((c) => ({ ...c, nombre: texto }));
    this.cambiado.set(true);
  }

  /** Fecha que se imprime en el cálculo. */
  setFechaTexto(texto: string): void {
    this.calculo.update((c) => ({ ...c, fechaTexto: texto }));
    this.cambiado.set(true);
  }

  /** Estatus del cálculo (borrador / procesado / anulada). */
  setEstado(estado: string): void {
    const valor = (ESTADOS_CALCULO as string[]).includes(estado)
      ? (estado as CalculoEstado)
      : 'borrador';
    this.calculo.update((c) => ({ ...c, estado: valor }));
    this.cambiado.set(true);
  }

  // ═══════════════════════════════════════════
  // Cifras derivadas (ajustes a mano)
  // ═══════════════════════════════════════════

  /** ¿Esta cifra la escribió el usuario? */
  esAjuste(clave: string): boolean {
    return this.ajustes().includes(clave);
  }

  /** Desbloquea una cifra derivada para escribirla a mano. */
  ajustar(clave: string): void {
    if (!this.ajustes().includes(clave)) {
      this.ajustes.update((a) => [...a, clave]);
    }
  }

  /**
   * Devuelve una cifra a la fórmula.
   *
   * `rehacer` en falso se usa cuando el llamador ya va a recalcular (evita dos
   * pasadas sobre el mismo cálculo).
   */
  soltarAjuste(clave: string, rehacer = true): void {
    if (!this.ajustes().includes(clave)) return;
    this.ajustes.update((a) => a.filter((k) => k !== clave));
    if (rehacer) {
      this.recalcular();
      this.cambiado.set(true);
    }
  }

  /** Lápiz / deshacer de una cifra derivada. */
  alternarAjuste(clave: string): void {
    if (this.esAjuste(clave)) {
      this.soltarAjuste(clave);
      return;
    }
    this.ajustar(clave);
  }

  /** Escribe una cifra derivada que estaba desbloqueada. */
  setDerivado(campo: CifraAjustable, texto: string): void {
    this.calculo.update((c) => ({ ...c, [campo]: parsearNumero(texto) }));
    this.recalcular();
    this.cambiado.set(true);
  }

  /** Devuelve todas las cifras a la fórmula del modelo. */
  recalcularTodo(): void {
    this.ajustes.set([]);
    this.depositadoManual.set(false);
    this.recalcular();
    this.cambiado.set(true);
    this.notificar.info('Cifras recalculadas', 'Todas las casillas volvieron a la fórmula del modelo.');
  }

  private recalcular(): void {
    this.calculo.update((c) => recalcular(c, new Set(this.ajustes()), this.depositadoManual()));
  }

  /**
   * Al reabrir un cálculo guardado no se sabe qué casillas se escribieron a mano:
   * se comparan las cifras guardadas con las que daría la fórmula y las que no
   * coincidan quedan marcadas como ajustes.
   */
  private detectarAjustes(doc: Calculo): void {
    const formula = recalcular(
      { ...doc, deducciones: (doc.deducciones ?? []).map((d) => ({ ...d, monto: 0 })) },
      new Set(),
      false,
    );
    const distintos = (a: number, b: number) => Math.abs(parsearNumero(a) - parsearNumero(b)) > 0.005;

    const ajustes: string[] = [];
    if (distintos(formula.montoIva, doc.montoIva)) ajustes.push('montoIva');
    if (distintos(formula.montoTotal, doc.montoTotal)) ajustes.push('montoTotal');
    if (distintos(formula.ganancia, doc.ganancia)) ajustes.push('ganancia');
    (doc.deducciones ?? []).forEach((d, i) => {
      if (distintos(formula.deducciones[i]?.monto ?? 0, d.monto)) ajustes.push(claveDeduccion(d.id));
    });

    this.ajustes.set(ajustes);
  }

  /**
   * ¿El monto depositado guardado se escribió a mano o sigue la fórmula?
   *
   * El depósito sigue por defecto al **total menos las deducciones**; si el
   * guardado no coincide con eso, es porque alguien lo fijó a mano.
   */
  private esDepositadoManual(doc: Calculo): boolean {
    const formula = recalcular(doc, new Set(this.ajustes()), false);
    return Math.abs(parsearNumero(doc.montoDepositado) - parsearNumero(formula.montoDepositado)) > 0.005;
  }

  // ═══════════════════════════════════════════
  // Deducciones
  // ═══════════════════════════════════════════

  /** Agrega una deducción en blanco (o con los datos de un atajo). */
  agregarDeduccion(datos: Partial<Deduccion> = {}): void {
    this.calculo.update((c) => ({ ...c, deducciones: [...(c.deducciones ?? []), nuevaDeduccion(datos)] }));
    this.recalcular();
    this.cambiado.set(true);
  }

  /** Agrega una de las deducciones de siempre (Negro Primero, retención…). */
  agregarPreset(indice: number): void {
    const preset = this.presets[indice];
    if (!preset) return;
    this.agregarDeduccion(preset.deduccion);
  }

  /** Quita una deducción del cálculo. */
  quitarDeduccion(d: Deduccion): void {
    this.calculo.update((c) => ({
      ...c,
      deducciones: (c.deducciones ?? []).filter((x) => x.id !== d.id),
    }));
    this.soltarAjuste(claveDeduccion(d.id), false);
    this.recalcular();
    this.cambiado.set(true);
  }

  setDeduccionNombre(d: Deduccion, texto: string): void {
    this.conDeduccion(d.id, (x) => ({ ...x, nombre: texto }));
  }

  /**
   * Cambia el tipo (% ↔ Bs). Al pasar a monto fijo se suelta el ajuste: la cifra
   * ya es explícita y no tiene sentido tenerla además desbloqueada.
   */
  setDeduccionTipo(d: Deduccion, tipo: TipoDeduccion): void {
    this.conDeduccion(d.id, (x) => ({ ...x, tipo: tipo === 'monto' ? 'monto' : 'porcentaje' }));
    if (tipo === 'monto') {
      this.soltarAjuste(claveDeduccion(d.id), false);
      this.recalcular();
    }
  }

  setDeduccionBase(d: Deduccion, base: BaseDeduccion): void {
    this.conDeduccion(d.id, (x) => ({ ...x, base }));
  }

  /** Escribe el porcentaje (o el monto) de la deducción: manda la fórmula. */
  setDeduccionValor(d: Deduccion, texto: string): void {
    this.conDeduccion(d.id, (x) => ({ ...x, valor: parsearNumero(texto) }));
    this.soltarAjuste(claveDeduccion(d.id), false);
    this.recalcular();
  }

  /** Escribe en bolívares una deducción en porcentaje (cifra ajustada a mano). */
  setDeduccionMonto(d: Deduccion, texto: string): void {
    this.ajustar(claveDeduccion(d.id));
    this.conDeduccion(d.id, (x) => ({ ...x, monto: parsearNumero(texto) }));
  }

  /** ¿El monto de esta deducción lo escribió el usuario? */
  esAjusteDeduccion(d: Deduccion): boolean {
    return this.esAjuste(claveDeduccion(d.id));
  }

  /** Lápiz / deshacer del monto de una deducción. */
  alternarAjusteDeduccion(d: Deduccion): void {
    if (this.esAjusteDeduccion(d)) {
      this.soltarAjuste(claveDeduccion(d.id));
      return;
    }
    this.ajustar(claveDeduccion(d.id));
  }

  private conDeduccion(id: string, cambios: (d: Deduccion) => Deduccion): void {
    this.calculo.update((c) => ({
      ...c,
      deducciones: (c.deducciones ?? []).map((d) => (d.id === id ? cambios(d) : d)),
    }));
    this.recalcular();
    this.cambiado.set(true);
  }

  // ═══════════════════════════════════════════
  // Tasa de cambio
  // ═══════════════════════════════════════════

  /**
   * Trae la tasa oficial de la divisa (`POST /v1/api/divisa`).
   *
   * El valor llega en formato venezolano ("881,06640000"): se guarda ya
   * convertido a número para poder usarlo en cuentas y en la conversión a
   * divisas de la cabecera.
   */
  async consultarTasa(moneda: MonedaDivisa = this.calculo().tasa.moneda): Promise<void> {
    this.consultandoTasa.set(true);
    try {
      const respuesta = await firstValueFrom(this.api.Divisa(moneda));
      const datos = respuesta?.data;
      const valor = parsearNumero(datos?.valor ?? 0);
      if (!(valor > 0)) {
        throw new Error(respuesta?.mensaje || 'La respuesta no trae el valor de la tasa');
      }
      this.calculo.update((c) => ({
        ...c,
        tasa: {
          moneda,
          valor,
          simbolo: datos?.simbolo ?? '',
          fecha: datos?.fecha ?? '',
          fuente: datos?.url ?? '',
          actualizadaEn: new Date().toISOString(),
        },
      }));
    } catch (e) {
      this.notificar.aviso(
        `No se pudo consultar la tasa del ${moneda === 'euro' ? 'euro' : 'dólar'}`,
        `Se conserva la tasa del formulario (${NotificacionService.detalle(e)}).`,
      );
    } finally {
      this.consultandoTasa.set(false);
    }
  }

  /** Cambia la divisa y trae su tasa. */
  async cambiarMoneda(moneda: string): Promise<void> {
    await this.consultarTasa(moneda === 'euro' ? 'euro' : 'dolar');
  }

  /** Escribe la tasa a mano (cuando el usuario consigue el valor por su cuenta). */
  setTasaValor(texto: string): void {
    const valor = parsearNumero(texto);
    this.calculo.update((c) => ({ ...c, tasa: { ...c.tasa, valor, actualizadaEn: new Date().toISOString() } }));
    this.cambiado.set(true);
  }

  // ═══════════════════════════════════════════
  // Guardado
  // ═══════════════════════════════════════════

  /** Registra el cálculo (con su huella) en la base. */
  async guardar(): Promise<boolean> {
    const c = this.calculo();

    const problemas = validarCalculo(c);
    if (problemas.length > 0) {
      this.notificar.aviso('Faltan datos del cálculo', problemas.map((p) => p.mensaje).join(' '));
      return false;
    }

    this.guardando.set(true);
    const doc = await this.calculoService.guardar(c);
    this.guardando.set(false);
    if (!doc) return false;

    this.calculo.set(doc);
    this.cambiado.set(false);
    this.calculoService.descartarBorradorLocal();
    this.notificar.exito(
      'Cálculo guardado',
      `«${nombreCalculo(doc)}» quedó registrado como ${doc.codigo} (${infoEstadoCalculo(doc.estado).etiqueta}).`,
    );
    return true;
  }

  /**
   * Marca el cálculo como procesado y lo guarda.
   *
   * Procesar cierra el cálculo: sus cifras ya no se editan. Se confirma con
   * SweetAlert porque el cambio no se deshace solo (habría que devolverlo a
   * borrador desde el listado).
   */
  async procesar(): Promise<void> {
    const c = this.calculo();

    const problemas = validarCalculo(c);
    if (problemas.length > 0) {
      this.notificar.aviso('Faltan datos del cálculo', problemas.map((p) => p.mensaje).join(' '));
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: '¿Marcar el cálculo como procesado?',
      html: `«<strong>${nombreCalculo(c)}</strong>» quedará cerrado: sus cifras ya no admiten ediciones.<br>
        <small>Podrá devolverlo a borrador o anularlo desde el listado.</small>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, procesar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1565c0',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    this.calculo.update((d) => ({ ...d, estado: 'procesado' }));
    await this.guardar();
  }

  /** Descarta el cálculo (borrado lógico: queda en la base para la traza). */
  async eliminar(): Promise<void> {
    const c = this.calculo();
    if (!c.codigo) {
      this.notificar.aviso('Sin guardar', 'El cálculo todavía no está registrado: no hay nada que eliminar.');
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar el cálculo?',
      html: `«<strong>${nombreCalculo(c)}</strong>» deja de aparecer en el listado.<br>
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

    const ok = await this.calculoService.eliminar(c.codigo);
    if (ok) {
      this.notificar.exito('Cálculo eliminado', `«${nombreCalculo(c)}» salió del listado.`);
      this.cambiado.set(false);
      this.volver();
    }
  }

  // ═══════════════════════════════════════════
  // PuedeSalir (guarda de cambios sin guardar)
  // ═══════════════════════════════════════════

  hayCambiosSinGuardar(): boolean {
    return this.cambiado();
  }

  async guardarAntesDeSalir(): Promise<boolean> {
    return this.guardar();
  }

  respaldarAlSalir(): void {
    if (this.cambiado()) {
      this.calculoService.guardarBorradorLocal(this.calculo());
    }
  }
}
