import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpOtpRequestService } from './httpOTP.service';
import { User } from '../entities/user.entity';
import { SoapService } from './soap.service';
import { totp } from 'otplib';
import { AppConfig } from '../config';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private http: HttpOtpRequestService,
    private soap: SoapService,
  ) {}

  async generateOtp() {
    totp.options = { digits: 6 };
    const token = totp.generate(AppConfig().optKey);
    return token;
  }

  async validateOtp(otp: string) {
    const isValid = totp.check(otp, AppConfig().optKey);
    return isValid;
  }
}
