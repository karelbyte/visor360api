import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp_logs')
export class OtpLog {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('nvarchar', { length: 250, nullable: false })
  clientName: string;

  @Column('nvarchar', { length: 25, nullable: false })
  phone: string;

  @Column('nvarchar', { length: 25, nullable: false })
  service: string;

  @Column('nvarchar', { length: 'max', nullable: false })
  otps: string;

  @Column('int', { nullable: false })
  intent: number;

  @Column('nvarchar', { length: 25, nullable: false })
  status: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
  constructor(partial: OtpLog) {
    Object.assign(this, partial);
  }
}
