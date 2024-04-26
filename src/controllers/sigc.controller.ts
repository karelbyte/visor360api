import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import {
  IPaginateParamsWithSearch,
  SigcService,
} from '../services/sigc.service';
import { UsersService } from '../services/users.service';
import { SubordinatesService } from '../services/subordinate.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get deposits total by user id' })
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
  @ApiOperation({ summary: 'Get placements total by user id' })
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
  @ApiOperation({ summary: 'Get placements by user id' })
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
  @ApiOperation({ summary: 'Get captures by user id' })
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
  @ApiOperation({ summary: 'Get deposits by user id' })
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
  @ApiOperation({ summary: 'Get deposits top 10 by user id' })
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
  @ApiOperation({ summary: 'Get vinculations top 10 by user id' })
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
  @ApiOperation({ summary: 'Get assets top 10 by user id' })
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
  @ApiOperation({ summary: 'Get all expiration by user id' })
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
  @ApiOperation({ summary: 'Get financial by user id' })
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
  @ApiOperation({ summary: 'Get product cancelation by user id' })
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
  @Get('/expiration_dpf_month')
  @UseGuards(AuthGuard)
  async getExpirationDpfMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationDpfMonthSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationDpfMonthMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_dpf_year')
  @UseGuards(AuthGuard)
  async getExpirationDpfYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationDpfYearSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationDpfYearMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_credit_line_month')
  @UseGuards(AuthGuard)
  async getExpirationCreditLineMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationCreditLineMonthSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationCreditLineMonthMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_credit_line_year')
  @UseGuards(AuthGuard)
  async getExpirationCreditLineYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationCreditLineYearSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationCreditLineYearMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_client_month')
  @UseGuards(AuthGuard)
  async getExpirationClientMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationClientMonthSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationClientMonthMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_client_year')
  @UseGuards(AuthGuard)
  async getExpirationClientYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationClientYearSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationClientYearMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_placements_month')
  @UseGuards(AuthGuard)
  async getExpirationPlacementstMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationPlacementsMonthSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationPlacementsMonthMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/expiration_placements_year')
  @UseGuards(AuthGuard)
  async getExpirationPlacementstYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
      id: string;
    },
  ): Promise<any> {
    const { page, limit, search, id } = params;
    const user = await this.userService.findOneById(id);
    if (user.rol.code === 'commercial') {
      return await this.sigcService.expirationPlacementsYearSingleParam({
        page,
        limit,
        search,
        codes: btoa(user.code),
      });
    } else {
      const subordinatesCodes =
        await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
      const params = JSON.stringify(subordinatesCodes);
      return await this.sigcService.expirationPlacementsYearMultiParam({
        page,
        limit,
        search,
        codes: btoa(params),
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/product_xls/:id')
  /*  @UseGuards(AuthGuard) */
  @ApiOperation({ summary: 'Get product report in xls by user id' })
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
