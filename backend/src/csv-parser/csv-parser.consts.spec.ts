import { utc } from 'moment';
import { CSV_REPORT_DATE_FORMAT } from './csv-parser.consts';

describe('CsvParserConsts', () => {
  describe('CSV_REPORT_DATE_FORMAT', () => {
    const format = CSV_REPORT_DATE_FORMAT;

    it('should match format used by clockify', () => {
      expect(utc('19/12/2022', format).toDate()).toEqual(
        new Date('2022-12-19'),
      );
    });
  });
});
