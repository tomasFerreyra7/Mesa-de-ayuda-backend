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
exports.Notificacion = exports.TipoNotifEnum = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
var TipoNotifEnum;
(function (TipoNotifEnum) {
    TipoNotifEnum["CONTRATO_POR_VENCER"] = "contrato_por_vencer";
    TipoNotifEnum["LICENCIA_POR_VENCER"] = "licencia_por_vencer";
    TipoNotifEnum["TICKET_ASIGNADO"] = "ticket_asignado";
    TipoNotifEnum["TICKET_ACTUALIZADO"] = "ticket_actualizado";
    TipoNotifEnum["TICKET_RESUELTO"] = "ticket_resuelto";
    TipoNotifEnum["EQUIPO_MANTENIMIENTO"] = "equipo_mantenimiento";
    TipoNotifEnum["SISTEMA"] = "sistema";
})(TipoNotifEnum || (exports.TipoNotifEnum = TipoNotifEnum = {}));
let Notificacion = class Notificacion {
};
exports.Notificacion = Notificacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notificacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], Notificacion.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoNotifEnum }),
    __metadata("design:type", String)
], Notificacion.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Notificacion.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Notificacion.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notificacion.prototype, "leida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referencia_tipo', length: 50, nullable: true }),
    __metadata("design:type", String)
], Notificacion.prototype, "referenciaTipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referencia_id', nullable: true }),
    __metadata("design:type", Number)
], Notificacion.prototype, "referenciaId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Notificacion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (u) => u.notificaciones),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Notificacion.prototype, "usuario", void 0);
exports.Notificacion = Notificacion = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'notificacion' })
], Notificacion);
//# sourceMappingURL=notificacion.entity.js.map