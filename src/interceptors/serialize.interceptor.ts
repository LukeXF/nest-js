import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

// decorators are plain functions
export function Serialize(dto: any) {
    // same as
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    // argument accepted from import
    constructor(private dto: any) {
    }

    intercept(
        context: ExecutionContext,
        handler: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        // run something before request is handled (middleware)
        // BEFORE
        // console.log({context});

        return handler.handle().pipe(
            map((data: any) => {
                // AFTER
                // run something before sent out
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
