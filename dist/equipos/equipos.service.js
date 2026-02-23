"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquiposService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipo_entity_1 = require("./entities/equipo.entity");
const pagination_dto_1 = require("../common/pipes/pagination.dto");
let EquiposService = class EquiposService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(filter) {
        const qb = this.repo
            .createQueryBuilder('e')
            .leftJoinAndSelect('e.puesto', 'p')
            .leftJoinAndSelect('p.juzgado', 'j');
        if (filter.q) {
            qb.andWhere('(e.nroInventario ILIKE :q OR e.marca ILIKE :q OR e.modelo ILIKE :q OR e.nroSerie ILIKE :q)', { q: `%${filter.q}%` });
        }
        if (filter.clase)
            qb.andWhere('e.clase = :clase', { clase: filter.clase });
        if (filter.estado)
            qb.andWhere('e.estado = :estado', { estado: filter.estado });
        if (filter.sin_asignar)
            qb.andWhere('e.puestoId IS NULL');
        if (filter.juzgado_id)
            qb.andWhere('j.id = :jid', { jid: filter.juzgado_id });
        qb.orderBy('e.nroInventario').skip(filter.skip).take(filter.take);
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_dto_1.paginate)(data, total, filter);
    }
    async findOne(id) {
        const equipo = await this.repo.findOne({
            where: { id },
            relations: ['puesto', 'puesto.juzgado', 'softwareInstalado', 'softwareInstalado.software', 'contratos'],
        });
        if (!equipo)
            throw new common_1.NotFoundException(`Equipo #${id} no encontrado`);
        return equipo;
    }
    async create(dto) {
        const exists = await this.repo.findOne({ where: { nroInventario: dto.nro_inventario } });
        if (exists)
            throw new common_1.ConflictException(`N° inventario '${dto.nro_inventario}' ya existe`);
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
    async update(id, dto) {
        const equipo = await this.repo.findOne({ where: { id } });
        if (!equipo)
            throw new common_1.NotFoundException(`Equipo #${id} no encontrado`);
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
    async reubicar(id, dto) {
        const equipo = await this.repo.findOne({ where: { id } });
        if (!equipo)
            throw new common_1.NotFoundException(`Equipo #${id} no encontrado`);
        equipo.puestoId = dto.puesto_id ?? null;
        await this.repo.save(equipo);
        return this.findOne(id);
    }
    async darDeBaja(id) {
        const equipo = await this.repo.findOne({ where: { id } });
        if (!equipo)
            throw new common_1.NotFoundException(`Equipo #${id} no encontrado`);
        await this.repo.update(id, { estado: equipo_entity_1.EstadoHwEnum.DADO_DE_BAJA, fechaBaja: new Date().toISOString().split('T')[0] });
    }
};
exports.EquiposService = EquiposService;
exports.EquiposService = EquiposService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquiposService);
//# sourceMappingURL=equipos.service.js.map