import { Module } from '@nestjs/common';
import { InteractionsController } from '../controllers/interactions.controller';
import { InteractionsService } from '../services/interactions.service';
import { UsersModule } from './users.module';
import { SubordinateModule } from './subordinate.module';

@Module({
  imports: [UsersModule, SubordinateModule],
  controllers: [InteractionsController],
  providers: [InteractionsService],
  exports: [InteractionsService],
})
export class InteractionsModule {}
