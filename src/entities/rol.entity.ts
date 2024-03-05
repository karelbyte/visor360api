import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rols')
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  description: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
  constructor(partial: Rol) {
    Object.assign(this, partial);
  }
}
