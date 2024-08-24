import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { validatePassword } from 'utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
  ) {}

  async login(authData: LoginUserDto): Promise<User> {
    const user = await this.usersService.findByEmail(authData.email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await validatePassword(user, authData.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    return user; // Retorna apenas o objeto User
  }
}
