import { SoftwareEquipo } from './software-equipo.entity';
import { Contrato } from '../../contratos/entities/contrato.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export declare enum TipoSwEnum {
    SISTEMA_OPERATIVO = "Sistema Operativo",
    OFIMATICA = "Ofimatica",
    SEGURIDAD = "Seguridad",
    GESTION_JUDICIAL = "Gestion Judicial",
    UTILIDADES = "Utilidades",
    OTRO = "Otro"
}
export declare enum EstadoSwEnum {
    ACTIVO = "Activo",
    POR_VENCER = "Por Vencer",
    VENCIDO = "Vencido",
    SIN_LICENCIA = "Sin Licencia",
    DADO_DE_BAJA = "Dado de Baja"
}
export declare enum TipoLicenciaEnum {
    OEM = "OEM",
    VOLUMEN = "Volumen",
    SUSCRIPCION = "Suscripcion",
    OPEN_SOURCE = "Open Source",
    FREEWARE = "Freeware",
    OTRO = "Otro"
}
export declare class Software {
    id: number;
    nroSw: string;
    nombre: string;
    version: string;
    tipo: TipoSwEnum;
    proveedor: string;
    tipoLicencia: TipoLicenciaEnum;
    descripcionLic: string;
    maxInstalaciones: number;
    instalacionesAct: number;
    fechaVencimiento: string;
    estado: EstadoSwEnum;
    observaciones: string;
    createdAt: Date;
    updatedAt: Date;
    instalaciones: SoftwareEquipo[];
    contratos: Contrato[];
    tickets: Ticket[];
}
