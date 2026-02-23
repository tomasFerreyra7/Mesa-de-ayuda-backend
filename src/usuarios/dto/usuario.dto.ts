import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail, IsEnum, IsOptional, IsString, IsBoolean,
  IsArray, IsInt, MinLength, Matches, MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RolEnum } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4)
  iniciales?: string;

  @ApiProperty({ enum: RolEnum })
  @IsEnum(RolEnum)
  rol: RolEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'avatarColor debe ser un color hex válido (#RRGGBB)' })
  avatarColor?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  juzgadoIds?: number[];
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class FilterUsuarioDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: RolEnum })
  @IsOptional()
  @IsEnum(RolEnum)
  rol?: RolEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  activo?: boolean;
}
