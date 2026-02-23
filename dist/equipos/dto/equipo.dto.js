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
exports.FilterEquipoDto = exports.ReubicarEquipoDto = exports.UpdateEquipoDto = exports.CreateEquipoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const equipo_entity_1 = require("../entities/equipo.entity");
const pagination_dto_1 = require("../../common/pipes/pagination.dto");
class CreateEquipoDto {
}
exports.CreateEquipoDto = CreateEquipoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "nro_inventario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: equipo_entity_1.ClaseHwEnum }),
    (0, class_validator_1.IsEnum)(equipo_entity_1.ClaseHwEnum),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "clase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "subtipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "nro_serie", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: equipo_entity_1.EstadoHwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(equipo_entity_1.EstadoHwEnum),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateEquipoDto.prototype, "puesto_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "fecha_alta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "observaciones", void 0);
class UpdateEquipoDto {
}
exports.UpdateEquipoDto = UpdateEquipoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: equipo_entity_1.ClaseHwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(equipo_entity_1.ClaseHwEnum),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "clase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "subtipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "nro_serie", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: equipo_entity_1.EstadoHwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(equipo_entity_1.EstadoHwEnum),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateEquipoDto.prototype, "puesto_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipoDto.prototype, "observaciones", void 0);
class ReubicarEquipoDto {
}
exports.ReubicarEquipoDto = ReubicarEquipoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ReubicarEquipoDto.prototype, "puesto_id", void 0);
class FilterEquipoDto extends pagination_dto_1.PaginationDto {
}
exports.FilterEquipoDto = FilterEquipoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: equipo_entity_1.ClaseHwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(equipo_entity_1.ClaseHwEnum),
    __metadata("design:type", String)
], FilterEquipoDto.prototype, "clase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: equipo_entity_1.EstadoHwEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(equipo_entity_1.EstadoHwEnum),
    __metadata("design:type", String)
], FilterEquipoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterEquipoDto.prototype, "juzgado_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterEquipoDto.prototype, "sin_asignar", void 0);
//# sourceMappingURL=equipo.dto.js.map