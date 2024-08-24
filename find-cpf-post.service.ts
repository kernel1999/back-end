import { Injectable, Logger, BadRequestException, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ExternalAuthService } from '../auth/external-auth.service';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { UserService } from '../users/users.service';
import { Request } from 'express';
import { CustomSession } from '../session.interface';

@Injectable()
export class FindCpfPostService {
  private readonly logger = new Logger(FindCpfPostService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly externalAuthService: ExternalAuthService,
    private readonly userService: UserService,
  ) {}

  async findCpf(cpf: string, req: Request & { session: CustomSession }): Promise<any> {
    const userId = req.session.userId;

    if (!userId) {
      throw new BadRequestException('ID do usuário não encontrado na sessão');
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (req.session.credits === undefined || req.session.credits <= 0) {
      throw new ForbiddenException('Créditos insuficientes para realizar a consulta');
    }

    const token = await this.externalAuthService.authenticate();
    const url = 'https://api.brickseguros.com.br/v2/antifraud/pf';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const payload = { cpf, essential: true };

    try {
      const response = await firstValueFrom(this.httpService.post(url, payload, { headers }));

      // Retornar os dados da API Brick diretamente
      return response.data;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof AxiosError) {
        throw new BadRequestException({
          message: 'Erro ao pesquisar CPF',
          error: error.message,
        });
      } else {
        throw new BadRequestException('Erro ao pesquisar CPF');
      }
    }
  }

  // Implementação do método getCpfResult
  async getCpfResult(id: string): Promise<any> {
    const token = await this.externalAuthService.authenticate();
    const url = `https://api.brickseguros.com.br/v2/antifraud/pf/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof AxiosError) {
        throw new BadRequestException({
          message: 'Erro ao obter resultado da consulta CPF',
          error: error.message,
        });
      } else {
        throw new BadRequestException('Erro ao obter resultado da consulta CPF');
      }
    }
  }
}
