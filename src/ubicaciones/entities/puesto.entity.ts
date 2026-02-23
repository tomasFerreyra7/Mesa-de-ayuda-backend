import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToOne, JoinColumn, Unique,
} from 'typeorm';
import { Juzgado } from './juzgado.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity({ schema: 'pj', name: 'puesto' })
@Unique(['juzgadoId', 'numero'])
export class Puesto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'juzgado_id' })
  juzgadoId: number;

  @Column()
  numero: number;

  @Column({ length: 100, nullable: true })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Juzgado, (j) => j.puestos)
  @JoinColumn({ name: 'juzgado_id' })
  juzgado: Juzgado;

  @OneToOne(() => Equipo, (e) => e.puesto)
  equipo: Equipo;
}
