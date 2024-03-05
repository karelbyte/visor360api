import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subordinates')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  boss_id: string;

  @Column()
  subordinate_id: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
  constructor(partial: User) {
    Object.assign(this, partial);
  }
}
