import { forwardRef, Module } from '@nestjs/common';
import { configs } from '@typescript-eslint/eslint-plugin';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { BuyerModule } from '../buyer/buyer.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secret: configs.SECRET,
      signOptions: {
        expiresIn: '24h',
      },
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
