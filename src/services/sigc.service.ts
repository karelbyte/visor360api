import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

export interface IPaginateParamsWithSearch {
  page: number;
  limit: number;
  search: string;
  codes: string;
}
@Injectable()
export class SigcService {
  constructor(private httpService: HttpRequestService) { }

  async depositsTotalSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/deposits_total_single_param/run',
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

  async depositsTotalMultiParam(param: string) {
    const customParam = {
      list_of_officers: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/deposits_total_multi_param/run',
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
  async depositsSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/deposits_single_param/run',
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
        '/SIGC_Panama/deposits_multi_param/run',
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

  async depositsTop10SingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/top10_deposits_single_param/run',
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
        '/SIGC_Panama/top10_deposits_multi_param/run',
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

  async placementsTotalSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/placements_total_single_param/run',
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
        '/SIGC_Panama/placements_total_multi_param/run',
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
  async placementsSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/placements_single_param/run',
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
        '/SIGC_Panama/placements_multi_param/run',
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

  async captureSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/captures_single_param/run',
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
        '/SIGC_Panama/captures_multi_param/run',
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

  async vinculationsSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/vinculations_single_param/run',
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
        '/SIGC_Panama/vinculations_multi_param/run',
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

  async vinculationsTop10SingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/top10_vinculations_single_param/run',
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
        '/SIGC_Panama/top10_vinculations_multi_param/run',
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

  async assetsTop10SingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/top10_assets_single_param/run',
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
        '/SIGC_Panama/top10_assets_multi_param/run',
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

  async expirationAllSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_all_single_param/run',
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
        '/SIGC_Panama/expiration_all_multi_param/run',
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

  async financialSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/sigc_financial_information_single_param/run',
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
        '/SIGC_Panama/sigc_financial_information_multi_param/run',
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

  async cancelSingleParam(param: string) {
    const customParam = {
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/product_cancelation_top10_single_param/run',
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
      officer_code: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/product_cancelation_top10_multi_param/run',
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

  async expirationDpfMonthSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_dpf_month_single_param/run',
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
        '/SIGC_Panama/expiration_dpf_month_multi_param/run',
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

  async expirationDpfYearSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_dpf_year_single_param/run',
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
        '/SIGC_Panama/expiration_dpf_year_multi_param/run',
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

  async expirationCreditLineMonthSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_line_credit_month_single_param/run',
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
        '/SIGC_Panama/expiration_line_credit_month_multi_param/run',
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

  async expirationCreditLineYearSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_line_credit_year_single_param/run',
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
        '/SIGC_Panama/expiration_line_credit_year_multi_param/run',
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

  async expirationClientMonthSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_client_month_single_param/run',
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
        '/SIGC_Panama/expiration_client_month_multi_param/run',
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

  async expirationClientYearSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_client_year_single_param/run',
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
        '/SIGC_Panama/expiration_client_year_multi_param/run',
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

  // -----------------

  async expirationPlacementsMonthSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_placements_month_single_param/run',
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
        '/SIGC_Panama/expiration_placements_month_multi_param/run',
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

  async expirationPlacementsYearSingleParam({
    page,
    limit,
    search,
    codes,
  }: IPaginateParamsWithSearch) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
      officer_code: codes,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/expiration_placements_year_single_param/run',
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
        '/SIGC_Panama/expiration_placements_year_multi_param/run',
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
