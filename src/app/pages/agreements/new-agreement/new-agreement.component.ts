import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CAMPOS_DEFAULT, DOCUMENTO_DEFAULT } from './new-agreement.documento';
import Swal from 'sweetalert2';
import { AcuerdoService } from './acuerdo.service';
import { Acuerdo, AcuerdoEstado, esEditable, motivoBloqueo, transicionesPermitidas } from './acuerdo.model';
import { construirDocumentoImpresion } from './new-agreement.impresion';
import { AuthService } from '../../../auth/services/auth.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { CorreoError, CorreoService } from '../../../shared/services/correo.service';
import { PdfService } from '../../../shared/services/pdf.service';
import { construirCorreoAcuerdo } from '../acuerdo-correo';
import { cargarLogoCorreo, generarPdfAcuerdo } from '../acuerdo-pdf';
import type { PdfAcuerdoGenerado } from '../acuerdo-pdf';
import { pedirDestinatariosCorreo } from '../enviar-correo.dialog';
import { PuedeSalir } from '../../../shared/guards/cambios-sin-guardar.guard';

/** Presets de márgenes de hoja (en centímetros) */
interface PresetMargen {
  id: string;
  etiqueta: string;
  sup: number;
  inf: number;
  izq: number;
  der: number;
}

/**
 * Página "Nuevo Acuerdo" (New Agreement).
 *
 * Layout de dos columnas:
 *  - Izquierda: panel con los nombres y campos editables del contrato
 *    (código, título, partes, vigencia, honorarios, firmas). Cada cambio
 *    se sincroniza con los <span data-campo="..."> del documento.
 *  - Derecha: editor WYSIWYG sobre hoja oficio (Letter 8.5" x 11") con
 *    márgenes de contrato, tipografía predeterminada Tahoma 13 y toolbar
 *    de formato (negrita, subrayado, alineaciones, tabulaciones,
 *    sangrías, literales a) b) c), viñetas, interlineado y márgenes).
 */
@Component({
  selector: 'app-new-agreement',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './new-agreement.component.html',
  styleUrls: ['./new-agreement.component.scss'],
})
export class NewAgreementComponent implements AfterViewInit, OnDestroy, PuedeSalir {
  @ViewChild('editorTexto') editorTexto?: ElementRef<HTMLDivElement>;
  @ViewChild('hoja') hoja?: ElementRef<HTMLDivElement>;
  @ViewChild('hojaWrap') hojaWrap?: ElementRef<HTMLDivElement>;
  @ViewChild('editorToolbar') editorToolbar?: ElementRef<HTMLDivElement>;

  /**
   * Speed dial flotante (móvil y tablet): el botón de acción principal
   * despliega el resto de botones del encabezado, que se ocultan allí
   * porque no caben en la barra superior de una pantalla angosta.
   */
  accionesAbiertas = signal(false);

  toggleAcciones(): void {
    this.accionesAbiertas.update((abierto) => !abierto);
  }

  /**
   * Escape cierra el speed dial. Se registra en fase de captura: hay scripts
   * globales (Bootstrap / SweetAlert) que se comen la fase de burbuja del
   * keydown, así que con un @HostListener('document:keydown.escape') el
   * evento nunca llegaba al componente.
   */
  private readonly alPulsarEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.accionesAbiertas()) {
      this.accionesAbiertas.set(false);
    }
  };

  /** Cierra el speed dial si el clic cae fuera de él. */
  @HostListener('document:click', ['$event'])
  cerrarAccionesPorClicExterno(event: MouseEvent): void {
    if (!this.accionesAbiertas()) {
      return;
    }
    const destino = event.target as HTMLElement | null;
    if (!destino?.closest('.na-speeddial')) {
      this.accionesAbiertas.set(false);
    }
  }

  /**
   * En móvil y tablet la barra de identificación y la toolbar de la hoja no
   * caben siempre visibles: dos botones de la cabecera las muestran u
   * ocultan (sin modal, simplemente aparecen/desaparecen). En escritorio
   * ambas tarjetas quedan siempre visibles y los botones no se muestran.
   */
  mostrarIdentidad = signal(false);
  mostrarOpcionesHoja = signal(false);

  alternarIdentidad(): void {
    this.mostrarIdentidad.update((visible) => !visible);
  }

  alternarOpcionesHoja(): void {
    this.mostrarOpcionesHoja.update((visible) => !visible);
  }

  // --- Campos editables del panel izquierdo ---
  campos: Record<string, string> = { ...CAMPOS_DEFAULT };

  // --- Catálogos del editor ---
  readonly fuentes = [
    'Tahoma',
    'Arial',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Calibri',
    'Georgia',
  ];
  readonly tamanosFuente = ['10pt', '11pt', '12pt', '13pt', '14pt', '16pt', '18pt'];
  readonly interlineados = ['1.0', '1.15', '1.3', '1.5', '2.0'];
  readonly alineaciones = [
    { comando: 'justifyLeft', icono: 'format_align_left', etiqueta: 'Alinear izquierda' },
    { comando: 'justifyCenter', icono: 'format_align_center', etiqueta: 'Centrar' },
    { comando: 'justifyRight', icono: 'format_align_right', etiqueta: 'Alinear derecha' },
    { comando: 'justifyFull', icono: 'format_align_justify', etiqueta: 'Justificar' },
  ];

  /** Márgenes predeterminados de contrato sobre hoja oficio (cm) */
  readonly presetsMargen: PresetMargen[] = [
    { id: 'oficio', etiqueta: 'Oficio estándar (Izq. 3 cm)', sup: 2.5, inf: 2.5, izq: 3, der: 2.5 },
    { id: 'normal', etiqueta: 'Normal (1")', sup: 2.54, inf: 2.54, izq: 2.54, der: 2.54 },
    { id: 'estrecho', etiqueta: 'Estrecho (1.27 cm)', sup: 1.27, inf: 1.27, izq: 1.27, der: 1.27 },
    { id: 'legal', etiqueta: 'Amplio (4 cm izq.)', sup: 2.54, inf: 2.54, izq: 4, der: 2.54 },
  ];

  /** Márgenes activos de la hoja (cm) */
  margen = { sup: 2.5, inf: 2.5, izq: 3, der: 2.5 };
  presetActivo = 'oficio';

  /**
   * Auto-escala de la hoja oficio.
   *
   * La hoja debe "abarcar" todo el ancho del panel del documento. Como el
   * ancho real es fijo (Letter: 21.59 cm = 816 px a 96 dpi) y el editor es
   * WYSIWYG con la impresión, no se puede reflowar el texto: se aplica una
   * escala uniforme (`zoom`) para que el ancho visible coincida con el del
   * contenedor, tanto en escritorio como en tablet y móvil.
   */
  private static readonly ANCHO_HOJA_PX = 816; // 21.59 cm
  private static readonly ESCALA_HOJA_MIN = 0.35;
  private hojaObserver?: ResizeObserver;
  /** Identificador del ciclo de animación que aplica la auto-escala */
  private hojaFrame = 0;

  // --- Estado de la toolbar ---
  dropdownAbierto: '' | 'fuente' | 'tamano' | 'interlineado' | 'margenes' = '';
  dropdownArriba = false;

  // --- Persistencia, numeración y huella ---
  /** Prefijo del código del acuerdo (se usa para la numeración automática) */
  prefijo = 'CJS';
  /** Año de vigencia del consecutivo */
  anio = new Date().getFullYear();
  /** Estados posibles del acuerdo */
  readonly estados: { valor: AcuerdoEstado; etiqueta: string }[] = [
    { valor: 'borrador', etiqueta: 'Borrador' },
    { valor: 'en_revision', etiqueta: 'En revisión' },
    { valor: 'firmado', etiqueta: 'Firmado' },
    { valor: 'anulado', etiqueta: 'Anulado' },
  ];
  estado: AcuerdoEstado = 'borrador';
  /**
   * Estado tal como está registrado en el servidor (o el último guardado).
   * Sirve para validar las transiciones: un acuerdo firmado no puede volver a
   * un estado editable aunque el selector lo ofrezca.
   */
  estadoPrevio: AcuerdoEstado = 'borrador';
  /** Huella SHA-256 del último documento guardado/imprimido */
  hashDocumento = '';
  /** Fecha y hora del último guardado correcto */
  guardadoEn: Date | null = null;
  /** Identificador del acuerdo ya guardado (para distinguirlo de un borrador nuevo) */
  acuerdoId = '';
  /**
   * Estado del autoguardado:
   *  limpio    → sin cambios pendientes
   *  pendiente → hay cambios, se programó el guardado
   *  guardando → petición en curso
   *  guardado  → último guardado correcto
   *  error     → falló el último guardado (el borrador queda en el navegador)
   */
  autoGuardado: 'limpio' | 'pendiente' | 'guardando' | 'guardado' | 'error' = 'limpio';
  private autoGuardadoTimer: ReturnType<typeof setTimeout> | null = null;
  /** Espera antes de autoguardar (ms) */
  private readonly INTERVALO_AUTOGUARDADO = 20000;

  constructor(
    private router: Router,
    private acuerdos: AcuerdoService,
    private correo: CorreoService,
    private auth: AuthService,
    private notificar: NotificacionService,
    private pdf: PdfService,
  ) {}

  ngAfterViewInit(): void {
    document.addEventListener('keydown', this.alPulsarEscape, true);
    setTimeout(() => {
      this.iniciarDocumento();
      this.observarAnchoDeDocumento();
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.alPulsarEscape, true);
    this.hojaObserver?.disconnect();
    this.hojaObserver = undefined;

    if (this.hojaFrame) {
      cancelAnimationFrame(this.hojaFrame);
      this.hojaFrame = 0;
    }

    if (this.autoGuardadoTimer) {
      clearTimeout(this.autoGuardadoTimer);
      this.autoGuardadoTimer = null;
    }

    // Los cambios sin guardar no se pierden: quedan como borrador local
    if (this.editado && this.cargado) {
      this.respaldarBorradorLocal();
    }

    document.getElementById('na-print-page-style')?.remove();
  }

  // ============================================================
  // Auto-escala de la hoja (para que abarque el ancho disponible)
  // ============================================================

  /** Vigila el ancho del panel del documento y ajusta la escala de la hoja */
  private observarAnchoDeDocumento(): void {
    const wrap = this.hojaWrap?.nativeElement;

    if (!wrap || typeof ResizeObserver === 'undefined') {
      this.ajustarEscalaHoja();
      return;
    }

    // El ajuste se aplaza al siguiente cuadro: aplicar el zoom dentro de la
    // propia notificación dispara otra notificación y el navegador emite el
    // aviso "ResizeObserver loop completed with undelivered notifications".
    this.hojaObserver = new ResizeObserver(() => this.programarEscalaHoja());
    this.hojaObserver.observe(wrap);
    this.programarEscalaHoja();
  }

  /** Aplaza la auto-escala de la hoja al siguiente cuadro de animación */
  private programarEscalaHoja(): void {
    if (this.hojaFrame) {
      cancelAnimationFrame(this.hojaFrame);
    }

    this.hojaFrame = requestAnimationFrame(() => {
      this.hojaFrame = 0;
      this.ajustarEscalaHoja();
    });
  }

  /**
   * Fija `--na-escala` en la hoja para que su ancho visible coincida con el
   * ancho disponible del contenedor (sin dejar huecos ni provocar scroll
   * horizontal). Al no tener tope superior, la hoja abarca todo el ancho.
   */
  private ajustarEscalaHoja(): void {
    const wrap = this.hojaWrap?.nativeElement;
    const hoja = this.hoja?.nativeElement;

    if (!wrap || !hoja) {
      return;
    }

    const disponible = wrap.clientWidth;
    if (disponible <= 0) {
      return;
    }

    const escala = Math.max(
      disponible / NewAgreementComponent.ANCHO_HOJA_PX,
      NewAgreementComponent.ESCALA_HOJA_MIN,
    );

    hoja.style.setProperty('--na-escala', escala.toFixed(3));
  }

  /**
   * Carga el documento. Orden de prioridad:
   *  1. Acuerdo elegido en el listado para continuar su edición.
   *  2. Borrador local de este navegador (previa confirmación).
   *  3. Acuerdo en blanco con el siguiente consecutivo.
   */
  private async iniciarDocumento(): Promise<void> {
    const codigoPendiente = this.acuerdos.tomarPendienteEdicion();
    if (codigoPendiente && (await this.abrirParaEdicion(codigoPendiente))) {
      return;
    }

    const borrador = this.acuerdos.leerBorradorLocal();

    if (borrador && (borrador.campos || borrador.documentoHtml)) {
      const continuar = await Swal.fire({
        icon: 'question',
        title: '¿Continuar con el borrador guardado?',
        html: `Se encontró un borrador <strong>${borrador.codigo || 'sin código'}</strong> en este navegador.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Empezar de nuevo',
        confirmButtonColor: '#0c2d48',
      });

      if (continuar.isConfirmed) {
        this.restaurarDesdeAcuerdo(borrador);
        return;
      }

      this.acuerdos.descartarBorradorLocal();
    }

    this.cargarDocumento();
    await this.generarCodigoAutomatico();
  }

  /**
   * Abre un acuerdo existente (elegido en el listado) para continuar la edición.
   * Devuelve true si el acuerdo quedó cargado en el editor.
   */
  private async abrirParaEdicion(codigo: string): Promise<boolean> {
    let doc = this.acuerdos.tomarAcuerdoParaEditar();

    if (!doc || doc.codigo !== codigo) {
      doc = await this.acuerdos.obtener(codigo);
    }

    if (!doc) {
      await this.notificar.errorModal(
        'No se pudo abrir el acuerdo',
        `No se encontró <strong>${codigo}</strong>. Se abrirá un acuerdo en blanco.`,
      );
      return false;
    }

    // Si en este navegador quedó trabajo sin guardar del mismo acuerdo, es más
    // reciente que el servidor: se pregunta cuál usar (ninguna opción pierde datos).
    let hayCambiosLocales = false;
    const borrador = this.acuerdos.leerBorradorLocal();
    if (borrador && borrador.codigo === codigo && (borrador.campos || borrador.documentoHtml)) {
      const eleccion = await Swal.fire({
        icon: 'question',
        title: 'Hay cambios sin guardar de este acuerdo',
        html:
          `Existe una versión de <strong>${codigo}</strong> guardada como borrador local ` +
          'en este navegador que no llegó a enviarse al servidor.',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Usar cambios locales',
        denyButtonText: 'Usar versión del servidor',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0c2d48',
      });

      if (eleccion.isDismissed) {
        // Canceló: volver al listado sin descartar nada
        await this.router.navigate(['/agreements/list-agreement']);
        return true;
      }

      if (eleccion.isConfirmed) {
        doc = borrador;
        hayCambiosLocales = true;
      } else {
        this.acuerdos.descartarBorradorLocal();
      }
    }

    if (!doc.documentoHtml) {
      this.notificar.aviso(
        'Documento no recuperado',
        `El cuerpo del documento de ${codigo} no estaba disponible; se cargó el contenido por defecto.`,
      );
    }

    this.restaurarDesdeAcuerdo(doc, hayCambiosLocales);

    if (this.contenidoBloqueado) {
      this.notificar.info(
        'Acuerdo abierto en solo lectura',
        doc.estado === 'firmado'
          ? `${codigo} está firmado: puede consultarlo, imprimirlo y enviarlo por correo.`
          : `${codigo} está anulado: puede consultarlo e imprimirlo, pero no admite envío por correo.`,
      );
    } else {
      this.notificar.info('Acuerdo abierto', `${codigo} listo para editar.`);
    }

    return true;
  }

  /**
   * Restaura campos, márgenes, estado y documento desde un acuerdo (borrador o
   * guardado).
   *
   * `marcarComoEditado` indica si el contenido restaurado tiene cambios
   * pendientes: al continuar un borrador local sí los tiene, pero al abrir un
   * acuerdo ya guardado desde el listado el documento llega limpio (no debe
   * aparecer como "cambios sin guardar" hasta que el usuario toque algo).
   */
  private restaurarDesdeAcuerdo(acuerdo: Acuerdo, marcarComoEditado = true): void {
    const editor = this.editorTexto?.nativeElement;

    this.campos = { ...CAMPOS_DEFAULT, ...(acuerdo.campos ?? {}) };
    this.margen = { ...this.margen, ...(acuerdo.margen ?? {}) };
    this.prefijo = acuerdo.prefijo || this.prefijo;
    this.anio = acuerdo.anio || this.anio;
    this.estado = acuerdo.estado ?? 'borrador';
    this.estadoPrevio = this.estado;
    this.hashDocumento = acuerdo.hashDocumento ?? '';
    this.acuerdoId = acuerdo._id ?? '';

    if (editor) {
      editor.innerHTML = acuerdo.documentoHtml || DOCUMENTO_DEFAULT;
    }

    this.sincronizarTodos();
    this.aplicarMárgenesALaHoja();
    this.presetActivo = this.buscarPresetDeMargen() ?? 'custom';
    this.cargado = true;

    if (marcarComoEditado) {
      this.marcarEdicion(); // queda pendiente de reconciliar con el servidor
    } else {
      this.editado = false;
      this.autoGuardado = 'limpio';
      this.guardadoEn = null;
    }
  }

  /** true cuando el contenido no admite edición (el estado actual es cerrado) */
  get contenidoBloqueado(): boolean {
    return !esEditable(this.estado);
  }

  /** true cuando el acuerdo ya almacenado es un documento cerrado */
  get cerrado(): boolean {
    return !esEditable(this.estadoPrevio);
  }

  /** Explicación del bloqueo, para el aviso de la interfaz */
  get motivoBloqueoActual(): string {
    return motivoBloqueo(this.estado);
  }

  /**
   * ¿Se puede enviar el acuerdo por correo?
   *
   * Solo los acuerdos FIRMADOS, y siempre que tengan código: el envío difunde
   * el documento con su huella SHA-256 como constancia de un compromiso
   * cerrado. Un borrador o un acuerdo en revisión puede cambiar después y uno
   * anulado ya no tiene efecto, así que ninguno se envía.
   */
  get puedeEnviarPorCorreo(): boolean {
    return !!this.campos['codigo']?.trim() && this.estado === 'firmado';
  }

  /** Motivo por el que el envío por correo está disponible o bloqueado */
  get notaEnviarPorCorreo(): string {
    if (this.estado === 'firmado') {
      return this.campos['codigo']?.trim()
        ? 'Enviar el acuerdo firmado por correo electrónico'
        : 'Genere el código del acuerdo antes de enviarlo por correo';
    }
    return this.estado === 'anulado'
      ? 'Un acuerdo anulado no se puede enviar por correo: ya no tiene efecto'
      : 'Solo se envían por correo los acuerdos firmados';
  }

  /** Estados alcanzables desde el estado registrado (lo usa el selector) */
  readonly transicionesPermitidas = transicionesPermitidas;

  /** Devuelve el preset que coincide con los márgenes activos (o null) */
  private buscarPresetDeMargen(): string | null {
    const igual = (a: number, b: number) => Math.abs(a - b) < 0.01;
    const preset = this.presetsMargen.find(
      (p) =>
        igual(p.sup, this.margen.sup) &&
        igual(p.inf, this.margen.inf) &&
        igual(p.izq, this.margen.izq) &&
        igual(p.der, this.margen.der),
    );
    return preset?.id ?? null;
  }

  // Cierra el modal de campos editables y el dropdown activo con Escape,
  // e intercepta Ctrl/Cmd+P para usar la impresión con márgenes de contrato.
  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'p') {
      event.preventDefault();
      this.imprimir();
      return;
    }

    if (event.key === 'Escape' || event.code === 'Escape') {
      if (this.dropdownAbierto) {
        this.dropdownAbierto = '';
        return;
      }
    }
  }

  // Al cerrar o recargar la pestaña el navegador solo admite su propio diálogo
  // nativo ("es posible que los cambios no se guarden"), que NO se puede
  // reemplazar por HTML. Por eso aquí no se bloquea la salida: el borrador se
  // respalda en localStorage y, al volver, la pantalla ofrece continuarlo.
  // La confirmación con SweetAlert se hace en la navegación interna, a través
  // de `cambiosSinGuardarGuard` (canDeactivate).
  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.respaldarAlSalir();
  }

  // Cierra los dropdowns de la toolbar al hacer clic fuera
  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    const objetivo = event.target as Node | null;
    if (objetivo && this.editorToolbar?.nativeElement.contains(objetivo)) {
      return;
    }
    this.dropdownAbierto = '';
  }

  // ============================================================
  // Campos del panel izquierdo → documento
  // ============================================================

  /**
   * Reescribe todos los <span data-campo="clave"> del documento con el
   * valor actual del campo, preservando el resto del formato.
   */
  sincronizarCampo(campo: string): void {
    const editor = this.editorTexto?.nativeElement;
    if (!editor) {
      return;
    }

    const valor = this.campos[campo] ?? '';
    editor.querySelectorAll<HTMLElement>(`[data-campo="${campo}"]`).forEach((span) => {
      if (span.textContent !== valor) {
        span.textContent = valor;
      }
    });

    if (this.cargado) {
      this.marcarEdicion();
    }
  }

  /** Sincroniza todos los campos de una vez (tras cargar/reestablecer) */
  sincronizarTodos(): void {
    Object.keys(this.campos).forEach((campo) => this.sincronizarCampo(campo));
  }

  /**
   * Borra toda la información que aparece en la hoja y deja el documento en
   * blanco, listo para redactar desde cero.
   *
   * Es la operación contraria a `restablecer()` (botón "Por defecto"): en lugar
   * de cargar el modelo del instrumento, deja una hoja vacía. Se conservan los
   * datos de identificación (prefijo, código) porque van fuera del documento.
   */
  limpiarHoja(): void {
    // Un acuerdo firmado o anulado no se puede vaciar
    if (this.cerrado) {
      void this.notificar.errorModal(
        'El acuerdo no admite cambios',
        `${this.motivoBloqueoActual} Limpiar la hoja borraría el contenido firmado.`,
      );
      return;
    }

    void Swal.fire({
      icon: 'question',
      title: '¿Limpiar toda la hoja?',
      text: 'Se borrará toda la información que aparece en el documento.',
      showCancelButton: true,
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b3261e',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {
        return;
      }

      // El código es la identificación del acuerdo (va fuera de la hoja): se conserva
      const codigo = this.campos['codigo'];
      this.campos = { ...CAMPOS_DEFAULT, codigo };

      const editor = this.editorTexto?.nativeElement;
      if (editor) {
        // Un contenteditable vacío no recibe el foco: se deja un párrafo en blanco
        editor.innerHTML = '<p><br></p>';
      }

      this.hashDocumento = '';
      this.marcarEdicion();
      this.ajustarEscalaHoja();
    });
  }

  // ============================================================
  // Editor: formato básico
  // ============================================================

  /** Ejecuta un comando nativo del navegador sobre la selección */
  formatearTexto(comando: string, valor = ''): void {
    // Un documento cerrado (firmado / anulado) no admite cambios de formato
    if (this.contenidoBloqueado) {
      return;
    }

    this.editorTexto?.nativeElement.focus();
    document.execCommand(comando, false, valor);
    this.sincronizarEditor();
  }

  /** Aplica la familia tipográfica a la selección (predeterminado: Tahoma) */
  aplicarFuente(familia: string): void {
    this.formatearTexto('fontName', familia);
    this.dropdownAbierto = '';
  }

  /** Aplica un tamaño de fuente (pt) a la selección vía <span style> */
  aplicarTamanoFuente(tamano: string): void {
    this.aplicarEstiloSeleccion('fontSize', tamano);
    this.dropdownAbierto = '';
  }

  /** Aplica un interlineado a los párrafos que toca la selección */
  aplicarInterlineado(interlineado: string): void {
    this.bloquesSeleccionados().forEach((bloque) => {
      bloque.style.setProperty('line-height', interlineado);
    });
    this.sincronizarEditor();
    this.dropdownAbierto = '';
  }

  /** Aplica un estilo CSS a la selección, envolviéndola en un <span> */
  private aplicarEstiloSeleccion(propiedad: string, valor: string): void {
    const editor = this.editorTexto?.nativeElement;
    const seleccion = window.getSelection();
    if (!editor || !seleccion || seleccion.rangeCount === 0) {
      return;
    }

    const rango = seleccion.getRangeAt(0);
    if (rango.collapsed) {
      return;
    }

    const span = document.createElement('span');
    span.style.setProperty(propiedad, valor);

    try {
      span.appendChild(rango.extractContents());
      rango.insertNode(span);

      const nuevoRango = document.createRange();
      nuevoRango.selectNodeContents(span);
      seleccion.removeAllRanges();
      seleccion.addRange(nuevoRango);
    } catch {
      return;
    }

    this.sincronizarEditor();
  }

  // ============================================================
  // Tabulaciones y sangrías
  // ============================================================

  /** Inserta una tabulación (dos em-spaces) en la posición del cursor */
  insertarTabulacion(): void {
    this.editorTexto?.nativeElement.focus();
    document.execCommand('insertText', false, '\u2003\u2003');
    this.sincronizarEditor();
  }

  /** Aumenta la sangría izquierda del párrafo seleccionado */
  aumentarSangria(): void {
    this.ajustarSangria(+16);
  }

  /** Reduce la sangría izquierda del párrafo seleccionado */
  reducirSangria(): void {
    this.ajustarSangria(-16);
  }

  private ajustarSangria(delta: number): void {
    this.bloquesSeleccionados().forEach((bloque) => {
      const actual = parseFloat(bloque.style.paddingLeft) || 0;
      bloque.style.paddingLeft = `${Math.max(0, actual + delta)}px`;
    });
    this.sincronizarEditor();
  }

  /** Bloques (p, li, table) que toca la selección actual dentro del editor */
  private bloquesSeleccionados(): HTMLElement[] {
    const editor = this.editorTexto?.nativeElement;
    const seleccion = window.getSelection();
    if (!editor || !seleccion || seleccion.rangeCount === 0) {
      return [];
    }

    const rango = seleccion.getRangeAt(0);
    const bloques = Array.from(
      editor.querySelectorAll<HTMLElement>('p, li, blockquote'),
    ).filter((bloque) => !bloque.querySelector('p, li, blockquote'));

    const tocados = bloques.filter((bloque) => {
      try {
        return rango.intersectsNode(bloque);
      } catch {
        return false;
      }
    });

    if (tocados.length) {
      return tocados;
    }

    const bloqueActual = this.bloqueCercano(rango.startContainer, editor);
    return bloqueActual ? [bloqueActual] : [editor];
  }

  /** Sube desde el nodo indicado hasta el primer bloque dentro del editor */
  private bloqueCercano(nodo: Node | null, editor: HTMLElement): HTMLElement | null {
    let actual: Node | null = nodo;

    while (actual && actual !== editor) {
      if (actual.nodeType === Node.ELEMENT_NODE) {
        const elemento = actual as HTMLElement;
        if (/^(P|LI|H[1-6]|BLOCKQUOTE|DIV)$/.test(elemento.tagName)) {
          return elemento;
        }
      }
      actual = actual.parentNode;
    }

    return null;
  }

  // ============================================================
  // Listas: literales a) b) c), viñetas y numeradas
  // ============================================================

  /** Inserta/convierte en lista de literales (a) b) c) ...) */
  insertarLiteral(): void {
    this.editorTexto?.nativeElement.focus();
    document.execCommand('insertOrderedList');

    const ol = this.listaCercana('OL');
    if (ol) {
      ol.style.setProperty('list-style-type', 'lower-alpha');
      ol.style.setProperty('padding-left', '1.6em');
    }
    this.sincronizarEditor();
  }

  /** Inserta/convierte en lista con viñetas */
  insertarVineta(): void {
    this.formatearTexto('insertUnorderedList');
  }

  /** Inserta/convierte en lista numerada 1) 2) 3) */
  insertarNumerada(): void {
    this.editorTexto?.nativeElement.focus();
    document.execCommand('insertOrderedList');

    const ol = this.listaCercana('OL');
    if (ol) {
      ol.style.setProperty('list-style-type', 'decimal');
      ol.style.setProperty('padding-left', '1.6em');
    }
    this.sincronizarEditor();
  }

  private listaCercana(tag: 'OL' | 'UL'): HTMLElement | null {
    const editor = this.editorTexto?.nativeElement;
    const seleccion = window.getSelection();
    if (!editor || !seleccion || seleccion.rangeCount === 0) {
      return null;
    }

    let nodo: Node | null = seleccion.getRangeAt(0).startContainer;
    while (nodo && nodo !== editor) {
      if (nodo.nodeType === Node.ELEMENT_NODE && (nodo as HTMLElement).tagName === tag) {
        return nodo as HTMLElement;
      }
      nodo = nodo.parentNode;
    }
    return null;
  }

  // ============================================================
  // Márgenes de la hoja
  // ============================================================

  /** Aplica un preset de márgenes a la hoja oficio */
  aplicarPresetMargen(preset: PresetMargen): void {
    if (this.contenidoBloqueado) {
      this.dropdownAbierto = '';
      return;
    }

    this.presetActivo = preset.id;
    this.margen = { sup: preset.sup, inf: preset.inf, izq: preset.izq, der: preset.der };
    this.aplicarMárgenesALaHoja();
    this.dropdownAbierto = '';

    if (this.cargado) {
      this.marcarEdicion();
    }
  }

  /** Aplica márgenes personalizados (inputs del dropdown) */
  aplicarMargenPersonalizado(): void {
    if (this.contenidoBloqueado) {
      return;
    }

    this.presetActivo = 'custom';
    this.aplicarMárgenesALaHoja();

    if (this.cargado) {
      this.marcarEdicion();
    }
  }

  private aplicarMárgenesALaHoja(): void {
    const hoja = this.hoja?.nativeElement;
    if (!hoja) {
      return;
    }
    hoja.style.setProperty('--mg-sup', `${this.margen.sup}cm`);
    hoja.style.setProperty('--mg-inf', `${this.margen.inf}cm`);
    hoja.style.setProperty('--mg-izq', `${this.margen.izq}cm`);
    hoja.style.setProperty('--mg-der', `${this.margen.der}cm`);

    this.actualizarPaginaDeImpresion();
  }

  /**
   * Refleja los márgenes activos en la regla @page de impresión.
   *
   * Es imprescindible: el padding de la hoja solo aplica al inicio y al final
   * del bloque, por lo que a partir de la segunda página impresa los márgenes
   * desaparecían. La regla @page sí se respeta en todas las páginas.
   */
  private actualizarPaginaDeImpresion(): void {
    const id = 'na-print-page-style';
    let estilo = document.getElementById(id) as HTMLStyleElement | null;

    if (!estilo) {
      estilo = document.createElement('style');
      estilo.id = id;
      document.head.appendChild(estilo);
    }

    estilo.textContent =
      `@page { size: letter portrait; margin: ${this.margen.sup}cm ` +
      `${this.margen.der}cm ${this.margen.inf}cm ${this.margen.izq}cm; }`;
  }

  get etiquetaMargenActiva(): string {
    if (this.presetActivo === 'custom') {
      return `Pers. (${this.margen.izq} cm izq.)`;
    }
    return this.presetsMargen.find((p) => p.id === this.presetActivo)?.etiqueta ?? '';
  }

  // ============================================================
  // Toolbar: dropdowns
  // ============================================================

  alternarDropdown(
    dropdown: 'fuente' | 'tamano' | 'interlineado' | 'margenes',
    objetivo?: EventTarget | null,
  ): void {
    if (this.dropdownAbierto === dropdown) {
      this.dropdownAbierto = '';
      return;
    }

    this.dropdownArriba = this.calcularAperturaHaciaArriba(objetivo as HTMLElement | null);
    this.dropdownAbierto = dropdown;
  }

  /**
   * Los menús de la toolbar se abren siempre hacia abajo (la barra está fija
   * en la parte superior del panel). Solo se abren hacia arriba si el botón
   * queda tan abajo en la ventana que el menú no cabría debajo.
   */
  private calcularAperturaHaciaArriba(boton: HTMLElement | null): boolean {
    if (!boton) {
      return false;
    }

    const altoMenu = 320; // alto máximo del menú de márgenes + margen de seguridad
    return window.innerHeight - boton.getBoundingClientRect().bottom < altoMenu;
  }

  // ============================================================
  // Sincronización del editor
  // ============================================================

  onEditorInput(ev?: Event): void {
    this.sincronizarEditor(ev);
  }

  /**
   * El instrumento se redacta directamente sobre la hoja, así que el texto
   * tecleado en un `[data-campo]` tiene que volverse a `campos`. Si no,
   * al volver a cargar el acuerdo `sincronizarTodos()` escribiría encima los
   * valores antiguos y se perdería lo que se acabó de teclear en el documento.
   */
  private sincronizarEditor(ev?: Event): void {
    const editor = this.editorTexto?.nativeElement as HTMLElement | undefined;

    if (editor) {
      // El punto de inserción suele estar en un nodo de texto; cuando no hay
      // selección (al pegar, arrastrar o borrar) se usa el nodo del evento.
      const foco = (window.getSelection()?.anchorNode as Node | null) ?? (ev?.target as Node | null);
      let marca: HTMLElement | null = null;

      if (foco instanceof Element) {
        marca = foco.closest<HTMLElement>('[data-campo]');
      } else if (foco?.parentElement) {
        marca = foco.parentElement.closest<HTMLElement>('[data-campo]');
      }

      const campo = marca?.dataset['campo'];

      if (campo && campo in this.campos) {
        this.campos[campo] = marca?.textContent ?? '';
      }
    }

    // El HTML vive directamente en el contenteditable; además del dato se marca
    // la página como "editada" (y se programa el autoguardado).
    this.marcarEdicion();
  }

  editado = false;
  cargado = false;

  // ============================================================
  // Autoguardado
  // ============================================================

  /**
   * Marca el documento como editado y reprograma el autoguardado.
   * Se llama desde cualquier cambio: campos, editor o márgenes.
   */
  private marcarEdicion(): void {
    // El contenido de un acuerdo firmado o anulado no admite cambios
    if (this.contenidoBloqueado) {
      return;
    }

    this.marcarCambioPendiente();
  }

  /** Marca el acuerdo con cambios pendientes y reprograma el autoguardado */
  private marcarCambioPendiente(): void {
    this.editado = true;

    if (this.autoGuardado !== 'guardando') {
      this.autoGuardado = 'pendiente';
    }

    this.programarAutoGuardado();
  }

  /** Reprograma el guardado automático (se reinicia con cada cambio) */
  private programarAutoGuardado(): void {
    if (this.autoGuardadoTimer) {
      clearTimeout(this.autoGuardadoTimer);
    }

    this.autoGuardadoTimer = setTimeout(() => {
      this.autoGuardadoTimer = null;
      this.guardar(true);
    }, this.INTERVALO_AUTOGUARDADO);
  }

  /** Cambia el estado del acuerdo (borrador, en revisión, firmado, anulado) */
  /**
   * Cambio de estado desde el panel.
   *
   * El selector ofrece los cuatro estados, pero no todos son alcanzables: se
   * validan las transiciones contra el estado registrado para que un acuerdo
   * firmado no pueda reabrirse, y el cambio a firmado/anulado deja el
   * documento en solo lectura de inmediato.
   */
  onEstadoChange(): void {
    if (this.estado === this.estadoPrevio) {
      return;
    }

    if (!transicionesPermitidas(this.estadoPrevio).includes(this.estado)) {
      const intento = this.estado;
      this.estado = this.estadoPrevio;

      this.notificar.aviso(
        'Cambio de estado no permitido',
        this.estadoPrevio === 'firmado'
          ? 'El acuerdo está firmado: solo puede anularse. Para corregir el documento deberá anularlo y crear uno nuevo.'
          : 'Un acuerdo anulado es un estado terminal: no admite más cambios.',
      );
      console.warn('[NewAgreement] Transición rechazada:', this.estadoPrevio, '→', intento);
      return;
    }

    if (this.estado === 'firmado' || this.estado === 'anulado') {
      this.notificar.info(
        this.estado === 'firmado' ? 'Acuerdo marcado como firmado' : 'Acuerdo marcado como anulado',
        'Al guardar, el documento quedará cerrado y no admitirá más ediciones.',
      );
    }

    // El cambio de estado es un cambio pendiente aunque cierre el documento
    if (this.cargado) {
      this.marcarCambioPendiente();
    }
  }

  /** Cambia el prefijo del código y recalcula el consecutivo */
  onPrefijoChange(): void {
    this.prefijo = (this.prefijo || 'CJS').toUpperCase().trim();
    void this.generarCodigoAutomatico();
  }

  /** Texto del indicador de autoguardado */
  get etiquetaAutoGuardado(): string {
    switch (this.autoGuardado) {
      case 'pendiente':
        return 'Cambios sin guardar';
      case 'guardando':
        return 'Guardando…';
      case 'guardado':
        return this.guardadoEn
          ? `Guardado ${this.guardadoEn.toLocaleTimeString('es-VE', {
              hour: '2-digit',
              minute: '2-digit',
            })}`
          : 'Guardado';
      case 'error':
        return 'Error al guardar (borrador local)';
      default:
        return 'Sin cambios';
    }
  }

  /** Icono del indicador de autoguardado */
  get iconoAutoGuardado(): string {
    switch (this.autoGuardado) {
      case 'pendiente':
        return 'edit';
      case 'guardando':
        return 'sync';
      case 'guardado':
        return 'cloud_done';
      case 'error':
        return 'cloud_off';
      default:
        return 'cloud_queue';
    }
  }

  private cargarDocumento(): void {
    const editor = this.editorTexto?.nativeElement;
    if (!editor) {
      return;
    }

    editor.innerHTML = DOCUMENTO_DEFAULT;
    this.sincronizarTodos();
    this.aplicarMárgenesALaHoja();
    this.cargado = true;
    this.editado = false;
    this.autoGuardado = 'limpio';
    this.guardadoEn = null;
  }

  get documentoHtml(): string {
    return this.editorTexto?.nativeElement.innerHTML ?? '';
  }

  get documentoTexto(): string {
    return (this.editorTexto?.nativeElement.textContent ?? '').replace(/\u00a0/g, ' ').trim();
  }

  // ============================================================
  // Acciones
  // ============================================================

  /** Restaura el acuerdo predeterminado y sus campos */
  restablecer(): void {
    // Un acuerdo firmado o anulado no se puede vaciar
    if (this.cerrado) {
      void this.notificar.errorModal(
        'El acuerdo no admite cambios',
        `${this.motivoBloqueoActual} Restablecer el documento borraría el contenido firmado.`,
      );
      return;
    }

    Swal.fire({
      icon: 'question',
      title: '¿Restablecer el documento?',
      text: 'Se descartarán todos los cambios y volverá el acuerdo predeterminado.',
      showCancelButton: true,
      confirmButtonText: 'Sí, restablecer',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0c2d48',
    }).then(async (resultado) => {
      if (!resultado.isConfirmed) {
        return;
      }

      this.campos = { ...CAMPOS_DEFAULT };
      this.margen = { sup: 2.5, inf: 2.5, izq: 3, der: 2.5 };
      this.presetActivo = 'oficio';
      this.estado = 'borrador';
      this.estadoPrevio = 'borrador';
      this.hashDocumento = '';
      this.acuerdoId = '';
      this.cargarDocumento();
      this.acuerdos.descartarBorradorLocal();
      await this.generarCodigoAutomatico();
    });
  }

  // ============================================================
  // Numeración automática del código
  // ============================================================

  /**
   * Genera el siguiente código consecutivo para el prefijo y año activos.
   * Fuente: listado de acuerdos del servidor (si la función está registrada)
   * con respaldo en el cache local del navegador.
   */
  async generarCodigoAutomatico(): Promise<void> {
    try {
      const codigo = await this.acuerdos.siguienteCodigo(this.prefijo, this.anio);
      this.campos['codigo'] = codigo;
      this.sincronizarCampo('codigo');
    } catch (e) {
      console.error('[NewAgreement] No se pudo calcular el consecutivo:', e);
      this.notificar.error(
        'No se pudo calcular el consecutivo',
        `Escríbalo manualmente en el campo Código (${NotificacionService.detalle(e)}).`,
      );
    }
  }

  /** Reasigna la huella del documento (se muestra en el panel) */
  private async calcularHuella(): Promise<string> {
    const huella = await this.acuerdos.huella({
      campos: { ...this.campos },
      documentoHtml: this.documentoHtml,
      documentoTexto: this.documentoTexto,
      margen: { ...this.margen },
      codigo: this.campos['codigo'],
      prefijo: this.prefijo,
      anio: this.anio,
    });
    this.hashDocumento = huella;
    return huella;
  }

  /** Huella abreviada para la interfaz */
  get hashCorto(): string {
    return this.hashDocumento ? this.hashDocumento.slice(0, 16) : '';
  }

  // ============================================================
  // Guardado (servidor + respaldo local)
  // ============================================================

  /** Arma el objeto Acuerdo con el estado actual del documento */
  private construirAcuerdo(): Acuerdo {
    const payload = this.auth.getUserDecrypt(sessionStorage.getItem('token') ?? '');
    const usuario = payload?.Usuario;

    return {
      _id: this.acuerdoId || undefined,
      codigo: this.campos['codigo'] ?? '',
      prefijo: this.prefijo,
      anio: this.anio,
      titulo: this.campos['titulo'] ?? '',
      proyecto: this.campos['proyecto'] ?? '',
      area: this.campos['area'] ?? '',
      gerente: this.campos['gerente'] ?? '',
      cedula: this.campos['cedula'] ?? '',
      cedulaFirma: this.campos['cedulaFirma'] ?? '',
      representante: this.campos['representante'] ?? '',
      vigencia: this.campos['vigencia'] ?? '',
      ciudad: this.campos['ciudad'] ?? '',
      fechaFirma: this.campos['fechaFirma'] ?? '',
      honorario: this.campos['honorario'] ?? '',
      quincena: this.campos['quincena'] ?? '',
      campos: { ...this.campos },
      documentoHtml: this.documentoHtml,
      documentoTexto: this.documentoTexto,
      margen: { ...this.margen },
      estado: this.estado,
      hashDocumento: this.hashDocumento,
      hashAlgoritmo: 'SHA-256',
      creadoPorCedula: usuario?.cedula,
      creadoPorNombre: usuario?.nombre,
    };
  }

  /** Respalda el borrador en el navegador (sin servidor) */
  respaldarBorradorLocal(): void {
    try {
      this.acuerdos.guardarBorradorLocal(this.construirAcuerdo());
    } catch (e) {
      console.error('[NewAgreement] No se pudo respaldar el borrador local:', e);
      this.notificar.error(
        'No se pudo respaldar el borrador en el navegador',
        `Los cambios solo existen en esta pantalla (${NotificacionService.detalle(e)}).`,
      );
    }
  }

  /**
   * Guarda el acuerdo (lo invoca el botón "Guardar Acuerdo").
   */
  guardar(silencioso = false): void {
    void this.ejecutarGuardado(silencioso);
  }

  /**
   * Guarda el acuerdo en el servidor (Mongo, colección `firmalink_acuerdos`)
   * vía ccoleccion con upsert por código. Antes calcula la huella SHA-256.
   *
   * @param silencioso true cuando lo invoca el autoguardado (sin modales)
   * @returns true si el acuerdo quedó guardado en el servidor
   */
  private async ejecutarGuardado(silencioso: boolean): Promise<boolean> {
    if (this.autoGuardadoTimer) {
      clearTimeout(this.autoGuardadoTimer);
      this.autoGuardadoTimer = null;
    }

    // El contenido de un documento cerrado no se reescribe; si no hay nada
    // pendiente (p. ej. un acuerdo firmado sin cambios) no hay nada que guardar.
    if (this.cerrado && !this.editado) {
      return false;
    }

    if (!this.campos['codigo']?.trim()) {
      if (silencioso) {
        this.notificar.aviso(
          'Autoguardado en espera',
          'Falta el código del acuerdo: genérelo automáticamente para poder guardar.',
        );
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Falta el código',
          text: 'Indique el código del acuerdo o genérelo automáticamente.',
          confirmButtonColor: '#0c2d48',
        });
      }
      return false;
    }

    this.autoGuardado = 'guardando';

    try {
      const huella = await this.calcularHuella();
      const acuerdo = this.construirAcuerdo();
      acuerdo.hashDocumento = huella;

      await firstValueFrom(this.acuerdos.guardar(acuerdo));

      this.guardadoEn = new Date();
      this.editado = false;
      this.autoGuardado = 'guardado';
      this.estadoPrevio = this.estado; // el estado cerrado ya quedó registrado
      this.acuerdos.descartarBorradorLocal();

      if (!silencioso) {
        Swal.fire({
          icon: 'success',
          title: 'Acuerdo guardado correctamente',
          html:
            `Código <strong>${acuerdo.codigo}</strong><br>` +
            `<small>Huella SHA-256: ${huella.slice(0, 24)}…</small>`,
          confirmButtonColor: '#0c2d48',
          timer: 3000,
          showConfirmButton: false,
        });
      }
      return true;
    } catch (err) {
      console.error('[NewAgreement] Error al guardar el acuerdo:', err);
      this.autoGuardado = 'error';
      this.respaldarBorradorLocal();

      if (silencioso) {
        // El autoguardado no debe abrir modales, pero el usuario sí debe enterarse
        this.notificar.error(
          'Autoguardado fallido',
          `El acuerdo quedó respaldado en este navegador (${NotificacionService.detalle(err)}).`,
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar en el servidor',
          html:
            'El acuerdo quedó respaldado como borrador en este navegador.<br>' +
            `<small>${NotificacionService.detalle(err)}</small>`,
          confirmButtonColor: '#0c2d48',
        });
      }
      return false;
    }
  }

  // ============================================================
  // Salida con cambios pendientes (guarda CanDeactivate)
  // ============================================================

  /** ¿Hay cambios sin guardar que deban confirmarse antes de salir? */
  hayCambiosSinGuardar(): boolean {
    return this.cargado && this.editado;
  }

  /** Intenta guardar antes de salir (lo usa la guarda de navegación) */
  async guardarAntesDeSalir(): Promise<boolean> {
    return this.ejecutarGuardado(true);
  }

  /** Respalda el borrador y evita perder el trabajo al salir sin guardar */
  respaldarAlSalir(): void {
    if (this.hayCambiosSinGuardar()) {
      this.respaldarBorradorLocal();
    }
  }

  /** Navega al listado de acuerdos (la guarda confirmará si hay cambios) */
  irAlListado(): void {
    void this.router.navigate(['/agreements/list-agreement']);
  }

  /**
   * Envía el acuerdo redactado por correo.
   *
   * Si hay cambios sin guardar se ofrece guardarlos antes: el correo se arma
   * con el documento tal como está en pantalla, pero la huella enviada debe
   * corresponder a lo que quedó registrado en el servidor.
   */
  async enviarPorCorreo(): Promise<void> {
    if (!this.campos['codigo']?.trim()) {
      this.notificar.aviso(
        'Falta el código del acuerdo',
        'Genere el código antes de enviarlo por correo.',
      );
      return;
    }

    if (!this.puedeEnviarPorCorreo) {
      this.notificar.aviso('Envío no permitido', this.notaEnviarPorCorreo);
      return;
    }

    if (this.editado) {
      const decision = await Swal.fire({
        icon: 'question',
        title: 'Hay cambios sin guardar',
        html: 'El correo se arma con el documento en pantalla. ¿Desea guardar el acuerdo antes de enviarlo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar y enviar',
        denyButtonText: 'Enviar sin guardar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0c2d48',
      });

      if (decision.isDismissed) return;

      if (decision.isConfirmed) {
        const guardado = await this.ejecutarGuardado(true);
        if (!guardado) {
          await this.notificar.errorModal(
            'No se pudo guardar el acuerdo',
            'El envío se canceló para no remitir una huella desactualizada.',
          );
          return;
        }
      }
    }

    const destinatarios = await pedirDestinatariosCorreo(this.construirAcuerdo());
    if (!destinatarios) return;

    // El PDF se arma antes que el cuerpo: el mensaje incrusta sus páginas
    const pdf = await this.prepararPdfAcuerdo();
    const logo = await cargarLogoCorreo();
    const cuerpo = construirCorreoAcuerdo(
      this.construirAcuerdo(),
      destinatarios.mensaje,
      pdf?.paginas ?? [],
      logo?.nombre,
      pdf?.totalPaginas,
    );
    const adjunto = pdf?.adjunto;
    // Las páginas y el logo viajan como imágenes incrustadas (Content-ID)
    const adjuntosInline = [...(pdf?.paginas ?? []), ...(logo ? [logo] : [])];

    try {
      const resultado = await this.correo.enviar({
        para: destinatarios.para,
        cc: destinatarios.cc,
        asunto: cuerpo.asunto,
        html: cuerpo.html,
        texto: cuerpo.texto,
        adjunto,
        adjuntosInline,
        idempotencia: `${this.campos['codigo']}:${this.hashDocumento ?? ''}:${Date.now()}`,
      });

      await Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        html:
          `El acuerdo <strong>${this.campos['codigo']}</strong> se envió a:<br>` +
          `<small>${resultado.para.join(', ')}</small><br>` +
          (adjunto ? `<small>Adjunto: ${adjunto.nombre}</small><br>` : '') +
          `<br><small style="color:#9e9e9e">Identificador del proveedor: ${resultado.id || 'sin identificar'}</small>`,
        confirmButtonColor: '#0c2d48',
      });
    } catch (e) {
      await this.reportarFalloCorreo(e);
    }
  }

  /**
   * Convierte el documento en pantalla en un PDF Carta. Si la conversión falla
   * no se bloquea el envío: se avisa y el correo sale sin adjunto ni imágenes.
   */
  private async prepararPdfAcuerdo(): Promise<PdfAcuerdoGenerado | undefined> {
    try {
      return await generarPdfAcuerdo(this.pdf, this.construirAcuerdo(), this.documentoHtml);
    } catch (e) {
      console.error('[NewAgreement] No se pudo generar el PDF del acuerdo:', e);
      this.notificar.aviso(
        'El correo saldrá sin el PDF adjunto',
        `No se pudo generar el archivo PDF del acuerdo (${NotificacionService.detalle(e)}).`,
      );
      return undefined;
    }
  }

  /** Presenta el fallo de envío con el detalle del servidor y vías alternas */
  private async reportarFalloCorreo(e: unknown): Promise<void> {
    const esCorreo = e instanceof CorreoError;
    const mensaje = esCorreo ? e.message : NotificacionService.detalle(e);
    const ayudas: string[] = [];

    if (esCorreo && e.noHabilitado) {
      ayudas.push(
        'El envío de correo está deshabilitado en el servidor: revise la sección [email] de sandra.ini (enabled y api_key de Resend).',
      );
    }
    if (esCorreo && e.rechazoProveedor) {
      ayudas.push(
        'Con el remitente de prueba de Resend (onboarding@resend.dev) solo se entrega al correo dueño de la cuenta; para enviar a otros destinatarios hay que verificar el dominio en Resend.',
      );
    }

    const confirmar = await Swal.fire({
      icon: 'error',
      title: 'No se pudo enviar el correo',
      html:
        `El acuerdo <strong>${this.campos['codigo']}</strong> no se envió.<br><br>` +
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
      await this.enviarPorCorreo();
    }
  }

  /**
   * Imprime el acuerdo en un iframe aislado y autocontenido.
   *
   * No se usa window.print() sobre la aplicación porque el CSS del layout
   * (sidebar, toolbar, scroll, escalados) contamina el papel.
   *
   * Márgenes: se usan espaciadores <thead>/<tfoot> de una tabla marco, que el
   * navegador REPITE en cada página impresa (el padding de un bloque normal
   * solo se respeta en la primera y la última página) y las columnas laterales
   * del marco van por padding del <td>. La regla @page se deja con margen 0
   * porque Safari la ignora: así los márgenes de contrato salen iguales en
   * todos los navegadores.
   */
  imprimir(): void {
    void this.imprimirConPie();
  }

  /**
   * Imprime el acuerdo en un iframe aislado y autocontenido, con pie de
   * página (código, fecha y huella SHA-256) que se repite en cada página.
   *
   * No se usa window.print() sobre la aplicación porque el CSS del layout
   * (sidebar, toolbar, scroll, escalados) contamina el papel.
   *
   * Márgenes: se usan espaciadores <thead>/<tfoot> de una tabla marco, que el
   * navegador REPITE en cada página impresa (el padding de un bloque normal
   * solo se respeta en la primera y la última página) y las columnas laterales
   * del marco van por padding del <td>. La regla @page se deja con margen 0
   * porque Safari la ignora: así los márgenes de contrato salen iguales en
   * todos los navegadores.
   */
  private async imprimirConPie(): Promise<void> {
    const contenido = this.editorTexto?.nativeElement.innerHTML ?? '';

    // La huella cubre el cuerpo del documento (sin el pie de página) para
    // que sea verificable: el pie solo la muestra.
    let huella = '';
    try {
      huella = await this.calcularHuella();
    } catch (e) {
      console.error('[NewAgreement] No se pudo calcular la huella para el pie:', e);
      this.notificar.aviso(
        'Se imprimirá sin huella SHA-256',
        `No se pudo calcular la huella del documento (${NotificacionService.detalle(e)}).`,
      );
    }

    const fecha = new Date().toLocaleDateString('es-VE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const documento = construirDocumentoImpresion({
      contenidoHtml: contenido,
      margen: this.margen,
      codigo: this.campos['codigo'] || 'Acuerdo',
      fecha,
      huella,
    });

    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.cssText =
      'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(iframe);

    const ventana = iframe.contentWindow;
    const doc = ventana?.document;

    if (!ventana || !doc) {
      iframe.remove();
      this.notificar.aviso(
        'Impresión directa sin pie de página',
        'El navegador no permitió el marco de impresión: no se incluirá el folio ni la huella.',
      );
      window.print();
      return;
    }

    let impreso = false;
    const lanzarImpresion = () => {
      if (impreso) {
        return;
      }
      impreso = true;
      ventana.focus();
      ventana.print();
      setTimeout(() => iframe.remove(), 1500);
    };

    iframe.onload = () => setTimeout(lanzarImpresion, 200);

    doc.open();
    doc.write(documento);
    doc.close();

    // Respaldo por si el evento load no se dispara tras doc.write()
    setTimeout(lanzarImpresion, 600);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
