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
exports.Ticket = exports.PrioridadTicketEnum = exports.EstadoTicketEnum = exports.TipoTicketEnum = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const juzgado_entity_1 = require("../../ubicaciones/entities/juzgado.entity");
const equipo_entity_1 = require("../../equipos/entities/equipo.entity");
const software_entity_1 = require("../../software/entities/software.entity");
const ticket_historial_entity_1 = require("./ticket-historial.entity");
const ticket_comentario_entity_1 = require("./ticket-comentario.entity");
var TipoTicketEnum;
(function (TipoTicketEnum) {
    TipoTicketEnum["HARDWARE"] = "Hardware";
    TipoTicketEnum["SOFTWARE"] = "Software";
    TipoTicketEnum["RED"] = "Red";
    TipoTicketEnum["OTRO"] = "Otro";
})(TipoTicketEnum || (exports.TipoTicketEnum = TipoTicketEnum = {}));
var EstadoTicketEnum;
(function (EstadoTicketEnum) {
    EstadoTicketEnum["ABIERTO"] = "Abierto";
    EstadoTicketEnum["EN_PROGRESO"] = "En Progreso";
    EstadoTicketEnum["RESUELTO"] = "Resuelto";
    EstadoTicketEnum["CERRADO"] = "Cerrado";
})(EstadoTicketEnum || (exports.EstadoTicketEnum = EstadoTicketEnum = {}));
var PrioridadTicketEnum;
(function (PrioridadTicketEnum) {
    PrioridadTicketEnum["CRITICA"] = "Critica";
    PrioridadTicketEnum["ALTA"] = "Alta";
    PrioridadTicketEnum["MEDIA"] = "Media";
    PrioridadTicketEnum["BAJA"] = "Baja";
})(PrioridadTicketEnum || (exports.PrioridadTicketEnum = PrioridadTicketEnum = {}));
let Ticket = class Ticket {
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nro_ticket', length: 10, unique: true, nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "nroTicket", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoTicketEnum }),
    __metadata("design:type", String)
], Ticket.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Ticket.prototype, "asunto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoTicketEnum, default: EstadoTicketEnum.ABIERTO }),
    __metadata("design:type", String)
], Ticket.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PrioridadTicketEnum, default: PrioridadTicketEnum.MEDIA }),
    __metadata("design:type", String)
], Ticket.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_por_id' }),
    __metadata("design:type", Number)
], Ticket.prototype, "creadoPorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asignado_a_id', nullable: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "asignadoAId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'juzgado_id', nullable: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "juzgadoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'equipo_id', nullable: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "equipoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'software_id', nullable: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "softwareId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], Ticket.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_asig', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "fechaAsig", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_resol', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "fechaResol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_cierre', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "fechaCierre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sla_vence_en', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "slaVenceEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sla_cumplido', nullable: true }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "slaCumplido", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (u) => u.ticketsCreados),
    (0, typeorm_1.JoinColumn)({ name: 'creado_por_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Ticket.prototype, "creadoPor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (u) => u.ticketsAsignados),
    (0, typeorm_1.JoinColumn)({ name: 'asignado_a_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Ticket.prototype, "asignadoA", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => juzgado_entity_1.Juzgado, (j) => j.tickets),
    (0, typeorm_1.JoinColumn)({ name: 'juzgado_id' }),
    __metadata("design:type", juzgado_entity_1.Juzgado)
], Ticket.prototype, "juzgado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, (e) => e.tickets),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], Ticket.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => software_entity_1.Software, (s) => s.tickets),
    (0, typeorm_1.JoinColumn)({ name: 'software_id' }),
    __metadata("design:type", software_entity_1.Software)
], Ticket.prototype, "software", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_historial_entity_1.TicketHistorial, (h) => h.ticket, { cascade: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "historial", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_comentario_entity_1.TicketComentario, (c) => c.ticket, { cascade: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "comentarios", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'ticket' })
], Ticket);
//# sourceMappingURL=ticket.entity.js.map