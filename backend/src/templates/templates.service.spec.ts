import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesLoaderService } from './templates-loader/templates-loader.service';
import { TemplatesService } from './templates.service';

describe(TemplatesService.name, () => {
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

  it('should properly render ejs template', async () => {
    templatesLoaderMock.getTemplate.mockImplementationOnce(
      async () => '<%= name %>',
    );
    const templateName = 'stein';

    await expect(
      service.renderTemplate(templateName, { name: 'Till' }),
    ).resolves.toBe('Till');
    expect(templatesLoaderMock.getTemplate).toBeCalledWith(templateName);
    expect(templatesLoaderMock.getTemplate).toBeCalledTimes(1);
  });
});

const templatesLoaderMock = {
  getTemplate: jest.fn(),
};
