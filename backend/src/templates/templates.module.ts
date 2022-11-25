import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesLoaderModule } from './templates-loader/templates-loader.module';

@Module({
  providers: [TemplatesService],
  imports: [TemplatesLoaderModule],
  exports: [TemplatesService],
})
export class TemplatesModule {}
