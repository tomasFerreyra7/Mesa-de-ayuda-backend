import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsInt, IsOptional, IsString, IsBoolean, MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClaseHwEnum, EstadoHwEnum } from '../entities/equipo.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';

export class CreateEquipoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  nro_inventario: string;

  @ApiProperty({ enum: ClaseHwEnum })
  @IsEnum(ClaseHwEnum)
  clase: ClaseHwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtipo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  marca?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  modelo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nro_serie?: string;

  @ApiPropertyOptional({ enum: EstadoHwEnum })
  @IsOptional()
  @IsEnum(EstadoHwEnum)
  estado?: EstadoHwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  puesto_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fecha_alta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateEquipoDto {
  @ApiPropertyOptional({ enum: ClaseHwEnum })
  @IsOptional()
  @IsEnum(ClaseHwEnum)
  clase?: ClaseHwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtipo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  marca?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  modelo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nro_serie?: string;

  @ApiPropertyOptional({ enum: EstadoHwEnum })
  @IsOptional()
  @IsEnum(EstadoHwEnum)
  estado?: EstadoHwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  puesto_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class ReubicarEquipoDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  puesto_id: number | null;
}

export class FilterEquipoDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ClaseHwEnum })
  @IsOptional()
  @IsEnum(ClaseHwEnum)
  clase?: ClaseHwEnum;

  @ApiPropertyOptional({ enum: EstadoHwEnum })
  @IsOptional()
  @IsEnum(EstadoHwEnum)
  estado?: EstadoHwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  juzgado_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  sin_asignar?: boolean;
}
