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
exports.Contrato = exports.EstadoContratoEnum = exports.TipoContratoEnum = void 0;
const typeorm_1 = require("typeorm");
const proveedor_entity_1 = require("./proveedor.entity");
const equipo_entity_1 = require("../../equipos/entities/equipo.entity");
const software_entity_1 = require("../../software/entities/software.entity");
var TipoContratoEnum;
(function (TipoContratoEnum) {
    TipoContratoEnum["MANTENIMIENTO_HW"] = "Mantenimiento HW";
    TipoContratoEnum["SOPORTE_SW"] = "Soporte SW";
    TipoContratoEnum["CONECTIVIDAD"] = "Conectividad";
    TipoContratoEnum["SEGURIDAD_IT"] = "Seguridad IT";
    TipoContratoEnum["CONSULTORIA"] = "Consultoria";
    TipoContratoEnum["OTRO"] = "Otro";
})(TipoContratoEnum || (exports.TipoContratoEnum = TipoContratoEnum = {}));
var EstadoContratoEnum;
(function (EstadoContratoEnum) {
    EstadoContratoEnum["VIGENTE"] = "Vigente";
    EstadoContratoEnum["POR_VENCER"] = "Por Vencer";
    EstadoContratoEnum["VENCIDO"] = "Vencido";
    EstadoContratoEnum["RESCINDIDO"] = "Rescindido";
    EstadoContratoEnum["EN_RENOVACION"] = "En Renovacion";
})(EstadoContratoEnum || (exports.EstadoContratoEnum = EstadoContratoEnum = {}));
let Contrato = class Contrato {
};
exports.Contrato = Contrato;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contrato.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nro_contrato', length: 30, unique: true }),
    __metadata("design:type", String)
], Contrato.prototype, "nroContrato", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proveedor_id' }),
    __metadata("design:type", Number)
], Contrato.prototype, "proveedorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoContratoEnum }),
    __metadata("design:type", String)
], Contrato.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300, nullable: true }),
    __metadata("design:type", String)
], Contrato.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'date' }),
    __metadata("design:type", String)
], Contrato.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_venc', type: 'date' }),
    __metadata("design:type", String)
], Contrato.prototype, "fechaVenc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoContratoEnum, default: EstadoContratoEnum.VIGENTE }),
    __metadata("design:type", String)
], Contrato.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Contrato.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'ARS' }),
    __metadata("design:type", String)
], Contrato.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Contrato.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Contrato.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Contrato.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Contrato.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, (p) => p.contratos),
    (0, typeorm_1.JoinColumn)({ name: 'proveedor_id' }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], Contrato.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => equipo_entity_1.Equipo, (e) => e.contratos),
    (0, typeorm_1.JoinTable)({
        name: 'contrato_equipo',
        schema: 'pj',
        joinColumn: { name: 'contrato_id' },
        inverseJoinColumn: { name: 'equipo_id' },
    }),
    __metadata("design:type", Array)
], Contrato.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => software_entity_1.Software, (s) => s.contratos),
    (0, typeorm_1.JoinTable)({
        name: 'contrato_software',
        schema: 'pj',
        joinColumn: { name: 'contrato_id' },
        inverseJoinColumn: { name: 'software_id' },
    }),
    __metadata("design:type", Array)
], Contrato.prototype, "softwares", void 0);
exports.Contrato = Contrato = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'contrato' })
], Contrato);
//# sourceMappingURL=contrato.entity.js.map