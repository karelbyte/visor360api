import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpOtpRequestService } from './httpOTP.service';
import { User } from '../entities/user.entity';
import { authenticator } from 'otplib';
import { AppConfig } from '../config';
import { HttpService } from '@nestjs/axios';
import { SmsServiceConfigService } from './sms-service-config.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(User)
    private http: HttpOtpRequestService,
    private readonly httpService: HttpService,
    private readonly SmsService: SmsServiceConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    authenticator.options = { digits: 6, window: 30 };
  }

  async generateOtp() {
    const token = authenticator.generate(AppConfig().optKey);
    const expirationTime = Date.now() + 5 * 60 * 1000;
    await this.cacheManager.set(token, expirationTime, 6 * 60 * 1000);
    return token;
  }

  async validateOtp(otp: string) {
    const expirationTime = (await this.cacheManager.get(otp)) as number;
    if (!expirationTime) return false;
    const now = Date.now();
    console.log(
      now,
      expirationTime,
      expirationTime - now,
      now < expirationTime,
    );
    return now < expirationTime;
  }

  async sendSMS(lada: string, otp: string, phone: string, name: string) {
    const { national, international } =
      await this.SmsService.getSmsServicesConfig();
    let response: any;
    if (lada == '507') {
      switch (national) {
        case 1:
          response = await this.sendNationalOtp(otp, phone, name);
          break;
        case 2:
          response = await this.sendInternationalNationalOtp(otp, phone, name);
          break;
      }
      return response;
    }

    switch (international) {
      case 2:
        response = await this.sendInternationalNationalOtp(otp, phone, name);
        break;
    }
    return response;
  }
  async sendNationalOtp(otp: string, phone: string, name: string) {
    const response = await this.http.request(
      'get',
      AppConfig().sendSmsLocalUrl,
      {
        usr: 'davivienda1',
        pass: 'banco@123',
        sc: 1587,
        tipo: 0,
        dest: phone,
        texto: `Estimado ${name} le entragamos su código único de validación. ${otp}`,
        op: otp,
      },
    );
    return response;
  }

  async sendInternationalNationalOtp(otp: string, phone: string, name: string) {
    const url =
      'https://hub-transaccional.masivapp.com/api/hub-transaccional-model/flow/init-from-api';
    const credentials = {
      username: 'Davivienda_Panama_UWVTJ',
      password: 'n.@iU0g9Gd',
    };

    const data = {
      flowId: '637f80beeeb0d100105ee147',
      dataToReplace: [
        {
          numero: phone,
          codigoOTP: otp,
          mensaje: `Para completar su registro ingrese el siguiente codigo de autenticacion: ${otp} Si no reconoce esta solicitud, contactenos al 366-6565`,
        },
      ],
    };
    console.log(data);
    try {
      const response = await this.httpService.axiosRef.post(url, data, {
        auth: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('el response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }
}
