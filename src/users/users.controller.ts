import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Post('register')
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }
}