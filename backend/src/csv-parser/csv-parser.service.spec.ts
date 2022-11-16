import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { csvConfig, CsvConfig } from '../config/csv.config';
import { CsvParserService } from './csv-parser.service';
import { ReportValidatorModule } from './report-validator/report-validator.module';

describe(CsvParserService.name, () => {
  let service: CsvParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CsvParserService,
        { provide: csvConfig.KEY, useValue: csvConfigMock },
      ],
      imports: [ReportValidatorModule],
    }).compile();

    service = module.get<CsvParserService>(CsvParserService);
  });

  it('should properly parse valid csv', async () => {
    const validReportFixture = loadFixture('example-report.csv');
    const parsedCsv = await service.parseCsvReport(validReportFixture);
    expect(parsedCsv).toMatchSnapshot();
  });
});

const csvConfigMock: CsvConfig = {
  delimeter: ',',
};

const loadFixture = (name: string): string => {
  const filePath = join(__dirname, 'fixtures', name);
  return readFileSync(filePath, 'utf-8');
};
