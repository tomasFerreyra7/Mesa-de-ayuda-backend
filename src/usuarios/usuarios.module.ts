import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Notificacion } from './entities/notificacion.entity';
import { Juzgado } from '../ubicaciones/entities/juzgado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Notificacion, Juzgado])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
