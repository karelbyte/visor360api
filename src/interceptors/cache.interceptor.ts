/* import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as Redis from 'redis';
import { map } from 'rxjs/operators';
import { SubordinatesService } from 'src/services/subordinate.service';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly client = Redis.createClient();
  constructor(
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) {}
  async getCodes(ids: string[]): Promise<string[]> {
    let codes: string[] = [];
    for (const clientId of ids) {
      const user = await this.userService.findOneById(clientId);
      if (user.rol.code === 'commercial') {
        codes.push(user.code);
      } else {
        const subordinatesCodes =
          await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
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
    const cacheKey = `codes:${ids.join(',')}`;
    const cachedCodes = await this.client.get(cacheKey);
    if (cachedCodes) {
      const codes = JSON.parse(cachedCodes);
      return next.handle().pipe(
        map((data) => {
          return { ...data, codes };
        }),
      );
    }

    return next.handle().pipe(
      map(async (data) => {
        const codes = await this.getCodes(ids);
        this.client.set(cacheKey, JSON.stringify(data.codes), 'EX', 3600);
        return { ...data, codes };
      }),
    );
  }
}
*/
