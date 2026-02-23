import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  Query, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import {
  CreateTicketDto, UpdateTicketDto, CambiarEstadoDto,
  AsignarTicketDto, CreateComentarioDto, FilterTicketDto,
} from './dto/ticket.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolEnum } from '../usuarios/entities/usuario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tickets' })
  findAll(@Query() filter: FilterTicketDto, @CurrentUser() user: Usuario) {
    return this.service.findAll(filter, user);
  }

  @Post()
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Crear ticket' })
  create(@Body() dto: CreateTicketDto, @CurrentUser() user: Usuario) {
    return this.service.create(dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de ticket' })
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Usuario) {
    return this.service.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar ticket' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
    @CurrentUser() user: Usuario,
  ) {
    return this.service.update(id, dto, user);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado del ticket' })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoDto,
    @CurrentUser() user: Usuario,
  ) {
    return this.service.cambiarEstado(id, dto, user);
  }

  @Patch(':id/asignar')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Asignar ticket a técnico' })
  asignar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AsignarTicketDto,
    @CurrentUser() user: Usuario,
  ) {
    return this.service.asignar(id, dto, user);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar ticket (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get(':id/comentarios')
  @ApiOperation({ summary: 'Comentarios del ticket' })
  getComentarios(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Usuario) {
    return this.service.getComentarios(id, user);
  }

  @Post(':id/comentarios')
  @ApiOperation({ summary: 'Agregar comentario' })
  addComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateComentarioDto,
    @CurrentUser() user: Usuario,
  ) {
    return this.service.addComentario(id, dto, user);
  }

  @Get(':id/historial')
  @ApiOperation({ summary: 'Historial de estados del ticket' })
  getHistorial(@Param('id', ParseIntPipe) id: number) {
    return this.service.getHistorial(id);
  }
}
