import { Module } from '@nestjs/common';
import { CarshowroomAutomechanicService } from './carshowroom-automechanic.service';
import { CarshowroomAutomechanicController } from './carshowroom-automechanic.controller';

@Module({
  providers: [CarshowroomAutomechanicService],
  controllers: [CarshowroomAutomechanicController],
})
export class CarshowroomAutomechanicModule {}
