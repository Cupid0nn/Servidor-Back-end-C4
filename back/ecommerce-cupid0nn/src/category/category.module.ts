import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryEntity } from '../Entityes/Category.Entity';
import { CategoryRepository } from './category.repository';
import { CategoryHook } from './category.hook';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryRepository, CategoryHook],
  controllers: [CategoryController]
})
export class CategoryModule {}
