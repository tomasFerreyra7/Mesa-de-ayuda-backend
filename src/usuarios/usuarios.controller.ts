import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  Query, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto, FilterUsuarioDto } from './dto/usuario.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolEnum } from './entities/usuario.entity';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Get()
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Listar usuarios (solo admin)' })
  findAll(@Query() filter: FilterUsuarioDto) {
    return this.service.findAll(filter);
  }

  @Get('tecnicos/disponibles')
  @ApiOperation({ summary: 'Técnicos disponibles con carga de tickets' })
  getTecnicos(@Query('juzgado_id') juzgadoId?: number) {
    return this.service.getTecnicosDisponibles(juzgadoId);
  }

  @Get(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Detalle de usuario' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear usuario' })
  create(@Body() dto: CreateUsuarioDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar usuario' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desactivar usuario (soft delete)' })
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.service.deactivate(id);
  }
}
