import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class NewsListQueryDto extends PaginationDto {
  @Type()
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  category: number;

  @IsOptional()
  @Transform(({ value }) => (!value || value === 'false' ? false : true))
  @ApiProperty({ default: false, required: false })
  popular: boolean;

  @IsOptional()
  @Transform(({ value }) => (!value || value === 'false' ? false : true))
  @ApiProperty({ default: false, required: false })
  top: boolean;
}
