import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo, EstadoHwEnum } from './entities/equipo.entity';
import { Puesto } from '../ubicaciones/entities/puesto.entity';
import { CreateEquipoDto, UpdateEquipoDto, ReubicarEquipoDto, FilterEquipoDto } from './dto/equipo.dto';
import { paginate } from '../common/pipes/pagination.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly repo: Repository<Equipo>,
    @InjectRepository(Puesto)
    private readonly puestoRepo: Repository<Puesto>,
  ) {}

  async findAll(filter: FilterEquipoDto) {
    const qb = this.repo.createQueryBuilder('e').leftJoinAndSelect('e.puesto', 'p').leftJoinAndSelect('p.juzgado', 'j');

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

  async findOne(id: number) {
    const equipo = await this.repo.findOne({
      where: { id },
      relations: ['puesto', 'puesto.juzgado', 'softwareInstalado', 'softwareInstalado.software', 'contratos'],
    });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    return equipo;
  }

  async create(dto: CreateEquipoDto) {
    const exists = await this.repo.findOne({ where: { nroInventario: dto.nro_inventario } });
    if (exists) throw new ConflictException(`N° inventario '${dto.nro_inventario}' ya existe`);

    // nro_serie vacío -> null para no violar UNIQUE (varios equipos sin número de serie)
    const nroSerie = dto.nro_serie?.trim() ? dto.nro_serie.trim() : null;
    if (nroSerie) {
      const existsSerie = await this.repo.findOne({ where: { nroSerie } });
      if (existsSerie) throw new ConflictException(`N° de serie '${nroSerie}' ya existe`);
    }

    if (dto.puesto_id != null) {
      const puesto = await this.puestoRepo.findOne({ where: { id: dto.puesto_id } });
      if (!puesto) throw new BadRequestException(`Puesto #${dto.puesto_id} no existe`);
    }

    const equipo = this.repo.create({
      nroInventario: dto.nro_inventario.trim(),
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
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateEquipoDto) {
    const equipo = await this.repo.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);

    // OneToOne con Puesto: si asignamos un puesto_id, ese puesto solo puede estar en un equipo.
    // Liberar ese puesto de cualquier otro equipo antes de asignarlo a este.
    if (dto.puesto_id !== undefined && dto.puesto_id != null) {
      await this.repo.update({ puestoId: dto.puesto_id }, { puestoId: null });
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
    return this.findOne(id);
  }

  async reubicar(id: number, dto: ReubicarEquipoDto) {
    const equipo = await this.repo.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);

    const nuevoPuestoId = dto.puesto_id ?? null;
    // OneToOne: si asignamos un puesto, liberarlo de cualquier otro equipo antes.
    if (nuevoPuestoId != null) {
      await this.repo.update({ puestoId: nuevoPuestoId }, { puestoId: null });
    }
    equipo.puestoId = nuevoPuestoId;
    await this.repo.save(equipo);
    return this.findOne(id);
  }

  async darDeBaja(id: number) {
    const equipo = await this.repo.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    await this.repo.update(id, { estado: EstadoHwEnum.DADO_DE_BAJA, fechaBaja: new Date().toISOString().split('T')[0] });
  }
}
