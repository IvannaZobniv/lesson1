import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
