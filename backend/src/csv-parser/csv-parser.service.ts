import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CsvConfig, csvConfig } from '../config/csv.config';
import { parse as parseCsv } from 'csv';
import { ReportValidatorService } from './report-validator/report-validator.service';
import { CsvReport, SerializedReport } from './csv-parser.interfaces';
import * as moment from 'moment';
import { CSV_REPORT_DATE_FORMAT } from './csv-parser.consts';

@Injectable()
export class CsvParserService {
  constructor(
    @Inject(csvConfig.KEY) private readonly config: CsvConfig,
    private readonly reportValidator: ReportValidatorService,
  ) {}

  public async parseCsvReport(csv: string | Buffer) {
    const parser = parseCsv(csv, {
      delimiter: this.config.delimeter,
      fromLine: 2,
    });

    const parsedData = await this.parserToPromise(parser);
    if (!this.reportValidator.validateCsvReport(parsedData)) {
      throw new UnprocessableEntityException('CSV validation failed');
    }

    return this.serializeCsvReport(parsedData);
  }

  private serializeCsvReport(csvReport: CsvReport): SerializedReport {
    return csvReport.map(this.serializeCsvRow);
  }

  private serializeCsvRow(row: CsvReport[number]) {
    const [dateString, , decimalTime] = row;

    return {
      date: moment(dateString, CSV_REPORT_DATE_FORMAT).toDate(),
      time: Number(decimalTime),
    };
  }

  private parserToPromise(parser: Parser): Promise<unknown[][]> {
    const parsedData: unknown[][] = [];
    return new Promise((res, rej) => {
      parser
        .on('data', (row) => {
          parsedData.push(row);
        })
        .on('error', rej)
        .on('end', () => {
          res(parsedData);
        });
    });
  }
}

type Parser = ReturnType<typeof parseCsv>;
