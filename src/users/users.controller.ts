import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  async getUsersList() {
    //
  }

  @Post()
  async createUser() {
    //
  }

  @Delete('/:id')
  async deleteUser() {
    //
  }

  @Patch('/:id')
  async updateUser() {
    //
  }
  @Post('/animals/:id')
  async addNewPet() {
    //
  }
}
