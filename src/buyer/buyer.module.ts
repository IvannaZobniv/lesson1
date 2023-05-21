import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PasswordModule),
    forwardRef(() => S3Module),
    PrismaModule,
  ],
  controllers: [BuyerController],
  providers: [BuyerService, PrismaService, PasswordService, S3Service],
  exports: [BuyerService],
})
export class BuyerModule {}
