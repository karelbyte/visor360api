import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('subordinates')
export class Subordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boss_id: string;

  @Column()
  user_id: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @ManyToOne(() => User, (user) => user.subordinates)
  @JoinColumn({ name: 'user_id' })
  user: User;
  constructor(partial: Subordinate) {
    Object.assign(this, partial);
  }
}
