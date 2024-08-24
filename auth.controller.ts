import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { CustomSession } from '../session.interface';  // Importando a interface customizada

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request & { session: CustomSession },  // Usando a interface customizada
    @Res() res: Response,
  ) {
    const user = await this.authService.login(loginUserDto);

    // Salva o ID do usuário e os créditos na sessão
    req.session.userId = user.id;
    req.session.credits = user.credits;

    return res.status(HttpStatus.CREATED).json(user);
  }
}
