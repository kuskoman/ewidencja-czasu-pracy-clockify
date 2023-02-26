import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import {
  templatesConfig,
  TemplatesConfig,
} from '../../config/templates.config';
import { TemplatesLoaderService } from './templates-loader.service';

describe(TemplatesLoaderService.name, () => {
  let service: TemplatesLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesLoaderService,
        { provide: templatesConfig.KEY, useValue: configMock },
      ],
    }).compile();

    await module.init();
    service = module.get<TemplatesLoaderService>(TemplatesLoaderService);
  });

  it('should not allow to load template outside allowed dir', async () => {
    const invalidTemplatePath = '../templates-cache.service.spec.ts';
    const templatePromise = service.getTemplate(invalidTemplatePath);
    await expect(templatePromise).rejects.toThrow(ForbiddenException);
  });

  it('should allow to load template inside templates dir', async () => {
    await expect(service.getTemplate('template-a.html.ejs')).resolves.toBe(
      'template a\n',
    );
  });

  it('should fail if there are more templates than allowed', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesLoaderService,
        {
          provide: templatesConfig.KEY,
          useValue: { ...configMock, templatesLimit: 1 },
        },
      ],
    }).compile();
    await expect(module.init()).rejects.toThrow(
      /Found more templates than allowed by limit/,
    );
  });
});

const configMock: TemplatesConfig = {
  templatesLimit: 3,
  templatesPath: join(__dirname, 'fixtures'),
};
