import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'past_item_profit_view',
  expression: `
    SELECT "productId", SUM(value) as sales_value FROM (
      SELECT "productId", quantity * price::numeric as value
            FROM (
              SELECT "productId", quantity, price
              FROM item i
              LEFT JOIN product p ON p.id = i."productId"
              LEFT JOIN "order" o ON o.id = i."orderId"
              WHERE o.date::date < now()::date
            ) item_price
    ) item_value
    GROUP BY "productId"
  `,
  materialized: true,
})
export class PastItemProfitView {
  @ViewColumn()
  productId: string;

  @ViewColumn()
  value: number;
}
