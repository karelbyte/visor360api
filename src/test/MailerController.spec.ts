import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from '../controllers/mailer.controller';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import { HttpRequestService } from '../services/http.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { HttpModule } from '@nestjs/axios';
import { AppMailerService } from '../services/mailer.service';
import { AppMailerModule } from '../modules/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from '../config';

let mailerController: MailerController;
let mailerService: AppMailerService;
let usersService: UsersService;
let jwtService: JwtService;

const mockUser = new User({
  id: '1',
  code: 'ABC123',
  username: 'user',
  names: 'John',
  email: 'user@example.com',
  rol_id: '1',
  is_active: true,
  is_staff: false,
  boss_id: '2',
  rol: {
    id: '1',
    description: 'test',
    code: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  },
  leader: null,
  logins: 0,
  created_at: new Date(),
  updated_at: new Date(),
  log: null,
  subordinates: null,
  token: 'test_token',
  password: '2141414',
});
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [AppConfig, DatabaseConfig],
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          ...configService.get('database'),
        }),
        inject: [ConfigService],
      }),
      HttpModule,
      AppMailerModule,
    ],
    controllers: [MailerController],
    providers: [
      JwtService,
      AppMailerService,
      UsersService,
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

  mailerController = module.get<MailerController>(MailerController);
  usersService = module.get<UsersService>(UsersService);
  jwtService = module.get<JwtService>(JwtService);
  mailerService = module.get<AppMailerService>(AppMailerService);
});

describe('test methods for mailer controller', () => {
  it('send email and generate token when user email is valid', async () => {
    const mockEmail = { email: 'test@example.com' };
    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockUser);

    jest.spyOn(usersService, 'update').mockResolvedValue(mockUser);

    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    jest.spyOn(mailerService, 'sendMail').mockResolvedValue('success');

    await mailerController.changePassword(mockEmail);

    expect(usersService.findOneByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      userId: '1',
      names: 'John',
      rol: 'admin',
    });
    expect(usersService.update).toHaveBeenCalledWith({
      id: '1',
      token: 'token',
    });
    expect(mailerService.sendMail).toHaveBeenCalled();
  });
});
