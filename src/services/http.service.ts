import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfig } from '../config';
@Injectable()
export class HttpRequestService {
  constructor(private readonly httpService: HttpService) {}

  async request(method: string = 'post', endpoint: string, params: any) {
    const urlExternal = `${AppConfig().apiUrlTool}${endpoint}`;
    const response = await this.httpService.axiosRef.request({
      method: method,
      url: urlExternal,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(AppConfig().secretKeyTool + ':')}`,
      },
    });

    return response.data;
  }
}
