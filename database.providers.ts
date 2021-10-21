import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('mongodb+srv://hub-user:fZZaCbgM5wkhZhWY@hub-staging.hppcn.mongodb.net/iqos-hub?retryWrites=true&w=majority'),
    },
];
