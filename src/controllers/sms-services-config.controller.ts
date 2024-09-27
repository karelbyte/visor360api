import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Action } from 'src/decorators/actions.decorator';
import { SmsService } from 'src/entities/sms_service.entity';
import { SmsServiceConfigService } from 'src/services/sms-service-config.service';
import { SmsServiceUpdateDto } from 'src/dtos/sms-service.dto';

@ApiBearerAuth()
@ApiTags('SmsServiceConfigController service')
@Controller('sms-services-config')
export class SmsServiceConfigController {
  constructor(private readonly smsService: SmsServiceConfigService) { }

  @Action('CONSULTA A CONFIGURACION DE SERVICIOS SMS')
  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllServices(): Promise<SmsService | any> {
    return await this.smsService.getAll();
  }

  @Action('CONSULTA A CONFIGURACION DE SERVICIOS SMS')
  @HttpCode(HttpStatus.OK)
  @Post('/')
  @UseGuards(AuthGuard)
  async storeSmSServices(
    @Body() smsData: SmsServiceUpdateDto,
  ): Promise<SmsService | any> {
    return await this.smsService.create(smsData);
  }
}
