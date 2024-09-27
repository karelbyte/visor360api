import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

interface IOtpLogDto {
  id: string;
  userId: string;
  clientName: string;
  phone: string;
  service: string;
  otps: string;
  intent: number;
  status: string;
}

export class OtpLogCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otps: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  intent: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}
