import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Item } from './entities/item.entity';
import { OrderView } from './entities/orderView.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(OrderView)
    private orderView: Repository<OrderView>,
  ) {}

  async #insertItems(order) {
    await this.itemRepository.save(
      order.items.map((item) => ({
        ...item,
        product: { id: item.productId },
        order: { id: order.id },
      })),
    );
  }

  async #insertOrder(order) {
    const newOrder = await this.orderRepository.save(order);

    await this.#insertItems(newOrder);

    return newOrder;
  }

  async create(createOrderDto: CreateOrderDto) {
    console.log(
      '🚀 ~ file: order.service.ts ~ line 20 ~ OrderService ~ create ~ createOrderDto',
      createOrderDto,
    );
    const newOrder = await this.#insertOrder({
      ...createOrderDto,
      customer: { id: createOrderDto.customerId },
    });
    return newOrder;
  }

  findAll() {
    return this.orderView.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
