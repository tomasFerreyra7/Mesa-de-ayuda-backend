import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToMany,
} from 'typeorm';
import { SoftwareEquipo } from './software-equipo.entity';
import { Contrato } from '../../contratos/entities/contrato.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

export enum TipoSwEnum {
  SISTEMA_OPERATIVO = 'Sistema Operativo',
  OFIMATICA = 'Ofimatica',
  SEGURIDAD = 'Seguridad',
  GESTION_JUDICIAL = 'Gestion Judicial',
  UTILIDADES = 'Utilidades',
  OTRO = 'Otro',
}

export enum EstadoSwEnum {
  ACTIVO = 'Activo',
  POR_VENCER = 'Por Vencer',
  VENCIDO = 'Vencido',
  SIN_LICENCIA = 'Sin Licencia',
  DADO_DE_BAJA = 'Dado de Baja',
}

export enum TipoLicenciaEnum {
  OEM = 'OEM',
  VOLUMEN = 'Volumen',
  SUSCRIPCION = 'Suscripcion',
  OPEN_SOURCE = 'Open Source',
  FREEWARE = 'Freeware',
  OTRO = 'Otro',
}

@Entity({ schema: 'pj', name: 'software' })
export class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nro_sw', length: 20, unique: true })
  nroSw: string;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 50, nullable: true })
  version: string;

  @Column({ type: 'enum', enum: TipoSwEnum })
  tipo: TipoSwEnum;

  @Column({ length: 150, nullable: true })
  proveedor: string;

  @Column({ name: 'tipo_licencia', type: 'enum', enum: TipoLicenciaEnum, nullable: true })
  tipoLicencia: TipoLicenciaEnum;

  @Column({ name: 'descripcion_lic', length: 300, nullable: true })
  descripcionLic: string;

  @Column({ name: 'max_instalaciones', nullable: true })
  maxInstalaciones: number;

  @Column({ name: 'instalaciones_act', default: 0 })
  instalacionesAct: number;

  @Column({ name: 'fecha_vencimiento', type: 'date', nullable: true })
  fechaVencimiento: string;

  @Column({ type: 'enum', enum: EstadoSwEnum, default: EstadoSwEnum.ACTIVO })
  estado: EstadoSwEnum;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => SoftwareEquipo, (se) => se.software)
  instalaciones: SoftwareEquipo[];

  @ManyToMany(() => Contrato, (c) => c.softwares)
  contratos: Contrato[];

  @OneToMany(() => Ticket, (t) => t.software)
  tickets: Ticket[];
}
