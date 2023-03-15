import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    const compare = await bcrypt.compare(user.password, hash);

    if (user && compare) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { username, password } = user;

    if (!username || !password) {
      throw new Error('Fill the username and password fields');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
