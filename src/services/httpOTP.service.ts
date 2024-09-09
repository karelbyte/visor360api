import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfig } from '../config';
@Injectable()
export class HttpOtpRequestService {
  constructor(private readonly httpService: HttpService) {}

  async request(method: string = 'post', endpoint: string, params: any) {
    const urlExternal = `${AppConfig().apiUrlTool}${endpoint}`;
    const response = await this.httpService.axiosRef.request({
      method: method,
      url: urlExternal,
      data: params,
      timeout: 10000,
    });

    return response.data;
  }
}
