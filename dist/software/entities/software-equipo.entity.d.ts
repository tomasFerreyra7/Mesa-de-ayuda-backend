import { Software } from './software.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
export declare class SoftwareEquipo {
    id: number;
    softwareId: number;
    equipoId: number;
    versionInst: string;
    fechaInst: string;
    activo: boolean;
    software: Software;
    equipo: Equipo;
}
