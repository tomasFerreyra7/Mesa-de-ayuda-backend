import { TipoSwEnum, EstadoSwEnum, TipoLicenciaEnum } from '../entities/software.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';
export declare class CreateSoftwareDto {
    nro_sw?: string;
    nombre: string;
    version?: string;
    tipo: TipoSwEnum;
    proveedor?: string;
    tipo_licencia?: TipoLicenciaEnum;
    descripcion_lic?: string;
    max_instalaciones?: number;
    fecha_vencimiento?: string;
    observaciones?: string;
}
export declare class UpdateSoftwareDto {
    nombre?: string;
    version?: string;
    tipo?: TipoSwEnum;
    tipo_licencia?: TipoLicenciaEnum;
    descripcion_lic?: string;
    max_instalaciones?: number;
    fecha_vencimiento?: string;
    estado?: EstadoSwEnum;
    observaciones?: string;
}
export declare class InstalarSoftwareDto {
    equipo_id: number;
    version_inst?: string;
    fecha_inst?: string;
}
export declare class FilterSoftwareDto extends PaginationDto {
    tipo?: TipoSwEnum;
    estado?: EstadoSwEnum;
}
