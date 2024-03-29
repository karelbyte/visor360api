import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  UserLoginDto,
  UserResetPassword,
  UserLogedDto,
} from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: UserLoginDto): Promise<UserLogedDto> {
    return await this.authService.login(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/can-login')
  async canLogin(@Body() body: UserLoginDto): Promise<User | any> {
    return await this.authService.canLogin(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/reset-password')
  async resetPassword(@Body() body: UserResetPassword): Promise<any> {
    return await this.authService.resetPassword(body);
  }
}
