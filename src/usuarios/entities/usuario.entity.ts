import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Juzgado } from '../../ubicaciones/entities/juzgado.entity';
import { Notificacion } from './notificacion.entity';

export enum RolEnum {
  ADMIN = 'admin',
  OPERARIO = 'operario',
  TECNICO_INTERNO = 'tecnico_interno',
  TECNICO_PROVEEDOR = 'tecnico_proveedor',
}

@Entity({ schema: 'pj', name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  @Exclude()
  passwordHash: string;

  @Column({ length: 4, nullable: true })
  iniciales: string;

  @Column({ type: 'enum', enum: RolEnum })
  rol: RolEnum;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'avatar_color', length: 7, nullable: true })
  avatarColor: string;

  @Column({ name: 'ultimo_login', nullable: true })
  ultimoLogin: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Ticket, (t) => t.creadoPor)
  ticketsCreados: Ticket[];

  @OneToMany(() => Ticket, (t) => t.asignadoA)
  ticketsAsignados: Ticket[];

  @ManyToMany(() => Juzgado, (j) => j.usuarios)
  @JoinTable({
    name: 'usuario_juzgado',
    schema: 'pj',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'juzgado_id' },
  })
  juzgados: Juzgado[];

  @OneToMany(() => Notificacion, (n) => n.usuario)
  notificaciones: Notificacion[];
}
