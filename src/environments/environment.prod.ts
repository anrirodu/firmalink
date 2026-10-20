export const environment = {
  production: true,
  Url: 'https://localhost',
  API: '/v1/api/',
  // Rutas anónimas de Sandra: `/v1/xapi/` (sin JWT; integridad HMAC por el
  // interceptor) y `/devel/api/` (sin JWT, superficie de desarrollo montada
  // siempre: fnx, crud, ccoleccion). El flujo de recuperación de contraseña
  // pre-autenticación vive exclusivamente sobre estas dos bases.
  XAPI: '/v1/xapi/',
  DEVEL: '/devel/api/',
  ID: 'firmalink',
  Hash: ':cdd2b41298c1bf1108de6df5eca512ec.sse',
  version: 'FirmaLink 1.0.0',
  fecha: '2026-08-25',
  buildDate: '20/10/2026 02:25:13 p. m.',
  functions: {
    CONSULTAR_USUARIO_PERFIL: '_SYS_CUsuarioPerfil',
    CONSULTAR_LOGIN_USUARIO: '_SYS_CUserPanelLogin',
    // Consulta apicore por `usuario.correo` (recuperación de contraseña):
    // devuelve únicamente `login` y `correo`.
    CONSULTAR_USUARIO_POR_CORREO: '_SYS_CFirmaLinkUsuarioPorCorreo',
    ACTUALIZAR_CLAVE_USUARIO: '_SYS_UUserPanel',
    ACTUALIZAR_TOTP: '_SYS_UUserTOTP',
    // Función nativa `email.enviar` (model.RegisterNativa) invocada vía
    // /devel/api/fnx; requiere su documento en la colección Mongo `sys-function`.
    ENVIAR_CORREO_FNX: 'email.enviar',
    CONSULTAR_ACUERDOS: '_SYS_CFirmaLinkAcuerdos',
    CONSULTAR_ACUERDOS_CLIENTE: '_SYS_CFirmaLinkAcuerdosCliente',
    CONSULTAR_ACUERDO: '_SYS_CFirmaLinkAcuerdo',
    CONSULTAR_CLIENTES: '_SYS_CFirmaLinkClientes',
    CONSULTAR_CLIENTE: '_SYS_CFirmaLinkCliente',
    CONSULTAR_FACTURAS: '_SYS_CFirmaLinkFacturas',
    CONSULTAR_FACTURAS_CLIENTE: '_SYS_CFirmaLinkFacturasCliente',
    CONSULTAR_FACTURA: '_SYS_CFirmaLinkFactura',
    CONSULTAR_PRESUPUESTOS: '_SYS_CFirmaLinkPresupuestos',
    CONSULTAR_PRESUPUESTOS_CLIENTE: '_SYS_CFirmaLinkPresupuestosCliente',
    CONSULTAR_PRESUPUESTO: '_SYS_CFirmaLinkPresupuesto',
    CONSULTAR_CALCULOS: '_SYS_CFirmaLinkCalculos',
    CONSULTAR_CALCULO: '_SYS_CFirmaLinkCalculo',
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
    CLIENTE: 'firmalink_clientes',
    FACTURA: 'firmalink_facturas',
    PRESUPUESTO: 'firmalink_presupuestos',
    CALCULO: 'firmalink_calculos',
    // Usuario base de FirmaLink (campo `correo` validado en la recuperación)
    USUARIO: 'usuario',
    // Tokens de recuperación de contraseña (un documento vigente por login)
    PASSWORD_RESET: 'firmalink_password_resets',
  },
};
