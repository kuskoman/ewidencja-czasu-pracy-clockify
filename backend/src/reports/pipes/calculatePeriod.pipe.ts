import { PipeTransform } from '@nestjs/common';
import { SerializedReport } from '../../csv-parser/csv-parser.interfaces';
import { REPORTS_DATEFORMAT } from '../reports.consts';
import * as moment from 'moment';
import { CreateReportWithFileDto } from '../reports.dto';

export class CalculatePeriodPipe implements PipeTransform {
  constructor(private readonly dto: CreateReportWithFileDto) {}

  transform(report: SerializedReport) {
    const { period } = this.dto;
    if (period) {
      return period;
    }

    const firstDate = report[0].date;
    const lastDate = report[report.length - 1].date;

    const [periodStart, periodEnd] = [firstDate, lastDate].map((period) =>
      moment(period).format(REPORTS_DATEFORMAT),
    );

    return `${periodStart} - ${periodEnd}`;
  }
}
