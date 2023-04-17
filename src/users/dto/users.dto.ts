import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  email: string;

  @IsString()
  city: string;
  @IsBoolean()
  status: boolean;
}
