import { forwardRef, Module } from '@nestjs/common';
import { AdminSellerService } from './admin-seller.service';
import { AdminSellerController } from './admin-seller.controller';
import { HttpModule } from '@nestjs/axios/dist';
import { PrismaModule } from '../common/orm/prisma.module';
import { SellerModule } from '../seller/seller.module';
import { S3Module } from '../s3/s3.module';
import { PrismaService } from '../common/orm/prisma.service';
import { S3Service } from '../s3/s3.service';
import { SellerService } from '../seller/seller.service';
import { PasswordModule } from '../password/password.module';
import { CurrencyModule } from '../currency/currency.module';
import { PasswordService } from '../password/password.service';
import { CurrencyService } from '../currency/currency.service';
import { BuyerModule } from '../buyer/buyer.module';
import { ManagerModule } from '../manager/manager.module';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';

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
  providers: [AdminSellerService,PrismaService, S3Service, SellerService,PasswordService,CurrencyService],
  controllers: [AdminSellerController],
  exports:[AdminSellerService],
})
export class AdminSellerModule {}
