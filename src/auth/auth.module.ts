import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { BuyerModule } from '../buyer/buyer.module';
import { CommonModule } from '../common/common.module';
import { MailService } from '../common/mail/mail.service';
import { ManagerModule } from '../manager/manager.module';
import { SellerModule } from '../seller/seller.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'Secret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    forwardRef(() => AdminModule),
    forwardRef(() => BuyerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, BearerStrategy, UserService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
