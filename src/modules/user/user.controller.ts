import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  list() {
    return this.userService.list();
  }
}
