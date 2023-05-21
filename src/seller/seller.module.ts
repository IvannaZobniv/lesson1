import { forwardRef, Module } from '@nestjs/common';
import { S3Module } from '../s3/s3.module';
import { CurrencyModule } from '../currency/currency.module';
import { AdminModule } from '../admin/admin.module';
import { HttpModule } from '@nestjs/axios/dist';
import { PrismaModule } from '../common/orm/prisma.module';
import { SellerController } from './seller.controller';
import { PasswordService } from '../password/password.service';
import { CurrencyService } from '../currency/currency.service';
import { PasswordModule } from '../password/password.module';
import { AuthModule } from '../auth/auth.module';
import { SellerService } from './seller.service';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '../common/orm/prisma.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PasswordModule),
    forwardRef(() => S3Module),
    forwardRef(() => CurrencyModule),
    PrismaModule,
    HttpModule,
  ],
  controllers: [SellerController],
  providers: [
    SellerService,
    PrismaService,
    PasswordService,
    S3Service,
    CurrencyService,
  ],
  exports: [SellerService],
})
export class SellerModule {}
