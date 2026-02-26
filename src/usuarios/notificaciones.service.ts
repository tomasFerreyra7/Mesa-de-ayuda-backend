import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { Usuario } from './entities/usuario.entity';
import {
  CreateNotificacionDto,
  UpdateNotificacionDto,
  FilterNotificacionDto,
} from './dto/notificacion.dto';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly repo: Repository<Notificacion>,
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  async findAllByUsuario(usuarioId: number, filter: FilterNotificacionDto) {
    const qb = this.repo
      .createQueryBuilder('n')
      .where('n.usuarioId = :usuarioId', { usuarioId });

    if (filter.leida !== undefined) {
      qb.andWhere('n.leida = :leida', { leida: filter.leida });
    }
    if (filter.tipo) {
      qb.andWhere('n.tipo = :tipo', { tipo: filter.tipo });
    }

    return qb.orderBy('n.createdAt', 'DESC').getMany();
  }

  async findOne(id: number, usuarioId: number) {
    const notif = await this.repo.findOne({ where: { id } });
    if (!notif) throw new NotFoundException(`Notificación #${id} no encontrada`);
    if (notif.usuarioId !== usuarioId) {
      throw new ForbiddenException('No puede acceder a esta notificación');
    }
    return notif;
  }

  async create(dto: CreateNotificacionDto) {
    const usuario = await this.usuariosRepo.findOne({ where: { id: dto.usuario_id } });
    if (!usuario) throw new NotFoundException(`Usuario #${dto.usuario_id} no encontrado`);

    const notif = this.repo.create({
      usuarioId: dto.usuario_id,
      tipo: dto.tipo,
      titulo: dto.titulo,
      mensaje: dto.mensaje,
      referenciaTipo: dto.referencia_tipo,
      referenciaId: dto.referencia_id,
    });
    return this.repo.save(notif);
  }

  async update(id: number, usuarioId: number, dto: UpdateNotificacionDto) {
    const notif = await this.repo.findOne({ where: { id } });
    if (!notif) throw new NotFoundException(`Notificación #${id} no encontrada`);
    if (notif.usuarioId !== usuarioId) {
      throw new ForbiddenException('No puede modificar esta notificación');
    }
    if (dto.leida !== undefined) notif.leida = dto.leida;
    await this.repo.save(notif);
    return notif;
  }

  async remove(id: number, usuarioId: number) {
    const notif = await this.repo.findOne({ where: { id } });
    if (!notif) throw new NotFoundException(`Notificación #${id} no encontrada`);
    if (notif.usuarioId !== usuarioId) {
      throw new ForbiddenException('No puede eliminar esta notificación');
    }
    await this.repo.remove(notif);
  }
}
