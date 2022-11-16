import { ServiceUnavailableException } from '@nestjs/common';
import {
  HealthCheckError,
  MongooseHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe(HealthController.name, () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule],
      providers: [
        { provide: MongooseHealthIndicator, useValue: mongodbHealthMock },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should should not throw when healthchecks are valid', async () => {
    await expect(controller.check()).resolves.not.toThrow();
  });

  it('should throw an error when at least one healthcheck fails', async () => {
    const failingImplementation = async () => {
      throw new HealthCheckError('Example error', 'because yes');
    };
    mongodbHealthMock.pingCheck.mockImplementationOnce(
      failingImplementation as unknown as typeof mongodbHealthMock['pingCheck'],
    );

    await expect(controller.check()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });
});

const mongodbHealthMock = {
  pingCheck: jest.fn(() => ({
    mongo: {
      status: 'up',
    },
  })),
};
