import {
  Injectable, NotFoundException, ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { Proveedor } from './entities/proveedor.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Software } from '../software/entities/software.entity';
import {
  CreateContratoDto, UpdateContratoDto, CreateProveedorDto, FilterContratoDto,
} from './dto/contrato.dto';
import { paginate } from '../common/pipes/pagination.dto';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Equipo)
    private readonly equipoRepo: Repository<Equipo>,
    @InjectRepository(Software)
    private readonly softwareRepo: Repository<Software>,
  ) {}

  // ── Contratos ─────────────────────────────────────────────────
  async findAllContratos(filter: FilterContratoDto) {
    const qb = this.contratoRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.proveedor', 'p');

    if (filter.q) {
      qb.andWhere('(c.nroContrato ILIKE :q OR p.nombre ILIKE :q)', { q: `%${filter.q}%` });
    }
    if (filter.estado)      qb.andWhere('c.estado = :estado', { estado: filter.estado });
    if (filter.proveedor_id) qb.andWhere('c.proveedorId = :pid', { pid: filter.proveedor_id });
    if (filter.por_vencer_dias) {
      qb.andWhere('c.fechaVenc BETWEEN CURRENT_DATE AND CURRENT_DATE + :days * INTERVAL \'1 day\'', {
        days: filter.por_vencer_dias,
      });
    }

    qb.orderBy('c.fechaVenc').skip(filter.skip).take(filter.take);
    const [data, total] = await qb.getManyAndCount();
    return paginate(data, total, filter);
  }

  async findOneContrato(id: number) {
    const contrato = await this.contratoRepo.findOne({
      where: { id },
      relations: ['proveedor', 'equipos', 'softwares'],
    });
    if (!contrato) throw new NotFoundException(`Contrato #${id} no encontrado`);
    return contrato;
  }

  async createContrato(dto: CreateContratoDto) {
    const exists = await this.contratoRepo.findOne({ where: { nroContrato: dto.nro_contrato } });
    if (exists) throw new ConflictException(`Contrato '${dto.nro_contrato}' ya existe`);

    const contrato = this.contratoRepo.create({
      nroContrato: dto.nro_contrato,
      proveedorId: dto.proveedor_id,
      tipo: dto.tipo,
      descripcion: dto.descripcion,
      fechaInicio: dto.fecha_inicio,
      fechaVenc: dto.fecha_venc,
      monto: dto.monto,
      moneda: dto.moneda ?? 'ARS',
      observaciones: dto.observaciones,
    });

    if (dto.equipo_ids?.length) {
      contrato.equipos = await this.equipoRepo.findByIds(dto.equipo_ids);
    }
    if (dto.software_ids?.length) {
      contrato.softwares = await this.softwareRepo.findByIds(dto.software_ids);
    }

    const saved = await this.contratoRepo.save(contrato);
    return this.findOneContrato(saved.id);
  }

  async updateContrato(id: number, dto: UpdateContratoDto) {
    const contrato = await this.contratoRepo.findOne({
      where: { id },
      relations: ['equipos', 'softwares'],
    });
    if (!contrato) throw new NotFoundException(`Contrato #${id} no encontrado`);

    if (dto.descripcion !== undefined)  contrato.descripcion = dto.descripcion;
    if (dto.fecha_venc !== undefined)   contrato.fechaVenc = dto.fecha_venc;
    if (dto.estado !== undefined)       contrato.estado = dto.estado;
    if (dto.monto !== undefined)        contrato.monto = dto.monto;
    if (dto.observaciones !== undefined) contrato.observaciones = dto.observaciones;
    if (dto.equipo_ids !== undefined) {
      contrato.equipos = dto.equipo_ids.length ? await this.equipoRepo.findByIds(dto.equipo_ids) : [];
    }
    if (dto.software_ids !== undefined) {
      contrato.softwares = dto.software_ids.length ? await this.softwareRepo.findByIds(dto.software_ids) : [];
    }

    await this.contratoRepo.save(contrato);
    return this.findOneContrato(id);
  }

  async removeContrato(id: number) {
    const contrato = await this.contratoRepo.findOne({ where: { id } });
    if (!contrato) throw new NotFoundException(`Contrato #${id} no encontrado`);
    await this.contratoRepo.remove(contrato);
  }

  // ── Proveedores ───────────────────────────────────────────────
  async findAllProveedores() {
    return this.proveedorRepo.find({ where: { activo: true }, order: { nombre: 'ASC' } });
  }

  async findOneProveedor(id: number) {
    const p = await this.proveedorRepo.findOne({
      where: { id },
      relations: ['contratos'],
    });
    if (!p) throw new NotFoundException(`Proveedor #${id} no encontrado`);
    return p;
  }

  async createProveedor(dto: CreateProveedorDto) {
    const exists = await this.proveedorRepo.findOne({ where: { nombre: dto.nombre } });
    if (exists) throw new ConflictException(`Proveedor '${dto.nombre}' ya existe`);
    const p = this.proveedorRepo.create({ ...dto });
    return this.proveedorRepo.save(p);
  }

  async updateProveedor(id: number, dto: CreateProveedorDto) {
    const p = await this.proveedorRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Proveedor #${id} no encontrado`);
    Object.assign(p, dto);
    return this.proveedorRepo.save(p);
  }
}
