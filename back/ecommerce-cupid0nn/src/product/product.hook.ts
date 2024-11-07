import { Module, OnModuleInit } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService],
})
export class productHook implements OnModuleInit {
  constructor(private readonly productService: ProductService) {}

  async onModuleInit() {
    await this.productService.addProducts();
  }
}