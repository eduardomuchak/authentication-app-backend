import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/prisma/prisma';
import { UserDto } from './dto/user.dto';
import { validateUserSchema } from 'src/utils/userSchemaValidation';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async create(user: UserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const validatedUser = validateUserSchema(user);

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

  async findOneByEmail(email: string): Promise<UserDto | undefined> {
    const user: UserDto[] = await prisma.$queryRaw(
      Prisma.sql`select * from tb_users where email=${email}`,
    );
    return user[0];
  }
}
