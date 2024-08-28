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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Action } from 'src/decorators/actions.decorator';

@ApiBearerAuth()
@ApiTags('Visor360 service')
@Controller('visor360')
export class Visor360Controller {
  constructor(private readonly visor360Service: Visor360Service) { }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/clients')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all clients' })
  async getClients(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.searchClient({ page, limit, search });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/client_info/:search')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get client info' })
  async getClientInfo(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.clientInfo(search);
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/financial_information/:search')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get financial information' })
  async getFinancialInformation(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.financialInformation(search);
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/placements_position')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get placements position' })
  async getPlacementsPosition(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.placementsPosition({
      page,
      limit,
      search,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/catchments_position')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get catchment position' })
  async getCatchmentsPosition(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.catchmentsPosition({
      page,
      limit,
      search,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/cc_position')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get credit card position' })
  async getCCposition(@Query() params: IPaginateParams): Promise<any> {
    const { page, limit, search } = params;
    return await this.visor360Service.creditCardPosition({
      page,
      limit,
      search,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/pqr_by_client')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get PQRs by client code' })
  async getPqrByClient(
    @Query()
    params: {
      page: number;
      limit: number;
      num_client: string;
    },
  ): Promise<any> {
    const { page, limit, num_client } = params;
    return await this.visor360Service.pqrsByClientId({
      page,
      limit,
      num_client,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/legal-representative')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get legal representative by client code' })
  async getLegalRepresentative(
    @Query()
    params: {
      num_client: string;
    },
  ): Promise<any> {
    const { num_client } = params;
    return await this.visor360Service.legalRepresentativeByClientId({
      num_client,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/board-directors')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get board directors by client code' })
  async getBoardDirectors(
    @Query()
    params: {
      num_client: string;
    },
  ): Promise<any> {
    const { num_client } = params;
    return await this.visor360Service.boardDirectorsByClientId({
      num_client,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/stockholders')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get stockholders by client code' })
  async getStockholders(
    @Query()
    params: {
      num_client: string;
    },
  ): Promise<any> {
    const { num_client } = params;
    return await this.visor360Service.stockholdersByClientId({
      num_client,
    });
  }
  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/signatories')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get signatories by client code' })
  async getSignatories(
    @Query()
    params: {
      num_client: string;
    },
  ): Promise<any> {
    const { num_client } = params;
    return await this.visor360Service.signatoriesByClientId({
      num_client,
    });
  }

  @Action('CONSULTA A API VISOR - 360')
  @HttpCode(HttpStatus.OK)
  @Get('/beneficiaries')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get beneficiaries by client code' })
  async getBeneficiaries(
    @Query()
    params: {
      num_client: string;
    },
  ): Promise<any> {
    const { num_client } = params;
    return await this.visor360Service.beneficiariesByClientId({
      num_client,
    });
  }
}
