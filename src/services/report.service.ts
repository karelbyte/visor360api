import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpRequestService } from './http.service';
import { Report } from '../entities/report.entity';
import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';

export class Filter {
  @IsString()
  property: string;
  @IsString()
  value: string;
}

export class Field {
  @IsString()
  name: string;
  @IsString()
  field_name: string;
}

export class GenerateReportBody {
  @IsString()
  reportName: string;

  @IsString()
  url: string;

  @ValidateNested({ each: true })
  @Type(() => Field)
  fields: Field[];

  @ValidateNested({ each: true })
  @Type(() => Filter)
  filters: Filter[];
}
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reporRepository: Repository<Report>,
    private http: HttpRequestService,
  ) {}

  async getAll() {
    return await this.reporRepository.find({
      relations: {
        fields: true,
        filters: true,
      },
    });
  }

  filtersArrayToObject(filters) {
    return filters.reduce((acc, filter) => {
      acc[filter.property] = filter.value;
      return acc;
    }, {});
  }

  async generateReport(body: GenerateReportBody) {
    const customParam = {
      field_list: body.fields.map((item: Field) => item.field_name),
      ...this.filtersArrayToObject(body.filters),
    };
    console.log(customParam);
    try {
      return await this.http.request(
        'post',
        '/SIGC_PANAMA_REPORTERS' + body.url,
        customParam,
        'sigc',
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }
}
