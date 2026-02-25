import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Circunscripcion } from './entities/circunscripcion.entity';
import { Distrito } from './entities/distrito.entity';
import { Juzgado } from './entities/juzgado.entity';
import { Puesto } from './entities/puesto.entity';
import {
  CreateCircunscripcionDto,
  UpdateCircunscripcionDto,
  CreateDistritoDto,
  UpdateDistritoDto,
  CreateJuzgadoDto,
  UpdateJuzgadoDto,
  CreatePuestoDto,
  FilterDistritoDto,
  FilterJuzgadoDto,
} from './dto/ubicacion.dto';

@Injectable()
export class UbicacionesService {
  constructor(
    @InjectRepository(Circunscripcion)
    private readonly circRepo: Repository<Circunscripcion>,
    @InjectRepository(Distrito)
    private readonly distRepo: Repository<Distrito>,
    @InjectRepository(Juzgado)
    private readonly juzgadoRepo: Repository<Juzgado>,
    @InjectRepository(Puesto)
    private readonly puestoRepo: Repository<Puesto>,
  ) {}

  // Árbol completo: circunscripciones → distritos (solo activos)
  async getArbol() {
    const circs = await this.circRepo.find({
      where: { activo: true },
      relations: ['distritos'],
      order: { codigo: 'ASC' },
    });
    circs.forEach((c) => {
      c.distritos = (c.distritos || []).filter((d) => d.activo);
    });
    return circs;
  }

  async createCircunscripcion(dto: CreateCircunscripcionDto) {
    const exists = await this.circRepo.findOne({ where: { codigo: dto.codigo } });
    if (exists) throw new ConflictException(`Código '${dto.codigo}' ya existe`);
    const circ = this.circRepo.create({
      codigo: dto.codigo,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
    });
    return this.circRepo.save(circ);
  }

  async updateCircunscripcion(id: number, dto: UpdateCircunscripcionDto) {
    const c = await this.circRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException(`Circunscripción #${id} no encontrada`);
    Object.assign(c, {
      ...(dto.nombre !== undefined && { nombre: dto.nombre }),
      ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
      ...(dto.activo !== undefined && { activo: dto.activo }),
    });
    return this.circRepo.save(c);
  }

  async createDistrito(dto: CreateDistritoDto) {
    const circ = await this.circRepo.findOne({ where: { id: dto.circunscripcion_id } });
    if (!circ) throw new NotFoundException(`Circunscripción #${dto.circunscripcion_id} no encontrada`);
    const exists = await this.distRepo.findOne({ where: { codigo: dto.codigo } });
    if (exists) throw new ConflictException(`Código '${dto.codigo}' ya existe`);
    const dist = this.distRepo.create({
      circunscripcionId: dto.circunscripcion_id,
      codigo: dto.codigo,
      nombre: dto.nombre,
      edificio: dto.edificio,
      direccion: dto.direccion,
    });
    return this.distRepo.save(dist);
  }

  async updateDistrito(id: number, dto: UpdateDistritoDto) {
    const d = await this.distRepo.findOne({ where: { id } });
    if (!d) throw new NotFoundException(`Distrito #${id} no encontrado`);
    Object.assign(d, {
      ...(dto.nombre !== undefined && { nombre: dto.nombre }),
      ...(dto.edificio !== undefined && { edificio: dto.edificio }),
      ...(dto.direccion !== undefined && { direccion: dto.direccion }),
      ...(dto.activo !== undefined && { activo: dto.activo }),
    });
    return this.distRepo.save(d);
  }

  async findDistritos(filter: FilterDistritoDto) {
    const qb = this.distRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.circunscripcion', 'c');
    if (filter.circunscripcion_id) {
      qb.andWhere('d.circunscripcionId = :cid', { cid: filter.circunscripcion_id });
    }
    if (filter.activo !== undefined) {
      qb.andWhere('d.activo = :activo', { activo: filter.activo });
    } else {
      qb.andWhere('d.activo = true');
    }
    return qb.orderBy('d.nombre').getMany();
  }

  async removeCircunscripcion(id: number) {
    const c = await this.circRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException(`Circunscripción #${id} no encontrada`);
    c.activo = false;
    await this.circRepo.save(c);
  }

  async removeDistrito(id: number) {
    const d = await this.distRepo.findOne({ where: { id } });
    if (!d) throw new NotFoundException(`Distrito #${id} no encontrado`);
    d.activo = false;
    await this.distRepo.save(d);
  }

  async findJuzgados(filter: FilterJuzgadoDto) {
    const qb = this.juzgadoRepo.createQueryBuilder('j').leftJoinAndSelect('j.distrito', 'd').leftJoinAndSelect('d.circunscripcion', 'c');

    if (filter.q) {
      qb.andWhere('(j.nombre ILIKE :q OR j.codigo ILIKE :q)', { q: `%${filter.q}%` });
    }
    if (filter.distrito_id) qb.andWhere('j.distritoId = :did', { did: filter.distrito_id });
    if (filter.activo !== undefined) qb.andWhere('j.activo = :activo', { activo: filter.activo });
    else qb.andWhere('j.activo = true');

    return qb.orderBy('j.nombre').getMany();
  }

  async findOneJuzgado(id: number) {
    const j = await this.juzgadoRepo.findOne({
      where: { id },
      relations: ['distrito', 'puestos', 'puestos.equipo'],
    });
    if (!j) throw new NotFoundException(`Juzgado #${id} no encontrado`);
    return j;
  }

  async createJuzgado(dto: CreateJuzgadoDto) {
    const exists = await this.juzgadoRepo.findOne({ where: { codigo: dto.codigo } });
    if (exists) throw new ConflictException(`Código '${dto.codigo}' ya existe`);

    const juzgado = this.juzgadoRepo.create({
      distritoId: dto.distrito_id,
      codigo: dto.codigo,
      nombre: dto.nombre,
      tipo: dto.tipo,
      piso: dto.piso,
    });
    const saved = await this.juzgadoRepo.save(juzgado);
    return this.findOneJuzgado(saved.id);
  }

  async updateJuzgado(id: number, dto: UpdateJuzgadoDto) {
    const j = await this.juzgadoRepo.findOne({ where: { id } });
    if (!j) throw new NotFoundException(`Juzgado #${id} no encontrado`);
    Object.assign(j, {
      ...(dto.nombre !== undefined && { nombre: dto.nombre }),
      ...(dto.piso !== undefined && { piso: dto.piso }),
      ...(dto.activo !== undefined && { activo: dto.activo }),
    });
    await this.juzgadoRepo.save(j);
    return this.findOneJuzgado(id);
  }

  async removeJuzgado(id: number) {
    const j = await this.juzgadoRepo.findOne({ where: { id } });
    if (!j) throw new NotFoundException(`Juzgado #${id} no encontrado`);
    j.activo = false;
    await this.juzgadoRepo.save(j);
  }

  async createPuesto(juzgadoId: number, dto: CreatePuestoDto) {
    const j = await this.juzgadoRepo.findOne({ where: { id: juzgadoId } });
    if (!j) throw new NotFoundException(`Juzgado #${juzgadoId} no encontrado`);

    const exists = await this.puestoRepo.findOne({
      where: { juzgadoId, numero: dto.numero },
    });
    if (exists) throw new ConflictException(`Puesto ${dto.numero} ya existe en este juzgado`);

    const puesto = this.puestoRepo.create({
      juzgadoId,
      numero: dto.numero,
      descripcion: dto.descripcion,
    });
    return this.puestoRepo.save(puesto);
  }

  async removePuesto(juzgadoId: number, puestoId: number) {
    const puesto = await this.puestoRepo.findOne({
      where: { id: puestoId, juzgadoId },
    });
    if (!puesto) throw new NotFoundException(`Puesto #${puestoId} no encontrado en este juzgado`);
    puesto.activo = false;
    await this.puestoRepo.save(puesto);
  }
}

