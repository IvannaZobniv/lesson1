import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PrismaService } from './core/orm/prisma.service';
import { PrismaModule } from './core/orm/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PetsModule, PrismaModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService, PrismaModule],
})
export class AppModule {}
