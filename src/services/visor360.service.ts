import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

@Injectable()
export class Visor360Service {
  constructor(private httpService: HttpRequestService) {}

  async clientInfo(param: string) {
    const customParam = {
      search_param: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/Visor360/search_client_info_base64/run',
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
      num_cliente_ibs: param,
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
      num_cliente_ibs: param,
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
      num_cliente_ibs: param,
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
      num_cliente_ibs: param,
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
