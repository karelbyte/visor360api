import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '../entities/bank.entity';
import { BankService } from '../services/bank.service';
import { BankController } from '../controllers/bank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
