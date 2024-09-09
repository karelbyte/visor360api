import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestService } from '../services/http.service';
import { HttpOtpRequestService } from 'src/services/httpOTP.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpRequestService, HttpOtpRequestService],
  exports: [HttpModule, HttpRequestService, HttpOtpRequestService],
})
export class GlobalHttpModule {}
