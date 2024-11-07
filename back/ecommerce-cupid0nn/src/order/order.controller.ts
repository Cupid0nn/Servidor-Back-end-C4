import { Body, Controller, Get, Post, Param, ParseUUIDPipe, UseGuards, Delete, UseInterceptors } from "@nestjs/common";
import { OrderService } from "./order.service";
import { orderDbServices } from "./order.dbService";
import { CreateOrderDto } from "src/DTOs/CreateOrderDto";
import { AuthGuard } from "src/Auth/Auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@ApiBearerAuth()
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrderService,
    private readonly orderDBservice: orderDbServices
  ) {}
  @Post()
addOrder(@Body() order: CreateOrderDto, ) {
  const { userId, products } = order;
  return this.ordersService.addOrder(userId, products); 
}

  @Get(":id")
  getOrder(@Param('id', ParseUUIDPipe) id: string,) {
    return this.ordersService.getOrder(id);
  }

  @Delete(":id")
  deleteOrder(@Param('id', ParseUUIDPipe) id: string,) {
    return this.ordersService.deleteOrder(id);
  }
  
  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
}