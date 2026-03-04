import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, RolEnum } from './entities/usuario.entity';
import { Juzgado } from '../ubicaciones/entities/juzgado.entity';
import { CreateUsuarioDto, UpdateUsuarioDto, FilterUsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
    @InjectRepository(Juzgado)
    private readonly juzgadosRepo: Repository<Juzgado>,
  ) {}

  async findAll(filter: FilterUsuarioDto) {
    const qb = this.repo.createQueryBuilder('u').leftJoinAndSelect('u.juzgados', 'j');

    if (filter.q) {
      qb.andWhere('(u.nombre ILIKE :q OR u.email ILIKE :q)', { q: `%${filter.q}%` });
    }
    if (filter.rol) qb.andWhere('u.rol = :rol', { rol: filter.rol });
    if (filter.activo !== undefined) qb.andWhere('u.activo = :activo', { activo: filter.activo });
    else qb.andWhere('u.activo = true');

    const users = await qb.orderBy('u.nombre').getMany();
    return users.map(this.sanitize);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['juzgados'],
    });
    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);
    return this.sanitize(user);
  }

  async create(dto: CreateUsuarioDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya está registrado');

    const hash = await bcrypt.hash(dto.password, 12);
    const user = this.repo.create({
      nombre: dto.nombre,
      email: dto.email,
      passwordHash: hash,
      iniciales: dto.iniciales,
      rol: dto.rol,
      avatarColor: dto.avatarColor,
    });

    if (dto.juzgadoIds?.length) {
      user.juzgados = await this.juzgadosRepo.findByIds(dto.juzgadoIds);
    }

    const saved = await this.repo.save(user);
    return this.sanitize(saved);
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const user = await this.repo.findOne({ where: { id }, relations: ['juzgados'] });
    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);

    if (dto.password) {
      (user as any).passwordHash = await bcrypt.hash(dto.password, 12);
    }
    if (dto.nombre !== undefined) user.nombre = dto.nombre;
    if (dto.email !== undefined) {
      const dup = await this.repo.findOne({ where: { email: dto.email } });
      if (dup && dup.id !== id) throw new ConflictException('El email ya está en uso');
      user.email = dto.email;
    }
    if (dto.iniciales !== undefined) user.iniciales = dto.iniciales;
    if (dto.rol !== undefined) user.rol = dto.rol;
    if (dto.activo !== undefined) user.activo = dto.activo;
    if (dto.avatarColor !== undefined) user.avatarColor = dto.avatarColor;
    if (dto.juzgadoIds !== undefined) {
      user.juzgados = dto.juzgadoIds.length ? await this.juzgadosRepo.findByIds(dto.juzgadoIds) : [];
    }

    const saved = await this.repo.save(user);
    return this.sanitize(saved);
  }

  async deactivate(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);
    await this.repo.update(id, { activo: false });
  }

  async getTecnicosDisponibles(juzgadoId?: number) {
    const qb = this.repo
      .createQueryBuilder('u')
      .leftJoin('u.juzgados', 'j')
      .addSelect('u.id')
      .where('u.activo = true')
      .andWhere('u.rol IN (:...roles)', {
        roles: [RolEnum.TECNICO_INTERNO, RolEnum.TECNICO_PROVEEDOR],
      });

    if (juzgadoId) {
      qb.andWhere('j.id = :juzgadoId', { juzgadoId });
    }

    const tecnicos = await qb.getMany();

    // Contar tickets activos por técnico
    const counts = await this.repo.manager.query(`
      SELECT asignado_a_id, COUNT(*) as tickets_activos
      FROM pj.ticket
      WHERE estado NOT IN ('Cerrado', 'Resuelto') AND asignado_a_id IS NOT NULL
      GROUP BY asignado_a_id
    `);
    const countMap = Object.fromEntries(counts.map((r) => [r.asignado_a_id, +r.tickets_activos]));

    return tecnicos.map((u) => ({
      ...this.sanitize(u),
      tickets_activos: countMap[u.id] ?? 0,
    }));
  }

  private sanitize(user: Usuario) {
    const { passwordHash, ...safe } = user as any;
    return safe;
  }
}
