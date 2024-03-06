import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subordinate } from '../entities/subordinate.entity';
import { SubordinatesService } from '../services/subordinate.service';
import { SubordinateController } from '../controllers/subordinate.controller';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subordinate]), UsersModule],
  providers: [SubordinatesService],
  controllers: [SubordinateController],
  exports: [TypeOrmModule, SubordinatesService],
})
export class SubordinateModule {}
