import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IPaginateAndFilterParams, LogService } from 'src/services/log.service';
import { Log } from 'src/entities/log.entity';
import { Action } from 'src/decorators/actions.decorator';
import { UserDto } from 'src/dtos/user.dto';

@ApiBearerAuth()
@ApiTags('Log service')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Action('CONSULTA LISTA LOGS (API LOGGER)')
  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllLogs(
    @Query() params: IPaginateAndFilterParams,
  ): Promise<Log[] | any> {
    const { page, limit, fieldToFilter, term, dateStart, dateEnd, action } =
      params;
    const [result, total] = await this.logService.getAll({
      page,
      limit,
      fieldToFilter,
      term,
      dateStart,
      dateEnd,
      action,
    });

    const dataMap = result.map((log: any) => {
      if (log.user_id) {
        return { ...log, user: new UserDto(log.user) };
      } else return log;
    });
    return {
      data: dataMap,
      pages: Math.ceil(total / limit) || 1,
      count: total,
    };
  }
}
