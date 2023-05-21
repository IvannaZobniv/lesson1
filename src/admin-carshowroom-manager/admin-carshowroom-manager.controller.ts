import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Admin-carshowroomManager')
@Controller('admin')
export class AdminCarshowroomManagerController {
  @ApiOperation({ summary: 'Create a new car showroom manager as an admin' })
  @Post('/carshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomManager() {}

  @ApiOperation({ summary: 'Update the car showroom manager as an admin' })
  @Patch('/carshowroomManager/:idCarshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomManager() {}

  @ApiOperation({ summary: 'Get a list of car showroom managers from admin' })
  @Get('/carshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomManagerList() {}

  @ApiOperation({ summary: 'Get a car showroom manager by ID from admin' })
  @Get('/carshowroomManager/:idCarshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomManager() {}

  @ApiOperation({ summary: 'Delete the manager of the car showroom admin' })
  @Delete('/carshowroomManager/:idCarshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomManager() {}
}
