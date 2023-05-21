import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRole } from '../../common/enum/user-role';
import CreateCarDto from '../../car/createCar.dto';
import { Type } from 'class-transformer';

class CreateSellerDto {
  @ApiProperty({ required: true, example: 'Iva' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false, example: 'Zo' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: true, example: 'Iva@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true, example: 'Abc123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true, example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ required: false, type: CreateCarDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCarDto)
  car?: CreateCarDto;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  premiumSellerId?: number;
}

export default CreateSellerDto;
