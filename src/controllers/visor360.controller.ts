import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Visor360Service } from '../services/visor360.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('visor360')
export class Visor360Controller {
  constructor(private readonly visor360Service: Visor360Service) {}

  @HttpCode(HttpStatus.OK)
  @Get('/client_info/:search')
  @UseGuards(AuthGuard)
  async getClientInfo(@Param('search') search: string): Promise<any> {
    return await this.visor360Service.ClientInfo(search);
  }
}
