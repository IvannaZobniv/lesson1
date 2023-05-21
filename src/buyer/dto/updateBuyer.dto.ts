import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  FIRSTNAME_REGEX,
  LASTNAME_REGEX,
  PASSWORD_REGEX,
} from '../../common/regex/register.regex';
import { UserRole } from '../../common/enum/user-role';
import { Profanity } from '../../common/decorator/Profanity';

export class UpdateBuyerDto {
  @ApiPropertyOptional({ example: 'buyer@gmail.com' })
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
      'Password must contain at least one uppercase and lowercase letter, one number, one special character, and must be at least 8 characters long',
  })
  password?: string;

  @ApiPropertyOptional({ example: 'Iva' })
  @IsOptional()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'The name must contain at least 2 characters, only letters, spaces, hyphens, apostrophes and Cyrillic characters are allowed',
  })
  @Profanity()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Zo' })
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

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: '+380664563999' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;
}
