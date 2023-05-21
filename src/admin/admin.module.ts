import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BuyerService } from '../buyer/buyer.service';
import { BuyerModule } from '../buyer/buyer.module';
import { PrismaService } from '../common/orm/prisma.service';
import { PrismaModule } from '../common/orm/prisma.module';
import { CurrencyModule } from '../currency/currency.module';
import { HttpModule } from '@nestjs/axios/dist';
import { CurrencyService } from '../currency/currency.service';
import { ManagerService } from '../manager/manager.service';
import { ManagerModule } from '../manager/manager.module';
import { SellerModule } from '../seller/seller.module';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
import { S3Module } from '../s3/s3.module';
import { PasswordModule } from '../password/password.module';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { PasswordService } from '../password/password.service';
import { SellerService } from '../seller/seller.service';
import { S3Service } from '../s3/s3.service';

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
  controllers: [AdminController],
  providers: [
    AdminService,
    PrismaService,
    BuyerService,
    ManagerService,
    PasswordService,
    S3Service,
    SellerService,
    SellerPremiumService,
    CurrencyService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
