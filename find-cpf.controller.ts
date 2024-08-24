import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FindCpfService } from './find-cpf.service';

@Controller('find-cpf')
export class FindCpfController {
  constructor(private readonly findCpfService: FindCpfService) {}

  @Post()
  async findCpf(@Body('cpf') cpf: string) {
    return this.findCpfService.findCpf(cpf);
  }

  @Get(':id')
  async getCpfResult(@Param('id') id: string) {
    return this.findCpfService.getCpfResult(id);
  }
}
