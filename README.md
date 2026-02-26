# SistemaPJ — Backend API

Backend REST para la Mesa de Ayuda & Inventario IT del Poder Judicial.
Construido con **NestJS + TypeORM + PostgreSQL (Neon DB)**.

---

## Requisitos

- Node.js 18+
- npm 9+
- Base de datos Neon DB con el DDL ya ejecutado (`sistemap_neon.sql`)

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de variables de entorno
cp .env.example .env
```

Editá `.env` con tus valores reales:

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=un-secreto-muy-largo-y-aleatorio-de-al-menos-32-caracteres
JWT_EXPIRES_IN=86400
PORT=3000
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173
```

> **Importante:** `DATABASE_URL` lo encontrás en el panel de Neon → tu proyecto → Connection string.  
> Asegurate de copiar la que dice `?sslmode=require` al final.

---

## Ejecutar el DDL en Neon

Antes de levantar el backend, el schema debe existir en tu base de datos:

1. Ir a [console.neon.tech](https://console.neon.tech)
2. Abrir tu proyecto → **SQL Editor**
3. Pegar el contenido de `sistemap_neon.sql` y ejecutar

---

## Levantar el servidor

```bash
# Desarrollo (con hot-reload)
npm run start:dev

# Producción
npm run build && npm run start:prod
```

El servidor queda en: `http://localhost:3000/v1`  
Swagger UI en: `http://localhost:3000/docs`

**Primera vez:** para crear un usuario admin inicial, ejecutá `npm run seed:admin`.

---

## Scripts disponibles

| Comando              | Descripción                                           |
| -------------------- | ----------------------------------------------------- |
| `npm run start:dev`  | Servidor en desarrollo (hot-reload)                   |
| `npm run build`      | Compila el proyecto → carpeta `dist/`                 |
| `npm run start:prod` | Ejecuta la versión compilada (requiere `build` antes) |
| `npm run seed:admin` | Crea el usuario administrador inicial                 |
| `npm run lint`       | Ejecuta ESLint sobre el código                        |
| `npm run test`       | Ejecuta los tests con Jest                            |

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

