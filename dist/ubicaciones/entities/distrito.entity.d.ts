import { Circunscripcion } from './circunscripcion.entity';
import { Juzgado } from './juzgado.entity';
export declare class Distrito {
    id: number;
    circunscripcionId: number;
    codigo: string;
    nombre: string;
    edificio: string;
    direccion: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    circunscripcion: Circunscripcion;
    juzgados: Juzgado[];
}
