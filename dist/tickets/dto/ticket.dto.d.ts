import { TipoTicketEnum, EstadoTicketEnum, PrioridadTicketEnum } from '../entities/ticket.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';
export declare class CreateTicketDto {
    tipo: TipoTicketEnum;
    asunto: string;
    descripcion?: string;
    prioridad: PrioridadTicketEnum;
    juzgado_id: number;
    equipo_id?: number;
    software_id?: number;
}
export declare class UpdateTicketDto {
    asunto?: string;
    descripcion?: string;
    estado?: EstadoTicketEnum;
    prioridad?: PrioridadTicketEnum;
    asignado_a_id?: number;
}
export declare class CambiarEstadoDto {
    estado: EstadoTicketEnum;
    comentario?: string;
}
export declare class AsignarTicketDto {
    tecnico_id: number;
}
export declare class CreateComentarioDto {
    texto: string;
    interno?: boolean;
}
export declare class FilterTicketDto extends PaginationDto {
    estado?: EstadoTicketEnum;
    prioridad?: PrioridadTicketEnum;
    tipo?: TipoTicketEnum;
    asignado_a_id?: number;
    juzgado_id?: number;
    equipo_id?: number;
}
