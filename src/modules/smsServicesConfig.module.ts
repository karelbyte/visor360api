import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsServiceConfigController } from 'src/controllers/sms-services-config.controller';
import { SmsService } from 'src/entities/sms_service.entity';
import { SmsServiceConfigService } from 'src/services/sms-service-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([SmsService])],
  controllers: [SmsServiceConfigController],
  providers: [SmsServiceConfigService],
  exports: [SmsServiceConfigService],
})
export class SmsServicesConfigModule {}
