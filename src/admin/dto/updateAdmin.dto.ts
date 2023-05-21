import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAdminDto {
  @ApiPropertyOptional({ example: 'admin@anycompany.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Abc123' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid input. The password must contain at least one uppercase and lowercase letter, one digit, one special character, and its length must be at least 8 characters',
  })
  password?: string;

  @ApiPropertyOptional({ example: 'Catcatcat' })
  @IsOptional()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'The name must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @NoProfanity()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Catcat' })
  @IsOptional()
  @IsString()
  @Matches(LASTNAME_REGEX, {
    message:
      'Surname must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @NoProfanity()
  lastName?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional({ example: 'AnyCompany' })
  @IsOptional()
  @IsString()
  @Matches(COMPANY_REGEX, {
    message:
      'The company name must be AnyCompany or its partners',
  })
  company?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: '+380664563999' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Developer' })
  @IsOptional()
  @IsString()
  @Matches(POSITION_REGEX, {
    message:
      'Position must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @NoProfanity()
  position?: string;
}
