import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseConfig, baseConfig } from './config/base.config';
import { customLogger } from './logger';
import { configureSwagger } from './swagger';

const bootstrap = async () => {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: customLogger });
  const { port } = app.get<BaseConfig>(baseConfig.KEY);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  configureSwagger(app);

  await app.listen(port, async () => {
    const url = await app.getUrl();
    logger.log(`App listening on ${url}`);
  });
};

bootstrap();
