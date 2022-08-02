import { Order, OrderSubscriber } from '../order/entities/order.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Product, ProductSubscriber } from '../product/entities/product.entity';
import { Item } from '../order/entities/item.entity';
import { OrderView } from '../order/entities/orderView.entity';

export const entities = [Order, Customer, Product, Item, OrderView];

export const subscribers = [OrderSubscriber, ProductSubscriber];
