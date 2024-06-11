import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions, Not, IsNull, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import {
  UpdateUserFilialDto,
  UserCreateDto,
  UserUpdateDto,
} from '../dtos/user.dto';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { UserFilials } from '../entities/userfilials.entity';

export interface IPaginateAndFilterParams {
  page: number | null;
  limit: number | null;
  fieldToFilter: string | null;
  term: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserCredentialsLog)
    private logRepository: Repository<UserCredentialsLog>,
    @InjectRepository(UserFilials)
    private userFilialsRepository: Repository<UserFilials>,
  ) { }

  async getAll({
    page = null,
    limit = null,
    fieldToFilter = null,
    term = null,
  }: IPaginateAndFilterParams): Promise<[User[], number]> {
    const options: FindManyOptions<User> = {
      relations: {
        rol: true,
        filial: {
          filial: true,
        },
        leaders: {
          boss: true,
        },
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
        leader: true,
      },
      order: {
        rol: {
          id: 'ASC',
        },
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

  async getAllLeaders(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: {
        rol: true,
      },
      where: {
        rol: {
          code: In(['manager', 'commercial_boss', 'sponsors']),
        },
      },
    });
  }
  async findOneById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        filial: {
          filial: true,
        },
        rol: true,
        leaders: {
          boss: {
            rol: true,
            leaders: {
              boss: true,
            },
          },
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        filial: {
          filial: true,
        },
        rol: true,
        subordinates: true,
        leaders: {
          boss: true,
        },
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

  async create(
    userData: Omit<UserCreateDto, 'filial'>,
    filial: string,
  ): Promise<User> {
    userData.is_active = false;
    userData['created_at'] = new Date();
    userData['updated_at'] = new Date();
    if (userData.password) {
      const password = atob(userData.password);
      userData.password = await bcrypt.hash(password, 10);
    }
    const user = await this.usersRepository.save(userData);
    const credentialsLog = {
      user_id: user.id,
      password: userData.password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await this.logRepository.save(credentialsLog);
    await this.userFilialsRepository.save({
      user_id: user.id,
      filial_id: filial,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return user;
  }

  async update(userData: Partial<UserUpdateDto>): Promise<User> {
    userData['updated_at'] = new Date();
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
      const credentialsLog = {
        user_id: userData.id,
        password: userData.password,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await this.logRepository.save(credentialsLog);
    }

    if (userData.rol_id && userData.rol_id === '') {
      userData.rol_id = null;
    }

    await this.usersRepository.update(userData.id, userData);
    return await this.findOneById(userData.id);
  }

  async updateUserFilial(data: Partial<UpdateUserFilialDto>): Promise<User> {
    let userFilial = await this.userFilialsRepository.findOne({
      where: {
        user_id: data.user_id,
      },
    });

    if (userFilial) {
      userFilial.filial_id = data.filial_id;
    } else {
      userFilial = this.userFilialsRepository.create({
        user_id: data.user_id,
        filial_id: data.filial_id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await this.userFilialsRepository.save(userFilial);
    return await this.findOneById(data.user_id);
  }
}
