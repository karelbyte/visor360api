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
import { UsersService } from '../services/users.service';
import { DeleteResult } from 'typeorm';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Action } from 'src/decorators/actions.decorator';

export interface IGetUsersResponse {
  data: any[];
  pages: number;
  count: number;
}
@ApiBearerAuth()
@ApiTags('Subordinates service')
@Controller('subordinates')
@UseGuards(AuthGuard)
export class SubordinateController {
  constructor(
    private readonly subordinateService: SubordinatesService,
    private readonly userService: UsersService,
  ) { }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users and subordinates' })
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

  @Action('CREAR SUBORDINADO (API SUBORDINADOS)')
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a subordinate' })
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

  @Action('ELIMINAR SUBORDINADO (API SUBORDINADOS)')
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a subordinate' })
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

  @Action('ACTUALIZAR SUBORDINADO (API SUBORDINADOS)')
  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a subordinate' })
  async updateSubordinateById(
    @Body() updateSubordinateDto: SubordinateUpdateDto,
  ): Promise<SubordinateDto> {
    const subordinate =
      await this.subordinateService.update(updateSubordinateDto);
    const userUpdate: { id: string; boss_id: string } = {
      id: updateSubordinateDto.user_id,
      boss_id: updateSubordinateDto.boss_id,
    };
    await this.userService.update(userUpdate);
    return new SubordinateDto(subordinate);
  }

  @Action('ACTUALIZAR LIDER DE SUBORDINADO (API SUBORDINADOS)')
  @Post('/update/leader')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a user leader' })
  async updateSubordinateByUserID(
    @Body() updateSubordinateDto: SubordinateCreateDto,
  ): Promise<SubordinateDto> {
    const subordinate =
      await this.subordinateService.updateByUserId(updateSubordinateDto);
    const userUpdate: { id: string; boss_id: string } = {
      id: updateSubordinateDto.user_id,
      boss_id: updateSubordinateDto.boss_id,
    };
    await this.userService.update(userUpdate);
    return new SubordinateDto(subordinate);
  }

  @Action('CONSULTA SUBORDINADOS POR LIDER (API SUBORDINADOS)')
  @Get('/get-subordinate-codes/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user subordinates codes by user id' })
  async getSubordinates(@Param('id') id: string): Promise<string[]> {
    const allCodes =
      await this.subordinateService.getSubordinatesByBossOnlyCodes(id);
    return [...new Set(allCodes)];
  }

  @Get('/get-subordinate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user subordinates details by user id' })
  async findByUserId(@Query() params: any): Promise<IGetUsersResponse> {
    const { id, page, limit, fieldToFilter, term } = params;
    const [result, total] = await this.subordinateService.getSubordinatesByBoss(
      id,
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user subordinate by id' })
  async getSubordinateById(@Param('id') id: number): Promise<SubordinateDto> {
    const subordinate = await this.subordinateService.findOneById(id);
    return new SubordinateDto(subordinate);
  }
}
