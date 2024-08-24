import { Controller, Get, Param } from '@nestjs/common';
import { FindCpfPostService } from './find-cpf-post.service';

@Controller('find-cpf')
export class FindCpfGetController {
  constructor(private readonly findCpfPostService: FindCpfPostService) {}

  @Get(':id')
  async getCpfResult(@Param('id') id: string) {
    return this.findCpfPostService.getCpfResult(id);
  }
}
