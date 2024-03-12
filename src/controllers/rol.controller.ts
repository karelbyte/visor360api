import {Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { RolService } from '../services/rol.service';
import { Rol } from '../entities/rol.entity';

@Controller('rols')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async login(): Promise<Rol | any> {
    return await this.rolService.getAll();
  }
}
