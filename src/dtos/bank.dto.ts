import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilialDto } from './filial.dto';

export class BankCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class BankUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

interface IBankDto {
  id: string;
  name: string;
  filials: FilialDto[];
  created_at: Date;
  updated_at: Date;
}
export class BankDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  filials: FilialDto[];
  created_at: Date;
  updated_at: Date;
  constructor({ id, name, filials, created_at, updated_at }: IBankDto) {
    this.id = id;
    this.name = name;
    this.filials = filials;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
