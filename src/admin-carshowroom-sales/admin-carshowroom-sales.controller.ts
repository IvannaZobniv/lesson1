import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Admin-carshowroomSales')
@Controller('admin')
export class AdminCarshowroomSalesController {
  @ApiOperation({ summary: 'The admin will create a new car showroom' })
  @Post('/carshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomSales() {}

  @ApiOperation({ summary: 'Update of the car showroom by the admin' })
  @Patch('/carshowroomSales/:idCarshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomSales() {}

  @ApiOperation({
    summary: 'Get a list of car showroom sellers from the admin',
  })
  @Get('/carshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomSalesList() {}

  @ApiOperation({ summary: 'Get car showroom by ID from admin' })
  @Get('/carshowroomSales/:idCarshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomSales() {}

  @ApiOperation({ summary: 'Delete the seller of the car showroom admin' })
  @Delete('/carshowroomSales/:idCarshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomSales() {}
}
