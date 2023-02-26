import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { csvConfig, CsvConfig } from '../config/csv.config';
import { CsvParserService } from './csv-parser.service';
import { ReportValidatorService } from './report-validator/report-validator.service';

describe(CsvParserService.name, () => {
  let service: CsvParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CsvParserService,
        { provide: csvConfig.KEY, useValue: csvConfigMock },
        { provide: ReportValidatorService, useValue: reportValidatorMock },
      ],
    }).compile();

    service = module.get<CsvParserService>(CsvParserService);
  });

  it('should properly parse valid csv', async () => {
    const validReportFixture = loadFixture('example-report.csv');
    reportValidatorMock.validateCsvReport.mockReturnValueOnce(true);
    const parsedCsv = await service.parseCsvReport(validReportFixture);
    expect(parsedCsv).toMatchSnapshot();
  });

  it('should throw an error when csv is not valid', async () => {
    const invalidReportFixture = loadFixture('invalid-report.csv');
    reportValidatorMock.validateCsvReport.mockReturnValueOnce(false);
    const parseCsvPromise = service.parseCsvReport(invalidReportFixture);
    await expect(parseCsvPromise).rejects.toThrow(UnprocessableEntityException);
  });
});

const csvConfigMock: CsvConfig = {
  delimeter: ',',
};

const reportValidatorMock = {
  validateCsvReport: jest.fn(),
};

const loadFixture = (name: string): string => {
  const filePath = join(__dirname, 'fixtures', name);
  return readFileSync(filePath, 'utf-8');
};
