import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { ProductEntity } from "src/Entityes/Products.entity";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

    getProducts(page: number, limit: number) {
      return this.productRepository.getProducts(page, limit);
    }

    getProduct(id: string) {
      return this.productRepository.getProduct(id);
    }

    addProducts(){
      return this.productRepository.addProduct();
    }

    updateProduct(id: string, product: ProductEntity ) {
      return this.productRepository.updateProduct(id, product);
    }
  
}