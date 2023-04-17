import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = [];
  async getUsersList() {
    return this.users;
  }

  async createUser(userData: CreateUserDto) {
    this.users.push(userData);
    return this.users;
  }

  async getById(userId: string) {
    return await this.users.find((user) => user.id === userId);
  }

  async deleteById(userId: string) {
    const index = await this.users.findIndex((user) => user.id === userId);
    this.users.splice(index, 1);
    return this.users;
  }
  async updateUser(userId: string, userData: UpdateUserDto) {
    const index = await this.users.findIndex((user) => user.id === userId);
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }
}