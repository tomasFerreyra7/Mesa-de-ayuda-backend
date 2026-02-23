import { ClaseHwEnum, EstadoHwEnum } from '../entities/equipo.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';
export declare class CreateEquipoDto {
    nro_inventario: string;
    clase: ClaseHwEnum;
    subtipo?: string;
    marca?: string;
    modelo?: string;
    nro_serie?: string;
    estado?: EstadoHwEnum;
    puesto_id?: number;
    fecha_alta?: string;
    observaciones?: string;
}
export declare class UpdateEquipoDto {
    clase?: ClaseHwEnum;
    subtipo?: string;
    marca?: string;
    modelo?: string;
    nro_serie?: string;
    estado?: EstadoHwEnum;
    puesto_id?: number;
    observaciones?: string;
}
export declare class ReubicarEquipoDto {
    puesto_id: number | null;
}
export declare class FilterEquipoDto extends PaginationDto {
    clase?: ClaseHwEnum;
    estado?: EstadoHwEnum;
    juzgado_id?: number;
    sin_asignar?: boolean;
}
