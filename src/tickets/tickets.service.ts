import {
  Injectable, NotFoundException, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, EstadoTicketEnum, TipoTicketEnum } from './entities/ticket.entity';
import { TicketHistorial } from './entities/ticket-historial.entity';
import { TicketComentario } from './entities/ticket-comentario.entity';
import { Usuario, RolEnum } from '../usuarios/entities/usuario.entity';
import {
  CreateTicketDto, UpdateTicketDto, CambiarEstadoDto,
  AsignarTicketDto, CreateComentarioDto, FilterTicketDto,
} from './dto/ticket.dto';
import { paginate } from '../common/pipes/pagination.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
    @InjectRepository(TicketHistorial)
    private readonly historialRepo: Repository<TicketHistorial>,
    @InjectRepository(TicketComentario)
    private readonly comentariosRepo: Repository<TicketComentario>,
  ) {}

  async findAll(filter: FilterTicketDto, currentUser: Usuario) {
    const qb = this.repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.creadoPor', 'cp')
      .leftJoinAndSelect('t.asignadoA', 'aa')
      .leftJoinAndSelect('t.juzgado', 'j')
      .leftJoinAndSelect('t.equipo', 'e')
      .orderBy('t.fechaCreacion', 'DESC');

    // Técnicos solo ven sus tickets
    if ([RolEnum.TECNICO_INTERNO, RolEnum.TECNICO_PROVEEDOR].includes(currentUser.rol)) {
      qb.andWhere('t.asignadoAId = :uid', { uid: currentUser.id });
    }

    if (filter.q) {
      qb.andWhere(
        '(t.asunto ILIKE :q OR t.nroTicket ILIKE :q OR t.descripcion ILIKE :q)',
        { q: `%${filter.q}%` },
      );
    }
    if (filter.estado)      qb.andWhere('t.estado = :estado', { estado: filter.estado });
    if (filter.prioridad)   qb.andWhere('t.prioridad = :p', { p: filter.prioridad });
    if (filter.tipo)        qb.andWhere('t.tipo = :tipo', { tipo: filter.tipo });
    if (filter.asignado_a_id) qb.andWhere('t.asignadoAId = :aid', { aid: filter.asignado_a_id });
    if (filter.juzgado_id)  qb.andWhere('t.juzgadoId = :jid', { jid: filter.juzgado_id });
    if (filter.equipo_id)   qb.andWhere('t.equipoId = :eid', { eid: filter.equipo_id });

    qb.skip(filter.skip).take(filter.take);
    const [data, total] = await qb.getManyAndCount();
    return paginate(data, total, filter);
  }

  async findOne(id: number, currentUser: Usuario) {
    const ticket = await this.repo.findOne({
      where: { id },
      relations: ['creadoPor', 'asignadoA', 'juzgado', 'equipo', 'software'],
    });
    if (!ticket) throw new NotFoundException(`Ticket #${id} no encontrado`);
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

  async create(dto: CreateTicketDto, currentUser: Usuario) {
    // Validaciones de negocio
    if (dto.tipo === TipoTicketEnum.HARDWARE && !dto.equipo_id) {
      throw new BadRequestException('Se requiere equipo_id para tickets de Hardware');
    }
    if (dto.tipo === TipoTicketEnum.SOFTWARE && !dto.software_id) {
      throw new BadRequestException('Se requiere software_id para tickets de Software');
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
      // SLA automático según prioridad
      slaVenceEn: this.calcularSla(dto.prioridad),
    });

    const saved = await this.repo.save(ticket);
    return this.findOne(saved.id, currentUser);
  }

  async update(id: number, dto: UpdateTicketDto, currentUser: Usuario) {
    const ticket = await this.repo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket #${id} no encontrado`);
    this.checkAccess(ticket, currentUser);

    // Técnicos solo pueden cambiar estado
    if ([RolEnum.TECNICO_INTERNO, RolEnum.TECNICO_PROVEEDOR].includes(currentUser.rol)) {
      if (dto.asignado_a_id || dto.prioridad || dto.asunto) {
        throw new ForbiddenException('Los técnicos solo pueden cambiar el estado');
      }
    }

    const estadoAnterior = ticket.estado;

    if (dto.asunto !== undefined)       ticket.asunto = dto.asunto;
    if (dto.descripcion !== undefined)  ticket.descripcion = dto.descripcion;
    if (dto.prioridad !== undefined)    ticket.prioridad = dto.prioridad;
    if (dto.asignado_a_id !== undefined) {
      ticket.asignadoAId = dto.asignado_a_id;
      ticket.fechaAsig = new Date();
    }
    if (dto.estado !== undefined) {
      await this.transicionarEstado(ticket, dto.estado, currentUser.id, null);
    }

    // Registrar historial si cambió el estado
    if (dto.estado && dto.estado !== estadoAnterior) {
      await this.registrarHistorial(ticket.id, currentUser.id, estadoAnterior, dto.estado);
    }

    await this.repo.save(ticket);
    return this.findOne(id, currentUser);
  }

  async cambiarEstado(id: number, dto: CambiarEstadoDto, currentUser: Usuario) {
    const ticket = await this.repo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket #${id} no encontrado`);
    this.checkAccess(ticket, currentUser);

    const estadoAnterior = ticket.estado;
    await this.transicionarEstado(ticket, dto.estado, currentUser.id, dto.comentario);
    await this.repo.save(ticket);
    await this.registrarHistorial(id, currentUser.id, estadoAnterior, dto.estado, dto.comentario);

    return this.findOne(id, currentUser);
  }

  async asignar(id: number, dto: AsignarTicketDto, currentUser: Usuario) {
    const ticket = await this.repo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket #${id} no encontrado`);

    ticket.asignadoAId = dto.tecnico_id;
    ticket.fechaAsig = new Date();
    if (ticket.estado === EstadoTicketEnum.ABIERTO) {
      ticket.estado = EstadoTicketEnum.EN_PROGRESO;
    }

    await this.repo.save(ticket);
    await this.registrarHistorial(id, currentUser.id, EstadoTicketEnum.ABIERTO, EstadoTicketEnum.EN_PROGRESO, `Asignado a técnico #${dto.tecnico_id}`);

    return this.findOne(id, currentUser);
  }

  async remove(id: number) {
    const ticket = await this.repo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket #${id} no encontrado`);
    await this.repo.remove(ticket);
  }

  // ── Comentarios ──────────────────────────────────────────────
  async getComentarios(ticketId: number, currentUser: Usuario) {
    const ticket = await this.repo.findOne({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException();
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

  async addComentario(ticketId: number, dto: CreateComentarioDto, currentUser: Usuario) {
    const ticket = await this.repo.findOne({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException();
    this.checkAccess(ticket, currentUser);

    // Técnico proveedor no puede crear notas internas
    if (this.isTecnicoProveedor(currentUser) && dto.interno) {
      throw new ForbiddenException('No permitido crear notas internas');
    }

    const comentario = this.comentariosRepo.create({
      ticketId,
      usuarioId: currentUser.id,
      texto: dto.texto,
      interno: dto.interno ?? false,
    });
    return this.comentariosRepo.save(comentario);
  }

  async getHistorial(ticketId: number, currentUser: Usuario) {
    const ticket = await this.repo.findOne({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException(`Ticket #${ticketId} no encontrado`);
    this.checkAccess(ticket, currentUser);
    return this.historialRepo.find({
      where: { ticketId },
      relations: ['usuario'],
      order: { fecha: 'ASC' },
    });
  }

  // ── Helpers privados ─────────────────────────────────────────
  private checkAccess(ticket: Ticket, user: Usuario) {
    if ([RolEnum.TECNICO_INTERNO, RolEnum.TECNICO_PROVEEDOR].includes(user.rol)) {
      if (ticket.asignadoAId !== user.id) {
        throw new ForbiddenException('Solo podés acceder a tus tickets asignados');
      }
    }
  }

  private isTecnicoProveedor(user: Usuario) {
    return user.rol === RolEnum.TECNICO_PROVEEDOR;
  }

  private async transicionarEstado(
    ticket: Ticket,
    nuevoEstado: EstadoTicketEnum,
    _userId: number,
    _comentario: string | null,
  ) {
    ticket.estado = nuevoEstado;
    if (nuevoEstado === EstadoTicketEnum.RESUELTO) ticket.fechaResol = new Date();
    if (nuevoEstado === EstadoTicketEnum.CERRADO) {
      ticket.fechaCierre = new Date();
      ticket.slaCumplido = ticket.slaVenceEn ? new Date() <= ticket.slaVenceEn : null;
    }
  }

  private async registrarHistorial(
    ticketId: number,
    usuarioId: number,
    estadoAnterior: EstadoTicketEnum,
    estadoNuevo: EstadoTicketEnum,
    comentario?: string,
  ) {
    await this.historialRepo.save({
      ticketId,
      usuarioId,
      estadoAnterior,
      estadoNuevo,
      comentario,
    });
  }

  private calcularSla(prioridad: string): Date {
    const horasMap = { Critica: 4, Alta: 8, Media: 24, Baja: 72 };
    const horas = horasMap[prioridad] ?? 24;
    const date = new Date();
    date.setHours(date.getHours() + horas);
    return date;
  }
}
