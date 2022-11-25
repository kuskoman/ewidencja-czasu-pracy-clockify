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
  //@Matches(/(([0-9]|1[0-9]|2[0-3])(:[0-6][0-9])?|24(:00)?)/gm)
  @IsString()
  @ApiProperty({ example: '9:30' })
  startHour = '8:30';

  @IsOptional()
  @ApiProperty()
  roundPartials = true;

  @ApiProperty()
  @IsOptional()
  period: string | null = null;
}

export type CreateReportWithFileDto = CreateReportDto & {
  file: Express.Multer.File;
};
