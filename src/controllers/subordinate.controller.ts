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
import { SubordinateDto, SubordinateUpdateDto } from '../dtos/subordinate.dto';
import { Subordinate } from '../entities/subordinate.entity';
export interface IGetUsersResponse {
  data: SubordinateDto[];
  pages: number;
  count: number;
}
@Controller('subordinates')
export class SubordinateController {
  constructor(private readonly subordinateService: SubordinatesService) {}
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
      data: result.map(
        (subordinate: Subordinate) => new SubordinateDto(subordinate),
      ),
      pages: Math.ceil(total / limit) || 1,
      count: total,
    };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createSubordinate(
    @Body() createSubordinateDto: SubordinateDto,
  ): Promise<SubordinateDto> {
    const subordinate =
      await this.subordinateService.create(createSubordinateDto);
    return new SubordinateDto(subordinate);
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

  @Get('/get-subordinate/:id')
  async getSubordinates(@Param('id') id: string): Promise<string[]> {
    return await this.subordinateService.getSubordinatesByBoss(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSubordinateById(@Query() params: any): Promise<SubordinateDto> {
    const { id } = params;
    const subordinate = await this.subordinateService.findOneById(id);
    return new SubordinateDto(subordinate);
  }
}
