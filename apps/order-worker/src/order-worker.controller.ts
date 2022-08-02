import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderWorkerService } from './order-worker.service';

@Controller()
export class OrderWorkerController {
  constructor(private readonly orderWorkerService: OrderWorkerService) {}

  @MessagePattern('getHello')
  getHello(name: string): string {
    return this.orderWorkerService.getHello(name);
  }

  @MessagePattern('findAll')
  findAll(): any {
    return this.orderWorkerService.findAll();
  }

  @Get('topProfitable')
  topProfitable() {
    return this.orderWorkerService.getTopProfitable();
  }

  @Get('mostOftenBought')
  mostOftenBought() {
    return this.orderWorkerService.mostOftenBought();
  }

  @Get('mostOftenBoughtYesterday')
  mostOftenBoughtYesterday() {
    return this.orderWorkerService.mostOftenBoughtYesterday();
  }
}
