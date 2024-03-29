import { Test, TestingModule } from '@nestjs/testing';
import { RolController } from '../controllers/rol.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import { RolService } from '../services/rol.service';
import { HttpRequestService } from '../services/http.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { HttpModule } from '@nestjs/axios';
import { Rol } from '../entities/rol.entity';

let controller: RolController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    controllers: [RolController],
    providers: [
      JwtService,
      UsersService,
      RolService,
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
    ],
  }).compile();

  controller = module.get<RolController>(RolController);
});

describe('test methods for rol controller', () => {
  it('test list of all rols', async () => {
    const mockRols = [
      new Rol({
        id: 'as',
        code: 'admin',
        description: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      }),
      new Rol({
        id: 'as1',
        code: 'admin',
        description: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      }),
    ];
    jest.spyOn(controller, 'getAllRols').mockResolvedValue(mockRols);

    const result = await controller.getAllRols();

    expect(result).toEqual(mockRols);
  });
});
