import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo, EstadoHwEnum } from './entities/equipo.entity';
import { Puesto } from '../ubicaciones/entities/puesto.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateEquipoDto, UpdateEquipoDto, ReubicarEquipoDto, FilterEquipoDto } from './dto/equipo.dto';
import { paginate } from '../common/pipes/pagination.dto';
import {
  assertEquipoEnAlcanceOperario,
  assertPuestoEnAlcanceOperario,
  juzgadoIdsForUser,
  operarioDebeAlcancePorJuzgado,
} from '../common/utils/juzgado-scope.util';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly repo: Repository<Equipo>,
    @InjectRepository(Puesto)
    private readonly puestoRepo: Repository<Puesto>,
  ) {}

  async findAll(filter: FilterEquipoDto, user: Usuario) {
    const qb = this.repo.createQueryBuilder('e').leftJoinAndSelect('e.puesto', 'p').leftJoinAndSelect('p.juzgado', 'j');

    if (operarioDebeAlcancePorJuzgado(user)) {
      const jids = juzgadoIdsForUser(user);
      if (jids.length === 0) {
        return paginate([], 0, filter);
      }
      qb.andWhere('j.id IN (:...juzgadoIds)', { juzgadoIds: jids });
    }

    if (filter.q) {
      qb.andWhere('(e.nroInventario ILIKE :q OR e.marca ILIKE :q OR e.modelo ILIKE :q OR e.nroSerie ILIKE :q)', { q: `%${filter.q}%` });
    }
    if (filter.clase) qb.andWhere('e.clase = :clase', { clase: filter.clase });
    if (filter.estado) qb.andWhere('e.estado = :estado', { estado: filter.estado });
    else qb.andWhere('e.estado != :baja', { baja: EstadoHwEnum.DADO_DE_BAJA });
    if (filter.sin_asignar) qb.andWhere('e.puestoId IS NULL');
    if (filter.juzgado_id) qb.andWhere('j.id = :jid', { jid: filter.juzgado_id });

    qb.orderBy('e.nroInventario').skip(filter.skip).take(filter.take);
    const [data, total] = await qb.getManyAndCount();
    return paginate(data, total, filter);
  }

  async findOne(id: number, user: Usuario) {
    const equipo = await this.repo.findOne({
      where: { id },
      relations: ['puesto', 'puesto.juzgado', 'softwareInstalado', 'softwareInstalado.software', 'contratos'],
    });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    assertEquipoEnAlcanceOperario(user, equipo);
    return equipo;
  }

  async create(dto: CreateEquipoDto, user: Usuario) {
    const nroInventario = dto.nro_inventario.trim();
    if (!nroInventario) {
      throw new BadRequestException('N° inventario no puede estar vacío');
    }

    const exists = await this.repo.findOne({ where: { nroInventario } });
    if (exists) throw new ConflictException(`N° inventario '${nroInventario}' ya existe`);

    // nro_serie vacío -> null para no violar UNIQUE (varios equipos sin número de serie)
    const nroSerie = dto.nro_serie?.trim() ? dto.nro_serie.trim() : null;
    if (nroSerie) {
      const existsSerie = await this.repo.findOne({ where: { nroSerie } });
      if (existsSerie) throw new ConflictException(`N° de serie '${nroSerie}' ya existe`);
    }

    if (dto.puesto_id != null) {
      const puesto = await this.puestoRepo.findOne({ where: { id: dto.puesto_id } });
      if (!puesto) throw new BadRequestException(`Puesto #${dto.puesto_id} no existe`);
      assertPuestoEnAlcanceOperario(user, puesto);
    } else if (operarioDebeAlcancePorJuzgado(user)) {
      // Operario debe tener al menos un juzgado para dar de alta (aunque sea sin puesto aún)
      if (juzgadoIdsForUser(user).length === 0) {
        throw new BadRequestException('No tenés juzgados asignados; no podés registrar equipos hasta que un administrador te asigne uno.');
      }
    }

    const equipo = this.repo.create({
      nroInventario,
      clase: dto.clase,
      subtipo: dto.subtipo?.trim() || null,
      marca: dto.marca?.trim() || null,
      modelo: dto.modelo?.trim() || null,
      nroSerie,
      estado: dto.estado ?? EstadoHwEnum.ACTIVO,
      puestoId: dto.puesto_id ?? null,
      fechaAlta: dto.fecha_alta?.trim() || null,
      observaciones: dto.observaciones?.trim() || null,
    });

    const saved = await this.repo.save(equipo);
    return this.findOne(saved.id, user);
  }

  async update(id: number, dto: UpdateEquipoDto, user: Usuario) {
    const equipo = await this.repo.findOne({
      where: { id },
      relations: ['puesto', 'puesto.juzgado'],
    });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    assertEquipoEnAlcanceOperario(user, equipo);

    if (dto.puesto_id !== undefined && dto.puesto_id != null) {
      const puesto = await this.puestoRepo.findOne({ where: { id: dto.puesto_id } });
      if (!puesto) throw new BadRequestException(`Puesto #${dto.puesto_id} no existe`);
      assertPuestoEnAlcanceOperario(user, puesto);
    }

    Object.assign(equipo, {
      ...(dto.clase !== undefined && { clase: dto.clase }),
      ...(dto.subtipo !== undefined && { subtipo: dto.subtipo }),
      ...(dto.marca !== undefined && { marca: dto.marca }),
      ...(dto.modelo !== undefined && { modelo: dto.modelo }),
      ...(dto.nro_serie !== undefined && { nroSerie: dto.nro_serie }),
      ...(dto.estado !== undefined && { estado: dto.estado }),
      ...(dto.puesto_id !== undefined && { puestoId: dto.puesto_id }),
      ...(dto.observaciones !== undefined && { observaciones: dto.observaciones }),
    });

    await this.repo.save(equipo);
    return this.findOne(id, user);
  }

  async reubicar(id: number, dto: ReubicarEquipoDto, user: Usuario) {
    const equipo = await this.repo.findOne({
      where: { id },
      relations: ['puesto', 'puesto.juzgado'],
    });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    assertEquipoEnAlcanceOperario(user, equipo);

    const nuevoPuestoId = dto.puesto_id ?? null;
    if (nuevoPuestoId != null) {
      const puesto = await this.puestoRepo.findOne({ where: { id: nuevoPuestoId } });
      if (!puesto) throw new BadRequestException(`Puesto #${nuevoPuestoId} no existe`);
      assertPuestoEnAlcanceOperario(user, puesto);
    }
    equipo.puestoId = nuevoPuestoId;
    await this.repo.save(equipo);
    return this.findOne(id, user);
  }

  async darDeBaja(id: number) {
    const equipo = await this.repo.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    await this.repo.update(id, { estado: EstadoHwEnum.DADO_DE_BAJA, fechaBaja: new Date().toISOString().split('T')[0] });
  }
}
