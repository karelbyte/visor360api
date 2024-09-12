import { Module } from '@nestjs/common';
import { SigcController } from '../controllers/sigc.controller';
import { SigcService } from '../services/sigc.service';
import { UsersModule } from './users.module';
import { SubordinateModule } from './subordinate.module';
import { CodesService } from 'src/services/codes.services';

@Module({
  imports: [UsersModule, SubordinateModule],
  controllers: [SigcController],
  providers: [SigcService, CodesService],
  exports: [SigcService],
})
export class SigcModule {}
