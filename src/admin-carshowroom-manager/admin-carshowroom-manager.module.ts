import { Module } from '@nestjs/common';
import { AdminCarshowroomManagerService } from './admin-carshowroom-manager.service';
import { AdminCarshowroomManagerController } from './admin-carshowroom-manager.controller';

@Module({
  providers: [AdminCarshowroomManagerService],
  controllers: [AdminCarshowroomManagerController]
})
export class AdminCarshowroomManagerModule {}
