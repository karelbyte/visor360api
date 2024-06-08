import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Bank } from './bank.entity';

@Entity('filials')
export class Filial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  bank_id: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @ManyToOne(() => Bank, (bank) => bank.filials)
  @JoinColumn({ name: 'id' })
  bank: Bank;

  constructor(partial: Filial) {
    Object.assign(this, partial);
  }
}
