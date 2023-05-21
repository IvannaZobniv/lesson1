import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import {
  COMPANY_REGEX,
  FIRSTNAME_REGEX,
  LASTNAME_REGEX,
  PASSWORD_REGEX,
  POSITION_REGEX,
} from '../../common/regex/register.regex';
import { UserRole } from '../../common/enum/user-role';
import { Profanity } from '../../common/decorator/Profanity';

export class CreateAdminDto {
  @ApiProperty({ required: true, example: 'admin@anycompany.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Abc123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least one uppercase and lowercase letter, one number, one special character, and must be at least 8 characters long',
  })
  password: string;

  @ApiProperty({ required: true, example: 'Catcatcat' })
  @IsNotEmpty()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'The name must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @Profanity()
  firstName: string;

  @ApiProperty({ required: false, example: 'Catcat' })
  @IsOptional()
  @IsString()
  @Matches(LASTNAME_REGEX, {
    message:
      'Surname must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @Profanity()
  lastName?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiProperty({ required: true, example: 'AnyCompany' })
  @IsNotEmpty()
  @IsString()
  @Matches(COMPANY_REGEX, {
    message: 'The company name must be AnyCompany or its partners',
  })
  company: string;

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ required: false, example: '+380664563999' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: true, example: 'Developer' })
  @IsNotEmpty()
  @IsString()
  @Matches(POSITION_REGEX, {
    message:
      'Position must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @Profanity()
  position: string;
}
