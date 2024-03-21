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
}
