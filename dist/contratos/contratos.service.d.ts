import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { Proveedor } from './entities/proveedor.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Software } from '../software/entities/software.entity';
import { CreateContratoDto, UpdateContratoDto, CreateProveedorDto, FilterContratoDto } from './dto/contrato.dto';
export declare class ContratosService {
    private readonly contratoRepo;
    private readonly proveedorRepo;
    private readonly equipoRepo;
    private readonly softwareRepo;
    constructor(contratoRepo: Repository<Contrato>, proveedorRepo: Repository<Proveedor>, equipoRepo: Repository<Equipo>, softwareRepo: Repository<Software>);
    findAllContratos(filter: FilterContratoDto): Promise<{
        data: Contrato[];
        meta: {
            total: number;
            page: number;
            per_page: number;
            pages: number;
        };
    }>;
    findOneContrato(id: number): Promise<Contrato>;
    createContrato(dto: CreateContratoDto): Promise<Contrato>;
    updateContrato(id: number, dto: UpdateContratoDto): Promise<Contrato>;
    removeContrato(id: number): Promise<void>;
    findAllProveedores(): Promise<Proveedor[]>;
    findOneProveedor(id: number): Promise<Proveedor>;
    createProveedor(dto: CreateProveedorDto): Promise<Proveedor>;
    updateProveedor(id: number, dto: CreateProveedorDto): Promise<Proveedor>;
}
