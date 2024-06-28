import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('credit_log')
export class CreditLog {
  @PrimaryColumn()
  id: string;

  @Column()
  reference: string;

  @Column()
  num_client: number;

  @Column()
  month: string;

  @Column()
  date: string;

  @Column()
  completed_request: string;

  @Column()
  days: number;

  @Column()
  name: string;

  @Column()
  product: string;

  @Column()
  amount: number;

  @Column()
  analist: string;

  @Column()
  agency: string;

  @Column()
  decision: string;

  @Column()
  state_auraquantic: string;

  @Column()
  contract: string;

  constructor(partial: CreditLog) {
    Object.assign(this, partial);
  }
}
