import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SoftwareService } from './software.service';
import { CreateSoftwareDto, UpdateSoftwareDto, InstalarSoftwareDto, FilterSoftwareDto } from './dto/software.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolEnum } from '../usuarios/entities/usuario.entity';

@ApiTags('Inventario Software')
@ApiBearerAuth()
@Controller('software')
export class SoftwareController {
  constructor(private readonly service: SoftwareService) {}

  @Get()
  @ApiOperation({ summary: 'Listar software y licencias' })
  findAll(@Query() filter: FilterSoftwareDto) {
    return this.service.findAll(filter);
  }

  @Post()
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Registrar software' })
  create(@Body() dto: CreateSoftwareDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de software' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Actualizar software/licencia' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSoftwareDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja software (estado = Dado de Baja)' })
  darDeBaja(@Param('id', ParseIntPipe) id: number) {
    return this.service.darDeBaja(id);
  }

  @Get(':id/instalaciones')
  @ApiOperation({ summary: 'Ver instalaciones del software' })
  getInstalaciones(@Param('id', ParseIntPipe) id: number) {
    return this.service.getInstalaciones(id);
  }

  @Post(':id/instalaciones')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Registrar instalación en equipo' })
  instalar(@Param('id', ParseIntPipe) id: number, @Body() dto: InstalarSoftwareDto) {
    return this.service.instalar(id, dto);
  }

  @Delete(':id/instalaciones/:equipoId')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desinstalar software de equipo' })
  desinstalar(@Param('id', ParseIntPipe) id: number, @Param('equipoId', ParseIntPipe) equipoId: number) {
    return this.service.desinstalar(id, equipoId);
  }
}

