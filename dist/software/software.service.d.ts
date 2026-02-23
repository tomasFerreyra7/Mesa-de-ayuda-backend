import { Repository } from 'typeorm';
import { Software } from './entities/software.entity';
import { SoftwareEquipo } from './entities/software-equipo.entity';
import { CreateSoftwareDto, UpdateSoftwareDto, InstalarSoftwareDto, FilterSoftwareDto } from './dto/software.dto';
export declare class SoftwareService {
    private readonly repo;
    private readonly instalRepo;
    constructor(repo: Repository<Software>, instalRepo: Repository<SoftwareEquipo>);
    findAll(filter: FilterSoftwareDto): Promise<{
        data: Software[];
        meta: {
            total: number;
            page: number;
            per_page: number;
            pages: number;
        };
    }>;
    findOne(id: number): Promise<Software>;
    create(dto: CreateSoftwareDto): Promise<Software>;
    update(id: number, dto: UpdateSoftwareDto): Promise<Software>;
    darDeBaja(id: number): Promise<void>;
    getInstalaciones(softwareId: number): Promise<SoftwareEquipo[]>;
    instalar(softwareId: number, dto: InstalarSoftwareDto): Promise<SoftwareEquipo[]>;
    desinstalar(softwareId: number, equipoId: number): Promise<void>;
}
