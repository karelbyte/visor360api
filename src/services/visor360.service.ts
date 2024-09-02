import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

export interface IPaginateParams {
  page: number;
  limit: number;
  search: string;
}
@Injectable()
export class Visor360Service {
  constructor(private httpService: HttpRequestService) { }

  async searchClient({ page, limit, search }: IPaginateParams) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_search_client/run',
        customParam,
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async clientInfo(param: string) {
    const customParam = {
      search_param: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_client_information/run',
        customParam,
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async financialInformation(param: string) {
    const customParam = {
      num_client: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_financial_information/run',
        customParam,
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async placementsPosition({ page, limit, search }: IPaginateParams) {
    const customParam = {
      num_client: search,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_placements_position/run',
        customParam,
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async catchmentsPosition({ page, limit, search }: IPaginateParams) {
    const customParam = {
      num_client: search,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_catchments_position/run',
        customParam,
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async creditCardPosition({ page, limit, search }: IPaginateParams) {
    const customParam = {
      num_client: search,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_cc_position/run',
        customParam,
      );
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        code: e.code,
      };
    }
  }

  async pqrsByClientId({
    page,
    limit,
    num_client,
  }: {
    page: number;
    limit: number;
    num_client: string;
  }) {
    const customParam = {
      num_client: num_client,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_pqr_details_num_client/run',
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

  async legalRepresentativeByClientId({ num_client }: { num_client: string }) {
    const customParam = {
      num_client: num_client,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_rep_legal_num_client/run',
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

  async boardDirectorsByClientId({ num_client }: { num_client: string }) {
    const customParam = {
      num_client: num_client,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_JD_num_client/run',
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

  async stockholdersByClientId({ num_client }: { num_client: string }) {
    const customParam = {
      num_client: num_client,
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_accionistas_num_client/run',
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

  async signatoriesByClientId({
    page,
    limit,
    num_client,
  }: {
    page: number;
    limit: number;
    num_client: string;
  }) {
    const customParam = {
      num_client: num_client,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_firmantes_num_client/run',
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

  async beneficiariesByClientId({
    page,
    limit,
    num_client,
  }: {
    page: number;
    limit: number;
    num_client: string;
  }) {
    const customParam = {
      num_client: num_client,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_PANAMA_VISOR360/visor360_beneficiarios_num_client/run',
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
