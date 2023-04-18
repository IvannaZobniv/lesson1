import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        city: userData.city,
        status: userData.status,
        age: userData.age,
        email: userData.email,
      },
    });
  }

  async getUsersList(): Promise<any> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        city: true,
        pets: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getUserById(userId: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
    });
  }
  async updateUser(userId: string, userData: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id: Number(userId) },
      data: userData,
    });
  }
  async deleteUser(userId: string) {
    await this.prismaService.user.delete({
      where: { id: Number(userId) },
    });
  }
}
