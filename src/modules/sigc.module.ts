import { Module } from '@nestjs/common';
import { SigcController } from '../controllers/sigc.controller';
import { SigcService } from '../services/sigc.service';
import { UsersModule } from './users.module';
import { SubordinateModule } from './subordinate.module';

@Module({
  imports: [UsersModule, SubordinateModule],
  controllers: [SigcController],
  providers: [SigcService],
  exports: [SigcService],
})
export class SigcModule {}