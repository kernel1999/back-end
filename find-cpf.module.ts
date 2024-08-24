import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindCpfPostService } from './find-cpf-post.service';
import { FindCpfPostController } from './find-cpf-post.controller';
import { ExternalAuthService } from '../auth/external-auth.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module'; // Certifique-se de que o módulo correto seja importado

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User]),
    UsersModule, // Adicione o módulo aqui
  ],
  providers: [FindCpfPostService, ExternalAuthService],
  controllers: [FindCpfPostController],
})
export class FindCpfModule {}
