import { forwardRef, Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../core/orm/prisma.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PetsService, UsersService, PrismaService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
