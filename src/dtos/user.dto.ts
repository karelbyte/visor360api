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
  rol_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_staff: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  boss_id: string;
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
  leader: UserDto;
  logins: number;
  created_at: Date;
  updated_at: Date;
}
export class UserDto {
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
  leader: UserDto;
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
    leader,
    logins,
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
    this.leader = leader;
    this.logins = logins;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export interface UserLogedDto extends UserDto {
  token: string;
  leader: UserDto;
}
