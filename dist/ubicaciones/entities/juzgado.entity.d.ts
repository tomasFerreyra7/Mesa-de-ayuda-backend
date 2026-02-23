import { Distrito } from './distrito.entity';
import { Puesto } from './puesto.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export declare enum TipoJuzgadoEnum {
    JUZGADO = "Juzgado",
    CAMARA = "Camara",
    TRIBUNAL = "Tribunal",
    SECRETARIA = "Secretaria",
    DEPENDENCIA = "Dependencia"
}
export declare class Juzgado {
    id: number;
    distritoId: number;
    codigo: string;
    nombre: string;
    tipo: TipoJuzgadoEnum;
    piso: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    distrito: Distrito;
    puestos: Puesto[];
    usuarios: Usuario[];
    tickets: Ticket[];
}
