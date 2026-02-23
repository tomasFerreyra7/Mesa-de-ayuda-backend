import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Contrato } from './contrato.entity';

@Entity({ schema: 'pj', name: 'proveedor' })
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  nombre: string;

  @Column({ length: 20, unique: true, nullable: true })
  cuit: string;

  @Column({ length: 50, nullable: true })
  telefono: string;

  @Column({ length: 254, nullable: true })
  email: string;

  @Column({ length: 150, nullable: true })
  contacto: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Contrato, (c) => c.proveedor)
  contratos: Contrato[];
}
