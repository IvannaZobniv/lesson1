import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Admin-carshowroom')
@Controller('admin')
export class AdminCarshowroomController {
  @ApiOperation({ summary: 'Create a new car showroom as an admin' })
  @Post('/carshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroom() {}

  @ApiOperation({ summary: 'Update of the car showroom admin' })
  @Patch('/carshowroom/:idCarshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroom() {}

  @ApiOperation({ summary: 'Get a list of car car showroom from the admin' })
  @Get('/carshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomList() {}

  @ApiOperation({ summary: 'Get a car car showroom by ID from the admin' })
  @Get('/carshowroom/:idCarshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroom() {}

  @ApiOperation({ summary: 'Removal of car showroom by admin' })
  @Delete('/carshowroom/:idCarshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroom() {}
}
