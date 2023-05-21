import { Module } from '@nestjs/common';
import { CarshowroomSalesService } from './carshowroom-sales.service';
import { CarshowroomSalesController } from './carshowroom-sales.controller';

@Module({
  providers: [CarshowroomSalesService],
  controllers: [CarshowroomSalesController]
})
export class CarshowroomSalesModule {}
