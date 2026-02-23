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
exports.Juzgado = exports.TipoJuzgadoEnum = void 0;
const typeorm_1 = require("typeorm");
const distrito_entity_1 = require("./distrito.entity");
const puesto_entity_1 = require("./puesto.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
var TipoJuzgadoEnum;
(function (TipoJuzgadoEnum) {
    TipoJuzgadoEnum["JUZGADO"] = "Juzgado";
    TipoJuzgadoEnum["CAMARA"] = "Camara";
    TipoJuzgadoEnum["TRIBUNAL"] = "Tribunal";
    TipoJuzgadoEnum["SECRETARIA"] = "Secretaria";
    TipoJuzgadoEnum["DEPENDENCIA"] = "Dependencia";
})(TipoJuzgadoEnum || (exports.TipoJuzgadoEnum = TipoJuzgadoEnum = {}));
let Juzgado = class Juzgado {
};
exports.Juzgado = Juzgado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Juzgado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'distrito_id' }),
    __metadata("design:type", Number)
], Juzgado.prototype, "distritoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Juzgado.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Juzgado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoJuzgadoEnum, default: TipoJuzgadoEnum.JUZGADO }),
    __metadata("design:type", String)
], Juzgado.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Juzgado.prototype, "piso", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Juzgado.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Juzgado.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Juzgado.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => distrito_entity_1.Distrito, (d) => d.juzgados),
    (0, typeorm_1.JoinColumn)({ name: 'distrito_id' }),
    __metadata("design:type", distrito_entity_1.Distrito)
], Juzgado.prototype, "distrito", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => puesto_entity_1.Puesto, (p) => p.juzgado),
    __metadata("design:type", Array)
], Juzgado.prototype, "puestos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => usuario_entity_1.Usuario, (u) => u.juzgados),
    __metadata("design:type", Array)
], Juzgado.prototype, "usuarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (t) => t.juzgado),
    __metadata("design:type", Array)
], Juzgado.prototype, "tickets", void 0);
exports.Juzgado = Juzgado = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'juzgado' })
], Juzgado);
//# sourceMappingURL=juzgado.entity.js.map