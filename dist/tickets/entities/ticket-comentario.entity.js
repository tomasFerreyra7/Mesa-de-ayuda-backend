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
exports.TicketComentario = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let TicketComentario = class TicketComentario {
};
exports.TicketComentario = TicketComentario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TicketComentario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ticket_id' }),
    __metadata("design:type", Number)
], TicketComentario.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], TicketComentario.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TicketComentario.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TicketComentario.prototype, "interno", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TicketComentario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, (t) => t.comentarios, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketComentario.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], TicketComentario.prototype, "usuario", void 0);
exports.TicketComentario = TicketComentario = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'ticket_comentario' })
], TicketComentario);
//# sourceMappingURL=ticket-comentario.entity.js.map