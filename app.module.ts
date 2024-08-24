import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../ormconfig';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { FindCnpjModule } from './find-cnpj/find-cnpj.module';
import { TypeOfQueryModule } from './type-of-query/type-of-query.module';
import { HistoryOfQueryModule } from './history-of-query/history-of-query.module';
import { FindCpfModule } from './find-cpf/find-cpf.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    UserProfileModule,
    FindCnpjModule,
    TypeOfQueryModule,
    HistoryOfQueryModule,
    FindCpfModule, // Removido o ExtractOfUserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
