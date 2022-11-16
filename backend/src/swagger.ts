import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { swaggerConfig, SwaggerConfig } from './config/swagger.config';

export const configureSwagger = (app: INestApplication) => {
  const logger = new Logger('SwaggerConfiguration');
  const config = new DocumentBuilder().setTitle('link shortener').build();
  const document = SwaggerModule.createDocument(app, config);

  const { path } = app.get<SwaggerConfig>(swaggerConfig.KEY);

  SwaggerModule.setup(path, app, document);

  logger.log(`Swagger avaiable on /${path}`);
};
