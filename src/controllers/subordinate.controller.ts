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
import { AuthGuard } from '../guards/auth.guard';
import { SubordinatesService } from '../services/subordinate.service';
import {
  SubordinateCreateDto,
  SubordinateDto,
  SubordinateUpdateDto,
} from '../dtos/subordinate.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { DeleteResult } from 'typeorm';

export interface IGetUsersResponse {
  data: SubordinateDto[];
  pages: number;
  count: number;
}
@Controller('subordinates')
export class SubordinateController {
  constructor(
    private readonly subordinateService: SubordinatesService,
    private readonly userService: UsersService,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsersAndSubordinates(
    @Query() params: any,
  ): Promise<IGetUsersResponse> {
    const { page, limit, fieldToFilter, term } = params;
    const [result, total] = await this.subordinateService.getAll(
      page,
      limit,
      fieldToFilter,
      term,
    );
    return {
      data: result,
      pages: Math.ceil(total / limit) || 1,
      count: total,
    };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createSubordinate(
    @Body() createSubordinateDto: SubordinateCreateDto,
  ): Promise<SubordinateDto> {
    const subordinate =
      await this.subordinateService.create(createSubordinateDto);
    const userUpdate: { id: string; boss_id: string } = {
      id: createSubordinateDto.user_id,
      boss_id: createSubordinateDto.boss_id,
    };
    await this.userService.update(userUpdate);
    return new SubordinateDto(subordinate);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async deleteSubordinate(
    @Body() createSubordinateDto: SubordinateCreateDto,
  ): Promise<DeleteResult> {
    const result = await this.subordinateService.delete(createSubordinateDto);
    const userUpdate: { id: string; boss_id: string } = {
      id: createSubordinateDto.user_id,
      boss_id: null,
    };
    await this.userService.update(userUpdate);
    return result;
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateSubordinate(
    @Body() updateSubordinateDto: SubordinateUpdateDto,
  ): Promise<SubordinateDto> {
    const subordinate =
      await this.subordinateService.update(updateSubordinateDto);
    return new SubordinateDto(subordinate);
  }

  @Get('/get-subordinate-codes/:id')
  async getSubordinates(@Param('id') id: string): Promise<string[]> {
    return await this.subordinateService.getSubordinatesByBoss(id);
  }

  @Get('/get-subordinate/:id')
  @HttpCode(HttpStatus.OK)
  async findByUserId(@Param('id') id: string): Promise<UserDto[]> {
    return await this.subordinateService.findByUserId(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSubordinateById(@Param('id') id: number): Promise<SubordinateDto> {
    const subordinate = await this.subordinateService.findOneById(id);
    return new SubordinateDto(subordinate);
  }
}
