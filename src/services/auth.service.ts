import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto, UserLoginDto, UserResetPassword } from '../dtos/user.dto';
import { UsersService } from './users.service';
import { AppConfig } from '../config';
import { RolDto } from 'src/dtos/rol.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class LoginResponseDto implements UserDto {
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
  @ApiProperty()
  @IsString()
  boss_id: string;
  @ApiProperty()
  rol: RolDto;
  @ApiProperty()
  @IsNumber()
  logins: number;
  @ApiProperty()
  @IsDate()
  created_at: Date;
  @ApiProperty()
  @IsDate()
  updated_at: Date;
  @ApiProperty()
  @IsString()
  token: string;
  @ApiProperty()
  leaders: UserDto[] | null;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canLogin(userData: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(userData.email);
    if (!user || user.password === null || !user.is_active) {
      throw new HttpException('El usuario no existe o esta inactivo', 302);
    }
    if (user.logins >= 15) {
      throw new HttpException(
        'A exedido el uso de la contraseña actual, actualizela.',
        301,
      );
    }
    return {
      rol: user.rol.code,
      status: 200,
    };
  }
  async login(userData: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(userData.email);
    if (!user || user.password === null || !user.is_active) {
      throw new HttpException('El usuario no existe o esta inactivo', 302);
    }
    const password = atob(userData.password);
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, names: user.names, rol: user.rol.code };
    await this.usersService.update({
      id: user.id,
      logins: user.logins + 1,
    });
    const leadersMapped =
      user.leaders && user.leaders.length > 0
        ? user.leaders.map((leader) => new UserDto(leader.boss))
        : [];
    const response: LoginResponseDto = {
      token: await this.jwtService.signAsync(payload),
      ...new UserDto(user),
      leaders: leadersMapped,
    };

    return response;
  }

  async resetPassword(userData: UserResetPassword) {
    try {
      const data = await this.jwtService.verifyAsync(userData.token, {
        secret: AppConfig().appKey,
      });
      const user = await this.usersService.findOneById(data['userId']);
      if (user.token === userData.token) {
        const updatePasswordData = {
          id: user.id,
          password: userData.password,
          logins: 0,
          token: null,
        };
        await this.usersService.update(updatePasswordData);
        return {
          status: 200,
          message: 'Constraseña actualizada correctamente.',
        };
      } else {
        return {
          status: 401,
          message: 'El token no es valido!',
        };
      }
    } catch (e) {
      return {
        status: 401,
        message: 'El token no es valido!',
      };
    }
  }
}
