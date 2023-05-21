import { Controller, forwardRef, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Period } from '../common/enum/views-period';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { SellerService } from '../seller/seller.service';
import { AdminService } from '../admin/admin.service';
import { BuyerService } from '../buyer/buyer.service';
import { ManagerService } from '../manager/manager.service';
import { S3Service } from '../s3/s3.service';

@ApiTags('Admin-seller-premium')
@Controller('admin')
export class AdminSellerPremiumController {
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

  @ApiOperation({ summary: 'Upgrade seller to premium by admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/sellerPremium/:sellerId')
  async upgradeToPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.upgradeToPremium(sellerId);
  }

  @ApiOperation({
    summary: "The admin canceled the seller's premium subscription",
  })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/sellerPremium/:sellerId/cancel')
  async cancelPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.cancelPremium(sellerId);
  }

  @ApiOperation({ summary: 'Get the number of views for a seller by admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/views')
  async getViewsCount(@Param('sellerId') sellerId: string): Promise<number> {
    return this.sellerPremiumService.getViewsCount(sellerId);
  }

  @ApiOperation({
    summary: 'Get the number of views per period for a seller by admin',
  })
  @ApiParam({ name: 'sellerId', required: true })
  @ApiParam({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @Get('/sellerPremium/:sellerId/views/:period')
  async getViewsCountPerPeriod(
    @Param('sellerId') sellerId: string,
    @Param('period') period: Period,
  ): Promise<number> {
    return this.sellerPremiumService.getViewsCountPerPeriod(sellerId, period);
  }

  @ApiOperation({
    summary: "Get the average price in the seller's region from the admin",
  })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/averagePrice/region')
  async getAveragePriceRegion(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceRegion(sellerId);
  }

  @ApiOperation({ summary: 'Get the average price for Ukraine from Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/averagePrice/ukraine')
  async getAveragePriceUkraine(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceUkraine(sellerId);
  }

}
