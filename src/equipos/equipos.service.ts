import {
  Injectable, NotFoundException, ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo, EstadoHwEnum } from './entities/equipo.entity';
import {
  CreateEquipoDto, UpdateEquipoDto, ReubicarEquipoDto, FilterEquipoDto,
} from './dto/equipo.dto';
import { paginate } from '../common/pipes/pagination.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly repo: Repository<Equipo>,
  ) {}

  async findAll(filter: FilterEquipoDto) {
    const qb = this.repo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.puesto', 'p')
      .leftJoinAndSelect('p.juzgado', 'j');

    if (filter.q) {
      qb.andWhere(
        '(e.nroInventario ILIKE :q OR e.marca ILIKE :q OR e.modelo ILIKE :q OR e.nroSerie ILIKE :q)',
        { q: `%${filter.q}%` },
      );
    }
    if (filter.clase)  qb.andWhere('e.clase = :clase', { clase: filter.clase });
    if (filter.estado) qb.andWhere('e.estado = :estado', { estado: filter.estado });
    if (filter.sin_asignar) qb.andWhere('e.puestoId IS NULL');
    if (filter.juzgado_id)  qb.andWhere('j.id = :jid', { jid: filter.juzgado_id });

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

    const equipo = this.repo.create({
      nroInventario: dto.nro_inventario,
      clase: dto.clase,
      subtipo: dto.subtipo,
      marca: dto.marca,
      modelo: dto.modelo,
      nroSerie: dto.nro_serie,
      estado: dto.estado,
      puestoId: dto.puesto_id,
      fechaAlta: dto.fecha_alta,
      observaciones: dto.observaciones,
    });

    const saved = await this.repo.save(equipo);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateEquipoDto) {
    const equipo = await this.repo.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);

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

    equipo.puestoId = dto.puesto_id ?? null;
    await this.repo.save(equipo);
    return this.findOne(id);
  }

  async darDeBaja(id: number) {
    const equipo = await this.repo.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo #${id} no encontrado`);
    await this.repo.update(id, { estado: EstadoHwEnum.DADO_DE_BAJA, fechaBaja: new Date().toISOString().split('T')[0] });
  }
}
