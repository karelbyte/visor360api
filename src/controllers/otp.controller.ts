import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OtpService } from '../services/otp.service';

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
    @Query('type') type: string,
  ) {
    const result = await this.soapService.getDatosPersonalesCliente({
      type: type,
      valNumeroIdentificacion,
    });
    const data = {
      valPrimerNombre: result.valPrimerNombre,
      valSegundoNombre: result.valSegundoNombre,
      valPrimerApellido: result.valPrimerApellido,
      valSegundoApellido: result.valSegundoApellido,
      valDireccionResidencia: result.valDireccionResidencia,
      valNumeroTelefono: result.valNumeroTelefono,
      valCelular: result.valCelular,
      valCodigoPaisTelefonoEmpresa: result.valCodigoPaisTelefonoEmpresa,
    };
    return { response: btoa(jsonc.stringify(data)) };
  }

  @Action('CONSULTA A API OTP')
  @HttpCode(HttpStatus.OK)
  @Get('/send-otp')
  // @UseGuards(AuthGuard)
  async sendOtp(
    @Query('lada') lada: string,
    @Query('phone') phone: string,
    @Query('name') name: string,
  ) {
    const otp = await this.otpService.generateOtp();
    try {
      console.log(otp);
      // await this.otpService.sendSMS(lada, otp, phone, name);
      return { message: 'Otp enviado con exito!' };
    } catch (e) {
      return { message: e.response };
    }
  }

  @Action('CONSULTA A API OTP')
  @HttpCode(HttpStatus.OK)
  @Get('/validate-otp')
  // @UseGuards(AuthGuard)
  async validateOtp(@Query('otp') otp: string) {
    const isValidOtp = await this.otpService.validateOtp(otp);
    return { isValidOtp: isValidOtp };
  }
}
