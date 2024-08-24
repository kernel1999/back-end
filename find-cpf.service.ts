import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ExternalAuthService } from '../auth/external-auth.service';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class FindCpfService {
  private readonly logger = new Logger(FindCpfService.name);
  private consultas: { [id: string]: any } = {};

  constructor(
    private readonly httpService: HttpService,
    private readonly externalAuthService: ExternalAuthService,
  ) {}

  async findCpf(cpf: string): Promise<any> {
    const token = await this.externalAuthService.authenticate();
    const url = 'https://api.brickseguros.com.br/v2/antifraud/pf';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await firstValueFrom(this.httpService.post(url, { cpf }, { headers }));
      const consultaId = response.data.id;  // Supondo que a resposta contenha um campo 'id'
      this.consultas[consultaId] = { status: 'pending', result: null };

      // Simule o preenchimento do resultado após algum tempo (por exemplo, após 30 segundos)
      setTimeout(() => {
        this.consultas[consultaId] = { status: 'completed', result: response.data };
      }, 30000); // Simule a conclusão após 30 segundos

      return { message: 'Consulta enviada. Verifique o status depois de algum tempo.', id: consultaId };
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

  async getCpfResult(id: string): Promise<any> {
    const consulta = this.consultas[id];
    if (!consulta) {
      throw new BadRequestException('Consulta não encontrada');
    }
    return consulta;
  }
}
