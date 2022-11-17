import { Module } from '@nestjs/common';
import { TemplatesLoaderService } from './templates-loader.service';

@Module({
  providers: [TemplatesLoaderService],
  exports: [TemplatesLoaderService],
})
export class TemplatesLoaderModule {}
