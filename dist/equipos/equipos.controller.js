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
exports.EquiposController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const equipos_service_1 = require("./equipos.service");
const equipo_dto_1 = require("./dto/equipo.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let EquiposController = class EquiposController {
    constructor(service) {
        this.service = service;
    }
    findAll(filter) {
        return this.service.findAll(filter);
    }
    create(dto) {
        return this.service.create(dto);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    reubicar(id, dto) {
        return this.service.reubicar(id, dto);
    }
    darDeBaja(id) {
        return this.service.darDeBaja(id);
    }
};
exports.EquiposController = EquiposController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar equipos' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipo_dto_1.FilterEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Dar de alta equipo' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipo_dto_1.CreateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de equipo' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar equipo' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, equipo_dto_1.UpdateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/reubicar'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Mover equipo a otro puesto' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, equipo_dto_1.ReubicarEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "reubicar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Dar de baja equipo (soft delete)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "darDeBaja", null);
exports.EquiposController = EquiposController = __decorate([
    (0, swagger_1.ApiTags)('Inventario Hardware'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('equipos'),
    __metadata("design:paramtypes", [equipos_service_1.EquiposService])
], EquiposController);
//# sourceMappingURL=equipos.controller.js.map