import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from 'src/entities/log.entity';
import { Reflector } from '@nestjs/core';
import { jsonc } from 'jsonc';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Log)
    private readonly requestLogRepository: Repository<Log>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { method, url, body } = request;

    const payload = method === 'POST' ? JSON.stringify(body) : null;

    const action = this.reflector.get<string>('action', context.getHandler());

    const finalAction = action || 'CONSULTA API';

    return next.handle().pipe(
      tap(async (data) => {
        const endPointResponse = jsonc.stringify(data);
        const logData = {
          user_id: user ? user.userId : null,
          url: `${method} ${url}`,
          payload: payload,
          response: endPointResponse,
          action: finalAction,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await this.requestLogRepository.save(logData);
      }),
    );
  }
}
