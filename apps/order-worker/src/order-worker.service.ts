import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderView } from './entities/orderView.entity';
import { PastItemProfitView } from './entities/itemProfitView';
import { MostOftenBoughtYesterdayView } from './entities/mostOftenYesterday';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrderWorkerService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(PastItemProfitView)
    private itemProfitView: Repository<PastItemProfitView>,
    @InjectRepository(OrderView)
    private orderView: Repository<OrderView>,
    @InjectRepository(MostOftenBoughtYesterdayView)
    private mostBoughtYesterdayView: Repository<MostOftenBoughtYesterdayView>,
  ) {}
  private readonly logger = new Logger(OrderWorkerService.name);

  @Cron('1 0 0 * * *') // TODO: every mindnight
  handleCron() {
    this.logger.debug('Called when the current second is 45');
    this.mostBoughtYesterdayView.query(
      'REFRESH MATERIALIZED VIEW most_bought_yesterday_view',
    );
    this.mostBoughtYesterdayView.query(
      'REFRESH MATERIALIZED VIEW past_item_profit_view',
    );
    this.mostBoughtYesterdayView.query(
      'REFRESH MATERIALIZED VIEW past_sales_count',
    );
  }

  getHello(name: string): string {
    return `Hello ${name}!`;
  }

  async getTopProfitable(): Promise<any> {
    const data = await this.itemProfitView.query(`
      SELECT "productId", SUM(sales_value)
      FROM (SELECT * FROM past_item_profit_view
      UNION
      SELECT * FROM today_item_profit_view) sum
      GROUP BY "productId"
      ORDER BY SUM(sales_value) DESC
      LIMIT 10
    `);

    return data;
  }

  async mostOftenBought(): Promise<any> {
    const data = await this.itemProfitView.query(`
      SELECT "productId", SUM(sales_count)
      FROM (SELECT * FROM past_sales_count
      UNION
      SELECT * FROM today_sales_count) sum
      GROUP BY "productId"
      ORDER BY SUM(sales_count) DESC
      LIMIT 10
    `);

    return data;
  }

  async mostOftenBoughtYesterday(): Promise<any> {
    const data = await this.mostBoughtYesterdayView.find({ take: 10 });

    return data;
  }

  async findAll(): Promise<OrderView[]> {
    const data = await this.orderView.find();

    return data;
  }
}
