import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsUserAlreadyExist } from '../decorators/IsUserAlreadyExist';
import { RolDto } from './rol.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserFilials } from 'src/entities/userfilials.entity';

export class UserChangePasswordDto {
  @ApiProperty()
  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  email: string;
}
export class UserResetPassword {
  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class UserLoginDto {
  @ApiProperty()
  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'No se proporciono una contraseña!',
  })
  password: string;
}

export class UpdateUserFilialDto {
  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsString()
  filial_id: string;
}
export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  names: string;

  @ApiProperty()
  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  @IsUserAlreadyExist(undefined, {
    message: 'Existe un usurio con este email.',
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  filial: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  rol_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_staff: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  boss_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  can_download_xlsx: boolean;
}

export class UserUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  code: string;

  @ApiProperty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  names: string;

  @ApiProperty()
  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  @IsUserAlreadyExist('id', {
    message: 'Existe un usurio con este email.',
  })
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  rol_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_staff: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  boss_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  token: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  logins: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  can_download_xlsx: boolean;
}

interface IUserDto {
  id: string;
  code: string;
  username: string;
  names: string;
  email: string;
  rol_id: string;
  is_active: boolean;
  is_staff: boolean;
  boss_id: string;
  rol: RolDto;
  filial: UserFilials;
  leaders: UserDto[];
  logins: number;
  created_at: Date;
  updated_at: Date;
  can_download_xlsx: boolean;
}
export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  code: string;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  names: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  rol_id: string;
  @ApiProperty()
  @IsBoolean()
  is_active: boolean;
  @ApiProperty()
  @IsBoolean()
  is_staff: boolean;
  @IsBoolean()
  can_download_xlsx: boolean;
  @ApiProperty()
  @IsString()
  boss_id: string;
  rol: RolDto;
  filial: UserFilials;
  leaders: UserDto[];
  logins: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    code,
    username,
    names,
    email,
    rol_id,
    is_active,
    is_staff,
    boss_id,
    rol,
    filial,
    leaders,
    logins,
    can_download_xlsx,
    created_at,
    updated_at,
  }: IUserDto) {
    this.id = id;
    this.code = code;
    this.username = username;
    this.names = names;
    this.email = email;
    this.rol_id = rol_id;
    this.is_active = is_active;
    this.is_staff = is_staff;
    this.boss_id = boss_id;
    this.rol = rol;
    this.filial = filial;
    this.leaders = leaders;
    this.logins = logins;
    this.can_download_xlsx = can_download_xlsx;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export interface UserLogedDto extends UserDto {
  token: string;
  leaders: UserDto[];
}
