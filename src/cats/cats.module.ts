import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
