import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'past_sales_count',
  expression: `
    SELECT "productId", COUNT(id) as sales_count FROM (
      SELECT o.id, o.date, o."customerId", p.id as "productId"
      FROM "order" o
      LEFT JOIN item i ON i."orderId" = o.id
      LEFT JOIN product p ON i."productId" = p.id
      WHERE o.date::date < now()::date) today_sales
    GROUP BY "productId"
  `,
  materialized: true,
})
export class PastSalesCountView {
  @ViewColumn()
  productId: string;

  @ViewColumn()
  value: number;
}
