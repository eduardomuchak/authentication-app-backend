import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Get('find/:email')
  async findOneByEmail(@Param('email') user: string) {
    return await this.userService.findOneByEmail(user);
  }

  @Post('register')
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }
}
