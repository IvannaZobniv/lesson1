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
import CreateSellerDto from '../seller/dto/createSeller.dto';
import { buildPath } from '../common/helpers/helper';
import UpdateSellerDto from '../seller/dto/updateSeller.dto';
import { Car, Seller } from '@prisma/client';
import { SellerService } from '../seller/seller.service';
import { S3Service } from '../s3/s3.service';
import { BuyerService } from '../buyer/buyer.service';
import { ManagerService } from '../manager/manager.service';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
@ApiTags('Admin-seller')
@Controller('admin')
export class AdminSellerController {
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
  @ApiOperation({ summary: 'Create a new seller as an admin' })
  @Post('seller')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createSeller(
    @Req() req: Request,
    @Res() res: any,
    @Body() sellerData: CreateSellerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateSellerDto> {
    if (file) {
      const filePath = buildPath(file.filename, 'seller');
      await this.s3Service.uploadPhoto(file, filePath);
      sellerData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.sellerService.createSeller(sellerData));
  }

  @ApiOperation({ summary: 'Seller update by admin' })
  @Patch('/seller/:idSeller')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateSeller(
    @Param('idSeller') idSeller: string,
    @Body() sellerData: UpdateSellerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Seller> {
    if (file) {
      const filePath = buildPath(file.filename, 'seller');
      await this.s3Service.uploadPhoto(file, filePath);
      sellerData.avatar = filePath;
    }
    return this.sellerService.updateSeller(idSeller, sellerData);
  }

  @ApiOperation({ summary: 'Get seller by ID from admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller')
  async getSellerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Seller> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerById(idSeller));
  }

  @ApiOperation({ summary: 'Get a manager named admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/seller/name/:firstName')
  async getSellerByFirstName(
    @Req() req: Request,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Seller> {
    try {
      const seller = await this.sellerService.getSellerByName(firstName);
      return res.status(HttpStatus.OK).json(seller);
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

  @ApiOperation({ summary: 'Get a list of sellers from the admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/sellers/list')
  async getSellerList(@Req() reg: Request, @Res() res: any): Promise<Seller[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerList());
  }

  @ApiOperation({ summary: 'Removal of the seller by the admin' })
  @ApiParam({ name: 'idSeller', required: true })
  @Delete('/seller/:idSeller')
  async deleteSeller(
    @Param('idSeller') idSeller: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteSeller(idSeller);
    res.sendStatus(HttpStatus.OK);
  }
  @ApiOperation({ summary: "Get all the seller's cars by admin" })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller/car')
  async getCars(
    @Req() req: Request,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Car[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCars(idSeller));
  }

  @ApiOperation({ summary: 'Get the car from the admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller/car/:idCar')
  async getCar(
    @Req() req: Request,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
  ): Promise<Car> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCar(idSeller, idCar));
  }

  @ApiOperation({ summary: 'Removal of the car by the admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @ApiParam({ name: 'idCar', type: 'string', description: 'Car ID' })
  @Delete('/seller/:idSeller/car/:idCar')
  async deleteCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteCar(idSeller, idCar);
    res.sendStatus(HttpStatus.OK);
  }
}
