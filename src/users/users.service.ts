import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma/prisma';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService {
  async create(user: User) {
    return await prisma.user.create({ data: user });
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
}
