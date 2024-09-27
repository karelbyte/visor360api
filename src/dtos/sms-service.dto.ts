import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

interface ISmsServiceDto {
  id: string;
  national: number;
  international: number;
}

export class SmsServiceUpdateDto {
  @ApiProperty()
  @IsNumber()
  national: number;
  @ApiProperty()
  @IsNumber()
  international: number;
}

export class SmsServiceDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsNumber()
  national: number;
  @ApiProperty()
  @IsNumber()
  international: number;
  constructor({ id, national, international }: ISmsServiceDto) {
    this.id = id;
    this.national = national;
    this.international = international;
  }
}
