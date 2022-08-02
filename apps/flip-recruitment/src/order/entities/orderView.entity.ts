import { ViewEntity, ViewColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Item } from './item.entity';

@ViewEntity({
  name: 'order_view',
  expression: `
    SELECT o.id, o.date, row_to_json(c) as customer,
      json_agg(row_to_json(i)) as items
    FROM "order" o
    LEFT JOIN customer c ON o."customerId" = c.id
    LEFT JOIN (
      SELECT quantity, "orderId", row_to_json(p) as product
      FROM item it
      LEFT JOIN product p ON p.id = it."productId"
    ) i ON i."orderId" = o.id
    GROUP BY o.id, c.*
  `,
  materialized: true,
})
export class OrderView {
  @ViewColumn()
  id: string;

  @ViewColumn()
  date: string;

  @ViewColumn()
  customer: Customer;

  @ViewColumn()
  items: Item[];
}
