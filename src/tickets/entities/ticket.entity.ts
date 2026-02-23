import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Juzgado } from '../../ubicaciones/entities/juzgado.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
import { Software } from '../../software/entities/software.entity';
import { TicketHistorial } from './ticket-historial.entity';
import { TicketComentario } from './ticket-comentario.entity';

export enum TipoTicketEnum {
  HARDWARE = 'Hardware',
  SOFTWARE = 'Software',
  RED = 'Red',
  OTRO = 'Otro',
}

export enum EstadoTicketEnum {
  ABIERTO = 'Abierto',
  EN_PROGRESO = 'En Progreso',
  RESUELTO = 'Resuelto',
  CERRADO = 'Cerrado',
}

export enum PrioridadTicketEnum {
  CRITICA = 'Critica',
  ALTA = 'Alta',
  MEDIA = 'Media',
  BAJA = 'Baja',
}

@Entity({ schema: 'pj', name: 'ticket' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nro_ticket', length: 10, unique: true, nullable: true })
  nroTicket: string;

  @Column({ type: 'enum', enum: TipoTicketEnum })
  tipo: TipoTicketEnum;

  @Column({ length: 300 })
  asunto: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'enum', enum: EstadoTicketEnum, default: EstadoTicketEnum.ABIERTO })
  estado: EstadoTicketEnum;

  @Column({ type: 'enum', enum: PrioridadTicketEnum, default: PrioridadTicketEnum.MEDIA })
  prioridad: PrioridadTicketEnum;

  @Column({ name: 'creado_por_id' })
  creadoPorId: number;

  @Column({ name: 'asignado_a_id', nullable: true })
  asignadoAId: number;

  @Column({ name: 'juzgado_id', nullable: true })
  juzgadoId: number;

  @Column({ name: 'equipo_id', nullable: true })
  equipoId: number;

  @Column({ name: 'software_id', nullable: true })
  softwareId: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_asig', nullable: true })
  fechaAsig: Date;

  @Column({ name: 'fecha_resol', nullable: true })
  fechaResol: Date;

  @Column({ name: 'fecha_cierre', nullable: true })
  fechaCierre: Date;

  @Column({ name: 'sla_vence_en', nullable: true })
  slaVenceEn: Date;

  @Column({ name: 'sla_cumplido', nullable: true })
  slaCumplido: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Usuario, (u) => u.ticketsCreados)
  @JoinColumn({ name: 'creado_por_id' })
  creadoPor: Usuario;

  @ManyToOne(() => Usuario, (u) => u.ticketsAsignados)
  @JoinColumn({ name: 'asignado_a_id' })
  asignadoA: Usuario;

  @ManyToOne(() => Juzgado, (j) => j.tickets)
  @JoinColumn({ name: 'juzgado_id' })
  juzgado: Juzgado;

  @ManyToOne(() => Equipo, (e) => e.tickets)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @ManyToOne(() => Software, (s) => s.tickets)
  @JoinColumn({ name: 'software_id' })
  software: Software;

  @OneToMany(() => TicketHistorial, (h) => h.ticket, { cascade: true })
  historial: TicketHistorial[];

  @OneToMany(() => TicketComentario, (c) => c.ticket, { cascade: true })
  comentarios: TicketComentario[];
}
