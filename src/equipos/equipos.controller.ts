import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto, UpdateEquipoDto, ReubicarEquipoDto, FilterEquipoDto } from './dto/equipo.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolEnum } from '../usuarios/entities/usuario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@ApiTags('Inventario Hardware')
@ApiBearerAuth()
@Controller('equipos')
export class EquiposController {
  constructor(private readonly service: EquiposService) {}

  @Get()
  @ApiOperation({ summary: 'Listar equipos' })
  findAll(@Query() filter: FilterEquipoDto, @CurrentUser() user: Usuario) {
    return this.service.findAll(filter, user);
  }

  @Post()
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Dar de alta equipo' })
  create(@Body() dto: CreateEquipoDto, @CurrentUser() user: Usuario) {
    return this.service.create(dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de equipo' })
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Usuario) {
    return this.service.findOne(id, user);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Actualizar equipo' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEquipoDto, @CurrentUser() user: Usuario) {
    return this.service.update(id, dto, user);
  }

  @Patch(':id/reubicar')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Mover equipo a otro puesto' })
  reubicar(@Param('id', ParseIntPipe) id: number, @Body() dto: ReubicarEquipoDto, @CurrentUser() user: Usuario) {
    return this.service.reubicar(id, dto, user);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Dar de baja equipo (soft delete)' })
  darDeBaja(@Param('id', ParseIntPipe) id: number) {
    return this.service.darDeBaja(id);
  }
}

