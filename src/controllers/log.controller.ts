import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Rol } from '../entities/rol.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogService } from 'src/services/log.service';
import { Log } from 'src/entities/log.entity';

@ApiBearerAuth()
@ApiTags('Log service')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllLogs(): Promise<Log[] | any> {
    return await this.logService.getAll();
  }
}
