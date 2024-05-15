import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Report } from './report.entity';

@Entity('report_fields')
export class ReportField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  report_id: string;

  @Column()
  name: string;

  @Column()
  field_name: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @ManyToOne(() => Report, (report) => report.fields)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  constructor(partial: ReportField) {
    Object.assign(this, partial);
  }
}
