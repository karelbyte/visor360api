import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { IsUserAlreadyExistConstraint } from '../decorators/IsUserAlreadyExist';
import { UserCredentialsLog } from '../entities/usercredentialslog.entity';
import { UserFilials } from 'src/entities/userfilials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredentialsLog, UserFilials])],
  providers: [UsersService, IsUserAlreadyExistConstraint],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
