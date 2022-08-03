import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderWorkerController } from './order-worker.controller';
import { OrderWorkerService } from './order-worker.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { OrderView } from './entities/orderView.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { MostOftenBoughtYesterdayView } from './entities/mostOftenYesterday';
import { PastItemProfitView } from './entities/itemProfitView';

describe('OrderWorkerController', () => {
  let orderWorkerController: OrderWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([OrderView]),
        TypeOrmModule.forFeature([PastItemProfitView]),
        TypeOrmModule.forFeature([MostOftenBoughtYesterdayView]),
        ScheduleModule.forRoot(),
      ],
      controllers: [OrderWorkerController],
      providers: [OrderWorkerService],
    }).compile();

    orderWorkerController = app.get<OrderWorkerController>(
      OrderWorkerController,
    );
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(orderWorkerController).toBeDefined();
    });
  });
});
