import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn,
} from 'typeorm';
import { Distrito } from './distrito.entity';
import { Puesto } from './puesto.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

export enum TipoJuzgadoEnum {
  JUZGADO = 'Juzgado',
  CAMARA = 'Camara',
  TRIBUNAL = 'Tribunal',
  SECRETARIA = 'Secretaria',
  DEPENDENCIA = 'Dependencia',
}

@Entity({ schema: 'pj', name: 'juzgado' })
export class Juzgado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'distrito_id' })
  distritoId: number;

  @Column({ length: 20, unique: true })
  codigo: string;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'enum', enum: TipoJuzgadoEnum, default: TipoJuzgadoEnum.JUZGADO })
  tipo: TipoJuzgadoEnum;

  @Column({ length: 20, nullable: true })
  piso: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Distrito, (d) => d.juzgados)
  @JoinColumn({ name: 'distrito_id' })
  distrito: Distrito;

  @OneToMany(() => Puesto, (p) => p.juzgado)
  puestos: Puesto[];

  @ManyToMany(() => Usuario, (u) => u.juzgados)
  usuarios: Usuario[];

  @OneToMany(() => Ticket, (t) => t.juzgado)
  tickets: Ticket[];
}
