import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { ApplicationEntity } from './application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ApplicationEntity]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
