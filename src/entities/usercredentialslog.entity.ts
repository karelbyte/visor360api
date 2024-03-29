import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('users_credential_log')
export class UserCredentialsLog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @ManyToOne(() => User, (user) => user.log)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
  constructor(partial: UserCredentialsLog) {
    Object.assign(this, partial);
  }
}
