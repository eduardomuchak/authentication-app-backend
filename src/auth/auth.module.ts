import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
