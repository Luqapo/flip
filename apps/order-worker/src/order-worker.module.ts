import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderWorkerController } from './order-worker.controller';
import { OrderWorkerService } from './order-worker.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { OrderView } from './entities/orderView.entity';
import { ItemProfitView } from './entities/itemProfitView';
import { ScheduleModule } from '@nestjs/schedule';
import { MostOftenBoughtYesterdayView } from './entities/mostOftenYesterday';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([OrderView]),
    TypeOrmModule.forFeature([ItemProfitView]),
    TypeOrmModule.forFeature([MostOftenBoughtYesterdayView]),
    ScheduleModule.forRoot(),
  ],
  controllers: [OrderWorkerController],
  providers: [OrderWorkerService],
})
export class OrderWorkerModule {}
