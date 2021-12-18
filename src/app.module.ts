import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatsModule } from './cats/cats.module';
import { MessagesModule } from './messages/messages.module';
import { ComputerModule } from './computer/computer.module';
import { CpuModule } from './cpu/cpu.module';
import { DiskModule } from './disk/disk.module';
import { PowerModule } from './power/power.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';

const cookieSession = require('cookie-session');

@Module({
	// MongooseModule.forRoot('mongodb+srv://hub-user:fZZaCbgM5wkhZhWY@hub-staging.hppcn.mongodb.net/iqos-hub?retryWrites=true&w=majority')
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process?.env?.NODE_ENV}`,
		}),
		UserModule,
		CatsModule,
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					type: 'sqlite',
					database: config.get<string>('DB_NAME'),
					entities: [User, Report],
					synchronize: true,
				};
			},
		}),
		// TypeOrmModule.forRoot({
		// 	type: 'sqlite',
		// 	database: 'db.sqlite',
		// 	entities: [User, Report],
		// 	synchronize: true,
		// }),
		MessagesModule,
		ComputerModule,
		CpuModule,
		DiskModule,
		PowerModule,
		UserModule,
		ReportsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
			}),
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				cookieSession({
					keys: ['skfjgkdsfjghjkdsfjghjds43k'],
				}),
			)
			.forRoutes('*');
	}
}
