import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@ApiBearerAuth()
@ApiTags('Bank service')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllRols(): Promise<BankDto | any> {
    return await this.bankService.getAll();
  }

  @ApiOperation({ summary: 'Create bank' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: BankDto })
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async createBank(@Body() createBankDto: BankCreateDto): Promise<BankDto> {
    const bank = await this.bankService.create(createBankDto);
    console.log(bank);
    return new BankDto(bank);
  }

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
}
