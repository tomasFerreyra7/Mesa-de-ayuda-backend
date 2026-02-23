"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tickets_service_1 = require("./tickets.service");
const ticket_dto_1 = require("./dto/ticket.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const usuario_entity_2 = require("../usuarios/entities/usuario.entity");
let TicketsController = class TicketsController {
    constructor(service) {
        this.service = service;
    }
    findAll(filter, user) {
        return this.service.findAll(filter, user);
    }
    create(dto, user) {
        return this.service.create(dto, user);
    }
    findOne(id, user) {
        return this.service.findOne(id, user);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user);
    }
    cambiarEstado(id, dto, user) {
        return this.service.cambiarEstado(id, dto, user);
    }
    asignar(id, dto, user) {
        return this.service.asignar(id, dto, user);
    }
    remove(id) {
        return this.service.remove(id);
    }
    getComentarios(id, user) {
        return this.service.getComentarios(id, user);
    }
    addComentario(id, dto, user) {
        return this.service.addComentario(id, dto, user);
    }
    getHistorial(id) {
        return this.service.getHistorial(id);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar tickets' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_dto_1.FilterTicketDto, usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Crear ticket' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_dto_1.CreateTicketDto, usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de ticket' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar ticket' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticket_dto_1.UpdateTicketDto,
        usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar estado del ticket' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticket_dto_1.CambiarEstadoDto,
        usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "cambiarEstado", null);
__decorate([
    (0, common_1.Patch)(':id/asignar'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Asignar ticket a técnico' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticket_dto_1.AsignarTicketDto,
        usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "asignar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar ticket (solo admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/comentarios'),
    (0, swagger_1.ApiOperation)({ summary: 'Comentarios del ticket' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getComentarios", null);
__decorate([
    (0, common_1.Post)(':id/comentarios'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar comentario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticket_dto_1.CreateComentarioDto,
        usuario_entity_2.Usuario]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "addComentario", null);
__decorate([
    (0, common_1.Get)(':id/historial'),
    (0, swagger_1.ApiOperation)({ summary: 'Historial de estados del ticket' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getHistorial", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map