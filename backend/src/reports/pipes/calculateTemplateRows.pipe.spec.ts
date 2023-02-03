import { CreateReportWithFileDto } from '../reports.dto';
import { CalculateTemplateRowsPipe } from './calculateTemplateRows.pipe';
import { utc } from 'moment';
import { CSV_REPORT_DATE_FORMAT } from '../../csv-parser/csv-parser.consts';

describe(CalculateTemplateRowsPipe.name, () => {
  it('should change start hour when end time would exceed 24:00', () => {
    const pipeInput = {
      startHour: '23:00',
    } as unknown as CreateReportWithFileDto;
    const pipe = new CalculateTemplateRowsPipe(pipeInput);

    const date = utc('19/12/2022', CSV_REPORT_DATE_FORMAT).toDate();
    const expectedOutput = [
      {
        date: '2022/12/19',
        endHour: '4:00',
        hours: 5,
        startHour: pipeInput.startHour,
      },
    ];
    expect(pipe.transform([{ date, time: 5 }])).toStrictEqual(expectedOutput);
  });

  it('should properly add hours to start hour', () => {
    const pipeInput = {
      startHour: '12:00',
    } as unknown as CreateReportWithFileDto;
    const pipe = new CalculateTemplateRowsPipe(pipeInput);

    const date = utc('19/12/2022', CSV_REPORT_DATE_FORMAT).toDate();
    const expectedOutput = [
      {
        date: '2022/12/19',
        endHour: '14:00',
        hours: 2,
        startHour: pipeInput.startHour,
      },
    ];
    expect(pipe.transform([{ date, time: 2 }])).toStrictEqual(expectedOutput);
  });

  it('should properly round hours', () => {
    const pipeInput = {
      startHour: '12:00',
    } as unknown as CreateReportWithFileDto;
    const pipe = new CalculateTemplateRowsPipe(pipeInput);

    const date = utc('19/12/2022', CSV_REPORT_DATE_FORMAT).toDate();
    const expectedOutput = [
      {
        date: '2022/12/19',
        endHour: '15:00',
        hours: 3,
        startHour: pipeInput.startHour,
      },
    ];
    expect(pipe.transform([{ date, time: 2.6 }])).toStrictEqual(expectedOutput);
  });
});
