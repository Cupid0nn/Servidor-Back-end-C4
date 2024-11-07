import { OrdersRepository } from "./order.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/Entityes/Order.entity";

@Injectable()
export class orderDbServices {
    constructor(@InjectRepository (OrdersRepository) private  orderDbRepository: Repository<OrderEntity>) {}
   async  getOrder(id: string) {
      return this.orderDbRepository.findOne({where: {id: id}})
    }
   async addOrder(order) {
        return this.orderDbRepository.save(order)
    }
}