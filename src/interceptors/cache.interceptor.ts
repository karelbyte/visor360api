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
import { CodesService } from 'src/services/codes.services';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly codeService: CodesService,
  ) {}

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
    const codes = await this.codeService.getCodes(ids);
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
