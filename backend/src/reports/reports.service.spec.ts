import { Test, TestingModule } from '@nestjs/testing';
import { CsvParserService } from '../csv-parser/csv-parser.service';
import { TemplatesService } from '../templates/templates.service';
import { ReportsService } from './reports.service';

describe(ReportsService.name, () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        { provide: CsvParserService, useValue: csvParserServiceMock },
        { provide: TemplatesService, useValue: templatesServiceMock },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

const csvParserServiceMock = {
  parseCsvReport: jest.fn(),
};

const templatesServiceMock = {
  renderTemplate: jest.fn(),
};
