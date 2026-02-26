import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsInt, IsOptional, IsString, IsBoolean, MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoNotifEnum } from '../entities/notificacion.entity';

export class CreateNotificacionDto {
  @ApiProperty({ description: 'ID del usuario destinatario' })
  @IsInt()
  @Type(() => Number)
  usuario_id: number;

  @ApiProperty({ enum: TipoNotifEnum })
  @IsEnum(TipoNotifEnum)
  tipo: TipoNotifEnum;

  @ApiProperty({ maxLength: 200 })
  @IsString()
  @MaxLength(200)
  titulo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mensaje?: string;

  @ApiPropertyOptional({ description: 'Tipo de recurso referenciado (ej: ticket, contrato)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  referencia_tipo?: string;

  @ApiPropertyOptional({ description: 'ID del recurso referenciado' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  referencia_id?: number;
}

export class UpdateNotificacionDto {
  @ApiPropertyOptional({ description: 'Marcar como leída o no' })
  @IsOptional()
  @IsBoolean()
  leida?: boolean;
}

export class FilterNotificacionDto {
  @ApiPropertyOptional({ description: 'Filtrar por leídas / no leídas' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  leida?: boolean;

  @ApiPropertyOptional({ enum: TipoNotifEnum })
  @IsOptional()
  @IsEnum(TipoNotifEnum)
  tipo?: TipoNotifEnum;
}
