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
exports.UbicacionesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ubicaciones_service_1 = require("./ubicaciones.service");
const ubicacion_dto_1 = require("./dto/ubicacion.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let UbicacionesController = class UbicacionesController {
    constructor(service) {
        this.service = service;
    }
    getArbol() {
        return this.service.getArbol();
    }
    createCircunscripcion(dto) {
        return this.service.createCircunscripcion(dto);
    }
    updateCircunscripcion(id, dto) {
        return this.service.updateCircunscripcion(id, dto);
    }
    removeCircunscripcion(id) {
        return this.service.removeCircunscripcion(id);
    }
    findDistritos(filter) {
        return this.service.findDistritos(filter);
    }
    createDistrito(dto) {
        return this.service.createDistrito(dto);
    }
    updateDistrito(id, dto) {
        return this.service.updateDistrito(id, dto);
    }
    removeDistrito(id) {
        return this.service.removeDistrito(id);
    }
    findJuzgados(filter) {
        return this.service.findJuzgados(filter);
    }
    createJuzgado(dto) {
        return this.service.createJuzgado(dto);
    }
    findOneJuzgado(id) {
        return this.service.findOneJuzgado(id);
    }
    updateJuzgado(id, dto) {
        return this.service.updateJuzgado(id, dto);
    }
    removeJuzgado(id) {
        return this.service.removeJuzgado(id);
    }
    createPuesto(id, dto) {
        return this.service.createPuesto(id, dto);
    }
    removePuesto(juzgadoId, puestoId) {
        return this.service.removePuesto(juzgadoId, puestoId);
    }
};
exports.UbicacionesController = UbicacionesController;
__decorate([
    (0, common_1.Get)('circunscripciones'),
    (0, swagger_1.ApiOperation)({ summary: 'Árbol completo: circunscripciones con distritos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "getArbol", null);
__decorate([
    (0, common_1.Post)('circunscripciones'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear circunscripción' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ubicacion_dto_1.CreateCircunscripcionDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "createCircunscripcion", null);
__decorate([
    (0, common_1.Patch)('circunscripciones/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar circunscripción' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ubicacion_dto_1.UpdateCircunscripcionDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "updateCircunscripcion", null);
__decorate([
    (0, common_1.Delete)('circunscripciones/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete: dar de baja circunscripción' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "removeCircunscripcion", null);
__decorate([
    (0, common_1.Get)('distritos'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar distritos' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ubicacion_dto_1.FilterDistritoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "findDistritos", null);
__decorate([
    (0, common_1.Post)('distritos'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear distrito' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ubicacion_dto_1.CreateDistritoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "createDistrito", null);
__decorate([
    (0, common_1.Patch)('distritos/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar distrito' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ubicacion_dto_1.UpdateDistritoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "updateDistrito", null);
__decorate([
    (0, common_1.Delete)('distritos/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete: dar de baja distrito' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "removeDistrito", null);
__decorate([
    (0, common_1.Get)('juzgados'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar juzgados/dependencias' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ubicacion_dto_1.FilterJuzgadoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "findJuzgados", null);
__decorate([
    (0, common_1.Post)('juzgados'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear juzgado o dependencia' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ubicacion_dto_1.CreateJuzgadoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "createJuzgado", null);
__decorate([
    (0, common_1.Get)('juzgados/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de juzgado con puestos y equipos' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "findOneJuzgado", null);
__decorate([
    (0, common_1.Patch)('juzgados/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar juzgado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ubicacion_dto_1.UpdateJuzgadoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "updateJuzgado", null);
__decorate([
    (0, common_1.Delete)('juzgados/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete: dar de baja juzgado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "removeJuzgado", null);
__decorate([
    (0, common_1.Post)('juzgados/:id/puestos'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar puesto al juzgado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ubicacion_dto_1.CreatePuestoDto]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "createPuesto", null);
__decorate([
    (0, common_1.Delete)('juzgados/:juzgadoId/puestos/:puestoId'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete: dar de baja puesto' }),
    __param(0, (0, common_1.Param)('juzgadoId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('puestoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UbicacionesController.prototype, "removePuesto", null);
exports.UbicacionesController = UbicacionesController = __decorate([
    (0, swagger_1.ApiTags)('Ubicaciones'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('ubicaciones'),
    __metadata("design:paramtypes", [ubicaciones_service_1.UbicacionesService])
], UbicacionesController);
//# sourceMappingURL=ubicaciones.controller.js.map