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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuarios_service_1 = require("./usuarios.service");
const usuario_dto_1 = require("./dto/usuario.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const usuario_entity_1 = require("./entities/usuario.entity");
let UsuariosController = class UsuariosController {
    constructor(service) {
        this.service = service;
    }
    findAll(filter) {
        return this.service.findAll(filter);
    }
    getTecnicos(juzgadoId) {
        return this.service.getTecnicosDisponibles(juzgadoId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    deactivate(id) {
        return this.service.deactivate(id);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Listar usuarios (solo admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.FilterUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tecnicos/disponibles'),
    (0, swagger_1.ApiOperation)({ summary: 'Técnicos disponibles con carga de tickets' }),
    __param(0, (0, common_1.Query)('juzgado_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "getTecnicos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de usuario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear usuario' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar usuario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Desactivar usuario (soft delete)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "deactivate", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map