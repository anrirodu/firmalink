import { Component, HostListener, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
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
  Acuerdo,
  AcuerdoEstado,
  esEditable,
  motivoBloqueo,
  transicionesPermitidas,
} from '../new-agreement/acuerdo.model';
import { AcuerdoService } from '../new-agreement/acuerdo.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { CorreoError, CorreoService } from '../../../shared/services/correo.service';
import { construirCorreoAcuerdo } from '../acuerdo-correo';
import { pedirDestinatariosCorreo } from '../enviar-correo.dialog';

/**
 * LIST AGREEMENT — Acuerdos registrados.
 *
 * Lista todos los acuerdos guardados (función `_SYS_CFirmaLinkAcuerdos`),
 * permite filtrarlos por texto/estado, cambiar su estado sin abrir el editor
 * y elegir uno para continuar la edición (relee el documento completo con
 * `_SYS_CFirmaLinkAcuerdo` antes de entrar al editor).
 */

interface EstadoOpcion {
  valor: AcuerdoEstado;
  etiqueta: string;
  clase: string;
  icono: string;
}

interface KpiEstado {
  etiqueta: string;
  valor: number;
  clase: string;
  icono: string;
}

@Component({
  selector: 'app-list-agreement',
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
  templateUrl: './list-agreement.component.html',
  styleUrls: ['./list-agreement.component.scss'],
})
export class ListAgreementComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'estado',
    'huella',
    'actualizadoEn',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Acuerdo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    if (!destino?.closest('.la-speeddial')) {
      this.accionesAbiertas.set(false);
    }
  }

  cargando = false;

  /**
   * Estados que el listado muestra: el filtro por estado y el menú "Cambiar
   * estado". El estado `eliminado` no aparece: se llega a él con la acción
   * "Eliminar" y los acuerdos en ese estado no se listan.
   */
  readonly estados: EstadoOpcion[] = [
    { valor: 'borrador', etiqueta: 'Borrador', clase: 'estado-borrador', icono: 'edit_note' },
    { valor: 'en_revision', etiqueta: 'En revisión', clase: 'estado-revision', icono: 'pending_actions' },
    { valor: 'firmado', etiqueta: 'Firmado', clase: 'estado-firmado', icono: 'verified' },
    { valor: 'anulado', etiqueta: 'Anulado', clase: 'estado-anulado', icono: 'block' },
  ];

  kpis: KpiEstado[] = [];

  constructor(
    private acuerdos: AcuerdoService,
    private correo: CorreoService,
    private router: Router,
    private notificar: NotificacionService,
  ) {}

  ngOnInit(): void {
    document.addEventListener('keydown', this.alPulsarEscape, true);
    void this.cargar();
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.alPulsarEscape, true);
  }

  /** Carga el listado desde el servidor (con avisos de degradación a local) */
  async cargar(): Promise<void> {
    this.cargando = true;
    try {
      const lista = await this.acuerdos.listar();
      this.dataSource.data = this.ordenar(lista);
    } catch (e) {
      this.notificar.error(
        'No se pudo cargar el listado de acuerdos',
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
          if (propiedad === 'actualizadoEn') {
            return new Date(this.fecha(item)).getTime() || 0;
          }
          return String((item as unknown as Record<string, unknown>)[propiedad] ?? '').toLowerCase();
        };
        this.aplicarFiltros();
      });
    }
  }

  /** Más recientes primero */
  private ordenar(lista: Acuerdo[]): Acuerdo[] {
    return [...lista].sort(
      (a, b) => new Date(this.fecha(b)).getTime() - new Date(this.fecha(a)).getTime(),
    );
  }

  /** Fecha efectiva del acuerdo (actualización, o creación si nunca se actualizó) */
  fecha(a: Acuerdo): string {
    const f: unknown = a.actualizadoEn ?? a.creadoEn ?? '';
    if (f instanceof Date) return f.toISOString();
    return typeof f === 'string' ? f : '';
  }

  /** Filtro combinado: texto libre (búsqueda + estado seleccionado) */
  private aplicarFiltros(): void {
    const texto = (this.filtroTexto ?? '').trim().toLowerCase();
    const estado = this.filtroEstado;

    this.dataSource.filterPredicate = (a: Acuerdo) => {
      const coincideEstado = !estado || a.estado === estado;
      if (!coincideEstado) return false;
      if (!texto) return true;
      const heno = [
        a.codigo,
        a.titulo,
        a.representante,
        a.proyecto,
        a.area,
        a.gerente,
        a.cedula,
        a.ciudad,
        a.creadoPorNombre,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return heno.includes(texto);
    };

    this.dataSource.filter = `${texto}|${estado}|${Date.now()}`;
  }

  filtroTexto = '';
  filtroEstado: AcuerdoEstado | '' = '';

  onFiltroTexto(valor: string): void {
    this.filtroTexto = valor ?? '';
    this.aplicarFiltros();
  }

  onFiltroEstado(valor: AcuerdoEstado | ''): void {
    this.filtroEstado = valor ?? '';
    this.aplicarFiltros();
  }

  limpiarFiltros(entrada?: HTMLInputElement): void {
    this.filtroTexto = '';
    this.filtroEstado = '';
    if (entrada) entrada.value = '';
    this.aplicarFiltros();
  }

  private calcularKpis(): void {
    const datos = this.dataSource.data ?? [];
    const cuenta = (estado: AcuerdoEstado) => datos.filter((a) => a.estado === estado).length;
    this.kpis = [
      { etiqueta: 'Acuerdos', valor: datos.length, clase: 'kpi-total', icono: 'folder_open' },
      { etiqueta: 'Borradores', valor: cuenta('borrador'), clase: 'kpi-borrador', icono: 'edit_note' },
      { etiqueta: 'En revisión', valor: cuenta('en_revision'), clase: 'kpi-revision', icono: 'pending_actions' },
      { etiqueta: 'Firmados', valor: cuenta('firmado'), clase: 'kpi-firmado', icono: 'verified' },
      { etiqueta: 'Anulados', valor: cuenta('anulado'), clase: 'kpi-anulado', icono: 'block' },
    ];
  }

  // --- Presentación ---

  etiquetaEstado(estado: AcuerdoEstado): string {
    return this.estados.find((e) => e.valor === estado)?.etiqueta ?? String(estado ?? '—');
  }

  claseEstado(estado: AcuerdoEstado): string {
    return this.estados.find((e) => e.valor === estado)?.clase ?? 'estado-desconocido';
  }

  iconoEstado(estado: AcuerdoEstado): string {
    return this.estados.find((e) => e.valor === estado)?.icono ?? 'help_outline';
  }

  huellaCorta(a: Acuerdo): string {
    return (a.hashDocumento ?? '').slice(0, 12);
  }

  /** Título visible: el título del acuerdo o el proyecto como respaldo */
  tituloVisible(a: Acuerdo): string {
    return a.titulo?.trim() || a.proyecto?.trim() || '(Acuerdo sin título)';
  }

  /** "hace 5 min", "ayer 14:30"... a partir de la fecha efectiva */
  hace(a: Acuerdo): string {
    const f = this.fecha(a);
    if (!f) return '—';
    const ms = Date.now() - new Date(f).getTime();
    if (isNaN(ms)) return '—';
    const min = Math.floor(ms / 60000);
    if (min < 1) return 'hace instantes';
    if (min < 60) return `hace ${min} min`;
    const horas = Math.floor(min / 60);
    if (horas < 24) return `hace ${horas} h`;
    const dias = Math.floor(horas / 24);
    if (dias === 1) return 'ayer';
    if (dias < 30) return `hace ${dias} días`;
    return new Date(f).toLocaleDateString('es-VE');
  }

  /** Fecha absoluta para el tooltip */
  fechaAbsoluta(a: Acuerdo): string {
    const f = this.fecha(a);
    if (!f) return 'Sin fecha registrada';
    const d = new Date(f);
    return isNaN(d.getTime()) ? f : d.toLocaleString('es-VE');
  }

  // --- Acciones ---

  /** ¿El acuerdo admite edición? (firmado y anulado son documentos cerrados) */
  editable(a: Acuerdo): boolean {
    return esEditable(a?.estado);
  }

  /** Motivo por el que un acuerdo no admite edición (para el tooltip) */
  notaBloqueo(a: Acuerdo): string {
    return esEditable(a?.estado)
      ? 'Abrir este acuerdo en el editor para continuar la redacción'
      : motivoBloqueo(a?.estado);
  }

  /** ¿Se puede pasar el acuerdo al estado indicado? */
  puedeCambiarA(a: Acuerdo, estado: AcuerdoEstado): boolean {
    if (!a?.codigo) return false;
    if (a.estado === estado) return false;
    return transicionesPermitidas(a.estado).includes(estado);
  }

  /**
   * Continúa la edición de un acuerdo elegido de la lista.
   * Un acuerdo firmado o anulado no admite edición: se avisa y no se abre.
   */
  async editar(a: Acuerdo): Promise<void> {
    if (!a?.codigo) {
      this.notificar.aviso('Acuerdo sin código', 'No se puede continuar la edición sin código.');
      return;
    }

    if (!this.editable(a)) {
      await Swal.fire({
        icon: 'info',
        title: 'Acuerdo cerrado',
        html: `${motivoBloqueo(a.estado)}<br><br>
               <small>Puede consultarlo, imprimirlo y enviarlo por correo, pero no modificarlo.</small>`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0c2d48',
      });
      return;
    }

    this.cargando = true;
    try {
      // El listado trae una proyección liviana: se relee el documento completo
      const doc = await this.acuerdos.obtener(a.codigo);

      if (!doc) {
        await this.notificar.errorModal(
          'No se pudo abrir el acuerdo',
          `No se encontró <strong>${a.codigo}</strong> en el servidor ni en la copia local de este navegador.`,
        );
        return;
      }

      // El estado puede haber cambiado desde que se cargó el listado
      if (!this.editable(doc)) {
        this.notificar.aviso('Acuerdo cerrado', motivoBloqueo(doc.estado));
        a.estado = doc.estado;
        return;
      }

      if (!doc.documentoHtml && !doc.campos) {
        this.notificar.aviso(
          'El acuerdo se abrirá con el documento en blanco',
          `El documento de ${a.codigo} no se pudo recuperar completo; se conservaron los campos disponibles.`,
        );
      }

      // Traspaso al editor: documento en memoria + código en sessionStorage
      // (así el editor lo recupera aunque se recargue la página)
      this.acuerdos.setAcuerdoParaEditar(doc);
      this.acuerdos.marcarParaEditar(doc.codigo);
      await this.router.navigate(['/agreements/new-agreement']);
    } catch (e) {
      this.notificar.errorModal(
        'No se pudo abrir el acuerdo',
        `Error inesperado al leer <strong>${a.codigo}</strong>: ${NotificacionService.detalle(e)}.`,
      );
    } finally {
      this.cargando = false;
    }
  }

  // --- Envío por correo ---

  /**
   * ¿Se puede enviar el acuerdo por correo?
   *
   * Solo los acuerdos FIRMADOS: el envío difunde el documento con su huella
   * SHA-256 como constancia de un compromiso cerrado. Un borrador o un acuerdo
   * en revisión puede cambiar después, y uno anulado es un documento sin
   * efecto, así que ninguno se envía.
   */
  puedeEnviarCorreo(a: Acuerdo): boolean {
    return !!a?.codigo && a.estado === 'firmado';
  }

  /** Motivo por el que un acuerdo no admite envío por correo (tooltip) */
  notaEnviarCorreo(a: Acuerdo): string {
    if (this.puedeEnviarCorreo(a)) {
      return 'Enviar el acuerdo firmado por correo electrónico';
    }
    if (a?.estado === 'eliminado') {
      return 'Un acuerdo eliminado no se puede enviar por correo.';
    }
    return a?.estado === 'anulado'
      ? 'Un acuerdo anulado no se puede enviar por correo: ya no tiene efecto.'
      : 'Solo se envían por correo los acuerdos firmados.';
  }

  /**
   * Envía el acuerdo por correo (servicio de correo de Sandra Server / Resend).
   * Solo para acuerdos firmados: ver `puedeEnviarCorreo()`.
   */
  async enviarCorreo(a: Acuerdo): Promise<void> {
    if (!a?.codigo) {
      this.notificar.aviso('Acuerdo sin código', 'No se puede enviar un acuerdo sin código.');
      return;
    }

    if (!this.puedeEnviarCorreo(a)) {
      this.notificar.aviso('Envío no permitido', this.notaEnviarCorreo(a));
      return;
    }

    const destinatarios = await pedirDestinatariosCorreo(a);
    if (!destinatarios) return;

    this.cargando = true;
    try {
      // El listado es liviano: se relee el documento completo para adjuntarlo
      const doc = (await this.acuerdos.obtener(a.codigo)) ?? a;
      const cuerpo = construirCorreoAcuerdo(doc, destinatarios.mensaje);

      const resultado = await this.correo.enviar({
        para: destinatarios.para,
        cc: destinatarios.cc,
        asunto: cuerpo.asunto,
        html: cuerpo.html,
        texto: cuerpo.texto,
        idempotencia: `${a.codigo}:${doc.hashDocumento ?? ''}:${Date.now()}`,
      });

      await Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        html:
          `El acuerdo <strong>${a.codigo}</strong> se envió a:<br>` +
          `<small>${resultado.para.join(', ')}</small><br><br>` +
          `<small style="color:#9e9e9e">Identificador del proveedor: ${resultado.id || 'sin identificar'}</small>`,
        confirmButtonColor: '#0c2d48',
      });
    } catch (e) {
      await this.reportarFalloCorreo(e, a.codigo);
    } finally {
      this.cargando = false;
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
        `El acuerdo <strong>${codigo}</strong> no se envió.<br><br>` +
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
      const acuerdo = this.dataSource.data.find((x) => x.codigo === codigo);
      if (acuerdo) await this.enviarCorreo(acuerdo);
    }
  }

  /**
   * Cambio de estado desde la lista (upsert parcial, sin abrir el editor).
   *
   * Una vez firmado el acuerdo solo puede anularse: así el contenido firmado y
   * su huella quedan protegidos de cualquier vuelta a edición.
   */
  async cambiarEstado(a: Acuerdo, estado: AcuerdoEstado): Promise<void> {
    if (!a?.codigo || a.estado === estado) return;

    if (!this.puedeCambiarA(a, estado)) {
      const permitidos = transicionesPermitidas(a.estado);
      this.notificar.aviso(
        'Cambio de estado no permitido',
        permitidos.length
          ? `El acuerdo está ${this.etiquetaEstado(a.estado).toLowerCase()} y solo puede pasar a: ${permitidos
              .map((e) => this.etiquetaEstado(e).toLowerCase())
              .join(', ')}.`
          : `${motivoBloqueo(a.estado)} Un acuerdo anulado es un estado terminal.`,
      );
      return;
    }

    const etiqueta = this.etiquetaEstado(estado);
    const confirmar = await Swal.fire({
      icon: estado === 'anulado' || estado === 'firmado' ? 'warning' : 'question',
      title: `¿Marcar ${a.codigo} como ${etiqueta}?`,
      html:
        estado === 'firmado'
          ? 'El acuerdo quedará <strong>cerrado</strong>: no admitirá más ediciones y solo podrá anularse. ' +
            'La huella SHA-256 y el documento no cambian.'
          : `El acuerdo pasará de <strong>${this.etiquetaEstado(a.estado)}</strong> a <strong>${etiqueta}</strong>.`,
      showCancelButton: true,
      confirmButtonText: `Sí, ${etiqueta.toLowerCase()}`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: estado === 'anulado' ? '#b3261e' : '#0c2d48',
    });

    if (!confirmar.isConfirmed) return;

    const ok = await this.acuerdos.cambiarEstado(a.codigo, estado, a.estado);
    if (ok) {
      a.estado = estado;
      this.dataSource.data = [...this.dataSource.data];
      this.calcularKpis();
      this.notificar.exito(
        'Estado actualizado',
        estado === 'firmado'
          ? `${a.codigo} → ${etiqueta} (documento cerrado, ya no admite edición).`
          : `${a.codigo} → ${etiqueta}.`,
      );
    }
  }

  // --- Eliminación (borrado lógico) ---

  /**
   * ¿Se puede eliminar el acuerdo?
   * Un acuerdo firmado no se elimina nunca: su contenido y su huella son
   * definitivos. En su lugar puede anularse desde "Cambiar estado".
   */
  sePuedeEliminar(a: Acuerdo): boolean {
    return !!a?.codigo && a?.estado !== 'firmado';
  }

  /** Motivo por el que un acuerdo no admite eliminarse (tooltip) */
  notaEliminar(a: Acuerdo): string {
    return this.sePuedeEliminar(a)
      ? 'Eliminar este acuerdo del listado'
      : 'Un acuerdo firmado no se puede eliminar: su contenido y su huella son definitivos. Puede anularse.';
  }

  /**
   * Elimina el acuerdo de la lista.
   *
   * El backend (`ccoleccion`) no admite borrados físicos, así que el registro
   * se actualiza con el estado `eliminado` y deja de aparecer en el listado,
   * conservándose para la trazabilidad.
   */
  async eliminar(a: Acuerdo): Promise<void> {
    if (!a?.codigo) return;

    if (!this.sePuedeEliminar(a)) {
      this.notificar.aviso('Acuerdo firmado: no se puede eliminar', this.notaEliminar(a));
      return;
    }

    const confirmar = await Swal.fire({
      icon: 'warning',
      title: `¿Eliminar ${a.codigo}?`,
      html:
        `El acuerdo <strong>${a.titulo || a.codigo}</strong> dejará de aparecer en el listado ` +
        'y <strong>no se contará</strong> en los indicadores.<br><br>' +
        '<small>El registro se conserva en el sistema con el estado eliminado ' +
        '(la huella SHA-256 no se borra).</small>',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b3261e',
    });

    if (!confirmar.isConfirmed) return;

    const ok = await this.acuerdos.eliminar(a.codigo, a.estado);
    if (!ok) return;

    this.dataSource.data = this.dataSource.data.filter((x) => x.codigo !== a.codigo);
    this.aplicarFiltros();
    this.calcularKpis();
    this.notificar.exito('Acuerdo eliminado', `${a.codigo} ya no aparece en el listado.`);
  }

  /** Abre el editor en blanco (nuevo acuerdo) */
  async nuevoAcuerdo(): Promise<void> {
    this.acuerdos.setAcuerdoParaEditar(null);
    this.acuerdos.marcarParaEditar('');
    await this.router.navigate(['/agreements/new-agreement']);
  }

  /** Copia la huella completa al portapapeles */
  copiarHuella(a: Acuerdo): void {
    const huella = a.hashDocumento ?? '';
    if (!huella) {
      this.notificar.aviso('Sin huella', `El acuerdo ${a.codigo} todavía no tiene huella calculada.`);
      return;
    }
    navigator.clipboard
      ?.writeText(huella)
      .then(() => this.notificar.exito('Huella copiada', `${huella.slice(0, 24)}…`))
      .catch(() => this.notificar.aviso('No se pudo copiar la huella', 'Copie el texto manualmente.'));
  }
}
