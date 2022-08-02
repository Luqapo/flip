import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'most_bought_yesterday_view',
  expression: `
    SELECT "productId", COUNT(id) sales_count
    FROM (
      SELECT o.id, o.date, o."customerId", p.id as "productId"
      FROM "order" o
      LEFT JOIN item i ON i."orderId" = o.id
      LEFT JOIN product p ON i."productId" = p.id
    ) most_bought_view
    WHERE date::date = (NOW() - interval '1 day')::date
    GROUP BY "productId"
    ORDER BY COUNT(id) DESC
  `,
  materialized: true,
})
export class MostOftenBoughtYesterdayView {
  @ViewColumn()
  productId: string;

  @ViewColumn()
  sales_count: number;
}
