import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    });
  }

  getHello(): Promise<string> {
    console.log(this.configService.get('POSTGRES_USER'));
    return this.client.send<string, string>('getHello', 'Michael').toPromise();
  }

  addOrder(data: string): Promise<string> {
    return this.client.send<string, string>('addOrder', data).toPromise();
  }

  findOrders(): Promise<any> {
    return this.client.send<string, string>('findAll', 'test').toPromise();
  }
}
