import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { HttpRequestService } from '../services/http.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from '../controllers/user.controller';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto, UserDto, UserUpdateDto } from '../dtos/user.dto';
let usersController: UsersController;
let usersService: UsersService;
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    controllers: [UsersController],
    providers: [
      JwtService,
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
  usersController = module.get<UsersController>(UsersController);
  usersService = module.get<UsersService>(UsersService);
});

const params = {
  page: 1,
  limit: 10,
  fieldToFilter: 'name',
  term: 'John',
};

const mockUsers: User[] = [];

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
describe('test methods for user controller', () => {
  it('test get all users', async () => {
    jest
      .spyOn(usersService['usersRepository'], 'findAndCount')
      .mockResolvedValue([mockUsers, mockUsers.length]);

    const response = await usersController.getAllUsers(params);

    expect(response.data).toBeDefined();
    expect(response.pages).toBeDefined();
    expect(response.count).toBeDefined();
  });

  it('test get all users free', async () => {
    jest
      .spyOn(usersService['usersRepository'], 'findAndCount')
      .mockResolvedValue([mockUsers, mockUsers.length]);

    const response = await usersController.getAllUsersFree(params);

    expect(response.data).toBeDefined();
    expect(response.pages).toBeDefined();
    expect(response.count).toBeDefined();
  });

  it('test get all users with leader', async () => {
    jest
      .spyOn(usersService['usersRepository'], 'findAndCount')
      .mockResolvedValue([mockUsers, mockUsers.length]);

    const response = await usersController.getAllUsersWithLeader(params);

    expect(response.data).toBeDefined();
    expect(response.pages).toBeDefined();
    expect(response.count).toBeDefined();
  });
  it('test get all users leaders', async () => {
    const leaders = [mockUser];
    jest.spyOn(usersService, 'getAllLeaders').mockResolvedValue(leaders);
    const result = await usersController.getAllLeaders();
    expect(result).toEqual(leaders.map((user: User) => new UserDto(user)));
  });

  it('test get user by id', async () => {
    // Arrange
    const id = 'validId';
    const userDto = new UserDto(mockUser);
    jest.spyOn(usersService, 'findOneById').mockResolvedValue(mockUser);
    const controller = new UsersController(usersService);
    const result = await controller.getUserById(id);
    expect(result).toEqual(userDto);
  });

  it('test create user', async () => {
    const createUserDto: UserCreateDto = {
      code: 'ABC123',
      username: 'user',
      names: 'Jon',
      email: 'user@example.com',
      rol_id: '1',
      is_active: true,
      is_staff: false,
      boss_id: '2',
      password: '12345',
    };

    const mockCredentialsLog = {
      id: '1',
      user: null,
      user_id: '1',
      password: 'valid_password',
      created_at: new Date(),
      updated_at: new Date(),
    };
    jest
      .spyOn(usersService['usersRepository'], 'save')
      .mockResolvedValue(mockUser);
    jest
      .spyOn(usersService['logRepository'], 'save')
      .mockResolvedValue(mockCredentialsLog);

    const user = await usersController.createUser(createUserDto);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.code).toBe(createUserDto.code);
    expect(user.username).toBe(createUserDto.username);
    expect(user.names).toBe(createUserDto.names);
    expect(user.email).toBe(createUserDto.email);
    expect(user.is_active).toBe(createUserDto.is_active);
    expect(user.rol_id).toBe(createUserDto.rol_id);
    expect(user.is_staff).toBe(createUserDto.is_staff);
    expect(user.boss_id).toBe(createUserDto.boss_id);
  });

  it('test update user', async () => {
    // Arrange
    const updateUserDto = new UserUpdateDto();
    updateUserDto.id = '12345';
    updateUserDto.username = 'newUsername';
    updateUserDto.names = 'New Name';
    updateUserDto.email = 'newemail@example.com';
    updateUserDto.is_active = true;
    updateUserDto.is_staff = false;

    const mockResult = new UpdateResult();
    jest
      .spyOn(usersService['usersRepository'], 'update')
      .mockResolvedValue(mockResult);
    jest
      .spyOn(usersService['usersRepository'], 'findOne')
      .mockResolvedValue(mockUser);
    const updatedUser = await usersController.updateUser(updateUserDto);

    expect(updatedUser).toBeInstanceOf(UserDto);
  });
});
