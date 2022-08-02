import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { configService } from '../../../order-worker/src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
