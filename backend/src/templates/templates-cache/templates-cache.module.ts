import { Module } from '@nestjs/common';
import { TemplatesCacheService } from './templates-cache.service';

@Module({
  providers: [TemplatesCacheService],
  exports: [TemplatesCacheService],
})
export class TemplatesCacheModule {}
