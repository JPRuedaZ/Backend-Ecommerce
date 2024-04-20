import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, forbidNonWhitelisted: true
  }));
  app.use(logger);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('JPRZO Ecommerce API')
    .setDescription('This is an API for Ecommerce App, it was build with NestJS') 
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
