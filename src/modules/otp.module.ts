import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../entities/rol.entity';
import { OtpService } from '../services/otp.service';
import { OtpController } from '../controllers/otp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
