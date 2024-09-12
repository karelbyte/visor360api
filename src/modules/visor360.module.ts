import { Module } from '@nestjs/common';
import { Visor360Controller } from '../controllers/visor360.controller';
import { Visor360Service } from '../services/visor360.service';
import { CodesService } from 'src/services/codes.services';
import { SubordinateModule } from './subordinate.module';
import { UsersModule } from './users.module';

@Module({
  imports: [SubordinateModule, UsersModule],
  controllers: [Visor360Controller],
  providers: [Visor360Service, CodesService],
  exports: [Visor360Service],
})
export class Visor360Module {}
