import { Injectable } from '@nestjs/common';

import { HttpRequestService } from './http.service';
import { IPaginateParamsWithSearch } from './sigc.service';
@Injectable()
export class InteractionsService {
  constructor(private httpService: HttpRequestService) { }

  async pqrDetailsSingleParam({
    page,
    limit,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_INTERACCIONES/pqr_details_single_param/run',
        customParam,
        'sigc',
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async pqrDetailsMultiParam({
    page,
    limit,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_INTERACCIONES/pqr_details_multi_param/run',
        customParam,
        'sigc',
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }
}
