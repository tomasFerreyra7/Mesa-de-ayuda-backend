import { Puesto } from '../../ubicaciones/entities/puesto.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { SoftwareEquipo } from '../../software/entities/software-equipo.entity';
import { Contrato } from '../../contratos/entities/contrato.entity';
export declare enum ClaseHwEnum {
    COMPUTADORA = "Computadora",
    IMPRESORA = "Impresora",
    MONITOR = "Monitor",
    SCANNER = "Scanner",
    SERVIDOR = "Servidor",
    RED = "Red",
    UPS = "UPS",
    PERIFERICO = "Periferico",
    OTRO = "Otro"
}
export declare enum EstadoHwEnum {
    ACTIVO = "Activo",
    INACTIVO = "Inactivo",
    EN_MANTENIMIENTO = "En Mantenimiento",
    DADO_DE_BAJA = "Dado de Baja"
}
export declare class Equipo {
    id: number;
    nroInventario: string;
    clase: ClaseHwEnum;
    subtipo: string;
    marca: string;
    modelo: string;
    nroSerie: string;
    estado: EstadoHwEnum;
    puestoId: number;
    observaciones: string;
    fechaAlta: string;
    fechaBaja: string;
    createdAt: Date;
    updatedAt: Date;
    puesto: Puesto;
    tickets: Ticket[];
    softwareInstalado: SoftwareEquipo[];
    contratos: Contrato[];
}
