import { forwardRef, Module } from '@nestjs/common';
import { AdminBuyerService } from './admin-buyer.service';
import { AdminBuyerController } from './admin-buyer.controller';
import { HttpModule } from '@nestjs/axios/dist';
import { PrismaModule } from '../common/orm/prisma.module';
import { BuyerModule } from '../buyer/buyer.module';
import { S3Module } from '../s3/s3.module';
import { PrismaService } from '../common/orm/prisma.service';
import { BuyerService } from '../buyer/buyer.service';
import { S3Service } from '../s3/s3.service';
import { PasswordService } from '../password/password.service';
import { PasswordModule } from '../password/password.module';
import { ManagerModule } from '../manager/manager.module';
import { SellerModule } from '../seller/seller.module';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
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
  providers: [AdminBuyerService,AdminBuyerService,PrismaService,BuyerService,S3Service,PasswordService],
  controllers: [AdminBuyerController],
  exports: [AdminBuyerService],
})
export class AdminBuyerModule {}
