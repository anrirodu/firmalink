# FirmaLink — Sistema de Gestión de Acuerdos

Sistema web para la **redacción, revisión, firma, resguardo y envío** de acuerdos institucionales.
Permite crear acuerdos con numeración correlativa y año de ejercicio, componer su contenido en un
editor de documento con márgenes regulables, generar una **huella de integridad SHA-256**, controlar
el **ciclo de vida del documento** (borrador → revisión → firmado → anulado) y remitirlo al
interesado por correo electrónico.

---

## Tabla de contenido

1. [Características principales](#características-principales)
2. [Módulos y pantallas](#módulos-y-pantallas)
3. [Stack tecnológico](#stack-tecnológico)
4. [Arquitectura del proyecto](#arquitectura-del-proyecto)
5. [Requisitos previos](#requisitos-previos)
6. [Instalación y ejecución](#instalación-y-ejecución)
7. [Scripts disponibles](#scripts-disponibles)
8. [Configuración](#configuración)
9. [Integración con el backend (Sandra Server)](#integración-con-el-backend-sandra-server)
10. [Seguridad](#seguridad)
11. [Reglas de negocio — Acuerdos](#reglas-de-negocio--acuerdos)
12. [Reglas de negocio — Clientes](#reglas-de-negocio--clientes)
13. [Reglas de negocio — Facturación](#reglas-de-negocio--facturación)
14. [Reglas de negocio — Presupuestos](#reglas-de-negocio--presupuestos)
15. [Impresión y exportación](#impresión-y-exportación)
16. [Envío por correo](#envío-por-correo)
17. [Tema visual y branding](#tema-visual-y-branding)
18. [Integración con contenedor de escritorio](#integración-con-contenedor-de-escritorio)
19. [Convenciones de desarrollo](#convenciones-de-desarrollo)
20. [Créditos](#créditos)

---

## Características principales

- **Gestión integral de acuerdos**: alta, edición, consulta, cambio de estado y anulación.
- **Numeración correlativa automática** con formato `PREFIJO + consecutivo (3 dígitos) + año`
  (p. ej. `CJS001-2026`), usando el **año del acuerdo** y no el del reloj, para poder preparar
  ejercicios siguientes sin romper la numeración del año en curso.
- **Editor de documento** con contenido enriquecido, márgenes configurables (presets e introducción
  manual), plantillas de texto y vista de hoja tamaño carta.
- **Hoja a ancho completo**: la vista se auto-escala con un `ResizeObserver` para llenar todo el
  ancho disponible en cualquier pantalla, sin dejar huecos ni provocar scroll horizontal. El
  instrumento se redacta directamente sobre la hoja.
- **Barra de identificación** con el prefijo, el código del acuerdo y la huella SHA-256, fuera de la
  hoja, más los botones **Limpiar hoja** (documento en blanco, conserva el código) y **Por defecto**
  (recarga el modelo del instrumento).
- **Bloqueo del documento tras la firma**: un acuerdo firmado o anulado queda cerrado; su contenido y
  su huella no pueden volver a modificarse (control aplicado en UI y en el servicio).
- **Transiciones de estado validadas** en la interfaz y en la capa de datos.
- **Huella de integridad SHA-256** del documento, verificada contra `shasum -a 256`.
- **Envío por correo** del acuerdo (HTML + texto plano) con validación de destinatarios, Para/CC y
  nota personalizada, e informe de errores del proveedor.
- **Listado con KPIs** (indicadores por estado: total, borradores, en revisión, firmados y
  anulados), orden, paginación, búsqueda y filtros.
- **Eliminación del listado con borrado lógico**: el menú de acciones de cada fila ofrece
  *Eliminar*; el registro se actualiza con el estado `eliminado` y deja de aparecer en el listado y
  en los indicadores, pero se conserva en la base de datos para la trazabilidad (el endpoint
  `ccoleccion` solo admite Insert/Upsert, no borrados físicos). Un acuerdo **firmado no se elimina
  nunca** —su contenido y su huella son definitivos— y en su lugar puede anularse. El código de un
  acuerdo eliminado no se reutiliza.
- **Registro de clientes** por categoría legal (V, E, J, G, diplomáticos y comunales) con su condición
  ante el SENIAT, validación del **RIF por módulo 11** y detección de documentos repetidos.
- **Listado de clientes con KPIs por categoría** que también filtran, búsqueda por nombre/documento y
  ficha completa en un modal por pestañas.
- **Facturación digital** sobre la hoja autorizada de 21,7 × 28 cm, con vista previa en vivo, el
  formato de la plantilla (cabecera, renglones, totales e importe en letras, firma y sello) y el
  trato fiscal del cliente: exención de IVA, IGTF de divisas y retenciones de IVA e ISLR.
- **Presupuestos** (documento comercial, **no fiscal**) sobre la misma hoja de 21,7 × 28 cm, con
  condiciones comerciales, validez que vence sola (`vencido`) y el ciclo
  borrador → enviado → aprobado/rechazado → anulado, con la respuesta del cliente registrada.
- **Autenticación** por JWT con interceptor de firma **HMAC**, guardas de ruta y cierre de sesión por
  inactividad.
- **Tema claro / oscuro** persistente.
- **Mensajería unificada** con SweetAlert2 (sin diálogos nativos del navegador).
- **Integración con contenedor de escritorio** (Tauri/Electron) vía `postMessage`.

---

## Módulos y pantallas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/login` | `auth/login` | Inicio de sesión |
| `/dashboard` | `dashboard` | Panel principal |
| `/hiring` | `pages/hiring` | Gestión de contrataciones |
| `/agreements/list-agreement` | `pages/agreements/list-agreement` | Listado de acuerdos (KPIs, filtros, orden, paginación y menú de acciones) |
| `/agreements/new-agreement` | `pages/agreements/new-agreement` | Editor de acuerdo (alta y edición) |
| `/customers` | `pages/customers` | Clientes: listado con KPIs por categoría, filtros y ficha completa en modal |
| `/billing` | `pages/billing/list-billing` | Listado de facturas generadas: KPIs, filtros, emisión/anulación, huella SHA-256 y envío por correo en PDF |
| `/billing/new` | `pages/billing` | Editor de la factura: vista previa en vivo de la hoja 21,7 × 28 cm (alta y consulta) |
| `/budgets` | `pages/budgets/list-budgets` | Listado de presupuestos: KPIs (cotizado, por vencer, vencidos), filtros, ciclo de vida (enviar/aprobar/rechazar/anular), huella SHA-256 y envío por correo en PDF |
| `/budgets/new` | `pages/budgets` | Editor del presupuesto: vista previa en vivo de la hoja 21,7 × 28 cm, condiciones comerciales y validez (nuevo y consulta) |
| `/change-password` | `pages/cambiar-contrasena` | Cambio de contraseña |
| `/error` | `pages/miscellaneous/error` | Página de error |
| `/not-authorized` | `pages/miscellaneous/not-authorized` | Acceso no autorizado |
| `/maintenance` | `pages/miscellaneous/maintenance` | Mantenimiento |
| `/logout` | `pages/miscellaneous/logout` | Cierre de sesión |
| `**` | redirección | Ruta comodín → página de error |

El árbol de navegación (sidebar) **no está codificado en el frontend**: se obtiene del **backend**
según el rol del usuario autenticado (ver [Menú dinámico](#menú-dinámico)).

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | **Angular 22** (componentes *standalone*, `loadComponent` con lazy loading) |
| Lenguaje | TypeScript ~6.0 |
| UI | **Angular Material 22** + **Bootstrap 5.3** + Popper |
| Tablas | DataTables 3 (`datatables.net-bs5`) |
| Notificaciones | SweetAlert2 11 |
| Estado reactivo | Angular Signals |
| Gestor de paquetes | **bun 1.2.10** (declarado en `packageManager`) |
| Formato | Prettier |
| Backend | **Sandra Server** (Go) vía REST `/v1/api` |
| Base de datos | MongoDB (`driver MGDBA`, base `code-epic`) |

---

## Arquitectura del proyecto

```
firmalink/
├── public/
│   └── assets/images/          # logo.png/webp, isotipo.png/webp, app-store.svg, play-store.svg
├── src/
│   ├── environments/
│   │   ├── environment.ts          # Configuración de desarrollo
│   │   └── environment.prod.ts     # Configuración de producción (buildDate auto)
│   ├── app/
│   │   ├── auth/                   # Autenticación
│   │   │   ├── guards/             # authGuard, auth-guard
│   │   │   ├── interfaces/         # Tipos de sesión/usuario
│   │   │   ├── login/              # Pantalla de login
│   │   │   └── services/           # AuthService
│   │   ├── dashboard/              # Panel principal
│   │   ├── layout/app-layout/      # Shell: sidebar + topbar + footer
│   │   ├── pages/
│   │   │   ├── agreements/
│   │   │   │   ├── list-agreement/       # Listado + menú de acciones
│   │   │   │   └── new-agreement/        # Editor de acuerdo
│   │   │   │       ├── acuerdo.model.ts        # Modelo, numeración y reglas de estado
│   │   │   │       ├── acuerdo.service.ts      # Persistencia y traspaso listado↔editor
│   │   │   │       ├── acuerdo-correo.ts       # Construcción del cuerpo del correo
│   │   │   │       ├── enviar-correo.dialog.ts # Diálogo de destinatarios
│   │   │   │       └── new-agreement.impresion.ts # Documento para impresión
│   │   │   ├── cambiar-contrasena/
│   │   │   ├── customers/          # Clientes
│   │   │   │   ├── cliente.model.ts                  # Modelo, categorías, RIF (módulo 11) y validación
│   │   │   │   ├── cliente.service.ts                # Persistencia y detección de documentos repetidos
│   │   │   │   ├── customers.component.*             # Listado (KPIs, filtros, acciones)
│   │   │   │   ├── salir-de-clientes.guard.ts        # Confirmación al salir con una ficha abierta
│   │   │   │   └── customer-form/                    # Ficha del cliente (modal por pestañas)
│   │   │   ├── hiring/             # Contrataciones
│   │   │   └── miscellaneous/      # error, logout, maintenance, not-authorized
│   │   ├── shared/
│   │   │   ├── components/isotipo-animado/  # Logo animado reutilizable
│   │   │   ├── guards/cambios-sin-guardar.guard.ts
│   │   │   ├── interceptors/       # auth (HMAC), token, zone
│   │   │   ├── services/           # api, correo, idle, loading-screen, menu,
│   │   │   │                       # notificacion, theme
│   │   │   └── utils/              # escapar-html.ts, sha256.service.ts
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.ts                  # Componente raíz
│   ├── index.html                  # Pantalla de carga + puente con el escritorio
│   ├── main.ts
│   ├── proxy.conf.json             # Proxy de desarrollo hacia el backend
│   └── styles.scss                 # Tema global (claro/oscuro)
├── angular.json
├── package.json
├── tsconfig.json
└── update-build-date.js            # Inyecta la fecha de build (zona America/Caracas)
```

### Servicios compartidos (`src/app/shared/services`)

| Servicio | Responsabilidad |
|----------|-----------------|
| `api.service.ts` | Cliente REST contra `/v1/api` (`crud:` y `ccoleccion`) |
| `correo.service.ts` | Envío de correos y traducción de errores del proveedor |
| `menu.service.ts` | Obtención/procesamiento del menú del usuario |
| `notificacion.service.ts` | Mensajería unificada (SweetAlert2): éxito, aviso, error, confirmación |
| `idle.service.ts` | Detección de inactividad / cierre de sesión |
| `loading-screen.service.ts` | Control de la pantalla de carga |
| `theme.service.ts` | Tema claro/oscuro con persistencia en `localStorage` |

### Interceptores

| Interceptor | Función |
|-------------|---------|
| `token.interceptor.ts` | Adjunta el token de sesión (`Authorization`) |
| `auth.interceptor.ts` | Firma **HMAC** de peticiones con cuerpo (`Web-API-key`, `X-Signature`, `X-Timestamp`) |
| `zone.interceptor.ts` | Ajustes de zona/rendimiento |

---

## Requisitos previos

- **Node.js** ≥ 20 (probado con v22)
- **bun** 1.2.10 (gestor declarado; también funciona `npm`)
- Backend **Sandra Server** accesible en `https://localhost` (o el host configurado)
- MongoDB con la base `xxxxxxx`

---

## Instalación y ejecución

```bash
# 1. Dependencias
bun install
# o: npm install

# 2. Desarrollo
npm run start
# → ng serve --host 0.0.0.0 --port 4210

# 3. Compilación a producción
npm run build:prod
# → node update-build-date.js && ng build --configuration production
```

La aplicación de desarrollo queda disponible en **http://localhost:4210**.

> **Importante:** al compilar se ejecuta `update-build-date.js`, que escribe la fecha/hora de
> compilación (zona `America/Caracas`) en `environment.prod.ts`. Es un efecto esperado; no lo reviertas.

Si el build debe ejecutarse con una versión concreta de Node distinta a la del `PATH`:

```bash
PATH="$HOME/.nvm/versions/node/vXX.XX.X/bin:$PATH" npx ng build --configuration production
```

---

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `start` | `ng serve --host 0.0.0.0 --port 4210` | Servidor de desarrollo (puerto **4210**) |
| `build` | `node update-build-date.js && ng build` | Build de desarrollo |
| `build:prod` | `node update-build-date.js && ng build --configuration production` | Build de producción |
| `update-build-date` | `node update-build-date.js` | Actualiza únicamente la fecha de build |
| `watch` | `ng build --watch --configuration development` | Build incremental |
| `test` | `ng test` | Pruebas unitarias |

> **Nota:** el `angular.json` actual **no define un target `test`**, por lo que `npm test` no
> ejecuta pruebas todavía. La verificación en este proyecto se ha hecho con scripts puntuales y
> pruebas end-to-end contra el backend.

---

## Configuración

### `src/environments/environment.ts` / `environment.prod.ts`

| Clave | Valor | Descripción |
|-------|-------|-------------|
| `production` | `false` / `true` | Modo |
| `Url` | `https://localhost` | Origen del backend |
| `API` | `/v1/api/` | Prefijo del API REST |
| `ID` | `xxxxxxxxxx` | Identificador de aplicación |
| `Hash` | `:xxxxxxxxxxxxxxx.sse` | Hash de ruta usado por el backend |
| `version` | `xxxxxxxx 1.0.0` | Versión mostrada |
| `buildDate` | auto (prod) | Fecha/hora de compilación |
| `driver.PRINCIPAL` | `MGDBA` | **ID de conexión** registrado en `sys-drivers` |
| `driver.DATA_BASE` | `xxxxxxxx` | Base de datos |
| `colecciones.ACUERDO` | `xxxxxxxx` | Colección de acuerdos |
| `colecciones.CLIENTE` | `xxxxxxxx` | Colección de clientes |
| `colecciones.FACTURA` | `firmalink_facturas` | Colección de facturas |
| `colecciones.USER_TASK` | `xxxxxxx` | Tareas de usuario |

> **Atención:** en `driver.PRINCIPAL` debe ir el **ID de la conexión** (`MGDBA`), **no** el tipo de
> driver (`mongodb`). El backend resuelve la conexión por su ID.

### Funciones `apicore` (backend)

| Clave | Función | Uso |
|-------|---------|-----|
| `CONSULTAR_USUARIO_PERFIL` | `_SYS_CUsuarioPerfil` | Perfil del usuario |
| `CONSULTAR_LOGIN_USUARIO` | `_SYS_CUserPanelLogin` | Inicio de sesión |
| `ACTUALIZAR_CLAVE_USUARIO` | `_SYS_UUserPanel` | Cambio de contraseña |
| `ACTUALIZAR_TOTP` | `_SYS_UUserTOTP` | Actualización de TOTP |
| `CONSULTAR_ACUERDOS` | `_SYS_CFirmaLinkAcuerdos` | Listado liviano de acuerdos |
| `CONSULTAR_ACUERDOS_CLIENTE` | `_SYS_CFirmaLinkAcuerdosCliente` | Acuerdos de un cliente (`cliente.codigo`) |
| `CONSULTAR_ACUERDO` | `_SYS_CFirmaLinkAcuerdo` | Detalle completo de un acuerdo |
| `CONSULTAR_CLIENTES` | `_SYS_CFirmaLinkClientes` | Listado liviano de clientes |
| `CONSULTAR_CLIENTE` | `_SYS_CFirmaLinkCliente` | Detalle completo de un cliente |
| `CONSULTAR_FACTURAS` | `_SYS_CFirmaLinkFacturas` | Listado de facturas (renglones, totales y copia del cliente) |
| `CONSULTAR_FACTURAS_CLIENTE` | `_SYS_CFirmaLinkFacturasCliente` | Facturas de un cliente (`cliente.codigo`) |
| `CONSULTAR_FACTURA` | `_SYS_CFirmaLinkFactura` | Detalle completo de una factura (`codigo`) |
| `CONSULTAR_PRESUPUESTOS` | `_SYS_CFirmaLinkPresupuestos` | Listado liviano de presupuestos (totales, condiciones y copia del cliente, sin renglones) |
| `CONSULTAR_PRESUPUESTOS_CLIENTE` | `_SYS_CFirmaLinkPresupuestosCliente` | Presupuestos de un cliente (`cliente.codigo`) |
| `CONSULTAR_PRESUPUESTO` | `_SYS_CFirmaLinkPresupuesto` | Detalle completo de un presupuesto (`codigo`) |

> Las tres funciones viven en la colección `apicore` de la base del sistema, con `driver: firmalink`,
> `metodo: CONSULTAR`, `tipo: CONSULTA` y `estatus: true`. El servidor las resuelve con un `FindOne`
> sobre `apicore` en **cada** petición (`core/model/relacional.go`, `leerValores`), así que darlas de
> alta o editarlas **no exige reiniciar**: basta con que el usuario vuelva a entrar para que el listado
> las vea. Los datos, en cambio, van a la base `firmalink` (driver `firmalink` →
> `basedatos: firmalink` en `sys-drivers`), no a la del sistema. Ver
> [Reglas de negocio — Presupuestos](#reglas-de-negocio--presupuestos) y
> [Menú dinámico](#menú-dinámico).

### Proxy de desarrollo (`src/proxy.conf.json`)

Redirige `/v1/api` y `/devel/api` hacia el backend (`https://localhost`, certificado autofirmado:
`secure: false`), evitando problemas de CORS en desarrollo.

---

## Integración con el backend (Sandra Server)

Toda la comunicación pasa por `ApiService` (`src/app/shared/services/api.service.ts`).

### Ejecución de funciones

```
POST {Url}{API}crud:{Hash}
Content-Type: application/json

{ "funcion": "_SYS_CFirmaLinkAcuerdo", "parametros": "\"CJS001-2026\"" }
```

- `parametros` es una **cadena separada por comas** que sustituye `$0`, `$1`, … en la consulta
  definida en el backend.
- Para las funciones `apicore` de acuerdos y clientes, el `query` tiene el formato
  `"<filtro>;<proyeccion>"` — **el `;` es obligatorio** (p. ej. `{"codigo":"$0"};{"_id":0}`).
- Un error de la función se devuelve con **HTTP 200** y cuerpo `{"msj":"Error en la funcion","tipo":77,…}`.
  No basta con comprobar `res.ok`.
- Petición sin token válido → **HTTP 403** `{"msj":"El token no es valido","tipo":5}`.

### Operaciones sobre colecciones

```
POST {Url}{API}ccoleccion

{
  "coleccion": "firmalink_acuerdos",
  "objeto":    { "estado": "firmado", "actualizadoEn": "…" },
  "donde":     "{\"codigo\":\"CJS001-2026\"}",
  "driver":    "MGDBA",
  "upsert":    true
}
```

> **Actualizaciones parciales:** usar `upsert: true` (el backend ejecuta un `UpdateOne` con `$set`
> parcial). Con `upsert: false` el backend realiza un *insert*, no una actualización.

### Menú dinámico

El menú lateral proviene del backend, desde el documento del usuario (`Aplicacion[].Rol.Menu`).
El frontend no define permisos; se limita a renderizar lo que el backend entrega y a navegar por
`url` (comparando `router.url` con `'/' + url`).

---

## Seguridad

- **JWT** en cada petición autenticada (`Authorization`).
- **Firma HMAC** (`auth.interceptor.ts`) en métodos `POST`/`PUT`/`DELETE` que llevan cuerpo,
  mediante las cabeceras `Web-API-key`, `X-Signature` y `X-Timestamp`. Los `GET` o peticiones sin
  cuerpo solo envían `Authorization`. La cabecera `X-Skip-Interceptor` permite omitir la firma.
- **Control de acceso por menú** (`auth-guard.guard.ts` + `shared/utils/menu-crypt.ts`): el guard
  exige token válido y que la **ruta exacta** de la pantalla esté declarada en el menú del usuario
  (`sessionStorage['menu']`), comparando también la huella (`sessionStorage['crypt']`). Si el menú no
  coincide con su huella, la sesión se cierra con aviso; si la ruta no está en el menú, se va a
  `/not-authorized`. Se registra como `canActivate` **y** `canActivateChild` sobre la ruta del layout:
  `canActivate` solo corre al activar el layout (entrada o recarga), y como el sidebar navega con
  `router.navigate`, sin `canActivateChild` una navegación entre pantallas no pasaría por el guard.
  Rutas libres (no dependen del menú): `/login`, `/dashboard`, `/change-password`.
- **Guarda `cambiosSinGuardarGuard`**: evita salir del editor con cambios sin guardar.
- **Guarda `salirDeClientesGuard`**: pide confirmación al salir de `/customers` si la ficha de un
  cliente tiene cambios sin guardar. A diferencia del editor, no respalda un borrador local: la ficha
  contiene datos personales (cédula, teléfonos, domicilio) y no se persiste en el navegador.
- **Cierre por inactividad** (`idle.service.ts`).
- **Integridad del documento** con huella **SHA-256** (`sha256.service.ts`), verificada contra
  `shasum -a 256`.
- **Política de diálogos**: no se usan `alert()`, `confirm()` ni `prompt()` nativos; todo mensaje se
  canaliza por `NotificacionService` (SweetAlert2).

---

## Reglas de negocio — Acuerdos

### Estados

| Estado | Editable | Transiciones permitidas |
|--------|:--------:|-------------------------|
| `borrador` | ✅ | `borrador`, `en_revision`, `firmado`, `anulado` |
| `en_revision` | ✅ | `borrador`, `en_revision`, `firmado`, `anulado` |
| `firmado` | ❌ | `anulado` |
| `anulado` | ❌ | — (terminal) |

- Un acuerdo **`firmado`** es un instrumento cerrado: su contenido y su huella SHA-256 no pueden
  volver a modificarse.
- Un acuerdo **`anulado`** es un estado **terminal**.
- Las transiciones se validan en **dos capas**: en la interfaz (opciones deshabilitadas y reversión
  con aviso) y en `AcuerdoService.cambiarEstado()` antes de persistir.
- Al abrir un acuerdo bloqueado, el editor entra en **solo lectura** y muestra el motivo del bloqueo.

### Numeración

- Formato: `PREFIJO` + consecutivo de 3 dígitos + `-` + año → `CJS001-2026`.
- El consecutivo se calcula a partir de los acuerdos existentes del **año del acuerdo**, no del año
  en curso.
- `extraerConsecutivo()` admite códigos de 3 o más dígitos y tolera códigos sin sufijo de año.

### Modelo de datos (`Acuerdo`)

```ts
interface Acuerdo {
  codigo: string;            // CJS001-2026
  prefijo: string;           // CJS
  anio: number;
  titulo: string;
  proyecto: string;
  area: string;
  gerente: string;
  cedula: string;
  cedulaFirma: string;
  representante: string;
  vigencia: string;
  ciudad: string;
  fechaFirma: string;
  honorario: string;
  quincena: string;
  cliente: ClienteDocumento | null; // copia del cliente al suscribir (ver abajo)
  campos: Record<string, string>;
  documentoHtml: string;     // contenido del documento
  documentoTexto: string;    // versión texto plano (correo/búsqueda)
  margen: { sup: number; inf: number; izq: number; der: number };
  estado: 'borrador' | 'en_revision' | 'firmado' | 'anulado';
  hashDocumento: string;     // SHA-256
  hashAlgoritmo: 'SHA-256';
  creadoPorCedula?: string;
  creadoPorNombre?: string;
  creadoEn?: string | Date;
  actualizadoEn?: string | Date;
}
```

> La huella SHA-256 se calcula sobre el contenido del documento; el **estado no forma parte** del
> hash, por lo que cambiar de estado no invalida la huella.

### Cliente del documento

Cada acuerdo —y cada factura— guarda una **copia del cliente**: además de la copia, `codigo` es el
vínculo con la ficha. La copia es la verdad documental: lo que dice el instrumento firmado no cambia
porque el cliente cambie de domicilio o de condición fiscal después.

El tipo vive en `pages/customers/cliente.model.ts` (`ClienteDocumento`, con `snapshotCliente()` y
`direccionEnLinea()`), porque lo comparten el acuerdo y la factura.

```ts
interface ClienteDocumento {
  codigo: string;                    // vínculo con la ficha (CLI000001)
  categoria: CategoriaCliente;       // V · E · J · G
  identificacion: string;            // V-11350296
  rif: string;                       // V-11350296-3
  nombre: string;                    // nombre completo al suscribir
  condicionFiscal: CondicionFiscal;  // ordinario · formal · especial…
  agenteRetencionIva: boolean;
  porcentajeRetencionIva: number;
  agenteRetencionIslr: boolean;
  exentoIgtf: boolean;
  correo: string;
  telefono: string;
  direccion: string;                 // domicilio fiscal en una línea
  copiadoEn: string;                 // ISO de la copia
}
```

| Aspecto | Comportamiento |
|---------|----------------|
| Obligatoriedad | Un acuerdo **nuevo** no se guarda sin cliente. Los acuerdos anteriores al vínculo se abren y guardan como "Sin cliente" |
| Copia vs. ficha | El documento se redacta con la copia. La acción *Actualizar datos del cliente* relee la ficha (solo en borradores/en revisión) |
| Campos del documento | El bloque **DATOS DEL CLIENTE** se llena con los campos `clienteNombre`, `clienteIdentificacion`, `clienteRif` y `clienteDireccion` |
| Borrado del cliente | El borrado es lógico: los acuerdos ya emitidos conservan su copia |
| Acuerdos de un cliente | La acción *Ver acuerdos del cliente* abre el listado acotado a él; el código viaja en el estado de navegación (no en la URL) y la consulta la resuelve `_SYS_CFirmaLinkAcuerdosCliente` |
| Facturas del cliente | La misma copia viaja a la factura: de ella salen el RIF, el domicilio y el trato fiscal del documento |

---

## Reglas de negocio — Clientes

### Categorías

La categoría determina los datos que se capturan y el tipo de documento admitido:

| Categoría | RIF / documento | Descripción |
|-----------|-----------------|-------------|
| `V` | `V` | Persona natural venezolana (cédula) |
| `E` | `E`, `P` | Persona natural extranjera (cédula E o pasaporte) |
| `J` | `J` | Persona jurídica (RIF J) |
| `G` | `G` | Gobierno / ente público |
| `D` | `G`, `J`, `E`, `P` | Misión diplomática, organismo internacional o funcionario acreditado |
| `C` | `C` | Organización del Poder Popular (consejo comunal, comuna) |

- `identificacion` es la **clave única de identidad**: `V-12345678`, `J-00012345`, `P-AB123456`.
  `rif` es el RIF completo con dígito verificador (`J-12345678-9`); queda vacío en pasaportes.
- El **RIF** se valida con el **módulo 11** del SENIAT (pesos `3,2,7,6,5,4,3,2`; la letra vale ×4).
  El dígito de `C` es ambiguo entre fuentes (12 o 24), por lo que se aceptan **ambos** candidatos.
- Al pegar un documento completo (`J-12345678-9`) en el campo de número, se reparte en **tipo,
  número y dígito**, y se ajusta la categoría si el tipo no corresponde a la seleccionada.

### Condición ante el SENIAT

| Condición | Tratamiento por defecto |
|-----------|-------------------------|
| `especial` | Contribuyente especial: **agente de retención de IVA** (75 % general, 100 % en los supuestos del art. 5 de la PA SNAT/2025/000054) |
| `ordinario` | Declarante regular de IVA, sin retención por defecto |
| `formal` | Solo deberes formales del IVA |
| `exento` | No paga ciertos tributos por ley; exige **base legal** |
| `exonerado` | Dispensado por decreto, con **vigencia**; exige base legal |
| `no_contribuyente` | Consumidor final: se factura con cédula o pasaporte |

`tratamientoFiscal()` (en `cliente.model.ts`) deriva de estos datos las líneas de retención que ve el
usuario. Notas:

- **IVA**: no se retiene a proveedores formales, exentos ni exonerados.
- **ISLR**: se advierte la obligación cuando el cliente es agente de retención (Decreto 1.808).
- **IGTF (3 %)**: los entes públicos están exentos en cualquier moneda; las **misiones diplomáticas
  solo en bolívares**, por lo que `D` **no** se marca exento de IGTF por defecto.

### Numeración

- Formato `CLI-` + consecutivo de 6 dígitos → `CLI-000001`.
- El consecutivo se calcula sobre **todos** los clientes, **incluidos los eliminados** (un código no se
  reutiliza).
- El alta filtra el `upsert` por `{codigo, identificacion}` y **reintenta** (hasta 3 veces) si otro
  usuario tomó ese código: el índice único de `codigo` rechaza la inserción en lugar de sobrescribir
  al cliente ajeno.

### Borrado lógico e integridad

- `ccoleccion` no admite borrados físicos: **Eliminar** marca `estado: 'eliminado'` y `eliminado: true`
  (el registro se conserva para trazabilidad). La ficha del formulario permite **restaurar** un cliente
  eliminado cuando se vuelve a registrar su documento.
- La colección `firmalink_clientes` lleva índices **únicos** en `codigo` e `identificacion` (esta
  última parcial, solo para valores no vacíos), de modo que la unicidad se garantiza también en la
  base de datos y no solo en la interfaz.
- Si Mongo rechaza la operación, Sandra responde `null` con **HTTP 200**: el servicio lo interpreta como
  fallo (`ClienteDuplicadoError` o reintento), no como éxito.
- La función de listado devuelve una **proyección liviana**; la ficha completa se relee con
  `_SYS_CFirmaLinkCliente` antes de editar, para no vaciar en el servidor los campos no proyectados.

---

## Reglas de negocio — Facturación

La facturación tiene dos pantallas: el **listado** (`/billing`, `ListBillingComponent`) y el **editor**
(`/billing/new`, `BillingComponent`). En el editor, a la izquierda los datos y a la derecha **la hoja
tal como se imprime**. Vista previa, documento impreso, PDF y correo salen de la **misma función**
(`construirHojaFactura()`), así que no pueden divergir. El listado es una proyección liviana: las
acciones que necesitan el documento completo (imprimir, enviar, emitir) releen la factura con
`obtener(codigo)` antes de actuar.

### La hoja

| Aspecto | Valor |
|---------|-------|
| Tamaño | 21,7 × 28 cm (media carta venezolana); `@page { size: 21.7cm 28cm; margin: 0 }` |
| Márgenes | superior **4,5 cm** (ahí va la cabecera) · laterales **2 cm** · inferior **2,5 cm** |
| Cabecera | Logo, razón social y RIF del emisor, formato (`FORMATO LIBRE` / `NOTA DE ENTREGA`) y N° de Control |
| Renglones | Descripción, cantidad, precio unitario y total, en la retícula de la plantilla |
| Totales | SubTotal, IVA, (IGTF), **Total Bs**, el importe en letras y, cuando retienen, las retenciones |
| Pie | Razón social del emisor, teléfonos, rango de control autorizado, providencia y `ORIGINAL` |
| Interruptores | cabecera y pie · firma y sello · marca de agua: son del documento y viajan guardados con él |

Las imágenes de la hoja viven en `public/assets/factura/` (`emisor.png`, `firma.png`, `sello.png`).
Los estilos de la hoja se inyectan desde `shared/impresion/factura-estilos.ts`, porque la vista previa
se pinta con `[innerHTML]` y no hereda el encapsulado del componente.

### Numeración y control

- La factura lleva **dos** números: el de la factura (`0000001`, siete dígitos) y el de **control**
  (`00-00000101`), que es el consecutivo del rango autorizado por el SENIAT.
- El campo *N° de Control* trae un botón para copiar el número de factura; si el control cae fuera
  del rango autorizado (`00-00000101` – `00-00000200` por defecto) se avisa, pero **no** se bloquea.
- Código interno con el mismo esquema que los clientes: `FAC-000007`.

### Fiscalidad: el trato del cliente manda

| Concepto | Regla |
|----------|-------|
| IVA | 16 % general; **0 % si el cliente está exento** (`condicionFiscal: 'exento'`) |
| IGTF | 3 % solo si la operación se paga en divisas **y** el cliente no está exento de IGTF |
| Retención de IVA | El `porcentajeRetencionIva` del cliente cuando es agente de retención (75 % general) |
| Retención de ISLR | `alicuotaIslr` (5 %) sobre el subtotal si el cliente es agente de retención |

- **Total Bs** = subtotal + IVA (+ IGTF): es el importe que se factura y el que se escribe **en letras**.
- **Neto a pagar** = Total Bs − retenciones: las retenciones no rebajan el total facturado, son pagos
  a cuenta que el agente descuenta al pagar; por eso la hoja las informa **aparte**, bajo el total.
- Los importes usan el formato venezolano (`29.946,00`) y el total se escribe en letras mayúsculas
  (`montoEnLetras()`: `… BOLIVARES CON … CENTIMOS`).

### Estados y guardado

| Estado | Se puede | Notas |
|--------|----------|-------|
| `borrador` | editar, emitir, eliminar | Es lo que se guarda mientras se escribe |
| `emitida` | anular (estado terminal) | Al emitir se **congelan los totales** y se calcula la huella SHA-256 del contenido |
| `anulada` | — | Documento cerrado, solo consulta |
| `eliminado` | — | Borrado lógico: la factura queda en la base para la trazabilidad |

- Guardar reintenta hasta 3 veces si otro usuario tomó el mismo consecutivo (índice único de `codigo`).
- El borrador se respalda en `localStorage` y el listado se cachea (`firmalink:facturas:list`), que
  entra en pantalla al instante y se revalida contra el backend.
- `cambiosSinGuardarGuard` protege la salida del editor.
- Índices de `firmalink_facturas`: `codigo` (único), `numero`, `cliente.codigo` y `estado` + `fechaEmision`.

### El listado (`/billing`)

Patrón de `list-agreement`, con KPIs (Facturas, Borradores, Emitidas, Anuladas y **Facturado** en Bs),
filtros por texto, estado y cliente, y menú de acciones por fila:

| Acción | Disponible cuando | Detalle |
|--------|-------------------|---------|
| Editar / Ver factura | `borrador` → edición; emitida o anulada → consulta | Navega a `/billing/new` con `facturas.marcarParaEditar(codigo)` |
| Imprimir | siempre | Relee la factura, rasteriza la hoja y abre la ventana de impresión |
| Enviar por correo (PDF) | solo `emitida` | Genera el PDF, lo adjunta y prellena el correo del cliente (ver [Envío por correo](#envío-por-correo)) |
| Emitir | solo `borrador` | Relee, valida y guarda `estado: 'emitida'`: congela totales y huella |
| Anular | solo `emitida` | Estado terminal, vía `cambiarEstado(codigo, 'anulada', estado)` |
| Eliminar | `borrador` o `anulada` | Borrado lógico (`estado: 'eliminado'`); una emitida **no** se elimina, se anula |
| Copiar huella | facturas con huella | Copia el SHA-256 completo al portapapeles |

- La **huella** se muestra en verde (`.lb-huella`), el mismo lenguaje visual de los acuerdos: firma
  digital del contenido, visible en la columna y copiable de un clic.
- El cliente se muestra con avatar de iniciales, nombre y RIF/documento; el *tooltip* de la fila
  explica por qué una factura cerrada no se puede editar.
- Por debajo de 1024 px la cabecera colapsa a un **speed dial** flotante (los listeners de escape y
  clic externo van en fase *captura*, porque SweetAlert y Bootstrap se comen la burbuja).

---

## Reglas de negocio — Presupuestos

Un presupuesto es el documento **comercial** que se cotiza **antes** de facturar: dice qué se ofrece,
por cuánto y **bajo qué condiciones**, y el cliente lo aprueba o lo rechaza. No es un documento
fiscal, y esa diferencia manda en todo el módulo.

| | Factura | Presupuesto |
|---|---|---|
| Naturaleza | Fiscal (SENIAT) | Comercial |
| Numeración de control | Sí, en rango autorizado | **No** |
| IGTF / retenciones | Sí | **No** |
| Vencimiento | No aplica | Validez en días → se muestra `vencido` |
| Cierre | `emitida` | `enviado` → **respuesta del cliente** |

- La hoja lleva la nota **"DOCUMENTO NO FISCAL — NO CONSTITUYE FACTURA"** y un bloque de
  **aceptación del cliente** (nombre, firma y fecha), además de la firma y el sello del emisor.
- El emisor es **BUNKER TECHNOLOGIES SOLUTIONS, C.A** y su identidad se arma desde `EMISOR_DEFAULT`
  (`factura.model.ts`): un cambio de teléfono o correo vale para los dos documentos.
- Las **condiciones comerciales** viajan con el documento: validez (días), forma de pago, tiempo de
  entrega, garantía, lugar y alcance. `validezDias` (30 por defecto) **es la que recalcula
  `fechaValidez`** desde la emisión.
- **Descuento comercial** en porcentaje: se aplica sobre el subtotal, **antes** del IVA
  (`subtotal → descuento → base imponible → IVA → total`).

### Estados

| Estado | Editable | Transiciones |
|--------|----------|--------------|
| `borrador` | Sí | `enviado`, `eliminado` |
| `enviado` | No (congelado) | `aprobado`, `rechazado`, `anulado` |
| `aprobado` | No | `anulado` |
| `rechazado` | No | `anulado` |
| `anulado` | No | — (terminal) |
| `eliminado` | No | — (terminal, borrado lógico) |
| `vencido` | — | **Derivado**: `enviado` cuya `fechaValidez` ya pasó. No se guarda |

- **Enviar** es el paso que cierra el documento: congela `totales` y estampa la **huella SHA-256**
  de lo que salió al cliente (número, cliente, renglones, IVA, descuento y validez).
- **Aprobar / Rechazar** registran la respuesta del cliente: `aprobadoPor` (quién aceptó) o
  `motivoRechazo`, más `fechaRespuesta`. Un presupuesto **anulado** o **eliminado** no se factura.
- Solo un **borrador** se elimina. Un presupuesto que ya salió al cliente se **anula**: pudo quedar en
  manos de terceros y su rastro se conserva.

### Numeración

- **Código interno** `PRE-000001` (`formatearCodigoPresupuesto`): el vínculo estable del documento,
  el mismo esquema que clientes, acuerdos y facturas. Índice único por `codigo`.
- **Número de presupuesto** de 7 dígitos (`formatearNumeroPresupuesto`, `0000007`). Correlativo y no
  reutilizable: los eliminados siguen contando.
- El borrador se respalda en `localStorage` y el listado se cachea en `firmalink:presupuestos:list`,
  que entra en pantalla al instante y se revalida contra el backend.
- Un documento por `codigo`: el guardado es un *upsert* filtrado por `codigo` (`ExecColeccion`), el
  mismo esquema que clientes, acuerdos y facturas. La colección no lleva índices propios (solo `_id`),
  igual que el resto de las colecciones de FirmaLink; los campos por los que se consulta son `codigo`,
  `cliente.codigo`, `estado` y `fechaEmision`.

### El listado (`/budgets`)

KPIs (Presupuestos, Aprobados, Por vencer, Vencidos y **Cotizado** en Bs), filtros por texto, estado y
cliente, y menú de acciones por fila:

| Acción | Disponible cuando | Detalle |
|--------|-------------------|---------|
| Editar | `borrador` | Navega a `/budgets/new` con `presupuestos.marcarParaEditar(codigo)`; si está cerrado, el *tooltip* explica el motivo (`motivoBloqueo`) |
| Ver hoja / Imprimir | siempre | Relee el presupuesto, rasteriza la hoja y abre la ventana de impresión |
| Enviar por correo (PDF) | `enviado` | Genera el PDF, lo adjunta y prellena el correo del cliente (ver [Envío por correo](#envío-por-correo)) |
| Enviar al cliente | `borrador` | Valida, confirma y guarda `estado: 'enviado'`: congela totales y huella |
| Aprobar | `enviado` | Pide quién aprobó y guarda `estado: 'aprobado'` + `aprobadoPor` |
| Rechazar | `enviado` | Pide el motivo y guarda `estado: 'rechazado'` + `motivoRechazo` |
| Anular | `enviado`, `aprobado` o `rechazado` | Estado terminal, vía `cambiarEstado(codigo, 'anulado', estado)` |
| Eliminar | `borrador` | Borrado lógico (`estado: 'eliminado'`) |
| Copiar huella | presupuestos con huella | Copia el SHA-256 completo al portapapeles |

- La columna **Validez** se pinta en ámbar cuando vence en 7 días o menos y en púrpura cuando ya
  venció: es el dato que apura la decisión del cliente.
- Se mantienen el lenguaje visual del módulo de facturas (huella verde `.lb-huella`, avatar de
  iniciales, *speed dial* por debajo de 1024 px) y el modo oscuro.

> **Backend en marcha**: las tres funciones `_SYS_CFirmaLinkPresupuesto*` están dadas de alta en
> `apicore` y la colección `firmalink_presupuestos` quedó sembrada con seis ejemplos (PRE-000001 a
> PRE-000006) que cubren los estados del ciclo de vida —incluido uno **vencido** (enviado cuya validez
> pasó) y uno **por vencer**—, con el cliente `CLI-000001` y el emisor BUNKER. La huella de cada
> ejemplo se verificó recalculándola con el mismo canónico de `PresupuestoService.huella()`. La entrada
> "Presupuestos" (`budgets`) ya existe en el menú del perfil *Administrador FirmaLink*, dentro de
> *Finanzas*. Si el listado avisa que no pudo consultar es el backend caído, no las funciones: el editor
> **no pierde el trabajo** (borrador local) pero no guarda en la base.

---

## Impresión y exportación

**Acuerdos.** La impresión se realiza con un **iframe oculto** y reglas `@page` (`size: letter
portrait; margin: 0`), usando una tabla de marco con `<thead>`/`<tfoot>` para repetir cabecera y pie
en cada página. Los márgenes del acuerdo se aplican desde el modelo (`margen`).

Verificado sobre el PDF resultante: 5 páginas, margen izquierdo 3,00 cm.

**Facturas.** La hoja se imprime desde una **ventana aparte** (`imprimirFactura()`), que escribe el
documento completo con sus estilos y espera a que carguen las imágenes antes de llamar a `print()`:
así la hoja sale sola, sin la barra lateral ni el panel de la aplicación, y con el papel que declara
`@page` (21,7 × 28 cm). Desde el diálogo del sistema se obtiene el **PDF** con *Guardar como PDF*;
no se usa `PdfService`, que está atado al acuerdo.

**Presupuestos.** Reutilizan **exactamente la misma hoja y el mismo motor** (`CSS_FACTURA`/
`HOJA_FACTURA`, 21,7 × 28 cm): `imprimirPresupuesto()` para la ventana de impresión y
`generarPdfPresupuesto()` para el adjunto del correo. Al compartir formato, comparten también el
paginado y los topes de páginas: el arreglo del *píxel de sobra* de más abajo vale para los dos, y solo
se mantiene una definición de la hoja.

Para el **correo**, el PDF se genera en el navegador (`factura-pdf.ts`): la misma hoja se rasteriza
con `html2canvas` a 192 ppp y se compone en un jsPDF de 21,7 × 28 cm, con paginado geométrico si la
factura desborda una página. Topes de seguridad: 8 páginas incrustadas y un presupuesto de
28 MB − 2 MB de holgura; los nombres de las imágenes se sanitizan (`sanitizarContentId`).

> **La página mide lo mismo que el lienzo.** html2canvas dimensiona el lienzo con
> `floor(ceil(pxCss) × escala)`: redondea la altura **antes** de escalar. La hoja mide 28 cm =
> 1058,27 px CSS, así que el lienzo sale de 2118 px mientras que un `round(pxCss × escala)` daría
> 2117. Ese píxel de sobra hacía que el paginado creyera que quedaba contenido pendiente y añadía
> **una página en blanco** al PDF del correo. Por eso el tamaño de página se calcula con la misma
> regla que html2canvas (`paginaPx()`), y los restos menores que `RESTO_MINIMO_PX` no abren hoja
> nueva. Al tocar estas medidas, verificar con
> `/var/folders/gp/nxkwmywj0_n9zdkpt1hwtdrm0000gn/T/opencode/factura-pdf/verificar.js`.

---

## Envío por correo

Tanto el **acuerdo**, la **factura** (solo cuando está **emitida**) como el **presupuesto** (solo
cuando está **enviado** al cliente) se pueden remitir por correo.

### Acuerdos

1. Se compone el mensaje con `construirCorreoAcuerdo()` (`acuerdo-correo.ts`): asunto
   `Acuerdo <codigo> — <titulo>`, cuerpo **HTML** y versión **texto plano**.
2. Se solicitan los destinatarios con `pedirDestinatariosCorreo()` (Para, CC y nota personalizada),
   validando el formato de cada dirección.
3. Se envía a través de `CorreoService` → `POST /v1/api/email/enviar`.
4. Si en el editor hay cambios sin guardar, se ofrece **Guardar y enviar**, **Enviar sin guardar** o
   **Cancelar**.

### Facturas

1. Se genera el PDF de la hoja en el navegador (ver [Impresión y exportación](#impresión-y-exportación))
   y se arma el cuerpo con `construirCorreoFactura()` (`factura-correo.ts`): asunto
   `Factura <numero> — <cliente>`, datos de control y totales, la hoja incrustada como `cid:` y el
   bloque de **huella SHA-256** en verde; el PDF viaja como adjunto.
2. `pedirDestinatariosCorreoFactura()` prellena los destinatarios con el correo fiscal del cliente
   (`cliente.correo`, hoy `correoFacturacion`); el envío es idempotente por clave
   `${codigo}:${huella}:${Date.now()}`.
3. Errores `noHabilitado` (503) y `rechazoProveedor` (422) se reportan con opción de reintentar.

### Presupuestos

1. Se genera el PDF de la hoja (mismo motor y mismo paginado que la factura, ver
   [Impresión y exportación](#impresión-y-exportación)) y se arma el cuerpo con
   `construirCorreoPresupuesto()` (`presupuesto-correo.ts`): asunto
   `Presupuesto <numero> — <cliente>`, número, fecha, **válida hasta**, renglones, totales,
   **condiciones comerciales**, la nota **DOCUMENTO NO FISCAL — NO CONSTITUYE FACTURA** y la hoja
   incrustada como `cid:`; el PDF viaja como adjunto.
2. `pedirDestinatariosCorreoPresupuesto()` prellena los destinatarios con el correo del cliente
   (`cliente.correo`) y valida el formato de cada dirección antes de enviar.
3. El correo se puede **responder para aprobar**: el cuerpo lo indica expresamente, y la respuesta se
   registra en el listado con la acción **Aprobar** (que pide quién aceptó).

Errores contemplados: `503` (servicio de correo no habilitado), `422` (rechazo del proveedor),
`400`, `403`, `413` (adjuntos demasiado grandes) y `429` (demasiadas peticiones).

El backend usa **Resend** como proveedor. En modo de pruebas el proveedor solo entrega al correo
propietario de la cuenta; `delivered@resend.dev` es útil para verificar el flujo.

---

## Tema visual y branding

Paleta definida en `src/styles.scss` como variables CSS y conmutable en tiempo de ejecución:

| Variable | Claro | Oscuro |
|----------|-------|--------|
| `--primary` | `#0c2d48` | `#1e5f9e` |
| `--primary-light` | `#2a6fb0` | `#2fd4bb` |
| `--primary-dark` | `#061829` | `#0a3358` |
| `--accent` | `#00c9a7` | `#00c9a7` |
| `--warn` | `#f44336` | `#ff5252` |
| `--background` | `#f5f5f5` | `#121212` |

El tema oscuro se activa con el atributo `data-theme="dark"` en `<body>` y la preferencia se guarda
en `localStorage` bajo la clave `firmalink-theme`. El isotipo (dos eslabones entrelazados + check) se
reutiliza como logo animado en la pantalla de carga y en el login.

---

## Integración con contenedor de escritorio

`index.html` escucha mensajes `postMessage` del contenedor de escritorio (Tauri/Electron):

| Mensaje | Efecto |
|---------|--------|
| `NETWORK_CONTEXT` | Guarda el contexto de red en `sessionStorage` (`net_info`) |
| `SET_SESSION` | Inyecta el token de sesión en `sessionStorage` (`token_sandra`) |

---

## Convenciones de desarrollo

- **Identificadores en inglés**, comentarios y documentación **en español**.
- Componentes **standalone** y carga diferida por ruta (`loadComponent`).
- Estado reactivo con **Signals**.
- Nombres de archivo en `kebab-case`; clases en `PascalCase`.
- Formateo con **Prettier**.
- Prohibido el uso de diálogos nativos del navegador (`alert`/`confirm`/`prompt`).

---

## Créditos

Desarrollado por **BUNKER TECHNOLOGIES SOLUTIONS** y **SANDRA SERVER C.A.**

FirmaLink forma parte del ecosistema **Sandra**.

---

## Licencia

Software propietario. Todos los derechos reservados.
Su uso, reproducción o distribución requiere autorización expresa de los titulares.
