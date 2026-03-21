import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Ticket, EstadoTicketEnum, PrioridadTicketEnum } from '../tickets/entities/ticket.entity';
import { Equipo, EstadoHwEnum } from '../equipos/entities/equipo.entity';
import { Contrato, EstadoContratoEnum } from '../contratos/entities/contrato.entity';
import { Software, EstadoSwEnum } from '../software/entities/software.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { juzgadoIdsForUser, operarioDebeAlcancePorJuzgado } from '../common/utils/juzgado-scope.util';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Ticket)  private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(Equipo)  private readonly equipoRepo: Repository<Equipo>,
    @InjectRepository(Contrato) private readonly contratoRepo: Repository<Contrato>,
    @InjectRepository(Software) private readonly softwareRepo: Repository<Software>,
  ) {}

  async getKpis(user: Usuario) {
    if (!operarioDebeAlcancePorJuzgado(user)) {
      return this.getKpisGlobal();
    }

    const ids = juzgadoIdsForUser(user);
    if (ids.length === 0) {
      return {
        tickets_abiertos: 0,
        tickets_en_progreso: 0,
        equipos_activos: 0,
        contratos_vigentes: 0,
        contratos_por_vencer: 0,
        tickets_resueltos_mes: 0,
        tickets_cerrados_mes: 0,
      };
    }

    const [
      ticketsAbiertos,
      ticketsEnProgreso,
      equiposActivos,
      ticketsResueltosEstesMes,
      ticketsCerradosEsteMes,
    ] = await Promise.all([
      this.ticketRepo.count({ where: { estado: EstadoTicketEnum.ABIERTO, juzgadoId: In(ids) } }),
      this.ticketRepo.count({ where: { estado: EstadoTicketEnum.EN_PROGRESO, juzgadoId: In(ids) } }),
      this.equipoRepo
        .createQueryBuilder('e')
        .innerJoin('e.puesto', 'p')
        .where('e.estado = :est', { est: EstadoHwEnum.ACTIVO })
        .andWhere('p.juzgadoId IN (:...jids)', { jids: ids })
        .getCount(),
      this.ticketRepo
        .createQueryBuilder('t')
        .where('t.estado = :e', { e: EstadoTicketEnum.RESUELTO })
        .andWhere("date_trunc('month', t.fechaResol) = date_trunc('month', NOW())")
        .andWhere('t.juzgadoId IN (:...jids)', { jids: ids })
        .getCount(),
      this.ticketRepo
        .createQueryBuilder('t')
        .where('t.estado = :e', { e: EstadoTicketEnum.CERRADO })
        .andWhere("date_trunc('month', t.fechaCierre) = date_trunc('month', NOW())")
        .andWhere('t.juzgadoId IN (:...jids)', { jids: ids })
        .getCount(),
    ]);

    return {
      tickets_abiertos: ticketsAbiertos,
      tickets_en_progreso: ticketsEnProgreso,
      equipos_activos: equiposActivos,
      contratos_vigentes: 0,
      contratos_por_vencer: 0,
      tickets_resueltos_mes: ticketsResueltosEstesMes,
      tickets_cerrados_mes: ticketsCerradosEsteMes,
    };
  }

  private async getKpisGlobal() {
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

  async getAlertas(user: Usuario) {
    if (!operarioDebeAlcancePorJuzgado(user)) {
      return this.getAlertasGlobal();
    }

    const ids = juzgadoIdsForUser(user);
    const alertas: Array<{
      tipo: string;
      mensaje: string;
      severidad: 'danger' | 'warning' | 'info';
      referencia_tipo: string;
      referencia_id: number | null;
    }> = [];

    if (ids.length === 0) {
      return alertas;
    }

    const criticos = await this.ticketRepo
      .createQueryBuilder('t')
      .where('t.prioridad = :p', { p: PrioridadTicketEnum.CRITICA })
      .andWhere('t.asignadoAId IS NULL')
      .andWhere("t.estado = 'Abierto'")
      .andWhere('t.juzgadoId IN (:...jids)', { jids: ids })
      .getCount();

    if (criticos > 0) {
      alertas.push({
        tipo: 'tickets_criticos_sin_asignar',
        mensaje: `${criticos} ticket${criticos > 1 ? 's' : ''} crítico${criticos > 1 ? 's' : ''} sin asignar en tus juzgados`,
        severidad: 'danger',
        referencia_tipo: 'ticket',
        referencia_id: null,
      });
    }

    return alertas;
  }

  private async getAlertasGlobal() {
    const alertas: Array<{
      tipo: string;
      mensaje: string;
      severidad: 'danger' | 'warning' | 'info';
      referencia_tipo: string;
      referencia_id: number | null;
    }> = [];

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
