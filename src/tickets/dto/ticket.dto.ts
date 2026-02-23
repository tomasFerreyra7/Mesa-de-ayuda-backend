import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum, IsInt, IsOptional, IsString, IsBoolean,
  MaxLength, IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  TipoTicketEnum, EstadoTicketEnum, PrioridadTicketEnum,
} from '../entities/ticket.entity';
import { PaginationDto } from '../../common/pipes/pagination.dto';

export class CreateTicketDto {
  @ApiProperty({ enum: TipoTicketEnum })
  @IsEnum(TipoTicketEnum)
  tipo: TipoTicketEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  asunto: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ enum: PrioridadTicketEnum })
  @IsEnum(PrioridadTicketEnum)
  prioridad: PrioridadTicketEnum;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  juzgado_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  equipo_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  software_id?: number;
}

export class UpdateTicketDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  asunto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ enum: EstadoTicketEnum })
  @IsOptional()
  @IsEnum(EstadoTicketEnum)
  estado?: EstadoTicketEnum;

  @ApiPropertyOptional({ enum: PrioridadTicketEnum })
  @IsOptional()
  @IsEnum(PrioridadTicketEnum)
  prioridad?: PrioridadTicketEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  asignado_a_id?: number;
}

export class CambiarEstadoDto {
  @ApiProperty({ enum: EstadoTicketEnum })
  @IsEnum(EstadoTicketEnum)
  estado: EstadoTicketEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comentario?: string;
}

export class AsignarTicketDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  tecnico_id: number;
}

export class CreateComentarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  interno?: boolean = false;
}

export class FilterTicketDto extends PaginationDto {
  @ApiPropertyOptional({ enum: EstadoTicketEnum })
  @IsOptional()
  @IsEnum(EstadoTicketEnum)
  estado?: EstadoTicketEnum;

  @ApiPropertyOptional({ enum: PrioridadTicketEnum })
  @IsOptional()
  @IsEnum(PrioridadTicketEnum)
  prioridad?: PrioridadTicketEnum;

  @ApiPropertyOptional({ enum: TipoTicketEnum })
  @IsOptional()
  @IsEnum(TipoTicketEnum)
  tipo?: TipoTicketEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  asignado_a_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  juzgado_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  equipo_id?: number;
}
