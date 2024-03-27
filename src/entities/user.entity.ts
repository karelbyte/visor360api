import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  AfterInsert,
} from 'typeorm';
import { Subordinate } from './subordinate.entity';
import { Rol } from './rol.entity';
import { UserCredentialsLog } from './usercredentialslog.entity';

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

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  token: string;

  @Column()
  logins: number;

  @Column()
  public updated_at: Date;

  @OneToMany(() => UserCredentialsLog, (log) => log.user)
  log: UserCredentialsLog[];

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

  @OneToMany(() => Subordinate, (subordinate) => subordinate.user)
  subordinates: Subordinate[];

/*  @AfterInsert()
  async createLog() {
    const log = new UserCredentialsLog({
      user_id: this.id,
      password: this.password,
    });

    await log.save();
  }*/
  constructor(partial: User) {
    Object.assign(this, partial);
  }
}
