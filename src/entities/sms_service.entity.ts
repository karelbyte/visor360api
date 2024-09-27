import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_services')
export class SmsService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  national: number;

  @Column()
  international: number;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
  constructor(partial: SmsService) {
    Object.assign(this, partial);
  }
}
