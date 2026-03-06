# SistemaPJ — Backend API

Backend REST para la Mesa de Ayuda & Inventario IT del Poder Judicial.  
Construido con **NestJS + TypeORM + PostgreSQL (Neon DB)**.

Este README explica **cómo clonar el repositorio, configurarlo y demostrar que el backend funciona**. Seguí los pasos en orden.

---

## Qué vas a tener después de clonar

- Código del backend (NestJS).
- Un archivo **`sistemap_neon.sql`** con el diseño de la base de datos (tablas, schema `pj`).
- **No** vas a tener: el archivo `.env` (no se sube por seguridad) ni la carpeta `certs/` (certificados locales). Eso lo tenés que crear o generar vos siguiendo esta guía.

---

## Requisitos previos

Antes de seguir, necesitás:

- **Node.js 18+** y **npm** (si vas a correr el proyecto sin Docker), **o** **Docker** (si vas a usar contenedores).
- Una **cuenta en [Neon](https://neon.tech)** (base PostgreSQL en la nube). Creá un proyecto y anotá el _connection string_.
- **(Opcional)** Si más adelante querés usar HTTPS: **OpenSSL** (en Windows suele venir con [Git for Windows](https://git-scm.com)).

---

## Guía paso a paso: clonar, configurar y arrancar

### Paso 1 — Clonar e instalar dependencias

```bash
git clone <url-del-repositorio>
cd sistemap-backend
npm install
```

**Qué hace:** descarga el proyecto e instala las dependencias de Node (NestJS, TypeORM, etc.). Al terminar no vas a ver errores y existirá la carpeta `node_modules/`.

---

### Paso 2 — Crear el archivo `.env`

El backend necesita variables de entorno para conectarse a la base de datos y para JWT. Esas variables **no** van en el repo; las definís en un archivo `.env` que solo existe en tu máquina.

1. En la **raíz del proyecto** (donde está `package.json`), creá un archivo llamado exactamente **`.env`**.
2. Copiá este contenido y **reemplazá** los valores que correspondan:

```env
# ── Base de datos (Neon) ───────────────────────────────────────
# Obtené el connection string en: Neon → tu proyecto → Connection string
# Debe terminar en ?sslmode=require
DATABASE_URL=postgresql://USUARIO:PASSWORD@HOST/neondb?sslmode=require

# ── JWT (autenticación) ─────────────────────────────────────────
JWT_SECRET=un-texto-secreto-de-al-menos-32-caracteres-cualquiera
JWT_EXPIRES_IN=86400

# ── App ───────────────────────────────────────────────────────
PORT=8080
NODE_ENV=development

# ── CORS (URLs desde las que el frontend puede llamar a la API) ─
CORS_ORIGINS=http://localhost:5173,http://localhost:3001
```

**Dónde encontrar el `DATABASE_URL`:** en [console.neon.tech](https://console.neon.tech) → tu proyecto → **Connection string**. Elegí la opción que incluye `?sslmode=require`.

Con solo esto el servidor puede arrancar por **HTTP**. Si más adelante querés **HTTPS**, agregá al final del `.env`:

```env
# ── HTTPS (solo si generás certificados con npm run certs:generate) ─
SSL_KEY_PATH=certs/key.pem
SSL_CERT_PATH=certs/cert.pem
```

(Si no ponés estas dos líneas, el servidor arranca por HTTP y está bien para probar.)

---

### Paso 3 — Crear las tablas en Neon (ejecutar el DDL)

El backend espera que en tu base de Neon exista el schema `pj` y todas las tablas. Eso se hace ejecutando el archivo SQL que viene en el repo.

1. Entrá a [console.neon.tech](https://console.neon.tech) e iniciá sesión.
2. Abrí **tu proyecto** → pestaña **SQL Editor**.
3. En el repo, abrí el archivo **`sistemap_neon.sql`**, copiá **todo** su contenido.
4. Pegalo en el editor SQL de Neon y hacé clic en **Run** (o Execute).

**Qué hace:** crea el schema `pj` y las tablas (usuarios, tickets, equipos, software, contratos, ubicaciones, etc.). Si no hacés este paso, al arrancar el backend vas a tener errores de “tabla o schema no existe”. Además, antes de cada `start:dev` se ejecuta un script que crea el schema si no existe, pero las tablas tienen que estar creadas con este SQL.

---

### Paso 4 — (Opcional) Certificados para HTTPS

Solo si en el `.env` agregaste `SSL_KEY_PATH` y `SSL_CERT_PATH`:

```bash
npm run certs:generate
```

**Qué hace:** genera la carpeta `certs/` con `key.pem` y `cert.pem` (certificado autofirmado para localhost). Requiere tener OpenSSL instalado. Si no usás HTTPS, omití este paso.

---

### Paso 5 — Arrancar el servidor

Podés hacerlo de dos formas:

**Opción A — Con Node (desarrollo con recarga automática)**

```bash
npm run start:dev
```

**Opción B — Con Docker**

Si tenés Docker instalado, podés construir una imagen y correr el backend en un contenedor:

1. **Construir la imagen** (solo la primera vez o cuando cambies código):

   ```bash
   docker build -t sistemap-backend .
   ```

2. **Ejecutar el contenedor** (usando tu archivo `.env` para las variables):

   ```bash
   docker run -p 8080:8080 --env-file .env sistemap-backend
   ```

   La API queda disponible en **http://localhost:8080/v1**. Swagger en **http://localhost:8080/docs**.

**Qué hace (Node):** levanta el backend con recarga automática. Antes de arrancar, ejecuta un script que verifica/crea el schema en la DB.

**Cómo verificar que funcionó:** en la consola deberías ver algo como:

- Con **HTTP:**  
  `SistemaPJ API corriendo en: http://localhost:8080/v1`  
  `Swagger: http://localhost:8080/docs`
- Con **HTTPS:**  
  `SistemaPJ API corriendo en: https://localhost:8080/v1`  
  `Swagger: https://localhost:8080/docs`

Si ves eso, el backend está corriendo. Si aparece un error de base de datos, revisá el `DATABASE_URL` y que hayas ejecutado el `sistemap_neon.sql` en Neon.

---

## Cómo demostrar que el backend funciona

Después de arrancar con `npm run start:dev`:

1. **Abrir Swagger (documentación interactiva)**  
   En el navegador: **http://localhost:8080/docs** (o **https://localhost:8080/docs** si usás HTTPS).  
   Ahí ves todos los endpoints agrupados por módulo (Auth, Usuarios, Tickets, etc.).

2. **Probar el login**  
   En Swagger, buscá **Auth** → **POST /v1/auth/login**.  
   Clic en “Try it out”, en el body poné por ejemplo:

   ```json
   { "email": "admin@ejemplo.com", "password": "tu-password" }
   ```

   (El usuario tiene que existir en la base; si no tenés ninguno, alguien con acceso tiene que haber creado al menos un usuario admin.)  
   Ejecutá; si está bien, la respuesta incluye un **token** (JWT).

3. **Autorizar en Swagger**  
   Arriba en Swagger hay un botón **“Authorize”**. Pegá el token que te devolvió el login (solo el valor del token, sin “Bearer”) y aceptá. A partir de ahí podés probar el resto de los endpoints que piden autenticación.

4. **Probar otros endpoints**  
   Por ejemplo: **GET /v1/dashboard/kpis**, **GET /v1/ubicaciones/circunscripciones**, **GET /v1/tickets**, etc. Así mostrás que la API responde y que el backend está operativo.

**Resumen para la demo:** abrís `/docs`, mostrás el login, obtenés el token, lo ponés en Authorize y recorrés algunos endpoints. Con eso se ve que el backend está bien configurado y funcionando.

**Primera vez (sin usuarios en la base):** para crear un usuario administrador inicial, ejecutá `npm run seed:admin`.

---

## Producción

**Sin Docker:**

```bash
npm run build
npm run start:prod
```

**Con Docker:** la imagen que construís con `docker build` ya es de producción (multi-stage). Ejecutá el contenedor con `docker run` y las variables de entorno adecuadas (por ejemplo `--env-file .env` o las que use tu servidor).

---

## Subir cambios al repositorio

Cuando modifiques código, Dockerfile, README o cualquier archivo y quieras guardar esos cambios en el repo (GitHub, GitLab, etc.):

1. **Ver qué cambió:**

   ```bash
   git status
   ```

2. **Agregar los archivos** que quieras subir (todos los modificados):

   ```bash
   git add .
   ```

   O solo algunos: `git add dockerfile README.md .dockerignore`

3. **Hacer un commit** con un mensaje claro:

   ```bash
   git commit -m "Agregar Docker y actualizar README con pasos para Docker y subida al repo"
   ```

4. **Enviar al repositorio remoto** (reemplazá `main` por el nombre de tu rama si es otra, por ejemplo `master`):

   ```bash
   git push origin main
   ```

Si es la primera vez que subís desde esta máquina, puede que te pida configurar usuario y email de Git, o autenticarte con el remoto (token, SSH, etc.). Después de eso, con estos cuatro pasos (`status` → `add` → `commit` → `push`) subís cualquier cambio.

---

## Scripts disponibles

| Comando                  | Descripción                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run start:dev`      | Servidor en desarrollo (hot-reload)                      |
| `npm run build`          | Compila el proyecto → carpeta `dist/`                    |
| `npm run start:prod`     | Ejecuta la versión compilada (requiere `build` antes)    |
| `npm run seed:admin`     | Crea el usuario administrador inicial                    |
| `npm run certs:generate` | Genera certificados autofirmados para HTTPS (desarrollo) |
| `npm run lint`           | Ejecuta ESLint sobre el código                           |
| `npm run test`           | Ejecuta los tests con Jest                               |

## Docker

| Comando                                                    | Descripción                                            |
| ---------------------------------------------------------- | ------------------------------------------------------ |
| `docker build -t sistemap-backend .`                       | Construye la imagen del backend.                       |
| `docker run -p 8080:8080 --env-file .env sistemap-backend` | Ejecuta el contenedor usando las variables del `.env`. |

---

## Estructura del proyecto

```
src/
├── main.ts                        # Bootstrap, pipes, guards globales, Swagger
├── app.module.ts                  # Módulo raíz + configuración TypeORM
│
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts   # @CurrentUser()
│   │   ├── public.decorator.ts         # @Public() — saltea JWT
│   │   └── roles.decorator.ts          # @Roles(RolEnum.ADMIN, ...)
│   ├── filters/
│   │   └── http-exception.filter.ts    # Respuestas de error estándar
│   ├── guards/
│   │   └── roles.guard.ts              # Guard de roles basado en JWT
│   ├── interceptors/
│   │   └── transform.interceptor.ts    # Envuelve respuestas en { data: ... }
│   └── pipes/
│       └── pagination.dto.ts           # PaginationDto + helper paginate()
│
├── auth/                          # JWT Login/logout/me/password
├── usuarios/                      # CRUD usuarios + técnicos disponibles
├── tickets/                       # Mesa de ayuda completa + historial + comentarios
├── equipos/                       # Inventario hardware + reubicación
├── software/                      # Inventario software + instalaciones
├── contratos/                     # Contratos + proveedores
├── ubicaciones/                   # Circunscripciones, distritos, juzgados, puestos
└── dashboard/                     # KPIs + alertas
```

---

## Autenticación

Todos los endpoints requieren `Authorization: Bearer <token>` excepto `POST /v1/auth/login`.

Los guards están registrados **globalmente** en `AuthModule` — no hace falta decorar cada controller.

### Roles

| Rol                 | Permisos                                                         |
| ------------------- | ---------------------------------------------------------------- |
| `admin`             | Acceso total                                                     |
| `operario`          | Tickets (crear/leer), inventario (leer/actualizar), sin usuarios |
| `tecnico_interno`   | Solo sus tickets asignados                                       |
| `tecnico_proveedor` | Solo sus tickets asignados, sin notas internas                   |

---

## Endpoints principales

| Método   | Ruta                                | Descripción              |
| -------- | ----------------------------------- | ------------------------ |
| POST     | `/v1/auth/login`                    | Login → JWT              |
| GET      | `/v1/auth/me`                       | Usuario actual           |
| PATCH    | `/v1/auth/me/password`              | Cambiar contraseña       |
| GET      | `/v1/dashboard/kpis`                | KPIs del panel           |
| GET      | `/v1/dashboard/alertas`             | Alertas activas          |
| GET/POST | `/v1/tickets`                       | Listar / crear tickets   |
| PATCH    | `/v1/tickets/:id/estado`            | Cambiar estado           |
| PATCH    | `/v1/tickets/:id/asignar`           | Asignar a técnico        |
| GET/POST | `/v1/equipos`                       | Inventario hardware      |
| PATCH    | `/v1/equipos/:id/reubicar`          | Cambiar puesto           |
| GET/POST | `/v1/software`                      | Inventario software      |
| POST     | `/v1/software/:id/instalaciones`    | Registrar instalación    |
| GET/POST | `/v1/contratos`                     | Contratos                |
| GET/POST | `/v1/proveedores`                   | Proveedores              |
| GET      | `/v1/ubicaciones/circunscripciones` | Árbol organizacional     |
| GET/POST | `/v1/ubicaciones/juzgados`          | Juzgados                 |
| GET/POST | `/v1/usuarios`                      | Gestión usuarios (admin) |
| GET      | `/v1/usuarios/tecnicos/disponibles` | Técnicos con carga       |

Documentación completa interactiva en `/docs` (Swagger).

---

## Lógica de negocio destacada

**Tickets**

- SLA automático según prioridad: Crítica=4h, Alta=8h, Media=24h, Baja=72h
- Historial de estados registrado automáticamente en cada transición
- Técnicos solo acceden a sus tickets asignados
- Técnico proveedor no puede ver notas internas

**Software**

- Valida límite de licencias al registrar instalación
- Permite reactivar instalaciones previas en lugar de duplicar

**Contratos**

- El trigger de Neon actualiza el estado automáticamente según `fecha_venc`
- Alertas en dashboard para contratos que vencen en ≤30 días

---

## Variables de entorno

| Variable         | Requerida | Default                 | Descripción                                              |
| ---------------- | --------- | ----------------------- | -------------------------------------------------------- |
| `DATABASE_URL`   | ✅        | —                       | Connection string de Neon                                |
| `JWT_SECRET`     | ✅        | —                       | Secreto para firmar tokens (mín. 32 chars)               |
| `JWT_EXPIRES_IN` | ❌        | `86400`                 | Expiración del token en segundos                         |
| `PORT`           | ❌        | `3000`                  | Puerto del servidor                                      |
| `NODE_ENV`       | ❌        | `development`           | Activa logs de query en dev                              |
| `CORS_ORIGINS`   | ❌        | `http://localhost:5173` | Orígenes permitidos (coma-separados)                     |
| `SSL_KEY_PATH`   | ❌        | —                       | Ruta a la clave privada (ej. `certs/key.pem`) para HTTPS |
| `SSL_CERT_PATH`  | ❌        | —                       | Ruta al certificado (ej. `certs/cert.pem`) para HTTPS    |

---

## Script `certs:generate` en el repo

El script `scripts/generate-certs.js` y el comando `npm run certs:generate` **sí conviene tenerlos en el repo**. Solo generan certificados autofirmados en tu máquina (carpeta `certs/`), no suben secretos ni crean usuarios. Quien clone puede ejecutarlo para usar HTTPS en desarrollo. La carpeta `certs/` está en `.gitignore`, así que las claves privadas no se suben.
