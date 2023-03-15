import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(id: number, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);

    if (user && bcrypt.compare(pass, hash)) {
      return user;
    }
    return null;
  }
}
