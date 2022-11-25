import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CsvParserModule } from '../csv-parser/csv-parser.module';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [CsvParserModule, TemplatesModule],
})
export class ReportsModule {}
