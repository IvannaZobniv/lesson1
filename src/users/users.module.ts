import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PetsService } from '../pets/pets.service';
import { PetsModule } from '../pets/pets.module';
import { PrismaService } from '../core/orm/prisma.service';

@Module({
  imports: [PrismaService, PetsModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, PetsService],
})
export class UsersModule {}
