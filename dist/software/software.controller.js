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
exports.SoftwareController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const software_service_1 = require("./software.service");
const software_dto_1 = require("./dto/software.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let SoftwareController = class SoftwareController {
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
    darDeBaja(id) {
        return this.service.darDeBaja(id);
    }
    getInstalaciones(id) {
        return this.service.getInstalaciones(id);
    }
    instalar(id, dto) {
        return this.service.instalar(id, dto);
    }
    desinstalar(id, equipoId) {
        return this.service.desinstalar(id, equipoId);
    }
};
exports.SoftwareController = SoftwareController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar software y licencias' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [software_dto_1.FilterSoftwareDto]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar software' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [software_dto_1.CreateSoftwareDto]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de software' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar software/licencia' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, software_dto_1.UpdateSoftwareDto]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Dar de baja software' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "darDeBaja", null);
__decorate([
    (0, common_1.Get)(':id/instalaciones'),
    (0, swagger_1.ApiOperation)({ summary: 'Ver instalaciones del software' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "getInstalaciones", null);
__decorate([
    (0, common_1.Post)(':id/instalaciones'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar instalación en equipo' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, software_dto_1.InstalarSoftwareDto]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "instalar", null);
__decorate([
    (0, common_1.Delete)(':id/instalaciones/:equipoId'),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolEnum.ADMIN, usuario_entity_1.RolEnum.OPERARIO),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Desinstalar software de equipo' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('equipoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SoftwareController.prototype, "desinstalar", null);
exports.SoftwareController = SoftwareController = __decorate([
    (0, swagger_1.ApiTags)('Inventario Software'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('software'),
    __metadata("design:paramtypes", [software_service_1.SoftwareService])
], SoftwareController);
//# sourceMappingURL=software.controller.js.map