import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface IRolDto {
  id: string;
  code: string;
  description: string;
}
export class RolDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  code: string;
  @ApiProperty()
  @IsString()
  description: string;
  constructor({ id, code, description }: IRolDto) {
    this.id = id;
    this.code = code;
    this.description = description;
  }
}
