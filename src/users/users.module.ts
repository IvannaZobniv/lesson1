import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PetsModule } from '../pets/pets.module';
import { PetsService } from '../pets/pets.service';

@Module({
  imports: [forwardRef(() => PetsModule)],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, PetsService],
})
export class UsersModule {}
