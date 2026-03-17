import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { Equipo } from './entities/equipo.entity';
import { Puesto } from '../ubicaciones/entities/puesto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Puesto])],
  controllers: [EquiposController],
  providers: [EquiposService],
  exports: [EquiposService, TypeOrmModule],
})
export class EquiposModule {}

