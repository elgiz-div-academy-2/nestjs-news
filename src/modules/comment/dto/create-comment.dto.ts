import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @Type()
  @IsString()
  @MinLength(5)
  @ApiProperty()
  content: string;
}
