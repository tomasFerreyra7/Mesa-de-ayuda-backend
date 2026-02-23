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
exports.UbicacionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const circunscripcion_entity_1 = require("./entities/circunscripcion.entity");
const distrito_entity_1 = require("./entities/distrito.entity");
const juzgado_entity_1 = require("./entities/juzgado.entity");
const puesto_entity_1 = require("./entities/puesto.entity");
let UbicacionesService = class UbicacionesService {
    constructor(circRepo, distRepo, juzgadoRepo, puestoRepo) {
        this.circRepo = circRepo;
        this.distRepo = distRepo;
        this.juzgadoRepo = juzgadoRepo;
        this.puestoRepo = puestoRepo;
    }
    async getArbol() {
        return this.circRepo.find({
            where: { activo: true },
            relations: ['distritos'],
            order: { codigo: 'ASC' },
        });
    }
    async createCircunscripcion(dto) {
        const exists = await this.circRepo.findOne({ where: { codigo: dto.codigo } });
        if (exists)
            throw new common_1.ConflictException(`Código '${dto.codigo}' ya existe`);
        const circ = this.circRepo.create({
            codigo: dto.codigo,
            nombre: dto.nombre,
            descripcion: dto.descripcion,
        });
        return this.circRepo.save(circ);
    }
    async updateCircunscripcion(id, dto) {
        const c = await this.circRepo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException(`Circunscripción #${id} no encontrada`);
        Object.assign(c, {
            ...(dto.nombre !== undefined && { nombre: dto.nombre }),
            ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
            ...(dto.activo !== undefined && { activo: dto.activo }),
        });
        return this.circRepo.save(c);
    }
    async createDistrito(dto) {
        const circ = await this.circRepo.findOne({ where: { id: dto.circunscripcion_id } });
        if (!circ)
            throw new common_1.NotFoundException(`Circunscripción #${dto.circunscripcion_id} no encontrada`);
        const exists = await this.distRepo.findOne({ where: { codigo: dto.codigo } });
        if (exists)
            throw new common_1.ConflictException(`Código '${dto.codigo}' ya existe`);
        const dist = this.distRepo.create({
            circunscripcionId: dto.circunscripcion_id,
            codigo: dto.codigo,
            nombre: dto.nombre,
            edificio: dto.edificio,
            direccion: dto.direccion,
        });
        return this.distRepo.save(dist);
    }
    async updateDistrito(id, dto) {
        const d = await this.distRepo.findOne({ where: { id } });
        if (!d)
            throw new common_1.NotFoundException(`Distrito #${id} no encontrado`);
        Object.assign(d, {
            ...(dto.nombre !== undefined && { nombre: dto.nombre }),
            ...(dto.edificio !== undefined && { edificio: dto.edificio }),
            ...(dto.direccion !== undefined && { direccion: dto.direccion }),
            ...(dto.activo !== undefined && { activo: dto.activo }),
        });
        return this.distRepo.save(d);
    }
    async findJuzgados(filter) {
        const qb = this.juzgadoRepo.createQueryBuilder('j').leftJoinAndSelect('j.distrito', 'd').leftJoinAndSelect('d.circunscripcion', 'c');
        if (filter.q) {
            qb.andWhere('(j.nombre ILIKE :q OR j.codigo ILIKE :q)', { q: `%${filter.q}%` });
        }
        if (filter.distrito_id)
            qb.andWhere('j.distritoId = :did', { did: filter.distrito_id });
        if (filter.activo !== undefined)
            qb.andWhere('j.activo = :activo', { activo: filter.activo });
        else
            qb.andWhere('j.activo = true');
        return qb.orderBy('j.nombre').getMany();
    }
    async findOneJuzgado(id) {
        const j = await this.juzgadoRepo.findOne({
            where: { id },
            relations: ['distrito', 'puestos', 'puestos.equipo'],
        });
        if (!j)
            throw new common_1.NotFoundException(`Juzgado #${id} no encontrado`);
        return j;
    }
    async createJuzgado(dto) {
        const exists = await this.juzgadoRepo.findOne({ where: { codigo: dto.codigo } });
        if (exists)
            throw new common_1.ConflictException(`Código '${dto.codigo}' ya existe`);
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
    async updateJuzgado(id, dto) {
        const j = await this.juzgadoRepo.findOne({ where: { id } });
        if (!j)
            throw new common_1.NotFoundException(`Juzgado #${id} no encontrado`);
        Object.assign(j, {
            ...(dto.nombre !== undefined && { nombre: dto.nombre }),
            ...(dto.piso !== undefined && { piso: dto.piso }),
            ...(dto.activo !== undefined && { activo: dto.activo }),
        });
        await this.juzgadoRepo.save(j);
        return this.findOneJuzgado(id);
    }
    async createPuesto(juzgadoId, dto) {
        const j = await this.juzgadoRepo.findOne({ where: { id: juzgadoId } });
        if (!j)
            throw new common_1.NotFoundException(`Juzgado #${juzgadoId} no encontrado`);
        const exists = await this.puestoRepo.findOne({
            where: { juzgadoId, numero: dto.numero },
        });
        if (exists)
            throw new common_1.ConflictException(`Puesto ${dto.numero} ya existe en este juzgado`);
        const puesto = this.puestoRepo.create({
            juzgadoId,
            numero: dto.numero,
            descripcion: dto.descripcion,
        });
        return this.puestoRepo.save(puesto);
    }
};
exports.UbicacionesService = UbicacionesService;
exports.UbicacionesService = UbicacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(circunscripcion_entity_1.Circunscripcion)),
    __param(1, (0, typeorm_1.InjectRepository)(distrito_entity_1.Distrito)),
    __param(2, (0, typeorm_1.InjectRepository)(juzgado_entity_1.Juzgado)),
    __param(3, (0, typeorm_1.InjectRepository)(puesto_entity_1.Puesto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UbicacionesService);
//# sourceMappingURL=ubicaciones.service.js.map