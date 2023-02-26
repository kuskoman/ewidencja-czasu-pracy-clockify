import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { CsvParserModule } from './csv-parser/csv-parser.module';
import { TemplatesModule } from './templates/templates.module';
import { ReportsModule } from './reports/reports.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    AppConfigModule,
    HealthModule,
    CsvParserModule,
    TemplatesModule,
    ReportsModule,
    MulterModule,
  ],
})
export class AppModule {}
