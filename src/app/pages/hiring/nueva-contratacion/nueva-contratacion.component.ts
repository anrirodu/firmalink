import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

/** Datos devueltos al crear una nueva contratación */
export interface NuevaContratacionPayload {
  numero: string;
  tipo: string;
  modalidad: string;
  cargo: string;
  solicitante: string;
  cedula: string;
  fecha: string;
  monto: number | null;
  canales: string[];
  observacion: string;
  /** Observación con formato (HTML del editor) */
  observacionHtml: string;
}

/**
 * Modal "Nueva Contratación" — creación de un proceso de contratación.
 *
 * Patrón visual tomado del modal de distribución de resueltos_ok (mppd/gdoc):
 * backdrop con blur, card con slideUp, header con icono/título/subtítulo,
 * checklist de canales de publicación y footer Cancelar/Aceptar.
 *
 * Uso: <app-nueva-contratacion *ngIf="abierto" [numero]="n" (cerrar)="..." (crear)="..." />
 */
@Component({
  selector: 'app-nueva-contratacion',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './nueva-contratacion.component.html',
  styleUrls: ['./nueva-contratacion.component.scss'],
})
export class NuevaContratacionComponent implements AfterViewInit {
  /** N° de contratación sugerido (autogenerado por la página) */
  @Input() numero = '';

  /** Se emite al cancelar/cerrar el modal */
  @Output() cerrar = new EventEmitter<void>();

  /** Se emite al confirmar la creación */
  @Output() crear = new EventEmitter<NuevaContratacionPayload>();

  @ViewChild('campoCargo') campoCargo?: ElementRef<HTMLInputElement>;
  @ViewChild('editorTexto') editorTexto?: ElementRef<HTMLDivElement>;
  @ViewChild('editorToolbar') editorToolbar?: ElementRef<HTMLDivElement>;

  // --- Catálogos ---
  readonly tipos = ['Personal', 'Servicios', 'Bienes', 'Obras', 'Consultoría'];
  readonly modalidades = [
    'Contratación Directa',
    'Concurso Abierto',
    'Consulta de Precios',
    'Convenio Marco',
  ];
  readonly canalesPublicacion = [
    'INTERNO',
    'PORTAL WEB',
    'OFICIO',
    'GACETA',
    'CORREO',
    'NO PUBLICAR',
  ];

  // --- Catálogos del editor de texto (equivalen a la toolbar del canvas de resueltos_ok) ---
  readonly alineaciones = [
    { comando: 'justifyLeft', icono: 'format_align_left', etiqueta: 'Alinear Izquierda' },
    { comando: 'justifyCenter', icono: 'format_align_center', etiqueta: 'Centrar' },
    { comando: 'justifyRight', icono: 'format_align_right', etiqueta: 'Alinear Derecha' },
    { comando: 'justifyFull', icono: 'format_align_justify', etiqueta: 'Justificar' },
  ];
  readonly tamanosFuente = ['9pt', '10pt', '11pt', '12pt', '13pt', '14pt', '16pt', '18pt'];
  readonly interlineados = ['0.2', '0.5', '0.8', '1.0', '1.15', '1.3', '1.5', '2.0'];
  readonly anchosLinea = [
    { etiqueta: 'Estrecho (-0.5px)', valor: '-0.5px' },
    { etiqueta: 'Normal', valor: 'normal' },
    { etiqueta: 'Expandido (+0.5px)', valor: '0.5px' },
    { etiqueta: 'Expandido (+1.0px)', valor: '1px' },
    { etiqueta: 'Expandido (+1.5px)', valor: '1.5px' },
    { etiqueta: 'Expandido (+2.0px)', valor: '2px' },
  ];

  // --- Modelo del formulario ---
  tipo = '';
  modalidad = '';
  cargo = '';
  solicitante = '';
  cedula = '';
  fecha = new Date().toISOString().slice(0, 10);
  monto: number | null = null;
  /** Texto plano de la observación (para reportes/API) */
  observacion = '';
  /** HTML con el formato aplicado en el editor */
  observacionHtml = '';
  canales: Set<string> = new Set<string>();

  /** Dropdown activo de la toolbar del editor ('' = ninguno) */
  dropdownAbierto: '' | 'align' | 'fontSize' | 'lineHeight' | 'letterSpacing' = '';

  /** true = el dropdown activo se abre hacia arriba (se calcula al abrirlo) */
  dropdownArriba = false;

  /** Se activa al intentar crear: habilita la visualización de los errores */
  intentado = false;

  ngAfterViewInit(): void {
    setTimeout(() => this.campoCargo?.nativeElement.focus());
  }

  // Cierra el modal con la tecla Escape (patrón resueltos_ok).
  // Si hay un dropdown de la toolbar abierto, el primer Escape solo lo cierra.
  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') {
      if (this.dropdownAbierto) {
        this.dropdownAbierto = '';
        return;
      }
      this.cerrarModal();
    }
  }

  // Cierra los dropdowns de la toolbar al hacer clic fuera de ella
  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    const objetivo = event.target as Node | null;
    if (objetivo && this.editorToolbar?.nativeElement.contains(objetivo)) {
      return;
    }
    this.dropdownAbierto = '';
  }

  // --- Validación ---
  get errores(): string[] {
    const errores: string[] = [];

    if (!this.cargo.trim()) {
      errores.push('El cargo u objeto de la contratación es obligatorio.');
    }
    if (!this.solicitante.trim()) {
      errores.push('El solicitante es obligatorio.');
    }
    if (!this.cedula.trim()) {
      errores.push('La cédula o RIF del solicitante es obligatorio.');
    }
    if (!this.fecha) {
      errores.push('La fecha de la contratación es obligatoria.');
    }
    if (this.monto !== null && this.monto < 0) {
      errores.push('El monto estimado no puede ser negativo.');
    }

    return errores;
  }

  get esValido(): boolean {
    return this.errores.length === 0;
  }

  get mostrarErrores(): boolean {
    return this.intentado && this.errores.length > 0;
  }

  get totalCanales(): number {
    return this.canales.size;
  }

  // --- Canales de publicación (patrón resueltos_ok) ---
  esCanalSeleccionado(canal: string): boolean {
    return this.canales.has(canal);
  }

  toggleCanal(canal: string): void {
    if (canal === 'NO PUBLICAR') {
      // Si se selecciona "No Publicar" se desmarcan las demás opciones
      if (this.canales.has('NO PUBLICAR')) {
        this.canales.delete('NO PUBLICAR');
      } else {
        this.canales.clear();
        this.canales.add('NO PUBLICAR');
      }
    } else {
      // Al marcar cualquier otra opción, se elimina "No Publicar"
      this.canales.delete('NO PUBLICAR');
      if (this.canales.has(canal)) {
        this.canales.delete(canal);
      } else {
        this.canales.add(canal);
      }
    }
  }

  // --- Editor de texto enriquecido (equivalente a la toolbar del canvas de resueltos_ok) ---

  /** Ejecuta un comando nativo del navegador sobre la selección del editor */
  formatearTexto(comando: string): void {
    this.editorTexto?.nativeElement.focus();
    document.execCommand(comando, false, '');
    this.sincronizarEditor();
  }

  /** Aplica un estilo CSS a la selección, envolviéndola en un <span> */
  aplicarEstiloSeleccion(propiedad: string, valor: string): void {
    const editor = this.editorTexto?.nativeElement;
    const seleccion = window.getSelection();
    if (!editor || !seleccion || seleccion.rangeCount === 0) {
      return;
    }

    const rango = seleccion.getRangeAt(0);
    // Sin texto seleccionado no hay nada a lo que aplicar el estilo
    if (rango.collapsed) {
      return;
    }

    const span = document.createElement('span');
    span.style.setProperty(propiedad, valor);

    try {
      span.appendChild(rango.extractContents());
      rango.insertNode(span);

      // Deja la selección sobre el texto recién formateado
      const nuevoRango = document.createRange();
      nuevoRango.selectNodeContents(span);
      seleccion.removeAllRanges();
      seleccion.addRange(nuevoRango);
    } catch {
      // La selección cruzaba nodos no manipulables: se descarta el cambio
      return;
    }

    this.sincronizarEditor();
  }

  /** Aplica un estilo de párrafo a todos los bloques que toca la selección */
  aplicarEstiloBloque(propiedad: string, valor: string): void {
    const bloques = this.bloquesSeleccionados();
    if (!bloques.length) {
      return;
    }

    bloques.forEach((bloque) => bloque.style.setProperty(propiedad, valor));
    this.sincronizarEditor();
  }

  aplicarTamanoFuente(tamano: string): void {
    this.aplicarEstiloSeleccion('fontSize', tamano);
  }

  aplicarInterlineado(interlineado: string): void {
    this.aplicarEstiloBloque('lineHeight', interlineado);
  }

  aplicarAnchoLinea(ancho: string): void {
    this.aplicarEstiloSeleccion('letterSpacing', ancho);
  }

  /** Amplía el ancho de la línea (reduce el padding horizontal del bloque) */
  ampliarLinea(): void {
    this.ajustarPaddingHorizontal(-16);
  }

  /** Estrecha el ancho de la línea (aumenta el padding horizontal del bloque) */
  estrecharLinea(): void {
    this.ajustarPaddingHorizontal(16);
  }

  /** Aumenta la sangría izquierda del bloque seleccionado */
  aumentarSangria(): void {
    this.ajustarSangriaIzquierda(16);
  }

  /** Reduce la sangría izquierda del bloque seleccionado */
  reducirSangria(): void {
    this.ajustarSangriaIzquierda(-16);
  }

  /** Abre/cierra un dropdown de la toolbar y decide la dirección de apertura */
  alternarDropdown(
    dropdown: 'align' | 'fontSize' | 'lineHeight' | 'letterSpacing',
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
   * Abre el menú hacia arriba cuando no hay espacio suficiente debajo del botón
   * (la tarjeta del modal recorta lo que desborda).
   */
  private calcularAperturaHaciaArriba(boton: HTMLElement | null): boolean {
    if (!boton || typeof boton.closest !== 'function') {
      return false;
    }

    const cuerpo = boton.closest('.contr-modal-body');
    const limiteInferior = (cuerpo ?? document.documentElement).getBoundingClientRect().bottom;
    const altoMenu = 240; // alto máximo del menú + margen de seguridad

    return limiteInferior - boton.getBoundingClientRect().bottom < altoMenu;
  }

  /** Aplica la opción elegida en un dropdown de la toolbar y lo cierra */
  elegirOpcionEnDropdown(
    dropdown: 'align' | 'fontSize' | 'lineHeight' | 'letterSpacing',
    valor: string,
  ): void {
    switch (dropdown) {
      case 'align':
        this.formatearTexto(valor);
        break;
      case 'fontSize':
        this.aplicarTamanoFuente(valor);
        break;
      case 'lineHeight':
        this.aplicarInterlineado(valor);
        break;
      case 'letterSpacing':
        this.aplicarAnchoLinea(valor);
        break;
    }

    this.dropdownAbierto = '';
  }

  onEditorInput(): void {
    this.sincronizarEditor();
  }

  /** Copia al modelo el HTML y el texto plano del editor */
  private sincronizarEditor(): void {
    const editor = this.editorTexto?.nativeElement;
    if (!editor) {
      return;
    }

    this.observacionHtml = editor.innerHTML;
    this.observacion = (editor.textContent ?? '').replace(/\u00a0/g, ' ').trim();
  }

  private ajustarSangriaIzquierda(delta: number): void {
    this.bloquesSeleccionados().forEach((bloque) => {
      const actual = parseFloat(bloque.style.paddingLeft) || 0;
      bloque.style.paddingLeft = `${Math.max(0, actual + delta)}px`;
    });
    this.sincronizarEditor();
  }

  private ajustarPaddingHorizontal(delta: number): void {
    this.bloquesSeleccionados().forEach((bloque) => {
      const izquierdo = parseFloat(bloque.style.paddingLeft) || 0;
      const derecho = parseFloat(bloque.style.paddingRight) || 0;
      bloque.style.paddingLeft = `${Math.max(0, izquierdo + delta)}px`;
      bloque.style.paddingRight = `${Math.max(0, derecho + delta)}px`;
    });
    this.sincronizarEditor();
  }

  /** Bloques (p, li, h1..h4) que toca la selección actual dentro del editor */
  private bloquesSeleccionados(): HTMLElement[] {
    const editor = this.editorTexto?.nativeElement;
    const seleccion = window.getSelection();
    if (!editor || !seleccion || seleccion.rangeCount === 0) {
      return [];
    }

    const rango = seleccion.getRangeAt(0);
    const bloques = Array.from(
      editor.querySelectorAll<HTMLElement>('p, li, h1, h2, h3, h4, blockquote'),
    ).filter((bloque) => !bloque.querySelector('p, li, h1, h2, h3, h4, blockquote'));

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

  // --- Acciones ---
  cerrarModal(): void {
    this.cerrar.emit();
  }

  onCrear(): void {
    this.intentado = true;

    if (!this.esValido) {
      return;
    }

    this.sincronizarEditor();

    this.crear.emit({
      numero: this.numero,
      tipo: this.tipo,
      modalidad: this.modalidad,
      cargo: this.cargo.trim(),
      solicitante: this.solicitante.trim(),
      cedula: this.cedula.trim(),
      fecha: this.fecha,
      monto: this.monto,
      canales: Array.from(this.canales),
      observacion: this.observacion,
      observacionHtml: this.observacionHtml,
    });
  }
}
