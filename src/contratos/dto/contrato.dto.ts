import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional,
  IsString, MaxLength, IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoContratoEnum, EstadoContratoEnum } from '../entities/contrato.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';

export class CreateContratoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  nro_contrato: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  proveedor_id: number;

  @ApiProperty({ enum: TipoContratoEnum })
  @IsEnum(TipoContratoEnum)
  tipo: TipoContratoEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty()
  @IsDateString()
  fecha_inicio: string;

  @ApiProperty()
  @IsDateString()
  fecha_venc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  monto?: number;

  @ApiPropertyOptional({ default: 'ARS' })
  @IsOptional()
  @IsString()
  moneda?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  equipo_ids?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  software_ids?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateContratoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fecha_venc?: string;

  @ApiPropertyOptional({ enum: EstadoContratoEnum })
  @IsOptional()
  @IsEnum(EstadoContratoEnum)
  estado?: EstadoContratoEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  monto?: number;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  equipo_ids?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  software_ids?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({ description: 'Soft delete: false para dar de baja' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class CreateProveedorDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cuit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contacto?: string;
}

export class UpdateProveedorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cuit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contacto?: string;

  @ApiPropertyOptional({ description: 'Soft delete: false para dar de baja' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class FilterContratoDto extends PaginationDto {
  @ApiPropertyOptional({ enum: EstadoContratoEnum })
  @IsOptional()
  @IsEnum(EstadoContratoEnum)
  estado?: EstadoContratoEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  proveedor_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  por_vencer_dias?: number;
}
