import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserGender } from 'src/modules/user/user.types';

export class AuthRegisterDto {
  @Type()
  @IsString()
  @Length(3, 30)
  @ApiProperty({ default: 'john' })
  username: string;

  @Type()
  @IsString()
  @MinLength(6)
  @ApiProperty({ default: '123456' })
  password: string;

  @Type()
  @IsEnum(UserGender)
  @ApiProperty({ default: UserGender.MALE })
  gender: UserGender;

  @Type()
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, default: 'John Doe' })
  fullName: string;
}
