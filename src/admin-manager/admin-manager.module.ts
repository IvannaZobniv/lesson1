import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist';
import { PrismaModule } from '../common/orm/prisma.module';
import { ManagerModule } from '../manager/manager.module';
import { PasswordModule } from '../password/password.module';
import { S3Module } from '../s3/s3.module';
import { AdminManagerController } from './admin-manager.controller';
import { PrismaService } from '../common/orm/prisma.service';
import { BuyerService } from '../buyer/buyer.service';
import { ManagerService } from '../manager/manager.service';
import { PasswordService } from '../password/password.service';
import { S3Service } from '../s3/s3.service';
import { AdminManagerService } from './admin-manager.service';
import { BuyerModule } from '../buyer/buyer.module';
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
  controllers: [AdminManagerController],
  providers: [
    AdminManagerService,
    PrismaService,
    BuyerService,
    ManagerService,
    PasswordService,
    S3Service,
  ],
  exports: [AdminManagerService],
})
export class AdminManagerModule {}
