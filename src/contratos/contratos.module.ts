import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { Contrato } from './entities/contrato.entity';
import { Proveedor } from './entities/proveedor.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Software } from '../software/entities/software.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato, Proveedor, Equipo, Software])],
  controllers: [ContratosController],
  providers: [ContratosService],
  exports: [ContratosService],
})
export class ContratosModule {}
