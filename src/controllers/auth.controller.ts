import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService, LoginResponseDto } from '../services/auth.service';
import {
  UserLoginDto,
  UserResetPassword,
  UserLogedDto,
} from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth service')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Authenticate user with email and password' })
  @ApiResponse({
    status: 302,
    description: 'El usuario no existe o esta inactivo',
  })
  @ApiResponse({
    status: 301,
    description: 'A exedido el uso de la contraseña actual, actualizela.',
  })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
  })
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
