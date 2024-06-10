import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_filials')
export class UserFilials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filial_id: string;

  @Column()
  user_id: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @ManyToOne(() => User, (user) => user.filial)
  @JoinColumn({ name: 'id' })
  user: User;

  constructor(partial: UserFilials) {
    Object.assign(this, partial);
  }
}
