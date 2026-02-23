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
exports.SoftwareService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const software_entity_1 = require("./entities/software.entity");
const software_equipo_entity_1 = require("./entities/software-equipo.entity");
const pagination_dto_1 = require("../common/pipes/pagination.dto");
let SoftwareService = class SoftwareService {
    constructor(repo, instalRepo) {
        this.repo = repo;
        this.instalRepo = instalRepo;
    }
    async findAll(filter) {
        const qb = this.repo.createQueryBuilder('s');
        if (filter.q) {
            qb.andWhere('(s.nombre ILIKE :q OR s.nroSw ILIKE :q OR s.proveedor ILIKE :q)', {
                q: `%${filter.q}%`,
            });
        }
        if (filter.tipo)
            qb.andWhere('s.tipo = :tipo', { tipo: filter.tipo });
        if (filter.estado)
            qb.andWhere('s.estado = :estado', { estado: filter.estado });
        qb.orderBy('s.nombre').skip(filter.skip).take(filter.take);
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_dto_1.paginate)(data, total, filter);
    }
    async findOne(id) {
        const sw = await this.repo.findOne({
            where: { id },
            relations: ['instalaciones', 'instalaciones.equipo', 'contratos'],
        });
        if (!sw)
            throw new common_1.NotFoundException(`Software #${id} no encontrado`);
        return sw;
    }
    async create(dto) {
        if (dto.nro_sw) {
            const exists = await this.repo.findOne({ where: { nroSw: dto.nro_sw } });
            if (exists)
                throw new common_1.ConflictException(`N° SW '${dto.nro_sw}' ya existe`);
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
        if (!dto.nro_sw) {
            const last = await this.repo
                .createQueryBuilder('s')
                .orderBy('s.id', 'DESC')
                .getOne();
            const nextNum = last ? last.id + 1 : 1;
            sw.nroSw = `SW-${String(nextNum).padStart(4, '0')}`;
        }
        const saved = await this.repo.save(sw);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        const sw = await this.repo.findOne({ where: { id } });
        if (!sw)
            throw new common_1.NotFoundException(`Software #${id} no encontrado`);
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
        return this.findOne(id);
    }
    async darDeBaja(id) {
        const sw = await this.repo.findOne({ where: { id } });
        if (!sw)
            throw new common_1.NotFoundException(`Software #${id} no encontrado`);
        await this.repo.update(id, { estado: software_entity_1.EstadoSwEnum.DADO_DE_BAJA });
    }
    async getInstalaciones(softwareId) {
        return this.instalRepo.find({
            where: { softwareId, activo: true },
            relations: ['equipo', 'equipo.puesto', 'equipo.puesto.juzgado'],
        });
    }
    async instalar(softwareId, dto) {
        const sw = await this.repo.findOne({ where: { id: softwareId } });
        if (!sw)
            throw new common_1.NotFoundException(`Software #${softwareId} no encontrado`);
        if (sw.maxInstalaciones && sw.instalacionesAct >= sw.maxInstalaciones) {
            throw new common_1.BadRequestException(`Límite de licencias alcanzado (${sw.maxInstalaciones} instalaciones)`);
        }
        const existe = await this.instalRepo.findOne({
            where: { softwareId, equipoId: dto.equipo_id },
        });
        if (existe) {
            if (existe.activo)
                throw new common_1.ConflictException('Ya está instalado en ese equipo');
            await this.instalRepo.update(existe.id, { activo: true, versionInst: dto.version_inst, fechaInst: dto.fecha_inst });
        }
        else {
            await this.instalRepo.save({
                softwareId,
                equipoId: dto.equipo_id,
                versionInst: dto.version_inst,
                fechaInst: dto.fecha_inst,
            });
        }
        await this.repo.increment({ id: softwareId }, 'instalacionesAct', 1);
        return this.getInstalaciones(softwareId);
    }
    async desinstalar(softwareId, equipoId) {
        const inst = await this.instalRepo.findOne({
            where: { softwareId, equipoId, activo: true },
        });
        if (!inst)
            throw new common_1.NotFoundException('Instalación no encontrada');
        await this.instalRepo.update(inst.id, { activo: false });
        await this.repo.decrement({ id: softwareId }, 'instalacionesAct', 1);
    }
};
exports.SoftwareService = SoftwareService;
exports.SoftwareService = SoftwareService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(software_entity_1.Software)),
    __param(1, (0, typeorm_1.InjectRepository)(software_equipo_entity_1.SoftwareEquipo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SoftwareService);
//# sourceMappingURL=software.service.js.map