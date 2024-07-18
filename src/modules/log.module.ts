import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from 'src/controllers/log.controller';
import { Log } from 'src/entities/log.entity';
import { LogService } from 'src/services/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class RolModule {}
