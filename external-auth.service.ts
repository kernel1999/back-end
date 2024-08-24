import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalAuthService {
  constructor(private readonly httpService: HttpService) {}

  async authenticate(): Promise<string> {
    const url = 'https://api.brickseguros.com.br/auth';
    const credentials = {
      user: 'giovanni_campinha@hotmail.com',
      pass: 'giovanni123@',
    };
    const base64Credentials = Buffer.from(`${credentials.user}:${credentials.pass}`).toString('base64');
    
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64Credentials}`,
    };
    
    const response = await firstValueFrom(this.httpService.post(url, {}, { headers }));
    return response.data.token;
  }
}
