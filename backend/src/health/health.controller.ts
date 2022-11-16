import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    this.logger.verbose('Healthcheck called');
    return this.health.check([]);
  }
}
