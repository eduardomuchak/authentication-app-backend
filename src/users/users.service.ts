import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma/prisma';
import { UserDto } from './dto/user.dto';
import { z } from 'zod';

@Injectable()
export class UsersService {
  async create(user: UserDto) {
    const userSchema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      bio: z.string(),
      photo: z.string(),
      phone: z.string(),
    });

    const validatedUser = userSchema.parse(user);

    if (validatedUser) {
      return await prisma.user.create({ data: user });
    } else {
      throw new Error('Invalid user data');
    }
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
  }
}
