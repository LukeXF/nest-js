import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule} from "@nestjs/typeorm";
import { User} from "./entities/user.entity";
import {AuthService} from "./auth.service";

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}
