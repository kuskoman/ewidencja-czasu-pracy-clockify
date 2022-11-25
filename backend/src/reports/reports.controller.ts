import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './reports.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    // todo: make file required
    @UploadedFile() file: Express.Multer.File,
    @Body() createReportDto: CreateReportDto,
  ) {
    return await this.reportsService.create({ ...createReportDto, file });
  }
}
