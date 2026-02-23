import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsInt, IsOptional, IsString, MaxLength, IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoSwEnum, EstadoSwEnum, TipoLicenciaEnum } from '../entities/software.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';

export class CreateSoftwareDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nro_sw?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  version?: string;

  @ApiProperty({ enum: TipoSwEnum })
  @IsEnum(TipoSwEnum)
  tipo: TipoSwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  proveedor?: string;

  @ApiPropertyOptional({ enum: TipoLicenciaEnum })
  @IsOptional()
  @IsEnum(TipoLicenciaEnum)
  tipo_licencia?: TipoLicenciaEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion_lic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_instalaciones?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateSoftwareDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  version?: string;

  @ApiPropertyOptional({ enum: TipoSwEnum })
  @IsOptional()
  @IsEnum(TipoSwEnum)
  tipo?: TipoSwEnum;

  @ApiPropertyOptional({ enum: TipoLicenciaEnum })
  @IsOptional()
  @IsEnum(TipoLicenciaEnum)
  tipo_licencia?: TipoLicenciaEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion_lic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_instalaciones?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string;

  @ApiPropertyOptional({ enum: EstadoSwEnum })
  @IsOptional()
  @IsEnum(EstadoSwEnum)
  estado?: EstadoSwEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class InstalarSoftwareDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  equipo_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  version_inst?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fecha_inst?: string;
}

export class FilterSoftwareDto extends PaginationDto {
  @ApiPropertyOptional({ enum: TipoSwEnum })
  @IsOptional()
  @IsEnum(TipoSwEnum)
  tipo?: TipoSwEnum;

  @ApiPropertyOptional({ enum: EstadoSwEnum })
  @IsOptional()
  @IsEnum(EstadoSwEnum)
  estado?: EstadoSwEnum;
}
