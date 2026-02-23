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
exports.TicketHistorial = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const ticket_entity_2 = require("./ticket.entity");
let TicketHistorial = class TicketHistorial {
};
exports.TicketHistorial = TicketHistorial;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TicketHistorial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ticket_id' }),
    __metadata("design:type", Number)
], TicketHistorial.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], TicketHistorial.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado_anterior',
        type: 'enum',
        enum: ['Abierto', 'En Progreso', 'Resuelto', 'Cerrado'],
        nullable: true,
    }),
    __metadata("design:type", String)
], TicketHistorial.prototype, "estadoAnterior", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado_nuevo',
        type: 'enum',
        enum: ['Abierto', 'En Progreso', 'Resuelto', 'Cerrado'],
    }),
    __metadata("design:type", String)
], TicketHistorial.prototype, "estadoNuevo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TicketHistorial.prototype, "comentario", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TicketHistorial.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, (t) => t.historial, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketHistorial.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], TicketHistorial.prototype, "usuario", void 0);
exports.TicketHistorial = TicketHistorial = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'ticket_historial' })
], TicketHistorial);
//# sourceMappingURL=ticket-historial.entity.js.map