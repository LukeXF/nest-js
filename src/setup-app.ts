import {ValidationPipe} from "@nestjs/common";
const cookieSession = require('cookie-session');

export const setupApp = (app: any) => {
    app.use(cookieSession({
        keys: ['skfjgkdsfjghjkdsfjghjds43k']
    }))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
}
