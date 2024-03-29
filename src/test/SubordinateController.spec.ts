import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { SubordinatesService } from '../services/subordinate.service';
import { HttpRequestService } from '../services/http.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { User } from '../entities/user.entity';
import { Subordinate } from '../entities/subordinate.entity';
import { HttpModule } from '@nestjs/axios';
import { SubordinateController } from '../controllers/subordinate.controller';
import { JwtService } from '@nestjs/jwt';
import {
  SubordinateCreateDto,
  SubordinateDto,
  SubordinateUpdateDto,
} from '../dtos/subordinate.dto';
let subordinateController: SubordinateController;
let subordinateService: SubordinatesService;
let usersService: UsersService;
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    controllers: [SubordinateController],
    providers: [
      JwtService,
      UsersService,
      SubordinatesService,
      HttpRequestService,
      {
        provide: getRepositoryToken(User),
        useClass: Repository,
      },
      {
        provide: getRepositoryToken(Subordinate),
        useClass: Repository,
      },
      {
        provide: getRepositoryToken(UserCredentialsLog),
        useClass: Repository,
      },
    ],
  }).compile();
  subordinateController = module.get<SubordinateController>(
    SubordinateController,
  );
  subordinateController = module.get<SubordinateController>(
    SubordinateController,
  );
  subordinateService = module.get<SubordinatesService>(SubordinatesService);
  usersService = module.get<UsersService>(UsersService);
});

const params = {
  page: 1,
  limit: 10,
  fieldToFilter: 'name',
  term: 'John',
};

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

const mockSubordinate = new Subordinate({
  id: 1,
  user_id: '1',
  boss_id: '2',
  user: mockUser,
  created_at: new Date(),
  updated_at: new Date(),
});

const mockSubordinateDto = new SubordinateDto({
  id: 1,
  user_id: '1',
  boss_id: '2',
  created_at: new Date(),
  updated_at: new Date(),
});
describe('test methods for subordinate controller', () => {
  it('test list of users and their subordinates with valid query parameters', async () => {
    const result: User[] = [mockUser];
    const total = 1;
    const getAllSpy = jest
      .spyOn(subordinateService, 'getAll')
      .mockResolvedValue([result, total]);

    const response =
      await subordinateController.getAllUsersAndSubordinates(params);

    expect(getAllSpy).toHaveBeenCalledWith(1, 10, 'name', 'John');
    expect(response).toEqual({
      data: result,
      pages: 1,
      count: total,
    });
  });

  it(' create a subordinate whit valid data', async () => {
    const createSubordinateDto: SubordinateCreateDto = {
      boss_id: '123',
      user_id: '456',
    };
    jest.spyOn(usersService, 'update').mockResolvedValue(mockUser);
    jest
      .spyOn(subordinateService['subordinateRepository'], 'save')
      .mockResolvedValue(mockSubordinate);
    const result =
      await subordinateController.createSubordinate(createSubordinateDto);

    expect(result).toBeInstanceOf(SubordinateDto);
  });

  it('test delete a subordinate and update the boss_id ', async () => {
    const createSubordinateDto: SubordinateCreateDto = {
      boss_id: '123',
      user_id: '456',
    };
    const deleteResult: DeleteResult = {
      affected: 1,
      raw: {},
    };
    jest
      .spyOn(subordinateService['subordinateRepository'], 'delete')
      .mockResolvedValue(deleteResult);
    const mockResult = new UpdateResult();
    jest
      .spyOn(usersService['usersRepository'], 'update')
      .mockResolvedValue(mockResult);

    jest
      .spyOn(usersService['usersRepository'], 'findOne')
      .mockResolvedValue(mockUser);

    const result =
      await subordinateController.deleteSubordinate(createSubordinateDto);

    expect(result).toEqual(deleteResult);
  });

  it('test update subordinate by id', async () => {
    const updateSubordinateDto: SubordinateUpdateDto = {
      id: 1,
      boss_id: '123',
      user_id: '456',
    };
    const mockResult = new UpdateResult();
    jest
      .spyOn(usersService['usersRepository'], 'update')
      .mockResolvedValue(mockResult);
    jest
      .spyOn(usersService['usersRepository'], 'findOne')
      .mockResolvedValue(mockUser);

    jest.spyOn(subordinateService, 'update').mockResolvedValue(mockSubordinate);

    const result =
      await subordinateController.updateSubordinateById(updateSubordinateDto);

    expect(result).toEqual(mockSubordinateDto);
  });
});
