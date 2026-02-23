import { Distrito } from './distrito.entity';
export declare class Circunscripcion {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    distritos: Distrito[];
}
