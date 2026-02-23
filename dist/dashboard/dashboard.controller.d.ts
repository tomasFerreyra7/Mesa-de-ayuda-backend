import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly service;
    constructor(service: DashboardService);
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
