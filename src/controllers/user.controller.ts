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
import {
  IPaginateAndFilterParams,
  UsersService,
} from '../services/users.service';
import { User } from '../entities/user.entity';
import { UserCreateDto, UserDto, UserUpdateDto } from '../dtos/user.dto';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
export class UsersResponseDto {
  @ApiProperty({
    isArray: true,
    type: UserDto,
  })
  @IsArray()
  data: UserDto[];
  @ApiProperty()
  @IsNumber()
  pages: number;
  @ApiProperty()
  @IsNumber()
  count: number;
}

@ApiBearerAuth()
@ApiTags('User service')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  formatResponse(result: User[], total: number, limit: number) {
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

  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'fieldToFilter', type: 'string', required: false })
  @ApiQuery({ name: 'term', type: 'string', required: false })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UsersResponseDto })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllUsers(
    @Query() params: IPaginateAndFilterParams,
  ): Promise<UsersResponseDto> {
    const { page, limit, fieldToFilter, term } = params;
    const [result, total] = await this.usersService.getAll({
      page,
      limit,
      fieldToFilter,
      term,
    });
    return this.formatResponse(result, total, limit);
  }
  @ApiOperation({ summary: 'Get all users without leader' })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'fieldToFilter', type: 'string', required: false })
  @ApiQuery({ name: 'term', type: 'string', required: false })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UsersResponseDto })
  @Get('/free')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllUsersFree(@Query() params: any): Promise<UsersResponseDto> {
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

  @ApiOperation({ summary: 'Get all users with leader' })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'fieldToFilter', type: 'string', required: false })
  @ApiQuery({ name: 'term', type: 'string', required: false })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UsersResponseDto })
  @Get('/with_leader')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllUsersWithLeader(@Query() params: any): Promise<UsersResponseDto> {
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
  @ApiOperation({ summary: 'Get all users leader' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UsersResponseDto })
  @Get('/leaders')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllLeaders(): Promise<UserDto[]> {
    const leaders = await this.usersService.getAllLeaders();
    return leaders.map((user: User) => ({
      ...new UserDto(user),
    }));
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOneById(id);
    return new UserDto(user);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserDto(user);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: UserDto })
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
