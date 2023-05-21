import { Module } from '@nestjs/common';
import { CarshowroomServiceManagerService } from './carshowroom-service-manager.service';
import { CarshowroomServiceManagerController } from './carshowroom-service-manager.controller';

@Module({
  providers: [CarshowroomServiceManagerService],
  controllers: [CarshowroomServiceManagerController],
})
export class CarshowroomServiceManagerModule {}
