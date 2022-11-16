import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReportValidatorService } from './report-validator.service';

describe(ReportValidatorService.name, () => {
  let validator: ReportValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportValidatorService],
    }).compile();

    validator = module.get<ReportValidatorService>(ReportValidatorService);
  });

  it('should throw an error when report is empty', () => {
    const emptyReport = [];
    expect(() => validator.validateCsvReport(emptyReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an error when report has invalid number of rows in at least one column', () => {
    const invalidReport = [
      ['03/10/2022', '07:56:00', '7.933333333333334'],
      ['04/10/2022', '7.383333333333334'],
      ['05/10/2022', '07:55:00', '7.916666666666667'],
    ];
    expect(() => validator.validateCsvReport(invalidReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an error when report contains headers', () => {
    const invalidReport = [
      ['Date', 'Time (h)', 'Time (decimal)'],
      ['03/10/2022', '07:56:00', '7.933333333333334'],
      ['04/10/2022', '07:23:00', '7.383333333333334'],
    ];
    expect(() => validator.validateCsvReport(invalidReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an error when report contains invalid date', () => {
    const invalidReport = [
      ['03/10/2022', '07:56:00', '7.933333333333334'],
      ['notadate', '07:23:00', '7.383333333333334'],
      ['05/10/2022', '07:55:00', '7.916666666666667'],
    ];
    expect(() => validator.validateCsvReport(invalidReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an error when report contains invalid decimal time', () => {
    const invalidReport = [
      ['03/10/2022', '07:56:00', '7.933333333333334'],
      ['notadate', '07:23:00', '7.383333333333334'],
      ['05/10/2022', '07:55:00', 'hehe'],
    ];
    expect(() => validator.validateCsvReport(invalidReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an erorr when report is not an array', () => {
    expect(() => validator.validateCsvReport({} as any)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an error when date is not a string', () => {
    const invalidReport = [[new Date('1970'), '07:56:00', '7.933333333333334']];
    expect(() => validator.validateCsvReport(invalidReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw an error when decimal time is not a float', () => {
    const invalidReport = [['03/10/2022', '07:56:00', '03/10/2022']];
    expect(() => validator.validateCsvReport(invalidReport)).toThrow(
      UnprocessableEntityException,
    );
  });

  it('should return true for a valid report', () => {
    const validReport = [
      ['03/10/2022', '07:56:00', '7.933333333333334'],
      ['04/10/2022', '07:23:00', '7.383333333333334'],
      ['05/10/2022', '07:55:00', '7.916666666666667'],
      ['06/10/2022', '08:49:03', '8.8175'],
      ['07/10/2022', '04:41:47', '4.6963888888888885'],
      ['10/10/2022', '08:39:18', '8.655'],
      ['11/10/2022', '05:37:59', '5.633055555555556'],
      ['12/10/2022', '08:23:10', '8.386111111111111'],
      ['13/10/2022', '07:40:03', '7.6675'],
      ['14/10/2022', '07:22:16', '7.371111111111111'],
      ['17/10/2022', '02:00:00', '2.0'],
      ['18/10/2022', '09:33:59', '9.56638888888889'],
      ['19/10/2022', '08:03:30', '8.058333333333334'],
      ['20/10/2022', '08:01:58', '8.032777777777778'],
      ['21/10/2022', '06:53:32', '6.892222222222222'],
      ['22/10/2022', '01:10:08', '1.1688888888888889'],
      ['24/10/2022', '08:43:28', '8.724444444444444'],
      ['25/10/2022', '08:09:54', '8.165'],
      ['26/10/2022', '07:50:00', '7.833333333333333'],
      ['27/10/2022', '09:00:58', '9.016111111111112'],
      ['28/10/2022', '10:05:08', '10.085555555555555'],
      ['31/10/2022', '07:50:38', '7.8438888888888885'],
    ];
    expect(() => validator.validateCsvReport(validReport)).not.toThrow();
    expect(validator.validateCsvReport(validReport)).toBe(true);
  });
});
