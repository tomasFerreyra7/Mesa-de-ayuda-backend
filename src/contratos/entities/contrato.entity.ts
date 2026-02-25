import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable,
} from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
import { Software } from '../../software/entities/software.entity';

export enum TipoContratoEnum {
  MANTENIMIENTO_HW = 'Mantenimiento HW',
  SOPORTE_SW = 'Soporte SW',
  CONECTIVIDAD = 'Conectividad',
  SEGURIDAD_IT = 'Seguridad IT',
  CONSULTORIA = 'Consultoria',
  OTRO = 'Otro',
}

export enum EstadoContratoEnum {
  VIGENTE = 'Vigente',
  POR_VENCER = 'Por Vencer',
  VENCIDO = 'Vencido',
  RESCINDIDO = 'Rescindido',
  EN_RENOVACION = 'En Renovacion',
}

@Entity({ schema: 'pj', name: 'contrato' })
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nro_contrato', length: 30, unique: true })
  nroContrato: string;

  @Column({ name: 'proveedor_id' })
  proveedorId: number;

  @Column({ type: 'enum', enum: TipoContratoEnum })
  tipo: TipoContratoEnum;

  @Column({ length: 300, nullable: true })
  descripcion: string;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio: string;

  @Column({ name: 'fecha_venc', type: 'date' })
  fechaVenc: string;

  @Column({ type: 'enum', enum: EstadoContratoEnum, default: EstadoContratoEnum.VIGENTE })
  estado: EstadoContratoEnum;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  monto: number;

  @Column({ length: 3, default: 'ARS' })
  moneda: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Proveedor, (p) => p.contratos)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @ManyToMany(() => Equipo, (e) => e.contratos)
  @JoinTable({
    name: 'contrato_equipo',
    schema: 'pj',
    joinColumn: { name: 'contrato_id' },
    inverseJoinColumn: { name: 'equipo_id' },
  })
  equipos: Equipo[];

  @ManyToMany(() => Software, (s) => s.contratos)
  @JoinTable({
    name: 'contrato_software',
    schema: 'pj',
    joinColumn: { name: 'contrato_id' },
    inverseJoinColumn: { name: 'software_id' },
  })
  softwares: Software[];
}
