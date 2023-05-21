import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Admin-carshowroomAutoMechanic')
@Controller('admin')
export class AdminCarshowroomAutoMechanicController {
  @ApiOperation({ summary: 'Create a new car showroom mechanic as an admin' })
  @Post('/carshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomAutoMechanic() {}

  @ApiOperation({ summary: 'Update the car showroom mechanic as an admin' })
  @Patch('/carshowroomAutoMechanic/:idCarshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomAutoMechanic() {}

  @ApiOperation({
    summary: 'Get a list of car showroom mechanics from the admin',
  })
  @Get('/carshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAutoMechanicList() {}

  @ApiOperation({ summary: 'Get a car showroom mechanic by ID from the admin' })
  @Get('/carshowroomAutoMechanic/:idCarshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAutoMechanic() {}

  @ApiOperation({ summary: 'Delete car mechanic admin' })
  @Delete('/carshowroomAutoMechanic/:idCarshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomAutoMechanic() {}
}
