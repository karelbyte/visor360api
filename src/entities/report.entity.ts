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
} from 'typeorm';

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

  constructor(partial: Report) {
    Object.assign(this, partial);
  }
}
