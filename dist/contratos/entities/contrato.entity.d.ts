import { Proveedor } from './proveedor.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
import { Software } from '../../software/entities/software.entity';
export declare enum TipoContratoEnum {
    MANTENIMIENTO_HW = "Mantenimiento HW",
    SOPORTE_SW = "Soporte SW",
    CONECTIVIDAD = "Conectividad",
    SEGURIDAD_IT = "Seguridad IT",
    CONSULTORIA = "Consultoria",
    OTRO = "Otro"
}
export declare enum EstadoContratoEnum {
    VIGENTE = "Vigente",
    POR_VENCER = "Por Vencer",
    VENCIDO = "Vencido",
    RESCINDIDO = "Rescindido",
    EN_RENOVACION = "En Renovacion"
}
export declare class Contrato {
    id: number;
    nroContrato: string;
    proveedorId: number;
    tipo: TipoContratoEnum;
    descripcion: string;
    fechaInicio: string;
    fechaVenc: string;
    estado: EstadoContratoEnum;
    monto: number;
    moneda: string;
    observaciones: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    proveedor: Proveedor;
    equipos: Equipo[];
    softwares: Software[];
}
