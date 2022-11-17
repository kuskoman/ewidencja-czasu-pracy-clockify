import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig } from './base.config';
import { csvConfig } from './csv.config';
import { swaggerConfig } from './swagger.config';
import { templatesConfig } from './templates.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [baseConfig, swaggerConfig, csvConfig, templatesConfig],
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
