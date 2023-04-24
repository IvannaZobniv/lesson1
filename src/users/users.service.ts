import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/users.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  private salt = 10;
  constructor(private readonly prismaService: PrismaService) {}

  async createUserByManager(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        city: userData.city,
        status: userData.status,
        age: userData.age,
        email: userData.email,
        avatar: userData.avatar,
      },
    });
  }
  async createUser(userData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(userData.password);
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: passwordHash,
      },
    });
  }
  async hashPassword(password: string) {
    return bcrypt.hash(password, this.salt);
  }

  async getUserList(): Promise<User[]> {
    return this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
      },
      take: 5,
    });
  }

  async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
    });
  }

  async deleteUser(id: string) {
    // const user = this.users.find((item) => item.id === id);
    // //slice на вибір
    // return this.users;
  }
  async findUserByEmail(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
}
