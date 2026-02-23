import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Circunscripcion } from './circunscripcion.entity';
import { Juzgado } from './juzgado.entity';

@Entity({ schema: 'pj', name: 'distrito' })
export class Distrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'circunscripcion_id' })
  circunscripcionId: number;

  @Column({ length: 20, unique: true })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 150, nullable: true })
  edificio: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Circunscripcion, (c) => c.distritos)
  @JoinColumn({ name: 'circunscripcion_id' })
  circunscripcion: Circunscripcion;

  @OneToMany(() => Juzgado, (j) => j.distrito)
  juzgados: Juzgado[];
}
