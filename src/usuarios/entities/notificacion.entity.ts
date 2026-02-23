import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

export enum TipoNotifEnum {
  CONTRATO_POR_VENCER = 'contrato_por_vencer',
  LICENCIA_POR_VENCER = 'licencia_por_vencer',
  TICKET_ASIGNADO = 'ticket_asignado',
  TICKET_ACTUALIZADO = 'ticket_actualizado',
  TICKET_RESUELTO = 'ticket_resuelto',
  EQUIPO_MANTENIMIENTO = 'equipo_mantenimiento',
  SISTEMA = 'sistema',
}

@Entity({ schema: 'pj', name: 'notificacion' })
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ type: 'enum', enum: TipoNotifEnum })
  tipo: TipoNotifEnum;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  mensaje: string;

  @Column({ default: false })
  leida: boolean;

  @Column({ name: 'referencia_tipo', length: 50, nullable: true })
  referenciaTipo: string;

  @Column({ name: 'referencia_id', nullable: true })
  referenciaId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Usuario, (u) => u.notificaciones)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
