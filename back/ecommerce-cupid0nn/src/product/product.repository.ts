import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/Entityes/Category.Entity';
import { ProductEntity } from 'src/Entityes/Products.entity';
import { Repository } from 'typeorm';
import * as data from '../../seed/products.json'; // no tenian la propiedad imgUrl asi que las hardcodeeamos//

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getProducts(
    this: ProductRepository,
    page: number,
    limit: number,
  ): Promise<ProductEntity[]> {
    let products = await this.productRepository.find({
      relations: { category: true },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    product ? product : `Product ${id} not found`; // esta es una forma de hacerlo con el operador ternario
    return product;
  }

  async addProduct() {
    // primero busca si existen las categorias
    const categories = await this.categoryRepository.find();
    //
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new ProductEntity();

      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(ProductEntity)
        .values(product)
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    });
    return 'Productos seedeados';
  }

  async updateProduct(id: string, product: ProductEntity) {
    await this.productRepository.update(id, product);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    return updatedProduct;
  }
}
