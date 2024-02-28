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
  status: boolean;
}

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsOptional()
  @IsString()
  names: string;
  @IsEmail(undefined, {
    message: 'No se proporciono un correo o su formato es inválido.',
  })
  @IsUserAlreadyExist('id', {
    message: 'Existe un usurio con este email.',
  })
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
export class UserDto {
  id: string;
  names: string;
  email: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    names,
    email,
    status,
    created_at,
    updated_at,
  }: {
    id: string;
    names: string;
    email: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
  }) {
    this.id = id;
    this.names = names;
    this.email = email;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
