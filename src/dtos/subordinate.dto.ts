import { IsNotEmpty, IsString } from 'class-validator';

export class SubordinateCreateDto {
  @IsNotEmpty()
  boss_id: string;

  @IsNotEmpty()
  user_id: string;
}

export class SubordinateUpdateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  boss_id: string;

  @IsNotEmpty()
  user_id: string;
}

interface ISubordinateDto {
  id: string;
  boss_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
export class SubordinateDto {
  id: string;
  boss_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    user_id,
    boss_id,
    created_at,
    updated_at,
  }: ISubordinateDto) {
    this.id = id;
    this.user_id = user_id;
    this.boss_id = boss_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
