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
exports.Software = exports.TipoLicenciaEnum = exports.EstadoSwEnum = exports.TipoSwEnum = void 0;
const typeorm_1 = require("typeorm");
const software_equipo_entity_1 = require("./software-equipo.entity");
const contrato_entity_1 = require("../../contratos/entities/contrato.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
var TipoSwEnum;
(function (TipoSwEnum) {
    TipoSwEnum["SISTEMA_OPERATIVO"] = "Sistema Operativo";
    TipoSwEnum["OFIMATICA"] = "Ofimatica";
    TipoSwEnum["SEGURIDAD"] = "Seguridad";
    TipoSwEnum["GESTION_JUDICIAL"] = "Gestion Judicial";
    TipoSwEnum["UTILIDADES"] = "Utilidades";
    TipoSwEnum["OTRO"] = "Otro";
})(TipoSwEnum || (exports.TipoSwEnum = TipoSwEnum = {}));
var EstadoSwEnum;
(function (EstadoSwEnum) {
    EstadoSwEnum["ACTIVO"] = "Activo";
    EstadoSwEnum["POR_VENCER"] = "Por Vencer";
    EstadoSwEnum["VENCIDO"] = "Vencido";
    EstadoSwEnum["SIN_LICENCIA"] = "Sin Licencia";
    EstadoSwEnum["DADO_DE_BAJA"] = "Dado de Baja";
})(EstadoSwEnum || (exports.EstadoSwEnum = EstadoSwEnum = {}));
var TipoLicenciaEnum;
(function (TipoLicenciaEnum) {
    TipoLicenciaEnum["OEM"] = "OEM";
    TipoLicenciaEnum["VOLUMEN"] = "Volumen";
    TipoLicenciaEnum["SUSCRIPCION"] = "Suscripcion";
    TipoLicenciaEnum["OPEN_SOURCE"] = "Open Source";
    TipoLicenciaEnum["FREEWARE"] = "Freeware";
    TipoLicenciaEnum["OTRO"] = "Otro";
})(TipoLicenciaEnum || (exports.TipoLicenciaEnum = TipoLicenciaEnum = {}));
let Software = class Software {
};
exports.Software = Software;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Software.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nro_sw', length: 20, unique: true }),
    __metadata("design:type", String)
], Software.prototype, "nroSw", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Software.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Software.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoSwEnum }),
    __metadata("design:type", String)
], Software.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Software.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_licencia', type: 'enum', enum: TipoLicenciaEnum, nullable: true }),
    __metadata("design:type", String)
], Software.prototype, "tipoLicencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion_lic', length: 300, nullable: true }),
    __metadata("design:type", String)
], Software.prototype, "descripcionLic", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_instalaciones', nullable: true }),
    __metadata("design:type", Number)
], Software.prototype, "maxInstalaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'instalaciones_act', default: 0 }),
    __metadata("design:type", Number)
], Software.prototype, "instalacionesAct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_vencimiento', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Software.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoSwEnum, default: EstadoSwEnum.ACTIVO }),
    __metadata("design:type", String)
], Software.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Software.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Software.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Software.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => software_equipo_entity_1.SoftwareEquipo, (se) => se.software),
    __metadata("design:type", Array)
], Software.prototype, "instalaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => contrato_entity_1.Contrato, (c) => c.softwares),
    __metadata("design:type", Array)
], Software.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (t) => t.software),
    __metadata("design:type", Array)
], Software.prototype, "tickets", void 0);
exports.Software = Software = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'software' })
], Software);
//# sourceMappingURL=software.entity.js.map