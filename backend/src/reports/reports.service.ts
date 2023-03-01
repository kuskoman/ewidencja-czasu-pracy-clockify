import { Injectable } from '@nestjs/common';
import { SerializedReport } from '../csv-parser/csv-parser.interfaces';
import { CsvParserService } from '../csv-parser/csv-parser.service';
import { TemplatesService } from '../templates/templates.service';
import { CalculatePeriodPipe } from './pipes/calculatePeriod.pipe';
import { CalculateTemplateRowsPipe } from './pipes/calculateTemplateRows.pipe';
import { ParseHoursSumPipe } from './pipes/parseHoursSum.pipe';
import { CreateReportWithFileDto } from './reports.dto';

const REPORT_TEMPLATE_NAME = 'report.html.ejs';

@Injectable()
export class ReportsService {
  constructor(
    private readonly csvParserService: CsvParserService,
    private readonly templatesService: TemplatesService,
  ) {}

  public async create(createReportDto: CreateReportWithFileDto) {
    const { surname, name } = createReportDto;

    const csvParseResult = await this.parseCsvFile(createReportDto);

    const { templateRows, hoursSum, period } = csvParseResult;

    const templateData = {
      evidence: templateRows,
      name,
      surname,
      hoursSum,
      period,
    };

    return this.templatesService.renderTemplate(
      REPORT_TEMPLATE_NAME,
      templateData,
    );
  }

  private async parseCsvFile(createReportDto: CreateReportWithFileDto) {
    const { file } = createReportDto;
    const parsedCsv = await this.csvParserService.parseCsvReport(file.buffer);

    const pipes = [
      new CalculateTemplateRowsPipe(createReportDto),
      new ParseHoursSumPipe(),
      new CalculatePeriodPipe(createReportDto),
    ] as const;

    const [calculateRows, parseHoursSum, calculatePeriod] = pipes.map(
      (pipe) => (report: SerializedReport) => pipe.transform(report),
    );

    const templateRows = calculateRows(parsedCsv);
    const hoursSum = parseHoursSum(parsedCsv);
    const period = calculatePeriod(parsedCsv);

    return { templateRows, hoursSum, period };
  }
}
