import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Distrito } from './distrito.entity';

@Entity({ schema: 'pj', name: 'circunscripcion' })
export class Circunscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Distrito, (d) => d.circunscripcion)
  distritos: Distrito[];
}
