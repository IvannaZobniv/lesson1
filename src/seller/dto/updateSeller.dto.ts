import UpdateCarDto from '../../car/updateCar.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enum/user-role';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateSellerDto {
  @ApiProperty({ required: false, example: 'Iva' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false, example: 'Zo' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, example: 'Iva@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, example: 'Abc123' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false, example: '+1234567890' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty({ enum: UserRole })
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ required: false, type: UpdateCarDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCarDto)
  car?: UpdateCarDto;
}

export default UpdateSellerDto;
