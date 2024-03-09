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
    return {
      data: result.map((user: User) => ({
        ...new UserDto(user),
        rol_description: user.rol ? user.rol.description : '',
      })),
      pages: Math.ceil(total / limit) || 1,
      count: total,
    };
  }
  @Get()
  @HttpCode(HttpStatus.OK)
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
  async getAllUsersFree(@Query() params: any): Promise<IGetUsersResponse> {
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOneById(id);
    return new UserDto(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserDto(user);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateUser(@Body() updateUserDto: UserUpdateDto): Promise<UserDto> {
    const user = await this.usersService.update(updateUserDto);
    return new UserDto(user);
  }
}
