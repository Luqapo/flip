import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Item } from './item.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  date: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];
}

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  /**
   * Indicates that this subscriber only listen to Order events.
   */
  listenTo() {
    return Order;
  }

  /**
   * Called after order insertion.
   */
  afterInsert(event: InsertEvent<Order>) {
    event.manager.query('REFRESH MATERIALIZED VIEW today_sales_count');
    event.manager.query('REFRESH MATERIALIZED VIEW order_view');
    event.manager.query('REFRESH MATERIALIZED VIEW item_profit_view');
  }
}
