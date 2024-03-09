import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions, Not, IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserCreateDto, UserUpdateDto } from '../dtos/user.dto';
import { HttpRequestService } from './http.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private http: HttpRequestService,
  ) {}

  async getAll(
    page: number | null = null,
    limit: number | null = null,
    fieldToFilter: string | null = null,
    term: string | null = null,
  ): Promise<[User[], number]> {
    const options: FindManyOptions<User> = {
      relations: {
        rol: true,
      },
      order: {
        created_at: 'ASC',
      },
      where: {},
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
    return await this.usersRepository.findAndCount(options);
  }

  async getAllWithLeader(
    page: number | null = null,
    limit: number | null = null,
    fieldToFilter: string | null = null,
    term: string | null = null,
    withLeader: boolean = true,
  ): Promise<[User[], number]> {
    const options: FindManyOptions<User> = {
      relations: {
        rol: true,
      },
      order: {
        created_at: 'ASC',
      },
      where: {
        boss_id: withLeader ? Not(IsNull()) : IsNull(),
      },
    };

    if (page && limit) {
      options['take'] = limit;
      options['skip'] = (page - 1) * limit;
    }

    if (fieldToFilter && term) {
      options['where'][fieldToFilter] = Like('%' + term + '%');
    }
    return await this.usersRepository.findAndCount(options);
  }

  async findOneById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        rol: true,
      },
    });
  }

  async findOneByEmailAndDifferentId(
    email: string,
    userId: string,
  ): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
        id: Not(userId),
      },
    });
  }

  async create(userData: UserCreateDto): Promise<User> {
    userData.is_active = userData.is_active || true;
    userData['created_at'] = new Date();
    userData['updated_at'] = new Date();
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await this.usersRepository.save(userData);
  }

  async update(userData: Partial<UserUpdateDto>): Promise<User> {
    userData['updated_at'] = new Date();
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.usersRepository.update(userData.id, userData);
    return await this.findOneById(userData.id);
  }
}
