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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_historial_entity_1 = require("./entities/ticket-historial.entity");
const ticket_comentario_entity_1 = require("./entities/ticket-comentario.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const pagination_dto_1 = require("../common/pipes/pagination.dto");
let TicketsService = class TicketsService {
    constructor(repo, historialRepo, comentariosRepo) {
        this.repo = repo;
        this.historialRepo = historialRepo;
        this.comentariosRepo = comentariosRepo;
    }
    async findAll(filter, currentUser) {
        const qb = this.repo
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.creadoPor', 'cp')
            .leftJoinAndSelect('t.asignadoA', 'aa')
            .leftJoinAndSelect('t.juzgado', 'j')
            .leftJoinAndSelect('t.equipo', 'e')
            .orderBy('t.fechaCreacion', 'DESC');
        if ([usuario_entity_1.RolEnum.TECNICO_INTERNO, usuario_entity_1.RolEnum.TECNICO_PROVEEDOR].includes(currentUser.rol)) {
            qb.andWhere('t.asignadoAId = :uid', { uid: currentUser.id });
        }
        if (filter.q) {
            qb.andWhere('(t.asunto ILIKE :q OR t.nroTicket ILIKE :q OR t.descripcion ILIKE :q)', { q: `%${filter.q}%` });
        }
        if (filter.estado)
            qb.andWhere('t.estado = :estado', { estado: filter.estado });
        if (filter.prioridad)
            qb.andWhere('t.prioridad = :p', { p: filter.prioridad });
        if (filter.tipo)
            qb.andWhere('t.tipo = :tipo', { tipo: filter.tipo });
        if (filter.asignado_a_id)
            qb.andWhere('t.asignadoAId = :aid', { aid: filter.asignado_a_id });
        if (filter.juzgado_id)
            qb.andWhere('t.juzgadoId = :jid', { jid: filter.juzgado_id });
        if (filter.equipo_id)
            qb.andWhere('t.equipoId = :eid', { eid: filter.equipo_id });
        qb.skip(filter.skip).take(filter.take);
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_dto_1.paginate)(data, total, filter);
    }
    async findOne(id, currentUser) {
        const ticket = await this.repo.findOne({
            where: { id },
            relations: ['creadoPor', 'asignadoA', 'juzgado', 'equipo', 'software'],
        });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket #${id} no encontrado`);
        this.checkAccess(ticket, currentUser);
        const historial = await this.historialRepo.find({
            where: { ticketId: id },
            relations: ['usuario'],
            order: { fecha: 'ASC' },
        });
        const comentarios = await this.comentariosRepo.find({
            where: { ticketId: id, ...(this.isTecnicoProveedor(currentUser) ? { interno: false } : {}) },
            relations: ['usuario'],
            order: { createdAt: 'ASC' },
        });
        return { ...ticket, historial, comentarios };
    }
    async create(dto, currentUser) {
        if (dto.tipo === ticket_entity_1.TipoTicketEnum.HARDWARE && !dto.equipo_id) {
            throw new common_1.BadRequestException('Se requiere equipo_id para tickets de Hardware');
        }
        if (dto.tipo === ticket_entity_1.TipoTicketEnum.SOFTWARE && !dto.software_id) {
            throw new common_1.BadRequestException('Se requiere software_id para tickets de Software');
        }
        const ticket = this.repo.create({
            tipo: dto.tipo,
            asunto: dto.asunto,
            descripcion: dto.descripcion,
            prioridad: dto.prioridad,
            juzgadoId: dto.juzgado_id,
            equipoId: dto.equipo_id,
            softwareId: dto.software_id,
            creadoPorId: currentUser.id,
            slaVenceEn: this.calcularSla(dto.prioridad),
        });
        const saved = await this.repo.save(ticket);
        return this.findOne(saved.id, currentUser);
    }
    async update(id, dto, currentUser) {
        const ticket = await this.repo.findOne({ where: { id } });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket #${id} no encontrado`);
        this.checkAccess(ticket, currentUser);
        if ([usuario_entity_1.RolEnum.TECNICO_INTERNO, usuario_entity_1.RolEnum.TECNICO_PROVEEDOR].includes(currentUser.rol)) {
            if (dto.asignado_a_id || dto.prioridad || dto.asunto) {
                throw new common_1.ForbiddenException('Los técnicos solo pueden cambiar el estado');
            }
        }
        const estadoAnterior = ticket.estado;
        if (dto.asunto !== undefined)
            ticket.asunto = dto.asunto;
        if (dto.descripcion !== undefined)
            ticket.descripcion = dto.descripcion;
        if (dto.prioridad !== undefined)
            ticket.prioridad = dto.prioridad;
        if (dto.asignado_a_id !== undefined) {
            ticket.asignadoAId = dto.asignado_a_id;
            ticket.fechaAsig = new Date();
        }
        if (dto.estado !== undefined) {
            await this.transicionarEstado(ticket, dto.estado, currentUser.id, null);
        }
        if (dto.estado && dto.estado !== estadoAnterior) {
            await this.registrarHistorial(ticket.id, currentUser.id, estadoAnterior, dto.estado);
        }
        await this.repo.save(ticket);
        return this.findOne(id, currentUser);
    }
    async cambiarEstado(id, dto, currentUser) {
        const ticket = await this.repo.findOne({ where: { id } });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket #${id} no encontrado`);
        this.checkAccess(ticket, currentUser);
        const estadoAnterior = ticket.estado;
        await this.transicionarEstado(ticket, dto.estado, currentUser.id, dto.comentario);
        await this.repo.save(ticket);
        await this.registrarHistorial(id, currentUser.id, estadoAnterior, dto.estado, dto.comentario);
        return this.findOne(id, currentUser);
    }
    async asignar(id, dto, currentUser) {
        const ticket = await this.repo.findOne({ where: { id } });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket #${id} no encontrado`);
        ticket.asignadoAId = dto.tecnico_id;
        ticket.fechaAsig = new Date();
        if (ticket.estado === ticket_entity_1.EstadoTicketEnum.ABIERTO) {
            ticket.estado = ticket_entity_1.EstadoTicketEnum.EN_PROGRESO;
        }
        await this.repo.save(ticket);
        await this.registrarHistorial(id, currentUser.id, ticket_entity_1.EstadoTicketEnum.ABIERTO, ticket_entity_1.EstadoTicketEnum.EN_PROGRESO, `Asignado a técnico #${dto.tecnico_id}`);
        return this.findOne(id, currentUser);
    }
    async remove(id) {
        const ticket = await this.repo.findOne({ where: { id } });
        if (!ticket)
            throw new common_1.NotFoundException(`Ticket #${id} no encontrado`);
        await this.repo.remove(ticket);
    }
    async getComentarios(ticketId, currentUser) {
        const ticket = await this.repo.findOne({ where: { id: ticketId } });
        if (!ticket)
            throw new common_1.NotFoundException();
        this.checkAccess(ticket, currentUser);
        return this.comentariosRepo.find({
            where: {
                ticketId,
                ...(this.isTecnicoProveedor(currentUser) ? { interno: false } : {}),
            },
            relations: ['usuario'],
            order: { createdAt: 'ASC' },
        });
    }
    async addComentario(ticketId, dto, currentUser) {
        const ticket = await this.repo.findOne({ where: { id: ticketId } });
        if (!ticket)
            throw new common_1.NotFoundException();
        this.checkAccess(ticket, currentUser);
        if (this.isTecnicoProveedor(currentUser) && dto.interno) {
            throw new common_1.ForbiddenException('No permitido crear notas internas');
        }
        const comentario = this.comentariosRepo.create({
            ticketId,
            usuarioId: currentUser.id,
            texto: dto.texto,
            interno: dto.interno ?? false,
        });
        return this.comentariosRepo.save(comentario);
    }
    async getHistorial(ticketId) {
        return this.historialRepo.find({
            where: { ticketId },
            relations: ['usuario'],
            order: { fecha: 'ASC' },
        });
    }
    checkAccess(ticket, user) {
        if ([usuario_entity_1.RolEnum.TECNICO_INTERNO, usuario_entity_1.RolEnum.TECNICO_PROVEEDOR].includes(user.rol)) {
            if (ticket.asignadoAId !== user.id) {
                throw new common_1.ForbiddenException('Solo podés acceder a tus tickets asignados');
            }
        }
    }
    isTecnicoProveedor(user) {
        return user.rol === usuario_entity_1.RolEnum.TECNICO_PROVEEDOR;
    }
    async transicionarEstado(ticket, nuevoEstado, _userId, _comentario) {
        ticket.estado = nuevoEstado;
        if (nuevoEstado === ticket_entity_1.EstadoTicketEnum.RESUELTO)
            ticket.fechaResol = new Date();
        if (nuevoEstado === ticket_entity_1.EstadoTicketEnum.CERRADO) {
            ticket.fechaCierre = new Date();
            ticket.slaCumplido = ticket.slaVenceEn ? new Date() <= ticket.slaVenceEn : null;
        }
    }
    async registrarHistorial(ticketId, usuarioId, estadoAnterior, estadoNuevo, comentario) {
        await this.historialRepo.save({
            ticketId,
            usuarioId,
            estadoAnterior,
            estadoNuevo,
            comentario,
        });
    }
    calcularSla(prioridad) {
        const horasMap = { Critica: 4, Alta: 8, Media: 24, Baja: 72 };
        const horas = horasMap[prioridad] ?? 24;
        const date = new Date();
        date.setHours(date.getHours() + horas);
        return date;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_historial_entity_1.TicketHistorial)),
    __param(2, (0, typeorm_1.InjectRepository)(ticket_comentario_entity_1.TicketComentario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map