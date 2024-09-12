import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpOtpRequestService } from './httpOTP.service';
import { User } from '../entities/user.entity';
import { SoapService } from './soap.service';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private http: HttpOtpRequestService,
    private soap: SoapService,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }
}
