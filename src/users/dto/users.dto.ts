import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Max(90)
  @Min(6)
  age: number;

  @ApiProperty({ required: true, example: 'user@mail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}:;,=]).{8,32}$/)
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
