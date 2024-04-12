import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { SigcService } from '../services/sigc.service';
import { UsersService } from '../services/users.service';
import { SubordinatesService } from '../services/subordinate.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Workbook } from 'exceljs';
@ApiBearerAuth()
@ApiTags('Sigc service')
@Controller('sigc')
export class SigcController {
  constructor(
    private readonly sigcService: SigcService,
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) { }

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
  @Get('/deposits-top-10/:id')
  @UseGuards(AuthGuard)
  async getDepositsTop10(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.depositsTop10SingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.depositsTop10MultiParam(btoa(params));
    }
  }
  @HttpCode(HttpStatus.OK)
  @Get('/vinculations-top-10/:id')
  @UseGuards(AuthGuard)
  async getVinculationsTop10(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.vinculationsTop10SingleParam(
        btoa(user.code),
      );
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.vinculationsTop10MultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/assets-top-10/:id')
  @UseGuards(AuthGuard)
  async getAssetsTop10(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.assetsTop10SingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.assetsTop10MultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all-expiration/:id')
  @UseGuards(AuthGuard)
  async getExpirationAll(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationAllSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationAllMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/financial/:id')
  @UseGuards(AuthGuard)
  async getFinancial(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.financialSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.financialMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/product_cancelation/:id')
  @UseGuards(AuthGuard)
  async getProductCancelation(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.cancelSingleParam(btoa(user.code));
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.cancelMultiParam(btoa(params));
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/product_xls/:id')
  /*  @UseGuards(AuthGuard) */
  async getProductXls(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const user = await this.userService.findOneById(id);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('exceljs-example');

    worksheet.columns = [
      { header: 'Periodo', key: 'periodo' },
      { header: 'Name', key: 'name' },
    ];

    const cancelSingle = await this.sigcService.cancelSingleParam(
      btoa(user.code),
    );

    const decryObject = atob(cancelSingle.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    console.log(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=example.xlsx`)
      .send(buffer);
  }
}
