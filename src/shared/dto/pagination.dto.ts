import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type()
  @IsInt()
  @Min(1)
  @Max(500)
  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  limit: number = 10;

  @Type()
  @IsInt()
  @Min(1)
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  page: number = 1;
}
