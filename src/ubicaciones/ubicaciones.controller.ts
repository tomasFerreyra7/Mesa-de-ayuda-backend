import {
  Controller, Get, Post, Patch, Body, Param, Query, ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UbicacionesService } from './ubicaciones.service';
import {
  CreateCircunscripcionDto, UpdateCircunscripcionDto,
  CreateDistritoDto, UpdateDistritoDto,
  CreateJuzgadoDto, UpdateJuzgadoDto, CreatePuestoDto, FilterJuzgadoDto,
} from './dto/ubicacion.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolEnum } from '../usuarios/entities/usuario.entity';

@ApiTags('Ubicaciones')
@ApiBearerAuth()
@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly service: UbicacionesService) {}

  @Get('circunscripciones')
  @ApiOperation({ summary: 'Árbol completo: circunscripciones con distritos' })
  getArbol() {
    return this.service.getArbol();
  }

  @Post('circunscripciones')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear circunscripción' })
  createCircunscripcion(@Body() dto: CreateCircunscripcionDto) {
    return this.service.createCircunscripcion(dto);
  }

  @Patch('circunscripciones/:id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar circunscripción' })
  updateCircunscripcion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCircunscripcionDto,
  ) {
    return this.service.updateCircunscripcion(id, dto);
  }

  @Post('distritos')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear distrito' })
  createDistrito(@Body() dto: CreateDistritoDto) {
    return this.service.createDistrito(dto);
  }

  @Patch('distritos/:id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar distrito' })
  updateDistrito(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDistritoDto,
  ) {
    return this.service.updateDistrito(id, dto);
  }

  @Get('juzgados')
  @ApiOperation({ summary: 'Listar juzgados/dependencias' })
  findJuzgados(@Query() filter: FilterJuzgadoDto) {
    return this.service.findJuzgados(filter);
  }

  @Post('juzgados')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear juzgado o dependencia' })
  createJuzgado(@Body() dto: CreateJuzgadoDto) {
    return this.service.createJuzgado(dto);
  }

  @Get('juzgados/:id')
  @ApiOperation({ summary: 'Detalle de juzgado con puestos y equipos' })
  findOneJuzgado(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneJuzgado(id);
  }

  @Patch('juzgados/:id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar juzgado' })
  updateJuzgado(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJuzgadoDto) {
    return this.service.updateJuzgado(id, dto);
  }

  @Post('juzgados/:id/puestos')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Agregar puesto al juzgado' })
  createPuesto(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePuestoDto) {
    return this.service.createPuesto(id, dto);
  }
}
