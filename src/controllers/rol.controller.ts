import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RolService } from '../services/rol.service';
import { Rol } from '../entities/rol.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Rols service')
@Controller('rols')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllRols(): Promise<Rol | any> {
    return await this.rolService.getAll();
  }
}
