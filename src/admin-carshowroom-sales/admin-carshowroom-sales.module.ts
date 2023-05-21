import { Module } from '@nestjs/common';
import { AdminCarshowroomSalesService } from './admin-carshowroom-sales.service';
import { AdminCarshowroomSalesController } from './admin-carshowroom-sales.controller';

@Module({
  providers: [AdminCarshowroomSalesService],
  controllers: [AdminCarshowroomSalesController]
})
export class AdminCarshowroomSalesModule {}
