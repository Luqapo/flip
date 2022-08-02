import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';
import { Item } from '../../order/entities/item.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public name: string;

  @Column()
  public price: string;

  @OneToMany(() => Item, (item) => item.product)
  items: Item[];
}

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  /**
   * Indicates that this subscriber only listen to Product events.
   */
  listenTo() {
    return Product;
  }

  /**
   * Called after Product insertion.
   */
  afterUpdate(event: UpdateEvent<Product>) {
    event.manager.query('REFRESH MATERIALIZED VIEW item_profit_view');
  }
}
