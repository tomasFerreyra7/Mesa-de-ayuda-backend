import { EquiposService } from './equipos.service';
import { CreateEquipoDto, UpdateEquipoDto, ReubicarEquipoDto, FilterEquipoDto } from './dto/equipo.dto';
export declare class EquiposController {
    private readonly service;
    constructor(service: EquiposService);
    findAll(filter: FilterEquipoDto): Promise<{
        data: import("./entities/equipo.entity").Equipo[];
        meta: {
            total: number;
            page: number;
            per_page: number;
            pages: number;
        };
    }>;
    create(dto: CreateEquipoDto): Promise<import("./entities/equipo.entity").Equipo>;
    findOne(id: number): Promise<import("./entities/equipo.entity").Equipo>;
    update(id: number, dto: UpdateEquipoDto): Promise<import("./entities/equipo.entity").Equipo>;
    reubicar(id: number, dto: ReubicarEquipoDto): Promise<import("./entities/equipo.entity").Equipo>;
    darDeBaja(id: number): Promise<void>;
}
