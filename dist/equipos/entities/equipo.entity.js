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
exports.Equipo = exports.EstadoHwEnum = exports.ClaseHwEnum = void 0;
const typeorm_1 = require("typeorm");
const puesto_entity_1 = require("../../ubicaciones/entities/puesto.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const software_equipo_entity_1 = require("../../software/entities/software-equipo.entity");
const contrato_entity_1 = require("../../contratos/entities/contrato.entity");
var ClaseHwEnum;
(function (ClaseHwEnum) {
    ClaseHwEnum["COMPUTADORA"] = "Computadora";
    ClaseHwEnum["IMPRESORA"] = "Impresora";
    ClaseHwEnum["MONITOR"] = "Monitor";
    ClaseHwEnum["SCANNER"] = "Scanner";
    ClaseHwEnum["SERVIDOR"] = "Servidor";
    ClaseHwEnum["RED"] = "Red";
    ClaseHwEnum["UPS"] = "UPS";
    ClaseHwEnum["PERIFERICO"] = "Periferico";
    ClaseHwEnum["OTRO"] = "Otro";
})(ClaseHwEnum || (exports.ClaseHwEnum = ClaseHwEnum = {}));
var EstadoHwEnum;
(function (EstadoHwEnum) {
    EstadoHwEnum["ACTIVO"] = "Activo";
    EstadoHwEnum["INACTIVO"] = "Inactivo";
    EstadoHwEnum["EN_MANTENIMIENTO"] = "En Mantenimiento";
    EstadoHwEnum["DADO_DE_BAJA"] = "Dado de Baja";
})(EstadoHwEnum || (exports.EstadoHwEnum = EstadoHwEnum = {}));
let Equipo = class Equipo {
};
exports.Equipo = Equipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nro_inventario', length: 20, unique: true }),
    __metadata("design:type", String)
], Equipo.prototype, "nroInventario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ClaseHwEnum }),
    __metadata("design:type", String)
], Equipo.prototype, "clase", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "subtipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nro_serie', length: 100, unique: true, nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "nroSerie", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoHwEnum, default: EstadoHwEnum.ACTIVO }),
    __metadata("design:type", String)
], Equipo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'puesto_id', nullable: true }),
    __metadata("design:type", Number)
], Equipo.prototype, "puestoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_alta', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "fechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_baja', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Equipo.prototype, "fechaBaja", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Equipo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Equipo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => puesto_entity_1.Puesto, (p) => p.equipo),
    (0, typeorm_1.JoinColumn)({ name: 'puesto_id' }),
    __metadata("design:type", puesto_entity_1.Puesto)
], Equipo.prototype, "puesto", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (t) => t.equipo),
    __metadata("design:type", Array)
], Equipo.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => software_equipo_entity_1.SoftwareEquipo, (se) => se.equipo),
    __metadata("design:type", Array)
], Equipo.prototype, "softwareInstalado", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => contrato_entity_1.Contrato, (c) => c.equipos),
    __metadata("design:type", Array)
], Equipo.prototype, "contratos", void 0);
exports.Equipo = Equipo = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'equipo' })
], Equipo);
//# sourceMappingURL=equipo.entity.js.map