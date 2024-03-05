import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subordinate } from '../entities/subordinate.entity';
import { SubordinatesService } from '../services/subordinate.service';
import { SubordinateController } from '../controllers/subordinate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subordinate])],
  providers: [SubordinatesService],
  controllers: [SubordinateController],
  exports: [TypeOrmModule, SubordinatesService],
})
export class SubordinateModule {}
