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
exports.Usuario = exports.RolEnum = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const juzgado_entity_1 = require("../../ubicaciones/entities/juzgado.entity");
const notificacion_entity_1 = require("./notificacion.entity");
var RolEnum;
(function (RolEnum) {
    RolEnum["ADMIN"] = "admin";
    RolEnum["OPERARIO"] = "operario";
    RolEnum["TECNICO_INTERNO"] = "tecnico_interno";
    RolEnum["TECNICO_PROVEEDOR"] = "tecnico_proveedor";
})(RolEnum || (exports.RolEnum = RolEnum = {}));
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 254, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Usuario.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 4, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "iniciales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RolEnum }),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar_color', length: 7, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "avatarColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ultimo_login', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "ultimoLogin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (t) => t.creadoPor),
    __metadata("design:type", Array)
], Usuario.prototype, "ticketsCreados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (t) => t.asignadoA),
    __metadata("design:type", Array)
], Usuario.prototype, "ticketsAsignados", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => juzgado_entity_1.Juzgado, (j) => j.usuarios),
    (0, typeorm_1.JoinTable)({
        name: 'usuario_juzgado',
        schema: 'pj',
        joinColumn: { name: 'usuario_id' },
        inverseJoinColumn: { name: 'juzgado_id' },
    }),
    __metadata("design:type", Array)
], Usuario.prototype, "juzgados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notificacion_entity_1.Notificacion, (n) => n.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "notificaciones", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'usuario' })
], Usuario);
//# sourceMappingURL=usuario.entity.js.map