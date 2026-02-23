import { Ticket } from './ticket.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare class TicketComentario {
    id: number;
    ticketId: number;
    usuarioId: number;
    texto: string;
    interno: boolean;
    createdAt: Date;
    ticket: Ticket;
    usuario: Usuario;
}
