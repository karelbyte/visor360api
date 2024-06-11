import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Bank } from './bank.entity';
import { UserFilials } from './userfilials.entity';

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
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @OneToOne(() => UserFilials, (userFilial) => userFilial.filial)
  userFilial: UserFilials;

  constructor(partial: Filial) {
    Object.assign(this, partial);
  }
}
