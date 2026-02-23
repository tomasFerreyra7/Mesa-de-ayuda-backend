import { Juzgado } from './juzgado.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
export declare class Puesto {
    id: number;
    juzgadoId: number;
    numero: number;
    descripcion: string;
    activo: boolean;
    createdAt: Date;
    juzgado: Juzgado;
    equipo: Equipo;
}
