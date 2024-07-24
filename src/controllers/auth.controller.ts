import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService, LoginResponseDto } from '../services/auth.service';
import {
  UserLoginDto,
  UserResetPassword,
  UserLogedDto,
} from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { Action } from 'src/decorators/actions.decorator';

@ApiTags('Auth service')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Action('AUTENTICACION (API AUTH)')
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

  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.OK)
  @Post('/can-login')
  @Action('AUTENTICACION PASO (API AUTH)')
  async canLogin(@Body() body: UserLoginDto): Promise<User | any> {
    return await this.authService.canLogin(body);
  }

  @ApiOperation({ summary: 'User reset password' })
  @ApiResponse({
    status: 200,
    description: 'Constraseña actualizada correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'El token no es valido!',
  })
  @HttpCode(HttpStatus.OK)
  @Action('CAMBIO DE CONTRASEÑA (API AUTH)')
  @Post('/reset-password')
  async resetPassword(@Body() body: UserResetPassword): Promise<any> {
    return await this.authService.resetPassword(body);
  }
}
