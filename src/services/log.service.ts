import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpRequestService } from './http.service';
import { Log } from 'src/entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
    private http: HttpRequestService,
  ) {}

  async getAll() {
    return await this.logRepository.find();
  }

  async create(logData: Partial<any>) {
    return await this.logRepository.save(logData);
  }
}
