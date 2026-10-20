import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, switchMap, of, shareReplay } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../shared/services/api.service';
import { Sha256Service } from '../../shared/utils/sha256.service';
import { huellaMenu } from '../../shared/utils/menu-crypt';
import { MenuService } from '../../shared/services/menu.service';
import {
  IToken,
  TokenPayload,
  User,
  Aplicacion,
} from '../interfaces/auth.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<User | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  private tempAuthToken = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private sha256: Sha256Service,
    private menuService: MenuService,
    private http: HttpClient,
  ) {
    // Restaurar sesión desde sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = this.getUserDecrypt(token);
      if (payload?.Usuario) {
        this.currentUser.set({
          id: payload.Usuario.cedula,
          nombre: payload.Usuario.nombre,
          email: payload.Usuario.correo,
          rol: payload.Usuario.Perfil?.descripcion || 'Usuario',
          cedula: payload.Usuario.cedula,
          sistema: payload.Usuario.sistema,
        });
        this.menuService.loadMenu();
      }
    }
  }

  /**
   * Paso 1: Login con usuario y contraseña.
   * Retorna un Observable con el token JWT.
   * Si el usuario tiene TOTP activo, el token contendrá un tempAuthToken.
   */
  getLogin(usuario: string, clave: string): Observable<IToken> {
    const netInfo = sessionStorage.getItem('net_info');
    let deviceContext = '';

    if (netInfo) {
      try {
        const info = JSON.parse(netInfo);
        const context = {
          os_info: info.system?.os_info || 'unknown',
          mac_address: info.system?.mac_address || 'unknown',
          network: info.network || 'unknown',
        };
        deviceContext = btoa(JSON.stringify(context));
      } catch (e) {
        console.warn('[AuthService] Error parseando net_info:', e);
      }
    }

    const cryptoPromise = this.sha256.EncryptDeviceContext(
      deviceContext,
      environment.Hash.slice(-32),
    ).catch((cryptoErr) => {
      console.warn('[AuthService] crypto.subtle falló:', cryptoErr);
      return '';
    });

    return from(cryptoPromise).pipe(
      switchMap((ctx) =>
        this.apiService.login(usuario, clave, ctx || undefined)
      ),
    );
  }

  /**
   * Decodificar token JWT
   */
  getUserDecrypt(itk: string): TokenPayload | null {
    if (!itk || itk === 'undefined' || itk === 'null') {
      return null;
    }
    try {
      // Decodificación manual del payload JWT
      const parts = itk.split('.');
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1]));
      return payload as TokenPayload;
    } catch (error) {
      console.error('[AuthService] Error decodificando token:', error);
      return null;
    }
  }

  /**
   * Verificar si el token tiene TOTP activo
   */
  hasTotpActive(token: string): boolean {
    const payload = this.getUserDecrypt(token);
    return !!(payload?.Usuario?.token);
  }

  /**
   * Guardar el tempAuthToken para el paso de TOTP
   */
  setTempAuthToken(token: string): void {
    this.tempAuthToken = token;
  }

  getTempAuthToken(): string {
    return this.tempAuthToken;
  }

  /**
   * Paso 2: Validar código TOTP
   */
  validarTotp(codigo: string): Observable<any> {
    return this.apiService.Validar_TOTP(codigo, this.tempAuthToken);
  }

  private multiplesesionCache = new Map<string, Observable<any>>();

  /**
   * Paso 3: Verificar múltiples sesiones
   * Si no se recibe token, usa el tempAuthToken (flujo TOTP).
   * Se cachea por token con shareReplay(1) para evitar doble llamada.
   */
  verificarSesion(token?: string): Observable<any> {
    const tk = token || this.tempAuthToken;
    if (!tk) {
      return this.apiService.MultipleSesion(tk);
    }
    if (this.multiplesesionCache.has(tk)) {
      return this.multiplesesionCache.get(tk)!;
    }
    const obs = this.apiService.MultipleSesion(tk).pipe(
      shareReplay(1),
    );
    this.multiplesesionCache.set(tk, obs);
    return obs;
  }

  /**
   * Paso 4: Iniciar sesión (después de TOTP o directo)
   * Decodifica el JWT, guarda en sessionStorage, obtiene perfil
   */
  async iniciarSesion(token: string): Promise<void> {
    const payload = this.getUserDecrypt(token);
    if (!payload?.Usuario) {
      throw new Error('Token inválido');
    }

    // Verificar que el usuario tenga acceso a esta aplicación (environment.ID)
    // antes de fijar cualquier estado de sesión.
    if (!this.tieneAccesoAplicacion(payload)) {
      this.clearSession();
      throw new Error('SIN_ACCESO_APP');
    }

    // Guardar token
    sessionStorage.setItem('token', token);

    // El token recién emitido es la fuente autoritativa del estado TOTP:
    // se descarta el marcador de conmutación de la sesión anterior.
    sessionStorage.removeItem('totp');

    // Establecer usuario actual
    this.currentUser.set({
      id: payload.Usuario.cedula,
      nombre: payload.Usuario.nombre,
      email: payload.Usuario.correo,
      rol: payload.Usuario.Perfil?.descripcion || 'Usuario',
      cedula: payload.Usuario.cedula,
      sistema: payload.Usuario.sistema,
    });

    // Obtener menú desde la API
    await this.obtenerPerfil(token);
  }

  /**
   * Verifica que el token incluya esta aplicación (environment.ID).
   * Recorre todo el arreglo Aplicacion[] (un usuario puede tener varias apps)
   * y compara sin distinguir mayúsculas/minúsculas.
   */
  tieneAccesoAplicacion(payload: TokenPayload | null): boolean {
    const aplicaciones: Aplicacion[] = payload?.Usuario?.Aplicacion ?? [];
    const idSistema = String(environment.ID).toLowerCase();
    return aplicaciones.some(
      (a) => String(a?.id ?? '').toLowerCase() === idSistema,
    );
  }

  /**
   * Obtener perfil de usuario y menú desde la API
   */
  private async obtenerPerfil(itk: string): Promise<void> {
    const payload = this.getUserDecrypt(itk);
    if (!payload?.Usuario) return;

    const cadena =
      payload.Usuario.cedula +
      ',' +
      payload.Usuario.sistema +
      ',' +
      payload.Usuario.correo;

    const xAPI = {
      funcion: environment.functions.CONSULTAR_USUARIO_PERFIL,
      parametros: cadena,
    };

    return new Promise((resolve, reject) => {
      this.apiService.Ejecutar(xAPI).subscribe({
        next: (data) => {
          try {
            if (
              !data ||
              data.length === 0 ||
              !data[0].Aplicacion ||
              data[0].Aplicacion.length === 0 ||
              !data[0].Aplicacion[0].Rol
            ) {
              throw new Error('Perfil de usuario no válido');
            }

            // Guardar menú
            const menuJson = JSON.stringify(data[0].Aplicacion[0].Rol.Menu);
            sessionStorage.setItem('menu', menuJson);

            // Generar userId (uuidv4) y guardarlo en localStorage, como consola
            this.getUserId();

            // Huella del menú: el guard recalcula lo mismo en cada navegación y
            // cierra la sesión si no coincide (ver shared/utils/menu-crypt.ts)
            const crypt = huellaMenu(menuJson);
            sessionStorage.setItem('crypt', crypt);

            this.menuService.loadMenu();

            resolve();
          } catch (e) {
            console.error('[AuthService] Error al procesar perfil:', e);
            Swal.fire({
              title: 'Error de Perfil',
              text: 'No se pudo cargar la configuración de su perfil.',
              icon: 'error',
            });
            sessionStorage.clear();
            localStorage.clear();
            reject(e);
          }
        },
        error: (error) => {
          console.error('[AuthService] Fallo conectando al perfil:', error);
          sessionStorage.clear();
          localStorage.clear();
          reject(error);
        },
      });
    });
  }

  /**
   * Cambiar contraseña
   */
  async cambiarContrasena(
    usuario: string,
    claveActual: string,
    nuevaClave: string,
  ): Promise<boolean> {
    const claveActualHash = await this.sha256.hash(claveActual);
    const nuevaClaveHash = await this.sha256.hash(nuevaClave);

    const xAPI = {
      funcion: environment.functions.ACTUALIZAR_CLAVE_USUARIO,
      parametros: `${usuario},${claveActualHash},${nuevaClaveHash}`,
    };

    return new Promise((resolve) => {
      this.apiService.Ejecutar(xAPI).subscribe({
        next: (data) => {
          console.log('[AuthService] Respuesta cambiarContrasena:', data);
          // La API puede devolver ModifiedCount, modifiedCount, n, o un mensaje
          const modified =
            data?.ModifiedCount ??
            data?.modifiedCount ??
            data?.n ??
            data?.matchedCount;

          const ok =
            typeof modified === 'number' && modified > 0
              ? true
              : data?.['resultado'] === true ||
                data?.['ok'] === true ||
                data?.modificado === true;

          if (ok) {
            Swal.fire({
              icon: 'success',
              title: 'Contraseña actualizada',
              timer: 2000,
              showConfirmButton: false,
            });
            this.clearSession();
            this.router.navigate(['/login']);
            resolve(true);
          } else {
            const msj = data?.msj || data?.msg || data?.mensaje || data?.error;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: typeof msj === 'string' && msj ? msj : 'No se pudo actualizar la contraseña. Verifique que la contraseña actual sea correcta.',
            });
            resolve(false);
          }
        },
        error: (error) => {
          console.error('[AuthService] Error cambiando contraseña:', error);
          const msj = error?.error?.msj || error?.error?.msg || error?.error?.mensaje;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: typeof msj === 'string' && msj ? msj : 'Error al cambiar la contraseña',
          });
          resolve(false);
        },
      });
    });
  }

  /**
   * Generar QR TOTP
   */
  generarTotpQr(): Observable<any> {
    return this.apiService.GenerarQR_TOTP('base64');
  }

  /**
   * Obtener imagen QR como base64
   */
  getImagenQr(secret: string): Observable<any> {
    return this.apiService.GetImageQR(secret);
  }

  /**
   * Actualiza (o limpia) el secreto TOTP vía `_SYS_UUserTOTP`.
   * Actuar: valor nuevo; desactivar: el secreto actual (como la consola) o ''.
   *
   * NOTA: el motor de funciones responde HTTP 200 incluso cuando la función
   * falla (tipo 77 = "la función no existe" / "error en la función"), así que
   * el cuerpo se inspecciona y el fallo se emite como error real.
   */
  actualizarTotp(secret: string): Observable<any> {
    const xAPI = {
      funcion: environment.functions.ACTUALIZAR_TOTP,
      parametros: secret,
    };
    return this.apiService.Ejecutar(xAPI).pipe(
      map((data) => {
        // Depuración: qué parámetro se mandó vs. qué hay en el JWT / sesión.
        const jwtToken = this.getUserDecrypt(sessionStorage.getItem('token') || '')
          ?.Usuario?.token;
        console.log('[TOTP] _SYS_UUserTOTP enviado →', {
          parametro: secret,
          jwt_token: jwtToken ?? '(vacío)',
        });
        console.log('[TOTP] _SYS_UUserTOTP respuesta →', data);
        const msj = this.mensajeErrorFuncion(data);
        if (msj) {
          throw new Error(msj);
        }
        return data;
      }),
    );
  }

  /**
   * Detecta errores que llegan con HTTP 200 por el motor de funciones `_SYS_*`.
   * Devuelve el mensaje del servidor, o '' si la respuesta es correcta.
   */
  private mensajeErrorFuncion(data: any): string {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return '';
    }

    const msj = typeof data['msj'] === 'string' ? data['msj'] : '';
    const tipo = typeof data['tipo'] === 'number' ? data['tipo'] : null;

    if (msj && /error|no exite|verifique|excedida/i.test(msj)) {
      return msj;
    }
    if (tipo !== null && tipo !== 1) {
      return msj || `El servidor reportó el código ${tipo}`;
    }
    return '';
  }

  /**
   * Consulta en BD el secreto TOTP realmente guardado del usuario actual.
   *
   * Fuente principal: `_SYS_CUserPanelLogin` (param = login) → fila del usuario
   * con el campo `token` (la misma que usa la consola en `user-list`).
   * Respaldo: `_SYS_CUsuarioPerfil` (aunque ese no expone `token`).
   *
   * Devuelve '' si quedó vacío, la cadena si existe y `null` si ninguna fuente
   * expone el campo (no verificable).
   */
  consultarSecretoTotp(): Observable<string | null> {
    const payload = this.getUserDecrypt(sessionStorage.getItem('token') || '');
    const u = payload?.Usuario as any;
    if (!u) {
      return of(null);
    }

    const extraer = (data: any, origen: string): string | null => {
      const fila = Array.isArray(data) ? data[0] : data;
      if (!fila || typeof fila !== 'object') {
        console.warn(`[TOTP] ${origen} sin registro:`, data);
        return null;
      }
      if (!('token' in fila)) {
        console.warn(
          `[TOTP] ${origen} no expone "token". Campos:`,
          Object.keys(fila),
        );
        return null;
      }
      return typeof fila.token === 'string' ? fila.token : null;
    };

    const porPerfil = (): Observable<string | null> => {
      const cadena = [u.cedula, u.sistema, u.correo].join(',');
      return this.apiService
        .Ejecutar({
          funcion: environment.functions.CONSULTAR_USUARIO_PERFIL,
          parametros: cadena,
        })
        .pipe(
          map((d) => extraer(d, '_SYS_CUsuarioPerfil')),
          catchError((e) => {
            console.warn('[TOTP] _SYS_CUsuarioPerfil falló:', e);
            return of(null);
          }),
        );
    };

    const login = u.usuario || u.login || '';
    if (!login) {
      return porPerfil();
    }

    return this.apiService
      .Ejecutar({
        funcion: environment.functions.CONSULTAR_LOGIN_USUARIO,
        parametros: login,
      })
      .pipe(
        switchMap((d) => {
          const r = extraer(d, '_SYS_CUserPanelLogin');
          return r !== null ? of(r) : porPerfil();
        }),
        catchError((e) => {
          console.warn('[TOTP] _SYS_CUserPanelLogin falló:', e);
          return porPerfil();
        }),
      );
  }

  /**
   * Orquesta el proceso de cierre de sesión completo, notificando el progreso.
   * Misma lógica que consola: server logout → limpiar sesión → redirigir
   */
  public async performLogoutProcess(
    progressCallback: (message: string) => void,
  ): Promise<void> {
    try {
      progressCallback('Cerrando conexiones en tiempo real...');
      await this.delay(300);

      progressCallback('Finalizando sesión en el servidor...');
      await this.delay(800);
      await this.serverLogout();
    } catch (error) {
      console.error('Error al contactar servidor para logout:', error);
      progressCallback('No se pudo contactar al servidor, limpiando localmente...');
      await this.delay(1000);
    } finally {
      progressCallback('Limpiando datos de la sesión...');
      await this.delay(800);
      this.clearSession();

      progressCallback('¡Hasta pronto!');
      await this.delay(1200);
      this.router.navigate(['/login']);
    }
  }

  /**
   * Ejecuta la API de cierre de sesión en el servidor (igual que consola).
   * POST a wusuario/logout:{userId} con Bearer token.
   */
  private async serverLogout(): Promise<void> {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const userId = this.getUserId();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }),
    };

    const url = environment.API + 'wusuario/logout:' + userId;
    await lastValueFrom(this.http.post(url, {}, httpOptions));
  }

  /**
   * Obtiene o genera el userId (uuidv4) guardado en localStorage.
   * Misma lógica que UtilService.uuidv4() en consola.
   */
  getUserId(): string {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      localStorage.setItem('userId', id);
    }
    return id;
  }

  /**
   * Confirmar logout con SweetAlert y navegar a /logout
   * (alias de logout para compatibilidad con dashboard)
   */
  logout(): void {
    this.confirmLogout();
  }

  /**
   * Confirmar logout con SweetAlert y navegar a /logout
   */
  confirmLogout(): void {
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      text: 'Gracias por su tiempo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/logout']);
      }
    });
  }

  /**
   * Limpiar sesión
   */
  clearSession(): void {
    this.currentUser.set(null);
    this.tempAuthToken = '';
    this.menuService.clearMenu();
    sessionStorage.clear();
    localStorage.clear();
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
