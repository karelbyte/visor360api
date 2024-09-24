import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpOtpRequestService {
  constructor(private readonly httpService: HttpService) {}

  async request(method: string = 'post', endpoint: string, params: any) {
    const requestBody =
      method === 'get'
        ? {
            method: method,
            url: endpoint,
            params: params,
            timeout: 10000,
          }
        : {
            method: method,
            url: endpoint,
            data: params,
            timeout: 10000,
          };
    return await this.httpService.axiosRef.request(requestBody);
  }
}
