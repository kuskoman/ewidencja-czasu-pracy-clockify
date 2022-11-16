import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe(HealthController.name, () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should should not throw when healthchecks are valid', async () => {
    await expect(controller.check()).resolves.not.toThrow();
  });
});
