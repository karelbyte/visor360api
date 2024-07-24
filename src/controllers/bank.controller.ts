import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BankService } from '../services/bank.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BankCreateDto, BankDto, BankUpdateDto } from 'src/dtos/bank.dto';
import {
  FilialCreateDto,
  FilialDto,
  FilialUpdateDto,
} from 'src/dtos/filial.dto';
import { Action } from 'src/decorators/actions.decorator';

@ApiBearerAuth()
@ApiTags('Bank service')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) { }
  @Action('CONSULTA LISTA BANCOS (API BANCA)')
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllBanks(): Promise<BankDto | any> {
    return await this.bankService.getAll();
  }

  @Action('CREAR BANCO (API BANCA)')
  @ApiOperation({ summary: 'Create bank' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: BankDto })
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async createBank(@Body() createBankDto: BankCreateDto): Promise<BankDto> {
    const bank = await this.bankService.create(createBankDto);
    return new BankDto(bank);
  }

  @Action('ACTUALIZAR BANCO (API BANCA)')
  @ApiOperation({ summary: 'Update bank' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: BankDto })
  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateUser(@Body() updateBankDto: BankUpdateDto): Promise<BankDto> {
    const bank = await this.bankService.update(updateBankDto);
    return new BankDto(bank);
  }

  @Action('CONSULTA LISTA FILIALES (API BANCA)')
  @HttpCode(HttpStatus.OK)
  @Get('/filials-all')
  @UseGuards(AuthGuard)
  async getAllFilials(): Promise<FilialDto | any> {
    return await this.bankService.getAllFilials();
  }

  @Action('CREAR FILIAL (API BANCA)')
  @ApiOperation({ summary: 'Create filial for bank' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: BankDto })
  @Post('/filials')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async createFilial(
    @Body() createFilialDto: FilialCreateDto,
  ): Promise<FilialDto> {
    const filial = await this.bankService.createFilial(createFilialDto);
    return new FilialDto(filial);
  }

  @Action('ACTUALIZAR FILIAL (API BANCA)')
  @ApiOperation({ summary: 'Update filial for bank' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: BankDto })
  @Put('/filials')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateFilial(
    @Body() updateFilialDto: FilialUpdateDto,
  ): Promise<FilialDto> {
    const filial = await this.bankService.updateFilial(updateFilialDto);
    return new FilialDto(filial);
  }

  @Action('ELIMINAR FILIAL (API BANCA)')
  @HttpCode(HttpStatus.OK)
  @Get('/filials/:id')
  @UseGuards(AuthGuard)
  async getAllFilialsByBankId(
    @Param('id') id: string,
  ): Promise<FilialDto | any> {
    return await this.bankService.getAllFiliasByBankId(id);
  }
}
