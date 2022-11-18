import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesLoaderService } from './templates-loader/templates-loader.service';
import { TemplatesService } from './templates.service';

describe('TemplatesService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        { provide: TemplatesLoaderService, useValue: templatesLoaderMock },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

const templatesLoaderMock = {};
