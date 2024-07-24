import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogService } from 'src/services/log.service';
import { Log } from 'src/entities/log.entity';
import { Action } from 'src/decorators/actions.decorator';

@ApiBearerAuth()
@ApiTags('Log service')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Action('CONSULTA LISTA LOGS (API LOGGER)')
  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllLogs(): Promise<Log[] | any> {
    return await this.logService.getAll();
  }
}
