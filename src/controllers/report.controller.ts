import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import {
  Field,
  GenerateReportBody,
  ReportService,
} from '../services/report.service';
import { Report } from '../entities/report.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Workbook } from 'exceljs';
import { SubordinatesService } from '../services/subordinate.service';
import { Action } from 'src/decorators/actions.decorator';

@ApiBearerAuth()
@ApiTags('Reports service')
@Controller('reports')
export class ReportController {
  constructor(
    private readonly reportlService: ReportService,
    private readonly subordinateService: SubordinatesService,
  ) { }

  @Action('CONSULTA A LISTA DE REPORTES (API REPORT)')
  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  async getAllReports(): Promise<Report | any> {
    return await this.reportlService.getAll();
  }

  @Action('GENERACION DE REPORTE (API REPORT)')
  @HttpCode(HttpStatus.OK)
  @Post('/generate_data')
  //@UseGuards(AuthGuard)
  async getGenerateData(
    @Body() body: GenerateReportBody,
    @Res() res: Response,
  ): Promise<Report | any> {
    body.codes = await this.subordinateService.getSubordinatesByBossOnlyCodes(
      body.userId,
    );
    const payload = await this.reportlService.generateReport(body);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datos');
    const columns = body.fields.map((item: Field) => {
      return {
        header: item.name,
        key: item.field_name,
      };
    });
    worksheet.columns = columns;

    const data = JSON.parse(payload.response);

    if (data.length === 0) {
      return res
        .status(402)
        .send({ message: 'No hay datos que mostrar', error: true });
    }
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
    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set(
        'Content-Disposition',
        `attachment; filename=${body.reportName}.xlsx`,
      )
      .send(buffer);
  }
}
