import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('filials')
export class UserFilials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filial_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.filial)
  @JoinColumn({ name: 'id' })
  user: User;

  constructor(partial: UserFilials) {
    Object.assign(this, partial);
  }
}
