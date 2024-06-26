import { Injectable } from '@nestjs/common';

import { HttpRequestService } from './http.service';
import { IPaginateParamsWithSearch } from './sigc.service';
@Injectable()
export class InteractionsService {
  constructor(private httpService: HttpRequestService) {}

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

  async pqrGroupedSingleParam({
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
        '/SIGC_PANAMA_INTERACCIONES/pqr_grouped_single_param/run',
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

  async pqrGroupedMultiParam({
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
        '/SIGC_PANAMA_INTERACCIONES/pqr_grouped_multi_param/run',
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

  async groupedInformationHeaderSingleParam({ codes }: { codes: string }) {
    const customParam = {
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_INTERACCIONES/grouped_information_header_single_param/run',
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

  async groupedInformationHeaderMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_INTERACCIONES/grouped_information_header_multi_param/run',
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

  async totalCreditsRequests({
    filials,
    page,
    limit,
  }: {
    filials: string[];
    page: number;
    limit: number;
  }) {
    const customParam = {
      page: Number(page),
      limit: Number(limit),
      filials,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_INTERACCIONES/total_credits_requests/run',
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
