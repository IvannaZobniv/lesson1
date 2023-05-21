import {
  Body,
  Controller, Delete, forwardRef, Get,
  HttpStatus, Inject, NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../common/file-upload/file.upload';
import { CreateManagerDto } from '../manager/dto/createManager.dto';
import { buildPath } from '../common/helpers/helper';
import { UpdateManagerDto } from '../manager/dto/updateManager.dto';
import { Manager } from '@prisma/client';
import { ManagerService } from '../manager/manager.service';
import { S3Service } from '../s3/s3.service';
import { BuyerService } from '../buyer/buyer.service';
import { SellerService } from '../seller/seller.service';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';

@ApiTags('Admin-manager')
@Controller('admin')
export class AdminManagerController {
  constructor(
    @Inject(forwardRef(() => BuyerService))
    private readonly buyerService: BuyerService,
    @Inject(forwardRef(() => ManagerService))
    private readonly managerService: ManagerService,
    @Inject(forwardRef(() => SellerService))
    private readonly sellerService: SellerService,
    @Inject(forwardRef(() => SellerPremiumService))
    private readonly sellerPremiumService: SellerPremiumService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}
  @ApiOperation({ summary: 'Create a new manager as an admin' })
  @Post('/manager')
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
    @Res() res: any,
    @Body() managerData: CreateManagerDto,
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

  @ApiOperation({ summary: 'Update manager by admin' })
  @Patch('/manager/:idManager')
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

  @ApiOperation({ summary: 'Get manager by ID from admin' })
  @ApiParam({ name: 'idmManager', type: 'string', description: 'Manager ID' })
  @Get('/manager/:idManager')
  async getManagerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idManager') idManager: string,
  ): Promise<Manager> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerById(idManager));
  }

  @ApiOperation({ summary: 'Get a manager named admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/manager/name/:firstName')
  async getManagerByName(
    @Req() req: Request,
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

  @ApiOperation({ summary: 'Get a list of managers by admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/managers/list')
  async getManagerList(@Req() reg: any, @Res() res: any): Promise<Manager[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerList());
  }

  @ApiOperation({ summary: 'Delete the manager as an admin' })
  @ApiParam({ name: 'idManager', required: true })
  @Delete('/manager/:idManager')
  async deleteManager(
    @Param('idManager') idManager: string,
    @Res() res: any,
  ): Promise<void> {
    await this.managerService.deleteManager(idManager);
    res.sendStatus(HttpStatus.OK);
  }

}
