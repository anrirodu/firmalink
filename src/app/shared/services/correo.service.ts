import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import type { IPeticionCorreo } from './api.service';

/**
 * Respuesta del servicio de correo del servidor.
 * Éxito: `{ tipo: 1, msj, contenido: { id, para, adjuntos, enviado_en }, fecha }`.
 */
export interface ResultadoCorreo {
  id: string;
  para: string[];
  adjuntos: number;
  enviadoEn: string;
  asunto?: string;
}

/** Solicitud de envío tal como la usa la interfaz (destinatarios ya validados) */
export interface SolicitudCorreo {
  para: string[];
  cc?: string[];
  asunto: string;
  html: string;
  texto?: string;
  /** Clave de idempotencia opcional (evita envíos duplicados al reintentar) */
  idempotencia?: string;
}

/** Error de envío con el mensaje ya normalizado para el usuario */
export class CorreoError extends Error {
  /** true cuando el servicio de correo no está habilitado en el nodo (HTTP 503) */
  readonly noHabilitado: boolean;
  /** true cuando el proveedor rechazó la petición por reglas de remitente/dominio */
  readonly rechazoProveedor: boolean;

  constructor(mensaje: string, opciones: { noHabilitado?: boolean; rechazoProveedor?: boolean } = {}) {
    super(mensaje);
    this.name = 'CorreoError';
    this.noHabilitado = opciones.noHabilitado ?? false;
    this.rechazoProveedor = opciones.rechazoProveedor ?? false;
  }
}

/**
 * CorreoService — envía correo saliente a través de Sandra Server
 * (`POST /v1/api/email/enviar`, proveedor Resend).
 *
 * El servidor valida destinatarios, límites de adjuntos y maneja los errores
 * del proveedor; aquí solo se normaliza el mensaje para poder mostrarlo.
 */
@Injectable({ providedIn: 'root' })
export class CorreoService {
  constructor(private api: ApiService) {}

  /** Envía un correo y devuelve la constancia del proveedor */
  async enviar(solicitud: SolicitudCorreo): Promise<ResultadoCorreo> {
    const peticion: IPeticionCorreo = {
      para: solicitud.para,
      cc: solicitud.cc?.length ? solicitud.cc : undefined,
      asunto: solicitud.asunto,
      html: solicitud.html,
      texto: solicitud.texto,
      idempotencia: solicitud.idempotencia,
    };

    try {
      const res = await firstValueFrom(this.api.EnviarCorreo(peticion));
      const contenido = res?.contenido ?? {};

      return {
        id: contenido.id ?? '',
        para: contenido.para ?? solicitud.para,
        adjuntos: contenido.adjuntos ?? 0,
        enviadoEn: contenido.enviado_en ?? new Date().toISOString(),
        asunto: contenido.asunto ?? solicitud.asunto,
      };
    } catch (e) {
      throw new CorreoError(this.mensajeDeError(e), {
        noHabilitado: this.estado(e) === 503,
        rechazoProveedor: this.estado(e) === 422,
      });
    }
  }

  private estado(e: unknown): number | undefined {
    return (e as { status?: number })?.status;
  }

  /** Traduce el error HTTP del servidor a un texto útil para el usuario */
  private mensajeDeError(e: unknown): string {
    const err = e as { status?: number; error?: { msj?: string; mensaje?: string }; message?: string };
    const msj = err?.error?.msj ?? err?.error?.mensaje;

    switch (err?.status) {
      case 503:
        return 'El servicio de correo no está habilitado en este nodo del servidor.';
      case 400:
        return msj || 'La petición de correo está incompleta o mal formada.';
      case 403:
        return msj || 'El servidor rechazó el envío (permisos o ruta de adjunto no permitida).';
      case 413:
        return msj || 'El correo supera el tamaño máximo admitido por el proveedor.';
      case 422:
        return msj || 'El proveedor de correo rechazó el envío.';
      case 429:
        return msj || 'Se alcanzó el límite de envíos del proveedor. Intente más tarde.';
      default:
        if (msj) return msj;
        if (err?.status) return `El servidor respondió HTTP ${err.status}.`;
        return err?.message ?? 'Error de comunicación al enviar el correo.';
    }
  }
}
