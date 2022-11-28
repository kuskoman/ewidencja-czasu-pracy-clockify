import { CreateReportWithFileDto } from '../reports.dto';
import { CalculatePeriodPipe } from './calculatePeriod.pipe';
import { SerializedReport } from '../../csv-parser/csv-parser.interfaces';
import { utc } from 'moment';

describe(CalculatePeriodPipe.name, () => {
  it('should skip calculating period if provided with dto', () => {
    const periodMock = '01/10/2022 - 31/10/2022';
    expect(transform(reportMock, periodMock)).toBe(periodMock);
  });

  it('should calculate period if not provided with dto', () => {
    expect(transform(reportMock)).toBe('2022/03/10 - 2022/07/10');
  });
});

const reportMock: SerializedReport = [
  '03/10/2022',
  '04/10/2022',
  '05/10/2022',
  '06/10/2022',
  '07/10/2022',
].map((date) => ({ date: utc(date).toDate(), time: 8 }));

const transform = (report: SerializedReport, period?: string) => {
  const pipe = new CalculatePeriodPipe({ period } as CreateReportWithFileDto);
  return pipe.transform(report);
};
