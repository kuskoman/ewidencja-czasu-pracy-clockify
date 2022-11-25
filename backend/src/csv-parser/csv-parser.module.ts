import { Module } from '@nestjs/common';
import { CsvParserService } from './csv-parser.service';
import { ReportValidatorModule } from './report-validator/report-validator.module';

@Module({
  providers: [CsvParserService],
  imports: [ReportValidatorModule],
  exports: [CsvParserService],
})
export class CsvParserModule {}
