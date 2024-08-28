import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

export interface IPaginateParamsWithSearch {
  page: number;
  limit: number;
  search?: string;
  codes: string;
}
@Injectable()
export class SigcService {
  constructor(private httpService: HttpRequestService) { }

  async depositsTotalMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/deposits_total_multi_param/run',
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

  async depositsMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/deposits_multi_param/run',
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

  async depositsTop10MultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/top10_deposits_multi_param/run',
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

  async placementsTotalMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/placements_total_multi_param/run',
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

  async placementsMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/placements_multi_param/run',
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

  async capturesMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/captures_multi_param/run',
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

  async vinculationsMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/vinculations_multi_param/run',
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

  async vinculationsTop10MultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/top10_vinculations_multi_param/run',
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

  async assetsTop10MultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/top10_assets_multi_param/run',
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

  async expirationAllMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_all_multi_param/run',
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

  async financialMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/sigc_financial_information_multi_param/run',
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

  async cancelMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/product_cancelation_top10_multi_param/run',
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


  async expirationDpfMonthMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_dpf_month_multi_param/run',
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

  async expirationDpfYearMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_dpf_year_multi_param/run',
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

  async expirationCreditLineMonthMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_line_credit_month_multi_param/run',
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

  async expirationCreditLineYearMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_line_credit_year_multi_param/run',
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

  async expirationClientMonthMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_client_month_multi_param/run',
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
  async expirationClientYearMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_client_year_multi_param/run',
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

  async expirationPlacementsMonthMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_placements_month_multi_param/run',
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

  async expirationPlacementsYearMultiParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/expiration_placements_year_multi_param/run',
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

  async placementsFullMultiParam({
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
        '/SIGC_PANAMA/list_of_placements_pag_multi_param/run',
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

  async placementsFullXlsMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/list_of_placements_dwl_multi_param/run',
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

  async catchmentsFullMultiParam({
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
        '/SIGC_PANAMA/list_of_catchments_pag_multi_param/run',
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

  async catchmentsFullXlsMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/list_of_catchments_dwl_multi_param/run',
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

  async assetsGroupMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/assets_groupby_multi_param/run',
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

  async assetsFullMultiParam({
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
        '/SIGC_PANAMA/assets_pag_multi_param/run',
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

  async assetsFullXlsMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/assets_dwl_multi_param/run',
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

  async passivesGroupMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/pasive_groupby_multi_param/run',
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

  async passivesFullMultiParam({
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
        '/SIGC_PANAMA/pasive_pag_multi_param/run',
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

  async passivesFullXlsMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/pasive_dwl_multi_param/run',
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

  async cancelsFullMultiParam({
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
        '/SIGC_PANAMA/product_cancelation_pag_multi_param/run',
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

  async cancelsFullXlsMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/product_cancelation_dwl_multi_param/run',
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

  async entailmentsFullMultiParam({
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
        '/SIGC_PANAMA/vinculations_pag_multi_param/run',
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

  async entailmentsFullXlsMultiParam({ codes }: { codes: string }) {
    const customParam = {
      list_of_officers: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA/vinculations_dwl_multi_param/run',
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
