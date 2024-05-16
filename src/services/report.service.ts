import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpRequestService } from './http.service';
import { Report } from '../entities/report.entity';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reporRepository: Repository<Report>,
    private http: HttpRequestService,
  ) { }

  async getAll() {
    return await this.reporRepository.find({
      relations: {
        fields: true,
        filters: true,
      },
    });
  }
}
