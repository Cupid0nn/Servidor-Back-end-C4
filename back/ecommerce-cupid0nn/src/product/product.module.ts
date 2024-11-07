import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from '../Entityes/Products.entity';
import { CategoryEntity } from 'src/Entityes/Category.Entity';
import { ProductRepository } from './product.repository';
import { cloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CategoryRepository } from 'src/category/category.repository';
import { CloudinaryModule } from 'src/Cloudinary/cloudinary.module';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { productHook } from './product.hook';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity]),
    CloudinaryModule,
  ],
  providers: [
    ProductService,
    ProductRepository,
    cloudinaryService,
    CategoryRepository,
    CloudinaryRepository,
    productHook,
  ],
  controllers: [ProductController],
})
export class ProductModule {}

