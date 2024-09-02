import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Like, Repository } from 'typeorm';
import { HttpRequestService } from './http.service';
import { Log } from 'src/entities/log.entity';

export interface IPaginateAndFilterParams {
  page: number | null;
  limit: number | null;
  fieldToFilter: string | null;
  term: string | null;
  dateStart: string;
  dateEnd: string;
  action: string;
}
@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
    private http: HttpRequestService,
  ) {}

  async getAll({
    page = null,
    limit = null,
    term = null,
    dateStart,
    dateEnd,
    action,
  }: IPaginateAndFilterParams) {
    const options: FindManyOptions<Log> = {
      relations: {
        user: true,
      },
      order: {
        created_at: 'DESC',
      },
      where: {},
    };

    if (page && limit) {
      options['take'] = limit;
      options['skip'] = (page - 1) * limit;
    }

    if (term !== null && term !== '') {
      options['where'] = {
        user: {
          names: Like('%' + term + '%'),
        },
      };
    }

    if (dateStart && dateEnd) {
      options['where'] = {
        ...options['where'],
        created_at: Between(
          new Date(dateStart + 'T01:00:00.000Z'),
          new Date(dateEnd + 'T23:50:00.000Z'),
        ),
      };
    }

    if (action && action !== 'ALL') {
      options['where'] = {
        ...options['where'],
        action: action,
      };
    }

    console.log(options);
    return await this.logRepository.findAndCount(options);
  }

  async create(logData: Partial<any>) {
    return await this.logRepository.save(logData);
  }
}
