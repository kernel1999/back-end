import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import cookieParser from 'cookie-parser'; // Correção na importação
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser()); // Uso do cookie-parser

  app.use(
    session({
      secret: process.env.JWT_SECRET_KEY, // Utilizando a chave secreta do .env
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // 1 hora
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API ALVO-CERTO ~V.0.1')
    .setDescription('Sistema de integração de APIs')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend
    credentials: true,
  });

  // Inicia o servidor na porta 4000 ou na porta especificada na variável de ambiente
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
