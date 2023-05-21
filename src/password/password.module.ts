import { forwardRef, Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { BuyerModule } from '../buyer/buyer.module';
import { AdminModule } from '../admin/admin.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { ManagerModule } from '../manager/manager.module';
import { PrismaService } from '../common/orm/prisma.service';
import { SellerModule } from '../seller/seller.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => BuyerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => AdminModule),
  ],
  controllers: [PasswordController],
  providers: [PrismaService, PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
