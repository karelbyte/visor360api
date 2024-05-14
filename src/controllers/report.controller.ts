import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { Report } from '../entities/report.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Reports service')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportlService: ReportService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllReports(): Promise<Report | any> {
    return await this.reportlService.getAll();
  }
}
