import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubordinateCreateDto {
  @IsString()
  @IsOptional()
  boss_id: string;

  @IsNotEmpty()
  user_id: string;
}

export class SubordinateUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  boss_id: string;

  @IsNotEmpty()
  user_id: string;
}

interface ISubordinateDto {
  id: number;
  user_id: string;
  boss_id: string;
  created_at: Date;
  updated_at: Date;
}
export class SubordinateDto {
  id: number;
  user_id: string;
  boss_id: string;
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
