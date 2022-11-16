import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig } from './base.config';
import { csvConfig } from './csv.config';
import { swaggerConfig } from './swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [baseConfig, swaggerConfig, csvConfig],
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
