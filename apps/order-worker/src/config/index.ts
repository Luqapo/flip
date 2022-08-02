import { OrderView } from '../entities/orderView.entity';
import { ItemProfitView } from '../entities/itemProfitView';
import { MostOftenBoughtYesterdayView } from '../entities/mostOftenYesterday';
import { TodaySalesCountView } from '../entities/todaySalesCount';
import { PastSalesCountView } from '../entities/pastSalesCount';

export const entities = [
  OrderView,
  ItemProfitView,
  MostOftenBoughtYesterdayView,
  TodaySalesCountView,
  PastSalesCountView,
];
