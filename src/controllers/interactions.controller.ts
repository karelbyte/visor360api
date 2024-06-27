import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InteractionsService } from '../services/interactions.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/users.service';
import { SubordinatesService } from 'src/services/subordinate.service';
import { User } from 'src/entities/user.entity';
import { CreditLog } from 'src/entities/creditlog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ApiBearerAuth()
@ApiTags('Interactions service')
@Controller('interactions')
export class InteractionsController {
  constructor(
    private readonly interactionsService: InteractionsService,
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/pqr_details')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get PQrs details by user id' })
  async getPqrDetailsTotal(
    @Query()
    params: {
      page: number;
      limit: number;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.interactionsService.pqrDetailsSingleParam({
        page,
        limit,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.interactionsService.pqrDetailsMultiParam({
        page,
        limit,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/pqr_grouped')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Pqr grouped by user id' })
  async getPqrGroupedTotal(
    @Query()
    params: {
      page: number;
      limit: number;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.interactionsService.pqrGroupedSingleParam({
        page,
        limit,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.interactionsService.pqrGroupedMultiParam({
        page,
        limit,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/grouped_information_header')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get grouped information header by user id' })
  async getGroupedInformationHeader(
    @Query()
    params: {
      id: string;
    },
  ): Promise<any> {
    const { id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.interactionsService.groupedInformationHeaderSingleParam(
        {
          codes: btoa(user.code),
        },
      );
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.interactionsService.groupedInformationHeaderMultiParam({
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/total_credits_requests')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get grouped information header by user id' })
  async getTotalCcreditsRequests(
    @Query()
    params: {
      page: number;
      limit: number;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.interactionsService.totalCreditsRequests({
        filials: [user.filial_id],
        page,
        limit,
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const users = await this.userService.findUsersByCode(subordinatesCodes);
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
  }
}
