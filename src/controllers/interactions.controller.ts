import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InteractionsService } from '../services/interactions.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/users.service';
import { SubordinatesService } from 'src/services/subordinate.service';
import { User } from 'src/entities/user.entity';
import { Action } from 'src/decorators/actions.decorator';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';

@ApiBearerAuth()
@ApiTags('Interactions service')
@Controller('interactions')
export class InteractionsController {
  constructor(
    private readonly interactionsService: InteractionsService,
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Action('CONSULTA A API INTERACCIONES')
  @HttpCode(HttpStatus.OK)
  @Post('/pqr_details')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get PQrs details by user id' })
  async getPqrDetailsTotal(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('codes') codes: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codesOfficers = JSON.stringify(codes);
    return await this.interactionsService.pqrDetailsMultiParam({
      page,
      limit,
      codes: btoa(codesOfficers),
    });
  }

  @UseInterceptors(CacheInterceptor)
  @Action('CONSULTA A API INTERACCIONES')
  @HttpCode(HttpStatus.OK)
  @Post('/pqr_grouped')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Pqr grouped by user id' })
  async getPqrGroupedTotal(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('codes') codes: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codesOfficers = JSON.stringify(codes);
    return await this.interactionsService.pqrGroupedMultiParam({
      page,
      limit,
      codes: btoa(codesOfficers),
    });
  }

  @UseInterceptors(CacheInterceptor)
  @Action('CONSULTA A API INTERACCIONES')
  @HttpCode(HttpStatus.OK)
  @Post('/grouped_information_header')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get grouped information header by user id' })
  async getGroupedInformationHeader(
    @Body('codes') codes: string[],
  ): Promise<any> {
    const codesOfficers = JSON.stringify(codes);
    return await this.interactionsService.groupedInformationHeaderMultiParam({
      codes: btoa(codesOfficers),
    });
  }

  @UseInterceptors(CacheInterceptor)
  @Action('CONSULTA A API INTERACCIONES')
  @HttpCode(HttpStatus.OK)
  @Post('/total_credits_requests')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get grouped information header by user id' })
  async getTotalCcreditsRequests(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('codes') codes: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const users = await this.userService.findUsersByCode(codes);
    const usersWithFilial = users.filter(
      (user: User) => user.filial_id !== null,
    );
    const filials = usersWithFilial.map((user: User) => user.filial.name);
    if (filials.length > 0) {
      return await this.interactionsService.totalCreditsRequests({
        filials,
        page,
        limit,
      });
    } else {
      return { data: [], pages: 0, total: 0 };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @Action('CONSULTA A API INTERACCIONES')
  @HttpCode(HttpStatus.OK)
  @Post('/total_credits_group_requests')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get grouped information header by user id' })
  async getTotalCcreditsGroupRequests(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('codes') codes: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const users = await this.userService.findUsersByCode(codes);
    const usersWithFilial = users.filter(
      (user: User) => user.filial_id !== null,
    );
    const filials = usersWithFilial.map((user: User) => user.filial.name);
    if (filials.length > 0) {
      return await this.interactionsService.totalCreditsGroupRequests({
        filials,
        page,
        limit,
      });
    } else {
      return { data: [], pages: 0, total: 0 };
    }
  }
}
