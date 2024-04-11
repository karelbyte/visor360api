import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

export interface IPaginateParams {
  page: number;
  limit: number;
  search: string;
}
@Injectable()
export class Visor360Service {
  constructor(private httpService: HttpRequestService) {}

  async searchClient({ page, limit, search }: IPaginateParams) {
    const customParam = {
      search_param: search,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/visor360_search_client/run',
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
        '/SIGC_Panama/visor360_client_information/run',
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
        '/SIGC_Panama/visor360_financial_information/run',
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
        '/SIGC_Panama/visor360_placements_position/run',
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
        '/SIGC_Panama/visor360_catchments_position/run',
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

  async ccPosition({ page, limit, search }: IPaginateParams) {
    const customParam = {
      num_client: search,
      page: Number(page),
      limit: Number(limit),
    };
    try {
      return await this.httpService.request(
        'post',
        '/SIGC_Panama/visor360_cc_position/run',
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

  async consolidatePosition(param: string) {
    const customParam = {
      num_client_ibs: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/Visor360/consolidate_position_base64/run',
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


  async pqrPetitionSingleParam(param: string) {
    const customParam = {
      num_client_ibs: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/Visor360/pqr_petition_single_param/run',
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

  async pqrClaimSingleParam(param: string) {
    const customParam = {
      num_client_ibs: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/Visor360/pqr_claim_single_param/run',
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

  async pqrComplaintSingleParam(param: string) {
    const customParam = {
      num_client_ibs: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/Visor360/pqr_complaint_single_param/run',
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
}
