import { PipeTransform } from '@nestjs/common';
import { SerializedReport } from '../../csv-parser/csv-parser.interfaces';
import { REPORTS_DATEFORMAT } from '../reports.consts';
import * as moment from 'moment';
import { CreateReportWithFileDto } from '../reports.dto';

export class CalculateTemplateRowsPipe implements PipeTransform {
  constructor(private readonly dto: CreateReportWithFileDto) {}

  transform(report: SerializedReport) {
    return report.map((row) => {
      const hours = Math.round(row.time);
      return {
        date: this.formatDateForEvidence(row.date),
        hours,
        startHour: this.dto.startHour,
        endHour: this.addTimeToStartHour(this.dto.startHour, hours),
      };
    });
  }

  private formatDateForEvidence(date: Date) {
    return moment(date).format(REPORTS_DATEFORMAT);
  }

  // does not cover any edge case
  private addTimeToStartHour(startHour: string, hours: number) {
    const [hourTime, minuteTime] = startHour.split(':');
    const endHour = +hourTime + hours;
    return `${endHour}:${minuteTime}`;
  }
}
