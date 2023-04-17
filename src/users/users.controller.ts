import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res
      .status(HttpStatus.FOUND)
      .json(await this.userService.getUsersList());
    // const users = await this.userService.getUsersList();
    // res.status(HttpStatus.FOUND).json(users);
  }

  @Post()
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async getById(@Req() req: any, @Res() res: any, @Param('id') userId: string) {
    const userById = await this.userService.getById(userId);
    res.status(HttpStatus.OK).json(userById);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/:id')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('id') userId: string,
  ) {
    await this.userService.deleteById(userId);
    res.sendStatus(HttpStatus.OK);
  }
  @ApiParam({ name: 'id', required: true })
  @Patch('/:userId')
  async updateUser(
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @Res() res: any,
    @Param('id') userId: string,
  ) {
    const updUser = await this.userService.updateUser(userId, body);
    res.status(HttpStatus.OK).json(updUser);
  }
}
