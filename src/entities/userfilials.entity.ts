import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Filial } from './filials.entity';

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

  @OneToOne(() => User, (user) => user.filial)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Filial, (filial) => filial.userFilial)
  @JoinColumn({ name: 'filial_id' })
  filial: Filial;

  constructor(partial: UserFilials) {
    Object.assign(this, partial);
  }
}
