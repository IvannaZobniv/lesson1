import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist';
import { PrismaModule } from '../common/orm/prisma.module';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { AdminSellerPremiumController } from './admin-seller-premium.controller';
import { AdminSellerPremiumService } from './admin-seller-premium.service';
import { SellerService } from '../seller/seller.service';
import { SellerModule } from '../seller/seller.module';
import { BuyerModule } from '../buyer/buyer.module';
import { ManagerModule } from '../manager/manager.module';
import { PasswordModule } from '../password/password.module';
import { S3Module } from '../s3/s3.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    forwardRef(() => BuyerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => SellerPremiumModule),
    forwardRef(() => PasswordModule),
    forwardRef(() => S3Module),
    forwardRef(() => CurrencyModule),
  ],
  controllers: [AdminSellerPremiumController],
  providers: [
    AdminSellerPremiumService,
    AdminSellerPremiumService,
    SellerPremiumService,
    SellerService,
  ],
  exports: [AdminSellerPremiumService],
})
export class AdminSellerPremiumModule {}
