import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PassportWrapperModule } from './auth/passport-wrapper.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { BuyerService } from './buyer/buyer.service';
import { BuyerController } from './buyer/buyer.controller';
import { BuyerModule } from './buyer/buyer.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { CarshowroomController } from './carshowroom/carshowroom.controller';
import { CarshowroomService } from './carshowroom/carshowroom.service';
import { CarshowroomModule } from './carshowroom/carshowroom.module';
import { CarshowroomAdminModule } from './carshowroom-admin/carshowroom-admin.module';
import { CarshowroomAutomechanicModule } from './carshowroom-automechanic/carshowroom-automechanic.module';
import { CarshowroomManagerModule } from './carshowroom-manager/carshowroom-manager.module';
import { CarshowroomSalesModule } from './carshowroom-sales/carshowroom-sales.module';
import { CarshowroomServiceManagerModule } from './carshowroom-service-manager/carshowroom-service-manager.module';
import { CarshowroomServiceManagerController } from './carshowroom-service-manager/carshowroom-service-manager.controller';
import { CarshowroomSalesController } from './carshowroom-sales/carshowroom-sales.controller';
import { CarshowroomAdminController } from './carshowroom-admin/carshowroom-admin.controller';
import { CarshowroomManagerController } from './carshowroom-manager/carshowroom-manager.controller';
import { CarshowroomManagerService } from './carshowroom-manager/carshowroom-manager.service';
import { CarshowroomSalesService } from './carshowroom-sales/carshowroom-sales.service';
import { CarshowroomAdminService } from './carshowroom-admin/carshowroom-admin.service';
import { CarshowroomAutomechanicController } from './carshowroom-automechanic/carshowroom-automechanic.controller';
import { CarshowroomAutomechanicService } from './carshowroom-automechanic/carshowroom-automechanic.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    BuyerModule,
    CarshowroomModule,
    CarshowroomAdminModule,
    CarshowroomManagerModule,
    CarshowroomAutomechanicModule,
    CarshowroomSalesModule,
    CarshowroomServiceManagerModule,
    CurrencyModule,
    HttpModule,
    MailModule,
    ManagerModule,
    PasswordModule,
    PassportWrapperModule,
    PrismaModule,
    S3Module,
    SellerModule,
    SellerPremiumModule,
    UserModule,
    CarshowroomAutomechanicModule,
    CommonModule,
  ],
  controllers: [
    AppController,
    AdminController,
    AuthController,
    BuyerController,
    CarshowroomController,
    CarshowroomAdminController,
    CarshowroomManagerController,
    CarshowroomSalesController,
    CarshowroomAutomechanicController,
    CarshowroomServiceManagerController,
    ManagerController,
    PasswordController,
    S3Controller,
    SellerController,
    SellerPremiumController,
  ],
  providers: [
    AppService,
    AdminService,
    AuthService,
    BuyerService,
    JwtService,
    CarshowroomService,
    CarshowroomAdminService,
    CarshowroomManagerService,
    CarshowroomAutomechanicService,
    CarshowroomSalesService,
    CurrencyService,
    MailService,
    ManagerService,
    PasswordService,
    PrismaService,
    SellerService,
    SellerPremiumService,
    S3Service,
    UserService,
  ],
})
export class AppModule {}
