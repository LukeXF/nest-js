import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {CatsModule} from './cats/cats.module';
import {MongooseModule} from '@nestjs/mongoose';
import {MessagesModule} from './messages/messages.module';
import {ComputerModule} from './computer/computer.module';
import {CpuModule} from './cpu/cpu.module';
import {DiskModule} from './disk/disk.module';
import {PowerModule} from './power/power.module';
import {ReportsModule} from './reports/reports.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user/entities/user.entity';
import {Report} from './reports/report.entity';

@Module({
    // MongooseModule.forRoot('mongodb+srv://hub-user:fZZaCbgM5wkhZhWY@hub-staging.hppcn.mongodb.net/iqos-hub?retryWrites=true&w=majority')
    imports: [
        UserModule,
        CatsModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true,
        }),
        MessagesModule,
        ComputerModule,
        CpuModule,
        DiskModule,
        PowerModule,
        UserModule,
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
