import { CreateReportWithFileDto } from '../reports.dto';
import { CalculatePeriodPipe } from './calculatePeriod.pipe';
import { SerializedReport } from '../../csv-parser/csv-parser.interfaces';
import { utc } from 'moment';

describe(CalculatePeriodPipe.name, () => {
  it('should skip calculating period if provided with dto', () => {
    const periodMock = '01/10/2022 - 31/10/2022';
    expect(transform(reportMock, periodMock)).toBe(periodMock);
  });

  it('should assume start of the month as period if not provided with dto', () => {
    expect(transform(reportMock)).toBe('2022/03/01 - 2022/03/15');
  });
});

const sampleDates = [
  // iso8061 date format
  '2022-03-10',
  '2022-03-11',
  '2022-03-12',
  '2022-03-13',
  '2022-03-14',
  '2022-03-15',
] as const;
const reportMock: SerializedReport = sampleDates.map((date) => ({
  date: utc(date).toDate(),
  time: 8,
}));

const transform = (report: SerializedReport, period?: string) => {
  const pipe = new CalculatePeriodPipe({ period } as CreateReportWithFileDto);
  return pipe.transform(report);
};
