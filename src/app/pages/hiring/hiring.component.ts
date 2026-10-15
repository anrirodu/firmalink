import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { NuevaContratacionComponent, NuevaContratacionPayload } from './nueva-contratacion/nueva-contratacion.component';
import Swal from 'sweetalert2';

export interface Contratacion {
  id: number;
  numero: string;
  cargo: string;
  solicitante: string;
  cedula: string;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-hiring',
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
    NuevaContratacionComponent,
  ],
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.scss'],
})
export class HiringComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    'cargo',
    'solicitante',
    'fecha',
    'estado',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Contratacion>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Datos mock de contrataciones (hiring)
  private contratacionesData: Contratacion[] = [
    { id: 1, numero: 'HC-2026-0001', cargo: 'Analista de Sistemas', solicitante: 'María García López', cedula: 'V-12.345.678', fecha: '2026-01-15', estado: 'Pendiente' },
    { id: 2, numero: 'HC-2026-0002', cargo: 'Administrador Postal', solicitante: 'Juan Pérez Martínez', cedula: 'V-18.765.432', fecha: '2026-01-22', estado: 'En Proceso' },
    { id: 3, numero: 'HC-2026-0003', cargo: 'Operador de Ruta', solicitante: 'Carlos Rodríguez Silva', cedula: 'V-20.111.222', fecha: '2026-02-03', estado: 'Aprobada' },
    { id: 4, numero: 'HC-2026-0004', cargo: 'Supervisor de Sucursal', solicitante: 'Ana Hernández Ruiz', cedula: 'V-25.333.444', fecha: '2026-02-14', estado: 'Rechazada' },
    { id: 5, numero: 'HC-2026-0005', cargo: 'Couriero Ejecutivo', solicitante: 'Luis González Torres', cedula: 'V-27.555.666', fecha: '2026-03-01', estado: 'Pendiente' },
    { id: 6, numero: 'HC-2026-0006', cargo: 'Analista de Calidad', solicitante: 'Carmen Díaz Mendoza', cedula: 'V-29.777.888', fecha: '2026-03-18', estado: 'En Proceso' },
  ];

  // --- MODAL NUEVA CONTRATACIÓN ---
  public isCreateModalOpen = false;

  // --- MODAL DE DISTRIBUCIÓN (patrón resueltos_ok) ---
  public isDistributionModalOpen = false;
  public selectedContratacion: Contratacion | null = null;
  public distributionOptions: string[] = [
    'INTERNO',
    'PORTAL WEB',
    'OFICIO',
    'GACETA',
    'CORREO',
    'NO PUBLICAR',
  ];
  public selectedDistributions: Set<string> = new Set<string>();
  public distributionObservacion = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.contratacionesData;

    // Filtro personalizado que busca en todas las columnas
    this.dataSource.filterPredicate = (data: Contratacion, filter: string) => {
      const searchStr = filter.toLowerCase();
      return (
        data.numero.toLowerCase().includes(searchStr) ||
        data.cargo.toLowerCase().includes(searchStr) ||
        data.solicitante.toLowerCase().includes(searchStr) ||
        data.cedula.toLowerCase().includes(searchStr) ||
        data.estado.toLowerCase().includes(searchStr)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Cierra los modales con la tecla Escape (patrón resueltos_ok)
  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') {
      if (this.isCreateModalOpen) {
        this.cerrarModalCreacion();
      }
      if (this.isDistributionModalOpen) {
        this.closeDistributionModal();
      }
    }
  }

  aplicarFiltro(valor: string): void {
    this.dataSource.filter = valor.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'status-pending';
      case 'En Proceso': return 'status-progress';
      case 'Aprobada': return 'status-approved';
      case 'Rechazada': return 'status-rejected';
      default: return '';
    }
  }

  limpiarFiltro(input: HTMLInputElement): void {
    this.aplicarFiltro('');
    if (input) {
      input.value = '';
    }
  }

  crearContratacion(): void {
    this.isCreateModalOpen = true;
  }

  /** N° de contratación sugerido: HC-<año>-<consecutivo> */
  get nextNumero(): string {
    const year = new Date().getFullYear();
    const maxConsecutivo = this.contratacionesData.reduce((max, contratacion) => {
      const match = contratacion.numero.match(/(\d+)$/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);

    return `HC-${year}-${String(maxConsecutivo + 1).padStart(4, '0')}`;
  }

  public cerrarModalCreacion(): void {
    this.isCreateModalOpen = false;
  }

  public onCrearContratacion(payload: NuevaContratacionPayload): void {
    const nueva: Contratacion = {
      id: this.contratacionesData.reduce((max, c) => Math.max(max, c.id), 0) + 1,
      numero: payload.numero || this.nextNumero,
      cargo: payload.cargo,
      solicitante: payload.solicitante,
      cedula: payload.cedula,
      fecha: payload.fecha,
      estado: 'Pendiente',
    };

    // Datos complementarios del proceso (mismo patrón usado para la distribución)
    (nueva as any).tipo = payload.tipo;
    (nueva as any).modalidad = payload.modalidad;
    (nueva as any).monto = payload.monto;
    (nueva as any).observacion = payload.observacion;
    (nueva as any).observacionHtml = payload.observacionHtml;
    (nueva as any).distribution = payload.canales;

    this.contratacionesData = [nueva, ...this.contratacionesData];
    this.dataSource.data = this.contratacionesData;

    // TODO: conectar con el API cuando el backend exponga la creación de contrataciones
    console.info('[Hiring] Contratación creada:', nueva);

    Swal.fire({
      icon: 'success',
      title: 'Contratación creada correctamente',
      text: `Proceso ${nueva.numero} — ${nueva.cargo}`,
      confirmButtonColor: '#0c2d48',
      timer: 2400,
      showConfirmButton: false,
    });

    this.isCreateModalOpen = false;
  }

  verDetalles(contratacion: Contratacion): void {
    console.info('[Hiring] Ver detalles:', contratacion.numero);
  }

  // --- MODAL DE DISTRIBUCIÓN ---
  public openDistributionModal(contratacion: Contratacion): void {
    this.selectedContratacion = contratacion;
    // Restaurar selecciones previas guardadas en la contratación (si existen)
    const savedDist: string[] = (contratacion as any).distribution || [];
    this.selectedDistributions = new Set<string>(savedDist);
    this.distributionObservacion = '';
    this.isDistributionModalOpen = true;
  }

  public closeDistributionModal(): void {
    this.isDistributionModalOpen = false;
    this.selectedContratacion = null;
    this.distributionObservacion = '';
  }

  public isOptionChecked(option: string): boolean {
    return this.selectedDistributions.has(option);
  }

  public toggleDistributionOption(option: string): void {
    if (option === 'NO PUBLICAR') {
      // Si se selecciona "No Publicar" se desmarcan las demás opciones
      if (this.selectedDistributions.has('NO PUBLICAR')) {
        this.selectedDistributions.delete('NO PUBLICAR');
      } else {
        this.selectedDistributions.clear();
        this.selectedDistributions.add('NO PUBLICAR');
      }
    } else {
      // Al marcar cualquier otra opción, se elimina "No Publicar"
      this.selectedDistributions.delete('NO PUBLICAR');
      if (this.selectedDistributions.has(option)) {
        this.selectedDistributions.delete(option);
      } else {
        this.selectedDistributions.add(option);
      }
    }
  }

  public saveDistribution(): void {
    if (!this.selectedContratacion) return;

    const distribution = Array.from(this.selectedDistributions);
    (this.selectedContratacion as any).distribution = distribution;

    // TODO: conectar con el API cuando el backend exponga la función de distribución
    console.info('[Hiring] Distribución guardada:', {
      contratacion: this.selectedContratacion.numero,
      canales: distribution,
      observacion: this.distributionObservacion,
    });

    Swal.fire({
      icon: 'success',
      title: 'Distribución guardada correctamente',
      text: `Canales seleccionados: ${distribution.length > 0 ? distribution.join(', ') : 'NINGUNO'}`,
      confirmButtonColor: '#0c2d48',
      timer: 2200,
      showConfirmButton: false,
    });

    this.closeDistributionModal();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
