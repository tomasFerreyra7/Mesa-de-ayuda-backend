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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const contrato_entity_1 = require("../contratos/entities/contrato.entity");
const software_entity_1 = require("../software/entities/software.entity");
let DashboardService = class DashboardService {
    constructor(ticketRepo, equipoRepo, contratoRepo, softwareRepo) {
        this.ticketRepo = ticketRepo;
        this.equipoRepo = equipoRepo;
        this.contratoRepo = contratoRepo;
        this.softwareRepo = softwareRepo;
    }
    async getKpis() {
        const [ticketsAbiertos, ticketsEnProgreso, equiposActivos, contratosVigentes, contratosPorVencer, ticketsResueltosEstesMes, ticketsCerradosEsteMes,] = await Promise.all([
            this.ticketRepo.count({ where: { estado: ticket_entity_1.EstadoTicketEnum.ABIERTO } }),
            this.ticketRepo.count({ where: { estado: ticket_entity_1.EstadoTicketEnum.EN_PROGRESO } }),
            this.equipoRepo.count({ where: { estado: equipo_entity_1.EstadoHwEnum.ACTIVO } }),
            this.contratoRepo.count({ where: { estado: contrato_entity_1.EstadoContratoEnum.VIGENTE } }),
            this.contratoRepo.count({ where: { estado: contrato_entity_1.EstadoContratoEnum.POR_VENCER } }),
            this.ticketRepo
                .createQueryBuilder('t')
                .where('t.estado = :e', { e: ticket_entity_1.EstadoTicketEnum.RESUELTO })
                .andWhere("date_trunc('month', t.fechaResol) = date_trunc('month', NOW())")
                .getCount(),
            this.ticketRepo
                .createQueryBuilder('t')
                .where('t.estado = :e', { e: ticket_entity_1.EstadoTicketEnum.CERRADO })
                .andWhere("date_trunc('month', t.fechaCierre) = date_trunc('month', NOW())")
                .getCount(),
        ]);
        return {
            tickets_abiertos: ticketsAbiertos,
            tickets_en_progreso: ticketsEnProgreso,
            equipos_activos: equiposActivos,
            contratos_vigentes: contratosVigentes,
            contratos_por_vencer: contratosPorVencer,
            tickets_resueltos_mes: ticketsResueltosEstesMes,
            tickets_cerrados_mes: ticketsCerradosEsteMes,
        };
    }
    async getAlertas() {
        const alertas = [];
        const contratosPorVencer = await this.contratoRepo
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.proveedor', 'p')
            .where("c.fechaVenc BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'")
            .andWhere("c.estado NOT IN ('Rescindido', 'Vencido')")
            .orderBy('c.fechaVenc')
            .getMany();
        for (const c of contratosPorVencer) {
            const dias = Math.ceil((new Date(c.fechaVenc).getTime() - Date.now()) / 86400000);
            alertas.push({
                tipo: 'contrato_por_vencer',
                mensaje: `Contrato ${c.nroContrato} (${c.proveedor?.nombre}) vence en ${dias} día${dias !== 1 ? 's' : ''}`,
                severidad: dias <= 7 ? 'danger' : 'warning',
                referencia_tipo: 'contrato',
                referencia_id: c.id,
            });
        }
        const licenciasVencidas = await this.softwareRepo.find({
            where: { estado: software_entity_1.EstadoSwEnum.VENCIDO },
        });
        for (const sw of licenciasVencidas) {
            alertas.push({
                tipo: 'licencia_vencida',
                mensaje: `Licencia de ${sw.nombre} está vencida`,
                severidad: 'danger',
                referencia_tipo: 'software',
                referencia_id: sw.id,
            });
        }
        const licenciasPorVencer = await this.softwareRepo.find({
            where: { estado: software_entity_1.EstadoSwEnum.POR_VENCER },
        });
        for (const sw of licenciasPorVencer) {
            alertas.push({
                tipo: 'licencia_por_vencer',
                mensaje: `Licencia de ${sw.nombre} está próxima a vencer`,
                severidad: 'warning',
                referencia_tipo: 'software',
                referencia_id: sw.id,
            });
        }
        const criticos = await this.ticketRepo
            .createQueryBuilder('t')
            .where('t.prioridad = :p', { p: ticket_entity_1.PrioridadTicketEnum.CRITICA })
            .andWhere('t.asignadoAId IS NULL')
            .andWhere("t.estado = 'Abierto'")
            .getCount();
        if (criticos > 0) {
            alertas.push({
                tipo: 'tickets_criticos_sin_asignar',
                mensaje: `${criticos} ticket${criticos > 1 ? 's' : ''} crítico${criticos > 1 ? 's' : ''} sin asignar`,
                severidad: 'danger',
                referencia_tipo: 'ticket',
                referencia_id: null,
            });
        }
        return alertas;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __param(2, (0, typeorm_1.InjectRepository)(contrato_entity_1.Contrato)),
    __param(3, (0, typeorm_1.InjectRepository)(software_entity_1.Software)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map