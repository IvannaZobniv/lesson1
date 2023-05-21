import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateCarDto {
  @ApiProperty({ required: true, example: 'BMW' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ required: true, example: 'X5' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ required: true, example: 2023 })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ required: true, example: 'Kyiv' })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({ required: true, example: 1000 })
  @IsInt()
  @IsNotEmpty()
  mileage: number;

  @ApiProperty({ required: true, example: 100000 })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true, example: 'USD' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['USD', 'EUR', 'UAH'])
  currency: string;

  @ApiProperty({ required: false, example: 'This is a description of the car' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  image: string;
}

export default CreateCarDto;
