import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { SigcService } from '../services/sigc.service';
import { UsersService } from '../services/users.service';
import { SubordinatesService } from '../services/subordinate.service';

@Controller('sigc')
export class SigcController {
  constructor(
    private readonly sigcService: SigcService,
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/deposits/total/:id')
  @UseGuards(AuthGuard)
  async getDepositsTotal(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.depositsTotalSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.depositsTotalMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/placements/total/:id')
  @UseGuards(AuthGuard)
  async getPlacementsTotal(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.placementsTotalSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.placementsTotalMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/placements/:id')
  @UseGuards(AuthGuard)
  async getPlacements(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.placementsSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.placementsMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/captures/:id')
  @UseGuards(AuthGuard)
  async getCaptures(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.captureSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.capturesMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/deposits/:id')
  @UseGuards(AuthGuard)
  async getDeposits(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.depositsSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.depositsMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/vinculations/:id')
  @UseGuards(AuthGuard)
  async getVinculations(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.vinculationsSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.vinculationsMultiParam(btoa(params));
    }
  }
}
