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
      valNumeroTelefonoEmpresa: result.valNumeroTelefonoEmpresa,
    };
    return { response: btoa(jsonc.stringify(data)) };
  }

  @Action('CONSULTA A API OTP')
  @HttpCode(HttpStatus.OK)
  @Get('/send-otp')
  // @UseGuards(AuthGuard)
  async sendOtp(@Query('phone') phone: string) {
    const otp = await this.otpService.generateOtp();
    console.log(phone, otp);
    return { response: 'Otp enviado con exito!' };
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
