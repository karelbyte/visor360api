import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { ReportService } from '../services/report.service';
import { ReportController } from '../controllers/report.controller';
import { SubordinateModule } from './subordinate.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), SubordinateModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
