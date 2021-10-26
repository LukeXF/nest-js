import {createParamDecorator, ExecutionContext} from "@nestjs/common";

// decorator, allows access to a param of where it's user
// interceptor - express middleware for data going in and out
// saves doing "@Request() request: Request" then "const user = request.currentUser"
// where as we can just do "@CurrentUser() user: string" this way
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        // get underlying request
        const request = context.switchToHttp().getRequest();
        console.log("test", request)
        return request.currentUser;

        // session.userId = user.id;
    }
)
