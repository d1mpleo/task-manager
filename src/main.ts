import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Global pipes & interceptors
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  // CORS
  app.enableCors({
    origin: process.env.CLIENT_URL?.split(',') || '*',
    credentials: true,
  });

  const expressApp = app.getHttpAdapter().getInstance();

  const reactBuildPath = join(__dirname, '..', 'front', 'build');

  expressApp.use(express.static(reactBuildPath));

  expressApp.get('*', (req, res) => {
    res.sendFile(join(reactBuildPath, 'index.html'));
  });

  // PORT для Render
  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
