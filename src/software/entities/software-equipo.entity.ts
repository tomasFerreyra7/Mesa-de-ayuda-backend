import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  JoinColumn, Unique,
} from 'typeorm';
import { Software } from './software.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity({ schema: 'pj', name: 'software_equipo' })
@Unique(['softwareId', 'equipoId'])
export class SoftwareEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'software_id' })
  softwareId: number;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @Column({ name: 'version_inst', length: 50, nullable: true })
  versionInst: string;

  @Column({ name: 'fecha_inst', type: 'date', nullable: true })
  fechaInst: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Software, (s) => s.instalaciones)
  @JoinColumn({ name: 'software_id' })
  software: Software;

  @ManyToOne(() => Equipo, (e) => e.softwareInstalado)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;
}
