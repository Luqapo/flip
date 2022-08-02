import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Item } from './entities/item.entity';
import { OrderView } from './entities/orderView.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Item]),
    TypeOrmModule.forFeature([OrderView]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
