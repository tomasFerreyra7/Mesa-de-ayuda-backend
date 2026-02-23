import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto, UpdateEquipoDto, ReubicarEquipoDto, FilterEquipoDto } from './dto/equipo.dto';
export declare class EquiposService {
    private readonly repo;
    constructor(repo: Repository<Equipo>);
    findAll(filter: FilterEquipoDto): Promise<{
        data: Equipo[];
        meta: {
            total: number;
            page: number;
            per_page: number;
            pages: number;
        };
    }>;
    findOne(id: number): Promise<Equipo>;
    create(dto: CreateEquipoDto): Promise<Equipo>;
    update(id: number, dto: UpdateEquipoDto): Promise<Equipo>;
    reubicar(id: number, dto: ReubicarEquipoDto): Promise<Equipo>;
    darDeBaja(id: number): Promise<void>;
}
