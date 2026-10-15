export interface IToken {
  token: string;
}

export interface TokenPayload {
  Usuario: UsuarioToken;
  exp?: number;
  iat?: number;
}

export interface UsuarioToken {
  usuario: string;
  nombre: string;
  cedula: string;
  sistema: string;
  correo: string;
  token?: string; // TOTP secret si está activo
  Perfil?: Perfil;
  Aplicacion?: Aplicacion[];
  FirmaDigital?: FirmaDigital;
}

export interface FirmaDigital {
  duracion?: string | number;
}

export interface Perfil {
  descripcion: string;
}

export interface Aplicacion {
  id: string;
  nombre: string;
  url: string;
  comentario: string;
  version: string;
  autor: string;
  Rol: Rol;
}

export interface Rol {
  descripcion: string;
  Menu: Menu[];
}

export interface Menu {
  url: string;
  js: string;
  icono: string;
  descripcion: string;
  nombre: string;
  accion: string;
  clase: string;
  color: string;
  Privilegio?: any[];
  SubMenu?: Menu[];
  Privilegios?: Privilegio[];
}

export interface Privilegio {
  metodo: string;
  descripcion: string;
  accion: string;
  directivas: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  cedula: string;
  sistema: string;
  avatar?: string;
  totpActive?: boolean;
}
