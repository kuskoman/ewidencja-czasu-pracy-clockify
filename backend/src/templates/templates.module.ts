import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesCacheModule } from './templates-cache/templates-cache.module';

@Module({
  providers: [TemplatesService],
  imports: [TemplatesCacheModule]
})
export class TemplatesModule {}
