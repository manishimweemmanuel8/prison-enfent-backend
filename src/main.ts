import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3001;
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
