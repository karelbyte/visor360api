import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReportField } from './reportfield.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @OneToMany(() => ReportField, (field) => field.report)
  fields: ReportField[];

  constructor(partial: Report) {
    Object.assign(this, partial);
  }
}
