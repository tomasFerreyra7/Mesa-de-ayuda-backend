import { SoftwareService } from './software.service';
import { CreateSoftwareDto, UpdateSoftwareDto, InstalarSoftwareDto, FilterSoftwareDto } from './dto/software.dto';
export declare class SoftwareController {
    private readonly service;
    constructor(service: SoftwareService);
    findAll(filter: FilterSoftwareDto): Promise<{
        data: import("./entities/software.entity").Software[];
        meta: {
            total: number;
            page: number;
            per_page: number;
            pages: number;
        };
    }>;
    create(dto: CreateSoftwareDto): Promise<import("./entities/software.entity").Software>;
    findOne(id: number): Promise<import("./entities/software.entity").Software>;
    update(id: number, dto: UpdateSoftwareDto): Promise<import("./entities/software.entity").Software>;
    darDeBaja(id: number): Promise<void>;
    getInstalaciones(id: number): Promise<import("./entities/software-equipo.entity").SoftwareEquipo[]>;
    instalar(id: number, dto: InstalarSoftwareDto): Promise<import("./entities/software-equipo.entity").SoftwareEquipo[]>;
    desinstalar(id: number, equipoId: number): Promise<void>;
}
