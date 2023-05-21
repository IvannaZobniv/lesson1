import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BearerStrategy } from './bearer.strategy';
import { AuthModule } from './auth.module';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Global()
@Module({
  imports: [
    AdminModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret:'Secret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [BearerStrategy, AuthService, UserService],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
