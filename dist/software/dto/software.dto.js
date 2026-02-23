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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSoftwareDto = exports.InstalarSoftwareDto = exports.UpdateSoftwareDto = exports.CreateSoftwareDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const software_entity_1 = require("../entities/software.entity");
const pagination_dto_1 = require("../../common/pipes/pagination.dto");
class CreateSoftwareDto {
}
exports.CreateSoftwareDto = CreateSoftwareDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "nro_sw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: software_entity_1.TipoSwEnum }),
    (0, class_validator_1.IsEnum)(software_entity_1.TipoSwEnum),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "proveedor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: software_entity_1.TipoLicenciaEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(software_entity_1.TipoLicenciaEnum),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "tipo_licencia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "descripcion_lic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSoftwareDto.prototype, "max_instalaciones", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSoftwareDto.prototype, "observaciones", void 0);
class UpdateSoftwareDto {
}
exports.UpdateSoftwareDto = UpdateSoftwareDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: software_entity_1.TipoSwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(software_entity_1.TipoSwEnum),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: software_entity_1.TipoLicenciaEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(software_entity_1.TipoLicenciaEnum),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "tipo_licencia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "descripcion_lic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateSoftwareDto.prototype, "max_instalaciones", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: software_entity_1.EstadoSwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(software_entity_1.EstadoSwEnum),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSoftwareDto.prototype, "observaciones", void 0);
class InstalarSoftwareDto {
}
exports.InstalarSoftwareDto = InstalarSoftwareDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], InstalarSoftwareDto.prototype, "equipo_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InstalarSoftwareDto.prototype, "version_inst", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], InstalarSoftwareDto.prototype, "fecha_inst", void 0);
class FilterSoftwareDto extends pagination_dto_1.PaginationDto {
}
exports.FilterSoftwareDto = FilterSoftwareDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: software_entity_1.TipoSwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(software_entity_1.TipoSwEnum),
    __metadata("design:type", String)
], FilterSoftwareDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: software_entity_1.EstadoSwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(software_entity_1.EstadoSwEnum),
    __metadata("design:type", String)
], FilterSoftwareDto.prototype, "estado", void 0);
//# sourceMappingURL=software.dto.js.map