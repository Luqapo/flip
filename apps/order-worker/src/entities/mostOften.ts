import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'most_bought_view',
  expression: `
    SELECT o.id, o.date, o."customerId", p.id as "productId"
    FROM "order" o
    LEFT JOIN item i ON i."orderId" = o.id
    LEFT JOIN product p ON i."productId" = p.id
    WHERE o.date::date < now()::date
  `,
  materialized: true,
})
export class MostOftenBoughtView {
  @ViewColumn()
  productId: string;

  @ViewColumn()
  value: number;
}
