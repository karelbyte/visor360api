import { Module } from '@nestjs/common';
import { Visor360Controller } from '../controllers/visor360.controller';
import { Visor360Service } from '../services/visor360.service';

@Module({
  imports: [],
  controllers: [Visor360Controller],
  providers: [Visor360Service],
  exports: [Visor360Service],
})
export class Visor360Module {}
