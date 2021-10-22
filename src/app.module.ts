import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule, CatsModule, MongooseModule.forRoot('mongodb+srv://hub-user:fZZaCbgM5wkhZhWY@hub-staging.hppcn.mongodb.net/iqos-hub?retryWrites=true&w=majority'), MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

