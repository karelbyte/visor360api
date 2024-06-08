import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Filial } from './filials.entity';

@Entity('banks')
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @OneToMany(() => Filial, (filial) => filial.bank)
  filials: Filial[];

  constructor(partial: Bank) {
    Object.assign(this, partial);
  }
}
