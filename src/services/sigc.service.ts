import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

@Injectable()
export class SigcService {
  constructor(private httpService: HttpRequestService) {}

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
      search_param: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/sigc_panama/deposits_multi_param/run',
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
