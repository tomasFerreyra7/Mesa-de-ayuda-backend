import { Usuario } from './usuario.entity';
export declare enum TipoNotifEnum {
    CONTRATO_POR_VENCER = "contrato_por_vencer",
    LICENCIA_POR_VENCER = "licencia_por_vencer",
    TICKET_ASIGNADO = "ticket_asignado",
    TICKET_ACTUALIZADO = "ticket_actualizado",
    TICKET_RESUELTO = "ticket_resuelto",
    EQUIPO_MANTENIMIENTO = "equipo_mantenimiento",
    SISTEMA = "sistema"
}
export declare class Notificacion {
    id: number;
    usuarioId: number;
    tipo: TipoNotifEnum;
    titulo: string;
    mensaje: string;
    leida: boolean;
    referenciaTipo: string;
    referenciaId: number;
    createdAt: Date;
    usuario: Usuario;
}
