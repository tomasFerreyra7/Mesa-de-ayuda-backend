import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Juzgado } from '../../ubicaciones/entities/juzgado.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
import { Software } from '../../software/entities/software.entity';
import { TicketHistorial } from './ticket-historial.entity';
import { TicketComentario } from './ticket-comentario.entity';
export declare enum TipoTicketEnum {
    HARDWARE = "Hardware",
    SOFTWARE = "Software",
    RED = "Red",
    OTRO = "Otro"
}
export declare enum EstadoTicketEnum {
    ABIERTO = "Abierto",
    EN_PROGRESO = "En Progreso",
    RESUELTO = "Resuelto",
    CERRADO = "Cerrado"
}
export declare enum PrioridadTicketEnum {
    CRITICA = "Critica",
    ALTA = "Alta",
    MEDIA = "Media",
    BAJA = "Baja"
}
export declare class Ticket {
    id: number;
    nroTicket: string;
    tipo: TipoTicketEnum;
    asunto: string;
    descripcion: string;
    estado: EstadoTicketEnum;
    prioridad: PrioridadTicketEnum;
    creadoPorId: number;
    asignadoAId: number;
    juzgadoId: number;
    equipoId: number;
    softwareId: number;
    fechaCreacion: Date;
    fechaAsig: Date;
    fechaResol: Date;
    fechaCierre: Date;
    slaVenceEn: Date;
    slaCumplido: boolean;
    updatedAt: Date;
    creadoPor: Usuario;
    asignadoA: Usuario;
    juzgado: Juzgado;
    equipo: Equipo;
    software: Software;
    historial: TicketHistorial[];
    comentarios: TicketComentario[];
}
