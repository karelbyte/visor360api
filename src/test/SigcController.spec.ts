import { Test, TestingModule } from '@nestjs/testing';
import { SigcController } from '../controllers/sigc.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import { SigcService } from '../services/sigc.service';
import { HttpRequestService } from '../services/http.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { HttpModule } from '@nestjs/axios';
import { Rol } from '../entities/rol.entity';
import { SubordinatesService } from '../services/subordinate.service';
import { Subordinate } from '../entities/subordinate.entity';

let controller: SigcController;
let sigcService: SigcService;
let usersService: UsersService;
let subordinatesService: SubordinatesService;

const mockUser = new User({
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
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    controllers: [SigcController],
    providers: [
      JwtService,
      SubordinatesService,
      UsersService,
      SigcService,
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
      {
        provide: getRepositoryToken(Rol),
        useClass: Repository,
      },
      {
        provide: getRepositoryToken(Subordinate),
        useClass: Repository,
      },
    ],
  }).compile();

  controller = module.get<SigcController>(SigcController);
  sigcService = module.get<SigcService>(SigcService);
  usersService = module.get<UsersService>(UsersService);
  subordinatesService = module.get<SubordinatesService>(SubordinatesService);
});

describe('test methods for sigc controller', () => {
  it('test total deposits for a commercial user', async () => {
    const mockUserCommercial = {
      ...mockUser,
      rol: new Rol({
        id: 'as',
        code: 'commercial',
        description: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      }),
    };

    jest
      .spyOn(usersService['usersRepository'], 'findOne')
      .mockResolvedValue(mockUserCommercial);

    jest
      .spyOn(sigcService, 'depositsTotalSingleParam')
      .mockResolvedValue(mockUserCommercial);
    const id = '12345';
    const result = await controller.getDepositsTotal(id);

    expect(result).toBe(mockUserCommercial);
  });

  it('test total deposits for a boss user', async () => {
    const mockUserCommercial = {
      ...mockUser,
      rol: new Rol({
        id: 'as',
        code: 'manager',
        description: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      }),
    };

    jest
      .spyOn(usersService['usersRepository'], 'findOne')
      .mockResolvedValue(mockUserCommercial);

    jest
      .spyOn(subordinatesService['subordinateRepository'], 'find')
      .mockResolvedValue([]);

    jest
      .spyOn(sigcService, 'depositsTotalMultiParam')
      .mockResolvedValue(mockUserCommercial);
    const id = '12345';
    const result = await controller.getDepositsTotal(id);

    expect(result).toBe(mockUserCommercial);
  });
});
