import { Repository } from 'typeorm';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { Software } from '../software/entities/software.entity';
export declare class DashboardService {
    private readonly ticketRepo;
    private readonly equipoRepo;
    private readonly contratoRepo;
    private readonly softwareRepo;
    constructor(ticketRepo: Repository<Ticket>, equipoRepo: Repository<Equipo>, contratoRepo: Repository<Contrato>, softwareRepo: Repository<Software>);
    getKpis(): Promise<{
        tickets_abiertos: number;
        tickets_en_progreso: number;
        equipos_activos: number;
        contratos_vigentes: number;
        contratos_por_vencer: number;
        tickets_resueltos_mes: number;
        tickets_cerrados_mes: number;
    }>;
    getAlertas(): Promise<{
        tipo: string;
        mensaje: string;
        severidad: "danger" | "warning" | "info";
        referencia_tipo: string;
        referencia_id: number;
    }[]>;
}
