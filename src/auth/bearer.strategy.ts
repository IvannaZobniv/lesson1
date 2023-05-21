import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    try {
      const user = await this.authService.validateUserByToken(token);

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
