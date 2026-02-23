import { ContratosService } from './contratos.service';
import { CreateContratoDto, UpdateContratoDto, CreateProveedorDto, FilterContratoDto } from './dto/contrato.dto';
export declare class ContratosController {
    private readonly service;
    constructor(service: ContratosService);
    findAll(filter: FilterContratoDto): Promise<{
        data: import("./entities/contrato.entity").Contrato[];
        meta: {
            total: number;
            page: number;
            per_page: number;
            pages: number;
        };
    }>;
    create(dto: CreateContratoDto): Promise<import("./entities/contrato.entity").Contrato>;
    findOne(id: number): Promise<import("./entities/contrato.entity").Contrato>;
    update(id: number, dto: UpdateContratoDto): Promise<import("./entities/contrato.entity").Contrato>;
    remove(id: number): Promise<void>;
    findAllProveedores(): Promise<import("./entities/proveedor.entity").Proveedor[]>;
    createProveedor(dto: CreateProveedorDto): Promise<import("./entities/proveedor.entity").Proveedor>;
    findOneProveedor(id: number): Promise<import("./entities/proveedor.entity").Proveedor>;
    updateProveedor(id: number, dto: CreateProveedorDto): Promise<import("./entities/proveedor.entity").Proveedor>;
}
