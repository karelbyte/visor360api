import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportFieldDto } from './reportfield.dto';

export class ReportCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}

export class ReportUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}

interface IReportDto {
  id: string;
  name: string;
  url: string;
  is_active: boolean;
  fields: ReportFieldDto[];
  created_at: Date;
  updated_at: Date;
}
export class ReportDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  url: string;
  @ApiProperty()
  @IsBoolean()
  is_active: boolean;
  fields: ReportFieldDto[];
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    name,
    url,
    is_active,
    fields,
    created_at,
    updated_at,
  }: IReportDto) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.fields = fields;
    this.is_active = is_active;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
