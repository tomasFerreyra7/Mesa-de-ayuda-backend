import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Software, EstadoSwEnum } from './entities/software.entity';
import { SoftwareEquipo } from './entities/software-equipo.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateSoftwareDto, UpdateSoftwareDto, InstalarSoftwareDto, FilterSoftwareDto } from './dto/software.dto';
import { paginate } from '../common/pipes/pagination.dto';
import { assertEquipoEnAlcanceOperario, operarioDebeAlcancePorJuzgado, juzgadoIdsForUser } from '../common/utils/juzgado-scope.util';

@Injectable()
export class SoftwareService {
  constructor(
    @InjectRepository(Software)
    private readonly repo: Repository<Software>,
    @InjectRepository(SoftwareEquipo)
    private readonly instalRepo: Repository<SoftwareEquipo>,
    @InjectRepository(Equipo)
    private readonly equipoRepo: Repository<Equipo>,
  ) {}

  async findAll(filter: FilterSoftwareDto) {
    const qb = this.repo.createQueryBuilder('s');

    if (filter.q) {
      qb.andWhere('(s.nombre ILIKE :q OR s.nroSw ILIKE :q OR s.proveedor ILIKE :q)', {
        q: `%${filter.q}%`,
      });
    }
    if (filter.tipo) qb.andWhere('s.tipo = :tipo', { tipo: filter.tipo });
    if (filter.estado) qb.andWhere('s.estado = :estado', { estado: filter.estado });
    else qb.andWhere('s.estado != :baja', { baja: EstadoSwEnum.DADO_DE_BAJA });

    qb.orderBy('s.nombre').skip(filter.skip).take(filter.take);
    const [data, total] = await qb.getManyAndCount();
    return paginate(data, total, filter);
  }

  async findOne(id: number, user?: Usuario) {
    const sw = await this.repo.findOne({
      where: { id },
      relations: ['instalaciones', 'instalaciones.equipo', 'instalaciones.equipo.puesto', 'contratos'],
    });
    if (!sw) throw new NotFoundException(`Software #${id} no encontrado`);
    if (user && operarioDebeAlcancePorJuzgado(user)) {
      const ids = juzgadoIdsForUser(user);
      sw.instalaciones = (sw.instalaciones ?? []).filter((i) => {
        const jId = i.equipo?.puesto?.juzgadoId;
        return jId != null && ids.includes(jId);
      });
    }
    return sw;
  }

  async create(dto: CreateSoftwareDto) {
    if (dto.nro_sw) {
      const exists = await this.repo.findOne({ where: { nroSw: dto.nro_sw } });
      if (exists) throw new ConflictException(`N° SW '${dto.nro_sw}' ya existe`);
    }

    const sw = this.repo.create({
      nroSw: dto.nro_sw,
      nombre: dto.nombre,
      version: dto.version,
      tipo: dto.tipo,
      proveedor: dto.proveedor,
      tipoLicencia: dto.tipo_licencia,
      descripcionLic: dto.descripcion_lic,
      maxInstalaciones: dto.max_instalaciones,
      fechaVencimiento: dto.fecha_vencimiento,
      observaciones: dto.observaciones,
    });

    // Auto-asignar nroSw si no se pasó
    if (!dto.nro_sw) {
      const last = await this.repo.createQueryBuilder('s').orderBy('s.id', 'DESC').getOne();
      const nextNum = last ? last.id + 1 : 1;
      sw.nroSw = `SW-${String(nextNum).padStart(4, '0')}`;
    }

    const saved = await this.repo.save(sw);
    return this.findOne(saved.id, undefined);
  }

  async update(id: number, dto: UpdateSoftwareDto) {
    const sw = await this.repo.findOne({ where: { id } });
    if (!sw) throw new NotFoundException(`Software #${id} no encontrado`);

    Object.assign(sw, {
      ...(dto.nombre !== undefined && { nombre: dto.nombre }),
      ...(dto.version !== undefined && { version: dto.version }),
      ...(dto.tipo !== undefined && { tipo: dto.tipo }),
      ...(dto.tipo_licencia !== undefined && { tipoLicencia: dto.tipo_licencia }),
      ...(dto.descripcion_lic !== undefined && { descripcionLic: dto.descripcion_lic }),
      ...(dto.max_instalaciones !== undefined && { maxInstalaciones: dto.max_instalaciones }),
      ...(dto.fecha_vencimiento !== undefined && { fechaVencimiento: dto.fecha_vencimiento }),
      ...(dto.estado !== undefined && { estado: dto.estado }),
      ...(dto.observaciones !== undefined && { observaciones: dto.observaciones }),
    });

    await this.repo.save(sw);
    return this.findOne(id, undefined);
  }

  async darDeBaja(id: number) {
    const sw = await this.repo.findOne({ where: { id } });
    if (!sw) throw new NotFoundException(`Software #${id} no encontrado`);
    await this.repo.update(id, { estado: EstadoSwEnum.DADO_DE_BAJA });
  }

  // ── Instalaciones ─────────────────────────────────────────────
  async getInstalaciones(softwareId: number, user: Usuario) {
    const rows = await this.instalRepo.find({
      where: { softwareId, activo: true },
      relations: ['equipo', 'equipo.puesto', 'equipo.puesto.juzgado'],
    });
    if (!operarioDebeAlcancePorJuzgado(user)) return rows;
    const ids = juzgadoIdsForUser(user);
    return rows.filter((r) => {
      const jId = r.equipo?.puesto?.juzgadoId;
      return jId != null && ids.includes(jId);
    });
  }

  async instalar(softwareId: number, dto: InstalarSoftwareDto, user: Usuario) {
    const sw = await this.repo.findOne({ where: { id: softwareId } });
    if (!sw) throw new NotFoundException(`Software #${softwareId} no encontrado`);

    const eq = await this.equipoRepo.findOne({
      where: { id: dto.equipo_id },
      relations: ['puesto', 'puesto.juzgado'],
    });
    if (!eq) throw new NotFoundException(`Equipo #${dto.equipo_id} no encontrado`);
    assertEquipoEnAlcanceOperario(user, eq);

    // Verificar límite de licencias
    if (sw.maxInstalaciones && sw.instalacionesAct >= sw.maxInstalaciones) {
      throw new BadRequestException(`Límite de licencias alcanzado (${sw.maxInstalaciones} instalaciones)`);
    }

    const existe = await this.instalRepo.findOne({
      where: { softwareId, equipoId: dto.equipo_id },
    });
    if (existe) {
      if (existe.activo) throw new ConflictException('Ya está instalado en ese equipo');
      // Reactivar instalación existente
      await this.instalRepo.update(existe.id, { activo: true, versionInst: dto.version_inst, fechaInst: dto.fecha_inst });
    } else {
      await this.instalRepo.save({
        softwareId,
        equipoId: dto.equipo_id,
        versionInst: dto.version_inst,
        fechaInst: dto.fecha_inst,
      });
    }

    await this.repo.increment({ id: softwareId }, 'instalacionesAct', 1);
    return this.getInstalaciones(softwareId, user);
  }

  async desinstalar(softwareId: number, equipoId: number, user: Usuario) {
    const eq = await this.equipoRepo.findOne({
      where: { id: equipoId },
      relations: ['puesto', 'puesto.juzgado'],
    });
    if (!eq) throw new NotFoundException(`Equipo #${equipoId} no encontrado`);
    assertEquipoEnAlcanceOperario(user, eq);

    const inst = await this.instalRepo.findOne({
      where: { softwareId, equipoId, activo: true },
    });
    if (!inst) throw new NotFoundException('Instalación no encontrada');

    await this.instalRepo.update(inst.id, { activo: false });
    await this.repo.decrement({ id: softwareId }, 'instalacionesAct', 1);
  }
}
