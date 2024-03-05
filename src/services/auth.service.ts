import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto, UserLoginDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userData: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(userData.email);
    if (!user || user.password === null) {
      throw new UnauthorizedException();
    }
    const isSamePassword = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isSamePassword) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, names: user.names };
    return {
      token: await this.jwtService.signAsync(payload),
      user: new UserDto(user),
    };
  }
}
