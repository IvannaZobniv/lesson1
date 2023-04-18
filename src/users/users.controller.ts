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
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async getUserInfo(
    @Req() req: any,
    @Res() res: any,
    @Param('id') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }
  // @UseInterceptors(FileInterceptor([]))

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
  @Delete('/:id')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('id') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  @ApiParam({ name: 'id', required: true })
  @Patch('/:id')
  async updateUser(
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @Res() res: any,
    @Param('id') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.updateUser(userId, body));
  }
}
