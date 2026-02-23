import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionesService } from './ubicaciones.service';
import { UbicacionesController } from './ubicaciones.controller';
import { Circunscripcion } from './entities/circunscripcion.entity';
import { Distrito } from './entities/distrito.entity';
import { Juzgado } from './entities/juzgado.entity';
import { Puesto } from './entities/puesto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circunscripcion, Distrito, Juzgado, Puesto])],
  controllers: [UbicacionesController],
  providers: [UbicacionesService],
  exports: [UbicacionesService, TypeOrmModule],
})
export class UbicacionesModule {}
