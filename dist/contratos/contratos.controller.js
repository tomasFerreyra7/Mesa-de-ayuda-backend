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
exports.ContratosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contratos_service_1 = require("./contratos.service");
const contrato_dto_1 = require("./dto/contrato.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let ContratosController = class ContratosController {
    constructor(service) {
        this.service = service;
    }
    findAll(filter) {
        return this.service.findAllContratos(filter);
    }
    create(dto) {
        return this.service.createContrato(dto);
    }
    findOne(id) {
        return this.service.findOneContrato(id);
    }
    update(id, dto) {
        return this.service.updateContrato(id, dto);
    }
    remove(id) {
        return this.service.removeContrato(id);
    }
    findAllProveedores() {
        return this.service.findAllProveedores();
    }
    createProveedor(dto) {
        return this.service.createProveedor(dto);
    }
    findOneProveedor(id) {
        return this.service.findOneProveedor(id);
    }
    updateProveedor(id, dto) {
        return this.service.updateProveedor(id, dto);
    }
    removeProveedor(id) {
        return this.service.removeProveedor(id);
    }
};
exports.ContratosController = ContratosController;
__decorate([
    (0, common_1.Get)('contratos'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar contratos' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contrato_dto_1.FilterContratoDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('contratos'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear contrato' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contrato_dto_1.CreateContratoDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('contratos/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de contrato' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('contratos/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar contrato' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, contrato_dto_1.UpdateContratoDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('contratos/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete: dar de baja contrato (activo = false)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('proveedores'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar proveedores' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "findAllProveedores", null);
__decorate([
    (0, common_1.Post)('proveedores'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear proveedor' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contrato_dto_1.CreateProveedorDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "createProveedor", null);
__decorate([
    (0, common_1.Get)('proveedores/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de proveedor con contratos' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "findOneProveedor", null);
__decorate([
    (0, common_1.Patch)('proveedores/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar proveedor (incl. activo para soft delete)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, contrato_dto_1.UpdateProveedorDto]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "updateProveedor", null);
__decorate([
    (0, common_1.Delete)('proveedores/:id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete: dar de baja proveedor (activo = false)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContratosController.prototype, "removeProveedor", null);
exports.ContratosController = ContratosController = __decorate([
    (0, swagger_1.ApiTags)('Contratos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [contratos_service_1.ContratosService])
], ContratosController);
//# sourceMappingURL=contratos.controller.js.map