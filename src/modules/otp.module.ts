import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { OtpService } from '../services/otp.service';
import { OtpController } from '../controllers/otp.controller';
import { SoapService } from 'src/services/soap.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [OtpController],
  providers: [OtpService, SoapService],
  exports: [OtpService, SoapService],
})
export class OtpModule {}
