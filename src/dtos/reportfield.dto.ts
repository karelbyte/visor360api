import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportFieldCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  report_id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  field_name: string;
}

export class ReportFieldUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  report_id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  field_name: string;
}

interface IReportFieldDto {
  id: string;
  report_id: string;
  name: string;
  field_name: string;
  created_at: Date;
  updated_at: Date;
}
export class ReportFieldDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  report_id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  field_name: string;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    report_id,
    name,
    field_name,
    created_at,
    updated_at,
  }: IReportFieldDto) {
    this.id = id;
    this.report_id = report_id;
    this.name = name;
    this.field_name = field_name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
