import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  action: string;

  @Column()
  payload: string;

  @Column()
  public created_at: Date;

  @ManyToOne(() => User, (user) => user.actions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  public updated_at: Date;
  constructor(partial: Log) {
    Object.assign(this, partial);
  }
}
