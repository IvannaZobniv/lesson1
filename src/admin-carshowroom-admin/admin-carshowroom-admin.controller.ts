import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Admin-carshowroomAdmin')
@Controller('admin')
export class AdminCarshowroomAdminController {
  @ApiOperation({ summary: 'Create a new car showroom admin using admin' })
  @Post('/carshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomAdmin() {}

  @ApiOperation({ summary: 'Update the car showroom administrator to admin' })
  @Patch('/carshowroomAdmin/:idCarshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomAdmin() {}

  @ApiOperation({ summary: 'Get a list of car showroom admins by admin' })
  @Get('/carshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAdminList() {}

  @ApiOperation({ summary: 'Get car showroom admin by ID from admin' })
  @Get('/carshowroomAdmin/:idCarshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAdmin() {}

  @ApiOperation({
    summary: 'Delete the car showroom administrator as an admin',
  })
  @Delete('/carshowroomAdmin/:idCarshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomAdmin() {}
}
