import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestService } from '../services/http.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpRequestService],
  exports: [HttpModule, HttpRequestService],
})
export class GlobalHttpModule {}
