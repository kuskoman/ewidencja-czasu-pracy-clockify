import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ example: 'Till' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Lindermann' })
  @IsNotEmpty()
  surname!: string;

  @IsOptional()
  @Matches(/(([0-9]|1[0-9]|2[0-3])(:[0-6][0-9])?|24(:00)?)/)
  @IsString()
  @ApiProperty({ example: '9:30', type: String })
  startHour = '8:30';

  @IsOptional()
  @ApiProperty({ example: false, type: Boolean })
  roundPartials = true;

  @ApiProperty({ example: '21/03/2002 - 23/04/2004', type: String })
  @IsOptional()
  period: string | null = null;
}

export type CreateReportWithFileDto = CreateReportDto & {
  file: Express.Multer.File;
};

export class UnprocessableReportResponse {
  @ApiProperty({ example: 'You must provide a valid file' })
  message!: string;

  @ApiProperty({ example: 422 })
  statusCode!: number;

  @ApiProperty({ example: 'Unprocessable Entity' })
  error!: string;
}
