import { Ticket } from '../../tickets/entities/ticket.entity';
import { Juzgado } from '../../ubicaciones/entities/juzgado.entity';
import { Notificacion } from './notificacion.entity';
export declare enum RolEnum {
    ADMIN = "admin",
    OPERARIO = "operario",
    TECNICO_INTERNO = "tecnico_interno",
    TECNICO_PROVEEDOR = "tecnico_proveedor"
}
export declare class Usuario {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    iniciales: string;
    rol: RolEnum;
    activo: boolean;
    avatarColor: string;
    ultimoLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    ticketsCreados: Ticket[];
    ticketsAsignados: Ticket[];
    juzgados: Juzgado[];
    notificaciones: Notificacion[];
}
