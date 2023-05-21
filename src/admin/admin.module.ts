import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BuyerService } from '../buyer/buyer.service';
import { BuyerModule } from '../buyer/buyer.module';

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
