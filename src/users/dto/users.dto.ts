import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValid } from '../decorators/check.days.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: true, example: 'user@mail.com' })
  @IsString()
  @IsEmail()
  // @Matches('')
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  // @IsEnum(CityEnum)
  city: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  avatar: string;

  // таблиця для персоналу
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsValid()
  dayOff: string; //  '1/35'
}
