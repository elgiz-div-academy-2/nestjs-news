import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateNewsDto {
  @Type()
  @Length(5, 100)
  @IsString()
  @ApiProperty({ default: 'title' })
  title: string;

  @Type()
  @Length(10, 10000)
  @IsString()
  @ApiProperty({ default: 'minimum content' })
  content: string;

  @Type()
  @IsString()
  @ApiProperty({ default: 'slug-data' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @IsOptional()
  slug: string;

  @Type()
  @IsUrl()
  @ApiProperty({
    default:
      'https://images.unsplash.com/photo-1735597693189-9ba81b5bbc83?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  thumbnail: string;

  @Type()
  @IsInt()
  @ApiProperty({ default: 1 })
  categoryId: number;
}
