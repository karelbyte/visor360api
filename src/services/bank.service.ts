import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../entities/bank.entity';
import { BankCreateDto, BankUpdateDto } from 'src/dtos/bank.dto';
@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) { }

  async getAll() {
    return await this.bankRepository.find({
      relations: {
        filials: true,
      },
    });
  }

  async create(bankData: BankCreateDto): Promise<Bank> {
    bankData['created_at'] = new Date();
    bankData['updated_at'] = new Date();
    const bank = await this.bankRepository.save(bankData);
    return await this.findOneById(bank.id);
    return bank;
  }

  async update(bankData: Partial<BankUpdateDto>): Promise<Bank> {
    bankData['updated_at'] = new Date();
    await this.bankRepository.update(bankData.id, bankData);
    return await this.findOneById(bankData.id);
  }

  async findOneById(bankId: string): Promise<Bank> {
    return await this.bankRepository.findOne({
      where: {
        id: bankId,
      },
      relations: {
        filials: true,
      },
    });
  }
}
