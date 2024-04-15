import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  const hostname = configService.get<string>('HOSTDEPLOY');
  const port = configService.get<number>('PORT');
  console.log(`Corriendo en IP: ${hostname}:${port}`);
  const config = new DocumentBuilder()
    .setTitle('SIGC API')
    .setDescription('Sistema integral de gestion de comercial.')
    .setVersion('1.0')
    .addTag('Especificaciones de la api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);

  await app.listen(port, hostname);
}
bootstrap();
