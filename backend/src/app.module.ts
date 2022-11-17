import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { CsvParserModule } from './csv-parser/csv-parser.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [AppConfigModule, HealthModule, CsvParserModule, TemplatesModule],
})
export class AppModule {}
