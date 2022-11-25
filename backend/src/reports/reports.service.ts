import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { SerializedReport } from '../csv-parser/csv-parser.interfaces';
import { CsvParserService } from '../csv-parser/csv-parser.service';
import { TemplatesService } from '../templates/templates.service';
import { CreateReportWithFileDto } from './reports.dto';

const REPORT_TEMPLATE_NAME = 'report.html.ejs';

@Injectable()
export class ReportsService {
  private readonly dateformat = 'YYYY/MM/DD';

  constructor(
    private readonly csvParserService: CsvParserService,
    private readonly templatesService: TemplatesService,
  ) {}

  public async create(createReportDto: CreateReportWithFileDto) {
    const { file, startHour, name, surname, period } = createReportDto;

    const parsedCsv = await this.csvParserService.parseCsvReport(file.buffer);
    const templateRows = this.calculateTemplateRows(parsedCsv, startHour);

    const hoursSum = this.parseHoursSum(parsedCsv);

    const templateData = {
      evidence: templateRows,
      name,
      surname,
      hoursSum,
      period: this.calculatePeriod(parsedCsv, period),
    };

    return this.templatesService.renderTemplate(
      REPORT_TEMPLATE_NAME,
      templateData,
    );
  }

  // does not cover any edge case
  private addTimeToStartHour(startHour: string, hours: number) {
    const [hourTime, minuteTime] = startHour.split(':');
    const endHour = +hourTime + hours;
    return `${endHour}:${minuteTime}`;
  }

  private calculateTemplateRows(report: SerializedReport, startHour: string) {
    return report.map((row) => {
      const hours = Math.round(row.time);
      return {
        date: this.formatDateForEvidence(row.date),
        hours,
        startHour,
        endHour: this.addTimeToStartHour(startHour, hours),
      };
    });
  }

  private formatDateForEvidence(date: Date) {
    return moment(date).format(this.dateformat);
  }

  private parseHoursSum(report: SerializedReport) {
    return Math.round(report.reduce((acc, { time }) => acc + time, 0));
  }

  private calculatePeriod(report: SerializedReport, period: string | null) {
    if (period) {
      return period;
    }

    const firstDate = report[0].date;
    const lastDate = report[report.length - 1].date;

    const [periodStart, periodEnd] = [firstDate, lastDate].map((period) =>
      moment(period).format(this.dateformat),
    );

    return `${periodStart} - ${periodEnd}`;
  }
}
