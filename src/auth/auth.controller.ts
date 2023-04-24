import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { MailService } from '../core/mail/mail.service';
import { MailTemplate } from '../core/mail/mail.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  @Post('login')
  async login(@Res() res: any, @Body() body: LoginDto) {
    if (!body.email && !body.password) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Error.Check_request_params' });
    }
    const findUser = await this.userService.findUserByEmail(body.email);
    if (!findUser) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password is incorrect' });
    }
    if (await this.authService.compareHash(body.password, findUser.password)) {
      const token = await this.authService.singIn(findUser.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Email or password is incorrect' });
  }

  @Post('register')
  async registerUser(@Res() res: any, @Body() body: RegisterDto) {
    let findUser;
    try {
      findUser = await this.userService.findUserByEmail(body.email.trim());
    } catch (err) {
      console.log(err);
    }
    if (findUser) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User with this email is already exist' });
    }
    const user = await this.userService.createUser({
      // body.name || body.email,
      name: body.name ? body.name : 'User',
      email: body.email,
      password: body.password,
    });

    if (user) {
      const subject = 'Welcome on board!';
      await this.mailService.send(user.email, subject, MailTemplate.WELCOME, {
        userName: user.name,
      });
      const token = await this.authService.singIn(user.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Error.Register_user_failed' });
  }
}
