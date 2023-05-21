import { Module } from '@nestjs/common';
import { AdminCarshowroomAdminController } from './admin-carshowroom-admin.controller';
import { AdminCarshowroomAdminService } from './admin-carshowroom-admin.service';

@Module({
  controllers: [AdminCarshowroomAdminController],
  providers: [AdminCarshowroomAdminService]
})
export class AdminCarshowroomAdminModule {}
