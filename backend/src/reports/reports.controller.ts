import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './reports.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  private readonly logger = new Logger(ReportsController.name);
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createReportDto: CreateReportDto,
  ) {
    if (!file) {
      throw new UnprocessableEntityException('You must provide a valid file');
    }

    this.logReceivedRequest(createReportDto, file);
    return await this.reportsService.create({ ...createReportDto, file });
  }

  private logReceivedRequest(dto: CreateReportDto, file: Express.Multer.File) {
    const { name, surname } = dto;
    const reqMsg = `Received request to generate report for ${name} ${surname}`;
    const fileName = file.filename || file.originalname;
    const fileMsg = `File ${fileName} attached to request has ${file.size} byes`;
    this.logger.log(reqMsg);
    this.logger.log(fileMsg);
  }
}
