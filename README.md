# SistemaPJ — Backend API

Backend REST para la Mesa de Ayuda & Inventario IT del Poder Judicial.
Construido con **NestJS + TypeORM + PostgreSQL (Neon DB)**.

---

## Requisitos

- Node.js 18+
- npm 9+
- Base de datos Neon DB con el DDL ya ejecutado (`sistemap_neon.sql`)

---

## Instalación y puesta en marcha

Pasos detallados en **[Levantar el servidor](#levantar-el-servidor)**. Resumen: instalar dependencias, crear `.env` con `DATABASE_URL`, `JWT_SECRET`, etc., ejecutar el DDL en Neon y luego `npm run start:dev`.

> **Importante:** `DATABASE_URL` lo encontrás en el panel de Neon → tu proyecto → Connection string (con `?sslmode=require` al final).

---

## Levantar el servidor

1. **Instalar dependencias** (solo la primera vez después de clonar):
   ```bash
   npm install
   ```

2. **Configurar `.env`** en la raíz del proyecto con al menos:
   - `DATABASE_URL` (connection string de Neon, con `?sslmode=require`)
   - `JWT_SECRET` (mín. 32 caracteres)
   - `JWT_EXPIRES_IN` (ej. `86400`)
   - `PORT` (ej. `8080`)
   - `NODE_ENV` (ej. `development`)
   - `CORS_ORIGINS` (ej. `http://localhost:5173`)

3. **Tener el DDL ejecutado** en Neon (contenido de `sistemap_neon.sql` en el SQL Editor).

4. **Arrancar**:
   ```bash
   # Desarrollo (con hot-reload; crea el schema en la DB si no existe)
   npm run start:dev
   ```
   Para producción:
   ```bash
   npm run build && npm run start:prod
   ```

El servidor queda en: `http://localhost:PORT/v1` (o `https://...` si configurás SSL).  
Swagger UI en: `http://localhost:PORT/docs`

---

## Scripts disponibles

| Comando               | Descripción                                           |
| --------------------- | ----------------------------------------------------- |
| `npm run start:dev`   | Servidor en desarrollo (hot-reload)                   |
| `npm run build`       | Compila el proyecto → carpeta `dist/`                 |
| `npm run start:prod`  | Ejecuta la versión compilada (requiere `build` antes) |
| `npm run certs:generate` | Genera certificados autofirmados para HTTPS (desarrollo) |
| `npm run lint`        | Ejecuta ESLint sobre el código                        |
| `npm run test`        | Ejecuta los tests con Jest                            |

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

| Variable         | Requerida | Default                 | Descripción                                |
| ---------------- | --------- | ----------------------- | ------------------------------------------ |
| `DATABASE_URL`   | ✅        | —                       | Connection string de Neon                  |
| `JWT_SECRET`     | ✅        | —                       | Secreto para firmar tokens (mín. 32 chars) |
| `JWT_EXPIRES_IN` | ❌        | `86400`                 | Expiración del token en segundos           |
| `PORT`           | ❌        | `3000`                  | Puerto del servidor                        |
| `NODE_ENV`       | ❌        | `development`           | Activa logs de query en dev                |
| `CORS_ORIGINS`   | ❌        | `http://localhost:5173` | Orígenes permitidos (coma-separados)       |

