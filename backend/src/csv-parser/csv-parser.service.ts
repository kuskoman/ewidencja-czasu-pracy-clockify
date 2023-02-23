import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CsvConfig, csvConfig } from '../config/csv.config';
import { parse as parseCsv } from 'csv';
import { ReportValidatorService } from './report-validator/report-validator.service';
import {
  CsvReport,
  SerializedReport,
  UnknownCsv,
} from './csv-parser.interfaces';
import { utc } from 'moment';
import { CSV_REPORT_DATE_FORMAT } from './csv-parser.consts';

@Injectable()
export class CsvParserService {
  private readonly logger = new Logger(CsvParserService.name);
  constructor(
    @Inject(csvConfig.KEY) private readonly config: CsvConfig,
    private readonly reportValidator: ReportValidatorService,
  ) {}

  public async parseCsvReport(csv: string | Buffer) {
    const parser = this.getCsvParser(csv);

    let parsedData: UnknownCsv;
    try {
      parsedData = await this.parserToPromise(parser);
    } catch (e) {
      this.logger.error(`An error occurred while parsing csv`);
      this.logger.error(e);
      throw new UnprocessableEntityException(`CSV could not be parsed: ${e}`);
    }
    if (!this.reportValidator.validateCsvReport(parsedData)) {
      throw new UnprocessableEntityException('CSV validation failed');
    }

    return this.serializeCsvReport(parsedData);
  }

  private getCsvParser(csv: string | Buffer) {
    const parser = parseCsv(csv, {
      delimiter: this.config.delimeter,
      fromLine: 2,
    });

    return parser;
  }

  private serializeCsvReport(csvReport: CsvReport): SerializedReport {
    return csvReport.map(this.serializeCsvRow);
  }

  private serializeCsvRow(row: CsvReport[number]) {
    const [dateString, , decimalTime] = row;

    return {
      date: utc(dateString, CSV_REPORT_DATE_FORMAT).toDate(),
      time: Number(decimalTime),
    };
  }

  private parserToPromise(parser: Parser): Promise<UnknownCsv> {
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
