# Plan de pruebas — Endpoints del Backend SistemaPJ

Base URL: `http://localhost:8080/v1` (o la configurada en `PORT`).

Autenticación: Bearer JWT en header `Authorization` (salvo los marcados como **Público**).

---

## 1. Auth (`/v1/auth`)

| Método | Endpoint               | Descripción                            | Auth    | Roles | Prueba |
| ------ | ---------------------- | -------------------------------------- | ------- | ----- | ------ |
| POST   | `/v1/auth/login`       | Iniciar sesión                         | Público | —     | ☐      |
| POST   | `/v1/auth/logout`      | Cerrar sesión (cliente descarta token) | JWT     | —     | ☐      |
| GET    | `/v1/auth/me`          | Datos del usuario autenticado          | JWT     | —     | ☐      |
| PATCH  | `/v1/auth/me/password` | Cambiar contraseña propia              | JWT     | —     | ☐      |

---

## 2. Usuarios (`/v1/usuarios`)

| Método | Endpoint                            | Descripción                                                     | Auth | Roles | Prueba |
| ------ | ----------------------------------- | --------------------------------------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/usuarios`                      | Listar usuarios                                                 | JWT  | ADMIN | ☐      |
| GET    | `/v1/usuarios/tecnicos/disponibles` | Técnicos disponibles con carga de tickets (query: `juzgado_id`) | JWT  | —     | ☐      |
| GET    | `/v1/usuarios/:id`                  | Detalle de usuario                                              | JWT  | ADMIN | ☐      |
| POST   | `/v1/usuarios`                      | Crear usuario                                                   | JWT  | ADMIN | ☐      |
| PATCH  | `/v1/usuarios/:id`                  | Actualizar usuario                                              | JWT  | ADMIN | ☐      |
| DELETE | `/v1/usuarios/:id`                  | Desactivar usuario (soft delete)                                | JWT  | ADMIN | ☐      |

---

## 3. Contratos y proveedores (`/v1`)

### Contratos

| Método | Endpoint            | Descripción                        | Auth | Roles | Prueba |
| ------ | ------------------- | ---------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/contratos`     | Listar contratos                   | JWT  | —     | ☐      |
| POST   | `/v1/contratos`     | Crear contrato                     | JWT  | ADMIN | ☐      |
| GET    | `/v1/contratos/:id` | Detalle de contrato                | JWT  | —     | ☐      |
| PATCH  | `/v1/contratos/:id` | Actualizar contrato                | JWT  | ADMIN | ☐      |
| DELETE | `/v1/contratos/:id` | Dar de baja contrato (soft delete) | JWT  | ADMIN | ☐      |

### Proveedores

| Método | Endpoint              | Descripción                         | Auth | Roles | Prueba |
| ------ | --------------------- | ----------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/proveedores`     | Listar proveedores                  | JWT  | —     | ☐      |
| POST   | `/v1/proveedores`     | Crear proveedor                     | JWT  | ADMIN | ☐      |
| GET    | `/v1/proveedores/:id` | Detalle de proveedor con contratos  | JWT  | —     | ☐      |
| PATCH  | `/v1/proveedores/:id` | Actualizar proveedor                | JWT  | ADMIN | ☐      |
| DELETE | `/v1/proveedores/:id` | Dar de baja proveedor (soft delete) | JWT  | ADMIN | ☐      |

---

## 4. Equipos — Inventario hardware (`/v1/equipos`)

| Método | Endpoint                   | Descripción                      | Auth | Roles           | Prueba |
| ------ | -------------------------- | -------------------------------- | ---- | --------------- | ------ |
| GET    | `/v1/equipos`              | Listar equipos                   | JWT  | —               | ☐      |
| POST   | `/v1/equipos`              | Dar de alta equipo               | JWT  | ADMIN           | ☐      |
| GET    | `/v1/equipos/:id`          | Detalle de equipo                | JWT  | —               | ☐      |
| PATCH  | `/v1/equipos/:id`          | Actualizar equipo                | JWT  | ADMIN, OPERARIO | ☐      |
| PATCH  | `/v1/equipos/:id/reubicar` | Mover equipo a otro puesto       | JWT  | ADMIN, OPERARIO | ☐      |
| DELETE | `/v1/equipos/:id`          | Dar de baja equipo (soft delete) | JWT  | ADMIN           | ☐      |

---

## 5. Software — Inventario software (`/v1/software`)

| Método | Endpoint                                   | Descripción                     | Auth | Roles           | Prueba |
| ------ | ------------------------------------------ | ------------------------------- | ---- | --------------- | ------ |
| GET    | `/v1/software`                             | Listar software y licencias     | JWT  | —               | ☐      |
| POST   | `/v1/software`                             | Registrar software              | JWT  | ADMIN, OPERARIO | ☐      |
| GET    | `/v1/software/:id`                         | Detalle de software             | JWT  | —               | ☐      |
| PATCH  | `/v1/software/:id`                         | Actualizar software/licencia    | JWT  | ADMIN, OPERARIO | ☐      |
| DELETE | `/v1/software/:id`                         | Dar de baja software            | JWT  | ADMIN           | ☐      |
| GET    | `/v1/software/:id/instalaciones`           | Ver instalaciones del software  | JWT  | —               | ☐      |
| POST   | `/v1/software/:id/instalaciones`           | Registrar instalación en equipo | JWT  | ADMIN, OPERARIO | ☐      |
| DELETE | `/v1/software/:id/instalaciones/:equipoId` | Desinstalar software de equipo  | JWT  | ADMIN, OPERARIO | ☐      |

---

## 6. Tickets (`/v1/tickets`)

| Método | Endpoint                      | Descripción                     | Auth | Roles           | Prueba |
| ------ | ----------------------------- | ------------------------------- | ---- | --------------- | ------ |
| GET    | `/v1/tickets`                 | Listar tickets                  | JWT  | —               | ☐      |
| POST   | `/v1/tickets`                 | Crear ticket                    | JWT  | ADMIN, OPERARIO | ☐      |
| GET    | `/v1/tickets/:id`             | Detalle de ticket               | JWT  | —               | ☐      |
| PATCH  | `/v1/tickets/:id`             | Actualizar ticket               | JWT  | —               | ☐      |
| PATCH  | `/v1/tickets/:id/estado`      | Cambiar estado del ticket       | JWT  | —               | ☐      |
| PATCH  | `/v1/tickets/:id/asignar`     | Asignar ticket a técnico        | JWT  | ADMIN, OPERARIO | ☐      |
| DELETE | `/v1/tickets/:id`             | Eliminar ticket                 | JWT  | ADMIN           | ☐      |
| GET    | `/v1/tickets/:id/comentarios` | Comentarios del ticket          | JWT  | —               | ☐      |
| POST   | `/v1/tickets/:id/comentarios` | Agregar comentario              | JWT  | —               | ☐      |
| GET    | `/v1/tickets/:id/historial`   | Historial de estados del ticket | JWT  | —               | ☐      |

---

## 7. Ubicaciones (`/v1/ubicaciones`)

### Circunscripciones

| Método | Endpoint                                | Descripción                                     | Auth | Roles | Prueba |
| ------ | --------------------------------------- | ----------------------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/ubicaciones/circunscripciones`     | Árbol completo: circunscripciones con distritos | JWT  | —     | ☐      |
| POST   | `/v1/ubicaciones/circunscripciones`     | Crear circunscripción                           | JWT  | ADMIN | ☐      |
| PATCH  | `/v1/ubicaciones/circunscripciones/:id` | Actualizar circunscripción                      | JWT  | ADMIN | ☐      |
| DELETE | `/v1/ubicaciones/circunscripciones/:id` | Dar de baja circunscripción                     | JWT  | ADMIN | ☐      |

### Distritos

| Método | Endpoint                        | Descripción          | Auth | Roles | Prueba |
| ------ | ------------------------------- | -------------------- | ---- | ----- | ------ |
| GET    | `/v1/ubicaciones/distritos`     | Listar distritos     | JWT  | —     | ☐      |
| POST   | `/v1/ubicaciones/distritos`     | Crear distrito       | JWT  | ADMIN | ☐      |
| PATCH  | `/v1/ubicaciones/distritos/:id` | Actualizar distrito  | JWT  | ADMIN | ☐      |
| DELETE | `/v1/ubicaciones/distritos/:id` | Dar de baja distrito | JWT  | ADMIN | ☐      |

### Juzgados

| Método | Endpoint                       | Descripción                              | Auth | Roles | Prueba |
| ------ | ------------------------------ | ---------------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/ubicaciones/juzgados`     | Listar juzgados/dependencias             | JWT  | —     | ☐      |
| POST   | `/v1/ubicaciones/juzgados`     | Crear juzgado o dependencia              | JWT  | ADMIN | ☐      |
| GET    | `/v1/ubicaciones/juzgados/:id` | Detalle de juzgado con puestos y equipos | JWT  | —     | ☐      |
| PATCH  | `/v1/ubicaciones/juzgados/:id` | Actualizar juzgado                       | JWT  | ADMIN | ☐      |
| DELETE | `/v1/ubicaciones/juzgados/:id` | Dar de baja juzgado                      | JWT  | ADMIN | ☐      |

### Puestos (por juzgado)

| Método | Endpoint                                                | Descripción                   | Auth | Roles | Prueba |
| ------ | ------------------------------------------------------- | ----------------------------- | ---- | ----- | ------ |
| GET    | `/v1/ubicaciones/juzgados/:id/puestos`                  | Listar puestos del juzgado    | JWT  | —     | ☐      |
| GET    | `/v1/ubicaciones/juzgados/:id/puestos/:puestoId`        | Detalle de puesto del juzgado | JWT  | —     | ☐      |
| POST   | `/v1/ubicaciones/juzgados/:id/puestos`                  | Agregar puesto al juzgado     | JWT  | ADMIN | ☐      |
| PATCH  | `/v1/ubicaciones/juzgados/:juzgadoId/puestos/:puestoId` | Actualizar puesto             | JWT  | ADMIN | ☐      |
| DELETE | `/v1/ubicaciones/juzgados/:juzgadoId/puestos/:puestoId` | Dar de baja puesto            | JWT  | ADMIN | ☐      |

### Puestos (listado general)

| Método | Endpoint                  | Descripción                           | Auth | Roles | Prueba |
| ------ | ------------------------- | ------------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/ubicaciones/puestos` | Listar puestos (filtrar por juzgados) | JWT  | —     | ☐      |

---

## 8. Dashboard (`/v1/dashboard`)

| Método | Endpoint                | Descripción                 | Auth | Roles           | Prueba |
| ------ | ----------------------- | --------------------------- | ---- | --------------- | ------ |
| GET    | `/v1/dashboard/kpis`    | KPIs del panel principal    | JWT  | ADMIN, OPERARIO | ☐      |
| GET    | `/v1/dashboard/alertas` | Alertas activas del sistema | JWT  | ADMIN, OPERARIO | ☐      |

---

## 9. Notificaciones (`/v1/notificaciones`)

| Método | Endpoint                 | Descripción                                     | Auth | Roles | Prueba |
| ------ | ------------------------ | ----------------------------------------------- | ---- | ----- | ------ |
| GET    | `/v1/notificaciones`     | Listar mis notificaciones                       | JWT  | —     | ☐      |
| GET    | `/v1/notificaciones/:id` | Detalle de una notificación                     | JWT  | —     | ☐      |
| POST   | `/v1/notificaciones`     | Crear notificación para un usuario              | JWT  | ADMIN | ☐      |
| PATCH  | `/v1/notificaciones/:id` | Actualizar notificación (ej. marcar como leída) | JWT  | —     | ☐      |
| DELETE | `/v1/notificaciones/:id` | Eliminar una notificación (solo las propias)    | JWT  | —     | ☐      |

---

## Resumen por método

| Método    | Cantidad |
| --------- | -------- |
| GET       | 32       |
| POST      | 22       |
| PATCH     | 22       |
| DELETE    | 18       |
| **Total** | **94**   |

---

## Cómo usar este archivo para pruebas

1. **Autenticación**: Obtén un token con `POST /v1/auth/login` y úsalo en `Authorization: Bearer <token>`.
2. **Roles**: Prueba con usuario ADMIN, OPERARIO y TÉCNICO donde aplique para validar permisos.
3. **Casos a cubrir por endpoint**:
   - 200/201: éxito con datos válidos.
   - 400: body/query inválido.
   - 401: sin token o token inválido.
   - 403: sin permiso (rol insuficiente).
   - 404: recurso no encontrado (id inexistente).
4. **Swagger**: En desarrollo, documentación en `http://localhost:3000/docs`.

