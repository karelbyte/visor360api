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
import { OtpService } from '../services/otp.service';
import { Rol } from '../entities/rol.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Action } from 'src/decorators/actions.decorator';
import { SoapService } from 'src/services/soap.service';
import { jsonc } from 'jsonc';

@ApiBearerAuth()
@ApiTags('OTP service')
@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly soapService: SoapService,
  ) {}

  @Action('CONSULTA A API OTP')
  @HttpCode(HttpStatus.OK)
  @Get('/datos-personales')
  // @UseGuards(AuthGuard)
  async getDatosPersonales(
    @Query('valNumeroIdentificacion') valNumeroIdentificacion: string,
    @Query('userId') userId: string,
  ) {
    const result = await this.soapService.getDatosPersonalesCliente({
      type: 'CED',
      valNumeroIdentificacion,
    });
    const data = {
      valPrimerNombre: result.valPrimerNombre,
      valSegundoNombre: result.valSegundoNombre,
      valPrimerApellido: result.valPrimerApellido,
      valSegundoApellido: result.valSegundoApellido,
      valDireccionResidencia: result.valDireccionResidencia,
      valNumeroTelefono: result.valNumeroTelefono,
      valNumeroTelefonoEmpresa: result.valNumeroTelefonoEmpresa,
    };
    return { response: btoa(jsonc.stringify(data)) };
  }

  @Action('CONSULTA A API OTP')
  @HttpCode(HttpStatus.OK)
  @Post('/send-otp')
  async sendOtp(@Body() props: any) {
    console.log(props);
  }
}
