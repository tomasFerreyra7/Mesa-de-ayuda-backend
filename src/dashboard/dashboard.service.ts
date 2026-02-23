import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, EstadoTicketEnum, PrioridadTicketEnum } from '../tickets/entities/ticket.entity';
import { Equipo, EstadoHwEnum } from '../equipos/entities/equipo.entity';
import { Contrato, EstadoContratoEnum } from '../contratos/entities/contrato.entity';
import { Software, EstadoSwEnum } from '../software/entities/software.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Ticket)  private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(Equipo)  private readonly equipoRepo: Repository<Equipo>,
    @InjectRepository(Contrato) private readonly contratoRepo: Repository<Contrato>,
    @InjectRepository(Software) private readonly softwareRepo: Repository<Software>,
  ) {}

  async getKpis() {
    const [
      ticketsAbiertos,
      ticketsEnProgreso,
      equiposActivos,
      contratosVigentes,
      contratosPorVencer,
      ticketsResueltosEstesMes,
      ticketsCerradosEsteMes,
    ] = await Promise.all([
      this.ticketRepo.count({ where: { estado: EstadoTicketEnum.ABIERTO } }),
      this.ticketRepo.count({ where: { estado: EstadoTicketEnum.EN_PROGRESO } }),
      this.equipoRepo.count({ where: { estado: EstadoHwEnum.ACTIVO } }),
      this.contratoRepo.count({ where: { estado: EstadoContratoEnum.VIGENTE } }),
      this.contratoRepo.count({ where: { estado: EstadoContratoEnum.POR_VENCER } }),
      this.ticketRepo
        .createQueryBuilder('t')
        .where('t.estado = :e', { e: EstadoTicketEnum.RESUELTO })
        .andWhere("date_trunc('month', t.fechaResol) = date_trunc('month', NOW())")
        .getCount(),
      this.ticketRepo
        .createQueryBuilder('t')
        .where('t.estado = :e', { e: EstadoTicketEnum.CERRADO })
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
    const alertas: Array<{
      tipo: string;
      mensaje: string;
      severidad: 'danger' | 'warning' | 'info';
      referencia_tipo: string;
      referencia_id: number;
    }> = [];

    // Contratos por vencer (30 días)
    const contratosPorVencer = await this.contratoRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.proveedor', 'p')
      .where("c.fechaVenc BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'")
      .andWhere("c.estado NOT IN ('Rescindido', 'Vencido')")
      .orderBy('c.fechaVenc')
      .getMany();

    for (const c of contratosPorVencer) {
      const dias = Math.ceil(
        (new Date(c.fechaVenc).getTime() - Date.now()) / 86400000,
      );
      alertas.push({
        tipo: 'contrato_por_vencer',
        mensaje: `Contrato ${c.nroContrato} (${c.proveedor?.nombre}) vence en ${dias} día${dias !== 1 ? 's' : ''}`,
        severidad: dias <= 7 ? 'danger' : 'warning',
        referencia_tipo: 'contrato',
        referencia_id: c.id,
      });
    }

    // Licencias vencidas
    const licenciasVencidas = await this.softwareRepo.find({
      where: { estado: EstadoSwEnum.VENCIDO },
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

    // Licencias por vencer (30 días)
    const licenciasPorVencer = await this.softwareRepo.find({
      where: { estado: EstadoSwEnum.POR_VENCER },
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

    // Tickets críticos sin asignar
    const criticos = await this.ticketRepo
      .createQueryBuilder('t')
      .where('t.prioridad = :p', { p: PrioridadTicketEnum.CRITICA })
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
}
