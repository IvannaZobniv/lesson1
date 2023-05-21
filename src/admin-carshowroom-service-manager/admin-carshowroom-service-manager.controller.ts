import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Admin-carshowroomServiceManager')
@Controller('admin')
export class AdminCarshowroomServiceManagerController {
  @ApiOperation({
    summary: 'Create a new car showroom service manager as an admin',
  })
  @Post('/carshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomServiceManager() {}

  @ApiOperation({
    summary: 'Update of the car showroom service manager by admin',
  })
  @Patch('/carshowroomServiceManager/:idCarshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomServiceManager() {}

  @ApiOperation({
    summary: 'Get a list of car showroom service managers from the admin',
  })
  @Get('/carshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomServiceManagerList() {}

  @ApiOperation({
    summary: 'Get the car showroom service manager by ID from the admin',
  })
  @Get('/carshowroomServiceManager/:idCarshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomServiceManager() {}

  @ApiOperation({ summary: 'Removal of car showroom service manager admin' })
  @Delete('/carshowroomServiceManager/:idCarshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomServiceManager() {}
}
