import { PipeTransform } from '@nestjs/common';
import { SerializedReport } from '../../csv-parser/csv-parser.interfaces';

export class ParseHoursSumPipe implements PipeTransform {
  transform(report: SerializedReport) {
    return Math.round(report.reduce((acc, { time }) => acc + time, 0));
  }
}
