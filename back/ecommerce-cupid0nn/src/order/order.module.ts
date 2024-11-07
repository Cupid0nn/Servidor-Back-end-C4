import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './order.controller';
import { OrderService } from './order.service';
import { OrdersRepository } from './order.repository';
import { OrderEntity } from '../Entityes/Order.entity';
import { UserEntity } from '../Entityes/User.entity';
import { ProductEntity } from '../Entityes/Products.entity';
import { orderDetailsEntity } from '../Entityes/OrderDetails.entity';
import { orderDbServices } from './order.dbService';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      ProductEntity,
      orderDetailsEntity,
      OrdersRepository
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrderService,OrdersRepository,orderDbServices], 
})
export class OrdersModule {}