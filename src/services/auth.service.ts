import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto, UserLoginDto, UserResetPassword } from '../dtos/user.dto';
import { UsersService } from './users.service';
import { AppConfig } from '../config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userData: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(userData.email);
    if (!user || user.password === null || !user.is_active) {
      throw new UnauthorizedException();
    }
    const isSamePassword = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isSamePassword) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, names: user.names, rol: user.rol.code };
    return {
      token: await this.jwtService.signAsync(payload),
      ...new UserDto(user),
      leader: new UserDto(user.leader),
    };
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
