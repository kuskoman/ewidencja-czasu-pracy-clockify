import { Module } from '@nestjs/common';
import { ReportValidatorService } from './report-validator.service';

@Module({
  providers: [ReportValidatorService],
  exports: [ReportValidatorService],
})
export class ReportValidatorModule {}
