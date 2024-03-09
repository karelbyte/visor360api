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
  public updated_at: Date;

  @OneToOne(() => Rol)
  @JoinColumn({
    name: 'rol_id',
  })
  rol: Rol;

  @OneToMany(() => Subordinate, (subordinate) => subordinate.user)
  subordinates: Subordinate[];
  constructor(partial: User) {
    Object.assign(this, partial);
  }
}
