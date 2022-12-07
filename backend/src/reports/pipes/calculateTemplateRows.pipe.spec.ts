import { CreateReportWithFileDto } from '../reports.dto';
import { CalculateTemplateRowsPipe } from './calculateTemplateRows.pipe';
import { utc } from 'moment';
import { CSV_REPORT_DATE_FORMAT } from '../../csv-parser/csv-parser.consts';

describe(CalculateTemplateRowsPipe.name, () => {
  it('should change start hour when end time would exceed 24:00', () => {
    const pipe = new CalculateTemplateRowsPipe({
      startHour: 23,
    } as unknown as CreateReportWithFileDto);

    const date = utc('19/12/2022', CSV_REPORT_DATE_FORMAT).toDate();
    expect(pipe.transform([{ date, time: 5 }])).toStrictEqual({});
  });

  xit('should properly add hours to start hour');
  xit('should properly round hours');
});
