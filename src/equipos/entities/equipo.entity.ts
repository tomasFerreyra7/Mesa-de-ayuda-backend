import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany, OneToOne, ManyToMany,
  JoinColumn, JoinTable,
} from 'typeorm';
import { Puesto } from '../../ubicaciones/entities/puesto.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { SoftwareEquipo } from '../../software/entities/software-equipo.entity';
import { Contrato } from '../../contratos/entities/contrato.entity';

export enum ClaseHwEnum {
  COMPUTADORA = 'Computadora',
  IMPRESORA = 'Impresora',
  MONITOR = 'Monitor',
  SCANNER = 'Scanner',
  SERVIDOR = 'Servidor',
  RED = 'Red',
  UPS = 'UPS',
  PERIFERICO = 'Periferico',
  OTRO = 'Otro',
}

export enum EstadoHwEnum {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
  EN_MANTENIMIENTO = 'En Mantenimiento',
  DADO_DE_BAJA = 'Dado de Baja',
}

@Entity({ schema: 'pj', name: 'equipo' })
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nro_inventario', length: 20, unique: true })
  nroInventario: string;

  @Column({ type: 'enum', enum: ClaseHwEnum })
  clase: ClaseHwEnum;

  @Column({ length: 80, nullable: true })
  subtipo: string;

  @Column({ length: 80, nullable: true })
  marca: string;

  @Column({ length: 150, nullable: true })
  modelo: string;

  @Column({ name: 'nro_serie', length: 100, unique: true, nullable: true })
  nroSerie: string;

  @Column({ type: 'enum', enum: EstadoHwEnum, default: EstadoHwEnum.ACTIVO })
  estado: EstadoHwEnum;

  @Column({ name: 'puesto_id', nullable: true })
  puestoId: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'fecha_alta', type: 'date', nullable: true })
  fechaAlta: string;

  @Column({ name: 'fecha_baja', type: 'date', nullable: true })
  fechaBaja: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Puesto, (p) => p.equipo)
  @JoinColumn({ name: 'puesto_id' })
  puesto: Puesto;

  @OneToMany(() => Ticket, (t) => t.equipo)
  tickets: Ticket[];

  @OneToMany(() => SoftwareEquipo, (se) => se.equipo)
  softwareInstalado: SoftwareEquipo[];

  @ManyToMany(() => Contrato, (c) => c.equipos)
  contratos: Contrato[];
}
