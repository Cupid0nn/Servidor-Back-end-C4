import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../Entityes/Order.Entity';
import { UserEntity } from '../Entityes/User.Entity';
import { ProductEntity } from '../Entityes/Products.entity';
import { orderDetailsEntity } from '../Entityes/OrderDetails.Entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(orderDetailsEntity)
    private orderDetailRepository: Repository<orderDetailsEntity>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;
    // busqueda del usuario a ver si existe
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found in order.repository.ts');
    }

  //obtener todos los productos por id
  const productsArray = await Promise.all(
    products.map(async (element) => {
      const product = await this.productRepository.findOneBy({
        id: element.id,
      });
      if (!product) {
        throw new NotFoundException( `Product ${element.id} not found`);
      }
      // calculamos el monto total:
      total += Number(product.price) * element.quantity;
      //cambiamos el stock
      const restador = product.stock - element.quantity;
      if ( restador > 0){
      await this.productRepository.update(
        { id: element.id },
        { stock: restador },
      );
    } 
    else {
      throw new BadRequestException ("El stock es negativo")
    }
    return product;

    }),
  );

  const orderDetails = new orderDetailsEntity();
    orderDetails.price = Number(Number(total).toFixed(2));
    orderDetails.products = productsArray;
    // la guardamos en orderDetails
   
    await this.orderDetailRepository.save(orderDetails);

// creacion de orden
const newOrder = new OrderEntity();
newOrder.user = user;
newOrder.date = new Date();
newOrder.orderDetails = orderDetails;
// la guardamos en la base de datos

const { user: { id: orderId}, ...order} = await this.orderRepository.save(newOrder)
return { user: orderId , ...order  }

// del usuario solo devolvemos su id

 
  }
  getOrders(id: string) {
    const orders = this.orderRepository.findOne({
      where: { id },
      relations: { orderDetails: { products: true } },
    });
    if (!orders) {
      throw new NotFoundException(`Order not found`);
    }
    return orders;
  }
  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { orderDetails: { products: true } },
    });
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    const products = order.orderDetails.products;

    await this.orderDetailRepository.delete({ id: order.orderDetails.id });
    await this.orderRepository.delete(id);

    for (const product of products) {

      await this.productRepository.update(
        { id: product.id },
        { stock: 12 },
      );
    }
    
    return { message: `Order ${id} deleted successfully` };
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find({
      relations: { orderDetails: { products: true } },
    });
    return orders;
  }

}
