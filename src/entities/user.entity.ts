import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Subordinate } from './subordinate.entity';
import { Rol } from './rol.entity';
import { UserCredentialsLog } from './usercredentialslog.entity';
import { Bank } from './bank.entity';
import { Filial } from './filials.entity';
import { Log } from './log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  code: string;

  @Column()
  names: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  rol_id: string;

  @Column()
  is_staff: boolean;

  @Column()
  is_active: boolean;

  @Column()
  boss_id: string;

  @Column()
  bank_id: string;

  @Column()
  filial_id: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  token: string;

  @Column()
  logins: number;

  @Column()
  public updated_at: Date;

  @Column()
  can_download_xlsx: boolean;

  @OneToMany(() => UserCredentialsLog, (log) => log.user)
  log: UserCredentialsLog[];

  @OneToMany(() => Log, (log) => log.user)
  actions: Log[];

  @OneToOne(() => Bank)
  @JoinColumn({
    name: 'bank_id',
  })
  bank: Bank;

  @OneToOne(() => Filial)
  @JoinColumn({
    name: 'filial_id',
  })
  filial: Filial;

  @OneToOne(() => Rol)
  @JoinColumn({
    name: 'rol_id',
  })
  rol: Rol;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'boss_id',
  })
  leader: User;

  @OneToOne(() => Subordinate, (subordinate) => subordinate.boss_id)
  boss: User;

  @OneToMany(() => Subordinate, (subordinate) => subordinate.user)
  leaders: User[];

  @OneToMany(() => Subordinate, (subordinate) => subordinate.user)
  subordinates: Subordinate[];

  constructor(partial: User) {
    Object.assign(this, partial);
  }
}
