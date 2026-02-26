import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { Usuario } from './entities/usuario.entity';
import { Notificacion } from './entities/notificacion.entity';
import { Juzgado } from '../ubicaciones/entities/juzgado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Notificacion, Juzgado])],
  controllers: [UsuariosController, NotificacionesController],
  providers: [UsuariosService, NotificacionesService],
  exports: [UsuariosService, NotificacionesService, TypeOrmModule],
})
export class UsuariosModule {}
