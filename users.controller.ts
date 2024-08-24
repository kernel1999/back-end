import {
  Controller,
  Get,
  Post,
  Body,
  Session,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { Session as ExpressSession } from 'express-session';

declare module 'express-session' {
  interface Session {
    userId?: number;
  }
}

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginUserDto, @Session() session: ExpressSession) {
    const user = await this.authService.login(body);
    session.userId = user.id;
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
      }
    };
  }

  @Get('credits')
  async getCredits(@Session() session: ExpressSession) {
    if (!session.userId) {
      throw new BadRequestException('User not authenticated');
    }
    const credits = await this.usersService.getCredits(session.userId);
    return { credits };
  }

  @Post('logout')
  logout(@Session() session: ExpressSession) {
    session.userId = null;
    return { message: 'Logout successful' };
  }
}
