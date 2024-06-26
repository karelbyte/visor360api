import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions, Not, IsNull, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserCreateDto, UserUpdateDto } from '../dtos/user.dto';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { Bank } from 'src/entities/bank.entity';
import { AppMailerService } from './mailer.service';
import { readFileSync } from 'fs';
import { join } from 'path';
export interface IPaginateAndFilterParams {
  page: number | null;
  limit: number | null;
  fieldToFilter: string | null;
  term: string | null;
  bankId?: string | null;
  filialId?: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserCredentialsLog)
    private logRepository: Repository<UserCredentialsLog>,
    private readonly mailerService: AppMailerService,
    @InjectRepository(Bank)
    private userBankRepository: Repository<Bank>,
  ) { }

  async getAll({
    page = null,
    limit = null,
    fieldToFilter = null,
    term = null,
    bankId = null,
    filialId = null,
  }: IPaginateAndFilterParams): Promise<[User[], number]> {
    const options: FindManyOptions<User> = {
      relations: {
        rol: true,
        filial: true,
        bank: true,
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

    if (bankId) {
      options['where'] = {
        ['bank_id']: bankId,
      };
    }

    if (filialId) {
      options['where'] = {
        ['filial_id']: filialId,
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
        filial: true,
        bank: true,
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
        filial: true,
        bank: true,
        rol: true,
        subordinates: true,
        leaders: {
          boss: true,
        },
      },
    });
  }

  async findUsersByCode(codes: string[]): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        code: In(codes),
      },
      relations: {
        filial: true,
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

  async create(userData: Partial<UserCreateDto>): Promise<User> {
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

    // envio de email de confirmacion
    const fileImg = join(__dirname, '..', 'templates') + '/logopng.png';
    const imageData = readFileSync(fileImg).toString('base64');
    const mailData = {
      to: user.email,
      subject: 'SIGC Confirmación de cuenta',
      text: '',
      template: join(__dirname, '..', 'templates') + '/user.create.pug',
      dataTemplate: {
        img: imageData,
        name: user.names,
        url: `${process.env.FRONT_URL_RECOVER_PASSWORD}/auth/login`,
      },
    };

    try {
      await this.mailerService.sendMail(mailData);
      return user;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
}
