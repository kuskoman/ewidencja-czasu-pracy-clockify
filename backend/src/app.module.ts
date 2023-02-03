import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { CsvParserModule } from './csv-parser/csv-parser.module';
import { TemplatesModule } from './templates/templates.module';
import { ReportsModule } from './reports/reports.module';
import { MulterModule } from '@nestjs/platform-express';
import { FrontendModule } from './frontend/frontend.module';

const frontendServeModule =
  process.env.FRONTEND_SERVE === 'true' ? [FrontendModule] : [];

@Module({
  imports: [
    AppConfigModule,
    HealthModule,
    CsvParserModule,
    TemplatesModule,
    ReportsModule,
    MulterModule,
    ...frontendServeModule,
  ],
})
export class AppModule {}
