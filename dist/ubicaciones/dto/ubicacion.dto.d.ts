import { TipoJuzgadoEnum } from '../entities/juzgado.entity';
export declare class CreateCircunscripcionDto {
    codigo: string;
    nombre: string;
    descripcion?: string;
}
export declare class UpdateCircunscripcionDto {
    nombre?: string;
    descripcion?: string;
    activo?: boolean;
}
export declare class CreateDistritoDto {
    circunscripcion_id: number;
    codigo: string;
    nombre: string;
    edificio?: string;
    direccion?: string;
}
export declare class UpdateDistritoDto {
    nombre?: string;
    edificio?: string;
    direccion?: string;
    activo?: boolean;
}
export declare class CreateJuzgadoDto {
    distrito_id: number;
    codigo: string;
    nombre: string;
    tipo?: TipoJuzgadoEnum;
    piso?: string;
}
export declare class UpdateJuzgadoDto {
    nombre?: string;
    piso?: string;
    activo?: boolean;
}
export declare class CreatePuestoDto {
    numero: number;
    descripcion?: string;
}
export declare class FilterJuzgadoDto {
    q?: string;
    distrito_id?: number;
    activo?: boolean;
}
