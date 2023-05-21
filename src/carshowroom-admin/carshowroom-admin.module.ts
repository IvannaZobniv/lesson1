import { Module } from '@nestjs/common';
import { CarshowroomAdminService } from './carshowroom-admin.service';
import { CarshowroomAdminController } from './carshowroom-admin.controller';

@Module({
  providers: [CarshowroomAdminService],
  controllers: [CarshowroomAdminController],
})
export class CarshowroomAdminModule {}
