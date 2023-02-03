import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';
import {
  TemplatesConfig,
  TEMPLATES_CONFIG_KEY,
} from '../config/templates.config';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const tempaltesConfig =
          configService.get<TemplatesConfig>(TEMPLATES_CONFIG_KEY);
        if (!tempaltesConfig) {
          throw new Error('Missing templates config');
        }
        const serveOptions: ServeStaticModuleOptions = {
          rootPath: join(__dirname, '..', '..', 'static'),
          renderPath: '/',
          exclude: ['/api*', '/swagger*'],
        };
        return [serveOptions];
      },
    }),
  ],
})
export class FrontendModule {}
