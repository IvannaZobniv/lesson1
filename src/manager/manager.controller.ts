import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Manager } from '@prisma/client';
import { ManagerService } from './manager.service';
import { buildPath } from '../common/helpers/helper';
import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import { diskStorage } from 'multer';
import { UpdateManagerDto } from './dto/updateManager.dto';
import { CreateManagerDto } from './dto/createManager.dto';
import { S3Service } from '../s3/s3.service';
@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
  constructor(
    private readonly managerService: ManagerService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}

  @ApiOperation({ summary: 'Create a new manager' })
  @ApiOkResponse({ type: CreateManagerDto })
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
  async createManager(
    @Req() req: Request,
    @Body() managerData: CreateManagerDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateManagerDto> {
    if (file) {
      const filePath = buildPath(file.filename, 'manager');
      await this.s3Service.uploadPhoto(file, filePath);
      managerData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.managerService.createManager(managerData));
  }

  @ApiOperation({ summary: 'Update manager' })
  @ApiParam({ name: 'idManager', required: true })
  @Patch('/:idManager')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateManager(
    @Param('idManager') idManager: string,
    @Body() managerData: UpdateManagerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Manager> {
    if (file) {
      const filePath = buildPath(file.filename, 'manager');
      await this.s3Service.uploadPhoto(file, filePath);
      managerData.avatar = filePath;
    }
    return this.managerService.updateManager(idManager, managerData);
  }

  @ApiOperation({ summary: 'Get an ID manager' })
  @ApiParam({ name: 'idmManager', type: 'string', description: 'Manager ID' })
  @Get('/:idManager')
  async getManagerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idManager') idManager: string,
  ): Promise<Manager> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerById(idManager));
  }

  @ApiOperation({ summary: 'Get manager by name' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/:firstName')
  async getManagerByName(
    @Req() req: any,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Manager> {
    try {
      const buyer = await this.managerService.getManagerByName(firstName);
      return res.status(HttpStatus.OK).json(buyer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiOperation({ summary: 'Get a list of managers' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getManagerList(
    @Req() reg: Request,
    @Res() res: any,
  ): Promise<Manager[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerList());
  }

  @ApiOperation({ summary: 'Remove manager' })
  @ApiParam({ name: 'idManager', required: true })
  @Delete('/:idManager')
  async deleteManager(
    @Param('idManager') idManager: string,
    @Res() res: any,
  ): Promise<void> {
    await this.managerService.deleteManager(idManager);
    res.sendStatus(HttpStatus.OK);
  }
}
