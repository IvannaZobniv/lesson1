import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { S3Controller } from './s3.controller';
import { AdminModule } from '../admin/admin.module';
import { HttpModule } from '@nestjs/axios/dist';
import { BuyerService } from '../buyer/buyer.service';
import { PrismaModule } from '../common/orm/prisma.module';
import { CurrencyService } from '../currency/currency.service';
import { ManagerService } from '../manager/manager.service';
import { BuyerModule } from '../buyer/buyer.module';
import { PasswordModule } from '../password/password.module';
import { S3Service } from './s3.service';
import { ManagerModule } from '../manager/manager.module';
import { PrismaService } from '../common/orm/prisma.service';
import { SellerModule } from '../seller/seller.module';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { SellerService } from '../seller/seller.service';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    forwardRef(() => AdminModule),
    forwardRef(() => BuyerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => SellerPremiumModule),
    forwardRef(() => PasswordModule),
  ],
  controllers: [S3Controller],
  providers: [
    S3Service,
    PrismaService,
    AdminService,
    BuyerService,
    ManagerService,
    SellerService,
    SellerPremiumService,
    CurrencyService,
  ],
  exports: [S3Service],
})
export class S3Module {}
