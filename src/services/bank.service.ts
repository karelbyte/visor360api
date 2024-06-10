import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../entities/bank.entity';
import { BankCreateDto, BankUpdateDto } from 'src/dtos/bank.dto';
import { Filial } from 'src/entities/filials.entity';
import { FilialCreateDto, FilialUpdateDto } from 'src/dtos/filial.dto';
@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    @InjectRepository(Filial)
    private filialsRepository: Repository<Filial>,
  ) { }

  async getAll(): Promise<Bank[]> {
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

  async getAllFilials(): Promise<Filial[]> {
    return await this.filialsRepository.find();
  }

  async getAllFiliasByBankId(bankId: string): Promise<Filial[]> {
    return await this.filialsRepository.find({
      where: {
        bank_id: bankId,
      },
    });
  }

  async createFilial(filialData: FilialCreateDto): Promise<Filial> {
    filialData['created_at'] = new Date();
    filialData['updated_at'] = new Date();
    const filial = await this.filialsRepository.save(filialData);
    return await this.findFilialOneById(filial.id);
  }

  async updateFilial(filialData: Partial<FilialUpdateDto>): Promise<Filial> {
    filialData['updated_at'] = new Date();
    await this.filialsRepository.update(filialData.id, filialData);
    return await this.findFilialOneById(filialData.id);
  }

  async findFilialOneById(filialId: string): Promise<Filial> {
    return await this.filialsRepository.findOne({
      where: {
        id: filialId,
      },
    });
  }
}
