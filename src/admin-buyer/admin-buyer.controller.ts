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
import { CreateBuyerDto } from '../buyer/dto/createBuyer.dto';
import { buildPath } from '../common/helpers/helper';
import { UpdateBuyerDto } from '../buyer/dto/updateBuyer.dto';
import { Buyer } from '@prisma/client';
import { BuyerService } from '../buyer/buyer.service';
import { S3Service } from '../s3/s3.service';
import { ManagerService } from '../manager/manager.service';
import { SellerService } from '../seller/seller.service';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';

@ApiTags('Admin-buyer')
@Controller('admin')
export class AdminBuyerController {
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
  @ApiOperation({ summary: 'Create a new buyer as an admin' })
  @Post('/buyer')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createBuyer(
    @Req() req: Request,
    @Res() res: any,
    @Body() buyerData: CreateBuyerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateBuyerDto> {
    if (file) {
      const filePath = buildPath(file.filename, 'buyer');
      await this.s3Service.uploadPhoto(file, filePath);
      buyerData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.buyerService.createBuyer(buyerData));
  }

  @ApiOperation({ summary: 'Update the buyer as an admin' })
  @Patch('/buyer/:idBuyer')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateBuyer(
    @Param('idBuyer') idBuyer: string,
    @Body() buyerData: UpdateBuyerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Buyer> {
    if (file) {
      const filePath = buildPath(file.filename, 'buyer');
      await this.s3Service.uploadPhoto(file, filePath);
      buyerData.avatar = filePath;
    }
    return this.buyerService.updateBuyer(idBuyer, buyerData);
  }

  @ApiOperation({ summary: 'Get the list of buyers by the admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/buyer/list')
  async getBuyerList(@Req() reg: any, @Res() res: any): Promise<Buyer[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerList());
  }

  @ApiOperation({ summary: 'Get the buyer by ID from the admin' })
  @ApiParam({ name: 'idBuyer', type: 'string', description: 'Buyer ID' })
  @Get('/buyer/:idBuyer')
  async getBuyerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idBuyer') idBuyer: string,
  ): Promise<Buyer> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerById(idBuyer));
  }

  @ApiOperation({ summary: 'Get the buyer by admin name' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/buyer/name/:firstName')
  async getBuyerByFirstName(
    @Req() req: Request,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Buyer> {
    try {
      const buyer = await this.buyerService.getBuyerByFirstName(firstName);
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

  @ApiOperation({ summary: 'Delete buyer by admin' })
  @ApiParam({ name: 'idBuyer', required: true })
  @Delete('/buyer/:idBuyer')
  async deleteBuyer(
    @Param('idBuyer') idBuyer: string,
    @Res() res: any,
  ): Promise<void> {
    await this.buyerService.deleteBuyer(idBuyer);
    res.sendStatus(HttpStatus.OK);
  }
}
