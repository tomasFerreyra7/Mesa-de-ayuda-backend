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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const usuario_entity_1 = require("./entities/usuario.entity");
const juzgado_entity_1 = require("../ubicaciones/entities/juzgado.entity");
let UsuariosService = class UsuariosService {
    constructor(repo, juzgadosRepo) {
        this.repo = repo;
        this.juzgadosRepo = juzgadosRepo;
    }
    async findAll(filter) {
        const qb = this.repo
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.juzgados', 'j');
        if (filter.q) {
            qb.andWhere('(u.nombre ILIKE :q OR u.email ILIKE :q)', { q: `%${filter.q}%` });
        }
        if (filter.rol)
            qb.andWhere('u.rol = :rol', { rol: filter.rol });
        if (filter.activo !== undefined)
            qb.andWhere('u.activo = :activo', { activo: filter.activo });
        const users = await qb.orderBy('u.nombre').getMany();
        return users.map(this.sanitize);
    }
    async findOne(id) {
        const user = await this.repo.findOne({
            where: { id },
            relations: ['juzgados'],
        });
        if (!user)
            throw new common_1.NotFoundException(`Usuario #${id} no encontrado`);
        return this.sanitize(user);
    }
    async create(dto) {
        const exists = await this.repo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('El email ya está registrado');
        const hash = await bcrypt.hash(dto.password, 12);
        const user = this.repo.create({
            nombre: dto.nombre,
            email: dto.email,
            passwordHash: hash,
            iniciales: dto.iniciales,
            rol: dto.rol,
            avatarColor: dto.avatarColor,
        });
        if (dto.juzgadoIds?.length) {
            user.juzgados = await this.juzgadosRepo.findByIds(dto.juzgadoIds);
        }
        const saved = await this.repo.save(user);
        return this.sanitize(saved);
    }
    async update(id, dto) {
        const user = await this.repo.findOne({ where: { id }, relations: ['juzgados'] });
        if (!user)
            throw new common_1.NotFoundException(`Usuario #${id} no encontrado`);
        if (dto.password) {
            user.passwordHash = await bcrypt.hash(dto.password, 12);
        }
        if (dto.nombre !== undefined)
            user.nombre = dto.nombre;
        if (dto.email !== undefined) {
            const dup = await this.repo.findOne({ where: { email: dto.email } });
            if (dup && dup.id !== id)
                throw new common_1.ConflictException('El email ya está en uso');
            user.email = dto.email;
        }
        if (dto.iniciales !== undefined)
            user.iniciales = dto.iniciales;
        if (dto.rol !== undefined)
            user.rol = dto.rol;
        if (dto.activo !== undefined)
            user.activo = dto.activo;
        if (dto.avatarColor !== undefined)
            user.avatarColor = dto.avatarColor;
        if (dto.juzgadoIds !== undefined) {
            user.juzgados = dto.juzgadoIds.length
                ? await this.juzgadosRepo.findByIds(dto.juzgadoIds)
                : [];
        }
        const saved = await this.repo.save(user);
        return this.sanitize(saved);
    }
    async deactivate(id) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`Usuario #${id} no encontrado`);
        await this.repo.update(id, { activo: false });
    }
    async getTecnicosDisponibles(juzgadoId) {
        const qb = this.repo
            .createQueryBuilder('u')
            .leftJoin('u.juzgados', 'j')
            .addSelect('u.id')
            .where('u.activo = true')
            .andWhere('u.rol IN (:...roles)', {
            roles: [usuario_entity_1.RolEnum.TECNICO_INTERNO, usuario_entity_1.RolEnum.TECNICO_PROVEEDOR],
        });
        if (juzgadoId) {
            qb.andWhere('j.id = :juzgadoId', { juzgadoId });
        }
        const tecnicos = await qb.getMany();
        const counts = await this.repo.manager.query(`
      SELECT asignado_a_id, COUNT(*) as tickets_activos
      FROM pj.ticket
      WHERE estado NOT IN ('Cerrado', 'Resuelto') AND asignado_a_id IS NOT NULL
      GROUP BY asignado_a_id
    `);
        const countMap = Object.fromEntries(counts.map((r) => [r.asignado_a_id, +r.tickets_activos]));
        return tecnicos.map((u) => ({
            ...this.sanitize(u),
            tickets_activos: countMap[u.id] ?? 0,
        }));
    }
    sanitize(user) {
        const { passwordHash, ...safe } = user;
        return safe;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(juzgado_entity_1.Juzgado)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map