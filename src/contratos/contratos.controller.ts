import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContratosService } from './contratos.service';
import { CreateContratoDto, UpdateContratoDto, CreateProveedorDto, UpdateProveedorDto, FilterContratoDto } from './dto/contrato.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolEnum } from '../usuarios/entities/usuario.entity';

@ApiTags('Contratos')
@ApiBearerAuth()
@Controller()
export class ContratosController {
  constructor(private readonly service: ContratosService) {}

  /* ── CONTRATOS ─────────────────────────────────────────────── */

  @Get('contratos')
  @ApiOperation({ summary: 'Listar contratos' })
  findAll(@Query() filter: FilterContratoDto) {
    return this.service.findAllContratos(filter);
  }

  @Post('contratos')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear contrato' })
  create(@Body() dto: CreateContratoDto) {
    return this.service.createContrato(dto);
  }

  @Get('contratos/:id')
  @ApiOperation({ summary: 'Detalle de contrato' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneContrato(id);
  }

  @Patch('contratos/:id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar contrato' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContratoDto) {
    return this.service.updateContrato(id, dto);
  }

  @Delete('contratos/:id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja contrato (activo = false)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeContrato(id);
  }

  /* ── PROVEEDORES ───────────────────────────────────────────── */

  @Get('proveedores')
  @ApiOperation({ summary: 'Listar proveedores' })
  findAllProveedores() {
    return this.service.findAllProveedores();
  }

  @Post('proveedores')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear proveedor' })
  createProveedor(@Body() dto: CreateProveedorDto) {
    return this.service.createProveedor(dto);
  }

  @Get('proveedores/:id')
  @ApiOperation({ summary: 'Detalle de proveedor con contratos' })
  findOneProveedor(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneProveedor(id);
  }

  @Patch('proveedores/:id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar proveedor (incl. activo para soft delete)' })
  updateProveedor(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProveedorDto) {
    return this.service.updateProveedor(id, dto);
  }

  @Delete('proveedores/:id')
  @Roles(RolEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete: dar de baja proveedor (activo = false)' })
  removeProveedor(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeProveedor(id);
  }
}

