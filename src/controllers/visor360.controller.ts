import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IPaginateParams, Visor360Service } from '../services/visor360.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Visor360 service')
@Controller('visor360')
export class Visor360Controller {
  constructor(private readonly visor360Service: Visor360Service) { }

  @HttpCode(HttpStatus.OK)
  @Get('/clients')
  @UseGuards(AuthGuard)
  async getClients(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.searchClient({ page, limit, search });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/client_info/:search')
  @UseGuards(AuthGuard)
  async getClientInfo(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.clientInfo(search);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/financial_information/:search')
  @UseGuards(AuthGuard)
  async getFinancialInformation(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.financialInformation(search);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/placements_position')
  @UseGuards(AuthGuard)
  async getPlacementsPosition(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.placementsPosition({
      page,
      limit,
      search,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/catchments_position')
  @UseGuards(AuthGuard)
  async getCatchmentsPosition(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.catchmentsPosition({
      page,
      limit,
      search,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/cc_position')
  @UseGuards(AuthGuard)
  async getCCposition(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.ccPosition({
      page,
      limit,
      search,
    });
  }
  @HttpCode(HttpStatus.OK)
  @Get('/consolidate_position/:search')
  @UseGuards(AuthGuard)
  async getConsolidatePosition(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.consolidatePosition(search);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/pqr_petition_single_param/:search')
  @UseGuards(AuthGuard)
  async getPqrPetitionSingleParam(
    @Param('search') search: string,
  ): Promise<any> {
    return await this.visor360Service.pqrPetitionSingleParam(search);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/pqr_claim_single_param/:search')
  @UseGuards(AuthGuard)
  async getPqrClaimSingleParam(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.pqrClaimSingleParam(search);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/pqr_complaint_single_param/:search')
  @UseGuards(AuthGuard)
  async getPqrComplaintSingleParam(
    @Param('search') search: string,
  ): Promise<any> {
    return await this.visor360Service.pqrComplaintSingleParam(search);
  }
}
