import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('credit_log')
export class CreditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  constructor(partial: CreditLog) {
    Object.assign(this, partial);
  }
}
