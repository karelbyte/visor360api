import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InteractionsService } from '../services/interactions.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/users.service';
import { SubordinatesService } from 'src/services/subordinate.service';
import { User } from 'src/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Interactions service')
@Controller('interactions')
export class InteractionsController {
  constructor(
    private readonly interactionsService: InteractionsService,
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) { }

  async getCodes(ids: string[]): Promise<string[]> {
    let codes: string[] = [];
    for (const clientId of ids) {
      const user = await this.userService.findOneById(clientId);
      if (user.rol.code === 'commercial') {
        codes.push(user.code);
      } else {
        const subordinatesCodes =
          await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
        codes = codes.concat(subordinatesCodes);
      }
    }
    return codes;
  }
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
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.interactionsService.pqrDetailsMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }

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
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.interactionsService.pqrGroupedMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/grouped_information_header')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get grouped information header by user id' })
  async getGroupedInformationHeader(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.interactionsService.groupedInformationHeaderMultiParam({
      codes: btoa(params),
    });
  }

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
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
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
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
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
