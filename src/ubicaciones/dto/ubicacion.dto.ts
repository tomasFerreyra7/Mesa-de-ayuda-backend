import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsBoolean, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoJuzgadoEnum } from '../entities/juzgado.entity';

// ─── Circunscripción ─────────────────────────────────────────
export class CreateCircunscripcionDto {
  @ApiProperty({ example: 'C1' })
  @IsString()
  @MaxLength(20)
  codigo: string;

  @ApiProperty({ example: 'Primera Circunscripción' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateCircunscripcionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// ─── Distrito ────────────────────────────────────────────────
export class CreateDistritoDto {
  @ApiProperty({ description: 'ID de la circunscripción' })
  @IsInt()
  @Type(() => Number)
  circunscripcion_id: number;

  @ApiProperty({ example: 'D1' })
  @IsString()
  @MaxLength(20)
  codigo: string;

  @ApiProperty({ example: 'Distrito Centro' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  edificio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  direccion?: string;
}

export class UpdateDistritoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  edificio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// ─── Juzgado ─────────────────────────────────────────────────
export class CreateJuzgadoDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  distrito_id: number;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  codigo: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({ enum: TipoJuzgadoEnum })
  @IsOptional()
  @IsEnum(TipoJuzgadoEnum)
  tipo?: TipoJuzgadoEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  piso?: string;
}

export class UpdateJuzgadoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  piso?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class CreatePuestoDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  numero: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  descripcion?: string;
}

export class FilterJuzgadoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  distrito_id?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  activo?: boolean;
}

