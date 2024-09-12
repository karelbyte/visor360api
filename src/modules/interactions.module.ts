import { Module } from '@nestjs/common';
import { InteractionsController } from '../controllers/interactions.controller';
import { InteractionsService } from '../services/interactions.service';
import { UsersModule } from './users.module';
import { SubordinateModule } from './subordinate.module';
import { CreditLog } from 'src/entities/creditlog.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CodesService } from 'src/services/codes.services';

@Module({
  imports: [
    UsersModule,
    SubordinateModule,
    TypeOrmModule.forFeature([CreditLog]),
  ],
  controllers: [InteractionsController],
  providers: [InteractionsService, CodesService],
  exports: [InteractionsService],
})
export class InteractionsModule {}
