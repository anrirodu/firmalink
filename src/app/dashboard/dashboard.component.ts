import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CONFIG } from '../config';

interface Servicio {
  titulo: string;
  detalle?: string;
  subitems?: string[];
}

interface Nota {
  numero: string;
  texto: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Configuración del producto (marca y textos). */
  protected readonly cfg = CONFIG;

  acciones = [
    {
      titulo: 'Nuevo Acuerdo',
      descripcion: 'Redacte, negocie y cierre acuerdos en línea',
      icono: 'handshake',
      color: '#0c2d48',
      bg: 'linear-gradient(135deg, #0c2d48 0%, #12406b 100%)',
      // El editor de acuerdos es ahora un modal del listado: se entra por ahí.
      ruta: '/agreements/list-agreement',
    },
    {
      titulo: 'Firmar Documento',
      descripcion: 'Firme con su certificado digital en segundos',
      icono: 'assignment_turned_in',
      color: '#00c9a7',
      bg: 'linear-gradient(135deg, #00c9a7 0%, #00e5be 100%)',
      ruta: null,
    },
    {
      titulo: 'Trámites en Línea',
      descripcion: 'Inicie y siga trámites 100% digitales',
      icono: 'task_alt',
      color: '#12406b',
      bg: 'linear-gradient(135deg, #12406b 0%, #1a5490 100%)',
      ruta: null,
    },
    {
      titulo: 'Contrataciones',
      descripcion: 'Gestione procesos de contratación en línea',
      icono: 'gavel',
      color: '#1a5490',
      bg: 'linear-gradient(135deg, #1a5490 0%, #2a6fb0 100%)',
      ruta: '/hiring',
    },
    {
      titulo: 'Certificación Digital',
      descripcion: 'Obtenga y renueve su certificado digital',
      icono: 'workspace_premium',
      color: '#00b898',
      bg: 'linear-gradient(135deg, #00b898 0%, #00c9a7 100%)',
      ruta: null,
    },
    {
      titulo: 'Gestión Documental',
      descripcion: 'Suba y gestione los documentos de sus trámites',
      icono: 'upload_file',
      color: '#0c2d48',
      bg: 'linear-gradient(135deg, #0c2d48 0%, #00c9a7 100%)',
      ruta: null,
    },
    {
      titulo: 'Calculadora',
      descripcion: 'Proyecte cuánto queda libre de una factura cobrada por depósito',
      icono: 'calculate',
      color: '#0f7a5f',
      bg: 'linear-gradient(135deg, #0f7a5f 0%, #17936f 100%)',
      ruta: '/calculator',
    },
  ];

  servicios: Servicio[] = [
    {
      titulo: 'Firma Electrónica Avanzada',
      detalle:
        'Firme documentos con plena validez legal mediante su certificado digital y sello de tiempo.',
      subitems: [
        'Firma simple, avanzada y cualificada según la Ley de Firma Electrónica.',
        'Validación automática de firmas recibidas.',
        'Firma masiva de carpetas y lotes de documentos.',
      ],
    },
    {
      titulo: 'Acuerdos Digitales',
      detalle:
        'Redacte, negocie y cierre acuerdos con trazabilidad completa de versiones y firmantes.',
      subitems: [
        'Borradores colaborativos con control de versiones.',
        'Flujos de aprobación por etapas y perfiles.',
        'Historial inalterable de cada acuerdo.',
      ],
    },
    {
      titulo: 'Trámites 100% en Línea',
      detalle:
        'Inicie, siga y reciba resoluciones de sus trámites sin desplazamientos.',
      subitems: [
        'Buzón de entrada con estados en tiempo real.',
        'Notificaciones automáticas por correo electrónico.',
        'Descarga de resoluciones firmadas.',
      ],
    },
    {
      titulo: 'Contrataciones en Línea',
      detalle:
        'Gestione procesos de contratación de punta a punta, desde la convocatoria hasta la firma del contrato.',
      subitems: [
        'Publicación de convocatorias y recepción de ofertas.',
        'Evaluación y seguimiento de postulantes.',
        'Distribución y firma del contrato final.',
      ],
    },
    {
      titulo: 'Certificación Digital',
      detalle:
        'Obtenga, renueve y gestione certificados digitales emitidos por entes certificadores autorizados.',
      subitems: [
        'Solicitud y renovación 100% en línea.',
        'Consulta de estado y vigencia del certificado.',
        'Revocación y gestión de tokens de seguridad.',
      ],
    },
    {
      titulo: 'Bandeja y Reportes',
      detalle:
        'Monitoree estados, plazos y métricas de sus firmas, acuerdos y trámites desde un solo panel.',
      subitems: [
        'Indicadores de gestión en tiempo real.',
        'Reportes exportables en PDF y Excel.',
        'Bitácora de auditoría completa.',
      ],
    },
  ];

  notas: Nota[] = [
    {
      numero: 'NOTA N°01',
      texto:
        'La firma electrónica avanzada y cualificada tienen la misma validez legal que la firma autógrafa, conforme a la Ley Nacional de Firma Electrónica (NF-435.503).',
    },
    {
      numero: 'NOTA N°02',
      texto:
        `Nunca comparta sus credenciales ni el PIN de su token; ${CONFIG.identidad.nombre} jamás solicitará su clave por correo, teléfono o mensajería.`,
    },
    {
      numero: 'NOTA N°03',
      texto:
        'Verifique siempre el estado y la vigencia de su certificado digital antes de firmar documentos importantes.',
    },
    {
      numero: 'NOTA N°04',
      texto:
        'Todos los acuerdos, trámites y firmas quedan registrados con sello de tiempo para garantizar integridad y trazabilidad.',
    },
    {
      numero: 'NOTA N°05',
      texto:
        'Los documentos firmados pueden descargarse e imprimirse desde su bandeja en cualquier momento.',
    },
  ];

  constructor(private router: Router) {}

  onAccion(accion: { titulo: string; ruta: string | null }): void {
    if (accion.ruta) {
      this.router.navigate([accion.ruta]);
    } else {
      console.info(`[Dashboard] Acción seleccionada: ${accion.titulo}`);
    }
  }
}
