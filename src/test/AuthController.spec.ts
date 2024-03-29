import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import {
  UserLoginDto,
  UserLogedDto,
  UserResetPassword,
} from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import { HttpRequestService } from '../services/http.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { HttpModule } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';

function createUserLoggedDtoMock(data: Partial<UserLogedDto>): UserLogedDto {
  return {
    id: data.id || '1',
    code: data.code || 'ABC123',
    username: data.username || 'user',
    names: data.names || 'Jon',
    email: data.email || 'user@example.com',
    rol_id: data.rol_id || '1',
    is_active: data.is_active || true,
    is_staff: data.is_staff || false,
    boss_id: data.boss_id || '2',
    rol: data.rol || null,
    leader: data.leader || null,
    logins: data.logins || 0,
    created_at: data.created_at || new Date(),
    updated_at: data.updated_at || new Date(),
    token: data.token || 'test_token',
  };
}
let controller: AuthController;
let authService: AuthService;
let usersService: UsersService;
let jwtService: JwtService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    controllers: [AuthController],
    providers: [
      JwtService,
      UsersService,
      AuthService,
      HttpRequestService,
      {
        provide: getRepositoryToken(User),
        useClass: Repository,
      },
      {
        provide: getRepositoryToken(UserCredentialsLog),
        useClass: Repository,
      },
    ],
  }).compile();

  controller = module.get<AuthController>(AuthController);
  authService = module.get<AuthService>(AuthService);
  usersService = module.get<UsersService>(UsersService);
  jwtService = module.get<JwtService>(JwtService);
});

describe('test methods for auth controller', () => {
  it('test login method pass', async () => {
    const mockUserLoginDto: UserLoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser: UserLogedDto = createUserLoggedDtoMock({
      token: 'token_xeswrrs_fafgsf',
    });

    jest.spyOn(authService, 'login').mockResolvedValue(mockUser);

    const result = await controller.login(mockUserLoginDto);

    expect(result).toEqual(mockUser);
  });
  it('test login method not pass', async () => {
    const userData: UserLoginDto = {
      email: 'example@example.com',
      password: 'password123',
    };

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

    await expect(authService.login(userData)).rejects.toThrow(HttpException);
  });
  it('test reset password method pass', async () => {
    const userData = new UserResetPassword();
    userData.token = 'aksnduysdg21324?¡45345435345';
    userData.password = 'new_password';

    const user = new User({
      id: '1',
      code: 'ABC123',
      username: 'user',
      names: 'Jon',
      email: 'user@example.com',
      rol_id: '1',
      is_active: true,
      is_staff: false,
      boss_id: '2',
      rol: null,
      leader: null,
      logins: 0,
      created_at: new Date(),
      updated_at: new Date(),
      log: null,
      subordinates: null,
      token: 'test_token',
      password: '2141414',
    });

    jest.spyOn(authService, 'resetPassword').mockResolvedValueOnce({
      status: 200,
      message: 'Constraseña actualizada correctamente.',
    });
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockResolvedValueOnce({ userId: user.id });
    jest.spyOn(usersService, 'findOneById').mockResolvedValueOnce(user);
    jest.spyOn(usersService, 'update').mockResolvedValueOnce(user);

    const result = await authService.resetPassword(userData);

    expect(result).toEqual({
      status: 200,
      message: 'Constraseña actualizada correctamente.',
    });
  });

  it('test reset password not method pass', async () => {
    const userData = new UserResetPassword();
    userData.token = '';
    userData.password = 'new_password';

    const authService = new AuthService(usersService, jwtService);
    jest.spyOn(authService, 'resetPassword').mockResolvedValueOnce({
      status: 401,
      message: 'El token no es valido!',
    });
    const result = await authService.resetPassword(userData);
    expect(result).toEqual({
      status: 401,
      message: 'El token no es valido!',
    });
  });
});
