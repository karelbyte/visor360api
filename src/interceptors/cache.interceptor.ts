import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subordinate } from 'src/entities/subordinate.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Subordinate)
    private subordinateRepository: Repository<Subordinate>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getSubordinateByTerm = (
    bossId: string,
    mapper: (a: any) => any,
    data: Subordinate[],
  ) => {
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
    return subordinates.map(mapper);
  };

  async getSubordinatesByBossOnlyCodes(boss_id: string): Promise<string[]> {
    const allData = await this.subordinateRepository.find({
      relations: {
        user: true,
      },
    });
    const payload = this.getSubordinateByTerm(
      boss_id,
      (subordinate) => subordinate.user.code,
      allData,
    );
    return [...new Set(payload)];
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
  async getCodes(ids: string[]): Promise<string[]> {
    let codes: string[] = [];
    for (const clientId of ids) {
      const user = await this.findOneById(clientId);
      if (!user.rol || (user.rol && user.rol.code === 'commercial')) {
        codes.push(user.code);
      } else {
        const subordinatesCodes = await this.getSubordinatesByBossOnlyCodes(
          user.id,
        );
        codes = codes.concat(subordinatesCodes);
      }
    }
    return codes;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const ids = request.body.ids;
    const cacheKey = `codes-${ids.join('-')}`;
    const cachedCodes = await this.cacheManager.get<string>(cacheKey);
    if (cachedCodes) {
      const codes = cachedCodes.split(',');
      request.body = { ...request.body, codes: codes };
      return next.handle().pipe(
        map((data) => {
          return { ...data, codes: codes };
        }),
      );
    }
    console.time('get sql');
    const codes = await this.getCodes(ids);
    console.timeEnd('get sql');
    const parserCodes = codes.join(',');
    request.body = { ...request.body, codes: codes };
    return next.handle().pipe(
      map(async (data) => {
        await this.cacheManager.set(cacheKey, parserCodes);
        return { ...data, codes: codes };
      }),
    );
  }
}
