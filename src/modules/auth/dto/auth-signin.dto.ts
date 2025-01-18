import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class AuthSignInDto {
  @Type()
  @IsString()
  @Length(3, 30)
  @IsAlphanumeric()
  @ApiProperty({ default: 'john' })
  username: string;

  @Type()
  @IsString()
  @MinLength(6)
  @ApiProperty({ default: '123456' })
  password: string;
}
