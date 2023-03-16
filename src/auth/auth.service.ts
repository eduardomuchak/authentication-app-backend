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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    const compare = await bcrypt.compare(pass, hash);

    if (user && compare) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { email, password } = user;

    if (!email || !password) {
      throw new Error('Fill the e-mail and password fields');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
