import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CSV_REPORT_DATE_FORMAT } from '../csv-parser.consts';
import { CsvReport } from '../csv-parser.interfaces';
import { utc } from 'moment';

@Injectable()
export class ReportValidatorService {
  public validateCsvReport(report: unknown[][]): report is CsvReport {
    if (!Array.isArray(report)) {
      throw new UnprocessableEntityException('Report is not an array');
    }

    if (report.length < 1) {
      throw new UnprocessableEntityException("Report can't be empty");
    }

    const firstElement = report[0][0];
    if (firstElement === 'Date') {
      const errMsg =
        'Expected to receive raw csv data, received file with headers';
      throw new UnprocessableEntityException(errMsg);
    }

    for (const row of report) {
      if (row.length != 3) {
        const errMsg = `Report row has invalid number of columns: ${row.length}`;
        throw new UnprocessableEntityException(errMsg);
      }

      const [date, , decimalTime] = row;
      if (typeof date !== 'string' || typeof decimalTime !== 'string') {
        throw new UnprocessableEntityException('Received invalid type of data');
      }

      if (!this.isValidDate(date)) {
        const errMsg = `Expected valid date, received ${date}`;
        throw new UnprocessableEntityException(errMsg);
      }

      if (!this.isValidFloat(decimalTime)) {
        const errMsg = `Expected valid decimalTime, received ${decimalTime}`;
        throw new UnprocessableEntityException(errMsg);
      }
    }

    return true;
  }

  private isValidDate(dateString: string) {
    const parsedDate = utc(dateString, CSV_REPORT_DATE_FORMAT);
    return parsedDate.isValid();
  }

  private isValidFloat(numberString: string) {
    return !Number.isNaN(Number(numberString));
  }
}
