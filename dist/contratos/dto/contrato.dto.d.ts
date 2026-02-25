import { TipoContratoEnum, EstadoContratoEnum } from '../entities/contrato.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';
export declare class CreateContratoDto {
    nro_contrato: string;
    proveedor_id: number;
    tipo: TipoContratoEnum;
    descripcion?: string;
    fecha_inicio: string;
    fecha_venc: string;
    monto?: number;
    moneda?: string;
    equipo_ids?: number[];
    software_ids?: number[];
    observaciones?: string;
}
export declare class UpdateContratoDto {
    descripcion?: string;
    fecha_venc?: string;
    estado?: EstadoContratoEnum;
    monto?: number;
    equipo_ids?: number[];
    software_ids?: number[];
    observaciones?: string;
    activo?: boolean;
}
export declare class CreateProveedorDto {
    nombre: string;
    cuit?: string;
    telefono?: string;
    email?: string;
    contacto?: string;
}
export declare class UpdateProveedorDto {
    nombre?: string;
    cuit?: string;
    telefono?: string;
    email?: string;
    contacto?: string;
    activo?: boolean;
}
export declare class FilterContratoDto extends PaginationDto {
    estado?: EstadoContratoEnum;
    proveedor_id?: number;
    por_vencer_dias?: number;
}
