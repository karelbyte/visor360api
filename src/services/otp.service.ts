import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpOtpRequestService } from './httpOTP.service';
import { User } from '../entities/user.entity';
import { authenticator } from 'otplib';
import { AppConfig } from '../config';
import * as soap from 'soap';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OtpService {
  private client: any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private http: HttpOtpRequestService,
    private readonly httpService: HttpService,
  ) {}

  async generateOtp() {
    authenticator.options = { digits: 6 };
    const token = authenticator.generate(AppConfig().optKey);
    return token;
  }

  async validateOtp(otp: string) {
    const isValid = authenticator.check(otp, AppConfig().optKey);
    return isValid;
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
          mensaje: `Estimado ${name} le entragamos su código único de validación. ${otp}`,
        },
      ],
    };

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
