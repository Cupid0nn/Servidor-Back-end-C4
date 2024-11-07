import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private  ordersRepository: OrdersRepository,
  ) {}

  addOrder(userId: string, products: any) {
    return this.ordersRepository.addOrder(userId, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrders(id);
  }

  deleteOrder(id: string) {
    return this.ordersRepository.deleteOrder(id);
  }

  getAllOrders() {
    return this.ordersRepository.getAllOrders();
  }
}