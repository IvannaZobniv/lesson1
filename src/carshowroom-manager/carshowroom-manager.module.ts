import { Module } from '@nestjs/common';
import { CarshowroomManagerService } from './carshowroom-manager.service';
import { CarshowroomManagerController } from './carshowroom-manager.controller';

@Module({
  providers: [CarshowroomManagerService],
  controllers: [CarshowroomManagerController]
})
export class CarshowroomManagerModule {}
