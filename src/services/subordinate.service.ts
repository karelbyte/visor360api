import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions } from 'typeorm';
import { HttpRequestService } from './http.service';
import { Subordinate } from '../entities/subordinate.entity';
import {
  SubordinateCreateDto,
  SubordinateUpdateDto,
} from '../dtos/subordinate.dto';

@Injectable()
export class SubordinatesService {
  constructor(
    @InjectRepository(Subordinate)
    private subordinateRepository: Repository<Subordinate>,
    private http: HttpRequestService,
  ) {}

  async getAll(
    page: number | null = null,
    limit: number | null = null,
    fieldToFilter: string | null = null,
    term: string | null = null,
  ): Promise<[Subordinate[], number]> {
    const options: FindManyOptions<Subordinate> = {
      order: {
        created_at: 'ASC',
      },
    };

    if (page && limit) {
      options['take'] = limit;
      options['skip'] = (page - 1) * limit;
    }

    if (fieldToFilter && term) {
      options['where'] = {
        [fieldToFilter]: Like('%' + term + '%'),
      };
    }
    return await this.subordinateRepository.findAndCount(options);
  }

  async findOneById(userId: string): Promise<Subordinate> {
    return await this.subordinateRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async create(subordinateData: SubordinateCreateDto): Promise<Subordinate> {
    subordinateData['created_at'] = new Date();
    subordinateData['updated_at'] = new Date();
    return await this.subordinateRepository.save(subordinateData);
  }

  async update(subordinateData: SubordinateUpdateDto): Promise<Subordinate> {
    subordinateData['updated_at'] = new Date();
    await this.subordinateRepository.update(
      subordinateData.id,
      subordinateData,
    );
    return await this.findOneById(subordinateData.id);
  }

  getSubordinateIds = (bossId: string, data: Subordinate[]) => {
    const subordinateIds = [];
    function getSubordinatesRecursively(bossId: string) {
      const directSubordinates = data
        .filter((subordinate) => subordinate.boss_id === bossId)
        .map((subordinate) => subordinate.user_id);
      subordinateIds.push(...directSubordinates);
      for (const subordinateId of directSubordinates) {
        getSubordinatesRecursively(subordinateId);
      }
    }
    getSubordinatesRecursively(bossId);
    const subordinates = data.filter((subordinate) =>
      subordinateIds.includes(subordinate.user_id),
    );
    return subordinates.map((subordinate) => subordinate.user.names);
  };
  async getSubordinatesByBoss(boss_id: string): Promise<string[]> {
    const allData = await this.subordinateRepository.find({
      relations: {
        user: true,
      },
    });
    return this.getSubordinateIds(boss_id, allData);
  }
}
