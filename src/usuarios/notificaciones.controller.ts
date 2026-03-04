import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacionDto, UpdateNotificacionDto, FilterNotificacionDto } from './dto/notificacion.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Usuario, RolEnum } from './entities/usuario.entity';

@ApiTags('Notificaciones')
@ApiBearerAuth()
@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly service: NotificacionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar mis notificaciones' })
  findAll(@CurrentUser() user: Usuario, @Query() filter: FilterNotificacionDto) {
    return this.service.findAllByUsuario(user.id, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de una notificación (solo las propias)' })
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Usuario) {
    return this.service.findOne(id, user.id);
  }

  @Post()
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear notificación para un usuario (solo admin)' })
  create(@Body() dto: CreateNotificacionDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar notificación (ej: marcar como leída)' })
  update(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Usuario, @Body() dto: UpdateNotificacionDto) {
    return this.service.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar notificación (borrado permanente, solo las propias)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Usuario) {
    return this.service.remove(id, user.id);
  }
}
