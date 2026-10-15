export const environment = {
  production: false,
  Url: 'https://localhost',
  API: '/v1/api/',
  ID: 'firmalink',
  Hash: ':cdd2b41298c1bf1108de6df5eca512ec.sse',
  version: 'FirmaLink 1.0.0',
  fecha: '2026-08-25',
  buildDate: 'Development',
  functions: {
    CONSULTAR_USUARIO_PERFIL: '_SYS_CUsuarioPerfil',
    CONSULTAR_LOGIN_USUARIO: '_SYS_CUserPanelLogin',
    ACTUALIZAR_CLAVE_USUARIO: '_SYS_UUserPanel',
    ACTUALIZAR_TOTP: '_SYS_UUserTOTP',
    CONSULTAR_ACUERDOS: '_SYS_CFirmaLinkAcuerdos',
    CONSULTAR_ACUERDO: '_SYS_CFirmaLinkAcuerdo',
  },
  driver: {
    // ID de la conexión registrada en `sys-drivers` (MGDBA → MongoDB local / BD code-epic).
    // No usar el tipo de driver ("mongodb"): el backend resuelve la conexión por su ID.
    PRINCIPAL: 'MGDBA',
    DATA_BASE: 'code-epic',
  },
  colecciones: {
    USER_TASK: 'user_tasks',
    ACUERDO: 'firmalink_acuerdos',
  },
};
