import { Ticket } from './ticket.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EstadoTicketEnum } from './ticket.entity';
export declare class TicketHistorial {
    id: number;
    ticketId: number;
    usuarioId: number;
    estadoAnterior: EstadoTicketEnum;
    estadoNuevo: EstadoTicketEnum;
    comentario: string;
    fecha: Date;
    ticket: Ticket;
    usuario: Usuario;
}
