import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsUserAlreadyExist } from '../decorators/IsUserAlreadyExist';

export class UserLoginDto {
  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  email: string;
  @IsNotEmpty({
    message: 'No se proporciono una contraseña!',
  })
  password: string;
}
export class UserCreateDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  names: string;

  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  @IsUserAlreadyExist(undefined, {
    message: 'Existe un usurio con este email.',
  })
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsString()
  @IsOptional()
  role_id: string;

  @IsBoolean()
  @IsOptional()
  is_staff: boolean;

  @IsString()
  @IsOptional()
  boss_id: string;
}

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  code: string;

  @IsOptional()
  username: string;

  @IsOptional()
  names: string;

  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  @IsUserAlreadyExist('id', {
    message: 'Existe un usurio con este email.',
  })
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsString()
  @IsOptional()
  role_id: string;

  @IsBoolean()
  @IsOptional()
  is_staff: boolean;

  @IsString()
  @IsOptional()
  boss_id: string;
}

interface IUserDto {
  id: string;
  code: string;
  username: string;
  names: string;
  email: string;
  role_id: string;
  is_active: boolean;
  is_staff: boolean;
  boss_id: string;
  created_at: Date;
  updated_at: Date;
}
export class UserDto {
  id: string;
  code: string;
  username: string;
  names: string;
  email: string;
  role_id: string;
  is_active: boolean;
  is_staff: boolean;
  boss_id: string;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    code,
    username,
    names,
    email,
    role_id,
    is_active,
    is_staff,
    boss_id,
    created_at,
    updated_at,
  }: IUserDto) {
    this.id = id;
    this.code = code;
    this.username = username;
    this.names = names;
    this.email = email;
    this.role_id = role_id;
    this.is_active = is_active;
    this.is_staff = is_staff;
    this.boss_id = boss_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
