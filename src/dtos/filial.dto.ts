import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilialCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  bank_id: string;
}

export class FilialUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

interface IFilialDto {
  id: string;
  name: string;
  bank_id: string;
  created_at: Date;
  updated_at: Date;
}
export class FilialDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  bank_id: string;
  created_at: Date;
  updated_at: Date;
  constructor({ id, name, bank_id, created_at, updated_at }: IFilialDto) {
    this.id = id;
    this.name = name;
    this.bank_id = bank_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
