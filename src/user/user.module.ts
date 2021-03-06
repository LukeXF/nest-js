import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {AuthService} from "./auth.service";
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
    controllers: [UserController],
    providers: [UserService, AuthService, {
        useClass: CurrentUserInterceptor,
        provide: APP_INTERCEPTOR
    }],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {
}
