import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoftwareService } from './software.service';
import { SoftwareController } from './software.controller';
import { Software } from './entities/software.entity';
import { SoftwareEquipo } from './entities/software-equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Software, SoftwareEquipo])],
  controllers: [SoftwareController],
  providers: [SoftwareService],
  exports: [SoftwareService, TypeOrmModule],
})
export class SoftwareModule {}
