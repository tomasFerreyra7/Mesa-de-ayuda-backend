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
exports.FilterTicketDto = exports.CreateComentarioDto = exports.AsignarTicketDto = exports.CambiarEstadoDto = exports.UpdateTicketDto = exports.CreateTicketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ticket_entity_1 = require("../entities/ticket.entity");
const pagination_dto_1 = require("../../common/pipes/pagination.dto");
class CreateTicketDto {
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ticket_entity_1.TipoTicketEnum }),
    (0, class_validator_1.IsEnum)(ticket_entity_1.TipoTicketEnum),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "asunto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ticket_entity_1.PrioridadTicketEnum }),
    (0, class_validator_1.IsEnum)(ticket_entity_1.PrioridadTicketEnum),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "prioridad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "juzgado_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "equipo_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateTicketDto.prototype, "software_id", void 0);
class UpdateTicketDto {
}
exports.UpdateTicketDto = UpdateTicketDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "asunto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ticket_entity_1.EstadoTicketEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ticket_entity_1.EstadoTicketEnum),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ticket_entity_1.PrioridadTicketEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ticket_entity_1.PrioridadTicketEnum),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "prioridad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateTicketDto.prototype, "asignado_a_id", void 0);
class CambiarEstadoDto {
}
exports.CambiarEstadoDto = CambiarEstadoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ticket_entity_1.EstadoTicketEnum }),
    (0, class_validator_1.IsEnum)(ticket_entity_1.EstadoTicketEnum),
    __metadata("design:type", String)
], CambiarEstadoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CambiarEstadoDto.prototype, "comentario", void 0);
class AsignarTicketDto {
}
exports.AsignarTicketDto = AsignarTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AsignarTicketDto.prototype, "tecnico_id", void 0);
class CreateComentarioDto {
    constructor() {
        this.interno = false;
    }
}
exports.CreateComentarioDto = CreateComentarioDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComentarioDto.prototype, "texto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateComentarioDto.prototype, "interno", void 0);
class FilterTicketDto extends pagination_dto_1.PaginationDto {
}
exports.FilterTicketDto = FilterTicketDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ticket_entity_1.EstadoTicketEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ticket_entity_1.EstadoTicketEnum),
    __metadata("design:type", String)
], FilterTicketDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ticket_entity_1.PrioridadTicketEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ticket_entity_1.PrioridadTicketEnum),
    __metadata("design:type", String)
], FilterTicketDto.prototype, "prioridad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ticket_entity_1.TipoTicketEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ticket_entity_1.TipoTicketEnum),
    __metadata("design:type", String)
], FilterTicketDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterTicketDto.prototype, "asignado_a_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterTicketDto.prototype, "juzgado_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterTicketDto.prototype, "equipo_id", void 0);
//# sourceMappingURL=ticket.dto.js.map