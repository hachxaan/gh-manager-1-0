/* istanbul ignore file */
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Guru Hotel: Manager Tools')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/', app, document);

  app.enableCors({ origin: true, methods: ['POST', 'PUT', 'DELETE', 'GET'] });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
