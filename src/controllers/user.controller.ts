import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UserCreateDto, UserDto, UserUpdateDto } from '../dtos/user.dto';
import { AuthGuard } from '../guards/auth.guard';
export interface IGetUsersResponse {
  data: UserDto[];
  pages: number;
  count: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  formatResponse(result, total, limit) {
    const dataMapping = result.map((user: User) => {
      const { leader, ...partialUser } = user;
      const leaderMapped = leader ? new UserDto(leader) : null;
      return new UserDto({ ...partialUser, leader: leaderMapped });
    });
    return {
      data: dataMapping,
      pages: Math.ceil(total / limit) || 1,
      count: total,
    };
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllUsers(@Query() params: any): Promise<IGetUsersResponse> {
    const { page, limit, fieldToFilter, term } = params;
    const [result, total] = await this.usersService.getAll(
      page,
      limit,
      fieldToFilter,
      term,
    );
    return this.formatResponse(result, total, limit);
  }

  @Get('/free')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllUsersFree(
    @Query() params: any,
    @Req() request: Request,
  ): Promise<IGetUsersResponse> {
    console.log('el usuario', request['user']);
    const { page, limit, fieldToFilter, term } = params;
    const [result, total] = await this.usersService.getAllWithLeader(
      page,
      limit,
      fieldToFilter,
      term,
      false,
    );
    return this.formatResponse(result, total, limit);
  }

  @Get('/with_leader')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllUsersWithLeader(
    @Query() params: any,
  ): Promise<IGetUsersResponse> {
    const { page, limit, fieldToFilter, term } = params;
    const [result, total] = await this.usersService.getAllWithLeader(
      page,
      limit,
      fieldToFilter,
      term,
      true,
    );
    return this.formatResponse(result, total, limit);
  }
  @Get('/leaders')
  @HttpCode(HttpStatus.OK)
  async getAllLeaders(): Promise<UserDto[]> {
    const leaders = await this.usersService.getAllLeaders();
    return leaders.map((user: User) => ({
      ...new UserDto(user),
    }));
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOneById(id);
    return new UserDto(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async createUser(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserDto(user);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateUser(@Body() updateUserDto: UserUpdateDto): Promise<UserDto> {
    const user = await this.usersService.update(updateUserDto);
    const { leader, ...partialUser } = user;
    const leaderMapped = leader ? new UserDto(leader) : null;
    return new UserDto({ ...partialUser, leader: leaderMapped });
  }
}
