import { Controller, Post, Body, Req } from '@nestjs/common';
import { FindCpfPostService } from './find-cpf-post.service';
import { Request } from 'express';

@Controller('find-cpf')
export class FindCpfPostController {
  constructor(private readonly findCpfPostService: FindCpfPostService) {}

  @Post()
  async findCpf(@Body('cpf') cpf: string, @Req() req: Request) {
    // Retorna o ID da consulta para permitir a requisição GET subsequente
    return this.findCpfPostService.findCpf(cpf, req);
  }
}
