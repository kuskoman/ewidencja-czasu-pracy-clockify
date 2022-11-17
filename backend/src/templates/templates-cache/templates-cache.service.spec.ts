import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import {
  templatesConfig,
  TemplatesConfig,
} from '../../config/templates.config';
import { TemplatesCacheService } from './templates-cache.service';

describe(TemplatesCacheService.name, () => {
  let service: TemplatesCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesCacheService,
        { provide: templatesConfig.KEY, useValue: configMock },
      ],
    }).compile();

    await module.init();
    service = module.get<TemplatesCacheService>(TemplatesCacheService);
  });

  it('should not allow to load template outside allowed dir', async () => {
    await expect(
      service.getTemplate('../templates-cache.service.spec.ts'),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow to load template inside templates dir', async () => {
    await expect(service.getTemplate('template-a.html.ejs')).resolves.toBe(
      'template a\n',
    );
  });

  it('should fail if there are more templates than allowed', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesCacheService,
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
