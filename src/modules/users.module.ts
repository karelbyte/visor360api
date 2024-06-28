import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { IsUserAlreadyExistConstraint } from '../decorators/IsUserAlreadyExist';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { Bank } from 'src/entities/bank.entity';
import { AppMailerService } from 'src/services/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredentialsLog, Bank])],
  providers: [UsersService, IsUserAlreadyExistConstraint, AppMailerService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
