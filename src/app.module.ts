import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

import { AppConfig, DatabaseConfig } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { GlobalHttpModule } from './modules/http.module';
import { SubordinateModule } from './modules/subordinate.module';
import { Visor360Module } from './modules/visor360.module';
import { RolModule } from './modules/rol.module';
import { SigcModule } from './modules/sigc.module';
import { MailerModule as ManagerMails } from './modules/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    ManagerMails,
    UsersModule,
    Visor360Module,
    SigcModule,
    AuthModule,
    RolModule,
    SubordinateModule,
    GlobalHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
