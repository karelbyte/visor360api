import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions, DeleteResult } from 'typeorm';
import { Subordinate } from '../entities/subordinate.entity';
import {
  SubordinateCreateDto,
  SubordinateUpdateDto,
} from '../dtos/subordinate.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class SubordinatesService {
  constructor(
    @InjectRepository(Subordinate)
    private subordinateRepository: Repository<Subordinate>,
  ) {}

  async getAll(
    page: number | null = null,
    limit: number | null = null,
    fieldToFilter: string | null = null,
    term: string | null = null,
  ): Promise<[any[], number]> {
    const options: FindManyOptions<Subordinate> = {
      order: {
        created_at: 'ASC',
      },
      relations: {
        user: true,
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
    const [result, count] =
      await this.subordinateRepository.findAndCount(options);

    const hierarchy = this.generateHierarchy(result);

    return [this.mapperHierarchyForSubordinate(hierarchy), count];
  }

  async findByUserId(user_id: string): Promise<UserDto[]> {
    const data = await this.subordinateRepository.find({
      where: {
        boss_id: user_id,
      },
      relations: {
        user: true,
      },
    });
    return data.map((item) => new UserDto(item.user));
  }
  async findOneById(subordinateId: number): Promise<Subordinate> {
    return await this.subordinateRepository.findOne({
      where: {
        id: subordinateId,
      },
      relations: {
        user: true,
      },
    });
  }

  async delete(subordinateData: SubordinateCreateDto): Promise<DeleteResult> {
    return await this.subordinateRepository.delete(subordinateData);
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

  generateHierarchy(data: Subordinate[]) {
    const hierarchy = {};

    data.forEach((user: Subordinate) => {
      const userId = user.user_id;
      hierarchy[userId] = { user, subordinates: [] };
    });

    data.forEach((user) => {
      const bossId: string = user.boss_id || null;
      if (bossId !== null) {
        hierarchy[bossId].subordinates.push(hierarchy[user.user_id]);
      }
    });

    const topLevel = Object.values(hierarchy).filter(
      (entry) => entry['user'].boss_id === null,
    );

    const flattenedHierarchy = [];

    function flatten(entry: any) {
      const copy = { user: entry.user, subordinates: [] };
      flattenedHierarchy.push(copy);

      entry.subordinates.forEach((subordinate: any) => {
        flatten(subordinate);
        copy.subordinates.push(subordinate.user);
      });
    }

    topLevel.forEach((entry) => flatten(entry));

    return flattenedHierarchy;
  }

  mapperHierarchyForSubordinate(data: any[]) {
    return data.map((item) => {
      return {
        ...new UserDto(item.user.user),
        boss_id: item.user.boss_id,
        subordinates: item.subordinates.map((subordinate: any) => {
          return {
            ...new UserDto(subordinate.user),
            boss_id: subordinate.boss_id,
          };
        }),
      };
    });
  }
}
