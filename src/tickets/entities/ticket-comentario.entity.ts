import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ schema: 'pj', name: 'ticket_comentario' })
export class TicketComentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ticket_id' })
  ticketId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ type: 'text' })
  texto: string;

  @Column({ default: false })
  interno: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Ticket, (t) => t.comentarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
