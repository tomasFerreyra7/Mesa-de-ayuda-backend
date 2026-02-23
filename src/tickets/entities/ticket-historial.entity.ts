import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EstadoTicketEnum } from './ticket.entity';

@Entity({ schema: 'pj', name: 'ticket_historial' })
export class TicketHistorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ticket_id' })
  ticketId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({
    name: 'estado_anterior',
    type: 'enum',
    enum: ['Abierto', 'En Progreso', 'Resuelto', 'Cerrado'],
    nullable: true,
  })
  estadoAnterior: EstadoTicketEnum;

  @Column({
    name: 'estado_nuevo',
    type: 'enum',
    enum: ['Abierto', 'En Progreso', 'Resuelto', 'Cerrado'],
  })
  estadoNuevo: EstadoTicketEnum;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Ticket, (t) => t.historial, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}

