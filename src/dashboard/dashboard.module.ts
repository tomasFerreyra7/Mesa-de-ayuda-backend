import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { Software } from '../software/entities/software.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Equipo, Contrato, Software])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
