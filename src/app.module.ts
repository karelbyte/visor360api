import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

import { AppConfig, DatabaseConfig, RedisConfig } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { GlobalHttpModule } from './modules/http.module';
import { SubordinateModule } from './modules/subordinate.module';
import { Visor360Module } from './modules/visor360.module';
import { RolModule } from './modules/rol.module';
import { SigcModule } from './modules/sigc.module';
import { AppMailerModule } from './modules/mailer.module';
import { ReportModule } from './modules/report.module';
import { InteractionsModule } from './modules/interactions.module';
import { BankModule } from './modules/bank.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { Log } from './entities/log.entity';
import { LogModule } from './modules/log.module';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { Subordinate } from './entities/subordinate.entity';
import { OtpModule } from './modules/otp.module';
import { User } from './entities/user.entity';
import { CodesService } from './services/codes.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig, RedisConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { host, port } = configService.get('redis');
        return {
          store: redisStore,
          socket: {
            host,
            port,
          },
          ttl: 25 * 24 * 60 * 60 * 1000,
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Log, Subordinate, User]),
    AppMailerModule,
    UsersModule,
    Visor360Module,
    SigcModule,
    AuthModule,
    RolModule,
    SubordinateModule,
    GlobalHttpModule,
    ReportModule,
    InteractionsModule,
    BankModule,
    LogModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CodesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
