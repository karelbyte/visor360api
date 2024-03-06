import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http.service';

@Injectable()
export class Visor360Service {
  constructor(private httpService: HttpRequestService) {}

  async ClientInfo(param: string) {
    const customParam = {
      search_param: param,
    };
    try {
      return await this.httpService.request(
        'post',
        '/visor360/search_client_info_base64/run',
        customParam,
      );
    } catch (e) {
      return e.message();
    }
  }
}
