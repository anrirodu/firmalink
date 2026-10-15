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
12. [Impresión y exportación](#impresión-y-exportación)
13. [Envío por correo](#envío-por-correo)
14. [Tema visual y branding](#tema-visual-y-branding)
15. [Integración con contenedor de escritorio](#integración-con-contenedor-de-escritorio)
16. [Convenciones de desarrollo](#convenciones-de-desarrollo)
17. [Créditos](#créditos)

---

## Características principales

- **Gestión integral de acuerdos**: alta, edición, consulta, cambio de estado y anulación.
- **Numeración correlativa automática** con formato `PREFIJO + consecutivo (3 dígitos) + año`
  (p. ej. `CJS001-2026`), usando el **año del acuerdo** y no el del reloj, para poder preparar
  ejercicios siguientes sin romper la numeración del año en curso.
- **Editor de documento** con contenido enriquecido, márgenes configurables (presets e introducción
  manual), plantillas de texto y vista de hoja tamaño carta.
- **Bloqueo del documento tras la firma**: un acuerdo firmado o anulado queda cerrado; su contenido y
  su huella no pueden volver a modificarse (control aplicado en UI y en el servicio).
- **Transiciones de estado validadas** en la interfaz y en la capa de datos.
- **Huella de integridad SHA-256** del documento, verificada contra `shasum -a 256`.
- **Envío por correo** del acuerdo (HTML + texto plano) con validación de destinatarios, Para/CC y
  nota personalizada, e informe de errores del proveedor.
- **Listado con KPIs** (indicadores por estado), orden, paginación, búsqueda y filtros.
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
│   │   │   ├── hiring/             # Contrataciones
│   │   │   └── miscellaneous/      # error, logout, maintenance, not-authorized
│   │   ├── shared/
│   │   │   ├── components/isotipo-animado/  # Logo animado reutilizable
│   │   │   ├── guards/cambios-sin-guardar.guard.ts
│   │   │   ├── interceptors/       # auth (HMAC), token, zone
│   │   │   ├── services/           # api, correo, idle, loading-screen, menu,
│   │   │   │                       # notificacion, theme
│   │   │   └── utils/sha256.service.ts
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
| `CONSULTAR_ACUERDO` | `_SYS_CFirmaLinkAcuerdo` | Detalle completo de un acuerdo |

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
- Para las funciones `apicore` de acuerdos, el `query` tiene el formato
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
- **Guardas de ruta**: `authGuard` protege el layout autenticado.
- **Guarda `cambiosSinGuardarGuard`**: evita salir del editor con cambios sin guardar.
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

---

## Impresión y exportación

La impresión se realiza con un **iframe oculto** y reglas `@page` (`size: letter portrait;
margin: 0`), usando una tabla de marco con `<thead>`/`<tfoot>` para repetir cabecera y pie en cada
página. Los márgenes del acuerdo se aplican desde el modelo (`margen`).

Verificado sobre el PDF resultante: 5 páginas, margen izquierdo 3,00 cm.

---

## Envío por correo

El acuerdo se puede remitir por correo **desde el listado** o **desde el editor**.

1. Se compone el mensaje con `construirCorreoAcuerdo()` (`acuerdo-correo.ts`): asunto
   `Acuerdo <codigo> — <titulo>`, cuerpo **HTML** y versión **texto plano**.
2. Se solicitan los destinatarios con `pedirDestinatariosCorreo()` (Para, CC y nota personalizada),
   validando el formato de cada dirección.
3. Se envía a través de `CorreoService` → `POST /v1/api/email/enviar`.
4. Si en el editor hay cambios sin guardar, se ofrece **Guardar y enviar**, **Enviar sin guardar** o
   **Cancelar**.

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
