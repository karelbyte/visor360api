import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsService } from 'src/entities/sms_service.entity';
import { SmsServiceUpdateDto } from 'src/dtos/sms-service.dto';
@Injectable()
export class SmsServiceConfigService {
  constructor(
    @InjectRepository(SmsService)
    private smsRepository: Repository<SmsService>,
  ) { }

  async getAll() {
    return await this.smsRepository.find();
  }

  async getSmsServicesConfig() {
    const config = await this.smsRepository.find();
    if (config.length > 0) {
      return {
        national: config[0].national,
        international: config[0].international,
      };
    } else {
      return {
        national: 1,
        international: 2,
      };
    }
  }

  async create(serviceData: Partial<SmsServiceUpdateDto>): Promise<SmsService> {
    const rows = await this.smsRepository.count();

    if (rows === 0) {
      serviceData['created_at'] = new Date();
      serviceData['updated_at'] = new Date();
      return await this.smsRepository.save(serviceData);
    } else {
      const firstUser = await this.smsRepository.find({
        take: 1,
      });
      firstUser[0].national = serviceData.national;
      firstUser[0].international = serviceData.international;
      return await this.smsRepository.save(firstUser[0]);
    }
  }
}
