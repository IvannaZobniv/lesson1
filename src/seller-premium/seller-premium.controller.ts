import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { MulterFile } from '../common/interface/MulterFile';
import { Period } from '../common/enum/views-period';
import { buildPath } from '../common/helpers/helper';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SellerPremiumService } from './seller-premium.service';
import CreateCarDto from '../car/createCar.dto';
import { S3Service } from '../s3/s3.service';
@ApiTags('Seller Premium')
@Controller('sellerPremium')
export class SellerPremiumController {
  constructor(
    private readonly sellerPremiumService: SellerPremiumService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}

  @ApiOperation({ summary: 'Upgrade your seller to premium' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/:sellerId')
  async upgradeToPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.upgradeToPremium(sellerId);
  }

  @ApiOperation({ summary: "Cancel a seller's premium subscription" })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/:sellerId/cancel')
  async cancelPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.cancelPremium(sellerId);
  }

  @ApiOperation({ summary: "Create another car at the seller's premium" })
  @ApiCreatedResponse({ type: CreateCarDto })
  @Post('/another/:idSeller/car')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filePath = buildPath(file.originalname, 'cars');
          cb(null, filePath);
        },
      }),
    }),
  )
  async createAnotherCar(
    @Req() req: Request,
    @Param('idSeller') idSeller: string,
    @Body() carData: CreateCarDto,
    @Res() res: any,
    @UploadedFile() files: { image?: MulterFile[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      const uploadedFile = files.image[0];
      const filePath = buildPath(uploadedFile.originalname, 'cars');
      await this.s3Service.uploadPhoto(uploadedFile, 'cars');
      carData.image = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(
        await this.sellerPremiumService.createCarBySellerPremium(
          idSeller,
          carData,
        ),
      );
  }

  @ApiOperation({ summary: 'Get the number of views for the seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/:sellerId/views')
  async getViewsCount(@Param('sellerId') sellerId: string): Promise<number> {
    return this.sellerPremiumService.getViewsCount(sellerId);
  }

  @ApiOperation({ summary: "Get the seller's number of views per period" })
  @ApiParam({ name: 'sellerId', required: true })
  @ApiParam({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @Get('/:sellerId/views/:period')
  async getViewsCountPerPeriod(
    @Param('sellerId') sellerId: string,
    @Param('period') period: Period,
  ): Promise<number> {
    return this.sellerPremiumService.getViewsCountPerPeriod(sellerId, period);
  }

  @ApiOperation({ summary: "Get the average price in the seller's region" })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/:sellerId/averagePrice/region')
  async getAveragePriceRegion(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceRegion(sellerId);
  }

  @ApiOperation({ summary: 'Get the average price for Ukraine' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/:sellerId/averagePrice/ukraine')
  async getAveragePriceUkraine(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceUkraine(sellerId);
  }
}
