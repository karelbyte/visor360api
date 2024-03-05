import { IsNotEmpty, IsString } from 'class-validator';

export class SubordinateCreateDto {
  @IsNotEmpty()
  boss_id: string;

  @IsNotEmpty()
  subordinate_id: string;
}

export class SubordinateUpdateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  boss_id: string;

  @IsNotEmpty()
  subordinate_id: string;
}

interface ISubordinateDto {
  id: string;
  boss_id: string;
  subordinate_id: string;
  created_at: Date;
  updated_at: Date;
}
export class SubordinateDto {
  id: string;
  boss_id: string;
  subordinate_id: string;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    subordinate_id,
    boss_id,
    created_at,
    updated_at,
  }: ISubordinateDto) {
    this.id = id;
    this.subordinate_id = subordinate_id;
    this.boss_id = boss_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
