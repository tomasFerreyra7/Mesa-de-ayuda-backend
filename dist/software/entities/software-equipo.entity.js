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
exports.SoftwareEquipo = void 0;
const typeorm_1 = require("typeorm");
const software_entity_1 = require("./software.entity");
const equipo_entity_1 = require("../../equipos/entities/equipo.entity");
let SoftwareEquipo = class SoftwareEquipo {
};
exports.SoftwareEquipo = SoftwareEquipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SoftwareEquipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'software_id' }),
    __metadata("design:type", Number)
], SoftwareEquipo.prototype, "softwareId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'equipo_id' }),
    __metadata("design:type", Number)
], SoftwareEquipo.prototype, "equipoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version_inst', length: 50, nullable: true }),
    __metadata("design:type", String)
], SoftwareEquipo.prototype, "versionInst", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inst', type: 'date', nullable: true }),
    __metadata("design:type", String)
], SoftwareEquipo.prototype, "fechaInst", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SoftwareEquipo.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => software_entity_1.Software, (s) => s.instalaciones),
    (0, typeorm_1.JoinColumn)({ name: 'software_id' }),
    __metadata("design:type", software_entity_1.Software)
], SoftwareEquipo.prototype, "software", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, (e) => e.softwareInstalado),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], SoftwareEquipo.prototype, "equipo", void 0);
exports.SoftwareEquipo = SoftwareEquipo = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'software_equipo' }),
    (0, typeorm_1.Unique)(['softwareId', 'equipoId'])
], SoftwareEquipo);
//# sourceMappingURL=software-equipo.entity.js.map