import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  per_page?: number = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.per_page ?? 20);
  }

  get take(): number {
    return this.per_page ?? 20;
  }
}

export function paginate<T>(data: T[], total: number, dto: PaginationDto) {
  const page = dto.page ?? 1;
  const per_page = dto.per_page ?? 20;
  return {
    data,
    meta: {
      total,
      page,
      per_page,
      pages: Math.ceil(total / per_page),
    },
  };
}
