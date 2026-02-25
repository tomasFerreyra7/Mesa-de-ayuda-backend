import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UbicacionesService } from './ubicaciones.service';
import {
  CreateCircunscripcionDto,
  UpdateCircunscripcionDto,
  CreateDistritoDto,
  UpdateDistritoDto,
  CreateJuzgadoDto,
  UpdateJuzgadoDto,
  CreatePuestoDto,
  UpdatePuestoDto,
  FilterDistritoDto,
  FilterJuzgadoDto,
  FilterPuestoDto,
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
  updateCircunscripcion(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCircunscripcionDto) {
    return this.service.updateCircunscripcion(id, dto);
  }

  @Delete('circunscripciones/:id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja circunscripción' })
  removeCircunscripcion(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeCircunscripcion(id);
  }

  @Get('distritos')
  @ApiOperation({ summary: 'Listar distritos' })
  findDistritos(@Query() filter: FilterDistritoDto) {
    return this.service.findDistritos(filter);
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
  updateDistrito(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDistritoDto) {
    return this.service.updateDistrito(id, dto);
  }

  @Delete('distritos/:id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja distrito' })
  removeDistrito(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeDistrito(id);
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

  @Delete('juzgados/:id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja juzgado' })
  removeJuzgado(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeJuzgado(id);
  }

  @Get('juzgados/:id/puestos')
  @ApiOperation({ summary: 'Listar puestos del juzgado' })
  findPuestosByJuzgado(@Param('id', ParseIntPipe) id: number) {
    return this.service.findPuestosByJuzgado(id);
  }

  @Get('juzgados/:id/puestos/:puestoId')
  @ApiOperation({ summary: 'Detalle de puesto del juzgado (con juzgado y equipo)' })
  findOnePuestoByJuzgado(@Param('id', ParseIntPipe) id: number, @Param('puestoId', ParseIntPipe) puestoId: number) {
    return this.service.findOnePuestoByJuzgado(id, puestoId);
  }

  @Post('juzgados/:id/puestos')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Agregar puesto al juzgado' })
  createPuesto(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePuestoDto) {
    return this.service.createPuesto(id, dto);
  }

  @Patch('juzgados/:juzgadoId/puestos/:puestoId')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar puesto' })
  updatePuesto(@Param('juzgadoId', ParseIntPipe) juzgadoId: number, @Param('puestoId', ParseIntPipe) puestoId: number, @Body() dto: UpdatePuestoDto) {
    return this.service.updatePuesto(juzgadoId, puestoId, dto);
  }

  @Delete('juzgados/:juzgadoId/puestos/:puestoId')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja puesto' })
  removePuesto(@Param('juzgadoId', ParseIntPipe) juzgadoId: number, @Param('puestoId', ParseIntPipe) puestoId: number) {
    return this.service.removePuesto(juzgadoId, puestoId);
  }

  @Get('puestos')
  @ApiOperation({ summary: 'Listar puestos (extra: filtrar por uno o varios juzgados)' })
  findPuestos(@Query() filter: FilterPuestoDto) {
    return this.service.findPuestos(filter);
  }
}
