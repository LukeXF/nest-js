import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {UserService} from "../user.service";

// interface ClassConstructor {
//     // this is a class in TS
//     new(...args: any[]): {};
// }
//
// // decorators are plain functions
// export function Serialize(dto: ClassConstructor) {
//     // same as
//     // @UseInterceptors(new SerializeInterceptor(UserDto))
//     return UseInterceptors(new CurrentUserInterceptor(dto))
// }

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    // argument accepted from import
    constructor(private usersService: UserService) {
    }

    async intercept(
        context: ExecutionContext,
        handler: CallHandler<any>,
    ): Promise<Observable<any>> {
        // run something before request is handled (middleware)
        // BEFORE
        // console.log({context});
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle();

        // return handler.handle().pipe(
        //     map((data: any) => {
        //         // AFTER
        //         // run something before sent out
        //         return plainToClass(this.dto, data, {
        //             excludeExtraneousValues: true,
        //         });
        //     }),
        // );
    }
}
