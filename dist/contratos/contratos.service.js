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
exports.ContratosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contrato_entity_1 = require("./entities/contrato.entity");
const proveedor_entity_1 = require("./entities/proveedor.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const software_entity_1 = require("../software/entities/software.entity");
const pagination_dto_1 = require("../common/pipes/pagination.dto");
let ContratosService = class ContratosService {
    constructor(contratoRepo, proveedorRepo, equipoRepo, softwareRepo) {
        this.contratoRepo = contratoRepo;
        this.proveedorRepo = proveedorRepo;
        this.equipoRepo = equipoRepo;
        this.softwareRepo = softwareRepo;
    }
    async findAllContratos(filter) {
        const qb = this.contratoRepo
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.proveedor', 'p')
            .andWhere('c.activo = :activo', { activo: true });
        if (filter.q) {
            qb.andWhere('(c.nroContrato ILIKE :q OR p.nombre ILIKE :q)', { q: `%${filter.q}%` });
        }
        if (filter.estado)
            qb.andWhere('c.estado = :estado', { estado: filter.estado });
        if (filter.proveedor_id)
            qb.andWhere('c.proveedorId = :pid', { pid: filter.proveedor_id });
        if (filter.por_vencer_dias) {
            qb.andWhere('c.fechaVenc BETWEEN CURRENT_DATE AND CURRENT_DATE + :days * INTERVAL \'1 day\'', {
                days: filter.por_vencer_dias,
            });
        }
        qb.orderBy('c.fechaVenc').skip(filter.skip).take(filter.take);
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_dto_1.paginate)(data, total, filter);
    }
    async findOneContrato(id) {
        const contrato = await this.contratoRepo.findOne({
            where: { id },
            relations: ['proveedor', 'equipos', 'softwares'],
        });
        if (!contrato)
            throw new common_1.NotFoundException(`Contrato #${id} no encontrado`);
        return contrato;
    }
    async createContrato(dto) {
        const exists = await this.contratoRepo.findOne({ where: { nroContrato: dto.nro_contrato } });
        if (exists)
            throw new common_1.ConflictException(`Contrato '${dto.nro_contrato}' ya existe`);
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
    async updateContrato(id, dto) {
        const contrato = await this.contratoRepo.findOne({
            where: { id },
            relations: ['equipos', 'softwares'],
        });
        if (!contrato)
            throw new common_1.NotFoundException(`Contrato #${id} no encontrado`);
        if (dto.descripcion !== undefined)
            contrato.descripcion = dto.descripcion;
        if (dto.fecha_venc !== undefined)
            contrato.fechaVenc = dto.fecha_venc;
        if (dto.estado !== undefined)
            contrato.estado = dto.estado;
        if (dto.monto !== undefined)
            contrato.monto = dto.monto;
        if (dto.observaciones !== undefined)
            contrato.observaciones = dto.observaciones;
        if (dto.activo !== undefined)
            contrato.activo = dto.activo;
        if (dto.equipo_ids !== undefined) {
            contrato.equipos = dto.equipo_ids.length ? await this.equipoRepo.findByIds(dto.equipo_ids) : [];
        }
        if (dto.software_ids !== undefined) {
            contrato.softwares = dto.software_ids.length ? await this.softwareRepo.findByIds(dto.software_ids) : [];
        }
        await this.contratoRepo.save(contrato);
        return this.findOneContrato(id);
    }
    async removeContrato(id) {
        const contrato = await this.contratoRepo.findOne({ where: { id } });
        if (!contrato)
            throw new common_1.NotFoundException(`Contrato #${id} no encontrado`);
        contrato.activo = false;
        await this.contratoRepo.save(contrato);
    }
    async findAllProveedores() {
        return this.proveedorRepo.find({ where: { activo: true }, order: { nombre: 'ASC' } });
    }
    async findOneProveedor(id) {
        const p = await this.proveedorRepo.findOne({
            where: { id },
            relations: ['contratos'],
        });
        if (!p)
            throw new common_1.NotFoundException(`Proveedor #${id} no encontrado`);
        return p;
    }
    async createProveedor(dto) {
        const exists = await this.proveedorRepo.findOne({ where: { nombre: dto.nombre } });
        if (exists)
            throw new common_1.ConflictException(`Proveedor '${dto.nombre}' ya existe`);
        const p = this.proveedorRepo.create({ ...dto });
        return this.proveedorRepo.save(p);
    }
    async updateProveedor(id, dto) {
        const p = await this.proveedorRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Proveedor #${id} no encontrado`);
        if (dto.nombre !== undefined)
            p.nombre = dto.nombre;
        if (dto.cuit !== undefined)
            p.cuit = dto.cuit;
        if (dto.telefono !== undefined)
            p.telefono = dto.telefono;
        if (dto.email !== undefined)
            p.email = dto.email;
        if (dto.contacto !== undefined)
            p.contacto = dto.contacto;
        if (dto.activo !== undefined)
            p.activo = dto.activo;
        return this.proveedorRepo.save(p);
    }
    async removeProveedor(id) {
        const p = await this.proveedorRepo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Proveedor #${id} no encontrado`);
        p.activo = false;
        await this.proveedorRepo.save(p);
    }
};
exports.ContratosService = ContratosService;
exports.ContratosService = ContratosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contrato_entity_1.Contrato)),
    __param(1, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(2, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __param(3, (0, typeorm_1.InjectRepository)(software_entity_1.Software)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ContratosService);
//# sourceMappingURL=contratos.service.js.map