import { Contrato } from './contrato.entity';
export declare class Proveedor {
    id: number;
    nombre: string;
    cuit: string;
    telefono: string;
    email: string;
    contacto: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    contratos: Contrato[];
}
