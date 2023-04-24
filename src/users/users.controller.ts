import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../core/file-upload/file.upload';
import { PetsService } from '../pets/pets.service';
import { PetDto } from '../pets/dto/pet.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}

  // @UseGuards(AuthGuard())
  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  async getUserInfo(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  // @ApiOkResponse({
  //   description: 'The record has been successfully created.',
  //   type: User,
  // })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUserByManager(body));
  }

  // catch (err) {
  //   fs.unlink()   }

  @Delete('/:userId')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    console.log(userId);
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  @ApiParam({ name: 'userId', required: true })
  @Patch('/:userId')
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    //
  }

  @Post('/animals/:userId')
  async addNewPet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: PetDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} not fount` });
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createAnimal(body, userId));
  }
}
