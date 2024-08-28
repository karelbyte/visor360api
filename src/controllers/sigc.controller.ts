import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Res,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { SigcService } from '../services/sigc.service';
import { UsersService } from '../services/users.service';
import { SubordinatesService } from '../services/subordinate.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Workbook } from 'exceljs';
import { Action } from 'src/decorators/actions.decorator';
@ApiBearerAuth()
@ApiTags('Sigc service')
@Controller('sigc')
export class SigcController {
  constructor(
    private readonly sigcService: SigcService,
    private readonly userService: UsersService,
    private readonly subordinateService: SubordinatesService,
  ) { }

  async getCodes(ids: string[]): Promise<string[]> {
    let codes: string[] = [];
    for (const clientId of ids) {
      const user = await this.userService.findOneById(clientId);
      if (user.rol.code === 'commercial') {
        codes.push(user.code);
      } else {
        const subordinatesCodes =
          await this.subordinateService.getSubordinatesByBossOnlyCodes(user.id);
        codes = codes.concat(subordinatesCodes);
      }
    }
    return codes;
  }

  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/deposits/total')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get deposits total by user id' })
  async getDepositsTotal(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.depositsTotalMultiParam(btoa(params));
  }
  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/placements/total')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get placements total by user id' })
  async getPlacementsTotal(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.placementsTotalMultiParam(btoa(params));
  }
  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/placements')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get placements by user id' })
  async getPlacements(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.placementsMultiParam(btoa(params));
  }
  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/captures')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get captures by user id' })
  async getCaptures(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.capturesMultiParam(btoa(params));
  }
  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/deposits')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get deposits by user id' })
  async getDeposits(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.depositsMultiParam(btoa(params));
  }

  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/deposits-top-10')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get deposits top 10 by user id' })
  async getDepositsTop10(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.depositsTop10MultiParam(btoa(params));
  }
  @Action('CONSULTA A API SIGC')
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/vinculations-top-10')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get vinculations top 10 by user id' })
  async getVinculationsTop10(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.vinculationsTop10MultiParam(btoa(params));
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/assets-top-10')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get assets top 10 by user id' })
  async getAssetsTop10(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.assetsTop10MultiParam(btoa(params));
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/all-expiration')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all expiration by user id' })
  async getExpirationAll(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.expirationAllMultiParam(btoa(params));
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/financial')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get financial by user id' })
  async getFinancial(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.financialMultiParam(btoa(params));
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/product_cancelation')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get product cancelation by user id' })
  async getProductCancelation(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    const params = JSON.stringify(codes);
    return await this.sigcService.cancelMultiParam(btoa(params));
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_dpf_month')
  @ApiOperation({ summary: 'Get expiration dpf month by user id' })
  @UseGuards(AuthGuard)
  async getExpirationDpfMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationDpfMonthMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_dpf_year')
  @ApiOperation({ summary: 'Get expiration dpf year by user id' })
  @UseGuards(AuthGuard)
  async getExpirationDpfYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationDpfYearMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_credit_line_month')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get expiration credit line month by user id' })
  async getExpirationCreditLineMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationCreditLineMonthMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_credit_line_year')
  @ApiOperation({ summary: 'Get expiration dpf year by user id' })
  @UseGuards(AuthGuard)
  async getExpirationCreditLineYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationCreditLineYearMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_client_month')
  @ApiOperation({ summary: 'Get expiration client month by user id' })
  @UseGuards(AuthGuard)
  async getExpirationClientMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationClientMonthMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_client_year')
  @ApiOperation({ summary: 'Get expiration clinet year by user id' })
  @UseGuards(AuthGuard)
  async getExpirationClientYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationClientYearMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_placements_month')
  @ApiOperation({ summary: 'Get expiration placements month by user id' })
  @UseGuards(AuthGuard)
  async getExpirationPlacementstMonth(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationPlacementsMonthMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/expiration_placements_year')
  @ApiOperation({ summary: 'Get expiration placements year by user id' })
  @UseGuards(AuthGuard)
  async getExpirationPlacementstYear(
    @Query()
    params: {
      page: number;
      limit: number;
      search: string;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit, search } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.expirationPlacementsYearMultiParam({
      page,
      limit,
      search,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/assets_group')
  @ApiOperation({ summary: 'Get assets group by id' })
  @UseGuards(AuthGuard)
  async getAssetsGroup(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    return await this.sigcService.assetsGroupMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/assets_full')
  @ApiOperation({ summary: 'Get assets full by id' })
  @UseGuards(AuthGuard)
  async getAssetsFull(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.assetsFullMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/assets_full_xls')
  @ApiOperation({ summary: 'Get assets full report in xls by user id' })
  async getAssetsXls(
    @Body('ids') ids: string[],
    @Res() res: Response,
  ): Promise<any> {
    const codes = await this.getCodes(ids);

    const payload = await this.sigcService.assetsFullXlsMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');
    const columns = [
      { header: 'Producto', key: 'tipo_producto' },
      { header: 'Cuenta', key: 'num_cuenta' },
      { header: 'Cliente', key: 'nombre_cliente' },
      { header: 'Numero Cliente', key: 'num_cliente' },
      { header: 'Fecha letra', key: 'fecha_prox_pago' },
      { header: 'Tasa', key: 'tasa' },
      { header: 'Proximo pago', key: 'cuota' },
      { header: 'Dias mora', key: 'dias_mora' },
      { header: 'Monto Inicial', key: 'monto_original' },
      { header: 'Saldo actual', key: 'saldo_capital' },
    ];

    worksheet.columns = columns;
    const decryObject = atob(payload.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });
    for (let i = 1; i <= columns.length; i++) {
      const maxLength = Math.max(
        ...worksheet
          .getColumn(i)
          .values.filter((item) => typeof item === 'string')
          .map((value) => (value ? value.toString().length : 0)),
      );
      worksheet.getColumn(i).width = maxLength < 10 ? 10 : maxLength;
    }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'a4a7ab' },
    };
    worksheet.getColumn(9).numFmt = '#,##0';
    worksheet.getColumn(10).numFmt = '#,##0';
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=actives.xlsx`)
      .send(buffer);
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/passives_group')
  @ApiOperation({ summary: 'Get passives group by id' })
  @UseGuards(AuthGuard)
  async getPassivesGroup(@Body('ids') ids: string[]): Promise<any> {
    const codes = await this.getCodes(ids);
    return await this.sigcService.passivesGroupMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/passives_full')
  @ApiOperation({ summary: 'Get passives full by id' })
  @UseGuards(AuthGuard)
  async getPassivesFull(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.passivesFullMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/passives_full_xls')
  @ApiOperation({ summary: 'Get passives full report in xls by user id' })
  async getPassivesXls(
    @Body('ids') ids: string[],
    @Res() res: Response,
  ): Promise<any> {
    const codes = await this.getCodes(ids);
    const payload = await this.sigcService.passivesFullXlsMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');
    const columns = [
      { header: 'Producto', key: 'producto' },
      { header: 'Cod. Producto', key: 'cod_producto' },
      { header: 'Cuenta', key: 'num_cuenta' },
      { header: 'Cliente', key: 'nombre_cliente' },
      { header: 'Numero Cliente', key: 'num_cliente' },
      { header: 'Oficial cuenta', key: 'oficial_cuenta' },
      { header: 'Fecha apertura', key: 'fec_apertura' },
      { header: 'Fecha vencimiento', key: 'fecha_vencimiento' },
      { header: 'Monto Inicial', key: 'monto_original' },
      { header: 'Saldo cierre de mes', key: 'saldo_capital_ld_lm' },
      { header: 'Saldo cierre de año', key: 'saldo_capital_ld_ly' },
      { header: 'Saldo SD-LM', key: 'saldo_capital_sd_lm' },
      { header: 'Saldo Promedio', key: 'saldo_promedio' },
      { header: 'Tasa', key: 'tasa' },
    ];

    worksheet.columns = columns;
    const decryObject = atob(payload.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });
    for (let i = 1; i <= columns.length; i++) {
      const maxLength = Math.max(
        ...worksheet
          .getColumn(i)
          .values.filter((item) => typeof item === 'string')
          .map((value) => (value ? value.toString().length : 0)),
      );
      worksheet.getColumn(i).width = maxLength < 10 ? 10 : maxLength;
    }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'a4a7ab' },
    };
    worksheet.getColumn(9).numFmt = '#,##0';
    worksheet.getColumn(10).numFmt = '#,##0';
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=actives.xlsx`)
      .send(buffer);
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/placements_full')
  @ApiOperation({ summary: 'Get placements full by id' })
  @UseGuards(AuthGuard)
  async getPlacementsFull(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.placementsFullMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/placements_full_xls')
  @ApiOperation({ summary: 'Get placements full report in xls by user id' })
  async getPlacementsXls(
    @Body('ids') ids: string[],
    @Res() res: Response,
  ): Promise<any> {
    const codes = await this.getCodes(ids);
    const payload = await this.sigcService.placementsFullXlsMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');
    const columns = [
      { header: 'Cliente', key: 'nombre_cliente' },
      { header: 'Num. Cliente', key: 'num_cliente' },
      { header: 'Producto', key: 'tipo_producto' },
      { header: 'Tipo de producto', key: 'cod_prod' },
      { header: 'Tipo sub producto', key: 'cod_subprod' },
      { header: 'Numero de cuenta', key: 'num_cuenta' },
      { header: 'Fecha Apertura', key: 'fecha_apertura' },
      { header: 'Fecha Vencimiento', key: 'fecha_vencimiento' },
      { header: 'Monto original', key: 'monto_original' },
    ];

    worksheet.columns = columns;
    const decryObject = atob(payload.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });
    for (let i = 1; i <= columns.length; i++) {
      const maxLength = Math.max(
        ...worksheet
          .getColumn(i)
          .values.filter((item) => typeof item === 'string')
          .map((value) => (value ? value.toString().length : 0)),
      );
      worksheet.getColumn(i).width = maxLength < 10 ? 10 : maxLength;
    }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'a4a7ab' },
    };
    worksheet.getColumn(6).numFmt = '0';
    worksheet.getColumn(9).numFmt = '#,##0';
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=Colocaciones.xlsx`)
      .send(buffer);
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/catchments_full')
  @ApiOperation({ summary: 'Get catchments full by id' })
  @UseGuards(AuthGuard)
  async getCatchmentsFull(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.catchmentsFullMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }
  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/catchments_full_xls')
  @ApiOperation({ summary: 'Get catchments full report in xls by user id' })
  async getCatchmentXls(
    @Body('ids') ids: string[],
    @Res() res: Response,
  ): Promise<any> {
    const codes = await this.getCodes(ids);
    const payload = await this.sigcService.catchmentsFullXlsMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');

    const columns = [
      { header: 'Cliente', key: 'nombre_cliente' },
      { header: 'Num. Cliente', key: 'num_cliente' },
      { header: 'Producto', key: 'producto' },
      { header: 'Tipo de producto', key: 'cod_producto' },
      { header: 'Numero de cuenta', key: 'num_cuenta' },
      { header: 'Fecha Apertura', key: 'fec_apertura' },
      { header: 'Fecha Vencimiento', key: 'fecha_vencimiento' },
    ];
    worksheet.columns = columns;

    const decryObject = atob(payload.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });

    for (let i = 1; i <= columns.length; i++) {
      const maxLength = Math.max(
        ...worksheet
          .getColumn(i)
          .values.filter((item) => typeof item === 'string')
          .map((value) => (value ? value.toString().length : 0)),
      );
      worksheet.getColumn(i).width = maxLength < 10 ? 10 : maxLength;
    }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'a4a7ab' },
    };
    worksheet.getColumn(5).numFmt = '0';
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=Captaciones.xlsx`)
      .send(buffer);
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/cancels_full')
  @ApiOperation({ summary: 'Get cancels full by id' })
  @UseGuards(AuthGuard)
  async getCancelsFull(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.cancelsFullMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/cancels_full_xls')
  @ApiOperation({ summary: 'Get catchments full report in xls by user id' })
  async getCancelstXls(
    @Body('ids') ids: string[],
    @Res() res: Response,
  ): Promise<any> {
    const codes = await this.getCodes(ids);
    const payload = await this.sigcService.cancelsFullXlsMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');

    const columns = [
      { header: 'Num. Producto', key: 'num_cuenta' },
      { header: 'Tipo de producto', key: 'tipo_producto' },
      { header: 'Cliente', key: 'nombre_cliente' },
      {
        header: 'Fecha cancelación',
        key: 'periodo',
      },
      { header: 'Num. Cliente', key: 'num_cliente' },
    ];
    worksheet.columns = columns;

    const decryObject = atob(payload.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });

    for (let i = 1; i <= columns.length; i++) {
      const maxLength = Math.max(
        ...worksheet
          .getColumn(i)
          .values.filter((item) => typeof item === 'string')
          .map((value) => (value ? value.toString().length : 0)),
      );
      worksheet.getColumn(i).width = maxLength < 10 ? 10 : maxLength;
    }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'a4a7ab' },
    };
    worksheet.getColumn(1).numFmt = '0';
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=cancels.xlsx`)
      .send(buffer);
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/entailments_full')
  @ApiOperation({ summary: 'Get Entailmants full by id' })
  @UseGuards(AuthGuard)
  async getEntailmantsFull(
    @Query()
    params: {
      page: number;
      limit: number;
    },
    @Body('ids') ids: string[],
  ): Promise<any> {
    const { page, limit } = params;
    const codes = await this.getCodes(ids);
    return await this.sigcService.entailmentsFullMultiParam({
      page,
      limit,
      codes: btoa(JSON.stringify(codes)),
    });
  }

  @Action('CONSULTA A API SIGC')
  @HttpCode(HttpStatus.OK)
  @Post('/entailments_full_xls')
  @ApiOperation({ summary: 'Get Entailmants full report in xls by user id' })
  async getEntailmantsXls(
    @Body('ids') ids: string[],
    @Res() res: Response,
  ): Promise<any> {
    const codes = await this.getCodes(ids);
    const payload = await this.sigcService.entailmentsFullXlsMultiParam({
      codes: btoa(JSON.stringify(codes)),
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');

    const columns = [
      { header: 'Código de Oficial', key: 'cod_oficial' },
      { header: 'Nombre del Oficial', key: 'nombre_oficial' },
      { header: 'Nombre del Cliente', key: 'nombre_cliente' },
      { header: 'Identificación', key: 'identificacion' },
      { header: 'Número de Cliente', key: 'num_cliente' },
      { header: 'Tipo de Cliente', key: 'tipo_cliente_0' },
      { header: 'Dirección', key: 'direccion' },
      { header: 'Fecha de Vinculación', key: 'fecha_vinculacion' },
      { header: 'Flag Mes Actual', key: 'FLG_MES_ACTUAL' },
      { header: 'Teléfono Final', key: 'telefono_final' },
      { header: 'Correo', key: 'correo' },
      { header: 'Fecha de Última Actualización', key: 'fec_ult_act' },
      { header: 'Riesgo AML', key: 'riesgo_aml' },
      { header: 'Actividad de Cliente de Riesgo', key: 'act_cliente_riesgo' },
      { header: 'Fecha de Próxima Actualización', key: 'fecha_prox_act' },
      { header: 'Total Activos', key: 'total_activos' },
      { header: 'Total Pasivos', key: 'total_pasivos' },
      { header: 'Total Patrimonio', key: 'total_patrimonio' },
    ];

    worksheet.columns = columns;

    const decryObject = atob(payload.response).replace(/\\/g, '');

    const clearString =
      decryObject[0] == '"'
        ? decryObject.substring(1, decryObject.length - 1)
        : decryObject;

    const data = JSON.parse(clearString);

    data.forEach((val: any) => {
      worksheet.addRow(val);
    });

    for (let i = 1; i <= columns.length; i++) {
      const maxLength = Math.max(
        ...worksheet
          .getColumn(i)
          .values.filter((item) => typeof item === 'string')
          .map((value) => (value ? value.toString().length : 0)),
      );
      worksheet.getColumn(i).width = maxLength < 10 ? 10 : maxLength;
    }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'a4a7ab' },
    };
    worksheet.getColumn(16).numFmt = '0';
    worksheet.getColumn(17).numFmt = '0';
    worksheet.getColumn(18).numFmt = '0';
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set('Content-Disposition', `attachment; filename=cancels.xlsx`)
      .send(buffer);
  }
}
